import jwtUtil from "../util/jwtUtil.js";

function auth(req, res, next) {
  let authorized = jwtUtil.verifyToken(req.body);
  next();
}

function admin(req, res, next) {
  if (req.userDetails.role != "admin")
    return res.status(403).send("Not allowed");
  next();
}
export default { auth, admin };
