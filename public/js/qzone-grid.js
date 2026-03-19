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
            if (inner) {
              inner.removeAttribute('style');
              inner.className += ' qzone-grid-inner';
            }
            var img = f.querySelector('img');
            if (img) {
              // 保存原图地址，放大时用
              img.dataset.originalSrc = img.src;
              img.removeAttribute('style');
              img.className += ' qzone-grid-img';
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

// 监听 medium-zoom 放大/缩小，切换样式
function watchZoom() {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.type !== 'attributes' || m.attributeName !== 'class') return;
      var img = m.target;
      if (!img.classList.contains('qzone-grid-img')) return;

      var inner = img.closest('.qzone-grid-inner');

      if (img.classList.contains('medium-zoom-image--opened')) {
        // 放大中：临时移除九宫格裁剪
        img.classList.add('qzone-zoomed');
        if (inner) inner.classList.add('qzone-inner-zoomed');
      } else {
        // 关闭：恢复九宫格
        img.classList.remove('qzone-zoomed');
        if (inner) inner.classList.remove('qzone-inner-zoomed');
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
    subtree: true
  });
}

setInterval(applyImageGrid, 1000);
watchZoom();
