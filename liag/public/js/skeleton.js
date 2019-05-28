/**
 * LiXin Avatar Generator
 *
 * Based on https://github.com/mrdoob/three.js/
 *
 * Tested on r104
 *
 * @author lixin / https://github.com/Great-Li-Xin
 */

// Three.js important variables
let camera, scene, renderer;
let controls, loader;

let selected = "Head";
let color = {r: 0.41, g: 0.51, b: 0.56};

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

// List of information on the meshes (attach points, body groups, etc...)
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

// Init Function which will create all the
// Three.js environment and load the default meshes
function init() {

    loader = new THREE.GLTFLoader();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x282c34);
    scene.fog = new THREE.Fog(0x282c34, 1, 20);
    scene.add(group);
    scene.getMyObjectByName = function (name) {
        if (name === "Torso_Shoulder_L") {
            name = "Torso_Sholder_L"
        }
        if (name === "Torso_Shoulder_R") {
            name = "Torso_Sholder_R"
        }
        return scene.getObjectByName(name);
    };

    // buildAxes();
    buildCamera();
    buildRenderer();
    buildControls();
    buildLights();
    buildFloor();

    // function buildAxes() {
    //     let axes = new THREE.AxesHelper(20);
    //     scene.add(axes);
    // }

    function buildCamera() {
        camera = new THREE.PerspectiveCamera(
            75,
            (window.innerWidth / window.innerHeight),
            0.001,
            1000
        );

        // Camera position in space (will be controlled by the OrbitControls later on)
        camera.position.x = -1;
        camera.position.y = 2;
        camera.position.z = 2;
    }

    function buildRenderer() {
        // Create a renderer with antialias
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.shadowMap.enabled = true;
        // default THREE.PCFShadowMap
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Configure renderer size to fill up the whole window
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Append Renderer to DOM
        let container = document.getElementById("canvas");
        container.appendChild(renderer.domElement);

        /** The Sky Box
         *
         * CubeTextureLoader axes different from three.js
         * see https://github.com/mrdoob/three.js/issues/12657
         *
         * By convention, likely based on the RenderMan spec from the 1990's cube maps,
         * which are specified by WebGL(and three.js).
         * In a coordinate system in which positive x-axis is to the right when looking to the positive z-axis.
         * In other words, in a left-handed coordinate system.
         * By continuing this convention, preexisting cube maps continued to render correctly.
         *
         * three.js uses a right-handed coordinate system.
         * So environment maps used in three.js appear to have positive x-axis, and negative x-axis swapped.
         * (This is the case for every three.js cube map example.)
         *
         * px = left
         * nx = right
         * py = top
         * ny = bottom
         * pz = front
         * nz = back
         */
        let path = "../img/library/textures/fantasy/";
        let extension = ".jpg";
        let urls = [
            path + "px" + extension,
            path + "nx" + extension,
            path + "py" + extension,
            path + "ny" + extension,
            path + "pz" + extension,
            path + "nz" + extension
        ];

        let reflectionCube = new THREE.CubeTextureLoader().load(urls);
        reflectionCube.format = THREE.RGBFormat;
        scene.background = reflectionCube;

        let size = 50;
        let divisions = 60;
        let colorCenterLine = 0x306d7d;
        let colorGrid = 0x61dafb;

        let gridHelper = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
        scene.add(gridHelper);
    }

    function buildControls() {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(0,0,0);
        //Controlling max and min for ease of use
        controls.minDistance = 2;
        controls.maxDistance = 7;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI / 2 - 0.1;
        controls.enablePan = false;
    }

    function buildLights() {
        //hemisphere light: like sun light but without any shadows
        let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
        scene.add(hemisphereLight);

        //Create a PointLight and turn on shadows for the light
        let light = new THREE.PointLight(0xcccccc, 1, 100);
        light.position.set(3, 10, 10);
        light.castShadow = true;
        //Set up shadow properties for the light
        // default width
        light.shadow.mapSize.width = 2048;
        // default height
        light.shadow.mapSize.height = 2048;
        light.decay = 1;
        scene.add(light);

        // This light is here to show the details in the back (no shadows)
        let backLight = new THREE.PointLight(0xcccccc, 1, 100);
        backLight.position.set(0, 2, -20);
        backLight.penumbra = 2;
        scene.add(backLight);
    }

    function buildFloor() {
        //Create a plane that receives shadows (but does not cast them)
        let planeGeometry = new THREE.PlaneGeometry(2000, 2000);
        // planeGeometry.rotateX( - Math.PI / 2 );

        let planeMaterial = new THREE.ShadowMaterial();
        planeMaterial.opacity = 0.2;

        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.name = "plane";
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = 0;
        plane.receiveShadow = true;
        scene.add(plane);
    }
}

