import { BrandStripe } from "~/components/brand-stripe"
import Hero from "~/components/hero"
import MainSection from "~/components/main-section"
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
