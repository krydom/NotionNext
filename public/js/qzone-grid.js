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
          figs.forEach(function(f) {
            grid.appendChild(f);
            f.className += ' qzone-grid-figure';
            var inner = f.querySelector(':scope > div');
            if (inner) inner.className += ' qzone-grid-inner';
            var img = f.querySelector('img');
            if (img) img.className += ' qzone-grid-img';
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
