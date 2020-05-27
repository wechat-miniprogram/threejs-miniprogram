import { createScopedThreejs } from 'threejs-miniprogram'
import registerOrbit from "../test-cases/orbit"

Page({
  data: {},
  onLoad: function () {
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        const THREE = createScopedThreejs(canvas)
        this.canvas = canvas
        console.log(canvas)

        const camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 1, 1000);
        camera.position.z = 500;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xAAAAAA);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        
        const { OrbitControls } = registerOrbit(THREE)
        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.set(200, 200, 500);
        controls.update();
        const geometry = new THREE.BoxBufferGeometry(200, 200, 200);
      
        const texture = new THREE.TextureLoader().load('./pikachu.png');
        const material = new THREE.MeshBasicMaterial({ map: texture });
      
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        function render() {
          canvas.requestAnimationFrame(render);
          controls.update();
          renderer.render(scene, camera);
        }

        render()
      })
  },
  touchStart(e) {
    console.log('canvas', e)
    this.canvas.dispatchTouchEvent({...e, type:'touchstart'})
  },
  touchMove(e) {
    console.log('canvas', e)
    this.canvas.dispatchTouchEvent({...e, type:'touchmove'})
  },
  touchEnd(e) {
    console.log('canvas', e)
    this.canvas.dispatchTouchEvent({...e, type:'touchend'})
  },
  touchCancel(e) {
    // console.log('canvas', e)
  },
  longTap(e) {
    // console.log('canvas', e)
  },
  tap(e) {
    // console.log('canvas', e)
  },
  documentTouchStart(e) {
    // console.log('document',e)
  },
  documentTouchMove(e) {
    // console.log('document',e)
  },
  documentTouchEnd(e) {
    // console.log('document',e)
  },
})
