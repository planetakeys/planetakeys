export type Image = {
  asset: {
    _ref: string;
  };
};

export type Slug = {
  current: string;
};

export type Categories = {
  _id: string
  _ref: string
  _type: "category";
  title: string;
  slug: Slug;
};

export type Products = {
  _type: "product";
  name: string;
  slug: Slug;
  price: string
  image: Image;
  categories: Categories[]
  urlCheckout: string
};
