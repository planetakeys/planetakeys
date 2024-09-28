import { HeaderProps } from "~/components/header";
import { Categories } from "~/types/cms.types";

export const fromCategoriesToHeaderProps = (
  categories?: Categories[]
): HeaderProps => {
  if (!categories || categories.length <= 0) {
    return {
      menuItems: [],
    };
  }

  return {
    menuItems: categories.map((category) => ({
      label: category.title,
      href: `/store?category=${category.slug.current}`,
    })),
  };
};
