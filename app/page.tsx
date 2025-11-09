import { Homepage } from "@/components/homepage"
import { getFeaturedProducts } from "@/lib/actions/products"

export default async function Home() {
  const products = await getFeaturedProducts()

  return <Homepage products={products} />
}
