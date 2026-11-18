/* Módulo 5 · avance en el navegador, tema, tamaño de letra y comprobador */
(function () {
  "use strict";
  var K = "m5:";
  function get(k, d) { try { var v = localStorage.getItem(K + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(K + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  var root = document.documentElement;
  var tema = get("tema", null); if (tema) root.setAttribute("data-theme", tema);
  var escala = get("escala", 1); root.style.setProperty("--escala", escala);

  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-acc]"); if (!b) return;
    var a = b.getAttribute("data-acc");
    if (a === "mas" || a === "menos") { escala = Math.min(1.5, Math.max(0.85, escala + (a === "mas" ? 0.1 : -0.1))); escala = Math.round(escala * 100) / 100; root.style.setProperty("--escala", escala); set("escala", escala); }
    if (a === "tema") { var t = root.getAttribute("data-theme") === "dark" ? "light" : "dark"; root.setAttribute("data-theme", t); set("tema", t); }
    if (a === "sub") { var u = document.getElementById(b.getAttribute("aria-controls")); if (u) { u.hidden = !u.hidden; b.setAttribute("aria-expanded", String(!u.hidden)); } }
    if (a === "menu") { var m = document.getElementById("menu-lateral"); if (m) { var ab = m.classList.toggle("abierto"); b.setAttribute("aria-expanded", String(ab)); } }
    if (a === "pista") { var p = document.getElementById(b.getAttribute("aria-controls")); if (p) { p.hidden = !p.hidden; b.setAttribute("aria-expanded", String(!p.hidden)); } }
    if (a === "reiniciar") { if (window.confirm("¿Borrar el avance guardado en este navegador?")) { try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf(K) === 0) localStorage.removeItem(k); }); } catch (e) {} location.reload(); } }
  });

  /* Videos aún sin publicar: se muestra un aviso en lugar del reproductor */
  document.querySelectorAll('.video iframe').forEach(function (f) {
    var m = (f.getAttribute("src") || "").match(/VIDEO_ID_(\d+)/);
    if (m) { var d = document.createElement("div"); d.className = "pend"; d.textContent = "Video en preparación (cápsula " + Number(m[1]) + ")"; f.parentNode.replaceChild(d, f); }
  });
  /* Casillas «Ya lo vi» / «Ya lo hice» */
  var checks = document.querySelectorAll("input[data-avance]");
  checks.forEach(function (c) {
    var id = c.getAttribute("data-avance"); c.checked = !!get("hecho:" + id, false);
    c.addEventListener("change", function () { set("hecho:" + id, c.checked); pintar(); });
  });
  function pintar() {
    var total = window.M5_TOTAL || [];
    var n = total.filter(function (id) { return get("hecho:" + id, false); }).length;
    document.querySelectorAll("[data-global]").forEach(function (el) {
      var pct = total.length ? Math.round(100 * n / total.length) : 0;
      var bar = el.querySelector("i"); if (bar) bar.style.width = pct + "%";
      var t = el.querySelector("span"); if (t) t.textContent = n + " de " + total.length + " actividades";
    });
    document.querySelectorAll("nav a[data-paso]").forEach(function (a) {
      var ids = (a.getAttribute("data-paso") || "").split(",").filter(Boolean);
      if (ids.length && ids.every(function (id) { return get("hecho:" + id, false); })) a.classList.add("hecho");
    });
  }
  pintar();
  /* En celular, el menú se cierra al elegir un apartado */
  document.querySelectorAll("nav.lateral a").forEach(function (a) { a.addEventListener("click", function () { var m = document.getElementById("menu-lateral"); if (m && m.classList.contains("abierto")) { m.classList.remove("abierto"); var b = document.querySelector(".menu-btn"); if (b) b.setAttribute("aria-expanded", "false"); } }); });

  /* Comprobador: acepta ±1 en el último decimal; si el valor esperado es 0.000, acepta cualquier valor menor que 0.0005 */
  function decs(s) { var i = s.indexOf("."); return i < 0 ? 0 : s.length - i - 1; }
  function revisa(inp) {
    var esperado = inp.getAttribute("data-esperado");
    var txt = (inp.value || "").trim().replace(",", ".").replace(/[−–]/g, "-").replace(/\s|%/g, "");
    var out = document.getElementById(inp.id + "-res");
    if (!txt) { out.textContent = ""; out.className = "res"; return; }
    var x = Number(txt), v = Number(esperado);
    if (!isFinite(x)) { out.textContent = "Escribe solo el número, con punto decimal."; out.className = "res no"; return; }
    var ok;
    if (v === 0) ok = Math.abs(x) < 0.0005;
    else { var u = Math.pow(10, -decs(esperado)); ok = Math.abs(x - v) <= u + 1e-12; }
    out.textContent = ok ? "✓ Correcto" : "✗ Revisa este valor";
    out.className = "res " + (ok ? "ok" : "no");
    if (ok) set("valor:" + inp.id, true);
    var pt = document.getElementById(inp.id + "-p"); if (pt && !ok) { pt.hidden = false; }
    var form = inp.closest("[data-ejercicio]");
    if (form) {
      var todos = Array.prototype.every.call(form.querySelectorAll("input[data-esperado]"), function (i) { return get("valor:" + i.id, false); });
      if (todos) { set("hecho:" + form.getAttribute("data-ejercicio"), true); var c = document.querySelector('input[data-avance="' + form.getAttribute("data-ejercicio") + '"]'); if (c) c.checked = true; pintar(); }
    }
  }
  document.querySelectorAll("input[data-esperado]").forEach(function (inp) {
    inp.addEventListener("change", function () { revisa(inp); });
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); revisa(inp); } });
  });
  document.querySelectorAll("[data-revisar]").forEach(function (b) {
    b.addEventListener("click", function () { b.closest("[data-ejercicio]").querySelectorAll("input[data-esperado]").forEach(revisa); });
  });
})();
