'use client';
import Link from 'next/link';

import { useStore } from '@/providers/StoreProvider';

export default () => {
  const { user } = useStore();
  return (
    <div className='min-h-screen '>
      <div className='py-20 text-center text-3xl justify-center flex items-center'>
        {user && <span className='bg-white/50 py-5 px-8 rounded-xl'> {user?.toUpperCase()}'s CV</span>}
      </div>
      <div className='flex items-center justify-center gap-20'>
        <Link href={'/cv?templateId=1'}>
          <div className='w-80 h-96 bg-white rounded-xl' />
        </Link>
        <Link href={'/cv?templateId=2'}>
          <div className='w-80 h-96 bg-white rounded-xl overflow-hidden'>
            <div className='bg-[#9d936a] w-28 h-full'>
              <div className='bg-[#3c4e66] w-full h-32' />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
