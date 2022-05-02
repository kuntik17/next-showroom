const soap = require("soap");
const ADRES = "http://89.145.188.82:8091/ArtteksWebService.asmx?wsdl";

export default async function me(req, res) {
  return new Promise((resolve, reject) => {
    try {
      let token = {
        Token: req.body.token,
      };

      soap.createClient(ADRES, (err, client) => {
        if (!err) {
          client.autoLogin(token, (err, result) => {
            if (!err) {
              if (result.autoLoginResult.Login) {
                return res.status(200).json({
                  status: true,
                  token: result.autoLoginResult.Token,
                  userName: result.autoLoginResult.UserName,
                  userMail: result.autoLoginResult.UserMail,
                  adminMail: result.autoLoginResult.AdminMail,
                });
              } else {
                return res.status(202).json({
                  status: false,
                  error: result.autoLoginResult.ErrorMessage,
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
