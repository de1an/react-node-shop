import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Accordion from "../../components/Accordion/Accordion";
import {routerConfig} from "../../config/routerConfig";
import UserService from "../../services/UserService";
import { showLoader } from "../../redux/loaderSlice";
import {useDispatch} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import "./userProfilePage.scss";

function UserProfile() {
  let userInfo = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({
    id: userInfo._id,
    username: userInfo.username,
    email: userInfo.email,
    gender: userInfo.gender,
    address: userInfo.address,
    city: userInfo.city
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) navigate(routerConfig.SHOP.url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  
  const onHandleSelect = (e) => {
    let copyUser = {...user}
    copyUser.gender = e.target.value;
    setUser(copyUser)
  }

  const onHandleInput = (e) => {
    let copyUser = {...user};
    copyUser[e.target.name] = e.target.value;
    setUser(copyUser);
  }

  const onHandleUpdateUser = () => {
    if (!user.username || !user.email) {
      return;
    }
    dispatch(showLoader(true))
    UserService.updateUser(user).then((res) => {
      if (res.status === 200) {
        toast.success("Successfully updated info", {autoClose: 3000})
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    })
    .catch((err) => {
      toast.error(err.response.data, {autoClose: 3000})
    })
    .finally(() => dispatch(showLoader(false)))
  }

  return (
    <section className="container my-5">
      <div className="row user-info">
        <div className="col-md-3">
          <label>Username:</label>
          <input type="text" name="username" defaultValue={user.username} onInput={onHandleInput}/>
          <label>Email:</label>
          <input type="email" name="email" defaultValue={user.email} onInput={onHandleInput}/>
          <label>Address:</label>
          <input type="text" name="address" defaultValue={user.address} onInput={onHandleInput}/>
          <label>Gender:</label>
          <select value={user.gender} onChange={onHandleSelect}>
            <option value="">No one</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label>City</label>
          <input type="text" name="city" defaultValue={user.city} onInput={onHandleInput}/>
          <Accordion />
          <button className="primary-btn mt-5 w-100" onClick={onHandleUpdateUser}>Update your profile</button>
        </div>
        <div className="col-md-9">
          <ToastContainer />
        </div>
      </div>
    </section>
  )
}

export default UserProfile;