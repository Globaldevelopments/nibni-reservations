import { authenticate } from '~/shopify.server';
import { json } from '@remix-run/node';

export async function loader({ request }) {
  await authenticate.public.appProxy(request);

  const url = new URL(request.url);
  const email = url.searchParams.get('email') || (await request.json()).email;
  const handle = url.searchParams.get('handle') || (await request.json()).handle;
  const title = url.searchParams.get('title') || (await request.json()).title;

  if (!email || !handle || !title) {
    return json({ success: false, message: 'Missing required fields: email, handle, title' }, { status: 400 });
  }

  try {
    const response = await fetch('https://nibni-reservations.onrender.com/apps/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, handle, title }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Server error');
    }

    return json({ success: true, updateResult: data.updateResult });
  } catch (error) {
    console.error('Proxy error:', error);
    return json({ success: false, message: error.message }, { status: 500 });
  }
}

export default function ReserveProxy() {
  return null;
}
