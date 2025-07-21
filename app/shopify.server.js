import { shopifyApp } from "@shopify/shopify-app-remix";

export const authenticate = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  secret: process.env.SHOPIFY_API_SECRET,
  scopes: ['read_customers', 'write_metafields', 'read_products'],
  appUrl: process.env.SHOPIFY_APP_URL || "http://localhost:3000",
  auth: {
    path: '/auth',
    callbackPath: '/auth/callback',
  },
});






