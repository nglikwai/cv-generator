'use client';
import Link from 'next/link';

import classNames from 'classnames';
import { Bot, Braces, Download, RotateCcw, Save, User } from 'lucide-react';
import { logout } from 'src/actions/auth';
import { getPresignedUrl } from 'src/actions/s3Upload';

import { useCV } from '@/hooks/useCV';
import { useStore } from '@/providers/StoreProvider';

export default ({
  keyId,
  prompt,
  invalidateFuction,
  parsedData,
  setTextFunction,
}: {
  keyId?: string;
  prompt?: string;
  invalidateFuction?: () => void;
  parsedData?: any;
  setTextFunction: (text: string) => void;
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
          <button
            onClick={onPrint}
            className={classNames('hover:bg-gray-500/80 p-3 rounded-lg transition', {
              'bg-gray-500/80': !readOnly,
            })}
          >
            <Braces />
          </button>
          <BotButton prompt={prompt} />
          <UploadButton
            keyId={keyId}
            parsedData={parsedData || {}}
            invalidateFuction={invalidateFuction || (() => {})}
            user={user}
          />
          <ResetButton setTextFunction={setTextFunction} />
          <DownloadButton parsedData={parsedData} />
        </>
      )}
    </div>
  );
};

const DownloadButton = ({ parsedData }: { parsedData?: any }) => {
  const download = () => {
    const filename = prompt('Enter the filename for download');

    // return if user click cancel
    if (!filename) return;

    const data = JSON.stringify(parsedData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button onClick={download} className='hover:bg-gray-500/80 p-3 rounded-lg transition'>
      <Download />
    </button>
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
    const saveAsNormal = confirm('Do you want to save this as a normal file? (Press Cancel to save as default)');

    const fileKey = saveAsNormal ? `${user}` : `default-${user}`;

    const key = `${keyId}/${fileKey}.json`;
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
      <div className='w-8 h-8 bg-sky-600 text-white font-black rounded-full m-2 flex justify-center items-center'>
        {user.substring(0, 1).toUpperCase()}
      </div>
    </Link>
  );
};

const ResetButton = ({ setTextFunction }: { setTextFunction: (text: string) => void }) => {
  const { CvDefaultData } = useCV();
  const reset = () => {
    setTextFunction(JSON.stringify(CvDefaultData, null, 2));
  };

  return (
    <button onClick={reset} className='hover:bg-gray-500/80 p-3 rounded-lg transition'>
      <RotateCcw />
    </button>
  );
};
