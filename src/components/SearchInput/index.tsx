'use client';

import { Search, X } from 'lucide-react';
import { cn } from '@/utils';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from '@/hooks/useRouter';

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  isSearching?: boolean;
}

export const SearchInput = ({
  className,
  placeholder = 'Search posts by title, description, or tags...',
  value: controlledValue,
  onChange,
  onClear,
  isSearching,
}: SearchInputProps) => {

  let value = controlledValue;
  let handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  let handleOnClear = () => {
    if (onClear) {
      onClear();
    }
  };
  let handleSetParam = (_key: string, _value: string) => { };

  // Only use Next.js hooks in uncontrolled mode
  if (controlledValue === undefined) {
    const searchParams = useSearchParams();
    const [uncontrolledValue, setUncontrolledValue] = useState(searchParams.get('q') || '');
    const router = useRouter();
    value = uncontrolledValue;
    handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUncontrolledValue(e.target.value);
    };
    handleOnClear = () => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('q');
      setUncontrolledValue('');
    };
    handleSetParam = (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`);
    };
  }

  return (
    <div
      className={cn(
        'sticky top-20 z-40 w-full pt-4 pb-2 animate-fade-in-fast backdrop-blur-md',
        className
      )}
    >
      <div className="relative flex items-center w-full max-w-2xl mx-auto">
        <Search
          className={cn(
            'absolute left-3 h-5 w-5 transition-colors',
            isSearching ? 'text-accent-foreground' : 'text-muted-foreground'
          )}
          aria-hidden="true"
        />

        <input
          type="text"
          value={value}
          onChange={handleOnChange}
          placeholder={placeholder}
          className="border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring h-12 w-full rounded-md border px-10 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Search posts"
          role="searchbox"
          onBlur={() => handleSetParam('q', value)}
        />
        {value && (
          <button
            onClick={handleOnClear}
            className="text-muted-foreground hover:text-foreground absolute right-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-foreground focus:ring-offset-2 rounded"
            aria-label="Clear search"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
