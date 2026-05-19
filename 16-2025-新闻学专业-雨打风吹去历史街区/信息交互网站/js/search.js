// js/search.js - 独立的搜索功能

window.addEventListener('load', function() {
    console.log('search.js 已加载 - 开始初始化搜索功能');
    
    // ==================== 搜索功能核心 ====================
    function initSearch() {
        // 获取搜索相关元素
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const filterTags = document.querySelectorAll('.filter-tag');
        const resultCount = document.getElementById('result-count');
        const searchStats = document.getElementById('search-stats');
        const noResults = document.getElementById('no-results');
        
        // 检查元素是否存在
        if (!searchInput) {
            console.error('未找到搜索框 #search-input');
            return;
        }
        
        console.log('搜索框元素:', searchInput ? '找到' : '未找到');
        console.log('搜索按钮:', searchBtn ? '找到' : '未找到');
        
        // ============ 搜索功能函数 ============
        function performSearch() {
            console.log('执行搜索...');
            const searchTerm = searchInput.value.trim();
            console.log('搜索关键词:', searchTerm);
            
            // 获取当前激活的筛选标签
            let activeFilter = 'all';
            filterTags.forEach(tag => {
                if (tag.classList.contains('active')) {
                    activeFilter = tag.getAttribute('data-filter');
                }
            });
            
            // 如果没有输入关键词但有筛选标签，使用筛选标签
            if (!searchTerm && activeFilter !== 'all') {
                searchInput.value = activeFilter;
                console.log('使用筛选标签作为关键词:', activeFilter);
            }
            
            // 开始搜索
            const results = searchNews(searchTerm || activeFilter, activeFilter);
            console.log('搜索结果数量:', results.length);
            
            // 更新统计信息
            if (searchStats && resultCount) {
                if (results.length > 0) {
                    resultCount.textContent = results.length;
                    searchStats.style.display = 'block';
                    if (noResults) noResults.style.display = 'none';
                } else {
                    resultCount.textContent = '0';
                    searchStats.style.display = 'block';
                    if (noResults) noResults.style.display = 'block';
                }
            }
        }
        
        // ============ 新闻搜索函数 ============
        function searchNews(keyword, filter) {
            const allNews = document.querySelectorAll('.news-item');
            let foundCount = 0;
            
            // 如果关键词是"all"或空且筛选是"all"，显示全部
            if ((!keyword || keyword === 'all') && filter === 'all') {
                allNews.forEach(item => {
                    item.style.display = 'block';
                    item.style.backgroundColor = '';
                });
                return Array.from(allNews);
            }
            
            // 执行搜索
            allNews.forEach(item => {
                const title = item.querySelector('.news-title').textContent.toLowerCase();
                const summary = item.querySelector('.news-summary').textContent.toLowerCase();
                const meta = item.querySelector('.news-meta').textContent.toLowerCase();
                
                const hasKeyword = !keyword || keyword === 'all' || 
                    title.includes(keyword.toLowerCase()) || 
                    summary.includes(keyword.toLowerCase());
                
                const hasFilter = filter === 'all' || 
                    title.includes(filter) || 
                    summary.includes(filter);
                
                if (hasKeyword && hasFilter) {
                    item.style.display = 'block';
                    item.style.backgroundColor = 'rgba(193, 124, 84, 0.1)';
                    foundCount++;
                } else {
                    item.style.display = 'none';
                    item.style.backgroundColor = '';
                }
            });
            
            return Array.from(allNews).filter(item => item.style.display === 'block');
        }
        
        // ============ 事件监听器 ============
        // 搜索按钮点击事件
        if (searchBtn) {
            searchBtn.addEventListener('click', function(event) {
                event.preventDefault();
                performSearch();
            });
            console.log('搜索按钮事件已绑定');
        }
        
        // 搜索框回车事件
        if (searchInput) {
            searchInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    performSearch();
                }
            });
            console.log('搜索框回车事件已绑定');
        }
        
        // 筛选标签点击事件
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // 移除所有active类
                filterTags.forEach(t => t.classList.remove('active'));
                // 当前标签添加active
                this.classList.add('active');
                // 执行搜索
                performSearch();
            });
        });
        
        console.log('搜索功能初始化完成');
    }
    
    // 初始化搜索
    initSearch();
    
    // 返回要闻按钮功能
    const backToNewsBtn = document.getElementById('back-to-news');
    if (backToNewsBtn) {
        backToNewsBtn.addEventListener('click', function() {
            // 重置搜索框
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.value = '';
            
            // 重置筛选标签
            const filterTags = document.querySelectorAll('.filter-tag');
            filterTags.forEach(tag => tag.classList.remove('active'));
            if (filterTags[0]) filterTags[0].classList.add('active');
            
            // 显示所有新闻
            const allNews = document.querySelectorAll('.news-item');
            allNews.forEach(item => {
                item.style.display = 'block';
                item.style.backgroundColor = '';
            });
            
            // 更新统计
            const resultCount = document.getElementById('result-count');
            const searchStats = document.getElementById('search-stats');
            const noResults = document.getElementById('no-results');
            
            if (resultCount && searchStats && noResults) {
                resultCount.textContent = allNews.length;
                searchStats.style.display = 'block';
                noResults.style.display = 'none';
            }
        });
    }
});