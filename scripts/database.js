
async function callAPI() {
  document.getElementById("demo").innerHTML = "Loading...";

  const response = await fetch('https://chinney98.api.stdlib.com/six-mans-api/');
  const myJson = await response.json();

  document.getElementById("demo").innerHTML = `${JSON.stringify(myJson)}`;
}

