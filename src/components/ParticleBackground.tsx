import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

const ParticleBackground = () => {
  return (
    <Particles
      options={{
        background: { color: { value: "transparent" } },
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false } },
          size: { value: { min: 1, max: 3 }, random: true },
          move: { enable: true, speed: 0.5, direction: "none", outModes: "bounce" },
          links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2 }
        },
        fpsLimit: 60,
        detectRetina: true
      }}
    />
  );
};

export default ParticleBackground;
