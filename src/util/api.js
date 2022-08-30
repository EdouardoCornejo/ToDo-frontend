import axios from "axios";

/* Creating a new instance of axios with a baseURL of http://localhost:4000. */
const instance = axios.create({
  baseURL: "http://localhost:4000",
});

export default instance;
