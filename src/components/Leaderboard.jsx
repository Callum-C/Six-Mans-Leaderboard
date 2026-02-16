import LeaderboardRow from './LeaderboardRow';
import LeaderboardColumnHeader from './LeaderboardColumnHeader';

const HEADERS = [
  {label: "Rank", id: "rank"},
  {label: "Player", id: "player"},
  {label: "MMR", id: "mmr"},
  {label: "Matches (W-L)", id: "matchesWon"},
  {label: "Match Diff", id: "matchDiff"},
  {label: "Win %", id: "winPercentage"},
  {label: "Streak", id: "streak"},
  {label: "Games (W-L)", id: "games"}
];

const SORTABLE_HEADERS = [
  "mmr", "matchesWon", "matchDiff", "winPercentage"
];

export default function renderLeaderboard({stats, isPlaced, sortConfig, onSort, season}) {
  if (!stats || stats.length === 0) return null;

  const title = isPlaced ? "Ranked" : "Unranked";
  const hasMMR = season?.hasMMR;
  const hasGames = season?.hasGames;

  return (
    <div className=''>
      <h2 className='text-xl font-bold text-white my-4 pl-1'>{title}</h2>
      <div className='bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl mb-8'>
        { /* Leaderboard Background  */ }
        <div className='overflow-x-auto'>
          { /* Leaderboard Container */ }
          <table className='min-w-full table-auto'>

            <thead className='bg-slate-950/50 text-white border-b border-slate-800'>
              <tr>
                {HEADERS.map((heading) => {

                  if (
                    (heading.id === "mmr" && hasMMR === false) ||
                    (heading.id === "games" && hasGames === false)
                  ) {
                    return null;
                  }

                  return (
                    <LeaderboardColumnHeader 
                      key={heading.id}
                      sortHeaders={SORTABLE_HEADERS}
                      header={heading}
                      sortConfig={sortConfig}
                      onSort={onSort}
                      season={season}
                    />
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {stats.map((player, index) => {
                return (
                  <LeaderboardRow 
                    key={player.username} 
                    player={player} 
                    index={index}
                    sortConfig={sortConfig}
                    isPlaced={isPlaced}
                    season={season}
                  />
                );
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
    
  );
}
