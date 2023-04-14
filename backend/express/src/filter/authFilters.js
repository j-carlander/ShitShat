import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const authHeader = req.headers["authorization"]
    ? req.headers["authorization"]
    : undefined;

  if (!authHeader)
    return res.status(401).json({ msg: "Authorization header is missing" }); // Unauthorized

  const authToken = authHeader.replace("Bearer ", "");

  try {
    let authorized = jwt.verify(authToken, process.env.JWT_SECRET);
    req.userDetails = authorized;
    next();
  } catch (err) {
    console.log(err.name);
    res.status(400).send("Invalid token");
  }
}

function admin(req, res, next) {
  if (!req.userDetails.admin) return res.status(403).send("Not allowed");
  next();
}
export default { auth, admin };
