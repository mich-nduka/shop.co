import { Category, Product, ProductsApiResponse, Brand } from "~/types"

const BASE_URL = "https://dummyjson.com"

/**
 * Fetch a single product by ID
 */
export async function getProduct(id: string | number): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error(`Failed to fetch product ${id}: ${res.statusText}`)
    }
    return await res.json()
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    return null
  }
}

/**
 * Fetch paginated products
 */
export async function getProducts(options: { limit?: number; skip?: number } = {}): Promise<ProductsApiResponse> {
  const { limit = 30, skip = 0 } = options
  try {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`)
    return await res.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return { products: [], total: 0, skip, limit }
  }
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL}/products/categories`, {
      next: { revalidate: 86400 } // Categories rarely change, cache for 24h
    })
    if (!res.ok) throw new Error(`Failed to fetch categories: ${res.statusText}`)
    return await res.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(
  category: string,
  options: { limit?: number; skip?: number } = {}
): Promise<ProductsApiResponse> {
  const { limit = 0, skip = 0 } = options
  try {
    const res = await fetch(
      `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) throw new Error(`Failed to fetch products for category ${category}: ${res.statusText}`)
    return await res.json()
  } catch (error) {
    console.error(`Error fetching category ${category}:`, error)
    return { products: [], total: 0, skip, limit }
  }
}

/**
 * Search products by query string
 */
export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return []
  try {
    const res = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`, {
      next: { revalidate: 300 }
    })
    if (!res.ok) throw new Error(`Failed to search products: ${res.statusText}`)
    const data: ProductsApiResponse = await res.json()
    return data.products
  } catch (error) {
    console.error(`Error searching products for "${query}":`, error)
    return []
  }
}

/**
 * Optimized brand fetching: fetch products in 1 request and deduplicate brands
 */
export async function getAllBrands(): Promise<Brand[]> {
  try {
    const res = await fetch(`${BASE_URL}/products?limit=100&select=brand,thumbnail`, {
      next: { revalidate: 86400 }
    })
    if (!res.ok) throw new Error(`Failed to fetch brands: ${res.statusText}`)
    const data: ProductsApiResponse = await res.json()
    
    const brandMap = new Map<string, Brand>()
    for (const p of data.products) {
      if (p.brand && !brandMap.has(p.brand.toLowerCase())) {
        brandMap.set(p.brand.toLowerCase(), {
          id: p.id,
          brand: p.brand,
          thumbnail: p.thumbnail
        })
      }
    }
    return Array.from(brandMap.values())
  } catch (error) {
    console.error("Error fetching brands:", error)
    return []
  }
}

/**
 * Optimized category thumbnail mapping: fetches a single batch of products to extract representative thumbnails
 */
export async function getCategoryThumbnails(categories: Category[]): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${BASE_URL}/products?limit=100&select=category,thumbnail`, {
      next: { revalidate: 86400 }
    })
    if (!res.ok) throw new Error(`Failed to fetch thumbnails: ${res.statusText}`)
    const data: ProductsApiResponse = await res.json()

    const thumbMap: Record<string, string> = {}
    for (const p of data.products) {
      if (p.category && !thumbMap[p.category]) {
        thumbMap[p.category] = p.thumbnail
      }
    }
    return thumbMap
  } catch (error) {
    console.error("Error fetching category thumbnails:", error)
    return {}
  }
}
