import React, {Component} from "react";
import * as THREE from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import px from "../textures/darksky/px.jpg"
import nx from "../textures/darksky/nx.jpg"
import py from "../textures/darksky/py.jpg"
import ny from "../textures/darksky/ny.jpg"
import pz from "../textures/darksky/pz.jpg"
import nz from "../textures/darksky/nz.jpg"

class MainStage extends Component {
    constructor(props) {
        super(props);
        // Three.js important variables
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.controls = null;
        this.loader = null;

        this.selected = "Head";
        this.color = {r: 0.41, g: 0.51, b: 0.56};

        // This group will contain all the meshes but not the floor, the lights etc...
        this.group = new THREE.Group();
        this.group.name = "avatarModel"

        // Fix the spelling mistake while modeling.
        this.group.getMyObjectByName = function (name) {
            if (name === "Torso_Shoulder_L") {
                name = "Torso_Sholder_L"
            }
            if (name === "Torso_Shoulder_R") {
                name = "Torso_Sholder_R"
            }
            return this.group.getObjectByName(name);
        };

        //This keeps track of every mesh on the viewport
        this.loadedMeshes = {
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
        this.meshStaticInfo = {
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
        this.childrenList = {
            ArmR: ["HandR"],
            ArmL: ["HandL"],
            Torso: ["ArmR", "ArmL", "Head", "LegR", "LegL"],
            LegR: ["FootR"],
            LegL: ["FootL"]
        };

        window.loaded = false;
        window.partloaded = false;
    }

    // Init Function which will create all the
    // Three.js environment and load the default meshes
    init() {
        this.loader = new GLTFLoader();
        this.scene = new THREE.Scene();
        this.scene.name = "scene"
        this.scene.background = new THREE.Color(40, 44, 52);
        this.scene.fog = new THREE.Fog(0x282c34, 1, 20);
        this.scene.add(this.group);
        this.scene.getMyObjectByName = function (name) {
            if (name === "Torso_Shoulder_L") {
                name = "Torso_Sholder_L"
            }
            if (name === "Torso_Shoulder_R") {
                name = "Torso_Sholder_R"
            }
            return this.scene.getObjectByName(name);
        };

        this.buildDevHelper();
        this.buildCamera();
        this.buildRenderer();
        this.buildControls();
        this.buildLights();
        this.buildFloor();
    }

    buildDevHelper() {
        // build Axes
        let axes = new THREE.AxesHelper(2);
        axes.name = "axes";
        this.scene.add(axes);

        let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        let material = new THREE.MeshNormalMaterial();

        let mesh = new THREE.Mesh(geometry, material);
        mesh.name = "testMesh";
        this.scene.add(mesh);

        // expose scene to DOM
        window.scene = this.scene
        window.THREE = THREE
    }

    buildCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            (window.innerWidth / window.innerHeight),
            0.001,
            1000
        );
        this.camera.name = "camera";
        // Camera position in space (will be controlled by the OrbitControls later on)
        this.camera.position.x = -1;
        this.camera.position.y = 2;
        this.camera.position.z = 2;
    }

    buildRenderer() {
        // Create a renderer with antialias
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.shadowMap.enabled = true;
        // default THREE.PCFShadowMap
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Configure renderer size to fill up the whole window
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Append Renderer to DOM
        document.body.appendChild(this.renderer.domElement);

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

        let urls = [px, nx, py, ny, pz, nz];

        let reflectionCube = new THREE.CubeTextureLoader().load(urls);
        reflectionCube.format = THREE.RGBFormat;
        reflectionCube.mapping = THREE.CubeRefractionMapping;
        this.scene.background = reflectionCube;

        let size = 50;
        let divisions = 60;
        let colorCenterLine = 0x306d7d;
        let colorGrid = 0x61dafb;

        let grid = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
        grid.name = "grid";
        this.scene.add(grid);
    }

    buildControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);
        //Controlling max and min for ease of use
        this.controls.minDistance = 2;
        this.controls.maxDistance = 7;
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI / 2 - 0.1;
        this.controls.enablePan = false;
    }

    buildLights() {
        //hemisphere light: like sun light but without any shadows
        let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
        hemisphereLight.name = "hemisphereLight";
        this.scene.add(hemisphereLight);

        //Create a PointLight and turn on shadows for the light
        let light = new THREE.PointLight(0xcccccc, 1, 100);
        light.name = "light";
        light.position.set(2, 3, 3);
        light.castShadow = true;
        //Set up shadow properties for the light
        // default width
        light.shadow.mapSize.width = 4096;
        // default height
        light.shadow.mapSize.height = 4096;
        light.decay = 1;
        this.scene.add(light);

        // This light is here to show the details in the back (no shadows)
        let backLight = new THREE.PointLight(0xcccccc, 1, 100);
        backLight.name = "backLight";
        backLight.position.set(0, 1, -3);
        backLight.penumbra = 2;
        this.scene.add(backLight);
    }

    buildFloor() {
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
        this.scene.add(plane);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        this.renderScene();
    }

    renderScene() {
        this.camera.lookAt(new THREE.Vector3(0, 1, 0));
        this.renderer.render(this.scene, this.camera);
    }
}

export default MainStage