import axios from "axios";

class AuthService {
  static login(user){
    return axios.post("/api/user/login", user);
  }
  static register(user){
    return axios.post("/api/user/register", user);
  }
  static completeRegistration(id){
    return axios.patch("/api/user/complete-registration", id);
  }
}

export default AuthService;