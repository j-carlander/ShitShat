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
// TODO: fix using jwt.verify
function verifyToken() {
  return true;
}

export default { generateToken, verifyToken };
