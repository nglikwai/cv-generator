'use client';
import { useSearchParams } from 'next/navigation';

import { Suspense, useEffect, useState } from 'react';

import classNames from 'classnames';
import defaultData from 'public/data/default.json';

import ActionPanel from './_components/ActionPanel';
import CV from './_components/CV';
import CV2 from './_components/CV2';
import Editor from './_components/Editor';

import { CV_PROMPT } from '@/constants/prompt';
import { useCV } from '@/hooks/useCV';
import { useStore } from '@/providers/StoreProvider';

const F = () => {
  const [CvDataText, setCvDataText] = useState<string | null>(null);
  const { readOnly, setError, parsedCvData, setParsedCvData, user } = useStore();
  const { invalidateQuery } = useCV();

  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId');

  const loadData = () => {
    if (parsedCvData) {
      setCvDataText(JSON.stringify(parsedCvData, null, 2));
    }
  };

  useEffect(() => {
    if (!user) return; // don't load data if user is not set
    loadData();
  }, [user]);

  useEffect(() => {
    if (!CvDataText) return;
    try {
      const parsed = JSON.parse(CvDataText);
      setParsedCvData(parsed);
      setError(false); // clear error if valid
    } catch {
      setParsedCvData(defaultData); // fallback
      setError(true); // mark error
    }
  }, [CvDataText, setError]);

  useEffect(() => {
    return () => {
      // Reset the CV data when the component unmounts
      setParsedCvData(defaultData);
      setCvDataText(null);
      setError(false);
    };
  }, []);

  if (!templateId || !parsedCvData || !CvDataText) return null;

  return (
    <>
      <div
        className={classNames('flex items-stretch', {
          'h-screen overflow-hidden': !readOnly,
          'justify-center': readOnly,
        })}
      >
        <div
          className={classNames({
            'overflow-y-scroll h-screen': !readOnly,
          })}
        >
          {templateId === '1' ? <CV data={parsedCvData} /> : <CV2 data={parsedCvData} />}
        </div>
        {!readOnly && <Editor jsonText={CvDataText} setText={setCvDataText} />}
      </div>
      <ActionPanel
        keyId={'cl-generator'}
        prompt={CV_PROMPT + JSON.stringify(parsedCvData, null, 2)}
        invalidateFuction={invalidateQuery}
        parsedData={parsedCvData}
      />
    </>
  );
};

export default () => (
  <Suspense>
    <F />
  </Suspense>
);
