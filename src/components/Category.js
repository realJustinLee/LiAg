import React, {useState} from "react";

// Loading Assets (SubComponents & CSS)
import Selector from "./Selector";
import "../css/Category.css";

export default function (props) {
    const [isLeft, setLeft] = useState(false);

    // Update the state of parent App from child Component
    function updateLeft(_isLeft) {
        setLeft(_isLeft);
    }

    // Passing through the state from the properties
    const category = props.category;
    const current = props.currentCategory;

    //JSX element to display the HTML
    const categoryDiv = [];

    for (let i = 0; i < category.length; i++) {
        let name = category[i].name;
        let file = category[i].img_file;
        if (name === current) {
            categoryDiv.push(
                <div className="category selected-category" key={i}>
                    <img src={"img/graphics_creation/" + file} alt={name}/>
                </div>
            );
        } else {
            categoryDiv.push(
                <div
                    className="category"
                    key={i}
                    onClick={() => {
                        props.updateCategory(name);
                        let meshType;
                        switch (name) {
                            case "head":
                                meshType = "Head";
                                break;
                            case "hand":
                                meshType = isLeft
                                    ? "HandL"
                                    : "HandR";
                                break;
                            case "arm":
                                meshType = isLeft
                                    ? "ArmL"
                                    : "ArmR";
                                break;
                            case "torso":
                                meshType = "Torso";
                                break;
                            case "foot":
                                meshType = isLeft
                                    ? "FootL"
                                    : "FootR";
                                break;
                            case "leg":
                                meshType = isLeft
                                    ? "LegL"
                                    : "LegR";
                                break;
                            case "pose":
                                meshType = "pose";
                                break;
                            case "stand":
                                meshType = "mesh-stand";
                                break;
                            default:
                                meshType = undefined;
                        }
                        if (meshType) {
                            window.selectedMesh(meshType);
                        }
                    }}
                >
                    <img src={"img/graphics_creation/" + file} alt={name}/>
                </div>
            );
        }
    }

    if (props.UIDisplayed) {
        return (
            <div className="abs top right panel">
                <div className="abs top left left-side unselectable">
                    {categoryDiv}
                </div>
                <Selector
                    currentCategory={props.currentCategory}
                    isLeft={isLeft}
                    updateLeft={updateLeft}
                    // updatePose={props.updatePose}
                    loadedMeshes={props.loadedMeshes}
                    updateMeshes={props.updateMeshes}
                    updatePopup={props.updatePopup}
                    updatePopupMessage={props.updatePopupMessage}
                    editor={props.editor}
                    updateLoading={props.updateLoading}
                />
            </div>
        );
    } else {
        return <div/>;
    }
}