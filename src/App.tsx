import React from 'react';
import { Canvas } from '@react-three/fiber';
import Box from './components/Box';
import * as THREE from 'three';



function App() {


  const vertexShader = () => {
    return `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `
  }

  const fragmentShader = () => {
    return `
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform float time;

      void main() {
        gl_FragColor = vec4( mix( colorA, colorB, cos( time ) ), 1.0 );
      }
    `
  }

  var uniforms = {
    colorA: { type: 'vec3', value: new THREE.Color( 0xB33333) },
    colorB: { type: 'vec3', value: new THREE.Color( 0xf1c40f ) },
    time: { value: 0.0 }
  };


  const myShader = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader()
  } );


  return (
    <div className="App">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]}  material={myShader} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
