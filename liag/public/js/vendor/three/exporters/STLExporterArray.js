/**
 * Based on https://github.com/mrdoob/three.js/blob/a72347515fa34e892f7a9bfa66a34fdc0df55954/examples/js/exporters/STLExporter.js
 * Tested on r95
 * @author kjlubick / https://github.com/kjlubick
 * @author kovacsv / http://kovacsv.hu/
 * @author mrdoob / http://mrdoob.com/
 * @author williamclot / https://github.com/williamclot
 */

THREE.STLExporterArray = function () {
};

THREE.STLExporterArray.prototype = {

    constructor: THREE.STLExporterArray,

    parse: (function () {

        var vector = new THREE.Vector3();
        var normalMatrixWorld = new THREE.Matrix3();

        return function (scene) {

            var mergeGeometry = new THREE.Geometry();

            scene.traverse(function (mesh) {

                if (mesh instanceof THREE.Mesh) {

                    //Geometry with skeleton displacement
                    var outputGeometry = new THREE.Geometry();

                    var bufferGeometry = mesh.geometry;
                    var geometry = new THREE.Geometry().fromBufferGeometry(bufferGeometry);

                    // console.log(geometry)

                    var matrixWorld = mesh.matrixWorld;

                    if (geometry instanceof THREE.Geometry) {

                        var vertices = geometry.vertices;
                        var faces = geometry.faces;

                        normalMatrixWorld.getNormalMatrix(matrixWorld);

                        for (var i = 0, l = faces.length; i < l; i++) {
                            var face = faces[i];

                            vector.copy(face.normal).applyMatrix3(normalMatrixWorld).normalize();

                            //output += '\tfacet normal ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';
                            //output += '\t\touter loop\n';

                            var indices = [face.a, face.b, face.c];

                            outputGeometry.faces.push(new THREE.Face3(face.a, face.b, face.c));

                            for (var j = 0; j < 3; j++) {
                                var vertexIndex = indices[j];
                                if (geometry.skinIndices.length == 0) {
                                    vector.copy(vertices[vertexIndex]).applyMatrix4(matrixWorld);

                                    outputGeometry.vertices.push(
                                        new THREE.Vector3(vector.x, vector.y, vector.z)
                                    );

                                    // output += '\t\t\tvertex ' + vector.x*35 + ' ' + vector.y*35 + ' ' + vector.z*35 + '\n';
                                } else {
                                    vector.copy(vertices[vertexIndex]); //.applyMatrix4( matrixWorld );

                                    // see https://github.com/mrdoob/three.js/issues/3187
                                    boneIndices = [];
                                    boneIndices[0] = geometry.skinIndices[vertexIndex].x;
                                    boneIndices[1] = geometry.skinIndices[vertexIndex].y;
                                    boneIndices[2] = geometry.skinIndices[vertexIndex].z;
                                    boneIndices[3] = geometry.skinIndices[vertexIndex].w;

                                    weights = [];
                                    weights[0] = geometry.skinWeights[vertexIndex].x;
                                    weights[1] = geometry.skinWeights[vertexIndex].y;
                                    weights[2] = geometry.skinWeights[vertexIndex].z;
                                    weights[3] = geometry.skinWeights[vertexIndex].w;

                                    inverses = [];
                                    inverses[0] = mesh.skeleton.boneInverses[boneIndices[0]];
                                    inverses[1] = mesh.skeleton.boneInverses[boneIndices[1]];
                                    inverses[2] = mesh.skeleton.boneInverses[boneIndices[2]];
                                    inverses[3] = mesh.skeleton.boneInverses[boneIndices[3]];

                                    skinMatrices = [];
                                    skinMatrices[0] = mesh.skeleton.bones[boneIndices[0]].matrixWorld;
                                    skinMatrices[1] = mesh.skeleton.bones[boneIndices[1]].matrixWorld;
                                    skinMatrices[2] = mesh.skeleton.bones[boneIndices[2]].matrixWorld;
                                    skinMatrices[3] = mesh.skeleton.bones[boneIndices[3]].matrixWorld;

                                    var finalVector = new THREE.Vector4();
                                    for (var k = 0; k < 4; k++) {
                                        var tempVector = new THREE.Vector4(vector.x, vector.y, vector.z);
                                        tempVector.multiplyScalar(weights[k]);
                                        //the inverse takes the vector into local bone space
                                        tempVector.applyMatrix4(inverses[k])
                                        //which is then transformed to the appropriate world space
                                            .applyMatrix4(skinMatrices[k]);
                                        finalVector.add(tempVector);
                                    }
                                    outputGeometry.vertices.push(
                                        new THREE.Vector3(finalVector.x, finalVector.y, finalVector.z)
                                    );
                                }
                            }

                            // output += '\tendfacet\n';
                        }
                    }
                    // End of mesh
                    // output += 'endsolid exported\n';
                    outputGeometry.computeBoundingSphere();
                    outputGeometry.computeFaceNormals();
                    mergeGeometry.merge(outputGeometry)
                }
            });
            mergeGeometry.computeBoundingSphere();

            var output = '';
            output += 'solid exported\n';

            var vertices = mergeGeometry.vertices;
            var faces = mergeGeometry.faces;


            for (var i = 0, l = faces.length; i < l; i++) {
                var face = faces[i];

                vector.copy(face.normal)

                output += '\tfacet normal ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';
                output += '\t\touter loop\n';

                var indices = [face.a, face.b, face.c];

                for (var j = 0; j < 3; j++) {
                    var vertexIndex = indices[j];
                    vector.copy(vertices[vertexIndex]);
                    output += '\t\t\tvertex ' + vector.x * 35 + ' ' + vector.y * 35 + ' ' + vector.z * 35 + '\n';

                }
                output += '\t\tendloop\n';
                output += '\tendfacet\n';
            }
            output += 'endsolid exported\n';
            return output;
        };
    }())
};