'use client';
import { useSearchParams } from 'next/navigation';

import { Suspense, useEffect, useState } from 'react';

import classNames from 'classnames';

import ActionPanel from './_components/ActionPanel';
import CV from './_components/CV';
import CV2 from './_components/CV2';
import CvData from './_components/data.json';
import Editor from './_components/Editor';
import WillCV from './_data/will.json';

import { useStore } from '@/providers/StoreProvider';

const F = () => {
  const [CvDataText, setCvDataText] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any | null>(null);
  const { readOnly, setError } = useStore();

  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId');

  // Re-parse JSON and set error state whenever CvDataText changes

  useEffect(() => {
    if (!CvDataText || !CvData) return;
    try {
      const parsed = JSON.parse(CvDataText);
      setParsedData(parsed);
      setError(false); // clear error if valid
    } catch {
      setParsedData(CvData); // fallback
      setError(true); // mark error
    }
  }, [CvDataText, setError]);

  useEffect(() => {
    if (!CvData) return;
    if (templateId === '1') {
      setCvDataText(JSON.stringify(CvData, null, 2));
    } else if (templateId === '2') {
      setCvDataText(JSON.stringify(WillCV, null, 2));
    }
  }, [templateId]);

  if (!templateId || !parsedData || !CvDataText) return null;

  return (
    <div
      className={classNames('flex items-stretch', {
        'h-screen overflow-hidden': !readOnly,
        'justify-center': readOnly,
      })}
    >
      <div className='overflow-y-scroll h-screen'>
        {templateId === '1' ? <CV data={parsedData} /> : <CV2 data={parsedData} />}
      </div>
      {!readOnly && <Editor jsonText={CvDataText} setCvDataText={setCvDataText} />}
      <ActionPanel />
    </div>
  );
};

export default () => (
  <Suspense>
    <F />
  </Suspense>
);
