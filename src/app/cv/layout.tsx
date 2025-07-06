import { cookies } from 'next/headers';

export async function generateMetadata() {
  const cookieStore = await cookies();
  const username = cookieStore.get('username')?.value || 'Guest';
  return {
    title: `CV - ${username.toUpperCase()}`, // Dynamic title
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
