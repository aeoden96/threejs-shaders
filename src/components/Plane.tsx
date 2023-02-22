import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

import { Water } from "three/examples/jsm/objects/Water.js";
import THREE from 'three';

type PlaneProps = {
  position: [number, number, number],
  rotation?: [number, number, number],
  material?: any
}


function Plane(props: PlaneProps) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref: any = useRef();


  // Hold state for hovered and clicked events
  // const [hovered, hover] = useState(false)
  // const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame

  useFrame((state, delta) => {
        if(ref.current.material.uniforms){
          ref.current.material.uniforms.uTime.value += delta;
      }
    })
  // Return the view, these are regular Threejs elements expressed in JSX

  // useFrame(({clock}) => {
  //   ref.current.time = clock.getElapsedTime();
  //   // console.log(ref.current.time);
  // }
  //   ); 

  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      // onClick={(event) => click(!clicked)}
      // onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => {}/* hover(false) */}>
      <planeGeometry args={[10, 10, 32,32]} />
      <primitive 
        object={props.material} 
        attach="material" 
        wireframe={false}
      /> 
    </mesh>
  )
}

export default Plane;