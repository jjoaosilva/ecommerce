import { create } from "apisauce";

// const tokenU = localStorage.getItem("user");
// const tokenF = localStorage.getItem("func");

export const Servico = create({
  baseURL: 'http://localhost:5000',
  headers: {
    "Content-Type": "application/json"
  }
});

// Servico.addResponseTransform(response => {
//   if (tokenU == null && tokenF == null ) {
//     localStorage.removeItem("user");
//     localStorage.removeItem("func");
//     window.location.replace("/#/login");
//   }
// });

export default Servico;
