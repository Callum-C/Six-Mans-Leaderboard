import { Flame, Snowflake } from 'lucide-react';

export default function renderLeaderboardRow({ player, index, sortConfig, isPlaced, season }) {

  const rankDisplay = isPlaced ? (
    sortConfig.key === 'mmr' && sortConfig.direction === 'desc' ? index + 1 : '-'
  ) : (
    <span className="text-xs font-bold text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded">UR</span>
  );

  const flameAnimation = player.winStreak > 2 ? 'animate-pulse' : 'animate-none';
  const hasMMR = season?.hasMMR;
  const hasGames = season?.hasGames;

  const matchDiffCol = player.matchDiff > 0 ? "text-green-400/80" : player.matchDiff < 0 ? "text-red-400/80" : "text-slate-400/80";

  return (
    <tr className='hover:bg-slate-800/50 transition-colors group border-b border-slate-800'>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono w-16 text-center">
        {rankDisplay}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 border border-slate-600 mr-3">
            {player.username.substring(0, 2).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-white group-hover:text-chinney-gold transition-colors">
            {player.username}
          </span>
        </div>
      </td>

      {hasMMR && (
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex flex-col">
            {player.mmr}
            {/*TODO Add Rank Tier (Bronze - Siler - Gold etc*/}
          </div>
        </td>
      )}
      

      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
        <span className='text-green-400 font-bold'>{player.matchesWon}</span> - <span className='text-red-400 font-bold'>{player.matchesLost}</span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
        <span className={`${matchDiffCol}`}>{player.matchDiff}</span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-16 bg-slate-800 rounded-full h-1.5 mr-2 overflow-hidden">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${player.winPercentage}%` }}></div>
          </div>
          <span className="text-sm text-slate-300">{`${player.winPercentage}%`}</span>
        </div>
      </td>
      
      {/*The following <td> is causing the diagonally-descending hyphens. */}
      <td className='px-6 py-4 whitespace-nowrap text-sm isolate'>
        <div className='flex items-center min-h-[28px]'>
          {player.winStreak > 0 && player.losingStreak <= 0 && (
            <span className={`flex items-center text-orange-400 font-bold bg-orange-400/10 px-2 py-1 rounded w-fit ${flameAnimation} transform-gpu`}>
              <Flame size={14} className={`mr-1 fill-orange-400/40 flex-shrink-0`}/>  {player.winStreak}
            </span>
          )}

          {player.losingStreak > 0 && player.winStreak <= 0 && (
            <span className='flex items-center text-cyan-400 font-bold bg-cyan-400/10 px-2 py-1 rounded w-fit'>
              <Snowflake size={14} className='mr-1 flex-shrink-0' /> {player.losingStreak}
            </span>
          )}

          {player.winStreak <= 0 && player.losingStreak <= 0 && (
            <span className='flex items-center px-2 py-1 rounded w-fit'> - </span>
          )}

        </div>
      </td>
      
      {hasGames && (
        <td>
          <div className='px-6 py-4 flex items-center'>
            <span className='text-green-400/50 mr-1'>{player.gamesWon}</span> - <span className='text-red-400/50 ml-1'>{player.gamesLost}</span>
          </div>
        </td>
      )}
      
    </tr>
  );
}