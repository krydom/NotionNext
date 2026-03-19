// QQ空间图片九宫格布局
function applyImageGrid() {
  const main = document.querySelector('main.notion.light-mode') || document.querySelector('main.notion.dark-mode');
  if (!main) return;

  const children = Array.from(main.children);
  let i = 0;

  while (i < children.length) {
    if (children[i].matches && children[i].matches('hr.notion-hr')) {
      let figs = [];
      let j = i + 1;
      while (j < children.length && children[j].matches && children[j].matches('figure.notion-asset-wrapper-image')) {
        figs.push(children[j]);
        j++;
      }
      if (figs.length > 1) {
        const grid = document.createElement('div');
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
}

// 页面加载完成 + 路由切换时都执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() { setTimeout(applyImageGrid, 500); });
} else {
  setTimeout(applyImageGrid, 500);
}

// 监听 Next.js 路由变化（SPA 切换页面时重新执行）
var _pushState = history.pushState;
history.pushState = function() {
  _pushState.apply(this, arguments);
  setTimeout(applyImageGrid, 800);
};
window.addEventListener('popstate', function() {
  setTimeout(applyImageGrid, 800);
});
