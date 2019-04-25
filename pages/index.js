import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";

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
                onClick={() => Router.push("/oils")}
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
                onClick={() => Router.push("/buy")}
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
                onClick={() => Router.push("/sell")}
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
                onClick={() => Router.push("/buy_records")}
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
                onClick={() => Router.push("/sell_records")}
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
                onClick={() => Router.push("/buy_analysis")}
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
                onClick={() => Router.push("/sell_analysis")}
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
