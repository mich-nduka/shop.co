import { notFound } from "next/navigation"
import ProductPage from "./product-page"
import { getProduct, getProductsByCategory } from "~/lib/api"

export default async function Page({
	params
}: {
	params: Promise<{ category: string; id: string }>
}) {
	const { category, id } = await params

	const [product, relatedProductsData] = await Promise.all([
		getProduct(id),
		getProductsByCategory(category, { limit: 4 })
	])

	if (!product) {
		notFound()
	}

	return (
		<ProductPage
			currentCategory={category}
			product={product}
			relatedProducts={relatedProductsData.products.filter((p) => p.id !== product.id).slice(0, 4)}
		/>
	)
}
