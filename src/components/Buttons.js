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
                        // TODO: register this function to MainStage class
                        // window.export(this.props.avatarName);
                        // TODO: remove these after debug
                        for (let key in this.props.loadedMeshes) {
                            // check if the property/key is defined in the object itself, not in parent
                            if (this.props.loadedMeshes.hasOwnProperty(key)) {
                                // console.log(key, this.props.loadedMeshes[key]);
                            }
                        }
                    }}
                >
                    Download as STL
                </div>
            </div>
        );
    }
}

export default Buttons;
