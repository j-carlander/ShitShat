import jwt from "jsonwebtoken";

function generateToken(payload) {
  const payloadOptions = {
    issuer: "shitshat roadblock",
    subject: "send and receive access token",
    expiresIn: "15m", // 15 minutes
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, payloadOptions);

  return token;
}
// since only returning jwt.verify, put that directly in jwtFilter.
// function verifyToken(token) {
//   return jwt.verify(token, process.env.JWT_SECRET);
// }

export default { generateToken };
