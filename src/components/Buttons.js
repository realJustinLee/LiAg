import React from "react";

// Loading Assets (SubComponents & CSS)
import '../css/Buttons.css';

export default function (props) {
    return (
        <div>
            <div
                className="abs buttons"
                id="download"
                onClick={() => {
                    window.exportToSTL(props.avatarName);
                }}
            >
                Download as STL
            </div>
        </div>
    );
}