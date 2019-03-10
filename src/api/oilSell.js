import fetch from "isomorphic-unfetch";

const url = "http://localhost:3000/api/oil_sell_vouchers";
const uri = "/api/oil_sell_vouchers";

export default {
  getOilSell: async () => {
    return await (await fetch(url)).json();
  },

  postOilSell: async ({ oilSells, carNumber }) => {
    return await (await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        oilSells,
        carNumber
      })
    })).json();
  }
};
