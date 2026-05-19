// 通用导航下拉菜单处理（所有页面）
document.addEventListener('DOMContentLoaded', () => {
    // 处理下拉菜单点击事件
    document.querySelectorAll('.dropdown-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = link.dataset.tab;
            if (!targetTab) return;
            
            // 如果是互动页，需要特殊处理
            if (window.location.pathname.includes('互动页.html')) {
                // 检查是否有switchTab函数（互动页特有）
                if (typeof switchTab === 'function') {
                    switchTab(targetTab, false);
                    history.replaceState(null, '', `#${targetTab}`);
                } else {
                    // 如果没有switchTab函数，直接跳转
                    window.location.href = `./互动页.html#${targetTab}`;
                }
            } else {
                // 如果是其他页面，跳转到互动页并切换tab
                window.location.href = `./互动页.html#${targetTab}`;
            }
        });
    });
});

