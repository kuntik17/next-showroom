const soap = require("soap");
const ADRES = "http://89.145.188.82:8091/ArtteksWebService.asmx?wsdl";

export default async function getProducts(req, res) {
  return new Promise((resolve, reject) => {
    try {
      let payload = {
        Token: req.query.token,
      };

      soap.createClient(ADRES, (err, client) => {
        if (!err) {
          client.GetProductList(payload, (err, result) => {
            if (!err) {
              return res.status(200).json({
                title: "Success",
                products: result.GetProductListResult,
              });
            } else {
              return res.status(err.response.status);
            }
          });
        } else {
          return res.status(500);
        }
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  });
}
