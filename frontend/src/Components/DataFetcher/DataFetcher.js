export async function fetchData(endpoint, setState) {
  const startURL = "http://localhost:4500/api/";
  let fetchOptions = sessionStorage.getItem("AUTH_TOKEN")
    ? {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("AUTH_TOKEN"),
        },
      }
    : undefined;
  const fetchedJson = await fetch(startURL + endpoint, fetchOptions);

  const fetchedData = await fetchedJson.json();

  setState(fetchedData);
}
