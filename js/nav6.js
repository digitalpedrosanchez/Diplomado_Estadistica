/* Versión 6: «Continuar donde te quedaste» (lee el avance guardado por m5.js) */
(function () {
  var ORD = window.MOD_ORD || [["c01", "modulo5.html#v0", "la cápsula 1 · Bienvenida"], ["c02", "teoria.html#t1", "la cápsula 2 · T1"], ["c03", "teoria.html#t2", "la cápsula 3 · T2"], ["c04", "teoria.html#t3", "la cápsula 4 · T3"], ["c05", "teoria.html#t4", "la cápsula 5 · T4"], ["c06", "teoria.html#t5", "la cápsula 6 · T5"], ["c07", "teoria.html#t6", "la cápsula 7 · T6"], ["c08", "teoria.html#t7", "la cápsula 8 · T7"], ["c09", "teoria.html#t8", "la cápsula 9 · T8"], ["c10", "teoria.html#t9", "la cápsula 10 · T9"], ["c11", "teoria.html#t10", "la cápsula 11 · T10"], ["c12", "teoria.html#t11", "la cápsula 12 · T11"], ["c13", "teoria.html#t12", "la cápsula 13 · T12"], ["c14", "teoria.html#t13", "la cápsula 14 · T13"], ["eP1", "ejercicio-p1.html", "el ejercicio P1"], ["eP2", "ejercicio-p2.html", "el ejercicio P2"], ["eP3", "ejercicio-p3.html", "el ejercicio P3"], ["eP4", "ejercicio-p4.html", "el ejercicio P4"], ["eP5", "ejercicio-p5.html", "el ejercicio P5"], ["eP6", "ejercicio-p6.html", "el ejercicio P6"], ["eP7", "ejercicio-p7.html", "el ejercicio P7"], ["eP8", "ejercicio-p8.html", "el ejercicio P8"], ["c23", "investigacion.html#a1", "la cápsula 23 · Investigación real"], ["entrega", "entrega.html", "la entrega"]];
  function hecho(k) { try { return localStorage.getItem("m5:hecho:" + k) === "true"; } catch (e) { return false; } }
  function pintar() {
    var sig = null, alguno = false;
    for (var i = 0; i < ORD.length; i++) { if (hecho(ORD[i][0])) alguno = true; else if (!sig) sig = ORD[i]; }
    document.querySelectorAll("[data-continuar]").forEach(function (a) {
      if (!sig) { a.href = window.MOD_FIN || "entrega.html"; a.textContent = "Módulo completo: revisa tu entrega"; return; }
      a.href = sig[1];
      a.textContent = (alguno ? "Continuar con " : "Empezar con ") + sig[2] + (a.classList.contains("btn") ? " →" : "");
    });
  }
  pintar(); document.addEventListener("change", pintar); document.addEventListener("click", function () { setTimeout(pintar, 50); });
})();

/* Versión 7: el selector de módulos se cierra al hacer clic fuera o con Esc */
(function () {
  var s = document.querySelector("details.n-sel"); if (!s) return;
  document.addEventListener("click", function (e) { if (s.open && !s.contains(e.target)) s.open = false; });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && s.open) { s.open = false; s.querySelector("summary").focus(); } });
})();
