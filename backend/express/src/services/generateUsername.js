function generateUsername(firstName, lastName) {
  let random = Math.ceil(Math.random() * 9000 + 1000); // generates a random number between 1000-10000
  let threeOfFirst = firstName.slice(0, 2);
  let threeOfLast = lastName.slice(0, 2);

  let username = threeOfFirst + threeOfLast + "#" + random;

  return username;
}

export default generateUsername;
