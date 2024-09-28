import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
import { Product } from "~/content/data";
import { useLocation } from "@remix-run/react";
import { Categories, Products } from "~/types/cms.types";
import { FiArrowRight, FiX } from "react-icons/fi";

// Type Definitions
type ShoppingProps = {
  items: Products[];
  categories: Categories[];
};

type SidebarProps = {
  categories: Categories[];
  categorySelected: string;
  onCategoryChange: (categoryId: string) => void;
};

type MainContentProps = {
  products: Product[];
  categorySelected: string;
  handlerResetCategory(): void;
};

type CardProps = Product;

type PaymentOptionsProps = {
  toPrice: number;
};

// Main Component
export const Shopping = ({ items, categories }: ShoppingProps) => {
  const location = useLocation();

  const initialCategory = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const categorySlug = queryParams.get("category") || "";
    return categories.find((c) => c.slug?.current === categorySlug)?._id || "";
  }, [location.search, categories]);

  const [categorySelected, setCategorySelected] =
    useState<string>(initialCategory);

  const products = useMemo(() => {
    const filteredProducts = categorySelected
      ? items.filter((p) =>
          p.categories.some((e) => e._ref === categorySelected)
        )
      : items;

    return normalizeProducts(filteredProducts);
  }, [categorySelected, items]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setCategorySelected(categoryId);
  }, []);

  const handlerResetCategory = useCallback(() => {
    setCategorySelected("");
  }, []);

  return (
    <div className="px-8 py-4 lg:px-40 lg:py-10">
      <div className="grid grid-cols-12 gap-4">
        <Sidebar
          categories={categories}
          categorySelected={categorySelected}
          onCategoryChange={handleCategoryChange}
        />
        <SidebarSellect
          categories={categories}
          categorySelected={categorySelected}
          onCategoryChange={handleCategoryChange}
        />
        <MainContent
          products={products}
          categorySelected={
            categories.find((category) => category._id === categorySelected)
              ?.title || ""
          }
          handlerResetCategory={handlerResetCategory}
        />
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({
  categories,
  categorySelected,
  onCategoryChange,
}: SidebarProps) => (
  <div className="col-span-2 hidden lg:block">
    <strong>Categorias</strong>
    <ul className="mt-2 space-y-1">
      {categories.map((category) => (
        <li
          key={category._id}
          className={clsx(
            categorySelected === category.slug.current && "font-bold"
          )}
        >
          <button onClick={() => onCategoryChange(category._id)}>
            {category.title}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const SidebarSellect = ({
  categories,
  categorySelected,
  onCategoryChange,
}: SidebarProps) =>
  !categorySelected ? (
    <div className="col-span-12 lg:hidden">
      <strong>Categorias</strong>
      <ul className="mt-2 space-y-1">
        {categories.map((category) => (
          <li
            key={category._id}
            className={clsx(
              categorySelected === category.slug.current && "font-bold"
            )}
          >
            <button onClick={() => onCategoryChange(category._id)}>
              {category.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );

// Main Content Component
const MainContent = ({
  products,
  categorySelected,
  handlerResetCategory,
}: MainContentProps) => (
  <div className="col-span-12 lg:col-span-10">
    {categorySelected && (
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={handlerResetCategory}
          className="border flex items-center px-2 space-x-2 rounded border-primary"
        >
          <div>{categorySelected}</div>
          <FiX />
        </button>
      </div>
    )}

    {products.length > 0 ? (
      <GroupCards products={products} />
    ) : (
      <div className="text-gray-400">Nenhum produto encontrado!</div>
    )}
  </div>
);

// Normalize Products Function
const normalizeProducts = (items: Products[]): Product[] => {
  return items.map((item) => ({
    title: item.name,
    fromPrice: parseFloat(item.price),
    toPrice: parseFloat(item.price),
    slug: item.slug.current,
    urlCheckout: item.urlCheckout,
    img: `https://cdn.sanity.io/images/uya42qj4/production/${item.image.asset._ref
      .replace(/image-|(-webp|-png)/g, "")
      .concat(".webp")}`,
  }));
};

// Group Cards Component
const GroupCards = ({ products }: { products: Product[] }) => (
  <div>
    <ul className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.slug} {...product} />
      ))}
    </ul>
  </div>
);

// Card Component
const Card = ({ fromPrice, img, title, toPrice, urlCheckout }: CardProps) => (
  <li className="bg-white shadow-md p-2">
    <div className="flex lg:flex-col">
      <img
        src={img}
        alt={title}
        className="object-contain rounded-t-md flex h-full w-1/2 lg:w-full"
      />
      <div className="flex flex-col items-center text-center lg:py-2 w-1/2 lg:w-full">
        <h3 className="text-gray-2 text-md">{title}</h3>
        <p className="mt-6 line-through text-sm text-focusRing">
          R$ {fromPrice}
        </p>
        <p className="text-2xl font-bold text-error-1">R$ {toPrice}</p>
        <PaymentOptions toPrice={toPrice} />
      </div>
    </div>
    <div className="flex w-full justify-center p-4">
      <a
        href={urlCheckout}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-2 text-sm border px-2 py-1 text-primary rounded hover:bg-primary hover:text-white font-bold"
      >
        <div>Adquirir licença</div>
        <FiArrowRight />
      </a>
    </div>
  </li>
);

// Payment Options Component
const PaymentOptions = ({ toPrice }: PaymentOptionsProps) => (
  <div className="text-gray-2 text-xs lg:text-sm">
    à vista <br /> ou 12x de R$ {Number(toPrice / 12).toFixed(2)} com juros
  </div>
);
