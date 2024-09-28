import { MetaFunction, useLoaderData } from "@remix-run/react";
import { Header } from "~/components/header";
import { Shopping } from "~/components/shopping";
import { fromCategoriesToHeaderProps } from "~/mappers/fromCategoiesToHeaderProps";
import { loadQuery } from "~/sanity/loader.server";
import { CATEGORY_QUERY, PRODUCTS_QUERY } from "~/sanity/queries";
import { Categories, Products } from "~/types/cms.types";

export const meta: MetaFunction = () => {
  return [
    { title: "Planeta Keys" },
    { name: "description", content: "Licenças de software." },
  ];
};

export const loader = async () => {
  const { data: categories } = await loadQuery<Categories[]>(CATEGORY_QUERY);
  const { data: products } = await loadQuery<Products[]>(PRODUCTS_QUERY);

  return { categories, products };
};

export default function Store() {
  const { categories, products } = useLoaderData<typeof loader>();

  const normalized = fromCategoriesToHeaderProps(categories);

  return (
    <div className="bg-gray-1 h-screen">
      <Header menuItems={normalized.menuItems} />
      <Shopping items={products} categories={categories}/>
    </div>
  );
}
