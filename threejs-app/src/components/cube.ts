// import * as THREE from 'three';
import {
  Scene,
  BufferGeometry,
  Material,
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
} from 'three';

export class Cube extends Mesh {
  scene: Scene;
  geometry: BufferGeometry;
  material: Material;

  constructor (
    scene: Scene,
    width = 1,
    height = 1,
    depth = 1,
    color = 0x567293
  ) {
    super();

    this.scene = scene;
    this.geometry = new BoxGeometry( width, height, depth );
    this.material = new MeshStandardMaterial( { color } );
  }

  animate () {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }

  dispose () {
    this.geometry.dispose();
    this.material.dispose();
    this.scene.remove( this );
  }
}
