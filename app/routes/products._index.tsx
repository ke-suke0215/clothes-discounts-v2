import { type LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

type Product = {
  id: number;
  productCode: number;
  name: string;
  gender: number;
  officialUrl: string;
  imageUrl: string;
  addedOn: string;
};

export const loader: LoaderFunction = async () => {
  // 実際のAPIやデータベースからデータを取得する代わりに、ダミーデータを使用
  const products: Product[] = [
    {
      id: 1,
      productCode: 101,
      name: "ストレッチセルビッジスリムフィットジーンズ",
      gender: 2,
      officialUrl: "https://www.uniqlo.com/jp/ja/products/E418910-000/00",
      imageUrl:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/418910/item/goods_69_418910.jpg?width=3000",
      addedOn: "2023-10-28 00:00:00",
    },
    {
      id: 2,
      productCode: 102,
      name: "クルーネックTシャツ（半袖）",
      gender: 2,
      officialUrl: "https://www.uniqlo.com/jp/ja/products/E422992-000/00",
      imageUrl:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/item/goods_07_422992.jpg?width=300",
      addedOn: "2023-06-30 00:00:00",
    },
    {
      id: 3,
      productCode: 103,
      name: "エアリズムコットンオーバーサイズTシャツ（5分袖）",
      gender: 1,
      officialUrl: "https://www.uniqlo.com/jp/ja/products/E425974-000/00",
      imageUrl:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/425974/item/goods_09_425974.jpg?width=300",
      addedOn: "2023-06-24 00:00:00",
    },
    {
      id: 4,
      productCode: 104,
      name: "ドライカラーVネックT（半袖）",
      gender: 1,
      officialUrl: "https://www.uniqlo.com/jp/ja/products/E427916-000/00",
      imageUrl:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427916/item/goods_00_427916.jpg?width=300",
      addedOn: "2023-07-17 00:00:00",
    },
    {
      id: 5,
      productCode: 105,
      name: "ドライカラークルーネックT（半袖）",
      gender: 0,
      officialUrl: "https://www.uniqlo.com/jp/ja/products/E427917-000/00",
      imageUrl:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/item/goods_55_427917.jpg?width=300",
      addedOn: "2023-07-17 00:00:00",
    },
    {
      id: 6,
      productCode: 106,
      name: "ヒートテックショートソックス",
      gender: 0,
      officialUrl: "https://www.uniqlo.com/jp/ja/products/E431636-000/00",
      imageUrl:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/431636/item/goods_68_431636.jpg?width=300",
      addedOn: "2024-01-27 00:00:00",
    },
  ];
  return json({ products });
};

// 当日の割引商品を表示する
export default function Index() {
  const { products } = useLoaderData<typeof loader>();

  const categoryRadios = [
    { value: "0", label: "All" },
    { value: "1", label: "Women" },
    { value: "2", label: "Men" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-6">商品一覧</h1>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="商品を検索..."
          className="focus:outline-none"
        />
      </div>
      <RadioGroup defaultValue="0" className="flex space-x-4 mb-6">
        {categoryRadios.map((category) => (
          <div key={category.value} className="flex items-center space-x-2">
            <RadioGroupItem value={category.value} id={category.value} />
            <Label htmlFor={category.value}>{category.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="block"
          >
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-90 object-cover"
              />
              <div className="p-4">
                <h2 className="text-l mb-2">{product.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
