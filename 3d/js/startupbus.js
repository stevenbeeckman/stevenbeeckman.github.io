var camera;
var scene;
var renderer;
var bus_belgium;
var bus_germany;
var bus_italy;
var bus_spain;
var bus_uk;
var bus_model;

var loader;


var buses = new Array();
var grid;

var camera_up = true;
var buses_move = true;

init();
animate();

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 1000);
    loader = new THREE.ObjectLoader();

    loader.load("assets/bus.json",function ( obj ) {
        console.log("Loaded startupbus model");
        bus_model = obj;
        bus_model.position.z = 240;
        bus_model.position.x = 7;
        scene.add( bus_model );
    });

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    scene.add(light);

    var geometry = new THREE.CubeGeometry( 9, 5, 9);
    var material_belgium = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/belgium.jpg') } );
    var material_germany = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('http://i.giphy.com/GpUeJjdxvTIek.gif') } );
    var material_italy = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/italy.jpg') } );
    var material_spain = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/spain.jpg') } );
    var material_uk = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/uk.jpg') } );

    bus_italy = new THREE.Mesh(geometry, material_italy );
    bus_italy.position.z = -140;
    bus_italy.position.y = 2;
    bus_italy.position.x = -15;
    scene.add( bus_italy );

    bus_belgium = new THREE.Mesh(geometry, material_belgium );
    bus_belgium.position.z = -140;
    bus_belgium.position.y = 2;
    bus_belgium.position.x = 15;
    scene.add( bus_belgium );

    bus_germany = new THREE.Mesh(geometry, material_germany );
    bus_germany.position.z = -100;
    bus_germany.position.y = 2.1;
    bus_germany.position.x = 0;
    scene.add( bus_germany );

    bus_spain = new THREE.Mesh(geometry, material_spain );
    bus_spain.position.z = -160;
    bus_spain.position.y = 2.1;
    bus_spain.position.x = 30;
    scene.add( bus_spain );

    bus_uk = new THREE.Mesh(geometry, material_uk );
    bus_uk.position.z = -190;
    bus_uk.position.y = 2.1;
    bus_uk.position.x = 45;
    scene.add( bus_uk );

    buses.push(bus_belgium);
    buses.push(bus_germany);
    buses.push(bus_italy);
    buses.push(bus_spain);
    buses.push(bus_uk);

    grid = new THREE.GridHelper(500, 10);
    grid.setColors("green", "green");
    scene.add(grid);

    camera.position.z += 280;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    render();
}

function animate() {
    //bus_spain.rotation.x += .04;
    //bus_spain.rotation.y += .02;
    if(camera_up){
        camera.position.y += .02;
        if(camera.position.y > 15){
            camera_up = false;
        }
    }else{
        camera.position.y -= .02;
        if(camera.position.y < -15){
            camera_up = true;
        }
    }
    for(var i = 0; i < buses.length; i++){
        if(buses_move){
            buses[i].position.z += .6;
            if(camera.position.y > 10){
                buses_move = false;
            }
        }else{
            //buses[i].position.z -= .4;
        }
    }

    render();
    requestAnimationFrame( animate );
}

function render() {
    renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}
