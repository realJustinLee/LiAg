import React, {Component} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDollarSign, faLink} from "@fortawesome/free-solid-svg-icons";

// Loading Assets (SubComponents & CSS)
import SearchBar from "./SearchBar";
import Editor from "./Editor";
import "../css/Selector.css";

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

    updateSearchValue = search => {
        this.setState({search});
    };

    componentDidMount() {
        // Load the base model with defaultMeshes and defaultPose
        axios.get("./models/poses/default.json").then(res => {
            this.setState({pose: res.data});
            window.loadDefaultMeshes(bones, res.data);
        });
    }

    applyPose(file) {
        let poseData;
        //Ajax in react
        axios.get("./models/poses/" + file + ".json").then(res => {
            poseData = res.data;
            this.setState({pose: poseData});
            window.loadPose(poseData, bones);
        });
    }

    static RenderPremium(item) {
        if (item.premium) {
            return (
                <div className="abs premium">
                    <FontAwesomeIcon
                        className="abs centered white big-icon"
                        icon={faDollarSign}
                    />
                </div>
            );
        }
    }

    static RenderLink(item) {
        if (item.link) {
            return (
                <a className="abs link" href={item.link}>
                    <FontAwesomeIcon
                        className="abs centered white icon"
                        icon={faLink}
                    />
                </a>
            );
        }
    }

    render() {
        // Passing through the state from the properties
        const category = this.props.currentCategory;
        const isLeft = this.props.isLeft;
        let library;
        let sideIndicator;
        let meshType;

        switch (category) {
            case "head":
                library = headElements;
                sideIndicator = false;
                meshType = "Head";
                break;
            case "hand":
                library = handElements;
                sideIndicator = true;
                meshType = isLeft ? "HandL" : "HandR";
                break;
            case "arm":
                library = armElements;
                sideIndicator = true;
                meshType = isLeft ? "ArmL" : "ArmR";
                break;
            case "torso":
                library = torsoElements;
                sideIndicator = false;
                meshType = "Torso";
                break;
            case "foot":
                library = footElements;
                sideIndicator = true;
                meshType = isLeft ? "FootL" : "FootR";
                break;
            case "leg":
                library = legElements;
                sideIndicator = true;
                meshType = isLeft ? "LegL" : "LegR";
                break;
            case "pose":
                library = poseElements;
                sideIndicator = false;
                break;
            case "stand":
                library = standElements;
                sideIndicator = false;
                break;
            default:
                library = headElements;
                sideIndicator = false;
                console.log(category)
        }

        let filteredLibrary = library.filter(
            (element) => {
                return element.name.toLowerCase().indexOf(this.state.search) !== -1;
            }
        );

        //JSX element to display the HTML
        const elementDiv = [];

        for (let i = 0; i < filteredLibrary.length; i++) {
            elementDiv.push(
                <div
                    className="el"
                    key={i}
                    onClick={() => {
                        let meshType;
                        switch (category) {
                            case "torso":
                                meshType = "Torso";
                                break;
                            case "head":
                                meshType = "Head";
                                break;
                            case "hand":
                                meshType = isLeft ? "HandL" : "HandR";
                                break;
                            case "arm":
                                meshType = isLeft ? "ArmL" : "ArmR";
                                break;
                            case "foot":
                                meshType = isLeft ? "FootL" : "FootR";
                                break;
                            case "leg":
                                meshType = isLeft ? "LegL" : "LegR";
                                break;
                            default:
                                meshType = undefined;
                        }
                        if (filteredLibrary[i].premium) {
                            this.props.updatePopupMessage(
                                "Sorry, This is a premium object."
                            );
                            this.props.updatePopup(true);
                        } else {
                            if (category === "pose") {
                                this.applyPose(filteredLibrary[i].file);
                            } else if (category === "stand") {
                                window.changeStand(filteredLibrary[i].file);
                            } else {
                                this.props.updateLoading(true);
                                window.changeMesh(
                                    category,
                                    filteredLibrary[i],
                                    isLeft,
                                    bones,
                                    this.state.pose
                                );
                                let loadedMeshes = this.props.loadedMeshes;
                                loadedMeshes[meshType] = filteredLibrary[i].file;
                                this.props.updateMeshes(loadedMeshes);
                            }
                        }
                    }}
                >
                    <div className="img">
                        <img
                            src={
                                "img/library/" + category + "/" + filteredLibrary[i].img
                            }
                            alt={filteredLibrary[i].img}
                        />
                    </div>
                    <div className="unselectable el-name">
                        {filteredLibrary[i].name}
                    </div>
                    {Selector.RenderPremium(filteredLibrary[i])}
                    {Selector.RenderLink(filteredLibrary[i])}
                </div>
            );
        }
        elementDiv.push(
            <div
                className="el"
                key="add"
                onClick={() => {
                    this.props.updatePopup(true);
                    this.props.updatePopupMessage(
                        "Sorry, This feature is still in development."
                    );
                }}
            >
                <div className="img">
                    <img
                        src="img/library/plus.svg"
                        alt="plus sign"
                    />
                </div>
                <div className="unselectable el-name">Add your designs</div>
            </div>
        );

        const buttons = (
            <div className="abs switch">
                <div
                    className={
                        "unselectable abs left side L " +
                        (isLeft ? "side-selected" : "")
                    }
                    onClick={() => {
                        this.props.updateLeft(true);
                        let MeshType;
                        switch (category) {
                            case "head":
                                MeshType = "Head";
                                break;
                            case "hand":
                                MeshType = "HandL";
                                break;
                            case "arm":
                                MeshType = "ArmL";
                                break;
                            case "torso":
                                MeshType = "Torso";
                                break;
                            case "foot":
                                MeshType = "FootL";
                                break;
                            case "leg":
                                MeshType = "LegL";
                                break;
                            default:
                                MeshType = undefined;
                        }
                        if (MeshType) {
                            window.selectedMesh(MeshType);
                        }
                    }}
                >
                    Left
                </div>
                <div
                    className={
                        "unselectable abs right side R " +
                        (isLeft ? "" : "side-selected")
                    }
                    onClick={() => {
                        this.props.updateLeft(false);
                        let MeshType;
                        switch (category) {
                            case "head":
                                MeshType = "Head";
                                break;
                            case "hand":
                                MeshType = "HandR";
                                break;
                            case "arm":
                                MeshType = "ArmR";
                                break;
                            case "torso":
                                MeshType = "Torso";
                                break;
                            case "foot":
                                MeshType = "FootR";
                                break;
                            case "leg":
                                MeshType = "LegR";
                                break;
                            default:
                                MeshType = undefined;
                        }
                        if (MeshType) {
                            window.selectedMesh(MeshType);
                        }
                    }}
                >
                    Right
                </div>
            </div>
        );

        const editorButtons = (
            <div className="abs switch">
                <div
                    className={
                        "unselectable abs left side L " +
                        (this.state.editorSelected ? "" : "side-selected")
                    }
                    onClick={() => {
                        this.setState({editorSelected: false});
                    }}
                >
                    Poses
                </div>
                <div
                    className={
                        "unselectable abs right side R " +
                        (this.state.editorSelected ? "side-selected" : "")
                    }
                    onClick={() => {
                        this.setState({editorSelected: true});
                    }}
                >
                    Editor
                </div>
            </div>
        );

        return (
            <div>
                <div className="abs top right right-side">
                    <div className="box">
                        <SearchBar
                            updateSearchValue={this.updateSearchValue}
                            search={this.state.search}
                        />
                        {sideIndicator ? buttons : ""}
                        {category === "pose" && this.props.editor ? editorButtons : ""}
                        <div
                            className={
                                "abs top left " +
                                (category === "pose" && this.state.editorSelected
                                    ? " selector"
                                    : " selector") +
                                (sideIndicator ||
                                (category === "pose" && this.props.editor)
                                    ? " selector-full"
                                    : " selector")
                            }
                        >
                            {category === "pose" &&
                            this.state.editorSelected &&
                            this.props.editor ? (
                                <Editor/>
                            ) : (
                                <div className="abs top left selector-no-padding">
                                    {elementDiv}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Selector;
