import React, {useState} from "react";

// Loading Assets (SubComponents & CSS)
import Selector from "./Selector";
import "../css/Category.css";

export default function Category(props) {
    const [isLeft, setLeft] = useState(true);

    // Update the state of parent App from child Component
    function updateLeft(_isLeft) {
        setLeft(_isLeft);
    }

    // Passing through the state from the properties
    const categories = props.categories;
    const current = props.currentCategory;

    const categoryDiv = categories.map((category, i) => {
        if (category.name === current) {
            return (
                <div className="category selected-category" key={i}>
                    <img src={"img/graphics_creation/" + category.img_file} alt={category.name}/>
                </div>
            );
        } else {
            return (
                <div
                    className="category"
                    key={i}
                    onClick={() => {
                        props.updateCategory(category.name);
                        let meshType;
                        switch (category.name) {
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
                    <img src={"img/graphics_creation/" + category.img_file} alt={category.name}/>
                </div>
            );
        }
    })

    if (props.showHud) {
        return (
            <div className="abs top right panel">
                <div className="abs top left left-side unselectable">
                    {categoryDiv}
                </div>
                <Selector
                    currentCategory={props.currentCategory}
                    isLeft={isLeft}
                    updateLeft={updateLeft}
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