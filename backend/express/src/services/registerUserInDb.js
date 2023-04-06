import { fetchCollection } from "../mongo/mongoDB.js";

async function registerUserInDb(user) {
  let dbUser = await fetchCollection("users").findOne({
    email: user.email,
  });

  if (!dbUser) {
    let result = await fetchCollection("users").insertOne(user);
    return { status: 201, msg: "Created", result: result };
  } else {
    return { status: 400, msg: "User already exist" };
  }
}

export default registerUserInDb;
