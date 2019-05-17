import React, {Component} from "react";
import Editor from "./Editor"
import axios from "axios"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import SearchBar from "./SearchBar"
import "../css/Selector.css"

import headElements from "../library/heads.json";
import handElements from "../library/hands.json";
import armElements from "../library/arm.json";
import torsoElements from "../library/torso.json";
import footElements from "../library/foot.json";
import legElements from "../library/leg.json";
import standElements from "../library/stands.json";
import poseElements from "../library/poses.json";
import bones from "../library/bones.json";

class Selector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorSelected: false,
            pose: undefined,
            search: ""
        };
    }


}

export default Selector;
