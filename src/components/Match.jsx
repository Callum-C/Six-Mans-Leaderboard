import { useState } from 'react';
import { Calendar, Clock, Timer, Gamepad2, User } from 'lucide-react';
import { formatDate, formatDuration, formatTime } from '../helpers/utilityFunctions';
 
export default function renderMatch({ match, players }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const winner = match.status === "Team 1" ? "Team 1" : "Team 2";

  const winnerBadgeClass = winner == 'Team 1' 
    ? "bg-blue-900/20 text-blue-400 border-blue-800/30" 
    : "bg-orange-900/20 text-orange-400 border-orange-800/30"
  ;

  const renderMMRChange = (pid) => {
    const change = match.mmrChanges?.[pid]?.mmr + match.mmrChanges?.[pid]?.bonus;

    if (change === undefined || change === null) return null;

    const isPositive = change > 0;
    const colorClass = isPositive ? 'text-green-400' : (change < 0 ? 'text-red-400' : 'text-slate-500');
    const symbol = isPositive ? '+' : '';

    return (
      <span className={`text-xs font-mono font-bold ${colorClass} opacity-80`}>
        {symbol}{change}
      </span>
    );
  };


  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-slate-900 rounded-lg border border-slate-800 p-4 hover:border-slate-700 transition-all shadow-lg mb-4"
    >
      
      {/* Match Header - Show Match ID, Date, Time, Duration and Winner */}
      <div className="flex justify-between items-center mb-4">

        {/* Match Info - ID, Date, Duration */}
        <div className="flex items-center mb-2 md:mb-0 text-xs text-slate-500 overflow-hidden">

          <span className='px-2 py-0.5 rounded text-xs font-bold bg-slate-800 text-slate-400 mr-2'>
            Match #{match.matchID}
          </span>

          <span className='flex items-center mr-4'>
            <Calendar size={12} className='mr-1.5 opacity-70' title="Date"/> {formatDate(match.createdAt)}
          </span>

          <span className='flex items-center mr-4'>
            <Clock size={12} className='mr-1.5 opacity-70' title="Start Time"/> {formatTime(match.createdAt)}
          </span>

          <span className='hidden sm:flex items-center mr-4'>
            <Timer size={12} className='mr-1.5 opacity-70' title="Duration"/> {formatDuration(match.createdAt, match.updatedAt)}
          </span>

        </div>

        {/* Match Winner in Green Text and Backing */}
        <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${winnerBadgeClass}`}>
          {winner}
        </div>
      </div>

      {/* --- Expanded Match Details - Selection Method etc --- */}
      {isExpanded && (
        <div className='flex flex-col mb-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>

            {/* Duration - Mobile only */}
            {match.updatedAt &&  (
              <div className='flex flex-col sm:hidden'>
                <span className='text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1'>
                  <Timer size={10} /> Duration
                </span>
                <span className='text-slate-200 font-medium"'>
                  {formatDuration(match.createdAt, match.updatedAt)}
                </span>
              </div>
            )}

            {/* Selection Method */}
            <div className='flex flex-col'>
              <span className='text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1'>
                <Gamepad2 size={10} /> Selection Method
              </span>
              <span className='text-slate-200 font-medium'>{match.creationMethod || "Unknown"}</span>
            </div>

            {/* Captains */}
            {match.captains && match.captains.length > 0 && (
              <div className='flex flex-col'>
                <span className='text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1'>
                  <User size={10} /> Captains
                </span>
                <div className='flex flex-wrap gap-2'>
                  {match.captains.map((capId, index) => (
                     <span key={capId} className="flex items-center text-chinney-gold font-medium">
                       {players[capId] ?? "Unknown"}
                       {index < match.captains.length - 1 && <span className="text-slate-600 mx-1">,</span>}
                     </span>
                   ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}


      {/* Team Cards Container */}
      <div className='flex items-stretch rounded-lg overflow-hidden border border-slate-800'>

        {/* Team 1 / Blue Team - Team Card */}
        <div className={`flex-1 p-4 ${winner === 'Team 1' ? 'bg-blue-500/10' : 'bg-slate-900'}`}>
          <div className='flex justify-between items-center mb-3'>
            <div className='text-blue-400 font-bold uppercase tracking-widest text-sm whitespace-nowrap'>Team 1</div>
            <span className={`text-2xl font-black ${winner === 'Team 1' ? 'text-white' : 'text-slate-600'}`}>{match.team1Score}</span>
          </div>
          <div>
            {match.team1.map(pid => (
              <div key={pid} className='text-sm text-slate-300 flex items-center'>
                <div className='w-1 h-1 bg-blue-500 rounded-full mr-2'/>

                <span className='mr-2'>
                  {players[pid] ?? "Unknown"}
                </span>
                {renderMMRChange(pid)}
              </div>
            ))}
          </div>
        </div>

        {/* Team Cards Divider */}
        <div className='w-px bg-slate-800'/>

        {/* Team 2 / Orange Team - Team Card */}
        <div className={`flex-1 p-4 ${winner === 'Team 2' ? 'bg-orange-500/10' : 'bg-slate-900'}`}>
          <div className='flex justify-between items-center mb-3'>
            <span className={`text-2xl font-black ${winner === 'Team 2' ? 'text-white' : 'text-slate-600'}`}>{match.team2Score}</span>
            <div className="text-orange-400 font-bold uppercase tracking-widest text-sm whitespace-nowrap text-right">
              Team 2
            </div>
          </div>
          <div>
            {match.team2.map(pid => (
              <div key={pid} className='text-sm text-slate-300 flex items-center justify-end'>
                
                <span className='mr-2'> {/* Change to ml-2 if mmr change is before the name */}
                  {players[pid] ?? "Unknown"}
                </span>
                {renderMMRChange(pid) /* TODO: Decide on placing this before or after the player's name on orange team */} 
                <div className='w-1 h-1 bg-orange-500 rounded-full ml-2'/>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}