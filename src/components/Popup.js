import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

// Loading Assets (SubComponents & CSS)
import "../css/Popup.css";
import logo from '../logo.svg';

export default function Popup(props) {
    if (props.popup) {
        return (
            <div className="screen abs top left">
                <div className="popup abs">
                    <div className="img-container">
                        <img className="abs info-logo" src={logo} alt="Justin Lee Logo"/>
                    </div>
                    <div className="abs message">
                        <p>{props.message}</p>
                    </div>
                    <FontAwesomeIcon className="abs cross" icon={faTimesCircle} onClick={() => {
                        props.updatePopup(false);
                    }}/>
                </div>
            </div>
        );
    } else {
        return (
            <div/>
        );
    }
}