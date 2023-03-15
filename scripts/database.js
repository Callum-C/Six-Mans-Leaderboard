
async function callAPI() {
  document.getElementById("loading").innerHTML = "Loading...";

  let table = createTable();

  const response = await fetch(
    'https://chinney98.api.stdlib.com/six-mans-api/'
  );
  const data = await response.json();

  for (const player of data) {
    table = addPlayer(table, player);
  }

  document.getElementById("mainContent").appendChild(table);
  document.getElementById("loading").style.visibility = "hidden";
}
  
/**
 * Create Table with Header Row.
 *  
 * @returns {HTMLTableElement}
 */
function createTable () {
  const headers = [
    "Username", "Matches Won", "Win Streak", "Match Diff", "Matches Played",
    "Win Percentage", "Games Won", "Game Diff", "Games Played"
  ];

  let table = document.createElement('table');
  const tr = document.createElement('tr');

  for (let i=0; i < headers.length; i++) {
    const th = document.createElement('th');
    const text = document.createTextNode(headers[i]);
    th.appendChild(text);
    tr.appendChild(th);
  }

  table.appendChild(tr);
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
  const exceptions = ["username", "matchesLost", "losingStreak", "gamesLost"]

  const tr = document.createElement('tr');

  // Show user name first
  var td = document.createElement('td');
  var text = document.createTextNode(player.username);
  td.appendChild(text);
  tr.appendChild(td);

  td = document.createElement('td');
  text = document.createTextNode(player.matchesWon);
  td.appendChild(text);
  tr.appendChild(td);

  td = document.createElement('td');
  text = document.createTextNode(player.winStreak);
  td.appendChild(text);
  tr.appendChild(td);

  td = document.createElement('td');
  text = document.createTextNode(player.matchDiff);
  td.appendChild(text);
  tr.appendChild(td);

  td = document.createElement('td');
  text = document.createTextNode(player.matchesPlayed);
  td.appendChild(text);
  tr.appendChild(td);

  td = document.createElement('td');
  text = document.createTextNode(`${player.winPercentage}%`);
  td.appendChild(text);
  tr.appendChild(td);

  td = document.createElement('td');
  text = document.createTextNode(player.gamesWon);
  td.appendChild(text);
  tr.appendChild(td);

  td = document.createElement('td');
  text = document.createTextNode(player.gameDiff);
  td.appendChild(text);
  tr.appendChild(td);

  td = document.createElement('td');
  text = document.createTextNode(player.gamesPlayed);
  td.appendChild(text);
  tr.appendChild(td);

  table.appendChild(tr);
  return table;
}
