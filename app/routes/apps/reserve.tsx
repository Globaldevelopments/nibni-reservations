import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");
  const customerId = url.searchParams.get("customerId");

  return json({ productId, customerId });
}

export default function ReservePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: 40, fontSize: 24 }}>
      <h1>Reservation Page</h1>
      <p><strong>Product ID:</strong> {data.productId}</p>
      <p><strong>Customer ID:</strong> {data.customerId}</p>
    </div>
  );
}

