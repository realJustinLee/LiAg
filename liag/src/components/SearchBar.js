import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "../css/SearchBar.css";

class SearchBar extends Component {

    handleChange = (event) => {
        // this.setState({search: event.target.value});
        this.props.updateSearchValue(event.target.value);
    };

    render() {
        return (
            <div className="abs search-container">
                <input className="search-text" type="text" value={this.props.search} placeholder="Search"
                       onChange={this.handleChange}/>
                <span className="abs search-button">
                    <FontAwesomeIcon className="abs centered" icon="search"/>
                </span>
            </div>
        );
    }
}

export default SearchBar