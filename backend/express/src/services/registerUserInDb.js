async function registerUserInDb(user) {
  let dbUser = await getCollection("users").findOne({
    username: user.username,
  });

  if (!dbUser) {
    let result = await getCollection("users").insertOne(user);
    return { status: 201, msg: "Created", result: result };
  } else {
    return { status: 400, msg: "User already exist" };
  }
}

export default registerUserInDb;
