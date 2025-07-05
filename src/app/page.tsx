import Link from 'next/link';

export default () => {
  return (
    <div className='flex items-center justify-center min-h-screen gap-20'>
      <Link href={'/cv?templateId=1'}>
        <div className='w-80 h-96 bg-white rounded-xl' />
      </Link>
      <Link href={'/cv?templateId=2'}>
        <div className='w-80 h-96 bg-white rounded-xl overflow-hidden'>
          <div className='bg-[#9d936a] w-28 h-full'>
            <div className='bg-[#3c4e66] w-full h-32' />
          </div>
        </div>
      </Link>
    </div>
  );
};
