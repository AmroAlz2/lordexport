const objectToCsv = function (data) {
  const csvRows = [];
  const header =
    "INV_TIME,INV_NO,BRANCH_CODE,REP_CODE,REP_NAME,SALES_MAN_CODE,SALES_MAN_NAME,CLIENT_PHONE,CLIENT_NAME,LINE_NO ,PKG_NAME ,PKG_CODE,PKG_NET";

  csvRows.push(`"${header}"`);

  // loop over the rows
  for (const row of data) {
    const str = JSON.stringify(row);
    const sttr = str.substr(1); //remove frist character
    let arString = sttr.slice(0, -1); //remove last character
    // remove double qouts

    //   console.log(arString.replace(/['"]+/g, ""));
    const rowData = arString.replace(/['"]+/g, "");
    csvRows.push(`"${rowData}"`);
  }
  // console.log(csvRows);

  return csvRows.join("\n");
};
const download = function (data) {
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "ExportedData.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const today = function () {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return (formattedToday = dd + "-" + mm + "-" + yyyy);
};
const getReport = async function () {
  const inputdate = document.getElementById("dateInput").value;
  if (inputdate == null || "") {
    inputdate = today();
  }
  console.log(today());
  console.log(inputdate);
  fetch(`http://matjar2.dyndns.org:3000/sales/${inputdate}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      const csvData = objectToCsv(data);
      console.log("data recived");

      download(csvData);
    });
};

const inputdate = document.getElementById("dateInput").value;
console.log(inputdate);
const downloadButton = document
  .getElementById("myButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    getReport();
  });
