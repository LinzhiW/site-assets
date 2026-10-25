/* Homepage 3D objects for linzhigettingit.com.
 *
 * Every <div class="lz-model"> becomes a Google <model-viewer>. Dragging turns
 * the object; a click that barely moves follows data-href. This replaces the
 * TinyGLB iframes and their hover "GO!" buttons: inside an iframe the page
 * could not tell a drag from a click, here it can.
 *
 * <div class="lz-model" style="height:150px"
 *      data-src="https://.../sunglasses.glb"
 *      data-href="https://www.linzhigettingit.com/projects/..."
 *      data-orbit="-90deg 60deg 1.3m"   optional, camera start
 *      data-fov="30deg"                 optional
 *      data-animate></div>              optional, plays the model's animation
 */
(function () {
  var VIEWER = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
  var CLICK_SLOP_PX = 6;   // a press that moves less than this is a click, not a drag
  var CLICK_MAX_MS = 600;  // and a long press is a drag that never got going

  function loadViewer() {
    if (window.customElements && customElements.get("model-viewer")) return;
    if (document.querySelector('script[src="' + VIEWER + '"]')) return;
    var s = document.createElement("script");
    s.type = "module";
    s.src = VIEWER;
    document.head.appendChild(s);
  }

  function clickThrough(mv, href) {
    var down = null;
    mv.style.cursor = "pointer";
    mv.addEventListener("pointerdown", function (e) {
      down = { x: e.clientX, y: e.clientY, t: Date.now() };
    }, true);
    mv.addEventListener("pointerup", function (e) {
      if (!down) return;
      var moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      var quick = Date.now() - down.t < CLICK_MAX_MS;
      down = null;
      if (moved < CLICK_SLOP_PX && quick) window.location.href = href;
    }, true);
    mv.addEventListener("pointercancel", function () { down = null; }, true);
  }

  function build(el) {
    if (el.dataset.lzReady) return;
    el.dataset.lzReady = "1";
    var mv = document.createElement("model-viewer");
    mv.setAttribute("src", el.dataset.src);
    mv.setAttribute("camera-controls", "");
    mv.setAttribute("disable-zoom", "");
    mv.setAttribute("disable-pan", "");
    mv.setAttribute("interaction-prompt", "none");
    mv.setAttribute("tone-mapping", "neutral");
    mv.setAttribute("shadow-intensity", "1");
    mv.setAttribute("interpolation-decay", "200");
    if (el.dataset.orbit) mv.setAttribute("camera-orbit", el.dataset.orbit);
    if (el.dataset.fov) mv.setAttribute("field-of-view", el.dataset.fov);
    if ("animate" in el.dataset) mv.setAttribute("autoplay", "");
    mv.setAttribute("alt", el.getAttribute("aria-label") || "");
    mv.style.cssText = "width:100%;height:100%;background:transparent;--poster-color:transparent;--progress-bar-height:0;touch-action:pan-y;";
    if (el.dataset.href) clickThrough(mv, el.dataset.href);
    el.appendChild(mv);
  }

  function init() {
    var els = document.querySelectorAll(".lz-model");
    if (!els.length) return;
    loadViewer();
    els.forEach(build);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
