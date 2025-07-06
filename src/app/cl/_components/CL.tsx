// components/CoverLetter.tsx
'use client';

export default function CoverLetter({ data }: { data: any }) {
  if (!data) return null;
  const { applicant, recipient, body } = data;

  return (
    <div className='w-[794px] h-[1123px] overflow-hidden p-12 bg-white text-black font-sans text-[10pt] leading-5 mx-auto '>
      <header className='mb-10'>
        <h1 className='text-3xl font-black mb-8'>
          <span>{applicant.name}</span>
          <span className='w-5 h-5 bg-black inline-block float-end' />
        </h1>
        <p className='font-bold mb-10'>{applicant.title}</p>
        <p className='mb-1'>
          <b className='w-36 inline-block'>Phone:</b>
          <span className='text-gray-500'> {applicant.phone}</span>
        </p>
        <p>
          <b className='w-36 inline-block'>Email:</b>
          <span className='text-gray-500'>{applicant.email}</span>
        </p>
      </header>

      <div className='flex gap-10'>
        <div className='w-40 shrink-0 flex flex-col gap-20'>
          <div className=''>
            <p>TO </p>
            <b className='mt-8 block mb-1'>{recipient.to}</b>
            <p className='text-gray-500'>{recipient.company}</p>
          </div>

          <div className='space-y-1'>
            <p>FROM </p>
            <b className='pt-8 block mb-1'>{applicant.name}</b>
            <p className='text-gray-500'>{applicant.title}</p>
          </div>
        </div>

        <main className='space-y-4 leading-relaxed'>
          <p className='mb-8'>Dear {recipient.to},</p>
          {body.map((para: string, idx: number) => (
            <p key={idx} className='text-justify'>
              {para}
            </p>
          ))}
          <p className='pt-8'>Best,</p>
          <p>{applicant.name}</p>
        </main>
      </div>
    </div>
  );
}
