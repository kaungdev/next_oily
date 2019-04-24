import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import Select from "react-select";
import Router from "next/router";

import Layout from "../../components/Layout";
import SimpleSnackBar from "../../components/SimpleSnackBar";
import api from "../../src/api";

const mapPayload = table => {
  return table.map(({ oilId, oilBuyPrice, oilBuyQuantity }) => ({
    oil: oilId,
    quantity: oilBuyQuantity,
    buyPrice: oilBuyPrice
  }));
};

export default class index extends Component {
  static async getInitialProps() {
    const responses = await Promise.all([api.getOil(), api.getOilBuy()]);
    const oilsAutoCompletes = responses[0].data.oils.map(oil => ({
      label: oil.name,
      value: oil._id
    }));
    return {
      oils: responses[0].data.oils,
      oilBuyVouchers: responses[1].data.oilBuyVouchers,
      oilsAutoCompletes
    };
  }

  state = {
    oils: this.props.oils,
    oilBuyVouchers: this.props.oilBuyVouchers,
    oilsAutoCompletes: this.props.oilsAutoCompletes,
    selectedOil: "",
    oilBuyPrice: 0,
    oilBuyQuantity: 0,
    snackBar: {
      isOpen: false,
      message: ""
    },
    table: []
  };

  resetState = () => {
    this.setState({
      oils: this.props.oils,
      oilBuyVouchers: this.props.oilBuyVouchers,
      oilsAutoCompletes: this.props.oilsAutoCompletes,
      selectedOil: "",
      oilBuyPrice: 0,
      oilBuyQuantity: 0,
      table: []
    });
    setTimeout(() => {
      this.setState({
        snackBar: {
          isOpen: false,
          message: ""
        }
      });
    }, 6000);
  };

  handleChange = name => event => {
    event.persist();
    this.setState({
      [name]: event.target.value
    });
  };

  handleAutoComplete = name => value => {
    this.setState({
      [name]: value
    });
  };

  addOil = () => {
    console.log(this.state);
    const { selectedOil, oilBuyPrice, oilBuyQuantity } = this.state;
    this.setState(prevState => ({
      table: [
        ...prevState.table,
        {
          oilId: selectedOil.value,
          oilName: selectedOil.label,
          oilBuyPrice: oilBuyPrice,
          oilBuyQuantity: oilBuyQuantity
        }
      ]
    }));
  };

  submitBuyVoucher = async () => {
    const payload = mapPayload(this.state.table);
    const response = await api.postOilBuy({ payload });
    if (response.status === "success") {
      this.setState(
        {
          snackBar: {
            isOpen: true,
            message: response.message
          }
        },
        () => this.resetState()
      );
    }
  };

  render() {
    return (
      <Layout>
        <Grid container>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={12}>
                <Select
                  textFieldProps={{
                    label: "Label",
                    InputLabelProps: {
                      shrink: false
                    }
                  }}
                  options={this.state.oilsAutoCompletes}
                  value={this.state.selectedOil}
                  onChange={this.handleAutoComplete("selectedOil")}
                  instanceId={"selectedOil"}
                  isClearable
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 16 }}>
              <Grid item xs={12}>
                <TextField
                  value={this.state.oilBuyPrice}
                  onChange={this.handleChange("oilBuyPrice")}
                  label="Buy Price"
                  variant="outlined"
                  type="number"
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 16 }}>
              <Grid item xs={12}>
                <TextField
                  value={this.state.oilBuyQuantity}
                  onChange={this.handleChange("oilBuyQuantity")}
                  label="Quantity in Litre"
                  variant="outlined"
                  type="number"
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 16 }}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.addOil}
                >
                  Add Oil
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ padding: 16 }}>
              <hr />
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <a href="/buy">
                  <Button variant="contained" color="secondary">
                    Reset
                  </Button>
                </a>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.submitBuyVoucher}
                  size="large"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={8}>
            <ReactTable
              data={this.state.table}
              columns={[
                {
                  Header: "Name",
                  accessor: "oilName"
                },
                {
                  Header: "Buy Price",
                  accessor: "oilBuyPrice"
                },
                {
                  Header: "Quantity",
                  accessor: "oilBuyQuantity"
                },
                {
                  Header: "Total",
                  id: "_id",
                  accessor: d => d.oilBuyPrice * d.oilBuyQuantity
                }
              ]}
            />
          </Grid>
        </Grid>
        <Grid container alignContent="center" alignItems="center">
          <Grid item>
            <div style={{ width: 200 }} />
          </Grid>
          <Grid item style={{ paddingLeft: 16 }} />
          <Grid item style={{ paddingLeft: 16 }} />
          <Grid item style={{ paddingLeft: 16 }} />
        </Grid>
        <Grid container style={{ marginTop: 24 }}>
          <Grid item xs={12} />
        </Grid>
        <Grid container justify="flex-end" style={{ marginTop: 24 }}>
          <Grid item />
        </Grid>
        <SimpleSnackBar
          message={this.state.snackBar.message}
          isOpen={this.state.snackBar.isOpen}
        />
      </Layout>
    );
  }
}
