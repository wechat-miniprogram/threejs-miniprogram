export function renderCubes(canvas, THREE) {
  var container, stats;
  var camera, scene, raycaster, renderer;
  var mouse = new THREE.Vector2(), INTERSECTED;
  var radius = 100, theta = 0;
  init();
  animate();
  function init() {
    camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 1, 10000);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
    var geometry = new THREE.BoxBufferGeometry(20, 20, 20);
    for (var i = 0; i < 2000; i++) {
      var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
      object.position.x = Math.random() * 800 - 400;
      object.position.y = Math.random() * 800 - 400;
      object.position.z = Math.random() * 800 - 400;
      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;
      object.scale.x = Math.random() + 0.5;
      object.scale.y = Math.random() + 0.5;
      object.scale.z = Math.random() + 0.5;
      scene.add(object);
    }
    raycaster = new THREE.Raycaster();
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
    renderer.setSize(canvas.width, canvas.height);
  }
  function animate() {
    canvas.requestAnimationFrame(animate);
    render();
  }
  function render() {
    theta += 0.5;
    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
    camera.lookAt(scene.position);
    camera.updateMatrixWorld();
    // find intersections
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      if (INTERSECTED != intersects[0].object) {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = intersects[0].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex(0xff0000);
      }
    } else {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = null;
    }
    renderer.render(scene, camera);
  }
}