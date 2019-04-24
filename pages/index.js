import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Layout from "../components/Layout";
export default class index extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Grid container>
            <Grid item xs={12}>
              <Button
                size="large"
                style={{
                  margin: 14,
                  backgroundColor: "#919DDC",
                  color: "white"
                }}
              >
                Oils
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                style={{
                  margin: 14,
                  backgroundColor: "#919DDC",
                  color: "white"
                }}
              >
                Buy
              </Button>
              <Button
                size="large"
                style={{
                  margin: 14,
                  backgroundColor: "#919DDC",
                  color: "white"
                }}
              >
                Sell
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                style={{
                  margin: 14,
                  backgroundColor: "#919DDC",
                  color: "white"
                }}
              >
                Buy Records
              </Button>
              <Button
                size="large"
                style={{
                  margin: 14,
                  backgroundColor: "#919DDC",
                  color: "white"
                }}
              >
                Sell Records
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                style={{
                  margin: 14,
                  backgroundColor: "#919DDC",
                  color: "white"
                }}
              >
                Buy Analysis
              </Button>
              <Button
                size="large"
                style={{
                  margin: 14,
                  backgroundColor: "#919DDC",
                  color: "white"
                }}
              >
                Sell Analysis
              </Button>
            </Grid>
          </Grid>
        </Layout>
      </div>
    );
  }
}
