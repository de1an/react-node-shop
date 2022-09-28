import React from 'react';
import ShopFunctions from "../../utilities/ShopFunctions";

function Sort({ads, setSortedAds, getAllAds}) {
  const onHandleSelect = (e) => {
    switch (e.target.value) {
      case "Lower":
        let lowerPrice = ShopFunctions.lowerToHigher(ads)
        setSortedAds(lowerPrice);
        break;
      case "Higher":
        let higherPrice = ShopFunctions.higherToLower(ads)
        setSortedAds(higherPrice)
        break;
      default:
        getAllAds();
        break;
    }
  }

  return (
    <>
      <label htmlFor="sort">Sort by:</label>
      <select className="form-select mt-1" id="sort" onChange={onHandleSelect}>
        <option value="Default">Default</option>
        <option value="Lower">Lower to Higher</option>
        <option value="Higher">Higher to Lower</option>
      </select>
    </>
  )
}

export default Sort;