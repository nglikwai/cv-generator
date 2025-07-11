'use server';
import { cookies } from 'next/headers';

const login = async (username: string) => {
  const cookiesStore = await cookies();
  cookiesStore.set('username', username, {
    expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000), // 30 days
  });
};

const logout = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete('username');
};

const getUser = async () => {
  const cookiesStore = await cookies();
  return cookiesStore.get('username')?.value || '';
};
export { login, logout, getUser };
