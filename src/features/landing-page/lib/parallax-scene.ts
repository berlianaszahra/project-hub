import * as THREE from "three";
import { disposeObject, loadRing, loadStudio } from "./ring-assets";

export function createParallaxScene(host: HTMLElement, hero: HTMLElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 40);
  camera.position.z = 10;
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xb7c9e0, 2));
  const key = new THREE.DirectionalLight(0xffffff, 3);
  key.position.set(-3, 5, 6);
  scene.add(key);

  const rings: THREE.Group[] = [];
  const pointer = new THREE.Vector2();
  const smoothedPointer = new THREE.Vector2();
  const positions = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ];
  const rotations = [
    new THREE.Euler(0.35, -0.55, -0.35),
    new THREE.Euler(-0.5, 0.65, 0.5),
    new THREE.Euler(0.25, -0.4, 0.4),
  ];
  let disposed = false;
  let visible = false;
  let frame = 0;
  let lastFrame = 0;
  let elapsed = 0;
  let worldPerPixel = 0;
  let scroll = 0;
  let scrollTarget = 0;
  let environment: THREE.Texture | undefined;

  function resize() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    const compact = width < 768;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        compact ? 1 : 1.5,
        Math.sqrt(1_800_000 / (width * height)),
      ),
    );
    renderer.setSize(width, height);
    worldPerPixel =
      (2 * 10 * Math.tan(THREE.MathUtils.degToRad(35 / 2))) / height;
    const heroHeight = hero.offsetHeight;
    const wide = width >= 1280;
    const layout = compact
      ? [
          { x: -30, y: heroHeight * 0.64, size: 105 },
          { x: width + 32, y: heroHeight * 0.21, size: 145 },
          { x: width - 8, y: heroHeight - 20, size: 75 },
        ]
      : [
          { x: wide ? 52 : -35, y: heroHeight * 0.58, size: wide ? 220 : 190 },
          {
            x: width - (wide ? 30 : -45),
            y: heroHeight * 0.24,
            size: wide ? 290 : 230,
          },
          { x: width * 0.9, y: heroHeight + 10, size: 110 },
        ];
    rings.forEach((ring, index) => {
      const { x, y, size } = layout[index];
      positions[index].set(
        (x - width / 2) * worldPerPixel,
        (height / 2 - y) * worldPerPixel,
        0,
      );
      ring.position.copy(positions[index]);
      ring.scale.setScalar((size / 2) * worldPerPixel);
    });
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    pointer.set(
      (event.clientX / window.innerWidth - 0.5) * 2,
      (event.clientY / window.innerHeight - 0.5) * 2,
    );
  }

  function resetPointer() {
    pointer.set(0, 0);
  }

  function onScroll() {
    scrollTarget = Math.max(0, -host.getBoundingClientRect().top);
  }

  function render(now: number) {
    frame = requestAnimationFrame(render);
    const delta = (now - lastFrame) / 1000;
    if (delta < 1 / 30) return;
    lastFrame = now;
    const step = Math.min(delta, 0.1);
    elapsed += step;
    const smoothing = 1 - Math.exp(-step * 5);
    smoothedPointer.lerp(pointer, smoothing);
    scroll += (scrollTarget - scroll) * smoothing;
    rings.forEach((ring, index) => {
      const depth = [1, -0.7, 0.5][index];
      ring.position.copy(positions[index]);
      ring.position.x += smoothedPointer.x * 14 * worldPerPixel * depth;
      ring.position.y +=
        (scroll * 0.15 * depth +
          Math.sin(elapsed * 0.55 + index * 2) * 7 -
          smoothedPointer.y * 10 * depth) *
        worldPerPixel;
      ring.rotation.set(
        rotations[index].x +
          smoothedPointer.y * 0.12 +
          Math.sin(elapsed * 0.3 + index) * 0.08,
        rotations[index].y + smoothedPointer.x * 0.2 + elapsed * 0.035 * depth,
        rotations[index].z + Math.sin(elapsed * 0.25 + index) * 0.1,
      );
    });
    renderer.render(scene, camera);
  }

  function updatePlayback() {
    cancelAnimationFrame(frame);
    if (!disposed && visible && !document.hidden) {
      lastFrame = performance.now();
      frame = requestAnimationFrame(render);
    }
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updatePlayback();
  });
  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(host);
  sizeObserver.observe(hero);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("blur", resetPointer);
  document.documentElement.addEventListener("pointerleave", resetPointer);
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", updatePlayback);

  const ready = Promise.all([
    loadRing().then((model) => {
      if (disposed) {
        disposeObject(model);
        return;
      }
      const originalMaterials = new Set<THREE.Material>();
      model.traverse((object) => {
        if (object instanceof THREE.Mesh)
          originalMaterials.add(object.material);
      });
      for (let index = 0; index < 3; index++) {
        const ring = index === 0 ? model : model.clone(true);
        // Each ring shares geometry but has its own finish.
        ring.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.material = (
            object.material as THREE.MeshStandardMaterial
          ).clone();
          object.material.color.setHex([0xbde5d4, 0xe0e8f6, 0xe8d8b4][index]);
        });
        rings.push(ring);
        scene.add(ring);
      }
      for (const material of originalMaterials) material.dispose();
      resize();
    }),
    loadStudio().then((texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      environment = texture;
      scene.environment = texture;
      scene.environmentIntensity = 1.2;
    }),
  ]).then(() => {
    if (disposed) return;
    onScroll();
    observer.observe(host);
  });

  resize();

  return {
    ready,
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", resetPointer);
      document.documentElement.removeEventListener(
        "pointerleave",
        resetPointer,
      );
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", updatePlayback);
      disposeObject(scene);
      environment?.dispose();
      renderer.dispose();
      const context = renderer.getContext();
      if (!context.isContextLost())
        context.getExtension("WEBGL_lose_context")?.loseContext();
      renderer.domElement.remove();
    },
  };
}
