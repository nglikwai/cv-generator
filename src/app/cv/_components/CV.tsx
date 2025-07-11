import React from 'react';

import { Link, Linkedin, Mail, MapPin, Smartphone } from 'lucide-react';

import { SearchableComponents } from '@/hooks/useSearchable';
import { useStore } from '@/providers/StoreProvider';

export default function CV({
  data,
  components,
}: {
  data: any;

  components: SearchableComponents;
}) {
  const { readOnly } = useStore();

  const { SearchableText } = components;
  if (!data) return null;

  return (
    <div className='w-[794px] min-h-[2246px] bg-white text-black font-sans text-sm leading-5 mx-auto relative'>
      {!readOnly && (
        <div className='w-[794px] left-0 top-[1123px] border h-4 bg-gray-300/50 absolute z-20 border-dotted border-gray-400' />
      )}

      <header className='mb-6 text-center pb-4 bg-slate-100 px-12 pt-11 shadow-[0_2px_10px_rgba(0,0,0,0.1)] w-full'>
        <div className='flex justify-between w-full'>
          <div className='flex flex-col gap-4 items-start'>
            <SearchableText className='text-3xl font-black'>{data?.name}</SearchableText>
            <SearchableText className='text-lg font-semibold'>{data?.title}</SearchableText>
          </div>
          <div className='flex flex-col items-start gap-1'>
            {data?.contact?.email && (
              <div className='flex items-center gap-5'>
                <Mail size={16} />
                <SearchableText>{data?.contact?.email}</SearchableText>
              </div>
            )}
            {data?.contact?.phone && (
              <div className='flex items-center gap-5'>
                <Smartphone size={16} />
                <SearchableText>{data?.contact?.phone}</SearchableText>
              </div>
            )}
            {data?.contact?.website && (
              <div className='flex items-center gap-5'>
                <Link size={16} />
                <SearchableText>{data?.contact?.website}</SearchableText>
              </div>
            )}
            {data?.contact?.linkedin && (
              <div className='flex items-center gap-5'>
                <Linkedin size={16} />
                <SearchableText>{data?.contact?.linkedin}</SearchableText>
              </div>
            )}
            {data?.contact?.location && (
              <div className='flex items-center gap-5'>
                <MapPin size={16} />
                <SearchableText>{data?.contact?.location}</SearchableText>
              </div>
            )}
          </div>
        </div>
        <br />
        {data?.summary && (
          <SearchableText as='p' className='text-justify'>
            {data?.summary}
          </SearchableText>
        )}
      </header>

      <div className='p-12 pt-0'>
        {data?.proficiencies && (
          <section className='mb-4'>
            <SearchableText as='h3' className='font-bold uppercase text-base text-center pb-2'>
              Proficiencies
            </SearchableText>
            <ul className='text-sm'>
              {Object.entries(data?.proficiencies).map(([category, items]: any) => (
                <li key={category}>
                  <SearchableText className='font-semibold'>{category}</SearchableText>: {items.join(', ')}
                </li>
              ))}
            </ul>
          </section>
        )}

        {data?.experience && (
          <section className='mb-4'>
            <h3 className='font-bold uppercase text-base text-center pb-2'>Work Experience</h3>
            <div className='text-sm'>
              {data?.experience.map((job: any, idx: number) => (
                <div key={idx} className='mb-2'>
                  <p>
                    <SearchableText className='font-semibold'>{job.title}</SearchableText>
                    <SearchableText className='float-right italic'>{job.date}</SearchableText>
                  </p>
                  <SearchableText as='p' className='pb-2'>
                    {job.company}
                  </SearchableText>
                  <ul className='list-disc marker:text-[10px] marker:text-gray-400 pl-3'>
                    {job.details?.map((detail: string, i: number) => (
                      <SearchableText as='li' key={i} className='pl-4 leading-[20px]'>
                        {detail}
                      </SearchableText>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.education && (
          <section className='mb-4 mt-10 break-before-page'>
            <h3 className='font-bold uppercase text-base text-center pb-2'>Education</h3>
            <ul className='space-y-6 text-sm'>
              {data?.education.map((edu: any, idx: number) => (
                <li key={idx}>
                  <p>
                    <SearchableText as='b'>{edu.name}</SearchableText>
                    <span className='float-end italic'>{edu.date}</span>
                  </p>
                  <SearchableText>{edu.institution}</SearchableText>
                  <SearchableText>{edu.line1}</SearchableText>
                </li>
              ))}
            </ul>
          </section>
        )}

        {data?.certification && (
          <section className='mb-4'>
            <SearchableText as='h3' className='font-bold uppercase text-base text-center pb-2'>
              Certificates
            </SearchableText>
            <ul className='space-y-6 text-sm'>
              {data?.certification.map((cert: any, idx: number) => (
                <li key={idx}>
                  <p>
                    <SearchableText as='b'>{cert.name}</SearchableText>
                    <SearchableText className='float-end italic'>{cert.date}</SearchableText>
                  </p>
                  <SearchableText>{cert.institution}</SearchableText>
                  <SearchableText>{cert.line1}</SearchableText>
                </li>
              ))}
            </ul>
          </section>
        )}

        {data?.projects.length > 0 && (
          <section className='mb-4'>
            <h3 className='font-bold uppercase text-base text-center pb-2'>Projects</h3>
            <ul className='text-sm'>
              {data?.projects.map((project: any, idx: number) => (
                <li key={idx} className='mb-2'>
                  <p>
                    <SearchableText as='strong'>{project.name}</SearchableText> –
                    <SearchableText>{project.company}</SearchableText>
                  </p>
                  <SearchableText as='p'>{project.description}</SearchableText>
                </li>
              ))}
            </ul>
          </section>
        )}
        {data?.additional_skills && (
          <section className='mb-4'>
            <h3 className='font-bold uppercase text-base text-center pb-2'>Additional Skills</h3>
            <ul className='list-disc marker:text-[10px] marker:text-gray-400 pl-3'>
              {data?.additional_skills.map((skill: string, idx: number) => (
                <SearchableText as='li' key={idx} className='pl-4 text-sm'>
                  {skill}
                </SearchableText>
              ))}
            </ul>
          </section>
        )}

        {data?.languages && (
          <section>
            <h3 className='font-bold uppercase text-base text-center pb-2'>Languages</h3>

            <p className='text-sm'>{data.languages.map((l: any) => l.name).join(', ')}</p>
          </section>
        )}
      </div>
    </div>
  );
}
