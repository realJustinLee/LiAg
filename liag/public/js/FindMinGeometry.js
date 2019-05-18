/**
 * LiXin Avatar Generator
 *
 * Based on https://github.com/mrdoob/three.js/
 * Tested on r98
 * @author lixin / https://github.com/Great-Li-Xin
 */

THREE.FindMinGeometry = function () {
};

THREE.FindMinGeometry.prototype = {

    constructor: THREE.FindMinGeometry,

    parse: (function () {

        let vector = new THREE.Vector3();
        let normalMatrixWorld = new THREE.Matrix3();

        return function (scene) {

            let output = 100;

            scene.traverse(function (mesh) {

                if (mesh instanceof THREE.Mesh) {

                    let bufferGeometry = mesh.geometry;
                    let geometry = new THREE.Geometry().fromBufferGeometry(bufferGeometry);


                    let skinIndices = bufferGeometry.attributes.skinIndex !== undefined ? bufferGeometry.attributes.skinIndex.array : undefined;
                    let skinWeights = bufferGeometry.attributes.skinWeight !== undefined ? bufferGeometry.attributes.skinWeight.array : undefined;

                    for (let k = 0; k < bufferGeometry.attributes.position.array.length * 4 / 3; k += 4) {
                        if (skinIndices !== undefined) {

                            geometry.skinIndices.push(new THREE.Vector4(skinIndices[k], skinIndices[k + 1], skinIndices[k + 2], skinIndices[k + 3]));

                        }

                        if (skinWeights !== undefined) {

                            geometry.skinWeights.push(new THREE.Vector4(skinWeights[k], skinWeights[k + 1], skinWeights[k + 2], skinWeights[k + 3]));

                        }
                    }


                    // console.log(geometry)

                    let matrixWorld = mesh.matrixWorld;

                    if (geometry instanceof THREE.Geometry) {

                        let vertices = geometry.vertices;
                        let faces = geometry.faces;

                        normalMatrixWorld.getNormalMatrix(matrixWorld);

                        for (let i = 0, l = faces.length; i < l; i++) {
                            let face = faces[i];

                            // normalize — calculates the unit vector in the same direction as the original vector
                            vector.copy(face.normal).applyMatrix3(normalMatrixWorld).normalize();

                            let indices = [face.a, face.b, face.c];

                            for (let j = 0; j < 3; j++) {
                                let vertexIndex = indices[j];
                                if (geometry.skinIndices.length === 0) {
                                    vector.copy(vertices[vertexIndex]).applyMatrix4(matrixWorld);
                                    output += '\t\t\tvertex ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';
                                } else {
                                    vector.copy(vertices[vertexIndex]); //.applyMatrix4( matrixWorld );

                                    // see https://github.com/mrdoob/three.js/issues/3187
                                    let boneIndices = [];
                                    boneIndices[0] = geometry.skinIndices[vertexIndex].x;
                                    boneIndices[1] = geometry.skinIndices[vertexIndex].y;
                                    boneIndices[2] = geometry.skinIndices[vertexIndex].z;
                                    boneIndices[3] = geometry.skinIndices[vertexIndex].w;

                                    let weights = [];
                                    weights[0] = geometry.skinWeights[vertexIndex].x;
                                    weights[1] = geometry.skinWeights[vertexIndex].y;
                                    weights[2] = geometry.skinWeights[vertexIndex].z;
                                    weights[3] = geometry.skinWeights[vertexIndex].w;

                                    let inverses = [];
                                    inverses[0] = mesh.skeleton.boneInverses[boneIndices[0]];
                                    inverses[1] = mesh.skeleton.boneInverses[boneIndices[1]];
                                    inverses[2] = mesh.skeleton.boneInverses[boneIndices[2]];
                                    inverses[3] = mesh.skeleton.boneInverses[boneIndices[3]];

                                    let skinMatrices = [];
                                    skinMatrices[0] = mesh.skeleton.bones[boneIndices[0]].matrixWorld;
                                    skinMatrices[1] = mesh.skeleton.bones[boneIndices[1]].matrixWorld;
                                    skinMatrices[2] = mesh.skeleton.bones[boneIndices[2]].matrixWorld;
                                    skinMatrices[3] = mesh.skeleton.bones[boneIndices[3]].matrixWorld;

                                    let finalVector = new THREE.Vector4();
                                    for (let k = 0; k < 4; k++) {
                                        let tempVector = new THREE.Vector4(vector.x, vector.y, vector.z);
                                        tempVector.multiplyScalar(weights[k]);
                                        //the inverse takes the vector into local bone space
                                        tempVector.applyMatrix4(inverses[k])
                                        //which is then transformed to the appropriate world space
                                            .applyMatrix4(skinMatrices[k]);
                                        finalVector.add(tempVector);
                                    }
                                    if (output > finalVector.y) {
                                        output = finalVector.y;
                                    }
                                }
                            }
                        }
                    }
                }

            });
            return output;
        };
    }())
};