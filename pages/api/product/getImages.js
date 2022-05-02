const soap = require("soap");
const ADRES = "http://89.145.188.82:8091/ArtteksWebService.asmx?wsdl";

export default async function getImages(req, res) {
  return new Promise((resolve, reject) => {
    try {
      let payload = {
        ProductId: req.query.productId !== undefined ? req.query.productId : 0,
      };

      soap.createClient(ADRES, (err, client) => {
        if (!err) {
          client.GetProductImageList(payload, (err, result) => {
            if (!err) {
              return res.status(200).json({
                title: "Success",
                images: result.GetProductImageListResult,
              });
            } else {
              console.log(err);
              return res.status(500);
            }
          });
        } else {
          console.log(err);
          return res.status(500);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });
}
