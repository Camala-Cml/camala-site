// Camala — menu mobile (abre/fecha a navegação no topo em telas pequenas)
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    document.body.classList.toggle('nav-open');
  });
});

// Camala — capas de vídeo personalizadas (evita a marca do YouTube na miniatura)
// + player em tela grande (modal). Ao clicar, abre o vídeo centralizado e ampliado
// por cima da página; o player só carrega o YouTube nesse momento.
document.addEventListener('DOMContentLoaded', function () {
  var facades = document.querySelectorAll('.yt-facade[data-yt-id]');
  if (!facades.length) return;

  // monta o modal uma única vez e anexa ao final da página
  var modal = document.createElement('div');
  modal.className = 'yt-modal';
  modal.innerHTML =
    '<div class="yt-modal-inner">' +
      '<button class="yt-modal-close" aria-label="Fechar vídeo">&#10005;</button>' +
    '</div>';
  document.body.appendChild(modal);

  var inner = modal.querySelector('.yt-modal-inner');
  var closeBtn = modal.querySelector('.yt-modal-close');

  function openModal(id, title) {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
    iframe.title = title;
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    inner.appendChild(iframe);
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    var iframe = inner.querySelector('iframe');
    if (iframe) iframe.remove(); // remove o iframe pra parar a reprodução
  }

  facades.forEach(function (facade) {
    facade.addEventListener('click', function () {
      openModal(facade.getAttribute('data-yt-id'), facade.getAttribute('data-yt-title') || '');
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal(); // clicou fora do player
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
});
