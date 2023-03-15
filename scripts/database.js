
import headers from '../config.json';

module.exports = {
  callAPI: async () => {
    document.getElementById("demo").innerHTML = "Loading...";
  
    let table = createTable();
  
    const response = await fetch(
      'https://chinney98.api.stdlib.com/six-mans-api/'
    );
    const data = await response.json();
  
    for (const player of data) {
      table.insertRow();
  
    }
  
    document.getElementById("mainContent").appendChild(table);
    //document.getElementById("demo").innerHTML = `${JSON.stringify(data)}`;
  },
  
  /**
   * Create Table with Header Row.
   * 
   * @returns Leaderboard Table
   */
  createTable: async () => {
    
  
    let table = document.createElement('table');
    let tr = document.createElement('tr');
  
    for (let i=0; i < headers.length; i++) {
      const th = document.createElement('th');
      const text = document.createTextNode(headers[i]);
      th.appendChild(text);
      tr.appendChild(th);
    }
  
    table.appendChild(tr);
  
    return table;
  },
  
  /**
   * Add a singular player to the leaderboard table.
   * 
   */
  addPlayer: () => {
  
  },

};

