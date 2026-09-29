import ShopPage from "./shop-page"
import { getCategories, getCategoryThumbnails } from "~/lib/api"

export default async function Page() {
	const categories = await getCategories()
	const thumbnails = await getCategoryThumbnails(categories)

	return (
		<ShopPage
			categories={categories}
			thumbnails={thumbnails}
		/>
	)
}
