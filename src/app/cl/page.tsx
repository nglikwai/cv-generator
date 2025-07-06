'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames';
import defaultData from 'public/data/cl.json';

import ActionPanel from '../cv/_components/ActionPanel';
import Editor from '../cv/_components/Editor';

import CL from './_components/CL';

import { CL_PROMPT } from '@/constants/prompt';
import { useCL } from '@/hooks/useCL';
import { useCV } from '@/hooks/useCV';
import { useStore } from '@/providers/StoreProvider';

export default () => {
  const [ClDataText, setClDataText] = useState<string | null>(null);
  const { readOnly, setError, parsedData, setParsedData, user } = useStore();
  const { ClData, invalidateQuery } = useCL();
  const { CvData } = useCV();

  const loadData = () => {
    if (ClData) {
      setClDataText(JSON.stringify(ClData, null, 2));
    }
  };

  useEffect(() => {
    if (!user) return; // don't load data if user is not set
    loadData();
  }, [user]);

  useEffect(() => {
    loadData();
  }, [ClData]);

  useEffect(() => {
    if (!ClDataText) return;
    try {
      const parsed = JSON.parse(ClDataText);
      setParsedData(parsed);
      setError(false); // clear error if valid
    } catch {
      setParsedData(defaultData); // fallback
      setError(true); // mark error
    }
  }, [ClDataText, setError]);

  useEffect(() => {
    return () => {
      // Reset the CL data when the component unmounts
      setParsedData(defaultData);
      setClDataText(null);
      setError(false);
    };
  }, []);

  if (!parsedData || !ClDataText) return null;

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
          <CL />
        </div>
        {!readOnly && <Editor jsonText={ClDataText} setText={setClDataText} />}
      </div>
      <ActionPanel
        keyId={'cl-generator'}
        prompt={CL_PROMPT + JSON.stringify(CvData, null, 2)}
        invalidateFuction={invalidateQuery}
      />
    </>
  );
};
