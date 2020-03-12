import React, {Component} from "react";
import NumericInput from "react-numeric-input";

// Loading Assets (SubComponents & CSS)
import "../css/Editor.css";

import bones from "../library/bones.json";
import model from "../library/poses/model.json";

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Torso_Hip: {x: 0, y: 0, z: 0},
            Torso_Spine: {x: 0, y: 0, z: 0},
            Torso_Chest: {x: 0, y: 0, z: 0},
            Torso_Neck: {x: 0, y: 0, z: 0},
            Torso_Shoulder_L: {x: 0, y: 0, z: 0},
            Torso_UpperArm_L: {x: 0, y: 0, z: 0},
            ArmL_LowerArm_L: {x: 0, y: 0, z: 0},
            ArmL_Hand_L: {x: 0, y: 0, z: 0},
            Torso_Shoulder_R: {x: 0, y: 0, z: 0},
            Torso_UpperArm_R: {x: 0, y: 0, z: 0},
            ArmR_LowerArm_R: {x: 0, y: 0, z: 0},
            ArmR_Hand_R: {x: 0, y: 0, z: 0},
            Torso_UpperLeg_L: {x: 0, y: 0, z: 0},
            LegL_LowerLeg_L: {x: 0, y: 0, z: 0},
            LegL_Foot_L: {x: 0, y: 0, z: 0},
            Torso_UpperLeg_R: {x: 0, y: 0, z: 0},
            LegR_LowerLeg_R: {x: 0, y: 0, z: 0},
            LegR_Foot_R: {x: 0, y: 0, z: 0}
        };
        this.exportPose = this.exportPose.bind(this);
    }

    componentDidMount() {
        for (let i = 0; i < bones.length; i++) {
            let bone = bones[i].bone;
            this.setState({[bone]: window.getRotation(bone)})
        }
    }

    exportPose() {
        for (let i = 0; i < bones.length; i++) {
            let bone = bones[i].bone;
            model[bone] = this.state[bone];
        }
        let model_json_str = JSON.stringify(model);
        let element = document.createElement("a");
        let file = new Blob([model_json_str], {type: "application/json"});
        element.href = URL.createObjectURL(file);
        element.download = "pose.json";
        element.click();
    }

    render() {

        //JSX element to display the HTML
        const controls = [];

        for (let i = 0; i < bones.length; i++) {
            let bone = bones[i].bone;
            controls.push(
                <div className="bone-control" key={i}>
                    <p>{bones[i].name}</p>
                    <div className="flex-container">
                        <div className="control">
                            <NumericInput
                                className="numeric-input"
                                min={-3.1}
                                max={3.1}
                                step={0.1}
                                value={Number(this.state[bone].x).toFixed(2)}
                                onChange={value => {
                                    this.setState({[bone]: {x: value, y: this.state[bone].y, z: this.state[bone].z}});
                                    window.changeRotation(bone, value, "x");
                                }}/>
                        </div>
                        <div className="control">
                            <NumericInput
                                className="numeric-input"
                                min={-3.1}
                                max={3.1}
                                step={0.1}
                                value={Number(this.state[bone].y).toFixed(2)}
                                onChange={value => {
                                    this.setState({[bone]: {x: this.state[bone].x, y: value, z: this.state[bone].z}});
                                    window.changeRotation(bone, value, "y");
                                }}/>
                        </div>
                        <div className="control">
                            <NumericInput
                                className="numeric-input"
                                min={-3.1}
                                max={3.1}
                                step={0.1}
                                value={Number(this.state[bone].z).toFixed(2)}
                                onChange={value => {
                                    this.setState({[bone]: {x: this.state[bone].x, y: this.state[bone].y, z: value}});
                                    window.changeRotation(bone, value, "z");
                                }}/>
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div className="controls">
                <span className="unselectable">This is a beta feature only used to create new poses</span>
                {controls}
                <div className="export" onClick={this.exportPose}>Export</div>
            </div>
        );
    }
}

export default Editor;
