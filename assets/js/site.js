/* Small progressive enhancements: gallery filters and an image lightbox.
   The page is fully readable without this file. */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  // Gallery filters
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var target = document.getElementById(group.getAttribute("data-filter-group"));
    if (!target) return;
    group.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      group.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      var f = btn.getAttribute("data-filter");
      target.querySelectorAll(".plate").forEach(function (p) {
        var tags = (p.getAttribute("data-tags") || "").split(" ");
        p.hidden = !(f === "all" || tags.indexOf(f) !== -1);
      });
    });
  });

  // Lightbox (native <dialog>)
  var dlg = document.getElementById("lightbox");
  if (!dlg || typeof dlg.showModal !== "function") return;
  var img = dlg.querySelector("img");
  var cap = dlg.querySelector(".cap-text");
  var lastFocus = null;

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a.zoom");
    if (!a) return;
    e.preventDefault();
    lastFocus = a;
    var thumb = a.querySelector("img");
    img.src = a.getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    cap.textContent = a.getAttribute("data-caption") || "";
    dlg.showModal();
  });
  dlg.addEventListener("click", function (e) {
    // click on the backdrop (the dialog element itself) or the close button
    if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();
  });
  dlg.addEventListener("close", function () {
    img.removeAttribute("src");
    if (lastFocus) lastFocus.focus();
  });
})();
