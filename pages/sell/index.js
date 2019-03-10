import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import Select from "react-select";

import Layout from "../../components/Layout";
import SimpleSnackBar from "../../components/SimpleSnackBar";
import api from "../../src/api";

const mapPayload = table => {
  return table.map(({ oilId, quantity }) => ({
    oil: oilId,
    quantity
  }));
};

export default class index extends Component {
  static async getInitialProps() {
    const responses = await Promise.all([api.getOil()]);
    const oilsAutoCompletes = responses[0].data.oils.map(oil => ({
      label: oil.name,
      value: oil._id
    }));
    return {
      oils: responses[0].data.oils,
      oilsAutoCompletes
    };
  }

  state = {
    carNumber: "",
    sellPrice: 0,
    quantity: 0,
    oils: this.props.oils,
    oilsAutoCompletes: this.props.oilsAutoCompletes,
    selectedOil: {},
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
    if (!value) return;
    const sellPrice = this.props.oils.find(oil => oil._id === value.value)
      .sellPrice;
    this.setState({
      [name]: value,
      sellPrice
    });
  };

  addOil = () => {
    const { selectedOil, sellPrice, quantity } = this.state;
    this.setState(prevState => ({
      table: [
        ...prevState.table,
        {
          oilId: selectedOil.value,
          oilName: selectedOil.label,
          sellPrice,
          quantity
        }
      ]
    }));
  };

  submitSell = async () => {
    const oilSells = mapPayload(this.state.table);
    const { carNumber } = this.state;
    const response = await api.postOilSell({ oilSells, carNumber });
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
        <Grid container alignContent="center" alignItems="center">
          <Grid item>
            <div style={{ width: 200 }}>
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
              />
            </div>
          </Grid>
          <Grid item style={{ paddingLeft: 16 }}>
            <TextField
              value={this.state.quantity}
              onChange={this.handleChange("quantity")}
              label="Quantity"
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item style={{ paddingLeft: 16 }}>
            <Button variant="contained" color="secondary" onClick={this.addOil}>
              Add Oil
            </Button>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 24 }}>
          <Grid item xs={12}>
            <ReactTable
              data={this.state.table}
              columns={[
                {
                  Header: "Name",
                  accessor: "oilName"
                },
                {
                  Header: "Sell Price",
                  accessor: "sellPrice"
                },
                {
                  Header: "Quantity",
                  accessor: "quantity"
                },
                {
                  Header: "Total",
                  id: "_id",
                  accessor: d => d.sellPrice * d.quantity
                }
              ]}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justify="flex-end"
          style={{ marginTop: 24 }}
          alignItems="center"
        >
          <Grid item>
            <TextField
              value={this.state.carNumber}
              onChange={this.handleChange("carNumber")}
              label="carNumber"
              variant="outlined"
            />
          </Grid>
          <Grid item style={{ marginLeft: 20 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.submitSell}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <SimpleSnackBar
          message={this.state.snackBar.message}
          isOpen={this.state.snackBar.isOpen}
        />
      </Layout>
    );
  }
}
