const soap = require("soap");
const ADRES = "http://89.145.188.82:8091/ArtteksWebService.asmx?wsdl";

export default async function getModal(req, res) {
  return new Promise((resolve, reject) => {
    try {
      soap.createClient(ADRES, (err, client) => {
        if (!err) {
          client.GetModelGroupList((err, result) => {
            if (!err) {
              return res.status(200).json({
                status: true,
                collection: result.GetModelGroupListResult,
              });
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
