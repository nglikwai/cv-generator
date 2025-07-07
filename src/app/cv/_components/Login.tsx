'use client';

import { useEffect, useState } from 'react';

import { Check, X } from 'lucide-react';
import { getUser, login } from 'src/actions/auth';

import { useStore } from '@/providers/StoreProvider';

export default () => {
  const { setLoginOpen, loginOpen, setUser } = useStore();
  const [credentials, setCredentials] = useState({
    username: '',
  });

  const initLogin = async () => {
    const username = await getUser();
    if (username) {
      setCredentials({ username });
      setUser(username);
    }
  };

  useEffect(() => {
    initLogin();
  }, []);

  const toLogin = async () => {
    await login(credentials.username);
    setLoginOpen(false);
    setUser(credentials.username);
  };
  if (!loginOpen) return null;

  return (
    <div className='absolute bg-white w-96 top-[40%] left-[40%] shadow-[0_0_400px_#000] rounded-2xl p-6'>
      <div className='grid gap-4'>
        <input
          value={credentials.username}
          onChange={e => setCredentials({ ...credentials, username: e.target.value })}
          type='text'
          placeholder='USERNAME'
          className='p-2 outline-none text-xl'
          maxLength={20}
        />
        <div className='grid grid-cols-2 gap-4 '>
          <button onClick={toLogin} className='flex justify-center hover:bg-gray-300 rounded-lg p-2'>
            <Check />
          </button>
          <button
            onClick={() => setLoginOpen(!loginOpen)}
            className='flex justify-center hover:bg-gray-300 rounded-lg p-2'
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};
