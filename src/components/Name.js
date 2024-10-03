import React from "react";
import ContentEditable from "react-contenteditable";

// Loading Assets (SubComponents & CSS)
import "../css/Name.css";

export default function Name({avatarName, updateAvatarName}) {
    function handleNameChange(e) {
        updateAvatarName(e.target.value);
        window.avatarName = e.target.value;
    }

    window.avatarName = avatarName;
    // Passing thought the name state from the properties
    return (
        <ContentEditable
            className="name abs top left"
            html={avatarName}
            onChange={handleNameChange}
        />
    );
}