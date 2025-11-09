import { getProducts } from "@/lib/actions/products"
import { ProductsPage } from "@/components/products-page"

export default async function Products() {
  const products = await getProducts()

  return <ProductsPage products={products} />
}
