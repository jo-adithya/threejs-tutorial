import { Camera, Scene, Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Gun {
  private readonly speed = 0.1;
  private scene: Scene;
  private readonly camera: Camera;
  private readonly loader = new GLTFLoader();
  private readonly keySet = new Set<string>();
  private gun: Group | null;

  constructor ( scene: Scene, camera: Camera ) {
    this.scene = scene;
    this.camera = camera;
    this.gun = null;
    this.createObject();

    window.addEventListener( 'keydown', this.handleKeyDown.bind( this ) );
    window.addEventListener( 'keyup', this.handleKeyUp.bind( this ) );
  }

  private createObject () {
    this.loader.load( '/gun.glb', ( gltf ) => {
      this.gun = gltf.scene;
      this.gun.scale.set( 0.1, 0.1, 0.1 );
      this.gun.rotateY( -Math.PI / 2 );
      this.gun.rotateZ( -Math.PI / 18 );
      const { x, y, z } = this.camera.position; 
      this.gun.position.set( x, y - 0.8, z - 2 );
      this.gun.add( this.camera );
      this.scene.add( this.gun );
    } );
  }

  private handleKeyDown ( e: KeyboardEvent ) {
    this.keySet.add( e.key.toLowerCase() );
  }

  private handleKeyUp ( e: KeyboardEvent ) {
    this.keySet.delete( e.key.toLowerCase() );
    // TODO: Reload bullet if specific key is pressed
  }

  private checkInput () {
    if ( this.keySet.has( 'a' ) ) {
      this.gun?.translateX( -this.speed );
    }
    if ( this.keySet.has( 'd' ) ) {
      this.gun?.translateX( this.speed );
    }
  }

  animate () {
    this.checkInput();
  }
}