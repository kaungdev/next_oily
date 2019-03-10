export const getLineData = (values = [], title) => {
  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: title,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values
      }
    ]
  };
};

export const sortResults = results => {
  const sortedResults = [];
  results.forEach(result => {
    switch (result.monthName) {
      case "Jan":
        sortedResults[0] = result.netTotal;
        break;
      case "Feb":
        sortedResults[1] = result.netTotal;
        break;
      case "Mar":
        sortedResults[2] = result.netTotal;
        break;
      case "Apr":
        sortedResults[3] = result.netTotal;
        break;
      case "May":
        sortedResults[4] = result.netTotal;
        break;
      case "Jun":
        sortedResults[5] = result.netTotal;
        break;
      case "Jul":
        sortedResults[6] = result.netTotal;
        break;
      case "Aug":
        sortedResults[7] = result.netTotal;
        break;
      case "Sep":
        sortedResults[8] = result.netTotal;
        break;
      case "Oct":
        sortedResults[9] = result.netTotal;
        break;
      case "Nov":
        sortedResults[10] = result.netTotal;
        break;
      case "Dec":
        sortedResults[11] = result.netTotal;
        break;
      default:
        break;
    }
  });
  return sortedResults;
};
