import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";

export function disposeObject(root: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();

  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    for (const material of Array.isArray(object.material)
      ? object.material
      : [object.material]) {
      materials.add(material);
      for (const value of Object.values(material)) {
        if (value instanceof THREE.Texture) textures.add(value);
      }
    }
  });

  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  for (const texture of textures) {
    texture.dispose();
    const image = texture.image;
    if (typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
      image.close();
    }
  }
}

export async function loadRing() {
  const { scene } = await new GLTFLoader().loadAsync("/ring.glb");
  const bounds = new THREE.Box3().setFromObject(scene);
  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  const scale = 2 / Math.max(size.x, size.y, size.z);

  // Keep the downloaded geometry; replace its game textures with polished metal.
  const ring = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color: 0xd8eee5,
    metalness: 0.85,
    roughness: 0.23,
    envMapIntensity: 1.3,
    side: THREE.DoubleSide,
  });
  scene.updateMatrixWorld(true);
  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const geometry = object.geometry.clone();
    geometry.applyMatrix4(object.matrixWorld);
    geometry.translate(-center.x, -center.y, -center.z);
    geometry.scale(scale, scale, scale);
    ring.add(new THREE.Mesh(geometry, material));
  });
  disposeObject(scene);
  return ring;
}

export async function loadStudio() {
  const texture = await new HDRLoader().loadAsync("/studio.hdr");
  texture.mapping = THREE.EquirectangularReflectionMapping;
  return texture;
}
