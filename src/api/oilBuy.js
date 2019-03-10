import fetch from "isomorphic-unfetch";

const url = "http://localhost:3000/api/oil_buy_vouchers";
const uri = "/api/oil_buy_vouchers";

export default {
  getOilBuy: async () => {
    return await (await fetch(url)).json();
  },

  postOilBuy: async ({ payload }) => {
    return await (await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        oilBuys: [...payload]
      })
    })).json();
  }
};
