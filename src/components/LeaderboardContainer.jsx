import { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchGuildData } from '../services/api';
import Leaderboard from './Leaderboard';
import SearchBar from './SearchBar';

const CURRENT_SEASON = {
  id: 4, name: 'Season 4', date: 'Feb 2024 - Present', hasMMR: true, hasGames: true,
}

export default function LeaderboardContainer({guildID, season}) {

  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'mmr', direction: 'desc' });

  var placedStats, unplacedStats;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchGuildData(guildID);
        setStats(data);

      } catch (error) {
        setError("Failed to load leaderboard data.");
        console.error("Leaderboard Container Call API Error", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const processedData = useMemo(() => {
    if (!isLoading){
      let data = stats[season].map(p => ({
        ...p,
        username: p.username || 'Unknown'
      }));

      if (searchQuery) {
        data = data.filter(
          p => p.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      if (sortConfig.key) {
        data.sort((a, b) => {

          // parseFloat to prevent comparing strings (win percentage)
          const valA = parseFloat(a[sortConfig.key]);
          const valB = parseFloat(b[sortConfig.key]);

          if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
          if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }

      return data;
    } else {
      return [];
    }
    
  }, [stats, searchQuery, sortConfig]);

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  }

  if (!isLoading && !error) {
    placedStats = processedData.filter(player => player.placed);
    unplacedStats = processedData.filter(player => !player.placed);
  }

  return (
    <>
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-chinney-purple mb-4" size={48} />
          <p className="text-slate-400">Loading Season Data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-800 text-red-300 p-6 rounded-lg text-center my-8">
          <p className="font-bold text-lg mb-2">Error Loading Data</p>
          <p>{error}\nTry refreshing. If the problem persists, blame Chinney.</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className=''>
          <div className=''>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          <div className='flex flex-col justify-center'>
            <Leaderboard 
              stats={placedStats} 
              isPlaced={true} 
              sortConfig={sortConfig} 
              onSort={handleSort}
              season={CURRENT_SEASON}
            />

            <Leaderboard 
              stats={unplacedStats} 
              isPlaced={false}
              sortConfig = {sortConfig}
              onSort={handleSort}
              season={CURRENT_SEASON}
            />
          </div>
        </div>
        
      )}
    </>
  );
}