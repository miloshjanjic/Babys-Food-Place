const jwt = require("jsonwebtoken");
const config = require('../config/index');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, config.get('auth').jwt_key);
      req.userId = decodedData?.id;
      //console.log(decodedData); // treba da vrati id
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;

    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { auth };

// module.exports = {
//   auth: async (req, res, next) => {
//     try {
//       const token = req.headers.authorization.split(" ")[1];
//       const isCustomAuth = token.length < 500;
//       let decodedData;
//       if (token && isCustomAuth) {
//         decodedData = jwt.verify(token, config.get('auth').jwt_key);
//         req.userId = decodedData?.id;
//       } else {
//         decodedData = jwt.decode(token);
//         req.userId = decodedData?.sub;
//       }
//       next();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };