import React, { createContext, useContext } from 'react';

import classNames from 'classnames';
import { Info, Linkedin, Mail, Phone, Triangle } from 'lucide-react';

const DataContext = createContext<CVData | null>(null);
const useData = () => useContext(DataContext);

export default function CVWillDynamic({ data }: { data: CVData }) {
  if (!data) return null;
  return (
    <DataContext value={data}>
      <div
        className={classNames(
          'w-[794px] h-[1123px] overflow-hidden text-black font-sans text-[11pt] flex items-stretch'
        )}
      >
        {/* Left */}
        <div className='bg-[#3c4e66] w-64 shrink-0 flex flex-col'>
          <div className='text-white py-5 px-8 text-center'>
            <PersonalDetail />
            <Contact />
          </div>
          <section className='flex flex-col gap-10 text-xs bg-[#9d936a] grow p-6 text-white'>
            <Tools />
            <Languages />
            <Skills />
            <Qualifications />
          </section>
        </div>

        {/* Right */}
        <div className='bg-white py-5 px-8 grid gap-4 text-[11.5px] leading-[13px] pb-0'>
          <Profile />
          <div className='mx-20 bg-[#9d936a] h-[2px]' />
          <Experience />
          <div className='mx-20 bg-[#9d936a] h-[2px]' />
          <Education />
        </div>
      </div>
    </DataContext>
  );
}

const PersonalDetail = () => {
  const data = useData();
  return (
    <section className='mb-4'>
      <h1 className='text-3xl font-black uppercase'>{data?.preferredName}</h1>
      <h1 className='text-2xl font-black'>{data?.name}</h1>
    </section>
  );
};

const Contact = () => {
  const data = useData();

  return (
    <section className='divide-solid divide-y divide-[#9d936a] text-sm'>
      <p className='flex items-center gap-4 py-2'>
        <Linkedin size={18} />
        <span className='text-center w-full'>{data?.contact?.linkedin}</span>
      </p>
      <p className='flex items-center gap-4 py-2'>
        <Info size={18} />
        <span className='text-center w-full'>{data?.contact?.linkedin}</span>
      </p>
      <p className='flex items-center gap-4 py-2'>
        <Phone size={18} />
        <span className='text-center w-full'>{data?.contact?.phone}</span>
      </p>
      <p className='flex items-center gap-4 py-2'>
        <Mail size={18} />
        <span className='text-center w-full'>{data?.contact?.email}</span>
      </p>
    </section>
  );
};

