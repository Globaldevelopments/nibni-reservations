import { LoaderFunctionArgs } from '@remix-run/node';
import { authenticate } from '~/shopify.server';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticate.public.appProxy(request);

  const url = new URL(request.url);
  const productId = url.searchParams.get('productId');
  const customerId = url.searchParams.get('customerId');

  if (!productId || !customerId) {
    throw new Response("Missing parameters", { status: 400 });
  }

  console.log('Reservation received:', { productId, customerId });

  return json({
    success: true,
    message: `Unit ${productId} successfully reserved by customer ${customerId}.`,
  });
}

export default function ReserveConfirmation() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div style={{
      padding: '3rem',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      fontSize: '1.5rem',
      lineHeight: '2.25rem',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅ Reservation Confirmed</h1>
      <p>{message}</p>
      <a href="/" style={{
        marginTop: '2rem',
        display: 'inline-block',
        backgroundColor: '#aa9072',
        color: '#fff',
        padding: '0.75rem 2rem',
        borderRadius: '6px',
        textDecoration: 'none'
      }}>
        Back to Home
      </a>
    </div>
  );
}


