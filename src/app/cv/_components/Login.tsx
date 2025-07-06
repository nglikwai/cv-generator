'use client';

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { Check, X } from 'lucide-react';

import { useStore } from '@/providers/StoreProvider';

export default () => {
  const { setLoginOpen, loginOpen, setUser } = useStore();
  const [credentials, setCredentials] = useState({
    username: '',
  });

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      setCredentials({ username });
      setUser(username);
    }
  }, []);

  const toLogin = () => {
    Cookies.set('username', credentials.username, { expires: 365 });
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
