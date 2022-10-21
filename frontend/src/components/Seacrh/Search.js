import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { routerConfig } from "../../config/routerConfig";
import "./search.scss";

function Search() {
  const [searchValue, setSearchValue] = useState("");
	const navigate = useNavigate();

	const onHandleInput = (e) => {
    setSearchValue(e.target.value);
	};

  const onHandleSearch = (e) => {
		e.preventDefault();
		if(searchValue.length === 0) return navigate(routerConfig.SHOP.url);
		navigate({pathname: routerConfig.SHOP_SEARCH.url, search: `q=${searchValue}`});
  }

	return (
		<div className="search-wrapper mb-3">
			<form onSubmit={onHandleSearch}>
				<input
					type="text"
					name="search"
					placeholder="search..."
					onInput={onHandleInput}
				/>
				<span onClick={onHandleSearch}>
					<FaSearch />
				</span>
			</form>
		</div>
	);
}

export default Search;
