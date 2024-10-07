import React, {useState} from "react";
import NumericInput from "react-numeric-input";

// Loading Assets (SubComponents & CSS)
import "../css/Editor.css";

import bones from "../library/bones.json";
import model from "../library/poses/model.json";

export default function Editor() {
    const [pose, setPose] = useState(() => {
        let pose = {
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
        }
        for (const boneElem of bones) {
            let bone = boneElem.bone;
            pose[bone] = window.getRotation(bone);
        }
        return pose;
    });

    function exportPose() {
        for (const boneElem of bones) {
            model[boneElem.bone] = pose[boneElem.bone];
        }
        const model_json_str = JSON.stringify(model);
        const file = new Blob([model_json_str], {type: "application/json"});
        let element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "pose.json";
        element.click();
    }

    function updatePose(bone, axis, value) {
        let newPose = pose;
        newPose[bone][axis] = value
        setPose(newPose);
        window.changeRotation(bone, value, axis);
    }

    const controls = bones.map((boneElem, i) => {
            return (
                <div className="bone-control" key={i}>
                    <p>{boneElem.name}</p>
                    <div className="flex-container">
                        <div className="control">
                            <NumericInput
                                className="numeric-input"
                                min={-3.1}
                                max={3.1}
                                step={0.05}
                                value={Number(pose[boneElem.bone].x).toFixed(1)}
                                onChange={value => updatePose(boneElem.bone, "x", value)}/>
                        </div>
                        <div className="control">
                            <NumericInput
                                className="numeric-input"
                                min={-3.1}
                                max={3.1}
                                step={0.05}
                                value={Number(pose[boneElem.bone].y).toFixed(2)}
                                onChange={value => updatePose(boneElem.bone, "y", value)}/>
                        </div>
                        <div className="control">
                            <NumericInput
                                className="numeric-input"
                                min={-3.1}
                                max={3.1}
                                step={0.05}
                                value={Number(pose[boneElem.bone].z).toFixed(2)}
                                onChange={value => updatePose(boneElem.bone, "z", value)}/>
                        </div>
                    </div>
                </div>
            )
        }
    )

    return (
        <div className="controls">
            <span className="unselectable">This is a beta feature only used to create new poses</span>
            {controls}
            <div className="export" onClick={exportPose}>Export</div>
        </div>
    );
}