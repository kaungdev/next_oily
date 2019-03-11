import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import api from "../../src/api/";
import { getLineData, sortResults } from "../../src/helpers/chart";
import Layout from "../../components/Layout";

export default class index extends Component {
  static async getInitialProps() {
    const oilRecords = await api.getOilSell();
    return { serverResponse: { ...oilRecords } };
  }

  state = { data: {} };

  componentDidMount() {
    const grouped = _.groupBy(
      this.props.serverResponse.data.oilSellVouchers,
      "month"
    );
    const results = Object.keys(grouped).map(key => {
      const monthName = key;
      let netTotal = 0;
      grouped[key].forEach(({ totalAmount }) => (netTotal += totalAmount));
      return { monthName, netTotal };
    });
    const sortedResults = sortResults(results);
    this.setState({
      data: getLineData(sortedResults, "Sell Records")
    });
  }

  render() {
    return (
      <Layout>
        <Grid container>
          <Grid item xs={12}>
            <Line data={this.state.data} />
          </Grid>
        </Grid>
      </Layout>
    );
  }
}
