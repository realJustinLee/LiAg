import React, {Component} from "react";

// Loading Assets (SubComponents & CSS)
import logo from "../logo.svg";
import "../css/Loader.css";

class PartLoader extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.check = setInterval(() => {
            if (window.partloaded) {
                clearInterval(this.check);
                this.props.updateLoading(false)
            }
        }, 200);
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        clearInterval(this.check)
        return null
    }

    render() {
        if (this.props.loading) {
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
}

export default PartLoader