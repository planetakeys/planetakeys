import groq from "groq";

export const PRODUCTS_QUERY = groq`*[_type == "product"]`;

export const CATEGORY_QUERY = groq`*[_type == "category"]`;
