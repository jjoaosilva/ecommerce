import { create } from "apisauce";

// const token = localStorage.getItem("user_id");

export const Auth = create({
  baseURL: 'http://localhost:5000',
  headers: {
    "Content-Type": "application/json"
  }
});

export default Auth;
