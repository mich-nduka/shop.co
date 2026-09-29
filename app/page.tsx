import { Hero, BrandStripe, MainSection } from "~/components/home"
import { getProducts } from "~/lib/api"

export default async function Home() {
	const productsData = await getProducts({ limit: 8, skip: 0 })

	return (
		<>
			<Hero />
			<BrandStripe />
			<MainSection products={productsData.products} />
		</>
	)
}
