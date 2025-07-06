export default ({ jsonText, setText }: { jsonText: string; setText: (text: string) => void }) => {
  return (
    <div className='grow bg-gray-900 border-l p-3'>
      <textarea
        name=''
        id=''
        defaultValue={jsonText}
        onChange={e => setText(e.target.value)}
        className='bg-transparent w-full h-full text-white font-mono text-sm p-2 border-none outline-none resize-none'
      />
    </div>
  );
};
