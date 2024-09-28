import type { MetaFunction } from "@remix-run/node";
import { Banner } from "~/components/banner";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "Planeta Keys" },
    { name: "description", content: "Licenças de software." },
  ];
};

import { useLoaderData } from "@remix-run/react";

import { loadQuery } from "~/sanity/loader.server";
import { CATEGORY_QUERY, PRODUCTS_QUERY } from "~/sanity/queries";
import { AuthorityElement } from "~/components/authorityElement/authorityElement";
import { differencesBussines, infosBussines } from "~/content/infosBussines";
import { fromCategoriesToHeaderProps } from "~/mappers/fromCategoiesToHeaderProps";
import { Categories, Products } from "~/types/cms.types";

export const loader = async () => {
  const { data: categories } = await loadQuery<Categories[]>(CATEGORY_QUERY);
  const { data: products } = await loadQuery<Products[]>(PRODUCTS_QUERY);

  return { categories, products };
};

export default function Index() {
  const { categories, products } = useLoaderData<typeof loader>();

  const normalized = fromCategoriesToHeaderProps(categories);
  return (
    <div className="bg-gray-1">
      <AuthorityElement />
      <Header menuItems={normalized.menuItems} />
      <Banner />

      <div className="px-8 lg:px-40 bg-white py-10">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {infosBussines.map((infos, index) => {
            return (
              <li key={index} className="flex flex-col">
                <strong>{infos.title}</strong>
                <span>{infos.subtitle}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-gray-100 px-8 lg:px-40 py-10">
        <h2 className="text-center text-xl font-bold text-gray-800">
          A PlanetaKeys é autoridade em soluções Microsoft
        </h2>
        <ul className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-14">
          {differencesBussines.map((db, index) => {
            return (
              <li
                key={index}
                className="flex flex-col text-center items-center space-y-2"
              >
                <img
                  src={db.src}
                  alt={db.title}
                  className="h-[4rem] object-contain"
                />
                <strong>{db.title}</strong>
                <span>{db.description}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <Footer categories={normalized.menuItems}/>
    </div>
  );
}
