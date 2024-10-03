import React from "react";

// Loading Assets (SubComponents & CSS)
import '../css/Buttons.css';

export default function Buttons({avatarName}) {
    return (
        <div>
            <div
                className="abs buttons"
                id="download"
                onClick={() => {
                    window.exportToSTL(avatarName);
                }}
            >
                Download as STL
            </div>
        </div>
    );
}