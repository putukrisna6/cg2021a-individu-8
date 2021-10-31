import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

/** @type {THREE.PerspectiveCamera} */
let camera;
/** @type {THREE.Scene} */
let scene;
/** @type {THREE.WebGLRenderer} */
let renderer;

(function init() {
  // set up three.js scene
  scene = new THREE.Scene();

  //lights
  const ambientLight = new THREE.AmbientLight("white", 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 0.6);
  directionalLight.position.set(10, 20, 0);
  scene.add(directionalLight);

  // Camera
  camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
  camera.position.z = 3;

  {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "assets/images/chinese_garden.jpg",
      () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(renderer, texture);
        scene.background = rt.texture;
      }
    );
  }

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({color: 0xffb703})
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Render
  renderer = new THREE.WebGLRenderer({ antialias: true });
  
  {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);

  function animation() {
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  }
  animation();
})();