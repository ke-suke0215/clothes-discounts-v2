import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SearchForm } from "~/components/search-form";
import { type Product, products } from "~/data/products";
import { ProductCard } from "~/components/ProductCard";

export const loader: LoaderFunction = async () => {
  // 実際のAPIやデータベースからデータを取得する代わりに、ダミーデータを使用

  return json({ products });
};

// 当日の割引商品を表示する
export default function Index() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-6">今日の割引商品</h1>
      <SearchForm />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
