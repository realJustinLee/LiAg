import React, {useEffect} from "react";

// Loading Assets (SubComponents & CSS)
import logo from "../logo.svg";
import "../css/Loader.css";

export default function PartLoader(props) {
    const [check, setCheck] = React.useState(undefined);

    useEffect(() => {
        setCheck(setInterval(() => {
            if (window.partloaded) {
                clearInterval(check);
                props.updateLoading(false)
            }
        }, 200));
    }, [check])

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