function generateUsername(firstName, lastName) {
  let random = Math.ceil(Math.random() * 9000 + 999); // generates a random number between 1000-9999
  let threeOfFirst = firstName.slice(0, 3);
  let threeOfLast = lastName.slice(0, 3);

  let username = threeOfFirst + threeOfLast + "#" + random;

  return username;
}

export default generateUsername;
