import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");
  const customerId = url.searchParams.get("customerId");

  console.log("🔍 Loader running", { productId, customerId });

  return json({ productId, customerId });
}

export default function ReservePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: "2rem", fontSize: "1.5rem", color: "#333" }}>
      <h1>✅ Reservation Page</h1>
      <p><strong>Product ID:</strong> {data.productId || "Not provided"}</p>
      <p><strong>Customer ID:</strong> {data.customerId || "Not provided"}</p>
    </div>
  );
}


