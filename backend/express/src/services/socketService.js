export async function sendToSocketServer(listener, body) {
  let socketURL = "http://127.0.0.1:3000/socket/" + listener;
  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return await fetch(socketURL, fetchOptions);
}
