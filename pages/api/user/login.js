const soap = require("soap");
const ADRES = "http://89.145.188.82:8091/ArtteksWebService.asmx?wsdl";

export default async function login(req, res) {
  return new Promise((resolve, reject) => {
    try {
      let user = {
        Mail: req.body.user.email,
        Password: req.body.user.password,
      };

      soap.createClient(ADRES, (err, client) => {
        if (!err) {
          client.LoginUser(user, (err, result) => {
            if (!err) {
              if (result.LoginUserResult.Login) {
                return res.status(200).json({
                  status: true,
                  token: result.LoginUserResult.Token,
                  userName: result.LoginUserResult.UserName,
                  userMail: result.LoginUserResult.UserMail,
                  adminMail: result.LoginUserResult.AdminMail,
                });
              } else {
                return res.status(202).json({
                  status: false,
                  error: result.LoginUserResult.ErrorMessage,
                });
              }
            } else {
              return res.status(500).send(err);
            }
          });
        } else {
          return res.status(500).send(err);
        }
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  });
}
