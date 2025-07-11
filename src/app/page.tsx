'use client';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import { Bot, ClipboardList } from 'lucide-react';

import CL from './cl/_components/CL';
import ActionPanel from './cv/_components/ActionPanel';
import CV from './cv/_components/CV';
import CV2 from './cv/_components/CV2';

import { getCvClPROMPT } from '@/constants/prompt';
import { useCL } from '@/hooks/useCL';
import { useCV } from '@/hooks/useCV';
import { useStore } from '@/providers/StoreProvider';

export default () => {
  const { user, setParseClData, setParsedCvData, parseClData, parsedCvData } = useStore();
  const { CvData } = useCV();
  const { ClData } = useCL();

  const [url, setUrl] = useState('');
  const [jsonText, setJsonText] = useState('');

  // life cycle hooks
  useEffect(() => {
    if (!jsonText) return;
    try {
      const parsed = JSON.parse(jsonText);
      const { cv, coverLetter } = parsed;
      setParseClData(coverLetter);
      setParsedCvData(cv);
    } catch (error) {
      console.error('Invalid JSON format:', error);
    }
  }, [jsonText]);

  useEffect(() => {
    if (parseClData && parsedCvData) {
      setJsonText(
        JSON.stringify(
          {
            cv: parsedCvData,
            coverLetter: parseClData,
          },
          null,
          2
        )
      );
    } else if (ClData && CvData) {
      setJsonText(
        JSON.stringify(
          {
            cv: CvData,
            coverLetter: ClData,
          },
          null,
          2
        )
      );
    }
  }, [ClData, CvData, parseClData, parsedCvData]);

  // methods
  const openAi = () => {
    if (!url) {
      alert('Please enter a job description');
      return;
    }
    navigator.clipboard.writeText(getCvClPROMPT(url, JSON.stringify(CvData, null, 2)));
    window.open('https://chatgpt.com', '_blank');
  };

  const readText = async () => {
    const text = await navigator.clipboard.readText();
    setUrl(text);
  };

  return (
    <div className='min-h-screen py-20'>
      {/* url input */}
      <div className='py-20 flex justify-center'>
        <div className='text-lg bg-white rounded-2xl overflow-hidden flex flex-col w-[750px]'>
          <div className='flex p-2 gap-2'>
            <button onClick={readText} className='hover:bg-[#3c4e66] hover:text-white p-3 rounded-xl'>
              <ClipboardList />
            </button>
            <button onClick={openAi} className='hover:bg-[#3c4e66] hover:text-white p-3 rounded-xl'>
              <Bot />
            </button>
          </div>
          <textarea
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder='job description'
            className='px-5 outline-none text-lg'
            rows={5}
          />
        </div>
      </div>

      {/* json input */}
      <div className='flex justify-center'>
        <div className='bg-gray-900 rounded-xl flex flex-col overflow-hidden w-[750px]'>
          <div>
            <button className='text-white p-3 hover:bg-gray-700 rounded-xl'>
              <ClipboardList />
            </button>
          </div>
          <textarea
            name=''
            id=''
            className='bg-transparent p-4 outline-none text-white font-mono text-sm border-none resize-none'
            placeholder='json paste here'
            rows={20}
            value={jsonText}
            onChange={e => setJsonText(e.target.value)}
          />
        </div>
      </div>

      {/* CV and CL display */}
      {parseClData && parsedCvData && (
        <>
          {/* CV display */}
          <div className='py-20 text-center text-3xl justify-center flex items-center'>
            {user && <span className='bg-white/50 py-5 px-8 rounded-xl'> {user?.toUpperCase()}'s CV</span>}
          </div>
          <div className='flex items-center justify-center gap-20'>
            <Link href={'/cv?templateId=1'}>
              <div className='w-[318px] h-[450px] overflow-hidden rounded-lg'>
                <div className='w-[794px] h-[1123px] rounded-xl overflow-hidden scale-[0.4] origin-top-left'>
                  <CV data={parsedCvData} />
                </div>
              </div>
            </Link>
            <Link href={'/cv?templateId=2'}>
              <div className='w-[318px] h-[450px] rounded-lg overflow-hidden'>
                <div className='scale-[0.4] origin-top-left'>
                  <CV2 data={parsedCvData} />
                </div>
              </div>
            </Link>
          </div>

          {/* Cover Letter display */}
          <div className='py-20 text-center text-3xl justify-center flex items-center'>
            {user && <span className='bg-white/50 py-5 px-8 rounded-xl'> {user?.toUpperCase()}'s Cover Letter</span>}
          </div>
          <div className='flex items-center justify-center gap-20'>
            <Link href={'/cl?templateId=1'}>
              <div className='w-[318px] h-[450px] rounded-lg overflow-hidden'>
                <div className='scale-[0.4] origin-top-left'>
                  <CL data={parseClData} />
                </div>
              </div>
            </Link>
          </div>
        </>
      )}
      <ActionPanel />
    </div>
  );
};
