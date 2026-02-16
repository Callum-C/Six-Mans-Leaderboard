import { useState, useEffect, useMemo } from 'react';
import { Loader2, ChevronDown, Calendar } from 'lucide-react';
import { fetchGuildData } from '../services/api';
import Leaderboard from './Leaderboard';
import SearchBar from './SearchBar';

const SEASONS = [
  {id: 3, name: 'Season 3', date: 'Sept 2023 - Feb 2024', hasMMR: false, hasGames: true},
  {id: 2, name: 'Season 2', date: 'Apr 2023 - Sept 2023', hasMMR: false, hasGames: true},
  {id: 1, name: 'Season 1', date: 'Nov 2022 - Mar 2023', hasMMR: false, hasGames: true},
  {id: 0, name: 'Alpha Season', date: 'Mar 2022 - Nov 2022', hasMMR: false, hasGames: false},
];

export default function ArchiveContainer({guildID, season}) {

  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'mmr', direction: 'desc' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(SEASONS[season]);

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
      let data = [...stats[selectedSeason.id]].map(p => ({
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
    
  }, [stats, selectedSeason, searchQuery, sortConfig]);

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
          <p className="text-slate-400">Loading Archives...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-800 text-red-300 p-6 rounded-lg text-center my-8">
          <p className="font-bold text-lg mb-2">Error Loading Data</p>
          <p>{error}\nTry refreshingm. If the problem persists, blame Chinney.</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className=''>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Season Selector Dropdown */}
            <div className='relative isolate z-50'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full md:w-64 bg-slate-900 border border-slate-800 hover:border-slate-700 px-4 py-3 rounded-xl transition-all group shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-blue-400" />
                  <div className="text-left">
                    <div className="text-sm font-bold text-white leading-none">{selectedSeason.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{selectedSeason.date}</div>
                  </div>
                </div>
                <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
                {SEASONS.map((season) => (
                  <button
                    key={season.id}
                    onClick={() => {
                      setSelectedSeason(season);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex flex-col items-start px-4 py-3 hover:bg-slate-800 transition-colors text-left border-b border-slate-800 last:border-0 ${selectedSeason.id === season.id ? 'bg-blue-500/10' : ''}`}
                  >
                    <span className={`text-sm font-bold ${selectedSeason.id === season.id ? 'text-blue-400' : 'text-white'}`}>
                      {season.name}
                    </span>
                    <span className="text-xs text-slate-500">{season.date}</span>
                  </button>
                ))}
              </div>
              )}


            </div>

          </div>

          <div className='flex flex-col justify-center'>
            <Leaderboard 
              stats={placedStats} 
              isPlaced={true} 
              sortConfig={sortConfig} 
              onSort={handleSort}
              season={selectedSeason}
            />

            <Leaderboard 
              stats={unplacedStats} 
              isPlaced={false}
              sortConfig = {sortConfig}
              onSort={handleSort}
              season={selectedSeason}
            />
          </div>
        </div>
        
      )}
    </>
  );
}