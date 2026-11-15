import { gsap } from "gsap";
import * as THREE from "three";
import { disposeObject, loadRing, loadStudio } from "./ring-assets";

export function createIntroScene(host: HTMLElement) {
  const width = host.clientWidth;
  const height = host.clientHeight;
  const compact = width < 768;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 60);
  camera.position.set(0.35, 0.18, 9.5);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      1.25,
      Math.sqrt(1_500_000 / (width * height)),
    ),
  );
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);

  const lightingCanvas = document.createElement("canvas");
  lightingCanvas.width = lightingCanvas.height = 128;
  const lighting = lightingCanvas.getContext("2d");
  if (lighting) {
    const gradient = lighting.createRadialGradient(40, 30, 4, 68, 68, 82);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.3, "#effbf4");
    gradient.addColorStop(0.55, "#a9bdb4");
    gradient.addColorStop(0.8, "#4d6a60");
    gradient.addColorStop(1, "#d8ede4");
    lighting.fillStyle = gradient;
    lighting.fillRect(0, 0, 128, 128);
    const highlight = lighting.createRadialGradient(35, 24, 0, 35, 24, 20);
    highlight.addColorStop(0, "#ffffff");
    highlight.addColorStop(1, "#ffffff00");
    lighting.fillStyle = highlight;
    lighting.fillRect(0, 0, 128, 128);
  }
  const matcap = new THREE.CanvasTexture(lightingCanvas);
  matcap.colorSpace = THREE.SRGBColorSpace;

  const lens = new THREE.Group();
  lens.position.z = 3.8;
  lens.rotation.set(0.1, -0.18, -0.12);
  lens.scale.setScalar(compact ? 0.61 : Math.min(1.4, (width / height) * 0.73));
  scene.add(lens);

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 32, 24),
    new THREE.MeshMatcapMaterial({
      color: 0x1caf40,
      matcap,
    }),
  );
  sphere.position.z = -3;
  scene.add(sphere);

  const orbit = new THREE.Group();
  orbit.position.copy(sphere.position);
  orbit.rotation.set(1.13, 0.3, -0.3);
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0x85b6a3,
    transparent: true,
    opacity: 0.45,
  });
  orbit.add(
    new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.007, 6, 100), orbitMaterial),
  );
  scene.add(orbit);

  const cardSpecs = [
    {
      title: "CampusConnect",
      label: "PROJECT / 01",
      detail: "React   ·   TypeScript",
      color: "#d4e3ff",
      icon: "C",
      x: -2.15,
      y: 0.95,
      z: 0.7,
      rotation: -0.12,
    },
    {
      title: "Tim yang tepat.",
      label: "KOLABORASI",
      detail: "Designer + Developer + Kamu",
      color: "#cef3d7",
      icon: "+",
      x: 2.05,
      y: 0.55,
      z: -0.1,
      rotation: 0.1,
    },
    {
      title: "StudySpace",
      label: "PROJECT / 02",
      detail: "Vue   ·   Firebase",
      color: "#fcdfa1",
      icon: "S",
      x: -1.8,
      y: -1.05,
      z: -0.5,
      rotation: 0.1,
    },
    {
      title: "Ide jadi nyata.",
      label: "MULAI BERSAMA",
      detail: "Satu ide. Banyak kemungkinan.",
      color: "#eadbff",
      icon: "↗",
      x: 2.3,
      y: -1.15,
      z: 1.1,
      rotation: -0.08,
    },
  ];
  const cards: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = [];
  for (const spec of compact ? cardSpecs.slice(0, 2) : cardSpecs) {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 352;
    const context = canvas.getContext("2d");
    if (!context) continue;
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.roundRect(8, 8, 624, 336, 30);
    context.fill();
    context.strokeStyle = "#dce6df";
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = spec.color;
    context.beginPath();
    context.roundRect(42, 42, 76, 76, 20);
    context.fill();
    context.fillStyle = "#324438";
    context.font = "500 38px Arial";
    context.fillText(spec.icon, 65, 94);
    context.fillStyle = "#7b887f";
    context.font = "500 18px Arial";
    context.fillText(spec.label, 144, 87);
    context.fillStyle = "#1c2b22";
    context.font = "600 37px Arial";
    context.fillText(spec.title, 42, 182);
    context.fillStyle = "#717784";
    context.font = "23px Arial";
    context.fillText(spec.detail, 42, 227);
    ["#d4e3ff", "#fcdfa1", "#cef3d7"].forEach((color, index) => {
      context.beginPath();
      context.fillStyle = color;
      context.arc(60 + index * 34, 287, 21, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#34473d";
      context.font = "16px Arial";
      context.fillText(["N", "R", "F"][index], 54 + index * 34, 293);
    });
    context.fillStyle = "#278676";
    context.font = "19px Arial";
    context.fillText("Siap berkolaborasi", 410, 294);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const card = new THREE.Mesh(
      new THREE.PlaneGeometry(1.9, 1.045),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      }),
    );
    card.position.set(spec.x * (compact ? 0.42 : 1), spec.y, spec.z);
    card.rotation.set(-0.06, spec.x > 0 ? -0.25 : 0.25, spec.rotation);
    cards.push(card);
    scene.add(card);
  }

  const motes = new THREE.Group();
  const moteMaterials = [0x9cd5b6, 0xb4cbed, 0xf1d28c].map(
    (color) =>
      new THREE.MeshMatcapMaterial({
        color,
        matcap,
        transparent: true,
      }),
  );
  for (let index = 0; index < (compact ? 12 : 24); index++) {
    const angle = index * 2.399;
    const radius = 1.35 + (index % 5) * 0.4;
    const mote = new THREE.Mesh(
      new THREE.SphereGeometry(0.025 + (index % 3) * 0.018, 10, 8),
      moteMaterials[index % 3],
    );
    mote.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.7,
      -1 - (index % 7) * 0.4,
    );
    motes.add(mote);
  }
  scene.add(motes);

  let pointerX = 0;
  let pointerY = 0;
  const motion = { parallax: 1 };
  function onPointerMove(event: PointerEvent) {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 0.08;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 0.06;
  }
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  let lastFrame = -Infinity;
  let disposed = false;
  let environment: THREE.Texture | undefined;
  const ready = Promise.all([
    loadRing().then((ring) => {
      if (disposed) {
        disposeObject(ring);
        return;
      }
      ring.scale.setScalar(2.45);
      lens.add(ring);
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
  ]);
  function render(seconds: number) {
    const time = seconds * 1000;
    if (time - lastFrame < 1000 / 40) return;
    lastFrame = time;
    camera.lookAt(pointerX * motion.parallax, pointerY * motion.parallax, -3);
    lens.rotation.z = -0.12 + time * 0.000025;
    orbit.rotation.z = time * 0.00015;
    sphere.rotation.y = time * 0.0002;
    renderer.render(scene, camera);
  }
  gsap.ticker.add(render);
  function stop() {
    gsap.ticker.remove(render);
    window.removeEventListener("pointermove", onPointerMove);
  }

  const timeline = gsap.timeline({ paused: true });
  timeline.to(
    camera.position,
    { z: 1.9, x: 0, y: 0, duration: 1.7, ease: "power2.inOut" },
    0.15,
  );
  timeline.to(motion, { parallax: 0, duration: 0.4 }, 1.3);
  timeline.to(lens.rotation, { y: 0.04, x: 0, duration: 1.4 }, 0);
  cards.forEach((card, index) => {
    timeline.to(
      card.material,
      { opacity: 1, duration: 0.35 },
      0.3 + index * 0.05,
    );
    timeline.to(
      card.position,
      {
        x: card.position.x * 1.8,
        z: card.position.z + 2,
        duration: 1.2,
        ease: "power2.in",
      },
      0.55,
    );
    timeline.to(card.material, { opacity: 0, duration: 0.35 }, 1.2);
  });
  timeline.to(orbitMaterial, { opacity: 0, duration: 0.3 }, 1.4);
  timeline.to(moteMaterials, { opacity: 0, duration: 0.35 }, 1.4);

  return {
    ready,
    timeline,
    stop,
    sphereBounds() {
      camera.updateMatrixWorld();
      const center = sphere.position.clone().project(camera);
      const edge = sphere.position
        .clone()
        .add(new THREE.Vector3(0.55, 0, 0))
        .project(camera);
      return {
        x: (center.x * 0.5 + 0.5) * width,
        y: (-center.y * 0.5 + 0.5) * height,
        size: Math.abs(edge.x - center.x) * width,
      };
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      timeline.kill();
      stop();
      disposeObject(scene);
      environment?.dispose();
      matcap.dispose();
      renderer.dispose();
      const context = renderer.getContext();
      if (!context.isContextLost())
        context.getExtension("WEBGL_lose_context")?.loseContext();
      renderer.domElement.remove();
    },
  };
}
