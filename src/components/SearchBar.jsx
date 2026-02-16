import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery, defaultText="Search Player Username" }) {
  return (
    <div className='relative w-full sm:w-96 mb-4'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <Search size={18} className='' />
      </div>

      <input 
        type="text"
        placeholder={defaultText}
        className='block w-full pl-10 pr-10 py-2.5 border border-slate-700 rounded-lg leading-5 bg-slate-900 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-chinney-purple focus:border-chinney-purple sm:text-sm transition-all'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {searchQuery.length > 0 && (
        <button 
          onClick={() => setSearchQuery('')}
          className='absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white transition-colors'
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}