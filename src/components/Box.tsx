import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

type BoxProps = {
  position: [number, number, number],
  material?: any
}

function Box(props: BoxProps) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref: any = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame

  useFrame((state, delta) => {
      if(ref.current) {
      ref.current.rotation.x += delta;
      }
    }
    )
  // Return the view, these are regular Threejs elements expressed in JSX


  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      {props.material ? <primitive object={props.material} attach="material" /> : <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />}
    </mesh>
  )
}

export default Box;