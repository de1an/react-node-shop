import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Accordion from "../../components/Accordion/Accordion";
import {routerConfig} from "../../config/routerConfig";
import "./userProfilePage.scss";

function UserProfile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(routerConfig.SHOP.url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const onHandleSelect = (e) => {
    let copyUser = {...user}
    copyUser.gender = e.target.value;
    setUser(copyUser)
  }

  return (
    <section className="container my-5">
      <div className="row user-info">
        <div className="col-md-3">
          <label>Username:</label>
          <input type="text" defaultValue={user.username} />
          <label>Email:</label>
          <input type="email" defaultValue={user.email} />
          <label>Address:</label>
          <input type="text" defaultValue={user.address} />
          <label>Gender:</label>
          <select value={user.gender} onChange={onHandleSelect}>
            <option value="">No one</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label>City</label>
          <input type="text" defaultValue={user.city}/>
          <Accordion />
        </div>
        <div className="col-md-9"></div>
      </div>
    </section>
  )
}

export default UserProfile;