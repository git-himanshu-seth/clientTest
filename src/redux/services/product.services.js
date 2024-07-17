import axios from "axios";
export const productServices = {
  getProducts,
};
const apiUrl = import.meta.env.VITE_API_URL;

async function getProducts() {
  let res = await axios
    .get(`${apiUrl}/product`)
    .then((response) => {
      if (response.data.status == "success") {
        return response.data;
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
}
