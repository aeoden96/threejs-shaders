import React from 'react';
import { Canvas } from '@react-three/fiber';
import Plane from './components/Plane';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import waterNormals from './assets/waterNormals.jpg';



function App() {


  const vertexShader = () => {
    return `
      uniform float uTime;
      varying vec3 vPosition;
      varying vec3 vNormal;


      uniform sampler2D noiseTexture;

      void main() {

        vec2 vUv = vec2(position.x + 0.5,position.y + 0.5);
        vec3 normal = texture2D(noiseTexture, vUv).xyz /3.0;
        vNormal = normal;

        float wave = sin(2.0 * (uTime + position.x +  position.y)) / 4.0;
        float displacement = normal.z / 1.0;

        gl_Position = projectionMatrix * 
        modelViewMatrix * 
        vec4( position.x, position.y,  position.z + wave + displacement , 1.0 );

        vPosition = vec3(position.x, position.y,  position.z + wave + displacement );
      }
    `
  }

  const fragmentShader = () => {
    return `
      uniform vec3 colorRock;
      uniform vec3 colorDarkBlue;
      uniform vec3 colorLightBlue;
      uniform float uTime;
      uniform sampler2D noiseTexture;
    
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
       
        gl_FragColor = vec4(mix(colorDarkBlue, colorLightBlue,(vPosition.z + 0.5)/2.0 ),1.0);
        

      }
    `
  }

  var uniforms = {
    colorA: { type: 'vec3', value: new THREE.Color( 0xB33333) },
    colorB: { type: 'vec3', value: new THREE.Color( 0x000000 ) },
    colorRock: { type: 'vec3', value: new THREE.Color( 0x333333 ) },
    colorDarkBlue: { type: 'vec3', value: new THREE.Color( 0x0000FF ) },
    colorLightBlue: { type: 'vec3', value: new THREE.Color( 0xFFFFFF ) },
    uTime: { type: 'f', value: 0.0 },
    noiseTexture: { type: 't', value: new THREE.TextureLoader().load(waterNormals) },
    
  };


  const myShader = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader()
  } );


  return (
    <div className="App">
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Plane 
          position={[0, 0, 0]} 
          rotation={[-Math.PI/2, 0, 0]}  
          material={myShader} 
        />
        {/* <Plane position={[1.2, 0, 0]} /> */}
      </Canvas>
    </div>
  );
}

export default App;
