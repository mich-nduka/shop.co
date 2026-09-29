import ProductImages from "~/components/product-images"
import ProductInfo from "~/components/product-info"
import ProductReviews from "~/components/product-reviews"
import RelatedProducts from "~/components/related-products"
import { Product } from "~/types"
import Breadcrumb from "~/components/breadcrumb"

interface ProductPageProps {
	currentCategory: string
	product: Product
	relatedProducts?: Product[]
	productId?: string
	fallbackProduct?: any
	fallbackCategory?: any
}

export default function ProductPage({
	currentCategory,
	product,
	relatedProducts = []
}: ProductPageProps) {
	return (
		<div className="max-w-[1400px] mx-auto px-4 py-8 font-[family-name:var(--font-satoshi)] bg-white">
			<Breadcrumb />

			{/* Main Product Section: Gallery + Info */}
			<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mb-16 items-start">
				<ProductImages images={product.images} />
				<ProductInfo product={product} />
			</section>

			{/* Reviews Section */}
			<ProductReviews reviews={product.reviews} />

			{/* Related Products */}
			<RelatedProducts
				currentCategory={currentCategory}
				initialProducts={relatedProducts}
			/>
		</div>
	)
}
