export async function fetchData(endpoint, setState) {
  const startURL = "http://localhost:4500/api/";
  
  const fetchedJson = await fetch(startURL + endpoint);

  const fetchedData = await fetchedJson.json();

  setState(fetchedData);
}