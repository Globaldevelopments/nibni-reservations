import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");
  const customerId = url.searchParams.get("customerId");

  return json({ productId, customerId });
};

export default function ReservePage() {
  const { productId, customerId } = useLoaderData();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🛏️ Reservation Page</h1>
      <p><strong>Product ID:</strong> {productId}</p>
      <p><strong>Customer ID:</strong> {customerId}</p>
    </div>
  );
}
