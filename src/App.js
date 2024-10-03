import React, {useEffect, useState} from 'react';
import {CustomView, isMobileOnly, isTablet, isBrowser, withOrientationChange} from "react-device-detect";

import logo from './logo.svg';
import './css/App.css';

// Loading category list
import CategoryList from "./library/category.json";

// Loading WebGL main stage
import MainStage from "./components/webgl/MainStage";

// Loading components
import PageLoader from "./components/PageLoader";
import ForkMeOnGitHub from "./components/ForkMeOnGitHub";
import Name from "./components/Name";
import Footer from "./components/Footer";
import Buttons from "./components/Buttons";
import Popup from "./components/Popup";
import Category from "./components/Category";
import PartLoader from "./components/PartLoader";
import TypedWriter from "./components/TypedWriter";

export const mainStage = new MainStage();

function App() {
    const [currentCategory, setCurrentCategory] = useState("head");
    const [avatarName, setAvatarName] = useState("Give it a name");
    const [popup, setPopup] = useState(false);
    const [loadedMeshes, setLoadedMeshes] = useState({
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
    });
    const [partLoading, setPartLoading] = useState(false);
    const [message, setMessage] = useState("Sorry, this feature is still under development...");
    const [stageLoaded, setStageLoaded] = useState(false);

    useEffect(() => {
        if (isBrowser || isTablet && stageLoaded === false) {
            mainStage.init();
            mainStage.animate();
            setStageLoaded(true);
        }
    }, [stageLoaded])

    function updateCategory(_currentCategory) {
        setCurrentCategory(_currentCategory);
    }

    function updateAvatarName(_avatarName) {
        setAvatarName(_avatarName);
    }

    function updatePopup(_popup) {
        setPopup(_popup);
    }

    function updateMeshes(_loadedMeshes) {
        setLoadedMeshes(_loadedMeshes);
    }

    function updateLoading(_partLoading) {
        setPartLoading(_partLoading);
    }

    function updatePopupMessage(_popupMessage) {
        setMessage(_popupMessage);
    }

    return (
        <div className="App">
            <CustomView condition={isBrowser || isTablet}>
                <PageLoader/>
                <ForkMeOnGitHub/>
                <Name
                    avatarName={avatarName}
                    updateAvatarName={updateAvatarName}
                />
                <Footer/>
                <Buttons
                    avatarName={avatarName}
                    loadedMeshes={loadedMeshes}
                />
                <Popup
                    popup={popup}
                    message={message}
                    updatePopup={updatePopup}
                />
                <Category
                    category={CategoryList}
                    currentCategory={currentCategory}
                    updateCategory={updateCategory}
                    UIDisplayed={true}
                    loadedMeshes={loadedMeshes}
                    updateMeshes={updateMeshes}
                    updatePopup={updatePopup}
                    updatePopupMessage={updatePopupMessage}
                    editor={true}
                    updateLoading={updateLoading}
                />
                <PartLoader
                    loading={partLoading}
                    updateLoading={updateLoading}
                />
            </CustomView>
            <CustomView condition={isMobileOnly}>
                <div className="App">
                    <ForkMeOnGitHub/>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="Justin Lee Logo"/>
                        <div className="full-screen-message">
                            <code>
                                <TypedWriter
                                    options={{
                                        strings: [
                                            "Sorry.",
                                            "This content is currently unavailable on mobile devices.^2000",
                                            "Come back soon for updates!"
                                        ],
                                        typeSpeed: 50,
                                        backSpeed: 50,
                                        showCursor: true,
                                    }}
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
            </CustomView>
        </div>
    );
}

export default withOrientationChange(App);
