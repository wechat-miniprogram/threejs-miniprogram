export function renderCube(canvas, THREE) {
  var camera, scene, renderer;
  var mesh;
  init();
  animate();
  function init() {
    camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 1, 1000);
    camera.position.z = 400;
    scene = new THREE.Scene();
    var texture = new THREE.TextureLoader().load('/assets/crate.png');
    var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
    renderer.setSize(canvas.width, canvas.height);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
  }
  function animate() {
    canvas.requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
}