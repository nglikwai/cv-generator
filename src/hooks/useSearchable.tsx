import { ElementType, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { useStore } from '@/providers/StoreProvider';

export default () => {
  const [query, setQuery] = useState('');
  const { readOnly } = useStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const SearchableText = (props: { as: ElementType; children: React.ReactNode; className?: string }) => {
    const { as: Comp = 'span', children } = props;
    return (
      <Comp
        {...props}
        className={classNames(props.className, {
          'hover-highlight': !readOnly,
        })}
        onDoubleClick={() => setQuery(children as string)}
      >
        {children}
      </Comp>
    );
  };

  const handleSearch = () => {
    const textarea = textareaRef.current as any;

    if (!textarea) return;
    const value = textarea.value;

    const index = value.toLowerCase().indexOf(query?.toLowerCase());

    if (index >= 0) {
      textarea.setSelectionRange(index, index + query.length);
      textarea.focus();
      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
      const lineIndex = value.slice(0, index).split('\n').length - 1;
      textarea.scrollTop = lineIndex * lineHeight;
    } else {
      alert('Not found.');
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  return {
    query,
    setQuery,
    components: {
      SearchableText,
    },
    handleSearch,
    textareaRef,
  };
};

export type SearchableComponents = {
  SearchableText: ElementType;
};
