import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

// Loading Assets (SubComponents & CSS)
import "../css/SearchBar.css";

export default function SearchBar({search, updateSearchValue}) {
    function handleValueChange(e) {
        updateSearchValue(e.target.value);
    }

    return (
        <div className="abs search-container">
            <input className="search-text" type="text" value={search} placeholder="Search"
                   onChange={handleValueChange}/>
            <span className="abs search-button">
                    <FontAwesomeIcon className="abs centered" icon={faSearch}/>
                </span>
        </div>
    );
}