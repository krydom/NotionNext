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

// 监听放大/缩小，直接改 inline style
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(m) {
    if (m.type !== 'attributes' || m.attributeName !== 'class') return;
    var img = m.target;
    if (!img.dataset || img.dataset.qzoneGrid !== 'true') return;
    var inner = img.closest('figure > div');

    if (img.classList.contains('medium-zoom-image--opened')) {
      // 放大：恢复原图
      img.style.cssText = 'position:relative!important;width:auto!important;height:auto!important;max-height:90vh!important;max-width:90vw!important;object-fit:contain!important;border-radius:4px!important;';
      if (inner) inner.style.cssText = 'display:block!important;width:auto!important;height:auto!important;padding-bottom:0!important;';
    } else if (!img.classList.contains('medium-zoom-image--opened')) {
      // 关闭：恢复九宫格
      img.style.cssText = 'position:absolute!important;top:0!important;left:0!important;width:100%!important;height:100%!important;object-fit:cover!important;border-radius:4px!important;';
      if (inner) inner.style.cssText = 'position:relative!important;display:block!important;width:100%!important;padding-bottom:100%!important;height:0!important;';
    }
  });
});
observer.observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });

setInterval(applyImageGrid, 1000);
