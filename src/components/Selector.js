import React, {useEffect, useState} from "react";
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

export default function Selector(props) {
    const [editorSelected, setEditorSelected] = useState(false);
    const [pose, setPose] = useState(undefined);
    const [search, setSearch] = useState("")
    const [initialized, setInitialized] = useState(false);

    function updateSearchValue(search) {
        setSearch(search);
    }

    useEffect(() => {
        // if (initialized === false) {
            // Load the base model with defaultMeshes and defaultPose
            axios.get("./models/poses/default.json").then(res => {
                setPose(res.data);
                window.loadDefaultMeshes(bones, res.data);
            });
            // setInitialized(true);
        // }
    }, [initialized]);

    function applyPose(file) {
        //Ajax in react
        axios.get("./models/poses/" + file + ".json").then(res => {
            setPose(res.data);
            window.loadPose(res.data, bones);
        });
    }

    function renderPremium(item) {
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

    function renderLink(item) {
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

    // Passing through the state from the properties
    const category = props.currentCategory;
    const isLeft = props.isLeft;
    let library;
    let sideIndicator;

    switch (category) {
        case "head":
            library = headElements;
            sideIndicator = false;
            break;
        case "hand":
            library = handElements;
            sideIndicator = true;
            break;
        case "arm":
            library = armElements;
            sideIndicator = true;
            break;
        case "torso":
            library = torsoElements;
            sideIndicator = false;
            break;
        case "foot":
            library = footElements;
            sideIndicator = true;
            break;
        case "leg":
            library = legElements;
            sideIndicator = true;
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
            return element.name.toLowerCase().indexOf(search) !== -1;
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
                        props.updatePopupMessage(
                            "Sorry, This is a premium object."
                        );
                        props.updatePopup(true);
                    } else {
                        if (category === "pose") {
                            applyPose(filteredLibrary[i].file);
                        } else if (category === "stand") {
                            window.changeStand(filteredLibrary[i].file);
                        } else {
                            props.updateLoading(true);
                            window.changeMesh(
                                category,
                                filteredLibrary[i],
                                isLeft,
                                bones,
                                pose
                            );
                            let loadedMeshes = props.loadedMeshes;
                            loadedMeshes[meshType] = filteredLibrary[i].file;
                            props.updateMeshes(loadedMeshes);
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
                {renderPremium(filteredLibrary[i])}
                {renderLink(filteredLibrary[i])}
            </div>
        );
    }
    elementDiv.push(
        <div
            className="el"
            key="add"
            onClick={() => {
                props.updatePopup(true);
                props.updatePopupMessage(
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
                    props.updateLeft(true);
                    let meshType;
                    switch (category) {
                        case "head":
                            meshType = "Head";
                            break;
                        case "hand":
                            meshType = "HandL";
                            break;
                        case "arm":
                            meshType = "ArmL";
                            break;
                        case "torso":
                            meshType = "Torso";
                            break;
                        case "foot":
                            meshType = "FootL";
                            break;
                        case "leg":
                            meshType = "LegL";
                            break;
                        default:
                            meshType = undefined;
                    }
                    if (meshType) {
                        window.selectedMesh(meshType);
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
                    props.updateLeft(false);
                    let meshType;
                    switch (category) {
                        case "head":
                            meshType = "Head";
                            break;
                        case "hand":
                            meshType = "HandR";
                            break;
                        case "arm":
                            meshType = "ArmR";
                            break;
                        case "torso":
                            meshType = "Torso";
                            break;
                        case "foot":
                            meshType = "FootR";
                            break;
                        case "leg":
                            meshType = "LegR";
                            break;
                        default:
                            meshType = undefined;
                    }
                    if (meshType) {
                        window.selectedMesh(meshType);
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
                    (editorSelected ? "" : "side-selected")
                }
                onClick={() => {
                    setEditorSelected(false);
                }}
            >
                Poses
            </div>
            <div
                className={
                    "unselectable abs right side R " +
                    (editorSelected ? "side-selected" : "")
                }
                onClick={() => {
                    setEditorSelected(true);
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
                        updateSearchValue={updateSearchValue}
                        search={search}
                    />
                    {sideIndicator ? buttons : ""}
                    {category === "pose" && props.editor ? editorButtons : ""}
                    <div
                        className={
                            "abs top left " +
                            (category === "pose" && editorSelected
                                ? " selector"
                                : " selector") +
                            (sideIndicator ||
                            (category === "pose" && props.editor)
                                ? " selector-full"
                                : " selector")
                        }
                    >
                        {category === "pose" &&
                        editorSelected &&
                        props.editor ? (
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