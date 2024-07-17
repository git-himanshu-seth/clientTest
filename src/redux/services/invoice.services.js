import axios from "axios";

export const invoiceServices = {
  createinvoice,
};
const apiUrl = import.meta.env.VITE_API_URL;

async function createinvoice(data) {
  const response = await axios.post(`${apiUrl}invoice`, data);
  console.log("Response:", response.data);
  // return await fetch(`${apiUrl}/department`, requestOptions).then((response) =>
  //   response.json()
  // );
}
