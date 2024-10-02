import React from "react";
import ContentEditable from "react-contenteditable";

// Loading Assets (SubComponents & CSS)
import "../css/Name.css";

export default function Name(props) {
    function handleNameChange(e) {
        props.updateAvatarName(e.target.value);
        window.avatarName = e.target.value;
    }

    window.avatarName = props.avatarName;
    // Passing thought the name state from the properties
    return (
        <ContentEditable
            className="name abs top left"
            html={props.avatarName}
            onChange={handleNameChange}
        />
    );
}