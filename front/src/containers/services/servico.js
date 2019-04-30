import { create } from "apisauce";

const token = localStorage.getItem("user");

export const Servico = create({
  baseURL: 'http://localhost:5000',
  headers: {
    "Content-Type": "application/json"
  }
});

Servico.addResponseTransform(response => {
  if (token == null) {
    localStorage.removeItem("user");
    window.location.replace("/#/login");
  }
});

export default Servico;
