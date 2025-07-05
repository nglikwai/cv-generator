import Link from 'next/link';

import classNames from 'classnames';
import { House, Printer } from 'lucide-react';

import { useStore } from '@/providers/StoreProvider';

export default () => {
  const { setReadOnly, readOnly, error } = useStore();

  return (
    <div
      className={classNames(
        'fixed bottom-0 bg-white/50 backdrop-blur-sm w-screen px-5 py-3 rounded-xl hover:opacity-100 flex items-center justify-center gap-10 transition ',
        {
          'opacity-0 ': readOnly,
          'bg-red-400/50': error,
        }
      )}
    >
      <button onClick={() => setReadOnly(!readOnly)}>
        <Printer />
      </button>
      <Link href={'/'}>
        <House />
      </Link>
    </div>
  );
};
