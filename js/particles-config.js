tsParticles.load("particles-js", {
  particles: {
    number: {
      value: 60, // Number of particles
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#cccccc", // Particle color
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 2, // Particle size
      random: true,
      anim: {
        enable: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#d0d0d0", // Connection line color
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8, // Speed of particle movement
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab", // 'grab' or 'repulse'
      },
      onclick: {
        enable: true,
        mode: "push", // Adds particles on click
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_opacity: 1,
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});