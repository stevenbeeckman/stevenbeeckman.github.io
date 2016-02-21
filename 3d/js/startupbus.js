var camera;
var scene;
var renderer;
var bus_spain;
  
init();
animate();
  
function init() {
  
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 21, window.innerWidth / window.innerHeight, 1, 1000);
  
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    scene.add(light);
  
    var geometry = new THREE.CubeGeometry( 9, 5, 10);
    var material_spain = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/spain.jpg') } );
  
    bus_spain = new THREE.Mesh(geometry, material_spain );
    bus_spain.position.z = -50;
    scene.add( bus_spain );
  
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
  
    window.addEventListener( 'resize', onWindowResize, false );
  
    render();
}
  
function animate() {
    //bus_spain.rotation.x += .04;
    bus_spain.rotation.y += .02;
  
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