'use client';

import { Search, X } from 'lucide-react';
import { cn } from '@/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isSearching?: boolean;
  className?: string;
  placeholder?: string;
}

export const SearchInput = ({
  value,
  onChange,
  onClear,
  isSearching = false,
  className,
  placeholder = 'Search posts by title, description, or tags...',
}: SearchInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={cn(
        'sticky top-20 z-40 w-full backdrop-blur-md pt-4 pb-2',
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
          type="search"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring h-12 w-full rounded-md border px-10 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Search posts"
          role="searchbox"
        />
        {value && (
          <button
            onClick={onClear}
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
