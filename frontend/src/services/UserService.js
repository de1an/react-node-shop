import axios from "axios";

class UserService {
  static updateUser(user){
    return axios.patch("/api/user/update-profile", user);
  }
  static changePassword(password){
    return axios.patch("/api/user/change-password", password)
  }
}

export default UserService;