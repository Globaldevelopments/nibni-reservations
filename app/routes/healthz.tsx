import { json } from "@remix-run/node";

export const loader = () => {
  return json({ status: "ok" });
};

export default function Healthz() {
  return null;
}

