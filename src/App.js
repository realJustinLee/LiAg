import React, {Component} from 'react';
import {BrowserView, MobileView} from "react-device-detect";
import Typed from "react-typed";

import logo from './logo.svg';
import './css/App.css';

import ForkMeOnGitHub from "./components/ForlMeOnGitHub";

class App extends Component {

    render() {
        return (
            <div className="App">
                <BrowserView>
                    <ForkMeOnGitHub/>
                </BrowserView>
                <MobileView>
                    <div className="App">
                        <ForkMeOnGitHub/>
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <div className="full-screen-message">
                                <code>
                                    <Typed
                                        strings={[
                                            "Sorry",
                                            "This content is currently unavailable on mobile.^2000",
                                            "Come back soon for updates!"
                                        ]}
                                        typeSpeed={50}
                                        showCursor={true}
                                    />
                                </code>
                            </div>
                            <a
                                className="App-link"
                                href="https://github.com/realJustinLee/LiAg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Fork me on GitHub
                            </a>
                        </header>
                    </div>
                </MobileView>
            </div>
        );
    };
}

export default App;
