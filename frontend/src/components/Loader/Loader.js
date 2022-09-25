import React from 'react';
import { useSelector } from "react-redux";
import "./loader.scss";

function Loader() {
  const {show} = useSelector(state => state.loaderStore);

  return (
    <>
      {show ? 
      <div className="loader-overlay">
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </div> : null}
    </>
  )
}

export default Loader;