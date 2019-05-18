import React, {Component} from "react";
import ContentEditable from "react-contenteditable";

// Loading Assets (SubComponents & CSS)
import "../css/Name.css";

class Name extends Component {

    handleChange = (event) => {
        this.props.updateAvatarName(event.target.value);
    };

    render() {
        // Passing thought the name state from the properties
        return (
            <ContentEditable
                className="name abs top left"
                html={this.props.avatarName}
                onChange={this.handleChange}
            />
        );
    }
}

export default Name;
