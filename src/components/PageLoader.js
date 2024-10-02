import React, {useEffect, useState} from "react";

// Loading Assets (SubComponents & CSS)
import logo from "../logo.svg";
import "../css/Loader.css";

let check;

export default function PageLoader() {
    const [loading, setLoading] = useState(true);
    const [check, setCheck] = useState(undefined);

    useEffect(() => {
        setCheck(setInterval(() => {
            if (window.loaded) {
                clearInterval(check);
                setLoading(false);
            }
        }, 1000))
    }, [check]);

    if (loading) {
        return (
            <div className="dark-screen abs top left">
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