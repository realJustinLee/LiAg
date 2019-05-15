import React, {Component} from 'react';
import {BrowserView, MobileView} from "react-device-detect";
import Typed from "react-typed";

import {library} from "@fortawesome/fontawesome-svg-core";

// fontawesome imports
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

// Loading assets
import logo from './logo.svg';
import './css/App.css';

// Loading the data this way for now
import data from "./library/category.json";

// Loading the different components
import Name from "./components/Name";
import Footer from "./components/Footer";
import Category from "./components/Category";
import Buttons from "./components/Buttons";
import Popup from "./components/Popup";
import PageLoader from "./components/PageLoader";
import PartLoader from "./components/PartLoader";
import MyGithub from "./components/MyGithub";

library.add(faTimesCircle);
library.add(faDollarSign);
library.add(faLink);
library.add(faSearch);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
