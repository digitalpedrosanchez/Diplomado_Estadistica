/* Versión 8: el paso actual queda a la vista en el menú de pasos (celular) y avance de las lecciones del módulo 2 */
(function () {
  var ol = document.querySelector("nav.ruta ol");
  var a = ol && ol.querySelector('a[aria-current="page"], a.actual-paso');
  if (ol && a && ol.scrollWidth > ol.clientWidth) { ol.scrollLeft = a.offsetLeft - ol.offsetLeft - 12; }
  function hecho(k) { try { return localStorage.getItem("m5:hecho:" + k) === "true"; } catch (e) { return false; } }
  function pintar() {
    document.querySelectorAll("[data-lec]").forEach(function (el) {
      var ks = el.getAttribute("data-lec").split(","), n = ks.filter(hecho).length;
      var o = el.querySelector("[data-ok]"); if (!o) return;
      o.textContent = n === ks.length ? "✓ Lección completa" : (n ? n + " de " + ks.length + " actividades" : "");
    });
  }
  pintar(); document.addEventListener("change", pintar);
})();
