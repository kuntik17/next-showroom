const soap = require("soap");
import { getCookie } from "cookies-next";
const ADRES = "http://89.145.188.82:8091/ArtteksWebService.asmx?wsdl";

export default async function likedProduct(req, res) {
  return new Promise((resolve, reject) => {
    try {
      let payload = {
        Token: req.body.token,
        ProductId: req.body.productId,
        LikeState: req.body.state,
      };

      soap.createClient(ADRES, (err, client) => {
        if (!err) {
          client.LikeProduct(payload, (err, result) => {
            if (!err) {
              return res.status(200).json({
                title: "Success",
                likes: result.LikeProductResult,
              });
            } else {
              return res.status(500);
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
