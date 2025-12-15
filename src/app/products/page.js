import { Suspense } from "react";
import ProductsList from "./ProductsList";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading products...</p>}>
      <ProductsList />
    </Suspense>
  );
}