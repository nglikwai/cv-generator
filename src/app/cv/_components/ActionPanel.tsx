'use client';
import Link from 'next/link';

import classNames from 'classnames';
import { Bot, Printer, Save, User } from 'lucide-react';
import { logout } from 'src/actions/auth';
import { getPresignedUrl } from 'src/actions/s3Upload';

import { useStore } from '@/providers/StoreProvider';

export default ({
  keyId,
  prompt,
  invalidateFuction,
  parsedData,
}: {
  keyId?: string;
  prompt?: string;
  invalidateFuction?: () => void;
  parsedData?: any;
}) => {
  const { setReadOnly, readOnly, error, user } = useStore();

  const onPrint = () => {
    setReadOnly(!readOnly);
  };

  return (
    <div
      className={classNames(
        'fixed top-5 right-5 bg-white/50 backdrop-blur-sm  px-1 py-2 rounded-xl hover:opacity-100 flex flex-col items-center justify-center gap-2 transition ',
        {
          'opacity-0 ': readOnly,
          'bg-red-400/50': error,
        }
      )}
    >
      <UserIcon />
      {user && keyId && prompt && invalidateFuction && (
        <>
          <button onClick={onPrint} className='hover:bg-gray-500/80 p-3 rounded-lg transition'>
            <Printer />
          </button>
          <BotButton prompt={prompt} />
          <UploadButton
            keyId={keyId}
            parsedData={parsedData || {}}
            invalidateFuction={invalidateFuction || (() => {})}
            user={user}
          />
        </>
      )}
    </div>
  );
};

const BotButton = ({ prompt }: { prompt: string }) => {
  const openAi = () => {
    navigator.clipboard.writeText(prompt);
    window.open('https://chatgpt.com', '_blank');
  };

  return (
    <button onClick={openAi} className='hover:bg-gray-500/80 p-3 rounded-lg transition'>
      <Bot />
    </button>
  );
};

const UploadButton = ({
  keyId,
  parsedData,
  invalidateFuction,
  user,
}: {
  keyId: string;
  parsedData: any;
  invalidateFuction: () => void;
  user: string;
}) => {
  const handleUpload = async () => {
    const key = `${keyId}/${user}.json`;
    const presignedUrl = await getPresignedUrl(key);

    const response = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedData),
    });

    if (response.ok) {
      alert('✅ Saved to Cloud!');
      invalidateFuction();
    } else {
      alert('❌ Upload failed');
    }
  };
  return (
    <button onClick={handleUpload} className='hover:bg-gray-500/80 p-3 rounded-lg transition'>
      <Save />
    </button>
  );
};
export const UserIcon = () => {
  const toLogout = async () => {
    await logout();
    window.location.reload();
  };

  const { loginOpen, setLoginOpen, user } = useStore();

  if (!user)
    return (
      <button onClick={() => setLoginOpen(!loginOpen)} className='hover:bg-gray-500/80 p-3 rounded-lg transition'>
        <User />
      </button>
    );
  return (
    <Link href={'/'} onDoubleClick={toLogout}>
      <div className='w-8 h-8 bg-sky-600 text-white font-black rounded-full mt-2 flex justify-center items-center'>
        {user.substring(0, 1).toUpperCase()}
      </div>
    </Link>
  );
};
