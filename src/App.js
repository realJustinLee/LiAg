import React, {Component} from 'react';
import {BrowserView, MobileView} from "react-device-detect";
import Typed from "react-typed";

import logo from './logo.svg';
import './css/App.css';

// Loading the data this way for now
import CategoryList from "./library/category.json";

import ForkMeOnGitHub from "./components/ForlMeOnGitHub";
import Buttons from "./components/Buttons";
import MainStage from "./components/MainStage";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: CategoryList,
            currentCategory: "head",
            avatarName: "Give it a name",
            UIDisplayed: true,
            popup: false,
            loadedMeshes: {
                Torso: "default_torso",
                LegR: "default_leg_R",
                LegL: "default_leg_L",
                Head: "default_head",
                ArmR: "default_arm_R",
                ArmL: "default_arm_L",
                HandR: "open_hand_R",
                HandL: "open_hand_L",
                FootR: "default_foot_R",
                FootL: "default_foot_L",
                Stand: "circle"
            },
            editor: true,
            partLoading: false,
            message: "Sorry, this feature is still under development..."
        }
    };

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
