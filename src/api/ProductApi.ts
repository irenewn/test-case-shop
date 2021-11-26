export default {
  get,
};

const baseUrl = "https://fakestoreapi.com/products";

async function get() {
  return await fetch(baseUrl);
}