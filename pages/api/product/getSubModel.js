const soap = require("soap");
const ADRES = "http://89.145.188.82:8091/ArtteksWebService.asmx?wsdl";

export default async function getSubModel(req, res) {
  return new Promise((resolve, reject) => {
    try {
      soap.createClient(ADRES, (err, client) => {
        if (!err) {
          client.GetSubModelGroupList((err, result) => {
            if (!err) {
              return res.status(200).json({
                title: "Success",
                tags: result.GetSubModelGroupListResult,
              });
            } else {
              console.log(err);
              return res.status(500).send(err);
            }
          });
        } else {
          console.log(err);
          return res.status(500).send(err);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });
}
