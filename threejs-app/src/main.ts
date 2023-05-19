import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Cube } from './components/cube';
import { Star } from './components/star';
import './style.css';
import { Target } from './components/target';
import { Gun } from './components/gun';

export class App {
  scene: THREE.Scene;
  light: THREE.DirectionalLight;
  ambient: THREE.HemisphereLight;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  cube: Cube;
  star: Star;
  target: Target;
  gun: Gun;
  

  constructor () {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xdfdfdf );

    this.light = new THREE.DirectionalLight( 0xffffff, 1 );
    this.light.position.set( 2, 4, 5 );
    this.scene.add( this.light );

    this.ambient = new THREE.HemisphereLight();
    this.scene.add( this.ambient );

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set( 0, 0, 5 );

    // Renderer
    const canvas = document.querySelector( '#canvas' );
    if ( !canvas ) {
      const container = document.createElement( 'div' );
      document.body.appendChild( container );
      this.renderer = new THREE.WebGLRenderer( { antialias: true } );
      container.appendChild( this.renderer.domElement );
    } else 
      this.renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
    this.renderer.setPixelRatio( window.innerWidth / window.innerHeight );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    // Animate
    this.renderer.setAnimationLoop( this.render.bind( this ) );

    // Cube
    this.cube = new Cube( this.scene );
    this.scene.add( this.cube );

    // Star
    this.star = new Star( this.scene );
    this.scene.add( this.star );
    this.cube.dispose();

    // Target
    this.target = new Target( this.scene );
    this.star.dispose();
    this.target.createObject();
    this.target.createObject( -3, 0, 0 );
    this.target.createObject( 3, 0, 0 );

    // Gun
    this.gun = new Gun( this.scene, this.camera );


    // Controls
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    window.addEventListener( 'resize', this.handleResize.bind( this ) );
  }

  render () {
    this.renderer.render( this.scene, this.camera );
    this.cube.animate();
    this.star.animate();
    this.gun.animate();
  }

  handleResize () {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera.aspect = aspectRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setPixelRatio( aspectRatio );
  }
}
