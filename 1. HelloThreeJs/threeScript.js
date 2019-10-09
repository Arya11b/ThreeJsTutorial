//Created By Arya 11
// Global Vars
var scene;
var camera;
var renderer;

const colorVariety = 0xffffff;
function init(){
    console.log("faeifh");
    // scene init
    scene = new THREE.Scene();
    // render init
    renderer = new THREE.WebGLRenderer();
    // set a new camera
    // ( angle, aspect ratio, clip start, clip end)
    camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
    // set background color
    // color, opacity
    renderer.setClearColor(0x000000,1.0);
    // enable shadows
    renderer.shadowMap.enabled = true;
    // renderer size
    renderer.setSize(window.innerWidth,window.innerHeight);
    // camera position
    camera.position.x = 10;
    camera.position.y = 15;
    camera.position.z = 15;
    camera.lookAt(scene.position);

    //create a Sphere
    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    scene.add(spotlight());
    //
    document.body.appendChild(renderer.domElement);
    //
    render();
}
function render() {
    //rotate camera
    var speed = 0.01;
    camera.position.x = camera.position.x * Math.cos(speed) + camera.position.z * Math.sin(speed);
    camera.position.z = camera.position.z * Math.cos(speed) - camera.position.x * Math.sin(speed);
    camera.lookAt(scene.position);
    renderer.render(scene,camera);
    requestAnimationFrame(render); //calls itself when needed
}

function spotlight(){
    var light = new THREE.SpotLight(0xffffff);
    light.position.set(10,20,20);
    light.shadow.camera.near = 15;
    light.shadow.camera.far = 50;
    light.castShadow = true;
    return light;
}
function toRad(deg){
    return (deg/180) * Math.PI;
}
function randomColor() {
    return Math.random() *  colorVariety;
}
function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}
function showVertices(mesh) {
    var vertices = mesh.geometry.vertices;
    var vertexGeo = new THREE.SphereGeometry(0.2);
    var vertexMat = new THREE.MeshPhongMaterial({
        color: 0x00ff00
    });
    vertices.forEach(function (vertex){
        var vertexMesh = new THREE.Mesh(vertexGeo,vertexMat);
        vertexMesh.position = vertex;
        scene.add(vertexMesh);
    });
}
window.onload = init;
// window.addEventListener('resize',resize,false);