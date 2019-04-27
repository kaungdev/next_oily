import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ReactTable from "react-table";

import api from "../../src/api/";
import Layout from "../../components/Layout";
export default class index extends Component {
  static async getInitialProps() {
    const oilRecords = await api.getOilSell();
    return { serverResponse: { ...oilRecords } };
  }

  state = { data: [] };

  componentDidMount() {
    this.setState({
      data: this.props.serverResponse.data.oilSellVouchers
    });
  }

  render() {
    return (
      <Layout>
        <Grid container>
          <Grid item xs={12}>
            <ReactTable
              data={this.state.data}
              columns={[
                { Header: "Total Price", accessor: "totalAmount" },
                { Header: "Month", accessor: "month" },
                { Header: "Year", accessor: "year" }
              ]}
              SubComponent={row => {
                return (
                  <ReactTable
                    pageSize={3}
                    data={row.original.oilSells}
                    columns={[
                      { Header: "Name", accessor: "oil.name" },
                      { Header: "Quantity (in Litre)", accessor: "quantity" },
                      { Header: "Sold Price", accessor: "sellPrice" },
                      { Header: "Total Amount", accessor: "totalAmount" }
                    ]}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
      </Layout>
    );
  }
}
