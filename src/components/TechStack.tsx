import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Decal } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "https://unpkg.com/@lobehub/icons-static-png@latest/light/claude-color.png",
  "https://unpkg.com/@lobehub/icons-static-png@latest/light/n8n-color.png",
  "https://unpkg.com/@lobehub/icons-static-png@latest/light/github.png",
  "https://unpkg.com/@lobehub/icons-static-png@latest/light/gemini-color.png",
  "https://unpkg.com/@lobehub/icons-static-png@latest/light/openai.png",
  "https://unpkg.com/@lobehub/icons-static-png@latest/light/perplexity-color.png",
  "https://cdn.simpleicons.org/airtable/18BFFF",
  "https://unpkg.com/@lobehub/icons-static-png@latest/light/cursor.png",
  "https://unpkg.com/@lobehub/icons-static-png@latest/light/make-color.png",
  "https://cdn.simpleicons.org/supabase/3ECF8E",
  "https://unpkg.com/@lobehub/icons-static-png@latest/light/lovable-color.png",
];
const textures = imageUrls.map((url) => {
  const tex = textureLoader.load(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
});

const sphereGeometry = new THREE.SphereGeometry(1, 12, 12);

const spheres = [...Array(imageUrls.length * 2)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  texture: THREE.Texture;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  texture,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        rotation={[0.3, 1, 1]}
      >
        <meshPhysicalMaterial 
           color="#ffffff" 
           emissive="#ffffff" 
           emissiveIntensity={0.2} 
           metalness={0.5} 
           roughness={1} 
           clearcoat={0.1} 
        />
        <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={0.88}>
          <meshPhysicalMaterial 
            map={texture} 
            emissiveMap={texture} 
            emissive="#ffffff" 
            emissiveIntensity={0.4} 
            transparent 
            polygonOffset 
            polygonOffsetFactor={-1} 
          />
        </Decal>
        <Decal position={[0, 0, -1]} rotation={[0, Math.PI, 0]} scale={0.88}>
          <meshPhysicalMaterial 
            map={texture} 
            emissiveMap={texture} 
            emissive="#ffffff" 
            emissiveIntensity={0.4} 
            transparent 
            polygonOffset 
            polygonOffsetFactor={-1} 
          />
        </Decal>
      </mesh>
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        dpr={[1, 1.5]}
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => {
            const resIdx = i % textures.length;
            return (
              <SphereGeo
                key={i}
                {...props}
                texture={textures[resIdx]}
                isActive={isActive}
              />
            );
          })}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO halfRes color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
