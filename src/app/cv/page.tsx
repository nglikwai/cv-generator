'use client';
import { useSearchParams } from 'next/navigation';

import { Suspense, useEffect, useState } from 'react';

import classNames from 'classnames';
import defaultData from 'public/data/default.json';

import CV from './_components/CV';
import CV2 from './_components/CV2';
import Editor from './_components/Editor';

import { useStore } from '@/providers/StoreProvider';

const F = () => {
  const [CvDataText, setCvDataText] = useState<string | null>(null);
  const { readOnly, setError, parsedData, setParsedData, user } = useStore();

  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId');

  // Re-parse JSON and set error state whenever CvDataText changes

  useEffect(() => {
    if (!CvDataText) return;
    try {
      const parsed = JSON.parse(CvDataText);
      setParsedData(parsed);
      setError(false); // clear error if valid
    } catch {
      setParsedData(defaultData); // fallback
      setError(true); // mark error
    }
  }, [CvDataText, setError]);

  const loadCvData = async () => {
    try {
      const response = await fetch(`https://likwai.s3.us-east-1.amazonaws.com/cv-generator/${user}.json`);
      if (!response.ok) {
        setParsedData(defaultData); // fallback to default data if fetch fails
        setCvDataText(JSON.stringify(defaultData, null, 2)); // pretty print JSON
        return;
      }

      const data = await response.json();
      setCvDataText(JSON.stringify(data, null, 2)); // pretty print JSON
    } catch (error) {
      console.error('Error loading CV data:', error);
      setParsedData(defaultData);
      setError(true);
    }
  };

  useEffect(() => {
    if (!user) return; // don't load data if user is not set
    loadCvData();
  }, [user]);

  if (!templateId || !parsedData || !CvDataText) return null;

  return (
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
        {templateId === '1' ? <CV data={parsedData} /> : <CV2 data={parsedData} />}
      </div>
      {!readOnly && <Editor jsonText={CvDataText} setCvDataText={setCvDataText} />}
    </div>
  );
};

export default () => (
  <Suspense>
    <F />
  </Suspense>
);
