import {useState} from 'react';

import Header from './components/Header';
import LeaderboardContainer from './components/LeaderboardContainer';
import MatchesContainer from './components/MatchesContainer';
import ArchiveContainer from './components/ArchiveContainer';

export default function App() {

  const URLParams = new URLSearchParams(window.location.search);
  const guildID = URLParams.get('guildID') ? URLParams.get('guildID') : '349293115225407488';

  const [activeTab, setActiveTab] = useState('leaderboard');

  const PAGES = [ // {label: 'Content', id: 'content'}, {label: 'Server Stats', id: 'server_stats'}, 
    {label: 'Leaderboard', id: 'leaderboard'}, // {label: 'Player Lookup', id: 'player_lookup'},
    {label: 'Matches', id: 'matches'},
    {label: 'Archives', id: 'archive'}
  ];

  return (
    <div className='w-full bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-chinney-purple selection:text-white'> 
      <Header pages={PAGES} setActiveTab={setActiveTab} />
      
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>

        {activeTab === 'leaderboard' && (
          <LeaderboardContainer guildID={guildID} season={4} />
        )}

        {activeTab === 'matches' && (
          <MatchesContainer guildID={guildID} />
        )}

        {activeTab === 'archive' && (
          <ArchiveContainer guildID={guildID} season={0} />
        )}

        {(activeTab === 'player_lookup' || activeTab === 'server_stats' || activeTab === 'content') && (
          <div className="bg-red-900/20 border border-red-800 text-red-300 p-6 rounded-lg text-center my-8">
            <p className="font-bold text-lg mb-2">Oops! Page Doesn't Exist... Yet</p>
          </div>
        )}
        
      </main>
      
    </div>
  )
}