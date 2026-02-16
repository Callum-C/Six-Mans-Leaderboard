import { ChevronUp, ChevronDown } from 'lucide-react';

export default function leaderboardColumnHeader ({sortHeaders, header, sortConfig, onSort}) {
  const isSortable = (sortHeaders.indexOf(header.id) > -1) ? true : false;
  const baseClass = "px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider";
  const sortClass = isSortable ? "cursor-pointer hover:text-white select-none transition-colours" : "";

  return (
    <th
      onClick={isSortable ? () => onSort(header.id) : undefined}
      className={`${baseClass} ${sortClass}`}
    >
      <div className="flex items-center gap-1">
        {header.label}
        {isSortable && (
          sortConfig.key === header.id ? (
            sortConfig.direction === 'asc' ? <ChevronUp size={16} className='ml-1' /> : <ChevronDown size={16} className='ml-1' />
          ) : (
            <div className='w-4 h-1 ml-1 opacity-0'></div>
          )
        )}
      </div>
    </th>
  )
};