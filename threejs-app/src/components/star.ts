import {
  Mesh,
  BufferGeometry,
  Material,
  Shape,
  ExtrudeGeometry,
  MeshStandardMaterial,
  Scene,
} from 'three';

export class Star extends Mesh {
  scene: Scene;
  innerRadius: number;
  outerRadius: number;
  sides: number;
  geometry: BufferGeometry;
  material: Material;

  constructor (
    scene: Scene,
    innerRadius = 0.6,
    outerRadius = 1,
    sides = 5,
    color = 0x839432
  ) {
    super();

    this.scene = scene;
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.sides = sides;

    this.geometry = this.createGeometry();
    this.material = new MeshStandardMaterial( { color } );
  }

  createGeometry (): BufferGeometry {
    const shape = new Shape();
    const inc = ( Math.PI * 2 ) / ( this.sides * 2 );

    shape.moveTo( this.outerRadius, 0 );
    let inner = true;

    for ( let theta = inc; theta < Math.PI * 2; theta += inc ) {
      const radius = inner ? this.innerRadius : this.outerRadius;
      shape.lineTo( Math.cos( theta ) * radius, Math.sin( theta ) * radius );
      inner = !inner;
    }

    return new ExtrudeGeometry( shape, {
      steps: 1,
      depth: 0.1,
      bevelSize: 0.5,
      bevelThickness: 0.5,
      bevelOffset: -0.5,
      bevelSegments: 5,
    } );
  }

  animate () {
    this.rotateX( 0.01 );
    this.rotateY( 0.01 );
  }

  dispose () {
    this.material.dispose();
    this.geometry.dispose();
    this.scene.remove( this );
  }
}
