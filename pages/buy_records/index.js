import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import api from "../../src/api/";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sell Records",
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default class index extends Component {
  static async getInitialProps() {
    const oilRecords = await api.getOilBuy();
    console.log(
      "TCL: index -> staticgetInitialProps -> oilRecords",
      oilRecords
    );
    return {};
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Line data={data} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
