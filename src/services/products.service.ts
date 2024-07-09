import { mockDb } from "../db/productsDetailsDb";

export function getFilteredProducts(search?: string) {
  const dbArray = Array.from(mockDb.values());
  if (!search) {
    return dbArray;
  }
  return dbArray.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );
}
