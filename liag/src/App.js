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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: data,
            currentCategory: "head",
            avatarName: "Give It A Name",
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

    // Update the state of parent App from child Component
    updateCategory = currentCategory => {
        this.setState({currentCategory});
    };
    updateAvatarName = avatarName => {
        this.setState({avatarName});
    };
    updatePopup = popup => {
        this.setState({popup});
    };
    updateMeshes = loadedMeshes => {
        this.setState({loadedMeshes});
    };
    updateLoading = partLoading => {
        this.setState({partLoading});
    };
    updatePopupMessage = message => {
        this.setState({message});
    };

    render() {
        return (
            <div>
                <BrowserView>
                    <PageLoader/>
                    <MyGithub/>
                    <Name
                        avatarName={this.state.avatarName}
                        updateAvatarName={this.updateAvatarName}
                    />
                    <Footer/>
                    <Buttons
                        avatarName={this.state.avatarName}
                        loadedMeshes={this.state.loadedMeshes}
                    />
                    <Popup
                        popup={this.state.popup}
                        message={this.state.message}
                        updatePopup={this.updatePopup}
                    />
                    <Category
                        category={this.state.category}
                        currentCategory={this.state.currentCategory}
                        updateCategory={this.updateCategory}
                        // updatePose={this.updatePose}
                        UIDisplayed={this.state.UIDisplayed}
                        loadedMeshes={this.state.loadedMeshes}
                        updateMeshes={this.updateMeshes}
                        updatePopup={this.updatePopup}
                        updatePopupMessage={this.updatePopupMessage}
                        editor={this.state.editor}
                        updateLoading={this.updateLoading}
                    />
                    <PartLoader
                        loading={this.state.partLoading}
                        updateLoading={this.updateLoading}
                    />
                </BrowserView>
                <MobileView>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <div className="full-screen-message">
                                <code>
                                    <Typed
                                        strings={[
                                            "Sorry" ,
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
                                href="https://github.com/Great-Li-Xin/LiAg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Fork on GitHub
                            </a>
                        </header>
                    </div>
                </MobileView>
            </div>
        );
    };
}

export default App;
