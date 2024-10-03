import React, {useEffect} from "react";

// Loading Assets (SubComponents & CSS)
import logo from "../logo.svg";
import "../css/Loader.css";

export let check = undefined;

export default function PartLoader(props) {

    useEffect(() => {
        check = setInterval(() => {
            if (window.partLoaded) {
                clearInterval(check);
                props.updateLoading(false)
            }
        }, 200);
    },)

    if (props.loading) {
        return (
            <div className="screen abs top left">
                <div className="abs circle">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>
            </div>
        );
    } else {
        return (
            <div/>
        );
    }
}