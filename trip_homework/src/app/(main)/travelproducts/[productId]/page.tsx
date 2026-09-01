import ProductDetail from "@/components/travelproducts/product-detail";

type ProductDetailPageProps = {
  params: Promise<{ productId: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  // [productId]처럼 대괄호 폴더로 만든 주소는 params로 값을 받아요.
  const { productId } = await params;

  return (
    <main>
      <ProductDetail productId={productId} />
    </main>
  );
}
