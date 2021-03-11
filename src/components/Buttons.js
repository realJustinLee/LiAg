import React, {Component} from "react";

// Loading Assets (SubComponents & CSS)
import '../css/Buttons.css';

class Buttons extends Component {
    render() {
        return (
            <div>
                <div
                    className="abs buttons"
                    id="download"
                    onClick={() => {
                        window.exportToSTL(this.props.avatarName);
                    }}
                >
                    Download as STL
                </div>
            </div>
        );
    }
}

export default Buttons;
