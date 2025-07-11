export default ({
  jsonText,
  setText,
  textareaRef,
}: {
  jsonText: string;
  setText: (text: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}) => {
  return (
    <div className='grow bg-gray-900 border-l p-3'>
      <textarea
        ref={textareaRef}
        name=''
        id=''
        onChange={e => setText(e.target.value)}
        value={jsonText}
        className='bg-transparent w-full h-full text-white font-mono text-sm p-2 border-none outline-none resize-none'
      />
    </div>
  );
};
