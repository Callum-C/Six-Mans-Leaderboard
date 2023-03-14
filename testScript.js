
async function myFunction() {
  const response = await fetch('https://chinney98.api.stdlib.com/six-mans-api/');
  const myJson = await response.json();
  console.log(myJson);
  document.getElementById("demo").innerHTML = "myJson";
}

