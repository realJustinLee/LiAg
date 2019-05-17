import React, {Component} from "react"
import Popup from './Popup'

import "../css/Footer.css"

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            popup: false
        };
    }

    updatePopup = popup => {
        this.setState({popup})
    };

    render() {
        return (
            <div>
                <Popup
                    popup={this.state.popup}
                    message={this.state.message}
                    updatePopup={this.updatePopup}
                />
                <div className="love-author abs bottom">
                    <button onClick={() => {
                        const content = <span>
                            Author: <a href="https://www.linkedin.com/in/li-xin-53aa55107/"
                                       target="_blank" rel="noopener noreferrer">Li Xin</a>
                            <br/>
                            E-Mail: <a href="mailto:JustinDellAdam@live.com"
                                       target="_blank" rel="noopener noreferrer">JustinDellAdam@live.com</a>
                            <br/>
                            GitHub: <a href="https://github.com/Great-Li-Xin"
                                       target="_blank" rel="noopener noreferrer">https://github.com/Great-Li-Xin</a>
                        </span>;
                        this.setState({popup: true, message: content});
                    }}><span role="img" aria-label="Love">Made with ❤️ by Li Xin</span>
                    </button>
                    &nbsp;|&nbsp;
                    <button onClick={() => {
                        const content = <span>
                            This project is covered under:<br/>
                            <a href="https://github.com/Great-Li-Xin/LiAg/blob/master/LICENSE"
                               target="_blank" rel="noopener noreferrer">MIT License</a>
                        </span>;
                        this.setState({popup: true, message: content});
                    }}>
                        <span>LICENSE</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default Footer;
