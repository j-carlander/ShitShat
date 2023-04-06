import jwtUtil from "../util/jwtUtil.js";

function auth(req, res, next) {
  let authorized = jwtUtil.verifyToken(req.body);
  next();
}


function admin()
export default {auth};
