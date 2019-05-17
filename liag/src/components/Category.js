import React, {Component} from "react"

// Loading Assets (SubComponents & CSS)
import Selector from "./Selector"
import "../css/Category.css"

class Category extends Component {
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
                            let MeshType = undefined;
                            switch (name) {
                                case "head":
                                    MeshType = "Head";
                                    break;
                                case "hand":
                                    MeshType = this.state.isLeft
                                        ? "HandL"
                                        : "HandR";
                                    break;
                                case "arm":
                                    MeshType = this.state.isLeft
                                        ? "ArmL"
                                        : "ArmR";
                                    break;
                                case "torso":
                                    MeshType = "Torso";
                                    break;
                                case "foot":
                                    MeshType = this.state.isLeft
                                        ? "FootL"
                                        : "FootR";
                                    break;
                                case "leg":
                                    MeshType = this.state.isLeft
                                        ? "LegL"
                                        : "LegR";
                                    break;
                                case "pose":
                                    MeshType = "pose";
                                    break;
                                case "stand":
                                    MeshType = "mesh-stand";
                                    break;
                                default:
                                    MeshType = undefined;
                            }
                            if (MeshType) {
                                window.selectedMesh(MeshType);
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

export default Category;