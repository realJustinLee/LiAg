/**
 * LiXin Avatar Generator
 *
 * Based on https://github.com/mrdoob/three.js/
 * Tested on r98
 * @author lixin / https://github.com/Great-Li-Xin
 */

// Three.js important variables
let camera, scene, renderer;
let controls, loader;

let selected = "Head";
let color = {r: 0.4, g: 0.5, b: 0.55};

// This group will contain all the meshes but not the floor, the lights etc...
let group = new THREE.Group();
// Fix the spelling mistake while modeling.
group.getMyObjectByName = function (name) {
    if (name === "Torso_Shoulder_L") {
        name = "Torso_Sholder_L"
    }
    if (name === "Torso_Shoulder_R") {
        name = "Torso_Sholder_R"
    }
    return group.getObjectByName(name);
};

// let bBoxStand;
window.loaded = false;
window.partloaded = false;

//This keeps track of every mesh on the viewport
let loadedMeshes = {
    Torso: {
        name: "default_torso",
        rotation: {x: 0, y: 0, z: 0}
    },
    LegR: {
        name: "default_leg_R",
        rotation: {x: 0, y: 0, z: 0}
    },
    LegL: {
        name: "default_leg_L",
        rotation: {x: 0, y: 0, z: 0}
    },
    Head: {
        name: "default_head",
        rotation: {x: 0, y: 0, z: 0}
    },
    ArmR: {
        name: "default_arm_R",
        rotation: {x: 0, y: 0, z: 0}
    },
    ArmL: {
        name: "default_arm_L",
        rotation: {x: 0, y: 0, z: 0}
    },
    HandR: {
        name: "open_hand_R",
        rotation: {x: 0, y: -1.57, z: 0}
    },
    HandL: {
        name: "open_hand_L",
        rotation: {x: 0, y: 1.57, z: 0}
    },
    FootR: {
        name: "default_foot_R",
        rotation: {x: 0, y: 0, z: 0}
    },
    FootL: {
        name: "default_foot_L",
        rotation: {x: 0, y: 0, z: 0}
    },
    Stand: {
        name: "circle",
        rotation: {x: 0, y: 0, z: 0}
    }
};

// List of information on the meshes (attach points, body groups...)
let meshStaticInfo = {
    Torso: {
        bodyPart: "torso",
        parentAttachment: undefined,
        childAttachment: undefined
    },
    Head: {
        bodyPart: "head",
        parentAttachment: "Torso_Neck",
        childAttachment: "Head_Neck"
    },
    ArmR: {
        bodyPart: "arm",
        parentAttachment: "Torso_UpperArm_R",
        childAttachment: "ArmR_UpperArm_R"
    },
    ArmL: {
        bodyPart: "arm",
        parentAttachment: "Torso_UpperArm_L",
        childAttachment: "ArmL_UpperArm_L"
    },
    HandR: {
        bodyPart: "hand",
        parentAttachment: "ArmR_Hand_R",
        childAttachment: "HandR_Hand_R"
    },
    HandL: {
        bodyPart: "hand",
        parentAttachment: "ArmL_Hand_L",
        childAttachment: "HandL_Hand_L"
    },
    LegR: {
        bodyPart: "leg",
        parentAttachment: "Torso_UpperLeg_R",
        childAttachment: "LegR_UpperLeg_R"
    },
    LegL: {
        bodyPart: "leg",
        parentAttachment: "Torso_UpperLeg_L",
        childAttachment: "LegL_UpperLeg_L"
    },
    FootR: {
        bodyPart: "foot",
        parentAttachment: "LegR_Foot_R",
        childAttachment: "FootR_Foot_R"
    },
    FootL: {
        bodyPart: "foot",
        parentAttachment: "LegL_Foot_L",
        childAttachment: "FootL_Foot_L"
    }
};

// List of parent/child relations
let childrenList = {
    ArmR: ["HandR"],
    ArmL: ["HandL"],
    Torso: ["ArmR", "ArmL", "Head", "LegR", "LegL"],
    LegR: ["FootR"],
    LegL: ["FootL"]
};

init();
animate();


function init(){


}

function animate(){

}
// Init Function which will create all the
// Three.js environment and load the default meshes