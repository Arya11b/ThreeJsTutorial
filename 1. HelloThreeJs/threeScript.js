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

    light = pointLight(10,15,20,2);
    gloabalLight = ambientLight(0.5);

    //create a Sphere (radius, hsegments , wsegments)
    var geometry = new THREE.SphereGeometry( 5, 48, 48 );
    var loader = new THREE.TextureLoader();
    var diffuseTexture = loader.load( '../textures/earth-diffuse.jpg');
    var material = new THREE.MeshLambertMaterial( {map: diffuseTexture} );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    scene.add(light);
    scene.add(gloabalLight);
    scene.add(particleCreate());
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

function pointLight(x,y,z,intensity){
    var light = new THREE.PointLight(0xffffff);
    light.position.set(x,y,z);
    light.intensity = intensity;
    light.shadow.camera.near = 15;
    light.shadow.camera.far = 500;
    light.castShadow = true;
    return light;
}
function ambientLight(intensity){
    var light = new THREE.AmbientLight(0xffffff);
    light.intensity = intensity;
    return light;
}
function toRad(deg){
    return (deg/180) * Math.PI;
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}
function particleCreate(){
    var particleCount = 1800,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 1
        });

// now create the individual particles
    for (var p = 0; p < particleCount; p++) {

        // create a particle with random
        // position values, -250 -> 250
        var pX = Math.random() * 500 - 250,
            pY = Math.random() * 500 - 250,
            pZ = Math.random() * 500 - 250,
            particle = new THREE.Vector3(pX, pY, pZ);

        // add it to the geometry
        particles.vertices.push(particle);
    }

// create the particle system
    var particleSystem = new THREE.Points(
        particles,
        pMaterial);

// add it to the scene
    return particleSystem;
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