var mainLeaderboard, unplacedLeaderboard;
var hasPlaced = false, hasUnplaced = false;

async function load (season=4, nested=false) {
  getThemePreference(nested);
  if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    await callAPI();
    sessionStorage.setItem("hasCodeRunBefore", true);
  }
  dataToLeaderboards(season);
  displayLeaderboards();
};

async function callAPI () {

  document.getElementById("loading").innerHTML = "Loading...";

  var guildID = getURLParam('guildID');
  
  guildID = guildID ? guildID : "349293115225407488"; // "349293115225407488"

  try {
    const response = await fetch(
      `https://r5dvsot262.execute-api.eu-west-1.amazonaws.com/default/` + 
      `SixMansLeaderboardAPI?guildID=${guildID}`
    );
  
    const data = await response.json();
  
    console.log(data);
  
    sessionStorage.setItem("data", JSON.stringify(data));
    
  } catch (error) {
    console.error(`database - callAPI ${error}`);
  }
  
}

function dataToLeaderboards (season=4) {
  
  const data = JSON.parse(sessionStorage.getItem("data"))[season];

 

  if (data.length > 0) {
    if (season >= 4) {
      mainLeaderboard = createMMRTable();
      unplacedLeaderboard = createMMRTable();
    } else {
      mainLeaderboard = createTable();
      unplacedLeaderboard = createTable();
    }
    
    for (const player of data) {
      if (player.placed){
        if (!hasPlaced){
          hasPlaced = true;
        }
        mainLeaderboard = addPlayer(mainLeaderboard, player);
      } else {
        if (!hasUnplaced) {
          hasUnplaced = true;
        }
        unplacedLeaderboard = addPlayer(unplacedLeaderboard, player);
      }
    }

  } else {
    // No data to display
    document.getElementById("loading").innerHTML = 
      "No Matches have been played in this server yet.";
  }

}

function displayLeaderboards () {

  if(hasPlaced) {
    // Has players with more than 5 games played.
    document.getElementById("mainContent").appendChild(mainLeaderboard);
  }

  if (hasUnplaced) {
    // Has players with less than 5 games played
    const unplacedHeading = document.createElement("H2");
    unplacedHeading.innerHTML = "Unplaced";
    document.getElementById("mainContent").appendChild(unplacedHeading);
    document.getElementById("mainContent").appendChild(unplacedLeaderboard);
  }

  document.getElementById("loading").style.visibility = "hidden";

}
  
/**
 * Create Table with Header Row.
 *  
 * @returns {HTMLTableElement}
 */
function createTable () {
  const headers = [
    "   ", "Username", "Matches Won", "Current Streak", "Best Win Streak", 
    "Match Diff", "Matches Played", "Win Percentage", "Games Won", "Game Diff", 
    "Games Played"
  ];

  let table = document.createElement('table');
  const thead = table.createTHead();
  const tbody = table.createTBody();
  const tr = thead.insertRow();

  for (let i=0; i < headers.length; i++) {
    const th = tr.insertCell()
    const text = document.createTextNode(headers[i]);
    th.appendChild(text);
  }
  
  return table;
}

/**
 * Create Table with Header Row for Season 4 onwards.
 *  
 * @returns {HTMLTableElement}
 */
function createMMRTable () {
  const headers = [
    "   ", "Username", "Rating (MMR)", "Matches Won", "Current Streak", 
    "Best Win Streak", "Match Diff", "Matches Played", "Win Percentage", 
    "Games Won", "Game Diff", "Games Played"
  ];

  let table = document.createElement('table');
  const thead = table.createTHead();
  const tbody = table.createTBody();
  const tr = thead.insertRow();

  for (let i=0; i < headers.length; i++) {
    const th = tr.insertCell()
    const text = document.createTextNode(headers[i]);
    th.appendChild(text);
  }
  
  return table;
}
  
/**
  * Add a singular player to the leaderboard table.
  * 
  * @param {HTMLTableElement} table
  * @param {Object} player
  * @returns {HTMLTableElement} table
  */
function addPlayer (table, player) {
  const exceptions = ["matchesLost", "losingStreak", "gamesLost"]
  const streak = player.winStreak > 0 ? player.winStreak : -player.losingStreak;

  const tbody = table.getElementsByTagName('tbody')[0];
  const tr = tbody.insertRow();
  
  // Show user name first
  var td = tr.insertCell();
  var text = document.createTextNode(player.username);
  td.appendChild(text);

  if (player?.mmr >= 0) {
    td = tr.insertCell();
    text = document.createTextNode(player.mmr);
    td.appendChild(text);
  }

  td = tr.insertCell();
  text = document.createTextNode(player.matchesWon);
  td.appendChild(text);

  td = tr.insertCell();
  text = document.createTextNode(streak);
  td.appendChild(text);

  td = tr.insertCell();
  text = document.createTextNode(player.highestWinStreak);
  td.appendChild(text);

  td = tr.insertCell();
  text = document.createTextNode(player.matchDiff);
  td.appendChild(text);

  td = tr.insertCell();
  text = document.createTextNode(player.matchesPlayed);
  td.appendChild(text);

  td = tr.insertCell();
  text = document.createTextNode(`${player.winPercentage}%`);
  td.appendChild(text);

  td = tr.insertCell();
  text = document.createTextNode(player.gamesWon);
  td.appendChild(text);

  td = tr.insertCell();
  text = document.createTextNode(player.gameDiff);
  td.appendChild(text);

  td = tr.insertCell();
  text = document.createTextNode(player.gamesPlayed);
  td.appendChild(text);

  return table;
}
