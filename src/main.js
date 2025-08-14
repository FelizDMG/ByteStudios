import './style.css'
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

document.querySelector('#app').innerHTML = `
  <div>
    <canvas id="scene"></canvas>
    <h1>Hello Byters!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Byte Studios brought to you by Ruki and Feliz
    </p>
  </div>
`


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#scene'),
    antialias: true
})
renderer.setSize(window.innerWidth/2, window.innerHeight/2)
camera.position.set(0, 0, 30)

const light = new THREE.DirectionalLight(0xffffff, 1)
const alight = new THREE.AmbientLight(0xffffff, 1)
light.position.set(0, 1, 2)
scene.add(light,alight)

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 10 //zoom distance min
controls.maxDistance = 30 //zoom distance max
controls.minPolarAngle = Math.PI / 4 // 45 degrees up
controls.maxPolarAngle = Math.PI * 3 / 4 // 45 degrees down
controls.maxTargetRadius = 10
controls.screenSpacePanning = true
controls.enablePan = true


const loader = new GLTFLoader()
loader.load(
    'https://raw.githubusercontent.com/FelizDMG/ByteStudios/main/models/blender.glb',
    (gltf) => {
        const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
        const height = boundingBox.max.y - boundingBox.min.y;
        gltf.scene.position.y = -height / 2;
        scene.add(gltf.scene)
    },
    undefined,
    (error) => {
        console.error('Error loading model:', error)
    }
)

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}

animate()
