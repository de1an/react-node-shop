import axios from "axios";

class AuthService {
  static login(user){
    return axios.post("/api/login", user);

  }
}

export default AuthService;