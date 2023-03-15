
async function callAPI() {
  document.getElementById("demo").innerHTML = "Loading...";

  let table = createTable();

  const response = await fetch(
    'https://chinney98.api.stdlib.com/six-mans-api/'
  );
  const data = await response.json();

  for (const player of data) {
    table = addPlayer(table, player);
  }

  document.getElementById("mainContent").appendChild(table);
  //document.getElementById("demo").innerHTML = `${JSON.stringify(data)}`;
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

  const tr = document.createElement('tr');

  // Show user name first
  const td = document.createElement('td');
  const text = document.createTextNode(player.username);
  td.appendChild(text);
  tr.appendChild(td);

  for (const property in player) {
    if (property != "username") {
      const cell = document.createElement('td');
      const txt = document.createTextNode(player[property]);
      cell.appendChild(txt);
      tr.appendChild(cell);
    }
  }

  table.appendChild(tr);
  return table;
}
