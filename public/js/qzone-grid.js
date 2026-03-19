// QQ空间图片九宫格布局
function applyImageGrid() {
  document.querySelectorAll('main.notion').forEach(function(main) {
    if (main.dataset.gridApplied) return;
    main.dataset.gridApplied = 'true';

    var children = Array.from(main.children);
    var i = 0;
    while (i < children.length) {
      if (children[i].matches && children[i].matches('hr.notion-hr')) {
        var figs = [];
        var j = i + 1;
        while (j < children.length && children[j].matches && children[j].matches('figure.notion-asset-wrapper-image')) {
          figs.push(children[j]);
          j++;
        }
        if (figs.length > 0) {
          var grid = document.createElement('div');
          grid.style.cssText = 'display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:4px!important;width:100%!important;margin:8px 0!important;';
          figs.forEach(function(f) {
            grid.appendChild(f);
            f.style.cssText = 'width:100%!important;margin:0!important;overflow:hidden!important;';
            var inner = f.querySelector(':scope > div');
            if (inner) inner.style.cssText = 'position:relative!important;display:block!important;width:100%!important;padding-bottom:100%!important;height:0!important;';
            var img = f.querySelector('img');
            if (img) {
              img.style.cssText = 'position:absolute!important;top:0!important;left:0!important;width:100%!important;height:100%!important;object-fit:cover!important;border-radius:4px!important;';
              img.dataset.qzoneGrid = 'true';
              img.dataset.qzoneState = 'grid';
            }
          });
          children[i].after(grid);
        }
        i = j;
      } else {
        i++;
      }
    }
  });
}

// 用 click 监听代替 MutationObserver，避免死循环
document.addEventListener('click', function(e) {
  var img = e.target;
  if (!img.dataset || img.dataset.qzoneGrid !== 'true') return;
  if (img.dataset.qzoneState !== 'grid') return;

  var inner = img.parentElement;

  // 点击：即将放大，切换到全图样式
  img.dataset.qzoneState = 'zoomed';
  img.style.cssText = 'width:auto!important;height:auto!important;max-height:90vh!important;max-width:90vw!important;object-fit:contain!important;border-radius:4px!important;';
  if (inner) inner.style.cssText = 'display:block!important;width:auto!important;height:auto!important;padding-bottom:0!important;';

  // 监听关闭（点击任意位置或按 Esc）
  function restore() {
    img.dataset.qzoneState = 'grid';
    img.style.cssText = 'position:absolute!important;top:0!important;left:0!important;width:100%!important;height:100%!important;object-fit:cover!important;border-radius:4px!important;';
    if (inner) inner.style.cssText = 'position:relative!important;display:block!important;width:100%!important;padding-bottom:100%!important;height:0!important;';
    document.removeEventListener('click', onClose);
    document.removeEventListener('keydown', onEsc);
  }
  function onClose() {
    setTimeout(restore, 350);
  }
  function onEsc(ev) {
    if (ev.key === 'Escape') setTimeout(restore, 350);
  }
  setTimeout(function() {
    document.addEventListener('click', onClose, { once: true });
    document.addEventListener('keydown', onEsc, { once: true });
  }, 200);
}, true);

setInterval(applyImageGrid, 1000);
