import BrandsPage from "./brands-page"
import { getAllBrands } from "~/lib/api"

export default async function Page() {
	const brands = await getAllBrands()
	return <BrandsPage brands={brands} />
}
