import axios from "axios";

class AuthService {
  static login(user){
    return axios.post("/api/login", user);
  }
  static register(user){
    return axios.post("/api/register", user);
  }
}

export default AuthService;