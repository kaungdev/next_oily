import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ReactTable from "react-table";

import Layout from "../../components/Layout";
import SimpleSnackBar from "../../components/SimpleSnackBar";
import api from "../../src/api";

export default class index extends Component {
  static async getInitialProps() {
    const response = await api.getOil();
    return { oils: response.data.oils };
  }

  state = {
    form: {
      name: "",
      sellPrice: 0
    },
    dialog: {
      isOpen: false,
      message: ""
    },
    oils: this.props.oils
  };

  handleChange = name => event => {
    event.persist();
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: event.target.value
      }
    }));
  };

  createNewOil = async () => {
    const response = await api.postOil({ payload: this.state.form });
    this.setState({
      dialog: {
        isOpen: true,
        message: response.message
      }
    });
    if (response.status === "success") {
      this.setState(
        prevState => ({
          oils: [...prevState.oils, { ...prevState.form }]
        }),
        () => {
          this.setState({
            form: {
              name: "",
              sellPrice: 0
            }
          });
        }
      );
    }
  };

  render() {
    console.log(this.state.oils);
    return (
      <Layout>
        <Grid container spacing={16}>
          <Grid item>
            <TextField
              label="Name"
              onChange={this.handleChange("name")}
              value={this.state.form.name}
            />
          </Grid>
          <Grid item>
            <TextField
              type="number"
              label="Sell Price"
              onChange={this.handleChange("sellPrice")}
              value={this.state.form.sellPrice}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.createNewOil}
            >
              Create New Oil
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} style={{ marginTop: 40 }}>
            <ReactTable
              data={this.state.oils}
              columns={[
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Sell Price (Kyats)",
                  accessor: "sellPrice"
                },
                {
                  Header: "Stock (in Litres)",
                  accessor: "stock"
                }
              ]}
            />
          </Grid>
        </Grid>
        <SimpleSnackBar
          message={this.state.dialog.message}
          isOpen={this.state.dialog.isOpen}
        />
      </Layout>
    );
  }
}