function clearPosition(item) {
    // This function is used to clear the position of an imported glTF file
    item.position.x = 0;
    item.position.y = 0;
    item.position.z = 0;
}

function rotateElement(item, clearRotation, rotation) {
    if (clearRotation === true) {
        item.rotation.x = 0;
        item.rotation.y = 0;
        item.rotation.z = 0;
    } else {
        item.rotation.x = rotation.x;
        item.rotation.y = rotation.y;
        item.rotation.z = rotation.z;
    }
}

function placeMesh(
    meshName,
    bodyPartClass,
    MeshType,
    parentAttachment,
    childAttachment,
    rotation,
    firstLoad,
    highLight,
    bones,
    poseData
) {
    // bodyPartClass : {arm, head, hand, torso, leg, foot}
    // MeshType : {ArmR, ArmL, Head, HandR, HandL, LegR, LegL, FootR, FootL, Torso}
    loader.load(
        "models/" + bodyPartClass + "/" + meshName + ".glb",
        glTF => {
            let root = glTF.scene.children[0];
            root.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    // Gives a fixed name to the mesh and same gray color
                    child.name = "mesh-" + MeshType.toLowerCase();
                    child.castShadow = true;
                    child.material.color = {r: 0.5, g: 0.5, b: 0.5};
                }
            });

            // group is one element with all the meshes and bones of the character
            group.add(root);
            scene.updateMatrixWorld(true);

            // Updates the loadedMeshes variable (used for replacing children)
            loadedMeshes[MeshType].name = meshName;
            loadedMeshes[MeshType].rotation = rotation;

            if (MeshType === "Head" && firstLoad) {
                changeColor("Head", color);
            }

            if (highLight) {
                changeColor(MeshType, color);
            }

            // Putting the new mesh in the pose configuration if any pose as been selected
            if (poseData) {
                root.traverse(function (child) {
                    if (child instanceof THREE.Bone) {
                        if (poseData[child.name]) {
                            window.changeRotation(child.name, poseData[child.name].x, "x");
                            window.changeRotation(child.name, poseData[child.name].y, "y");
                            window.changeRotation(child.name, poseData[child.name].z, "z");
                        }
                    }
                });
            }

            if (
                typeof parentAttachment !== "undefined" &&
                typeof childAttachment !== "undefined"
            ) {
                let targetBone = scene.getMyObjectByName(parentAttachment);
                let object = scene.getMyObjectByName(childAttachment);
                clearPosition(object);
                rotateElement(object, true);
                rotateElement(object, false, rotation);
                targetBone.add(object);
            }

            //Going to look for all children of current mesh
            let children = childrenList[MeshType];
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    replaceMesh(children[i], firstLoad, bones, poseData);
                }
            }

            if (MeshType === "FootR") {
                if (scene.getMyObjectByName("FootL_Toes_L")) {
                    scene.updateMatrixWorld();
                    placeStand();
                }
            } else if (MeshType === "FootL") {
                if (scene.getMyObjectByName("FootR_Toes_R")) {
                    scene.updateMatrixWorld();
                    placeStand();
                }
            }
            window.partloaded = true;
        },
        null,
        function (error) {
            console.log(error);
        }
    );
}

function replaceMesh(MeshType, firstLoad, bones, poseData) {
    group.remove(group.getMyObjectByName(MeshType));
    placeMesh(
        loadedMeshes[MeshType].name,
        meshStaticInfo[MeshType].bodyPart,
        MeshType,
        meshStaticInfo[MeshType].parentAttachment,
        meshStaticInfo[MeshType].childAttachment,
        loadedMeshes[MeshType].rotation,
        firstLoad,
        false,
        bones,
        poseData
    );
}

