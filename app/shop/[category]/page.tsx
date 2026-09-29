import CategoryPage from "./category-page"
import { getCategories, getProductsByCategory } from "~/lib/api"

export default async function Page({
	params
}: {
	params: Promise<{ category: string }>
}) {
	const { category } = await params

	const [categories, productsData] = await Promise.all([
		getCategories(),
		getProductsByCategory(category, { limit: 100 })
	])

	return (
		<CategoryPage
			currentPath={category}
			categories={categories}
			initialProducts={productsData.products}
		/>
	)
}
