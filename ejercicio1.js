var axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

var config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://super.walmart.com.mx/all-departments",
  headers: {
    Cookie:
      "ACID=fa1e38aa-6fee-4975-a915-effd4585315b; TS0183c1de=01c5a4e2f97c1dbc75647f35167d4c96d71c3c957203e1b465345cdf7c478b2f9a5915874a79ef4e55a55c44e707561a60f6efbc1d; TS01c7b722=01c5a4e2f97c1dbc75647f35167d4c96d71c3c957203e1b465345cdf7c478b2f9a5915874a79ef4e55a55c44e707561a60f6efbc1d; bstc=RFcEPUGYdInf6u97-6nqXU; exp-ck=1; hasLocData=1; locDataV3=eyJmdWxmaWxsbWVudE9wdGlvbiI6IlBJQ0tVUCIsIm1hcmtldFR5cGUiOiJPRCIsInBpY2t1cFN0b3JlIjp7ImFjY2Vzc1BvaW50SWQiOiIxY2VlZWUwMC1lODljLTQ4OWQtYTU3Zi02N2MwYzA0ZmQ0MzUiLCJhY2Nlc3NUeXBlIjoiUElDS1VQX0lOU1RPUkUiLCJhZGRyZXNzTGluZU9uZSI6IkNhbHphZGEgZGUgR3VhZGFsdXBlICM0MzEiLCJjaXR5IjoiVmFsbGUgZGUgTcOpeGljbyIsImNvdW50cnlDb2RlIjoiTVgiLCJmdWxmaWxsbWVudE9wdGlvbiI6IlBJQ0tVUCIsImZ1bGZpbGxtZW50VHlwZSI6IklOU1RPUkVfUElDS1VQIiwiZ2VvUG9pbnQiOnsibGF0aXR1ZGUiOjE5LjQ3MjEwMywibG9uZ2l0dWRlIjotOTkuMTIwNzA3fSwicG9zdGFsQ29kZSI6IjA3ODQwIiwiZGlzcGxheU5hbWUiOiJXTSBUZXBleWFjIiwic3RhdGVPclByb3ZpbmNlQ29kZSI6IkNpdWRhZCBEZSBNZXhpY28iLCJzdG9yZUlkIjoiMDAwMDAwMjM0NSIsInN0b3JlSHJzIjp7InN0YXJ0IjoiMDowMGFtIiwiZW5kIjoiMTE6NTlwbSJ9LCJpbnN0b3JlUGlja3VwSWQiOiIxY2VlZWUwMC1lODljLTQ4OWQtYTU3Zi02N2MwYzA0ZmQ0MzUifSwic2hpcHBpbmciOnsicG9zdGFsQ29kZSI6IjA3ODQwIiwiY2l0eSI6IlZhbGxlIGRlIE3DqXhpY28iLCJzdGF0ZU9yUHJvdmluY2VDb2RlIjoiQ2l1ZGFkIERlIE1leGljbyIsImNvdW50cnlDb2RlIjoiTVgiLCJsYXRpdHVkZSI6MTkuNDcyMTAzLCJsb25naXR1ZGUiOi05OS4xMjA3MDcsImlzUG9Cb3giOmZhbHNlLCJpc0Fwb0ZwbyI6ZmFsc2V9LCJkZWxpdmVyeVN0b3JlIjp7ImFjY2Vzc1BvaW50SWQiOiI3MGJlNDNhMC00OTkwLTRhNzUtYWZmZS02MGNjZDc2YzA4YjAiLCJhZGRyZXNzTGluZU9uZSI6IkNhbHphZGEgZGUgR3VhZGFsdXBlICM0MzEiLCJhY2Nlc3NUeXBlIjoiREVMSVZFUlkiLCJjaXR5IjoiVmFsbGUgZGUgTcOpeGljbyIsImNvdW50cnlDb2RlIjoiTVgiLCJkaXNwbGF5TmFtZSI6IlRlcGV5YWMgRGVsaXZlcnkiLCJwb3N0YWxDb2RlIjoiMDc4NDAiLCJzdGF0ZU9yUHJvdmluY2VDb2RlIjoiQ2l1ZGFkIERlIE1leGljbyIsInN0b3JlSWQiOiIwMDAwMDAyMzQ1In0sImlzRGVmYXVsdFN0b3JlIjp0cnVlLCJpc0V4cGxpY2l0SW50ZW50IjpmYWxzZSwicmVmcmVzaEF0IjoxNjc5ODQ2ODU4MzAwLCJ2YWxpZGF0ZUtleSI6InByb2Q6djI6ZmExZTM4YWEtNmZlZS00OTc1LWE5MTUtZWZmZDQ1ODUzMTViIn0%3D; vtc=RFcEPUGYdInf6u97-6nqXU; xpa=IdKDE; xpm=1%2B1679825258%2BRFcEPUGYdInf6u97-6nqXU~%2B0; TS011b2aee=01c5a4e2f97c1dbc75647f35167d4c96d71c3c957203e1b465345cdf7c478b2f9a5915874a79ef4e55a55c44e707561a60f6efbc1d; TS01f4281b=01c5a4e2f97c1dbc75647f35167d4c96d71c3c957203e1b465345cdf7c478b2f9a5915874a79ef4e55a55c44e707561a60f6efbc1d; akavpau_vp_super=1679825746~id=e349f244014b31dec1909d00f89d6548; wmt.c=0",
  },
};

axios(config)
  .then(function (response) {
    const $ = cheerio.load(response.data);

    const departments = [];

    $(".w_C9").each((i, department) => {
      const departmentObj = {};

      departmentObj.department = $(department).find("a.f3").text();
      departmentObj.url = `https://super.walmart.com.mx/${$(department).find("a.f3").attr("href")}`;
      departmentObj.categories = [];

      $(department)
        .find("li")
        .each((j, category) => {
          const categoryObj = {
            name: $(category).find("a").text(),
            url: `https://super.walmart.com.mx/${$(category).find("a").attr("href")}`,
          };

          departmentObj.categories.push(categoryObj);
        });

      departments.push(departmentObj);
    });

    const jsonResult = JSON.stringify(departments, null, 2);
    fs.writeFile("output/result.json", jsonResult, "utf8", (err) => {
      if (err) {
        console.log("Error al guardar el archivo:", err);
      } else {
        console.log("Archivo JSON guardado con éxito.");
        console.log(jsonResult)
      }
    });
  })
  .catch(function (error) {
    console.log(error);
  });
