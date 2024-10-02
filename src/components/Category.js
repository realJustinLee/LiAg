import React, {Component} from "react";

// Loading Assets (SubComponents & CSS)
import Selector from "./Selector";
import "../css/Category.css";

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLeft: true
        };
    }

    // Update the state of parent App from child Component
    updateLeft = isLeft => {
        this.setState({isLeft});
    };

    render() {
        // Passing through the state from the properties
        const category = this.props.category;
        const current = this.props.currentCategory;

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
                            this.props.updateCategory(name);
                            let meshType = undefined;
                            switch (name) {
                                case "head":
                                    meshType = "Head";
                                    break;
                                case "hand":
                                    meshType = this.state.isLeft
                                        ? "HandL"
                                        : "HandR";
                                    break;
                                case "arm":
                                    meshType = this.state.isLeft
                                        ? "ArmL"
                                        : "ArmR";
                                    break;
                                case "torso":
                                    meshType = "Torso";
                                    break;
                                case "foot":
                                    meshType = this.state.isLeft
                                        ? "FootL"
                                        : "FootR";
                                    break;
                                case "leg":
                                    meshType = this.state.isLeft
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

        if (this.props.UIDisplayed) {
            return (
                <div className="abs top right panel">
                    <div className="abs top left left-side unselectable">
                        {categoryDiv}
                    </div>
                    <Selector
                        currentCategory={this.props.currentCategory}
                        isLeft={this.state.isLeft}
                        updateLeft={this.updateLeft}
                        // updatePose={this.props.updatePose}
                        loadedMeshes={this.props.loadedMeshes}
                        updateMeshes={this.props.updateMeshes}
                        updatePopup={this.props.updatePopup}
                        updatePopupMessage={this.props.updatePopupMessage}
                        editor={this.props.editor}
                        updateLoading={this.props.updateLoading}
                    />
                </div>
            );
        } else {
            return <div/>;
        }
    }
}