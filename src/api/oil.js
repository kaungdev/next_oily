import fetch from "isomorphic-unfetch";

export default {
  getOil: async () => {
    return await (await fetch("http://localhost:3000/api/oils")).json();
  },

  postOil: async ({ payload }) => {
    console.log("TCL: payload", payload);
    return await (await fetch("/api/oils", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...payload
      })
    })).json();
  }
};
