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
          grid.className = 'qzone-image-grid';
          grid.style.cssText = 'display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:4px!important;width:100%!important;margin:8px 0!important;';
          figs.forEach(function(f) {
            grid.appendChild(f);
            f.style.cssText = 'width:100%!important;margin:0!important;overflow:hidden!important;';
            var inner = f.querySelector(':scope > div');
            if (inner) inner.style.cssText = 'position:relative!important;display:block!important;width:100%!important;padding-bottom:100%!important;height:0!important;';
            var img = f.querySelector('img');
            if (img) img.style.cssText = 'position:absolute!important;top:0!important;left:0!important;width:100%!important;height:100%!important;object-fit:cover!important;border-radius:4px!important;';
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

setInterval(applyImageGrid, 1000);