function placeStand() {
    // let topStand;
    let minFinder = new THREE.FindMinGeometry();

    if (scene.getMyObjectByName("mesh-stand")) {
        let resultR = minFinder.parse(scene.getMyObjectByName("FootR"));
        let resultL = minFinder.parse(scene.getMyObjectByName("FootL"));
        let result = resultL > resultR ? resultR : resultL;
        // console.log(result);

        // bBoxStand = new THREE.Box3().setFromObject(root);
        // topStand = bBoxStand.max.y;
        scene.getMyObjectByName("Torso_Hip").position.y -= result;
    } else {
        loader.load(
            "models/stand/circle.glb",
            glTF => {
                let root = glTF.scene.children[0];

                root.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.name = "mesh-stand";
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                let resultR = minFinder.parse(scene.getMyObjectByName("FootR"));
                let resultL = minFinder.parse(scene.getMyObjectByName("FootL"));
                let result = resultL > resultR ? resultR : resultL;

                //Default color to all the meshes
                if (root.material) {
                    root.material.color = {r: 0.5, g: 0.5, b: 0.5};
                }

                group.add(root);
                scene.getMyObjectByName("Torso_Hip").position.y -= result;
                window.loaded = true;
            },
            null,
            function (error) {
                console.log(error);
            }
        );
    }
}

window.changeStand = function (stand) {
    let minFinder = new THREE.FindMinGeometry();
    if (scene.getMyObjectByName("mesh-stand")) {
        group.remove(scene.getMyObjectByName("mesh-stand"));
        loader.load(
            "models/stand/" + stand + ".glb",
            glTF => {
                let root = glTF.scene.children[0];

                root.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.name = "mesh-stand";
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material.color = {r: 0.41, g: 0.51, b: 0.56};
                    }
                });

                let resultR = minFinder.parse(scene.getMyObjectByName("FootR"));
                let resultL = minFinder.parse(scene.getMyObjectByName("FootL"));
                let result = resultL > resultR ? resultR : resultL;

                group.add(root);
                scene.getMyObjectByName("Torso_Hip").position.y -= result;
            },
            null,
            function (error) {
                console.log(error);
            }
        );
    }
};

window.loadDefaultMeshes = function (bones, poseData) {
    placeMesh(
        loadedMeshes["Torso"].name,
        meshStaticInfo["Torso"].bodyPart,
        "Torso",
        undefined,
        undefined,
        undefined,
        true,
        false,
        bones,
        poseData
    );
};

window.changeMesh = function (bodyPart, part, isLeft, bones, poseData) {
    window.partloaded = false;
    let meshType;
    let file;
    let rotation;

    switch (bodyPart) {
        case "torso":
            file = part.file;
            rotation = undefined;
            meshType = "Torso";
            break;
        case "head":
            file = part.file;
            rotation = part.rotation;
            meshType = "Head";
            break;
        case "hand":
            meshType = isLeft ? "HandL" : "HandR";
            file = isLeft ? part.file[0] : part.file[1];
            rotation = isLeft ? part.rotation[0] : part.rotation[1];
            break;
        case "arm":
            meshType = isLeft ? "ArmL" : "ArmR";
            file = isLeft ? part.file[0] : part.file[1];
            rotation = isLeft ? part.rotation[0] : part.rotation[1];
            break;
        case "foot":
            meshType = isLeft ? "FootL" : "FootR";
            file = isLeft ? part.file[0] : part.file[1];
            rotation = isLeft ? part.rotation[0] : part.rotation[1];
            break;
        case "leg":
            meshType = isLeft ? "LegL" : "LegR";
            file = isLeft ? part.file[0] : part.file[1];
            rotation = isLeft ? part.rotation[0] : part.rotation[1];
            break;
        default:
            meshType = undefined;
    }

    if (meshType) {
        let parentAttachment = meshStaticInfo[meshType].parentAttachment;
        let childAttachment = meshStaticInfo[meshType].childAttachment;
        let currentMesh = group.getMyObjectByName(meshType);
        let bonesToDelete =
            meshType === "Torso"
                ? scene.getMyObjectByName("Torso_Hip")
                : group.getMyObjectByName(parentAttachment);

        if (currentMesh) {
            group.remove(currentMesh);
            if (bonesToDelete.children) {
                for (let i = 0; i < bonesToDelete.children.length; i++) {
                    if (bonesToDelete.children[i] instanceof THREE.Bone) {
                        bonesToDelete.remove(bonesToDelete.children[i]);
                    }
                }
            }
            placeMesh(
                file,
                bodyPart,
                meshType,
                parentAttachment,
                childAttachment,
                rotation,
                false,
                true,
                bones,
                poseData
            );
        }
    }
    return true;
};