const Tools = () => {
  const data = useData();
  if (!data?.tools) return null;

  return (
    <div>
      <h2 className='text-base font-black mb-2 uppercase'>TOOLS</h2>

      <div className='grid gap-6'>
        {data?.tools.map(({ name, score }) => (
          <div key={name} className='grid items-center gap-1'>
            <span className='font-medium'>{name}</span>
            <div className='w-full h-1 bg-white'>
              <div
                className='bg-[#3c4e66] h-full'
                style={{
                  width: `${score}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Languages = () => {
  const data = useData();
  if (!data?.languages) return null;

  return (
    <div>
      <h2 className='text-base font-black mb-2 uppercase'>Languages</h2>

      <div className='grid gap-3'>
        {data?.languages.map(({ name, score }) => (
          <div key={name} className='flex items-center gap-1'>
            <span className='font-medium w-32'>{name}</span>
            <div className='grow h-1 bg-white'>
              <div
                className='bg-[#3c4e66] h-full'
                style={{
                  width: `${score}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const data = useData();
  if (!data?.skills) return null;

  return (
    <div>
      <h2 className='text-base font-black mb-2 uppercase'>SKILLS</h2>

      <div className='grid gap-3'>
        {data?.skills.map(({ name, score }) => (
          <div key={name} className='flex items-center gap-2'>
            <span className='w-24 font-medium'>{name}</span>
            <div className='flex gap-2'>
              {Array(Math.floor(score))
                .fill(0)
                .map((_, index) => (
                  <div key={index} className='bg-[#3c4e66] w-[14px] h-[14px] border border-white rounded-full' />
                ))}

              {score.toString().endsWith('.5') && (
                <div className='bg-[#3c4e66] w-[14px] h-[14px] border border-white rounded-full relative overflow-hidden'>
                  <div className='bg-white absolute w-4 h-4 left-[7px]' />
                </div>
              )}
              {5 - Math.ceil(score) > 0 && <div className='bg-white w-[14px] h-[14px]  rounded-full' />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Qualifications = () => {
  const data = useData();
  if (!data) return null;

  return (
    <div>
      <h2 className='text-base font-black mb-2 uppercase'>Qualifications</h2>

      <div className='grid gap-3'>
        {data?.qualifications.map(name => (
          <div key={name} className='flex items-center gap-2'>
            <span>-</span>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = () => {
  const data = useData();
  if (!data) return null;
  return (
    <section>
      <h2 className='text-base font-black mb-2 uppercase text-[#3c4e66]'>PROFILE</h2>
      <p>{data?.summary}</p>
    </section>
  );
};

const Experience = () => {
  const data = useData();
  if (!data) return null;
  return (
    <section>
      <h2 className='text-base font-black mb-2 uppercase text-[#3c4e66]'>WORK EXPERIENCE</h2>
      <div className='space-y-4'>
        {data?.experience.map((job, index) => (
          <div key={index}>
            <p>
              <span className='font-black text-[13px]'>{job.title}</span>
              <span className='px-2'>|</span>
              <span className='text-[#3c4e66] text-xs'>{job.company}</span>
              <span className='float-right text-gray-500 text-xs'>{job.date}</span>
            </p>

            <div className='text-xs text-gray-400 mb-2'>{job?.summary}</div>
            <ul className='list-none space-y-[9px]'>
              {job.details.map((line, i) => (
                <li key={i} className='flex gap-2'>
                  <span>-</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

const Education = () => {
  const data = useData();
  if (!data) return null;
  return (
    <section>
      <h2 className='text-base font-black mb-2 uppercase text-[#3c4e66]'>EDUCATION</h2>
      {data?.education.map((edu, index) => (
        <div key={index} className='mb-4 flex items-center gap-8'>
          {/* Date */}
          <span className='border-2 border-gray-500 rounded-xl w-20 py-2 shrink-0 relative flex flex-col items-center justify-center'>
            <Triangle fill='#6b7280' className='absolute right-[-22px] rotate-[90deg]' stroke='0' />
            {edu.date.split('–').map(d => (
              <span key={d.trim()}>{d.trim()}</span>
            ))}
          </span>
          {/* Details */}
          <div>
            <div className='grid gap-1'>
              <p className='font-black'>{edu.name}</p>
              {edu.institution && <span className='text-[11px] text-[#3c4e66] font-bold'>{edu.institution}</span>}
              {edu.line1 && <p className='text-xs text-gray-500'>{edu.line1}</p>}
            </div>
            {edu.results && edu.results.length > 0 && (
              <ul className='text-xs text-gray-500 mt-1 italic'>
                <div className='w-92 flex gap-10'>
                  <span className='w-24'>Subject</span>
                  <span className='w-10'>HKDSE</span>
                  <span>
                    <b>UK A-Level</b> Equivalent
                  </span>
                </div>
                {edu.results.map((result, i) => (
                  <PublicExamItem key={i} result={result} />
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

const PublicExamItem = ({ result }: { result?: string }) => {
  if (!result) return null;
  const [sub, dse, al] = result.split('-');
  return (
    <div className='w-80 flex gap-10'>
      <span className='w-24'>{sub}</span>
      <span className='w-10'>Lv. {dse}</span>
      <span>Grade {al}</span>
    </div>
  );
};
interface CVData {
  name: string;
  preferredName?: string; // Optional field for preferred name
  title: string;
  contact: {
    email: string;
    phone: string;
    github?: string;
    website?: string;
    linkedin?: string; // Optional field for LinkedIn profile
  };
  summary: string;
  proficiencies: {
    [category: string]: string[];
  };
  experience: {
    title: string;
    company: string;
    date: string;
    summary?: string; // Optional field for a brief summary of the role
    details: string[];
  }[];
  education: {
    name: string;
    date: string;
    institution?: string; // Optional field for institution name
    line1?: string; // Optional field for additional information
    results?: string[]; // Optional field for exam results or grades
  }[];
  projects: {
    name: string;
    description: string;
  }[];
  additional_skills: string[];
  languages: { name: string; score: number }[];
  tools: { name: string; score: number }[];
  skills: { name: string; score: number }[];
  qualifications: string[];
}
