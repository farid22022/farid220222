import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

const earthTextureUrl = "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const bumpTextureUrl = "https://unpkg.com/three-globe/example/img/earth-topology.png";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function interpolatePath(progress, stops) {
  const nextIndex = stops.findIndex((stop) => progress <= stop.t);
  if (nextIndex <= 0) return stops[0];
  const previous = stops[nextIndex - 1];
  const next = stops[nextIndex];
  const local = (progress - previous.t) / (next.t - previous.t);
  const eased = local * local * (3 - 2 * local);

  return {
    x: previous.x + (next.x - previous.x) * eased,
    y: previous.y + (next.y - previous.y) * eased,
    z: previous.z + (next.z - previous.z) * eased,
    scale: previous.scale + (next.scale - previous.scale) * eased,
    opacity: previous.opacity + (next.opacity - previous.opacity) * eased
  };
}

function makeFallbackTexture(THREE) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const ocean = ctx.createLinearGradient(0, 0, 0, canvas.height);
  ocean.addColorStop(0, "#09172b");
  ocean.addColorStop(0.5, "#030712");
  ocean.addColorStop(1, "#08111f");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(140, 155, 135, 0.76)";
  const land = [
    [170, 160, 150, 70],
    [300, 210, 118, 86],
    [460, 160, 128, 64],
    [570, 230, 170, 86],
    [760, 155, 160, 78],
    [820, 270, 130, 82],
    [230, 315, 95, 70]
  ];
  land.forEach(([x, y, w, h]) => {
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, Math.random() * 0.2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
  for (let i = 0; i < 420; i += 1) {
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 + 0.5, 0.8);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function ScrollEarthScene() {
  const mountRef = useRef(null);
  const { theme } = useTheme();

  const config = useMemo(
    () => ({
      enabled: theme?.earthSceneEnabled !== false,
      scale: clamp(Number(theme?.earthScale ?? 0.68), 0.35, 1.2),
      zoom: clamp(Number(theme?.earthScrollZoom ?? 0.72), 0.2, 1.6),
      drift: clamp(Number(theme?.earthHorizontalDrift ?? 1), 0.2, 1.8),
      speed: clamp(Number(theme?.earthRotationSpeed ?? 1), 0.15, 2.5),
      glow: clamp(Number(theme?.earthGlowIntensity ?? 0.68), 0.1, 1.2),
      opacity: clamp(Number(theme?.earthOpacity ?? 0.72), 0.1, 1),
      fluidity: clamp(Number(theme?.earthMotionFluidity ?? 0.08), 0.02, 0.18)
    }),
    [
      theme?.earthSceneEnabled,
      theme?.earthScale,
      theme?.earthScrollZoom,
      theme?.earthHorizontalDrift,
      theme?.earthRotationSpeed,
      theme?.earthGlowIntensity,
      theme?.earthOpacity,
      theme?.earthMotionFluidity
    ]
  );

  useEffect(() => {
    if (!config.enabled) return undefined;

    const mount = mountRef.current;
    let cancelled = false;
    let cleanup = () => {};

    async function setup() {
      const THREE = await import("three");
      if (cancelled) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0, 4.2);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      const earthGroup = new THREE.Group();
      scene.add(earthGroup);

      const fallbackTexture = makeFallbackTexture(THREE);
      const earthMaterial = new THREE.MeshStandardMaterial({
        map: fallbackTexture,
        roughness: 0.92,
        metalness: 0.04,
        color: new THREE.Color(0xbfc8d7),
        emissive: new THREE.Color(0x06070b),
        emissiveIntensity: 0.24
      });

      const loader = new THREE.TextureLoader();
      loader.load(
        earthTextureUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          earthMaterial.map = texture;
          earthMaterial.needsUpdate = true;
        },
        undefined,
        () => {}
      );
      loader.load(
        bumpTextureUrl,
        (texture) => {
          earthMaterial.bumpMap = texture;
          earthMaterial.bumpScale = 0.035;
          earthMaterial.needsUpdate = true;
        },
        undefined,
        () => {}
      );

      const earth = new THREE.Mesh(new THREE.SphereGeometry(1.18, 96, 96), earthMaterial);
      earth.rotation.z = -0.18;
      earthGroup.add(earth);

      const cityMaterial = new THREE.PointsMaterial({
        color: 0xfff2d6,
        size: 0.007,
        transparent: true,
        opacity: 0.56,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const cityPositions = [];
      for (let i = 0; i < 900; i += 1) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const bias = Math.sin(theta * 2.7) * Math.cos(phi * 3.1);
        if (bias < -0.22) continue;
        cityPositions.push(
          Math.sin(phi) * Math.cos(theta) * 1.187,
          Math.cos(phi) * 1.187,
          Math.sin(phi) * Math.sin(theta) * 1.187
        );
      }
      const cityGeometry = new THREE.BufferGeometry();
      cityGeometry.setAttribute("position", new THREE.Float32BufferAttribute(cityPositions, 3));
      const cityLights = new THREE.Points(cityGeometry, cityMaterial);
      earthGroup.add(cityLights);

      scene.add(new THREE.AmbientLight(0xffffff, 0.18));
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
      keyLight.position.set(-3.5, 1.7, 4.4);
      scene.add(keyLight);
      const redLight = new THREE.PointLight(0xff3322, 4.2, 8);
      redLight.position.set(0, -2.2, 2.6);
      scene.add(redLight);

      const drift = config.drift;
      const scale = config.scale;
      const zoom = config.zoom;
      const opacity = config.opacity;
      const stops = [
        { t: 0, x: 1.18 * drift, y: -0.1, z: 4.9 - zoom * 0.18, scale: scale * 0.86, opacity: opacity * 0.76 },
        { t: 0.18, x: -1.05 * drift, y: -0.03, z: 4.55 - zoom * 0.38, scale: scale * 0.98, opacity },
        { t: 0.36, x: 1.08 * drift, y: 0.06, z: 4.35 - zoom * 0.56, scale: scale * 1.08, opacity: opacity * 0.88 },
        { t: 0.56, x: -0.92 * drift, y: -0.08, z: 4.7 - zoom * 0.34, scale: scale * 0.94, opacity: opacity * 0.96 },
        { t: 0.78, x: 0.96 * drift, y: 0.02, z: 4.2 - zoom * 0.62, scale: scale * 1.15, opacity: opacity * 0.84 },
        { t: 1, x: 0.1 * drift, y: -0.08, z: 4.82 - zoom * 0.24, scale: scale * 0.9, opacity: opacity * 0.8 }
      ];

      const target = { progress: 0 };
      const current = { ...stops[0] };
      let previousTime = 0;

      function updateScrollProgress() {
        const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        target.progress = clamp(window.scrollY / scrollable, 0, 1);
      }

      function resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        updateScrollProgress();
      }

      let animationFrame;
      function animate(time) {
        const desired = interpolatePath(target.progress, stops);
        const delta = Math.min(48, time - previousTime || 16.67);
        previousTime = time;
        const damping = 1 - Math.pow(1 - config.fluidity, delta / 16.67);
        current.x += (desired.x - current.x) * damping;
        current.y += (desired.y - current.y) * damping;
        current.z += (desired.z - current.z) * damping;
        current.scale += (desired.scale - current.scale) * damping;
        current.opacity += (desired.opacity - current.opacity) * damping;

        earthGroup.position.set(current.x, current.y, 0);
        earthGroup.scale.setScalar(current.scale);
        earthGroup.rotation.y = time * 0.00013 * config.speed + target.progress * Math.PI * 2.1;
        earthGroup.rotation.x = -0.08 + Math.sin(time * 0.00022) * 0.035;
        camera.position.z = current.z;
        mount.style.opacity = current.opacity;
        cityLights.rotation.y = earthGroup.rotation.y * -0.08;
        redLight.intensity = 3.6 * config.glow;

        renderer.render(scene, camera);
        animationFrame = requestAnimationFrame(animate);
      }

      resize();
      updateScrollProgress();
      animate(0);
      window.addEventListener("resize", resize);
      window.addEventListener("scroll", updateScrollProgress, { passive: true });

      cleanup = () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", updateScrollProgress);
        earth.geometry.dispose();
        earthMaterial.map?.dispose?.();
        earthMaterial.bumpMap?.dispose?.();
        earthMaterial.dispose();
        cityGeometry.dispose();
        cityMaterial.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    }

    setup();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [config]);

  return <div ref={mountRef} className="scroll-earth-scene" aria-hidden="true" />;
}
