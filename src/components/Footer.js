import React, {useState} from "react";
import Popup from './Popup';

// Loading Assets (SubComponents & CSS)
import "../css/Footer.css";

export default function Footer() {
    const [popup, setPopup] = useState(false);
    const [message, setMessage] = useState("");

    function updatePopup(popup) {
        setPopup(popup)
    }

    function loadAuthorContent() {
        setMessage(
            <span>
                Author: <a href="https://www.linkedin.com/in/justin-xin-li/"
                           target="_blank" rel="noopener noreferrer">Justin Lee</a>
                <br/>
                E-Mail: <a href="mailto:justindelladam@live.com"
                           target="_blank" rel="noopener noreferrer">justindelladam@live.com</a>
                <br/>
                GitHub: <a href="https://github.com/realJustinLee"
                           target="_blank" rel="noopener noreferrer">https://github.com/realJustinLee</a>
            </span>
        );
        setPopup(true);
    }

    function loadLicenseContent() {
        setMessage(
            <span>
                This project is covered under:<br/>
                <a href="https://github.com/realJustinLee/LiAg/blob/master/LICENSE"
                   target="_blank" rel="noopener noreferrer">MIT License</a>
            </span>
        );
        setPopup(true);
    }

    return (
        <div>
            <Popup
                popup={popup}
                message={message}
                updatePopup={updatePopup}
            />
            <div className="love-author abs bottom">
                <button onClick={loadAuthorContent}>
                    <span role="img" aria-label="Love">Made with️ ❤ by Justin Lee</span>
                </button>
                &nbsp;|&nbsp;
                <button onClick={loadLicenseContent}>
                    <span>LICENSE</span>
                </button>
            </div>
        </div>
    );
}