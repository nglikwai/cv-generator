import React from 'react';

export default function CV({ data }: { data: any }) {
  return (
    <div className='overflow-y-scroll h-screen'>
      <div className='w-[794px] min-h-[2246px] p-10 bg-white text-black font-sans text-[12pt] leading-5 mx-auto '>
        <header className='mb-4 text-center border-b border-black pb-4'>
          <h1 className='text-xl font-bold'>{data.name}</h1>
          <h2 className='text-md'>{data.title}</h2>
          <div className='text-sm'>
            <p>
              <span className='w-40 inline-block text-end pr-3'>
                {data.contact.email}
              </span>
              |
              <span className='w-36 inline-block text-start pl-3'>
                {data.contact.phone}
              </span>
            </p>
            <p>
              <span className='w-40 inline-block text-end pr-3'>
                {data.contact.github}
              </span>
              |
              <span className='w-36 inline-block text-start pl-3'>
                {data.contact.website}
              </span>
            </p>
          </div>
          <br />
          <p className='text-sm'>{data.summary}</p>
        </header>

        <section className='mb-6'>
          <h3 className='font-bold uppercase text-center py-4'>
            Proficiencies
          </h3>
          <ul className='text-sm'>
            {Object.entries(data.proficiencies).map(
              ([category, items]: any) => (
                <li key={category}>
                  <strong>{category}:</strong> {items.join(', ')}
                </li>
              )
            )}
          </ul>
        </section>

        <section className='mb-6'>
          <h3 className='font-bold uppercase text-center py-4'>Experience</h3>
          <div className='text-sm'>
            {data.experience.map((job: any, idx: number) => (
              <div key={idx} className='mb-4'>
                <p className='font-semibold'>
                  {job.title} – {job.company}{' '}
                  <span className='float-right italic'>{job.date}</span>
                </p>
                <ul className='list-disc marker:text-[10px] pl-3'>
                  {job.details.map((detail: string, i: number) => (
                    <li key={i} className='pl-4'>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className='mb-6 break-before-page pt-10'>
          <h3 className='font-bold uppercase text-center py-4'>
            Education & Certifications
          </h3>
          <ul>
            {data.education.map((edu: any, idx: number) => (
              <li key={idx}>
                {edu.name} ({edu.date})
              </li>
            ))}
          </ul>
        </section>

        <section className='mb-6'>
          <h3 className='font-bold uppercase text-center py-4'>Projects</h3>
          <ul className='text-sm'>
            {data.projects.map((project: any, idx: number) => (
              <li key={idx} className='mb-4'>
                <p>
                  <strong>{project.name}</strong> – {project.company}
                </p>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className='mb-6'>
          <h3 className='font-bold uppercase text-center py-4'>
            Additional Skills
          </h3>
          <ul className='list-disc marker:text-[10px] pl-3'>
            {data.additional_skills.map((skill: string, idx: number) => (
              <li key={idx} className='pl-4'>
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className='font-bold uppercase text-center py-4'>Languages</h3>
          <p className='text-sm'>{data.languages.join(', ')}</p>
        </section>
      </div>
    </div>
  );
}
