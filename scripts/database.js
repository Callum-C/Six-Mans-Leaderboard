
async function callAPI() {
  document.getElementById("loading").innerHTML = "Loading...";

  var guildID = getURLParam('guildID');

  if (!guildID) {
    guildID = "941643629280235550";
  }

  console.log(`Guild ID: ${guildID}`);
  
  var mainLeaderboard, unplacedLeaderboard, hasPlaced=false, hasUnplaced=false;

  const response = await fetch(
    `https://chinney98.api.stdlib.com/six-mans-api/?guildID=${guildID}`
  );
  const data = await response.json();

  if (data.length > 0) {
    mainLeaderboard = createTable();
    unplacedLeaderboard = createTable();

    for (const player of data) {
      console.log(`Player: ${player.username} is placed: ${player.placed}`);

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

    if(hasPlaced) {
      console.log("Has placed players.");
      document.getElementById("mainContent").appendChild(mainLeaderboard);
    }

    if (hasUnplaced) {
      console.log("Has Unplaced players.");
      const unplacedHeading = document.createElement("H2");
      unplacedHeading.innerHTML = "Unplaced";
      document.getElementById("mainContent").appendChild(unplacedHeading);
      document.getElementById("mainContent").appendChild(unplacedLeaderboard);
    }

    document.getElementById("loading").style.visibility = "hidden";
  } else {
    // No data to display
    document.getElementById("loading").innerHTML = 
      "No Matches have been played in this server yet.";
  }

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

function getURLParam(sParam) {
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split('&');
  for (let i = 0; i < sURLVariables.length; i++) {
    const sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
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
