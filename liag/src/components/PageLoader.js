import React, {Component} from "react"

import logo from "../logo.svg"
import "../css/Loader.css"

class PageLoader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.check = setInterval(() => {
            if (window.loaded) {
                clearInterval(this.check);
                this.setState({loading: false})
            }
        }, 1000)
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="black-screen abs top left">
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

export default PageLoader
