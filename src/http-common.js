import axios from "axios";

export default axios.create({
  baseURL: "https://skylight-react-interview-project.s3.amazonaws.com",
  headers: {
    "Content-type": "application/json",
  },
});