window.selectedMesh = function (MeshType) {
    // console.log(MeshType, selected);
    let normal = {r: 0.5, g: 0.5, b: 0.5};

    changeColor(selected, normal);
    changeColor(MeshType, color);

    selected = MeshType;
};

function changeColor(item, chosenColor) {
    let mesh = item === "pose" ? group : scene.getMyObjectByName(item);
    mesh.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            if (child.material) {
                child.material.color.r = chosenColor.r;
                child.material.color.g = chosenColor.g;
                child.material.color.b = chosenColor.b;
            }
        }
    });
}

window.changeRotation = function (bone_name, value, axis) {
    let bone = scene.getMyObjectByName(bone_name);
    if (bone instanceof THREE.Bone) {
        switch (axis) {
            case "x":
                bone.rotation.x = value;
                break;
            case "y":
                bone.rotation.y = value;
                break;
            case "z":
                bone.rotation.z = value;
                break;
            default:
        }
    }
};

window.getRotation = function (bone_name) {
    let bone = scene.getMyObjectByName(bone_name);
    if (bone instanceof THREE.Bone) {
        return {x: bone.rotation.x, y: bone.rotation.y, z: bone.rotation.z};
    }
};

window.loadPose = function (poseData, bones) {
    let L, R = false;
    for (let i = 0; i < bones.length; i++) {
        let bone = bones[i].bone;
        window.changeRotation(bone, poseData[bone].x, "x");
        window.changeRotation(bone, poseData[bone].y, "y");
        window.changeRotation(bone, poseData[bone].z, "z");

        scene.updateMatrixWorld();

        if (bone === "LegL_Foot_L") {
            L = true;
            if (L && R) {
                placeStand();
            }
        }
        if (bone === "LegR_Foot_R") {
            R = true;
            if (L && R) {
                placeStand();
            }
        }
    }
};

window.export = function (name) {
    let exporter = new THREE.STLExporter();

    if (name) {
        saveString(exporter.parse(group), name + ".stl");
    } else {
        let stlList = [];
        // I need to know in which order the files are exported...
        let Meshes = [
            "mesh-stand",
            "mesh-torso",
            "mesh-arml",
            "mesh-armr",
            "mesh-footl",
            "mesh-footr",
            "mesh-handl",
            "mesh-handr",
            "mesh-head",
            "mesh-legl",
            "mesh-legr",
            "mesh-neck"
        ];
        for (let i = 0; i < Meshes.length; i++) {
            group.traverse(function (child) {
                if (child.name === Meshes[i]) {
                    stlList.push(exporter.parse(child))
                }
            });
        }

        return stlList;
    }
};

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    camera.lookAt(new THREE.Vector3(0, 1, 0));
    renderer.render(scene, camera);
}

document.body.onresize = function () {
    //size of viewport
    renderer.setSize(window.innerWidth, window.innerHeight);
    //aspect ratio update
    camera.aspect = (window.innerWidth) / window.innerHeight;
    camera.updateProjectionMatrix();
};

let link = document.createElement("a");
link.style.display = "none";
document.body.appendChild(link); // Firefox workaround, see #6594

function save(blob, filename) {
    link.href = URL.createObjectURL(blob);
    link.download = filename || "untitled.json";
    link.click();
}

// function saveArrayBuffer(buffer, filename) {
//     save(new Blob([buffer], {type: "application/octet-stream"}), filename);
// }

function saveString(text, filename) {
    save(new Blob([text], {type: "text/plain"}), filename);
}