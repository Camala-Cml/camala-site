// Camala — menu mobile (abre/fecha a navegação no topo em telas pequenas)
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    document.body.classList.toggle('nav-open');
  });
});
