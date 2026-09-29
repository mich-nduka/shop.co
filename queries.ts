"use client"

import useSWR from "swr"
import { Category, Product, ProductsApiResponse } from "./types"

const fetcher = async (url: string) => {
	const res = await fetch(url)
	if (!res.ok) {
		throw new Error(`Failed to fetch ${url}: ${res.statusText}`)
	}
	return res.json()
}

export function useProduct(id: string | number, fallbackData?: Product) {
	const { data, error, isLoading } = useSWR<Product>(
		id ? `https://dummyjson.com/products/${id}` : null,
		fetcher,
		{
			fallbackData,
			revalidateOnFocus: false,
			revalidateIfStale: false
		}
	)
	return {
		product: (data ?? fallbackData) as Product,
		isLoading,
		isError: error
	}
}

export function useCategories(fallbackData?: Category[]) {
	const { data, error, isLoading } = useSWR<Category[]>(
		"https://dummyjson.com/products/categories",
		fetcher,
		{
			fallbackData,
			revalidateOnFocus: false,
			revalidateIfStale: false
		}
	)
	return {
		categories: (data ?? fallbackData ?? []) as Category[],
		isLoading,
		isError: error
	}
}

export function useProducts(skip = 0, limit = 30, fallbackData?: ProductsApiResponse) {
	const { data, error, isLoading } = useSWR<ProductsApiResponse>(
		`https://dummyjson.com/products?skip=${skip}&limit=${limit}`,
		fetcher,
		{
			fallbackData,
			revalidateOnFocus: false,
			revalidateIfStale: false
		}
	)
	return {
		products: data?.products ?? fallbackData?.products ?? [],
		total: data?.total ?? fallbackData?.total ?? 0,
		isLoading,
		isError: error
	}
}

export function useProductsByCategory(
	category: string,
	skip = 0,
	limit = 0,
	fallbackData?: ProductsApiResponse
) {
	const { data, error, isLoading } = useSWR<ProductsApiResponse>(
		category
			? `https://dummyjson.com/products/category/${encodeURIComponent(category)}?skip=${skip}&limit=${limit}`
			: null,
		fetcher,
		{
			fallbackData,
			revalidateOnFocus: false,
			revalidateIfStale: false
		}
	)
	return {
		products: data?.products ?? fallbackData?.products ?? [],
		total: data?.total ?? fallbackData?.total ?? 0,
		isLoading,
		isError: error
	}
}

export const DBQUERIES = {
	getProduct: useProduct,
	getCategories: useCategories,
	getProducts: useProducts,
	getProductsByCategory: useProductsByCategory
}
