import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

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

  const directionalLight = new THREE.DirectionalLight("white", 0.8);
  directionalLight.position.set(66, 49, 50);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const lightHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    2,
    0x000000
  );
  scene.add(lightHelper);

  // Camera
  camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
  camera.position.z = 10;
  
  //#region  //*=========== Skybox ===========
  const loader = new THREE.TextureLoader();
  const texture = loader.load("assets/images/chinese_garden.jpg", () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
    rt.fromEquirectangularTexture(renderer, texture);
    scene.background = rt.texture;
  });
  //#region  //*=========== Skybox ===========

  //#region  //*=========== Plane ===========
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 15, 100, 100),
    new THREE.MeshPhongMaterial({
      color: "white",
      side: THREE.DoubleSide,
    })
  );
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -3;
  scene.add(plane);
  //#endregion  //*======== Plane ===========

  //#region  //*=========== Cube ===========
  const cubeTexture = new THREE.TextureLoader().load("assets/images/wood.jpg");
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0xffb703,
    map: cubeTexture,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);
  //#endregion  //*======== Cube ===========

  // Render
  renderer = new THREE.WebGLRenderer({ antialias: true });

  //#region  //*=========== OrbitControls ===========
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  //#endregion  //*======== OrbitControls ===========

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);

  function animation() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  }
  animation();
})();
