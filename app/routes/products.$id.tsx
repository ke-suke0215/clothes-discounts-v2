import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { products } from "~/data/products";
import { Calendar } from "~/components/ui/calendar";
import { DayClickEventHandler } from "react-day-picker";

import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Missing id param");
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Response("商品が見つかりません", { status: 404 });
  }

  return json({ product });
};

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();

  // 今日から1日おきに3日間を選択
  const today = new Date();
  const selectedDates = [
    today,
    new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
    new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000),
  ];

  return (
    <div className="container mx-auto p-6 pt-10">
      {/* <h1 className="text-2xl mb-6">{product.name}</h1> */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg mb-4"
          />
          <a
            href={product.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 hover:underline"
          >
            公式サイトで見る
          </a>
        </div>
        <div>
          <h2 className="text-xl lg:text-2xl mb-6">{product.name}</h2>
          <div className="flex flex-col md:flex-row gap-8 lg:flex-1">
            <div className="bg-white rounded-lg mx-auto md:mx-0">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={() => {}}
                className="w-fit"
              />
            </div>
            <div className="bg-white p-4 rounded-lg w-[250px]">
              <h2 className="text-lg mb-4">割引情報</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2 font-normal">日付</th>
                    <th className="text-right pb-2 font-normal">値段</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3">2024/01/27</td>
                    <td className="text-right">1,000円</td>
                  </tr>
                  <tr>
                    <td className="py-3">2024/01/28</td>
                    <td className="text-right">1,200円</td>
                  </tr>
                  <tr>
                    <td className="py-3">2024/01/29</td>
                    <td className="text-right">1,500円</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
