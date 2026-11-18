/* Versión 7: avance de los módulos de muestra en las tarjetas */
(function () {
  function hecho(k) { try { return localStorage.getItem("m5:hecho:" + k) === "true"; } catch (e) { return false; } }
  document.querySelectorAll("[data-claves]").forEach(function (el) {
    var ks = el.getAttribute("data-claves").split(","), n = ks.filter(hecho).length;
    var i = el.querySelector("i"); if (i) i.style.width = Math.round(100 * n / ks.length) + "%";
    var s = el.querySelector("span"); if (s) s.textContent = n + " de " + ks.length + " actividades";
  });
})();
