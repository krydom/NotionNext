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
            if (img) {
              img.style.cssText = 'position:absolute!important;top:0!important;left:0!important;width:100%!important;height:100%!important;object-fit:cover!important;border-radius:4px!important;';
              img.classList.add('qzone-grid-img');
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

// 监听 medium-zoom：放大时恢复原图比例，关闭时恢复正方形裁剪
function watchZoom() {
  document.addEventListener('click', function(e) {
    var img = e.target;
    if (!img.classList || !img.classList.contains('qzone-grid-img')) return;

    // 保存九宫格样式
    var gridStyle = img.style.cssText;
    var parent = img.closest('figure');
    var inner = parent ? parent.querySelector(':scope > div') : null;
    var innerStyle = inner ? inner.style.cssText : '';
    var parentStyle = parent ? parent.style.cssText : '';

    // 放大时：恢复自然尺寸
    requestAnimationFrame(function() {
      img.style.cssText = 'width:auto!important;height:auto!important;max-width:90vw!important;max-height:90vh!important;object-fit:contain!important;position:relative!important;border-radius:4px!important;';
      if (inner) inner.style.cssText = 'display:flex!important;justify-content:center!important;align-items:center!important;width:auto!important;height:auto!important;padding-bottom:0!important;position:relative!important;';
    });

    // 关闭时：恢复九宫格样式
    function restore() {
      img.style.cssText = gridStyle;
      if (inner) inner.style.cssText = innerStyle;
      document.removeEventListener('click', onClose);
      document.removeEventListener('keydown', onEsc);
    }

    function onClose(ev) {
      if (ev.target === img) return;
      setTimeout(restore, 300);
    }
    function onEsc(ev) {
      if (ev.key === 'Escape') setTimeout(restore, 300);
    }

    setTimeout(function() {
      document.addEventListener('click', onClose);
      document.addEventListener('keydown', onEsc);
    }, 100);
  }, true);
}

setInterval(applyImageGrid, 1000);
watchZoom();
