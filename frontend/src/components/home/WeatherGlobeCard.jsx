import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

const locations = [
  { name: "Khulna", lat: 22.8456, lon: 89.5403, color: 0xff3d3d },
  { name: "Dhaka", lat: 23.8103, lon: 90.4125, color: 0xff6b4a },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, color: 0xffffff },
  { name: "London", lat: 51.5074, lon: -0.1278, color: 0xffffff },
  { name: "New York", lat: 40.7128, lon: -74.006, color: 0xffffff }
];

function latLonToVector3(THREE, lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function WeatherGlobeCard() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    let cancelled = false;
    let cleanup = () => {};

    async function setupGlobe() {
      const THREE = await import("three");
      if (cancelled) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0.1, 4.2);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      mount.appendChild(renderer.domElement);

      const globeGroup = new THREE.Group();
      globeGroup.rotation.x = -0.18;
      scene.add(globeGroup);

      const dots = [];
      const dotMaterials = [];
      const dotGeometry = new THREE.SphereGeometry(0.008, 6, 6);
      for (let lat = -58; lat <= 72; lat += 4) {
        const circumference = Math.max(8, Math.floor(92 * Math.cos((lat * Math.PI) / 180)));
        for (let index = 0; index < circumference; index += 1) {
          const lon = (index / circumference) * 360 - 180;
          const position = latLonToVector3(THREE, lat, lon, 1.22);
          const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.28 + Math.random() * 0.42
          });
          const dot = new THREE.Mesh(dotGeometry, material);
          dot.position.copy(position);
          dot.userData.phase = Math.random() * Math.PI * 2;
          dots.push(dot);
          dotMaterials.push(material);
          globeGroup.add(dot);
        }
      }

      const markerGeometry = new THREE.SphereGeometry(0.035, 16, 16);
      const markerMaterials = [];
      locations.forEach((location) => {
        const material = new THREE.MeshBasicMaterial({ color: location.color, transparent: true, opacity: 0.95 });
        const marker = new THREE.Mesh(markerGeometry, material);
        marker.position.copy(latLonToVector3(THREE, location.lat, location.lon, 1.27));
        markerMaterials.push(material);
        globeGroup.add(marker);
      });

      function resize() {
        const rect = mount.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height, false);
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
      }

      let animationFrame;
      function animate(time) {
        globeGroup.rotation.y += 0.0024;
        dots.forEach((dot) => {
          dot.material.opacity = 0.2 + Math.sin(time * 0.0018 + dot.userData.phase) * 0.08 + 0.28;
        });
        renderer.render(scene, camera);
        animationFrame = requestAnimationFrame(animate);
      }

      resize();
      animate(0);
      window.addEventListener("resize", resize);

      cleanup = () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", resize);
        dotMaterials.forEach((material) => material.dispose());
        markerMaterials.forEach((material) => material.dispose());
        dotGeometry.dispose();
        markerGeometry.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    }

    setupGlobe();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div className="space-card globe-card relative min-h-[420px] overflow-hidden rounded-lg p-5">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_50%_100%,rgba(255,45,45,0.34),transparent_62%)]" />
      <div ref={mountRef} className="absolute inset-x-0 bottom-0 top-12" />
      <div className="relative z-10">
        <p className="text-sm uppercase tracking-[0.22em] text-white/35">Remote orbit</p>
        <h3 className="mt-2 text-2xl font-black text-white">Khulna, Bangladesh</h3>
      </div>
      <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 text-sm text-white/70 backdrop-blur">
        <MapPin className="h-4 w-4 text-[var(--accent)]" />
        Global-ready from Khulna
      </div>
    </div>
  );
}
