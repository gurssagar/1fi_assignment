import { ProductPage } from "@/components/product-page"
import { getProductBySlug, getRelatedProducts } from "@/lib/actions/products"
import { notFound } from "next/navigation"

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.slug, product.category)

  return <ProductPage product={product} relatedProducts={relatedProducts} />
}
