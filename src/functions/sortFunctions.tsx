import { ProductType } from "../features/Product/productSlice";

export const sortProducts = (products: ProductType[], sortOption: string) => {
  const copyOfProducts = [...products];
  switch (sortOption) {
    case 'alphabetically':
      copyOfProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'byCount':
      copyOfProducts.sort((a, b) => b.count - a.count);
      break;
    default:
      return copyOfProducts;
  }
  return copyOfProducts;
};
