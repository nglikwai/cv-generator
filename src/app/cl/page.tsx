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
import useSearchable from '@/hooks/useSearchable';
import { useStore } from '@/providers/StoreProvider';

export default () => {
  const [ClDataText, setClDataText] = useState<string | null>(null);
  const { readOnly, setError, parseClData, setParseClData, user } = useStore();
  const { CvData } = useCV();

  const { textareaRef } = useSearchable();

  const { invalidateQuery, ClData } = useCL();

  const loadData = () => {
    if (parseClData) {
      setClDataText(JSON.stringify(parseClData, null, 2));
    }
  };

  useEffect(() => {
    if (!user) return; // don't load data if user is not set
    loadData();
  }, [user]);

  useEffect(() => {
    if (ClData) {
      setClDataText(JSON.stringify(ClData, null, 2));
    }
  }, [ClData]);

  useEffect(() => {
    if (!ClDataText) return;
    try {
      const parsed = JSON.parse(ClDataText);
      setParseClData(parsed);
      setError(false); // clear error if valid
    } catch {
      setParseClData(defaultData); // fallback
      setError(true); // mark error
    }
  }, [ClDataText, setError]);

  useEffect(() => {
    return () => {
      // Reset the CL data when the component unmounts
      setParseClData(defaultData);
      setClDataText(null);
      setError(false);
    };
  }, []);

  if (!ClDataText) return null;

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
          <CL data={parseClData} />
        </div>
        {!readOnly && <Editor jsonText={ClDataText} setText={setClDataText} textareaRef={textareaRef} />}
      </div>
      <ActionPanel
        keyId={'cl-generator'}
        prompt={CL_PROMPT + JSON.stringify(CvData, null, 2)}
        invalidateFuction={invalidateQuery}
        parsedData={parseClData}
        setTextFunction={setClDataText}
      />
    </>
  );
};
