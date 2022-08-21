import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/customers";

const findAll = () => {
  return axios.get(API_URL).then((response) => response.data["hydra:member"]);
};

const remove = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export {
  findAll,
  remove
};

