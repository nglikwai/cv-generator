'use client';
import { useState } from 'react';

import ActionPanel from './_components/ActionPanel';
import CV from './_components/CV';
import CvData from './_components/data.json';
import Editor from './_components/Editor';

export default function Home() {
  const [CvDataText, setCvDataText] = useState(JSON.stringify(CvData, null, 2));

  // Safe JSON parse with fallback
  const safeJsonParse = <T,>(text: string, fallback: T): T => {
    try {
      return JSON.parse(text);
    } catch {
      return fallback;
    }
  };

  const parsedData = safeJsonParse(CvDataText, CvData); // fallback to original if invalid

  return (
    <div className='flex items-stretch h-screen overflow-hidden'>
      <CV data={parsedData} />
      <Editor jsonText={CvDataText} setCvDataText={setCvDataText} />
      <ActionPanel />
    </div>
  );
}
