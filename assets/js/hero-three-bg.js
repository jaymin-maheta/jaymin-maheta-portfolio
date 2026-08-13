/*
 * Animated three.js hero banner background, styled after Mintlify's homepage:
 * bundles of thin curved "flow lines" fanning out from a corner, each with a
 * bright head -> dark tail gradient, gently undulating over time. Recolored
 * to this site's blue/gold brand palette rather than cloning Mintlify's
 * green identity. Degrades silently: if three.js/WebGL is unavailable, or
 * the visitor prefers reduced motion, the container stays empty and the
 * existing CSS gradient carries the hero background alone.
 */
(function () {
  var container = document.getElementById("hero-three-bg");
  if (!container) return;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || typeof THREE === "undefined") return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  } catch (e) {
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Gentle left-to-right fade only (angle-independent, so it stays correct
  // at every aspect ratio) — keeps the flow as the banner's focal visual
  // while still thinning out before it fights with the text column.
  var maskImage = "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 26%, #000 55%)";
  container.style.maskImage = maskImage;
  container.style.webkitMaskImage = maskImage;

  // Soft glow so bright strands bloom slightly, tinted to the primary color.
  renderer.domElement.style.filter =
    "drop-shadow(0 0 5px rgba(24,226,153,0.35)) drop-shadow(0 0 14px rgba(24,226,153,0.15))";

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
  camera.position.set(0, 0, 7);

  // --- Shared shader: static curve + traveling wave displacement + glow ---
  var vertexShader = [
    "attribute vec3 aNormal;",
    "attribute float aProgress;",
    "attribute vec3 aColor;",
    "attribute float aSeed;",
    "uniform float uTime;",
    "varying vec3 vColor;",
    "varying float vProgress;",
    "void main() {",
    // Anchored near the corner (aProgress ~0), free to sway toward the far
    // end — like a string pinned at one end — for a natural, physical drift
    // instead of a uniform ripple. Low frequency + slow speed keeps it calm.
    "  float sway = smoothstep(0.0, 0.85, aProgress);",
    "  float wave = sin(uTime * 0.18 + aProgress * 2.4 + aSeed) * 0.22",
    "            + sin(uTime * 0.09 - aProgress * 1.3 + aSeed * 1.7) * 0.12;",
    "  vec3 pos = position + aNormal * wave * sway;",
    "  vColor = aColor;",
    "  vProgress = aProgress;",
    "  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);",
    "}",
  ].join("\n");

  var fragmentShader = [
    "uniform float uTime;",
    "varying vec3 vColor;",
    "varying float vProgress;",
    "void main() {",
    "  float pulse = 0.65 + 0.35 * sin(vProgress * 5.0 - uTime * 0.45);",
    "  float fade = smoothstep(0.0, 0.12, vProgress) * smoothstep(1.0, 0.7, vProgress);",
    "  float alpha = fade * mix(0.3, 1.0, pulse);",
    "  gl_FragColor = vec4(vColor, alpha);",
    "}",
  ].join("\n");

  var group = new THREE.Group();
  scene.add(group);
  var lineObjects = [];

  var NAVY = new THREE.Color(0x0b1730);
  // Primary color for both light and dark mode: lab(79.9844% -59.6292 22.5096).
  // The per-vertex brightness ramp (below) already takes it from this bright
  // value down to a dark tail, so a single entry is enough for the family.
  var PRIMARY_COLOR = new THREE.Color(0x18e299);
  var HEAD_COLORS = [PRIMARY_COLOR];
  var ACCENT_COLORS = [
    new THREE.Color(0xf97316), // orange
    new THREE.Color(0xc084fc), // violet
  ];

  function buildCurvePoints(start, end, bow, segments) {
    var dir = new THREE.Vector3().subVectors(end, start);
    var normal = new THREE.Vector3(-dir.y, dir.x, 0).normalize();
    var c1 = start.clone().lerp(end, 0.33).addScaledVector(normal, bow * 0.7);
    var c2 = start.clone().lerp(end, 0.66).addScaledVector(normal, bow);
    var curve = new THREE.CubicBezierCurve3(start, c1, c2, end);
    return curve.getPoints(segments);
  }

  function buildBundle(corner, count, spread, opacityScale) {
    var segments = 48;
    for (var i = 0; i < count; i++) {
      var t = i / Math.max(count - 1, 1);

      // Tight cluster near the corner, fanning wider toward the far end.
      var start = new THREE.Vector3(
        corner.x + (Math.random() - 0.5) * spread.startJitter,
        corner.y + (Math.random() - 0.5) * spread.startJitter,
        0
      );
      var end = new THREE.Vector3(
        corner.x * -1 * spread.reach + (Math.random() - 0.5) * spread.endJitter,
        corner.y * -1 * spread.reach + (Math.random() - 0.5) * spread.endJitter,
        0
      );
      var bow = spread.bowMin + t * (spread.bowMax - spread.bowMin) + (Math.random() - 0.5) * spread.bowJitter;

      var points = buildCurvePoints(start, end, bow, segments);
      var count3 = points.length;

      var positions = new Float32Array(count3 * 3);
      var normals = new Float32Array(count3 * 3);
      var progresses = new Float32Array(count3);
      var colors = new Float32Array(count3 * 3);
      var seeds = new Float32Array(count3);

      var isAccent = Math.random() < 0.07;
      var baseColor = isAccent
        ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
        : HEAD_COLORS[Math.floor(Math.random() * HEAD_COLORS.length)];
      var lineSeed = Math.random() * 100;

      for (var p = 0; p < count3; p++) {
        var pt = points[p];
        positions[p * 3] = pt.x;
        positions[p * 3 + 1] = pt.y;
        positions[p * 3 + 2] = pt.z;

        var prev = points[Math.max(p - 1, 0)];
        var next = points[Math.min(p + 1, count3 - 1)];
        var tangent = new THREE.Vector3().subVectors(next, prev);
        var nrm = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
        normals[p * 3] = nrm.x;
        normals[p * 3 + 1] = nrm.y;
        normals[p * 3 + 2] = 0;

        var progress = p / (count3 - 1);
        progresses[p] = progress;

        // Same-hue brightness ramp (dim tail -> bright head) so blending two
        // different hues never passes through a muddy in-between color.
        var col = baseColor.clone().multiplyScalar(0.22 + 0.85 * progress);
        col.lerp(NAVY, (1 - progress) * 0.25);
        colors[p * 3] = col.r;
        colors[p * 3 + 1] = col.g;
        colors[p * 3 + 2] = col.b;

        seeds[p] = lineSeed;
      }

      var geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aNormal", new THREE.BufferAttribute(normals, 3));
      geometry.setAttribute("aProgress", new THREE.BufferAttribute(progresses, 1));
      geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

      var material = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        opacity: opacityScale,
      });

      var line = new THREE.Line(geometry, material);
      group.add(line);
      lineObjects.push({ line: line, material: material });
    }
  }

  function clearBundles() {
    for (var i = 0; i < lineObjects.length; i++) {
      group.remove(lineObjects[i].line);
      lineObjects[i].line.geometry.dispose();
      lineObjects[i].material.dispose();
    }
    lineObjects = [];
  }

  function rebuild() {
    clearBundles();

    var vFov = (camera.fov * Math.PI) / 180;
    var viewHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
    var viewWidth = viewHeight * camera.aspect;
    var hx = viewWidth / 2;
    var hy = viewHeight / 2;

    // Primary bundle: fans out from the top-right corner toward bottom-left.
    // This is the banner's key visual, so it's dense and bright enough to
    // read as the focal animation rather than a faint corner accent.
    buildBundle(
      { x: hx * 1.02, y: hy * 1.08 },
      42,
      { startJitter: hy * 0.16, endJitter: viewWidth * 0.6, reach: 0.6, bowMin: hy * 0.3, bowMax: hy * 1.7, bowJitter: hy * 0.4 },
      1
    );

    // Secondary, dimmer mirror bundle in the opposite corner for depth.
    buildBundle(
      { x: -hx * 1.1, y: -hy * 1.2 },
      10,
      { startJitter: hy * 0.12, endJitter: viewWidth * 0.28, reach: 0.3, bowMin: hy * 0.15, bowMax: hy * 0.7, bowJitter: hy * 0.2 },
      0.22
    );
  }

  var resizeTimer;
  function resize() {
    var rect = container.getBoundingClientRect();
    var width = Math.max(rect.width, 1);
    var height = Math.max(rect.height, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(rebuild, 120);
  }

  var resizeObserver;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
  } else {
    window.addEventListener("resize", resize);
  }
  resize();
  rebuild();

  // Pause the render loop when the hero scrolls out of view.
  var isVisible = true;
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver(
      function (entries) {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    ).observe(container);
  }

  var clock = new THREE.Clock();
  var frameId;

  function tick() {
    frameId = requestAnimationFrame(tick);
    if (!isVisible) return;
    var t = clock.getElapsedTime();
    // Slow overall breathing rotation so the whole bundle feels alive, on
    // top of the per-line sway — kept small so the composition stays intact.
    group.rotation.z = Math.sin(t * 0.05) * 0.025;
    for (var i = 0; i < lineObjects.length; i++) {
      lineObjects[i].material.uniforms.uTime.value = t;
    }
    renderer.render(scene, camera);
  }
  tick();

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      cancelAnimationFrame(frameId);
    } else {
      tick();
    }
  });
})();
