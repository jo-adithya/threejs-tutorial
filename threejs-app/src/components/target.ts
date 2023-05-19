import { Scene, Group } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Target {
  scene: Scene;
  loader: GLTFLoader;
  targets: Group[];
  
  constructor ( scene: Scene ) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.targets = [];
  }

  createObject ( x = 0, y = 0, z = 0 ) {
    this.loader.load( '../../public/target.glb', ( gltf ) => {
      gltf.scene.scale.set( 0.5, 0.5, 0.5 );
      gltf.scene.position.set( x, y, z );
      gltf.scene.translateY( -1 );
      gltf.scene.rotateY( Math.PI );
      this.targets.push( gltf.scene );
      this.scene.add( gltf.scene );
    } );
  }
}