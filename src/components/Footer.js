import React, {Component} from "react";
import Popup from './Popup';

// Loading Assets (SubComponents & CSS)
import "../css/Footer.css";

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
                            Author: <a href="https://www.linkedin.com/in/justin-xin-li/"
                                       target="_blank" rel="noopener noreferrer">Justin Lee</a>
                            <br/>
                            E-Mail: <a href="mailto:justindelladam@live.com"
                                       target="_blank" rel="noopener noreferrer">justindelladam@live.com</a>
                            <br/>
                            GitHub: <a href="https://github.com/realJustinLee"
                                       target="_blank" rel="noopener noreferrer">https://github.com/realJustinLee</a>
                        </span>;
                        this.setState({popup: true, message: content});
                    }}><span role="img" aria-label="Love">Made with️ ❤ by Justin Lee</span>
                    </button>
                    &nbsp;|&nbsp;
                    <button onClick={() => {
                        const content = <span>
                            This project is covered under:<br/>
                            <a href="https://github.com/realJustinLee/LiAg/blob/master/LICENSE"
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
