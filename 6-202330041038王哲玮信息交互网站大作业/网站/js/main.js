// 计数器变量
let clickCount = 0;

// Tab切换函数 - 改用JS绑定
function switchTab(selected, id) {
    // 重置所有Tab样式
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 高亮当前Tab
    selected.classList.add('active');
    
    // 隐藏所有内容区
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 显示对应内容区
    const targetTab = document.getElementById('tab' + id);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

// 鼠标悬停高亮
function highlightTitle(title) {
    title.classList.add('highlighted');
}

function unhighlightTitle(title) {
    title.classList.remove('highlighted');
}

// 回到顶部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 显示/隐藏回到顶部按钮
function toggleBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
}

// 表单提交处理
function handleFormSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email && email.includes('@')) {
        alert(`感谢订阅！确认邮件已发送至：${email}`);
        emailInput.value = '';
    } else {
        alert('请输入有效的邮箱地址');
    }
}

// 点击新闻标题处理
function handleNewsClick(e) {
    let titleElement;
    let item = e.currentTarget;
    
    // 根据不同元素类型获取标题
    if (item.classList.contains('news-item')) {
        titleElement = item.querySelector('.news-title');
    } else if (item.classList.contains('news-card')) {
        titleElement = item.querySelector('h3');
    } else if (item.classList.contains('hot-item')) {
        titleElement = item.querySelector('.hot-title');
    }
    
    if (titleElement) {
        const title = titleElement.textContent;
        
        // 显示提示信息
        alert(`每一个标签页的第一个新闻皆可跳转，其他详细内容正在编辑中，敬请期待！`);
        
        // 更新计数器
        clickCount++;
        const counterElement = document.getElementById('counter');
        if (counterElement) {
            counterElement.textContent = `今日标题被点击：${clickCount} 次`;
        }
        
        const url = item.getAttribute('data-url');
        if (url) {
    // 检查是否是有效的链接
    if (url.startsWith('http') || url.endsWith('.html')) {
        console.log(`跳转到: ${url}`);
        window.location.href = url;
    } else {
        console.log(`开发中的链接: ${url}`);
        alert(`"${title}" 详细内容正在编辑中，敬请期待！`);
    }
}
    }
}

// 返回要闻按钮事件
function handleBackToNews() {
    // 切换到要闻Tab
    const newsTab = document.querySelector('.tab-item');
    if (newsTab) {
        switchTab(newsTab, 1);
    }
    
    // 滚动到顶部
    scrollToTop();
}

// 为Tab项绑定事件
function bindTabEvents() {
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach((tab, index) => {
        tab.addEventListener('mouseover', function() {
            switchTab(this, index + 1);
        });
    });
}

// 为新闻项绑定事件
function bindNewsEvents() {
    const newsItems = document.querySelectorAll('.news-item, .news-card, .hot-item');
    newsItems.forEach(item => {
        item.addEventListener('click', handleNewsClick);
    });
}

// 为标题绑定鼠标事件
function bindTitleEvents() {
    const newsTitles = document.querySelectorAll('.news-title, .hot-title');
    newsTitles.forEach(title => {
        title.addEventListener('mouseover', () => highlightTitle(title));
        title.addEventListener('mouseout', () => unhighlightTitle(title));
    });
}

// 初始化页面
function initializePage() {
    console.log('初始化页面...');
    
    // 绑定事件
    bindTabEvents();
    bindNewsEvents();
    bindTitleEvents();
    
    // 绑定返回要闻按钮
    const backToNewsBtn = document.getElementById('backToNewsBtn');
    if (backToNewsBtn) {
        backToNewsBtn.addEventListener('click', handleBackToNews);
    }
    
    // 绑定订阅表单
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', handleFormSubmit);
    }
    
    // 绑定回到顶部按钮
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // 绑定滚动事件
    window.addEventListener('scroll', toggleBackToTop);
    
    // 初始化显示状态
    toggleBackToTop();
}

// 当DOM完全加载后执行
document.addEventListener('DOMContentLoaded', initializePage);

// 确保函数在全局作用域中可用（用于HTML行内事件）
window.switchTab = switchTab;
window.scrollToTop = scrollToTop;
// 搜索筛选功能
let currentSearchTerm = '';

// 主筛选函数
function filterNews() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const searchCount = document.getElementById('searchCount');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    currentSearchTerm = searchTerm;
    
    // 显示/隐藏清除按钮
    clearBtn.style.display = searchTerm.length > 0 ? 'flex' : 'none';
    
    if (searchTerm.length === 0) {
        // 清除搜索，显示所有内容
        resetSearch();
        searchCount.classList.remove('show');
        return;
    }
    
    // 初始化计数
    let totalResults = 0;
    
    // 1. 筛选Tab内容中的新闻列表
    const newsLists = document.querySelectorAll('.news-list');
    newsLists.forEach(list => {
        const items = list.querySelectorAll('.news-item');
        let listResults = 0;
        
        items.forEach(item => {
            const title = item.querySelector('.news-title').textContent.toLowerCase();
            const summary = item.querySelector('.news-summary').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || summary.includes(searchTerm)) {
                item.classList.remove('hidden');
                listResults++;
                highlightText(item, searchTerm);
            } else {
                item.classList.add('hidden');
            }
        });
        
        // 检查该列表是否有结果
        const parentContent = list.closest('.tab-content');
        if (parentContent) {
            const hasResults = listResults > 0;
            
            // 如果没有结果，在列表后添加提示
            let noResultsMsg = parentContent.querySelector('.no-results');
            if (!hasResults && !noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results';
                noResultsMsg.innerHTML = `
                    <h3>未找到相关新闻</h3>
                    <p>尝试使用其他关键词搜索</p>
                `;
                list.parentNode.insertBefore(noResultsMsg, list.nextSibling);
            } else if (hasResults && noResultsMsg) {
                noResultsMsg.remove();
            }
        }
        
        totalResults += listResults;
    });
    
    // 2. 筛选新闻卡片
    const newsCards = document.querySelectorAll('.news-card');
    let cardResults = 0;
    
    newsCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const summary = card.querySelector('.summary').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        const isTagMatch = tags.some(tag => tag.includes(searchTerm));
        
        if (title.includes(searchTerm) || summary.includes(searchTerm) || isTagMatch) {
            card.classList.remove('hidden');
            cardResults++;
            highlightText(card, searchTerm);
        } else {
            card.classList.add('hidden');
        }
    });
    
    // 3. 筛选热榜
    const hotItems = document.querySelectorAll('.hot-item');
    hotItems.forEach(item => {
        const title = item.querySelector('.hot-title').textContent.toLowerCase();
        
        if (title.includes(searchTerm)) {
            item.classList.remove('hidden');
            highlightText(item, searchTerm);
        } else {
            item.classList.add('hidden');
        }
    });
    
    // 4. 更新搜索结果计数
    totalResults += cardResults;
    const countSpan = searchCount.querySelector('span');
    countSpan.textContent = totalResults;
    searchCount.classList.add('show');
    
    // 5. 如果没有结果，显示全局无结果提示
    const mainSection = document.querySelector('#main');
    let globalNoResults = document.querySelector('#globalNoResults');
    
    if (totalResults === 0) {
        if (!globalNoResults) {
            globalNoResults = document.createElement('div');
            globalNoResults.id = 'globalNoResults';
            globalNoResults.className = 'no-results';
            globalNoResults.innerHTML = `
                <h3>未找到与"${searchTerm}"相关的新闻</h3>
                <p>建议：</p>
                <ul style="text-align: left; max-width: 400px; margin: 15px auto;">
                    <li>检查输入的关键词是否正确</li>
                    <li>尝试使用更短或更通用的关键词</li>
                    <li>搜索其他相关话题</li>
                </ul>
            `;
            const firstCard = mainSection.querySelector('.news-card');
            mainSection.insertBefore(globalNoResults, firstCard);
        }
    } else if (globalNoResults) {
        globalNoResults.remove();
    }
    
    // 6. 记录搜索历史（可选）
    recordSearchHistory(searchTerm);
}

// 清除搜索
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchInput.focus();
    filterNews();
}

// 重置搜索状态
function resetSearch() {
    // 显示所有元素
    document.querySelectorAll('.news-item, .news-card, .hot-item').forEach(el => {
        el.classList.remove('hidden');
    });
    
    // 移除高亮
    document.querySelectorAll('.search-highlight').forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
    
    // 移除无结果提示
    document.querySelectorAll('.no-results').forEach(el => el.remove());
}

// 高亮文本中的关键词
function highlightText(element, searchTerm) {
    // 首先移除之前的高亮
    const existingHighlights = element.querySelectorAll('.search-highlight');
    existingHighlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
    
    // 如果搜索词为空，不添加高亮
    if (!searchTerm || searchTerm.length < 2) return;
    
    // 高亮文本节点中的关键词
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const nodes = [];
    let node;
    while (node = walker.nextNode()) {
        nodes.push(node);
    }
    
    nodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
        
        if (regex.test(text)) {
            const span = document.createElement('span');
            span.innerHTML = text.replace(regex, '<span class="search-highlight">$1</span>');
            textNode.parentNode.replaceChild(span, textNode);
        }
    });
}

// 转义正则表达式特殊字符
function escapeRegExp(string) {
    return string.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
}

// 处理搜索框键盘事件
function handleSearchKeydown(event) {
    if (event.key === 'Escape') {
        clearSearch();
    } else if (event.key === 'Enter') {
        event.preventDefault();
        // 如果有结果，跳转到第一个结果
        const firstResult = document.querySelector('.news-item:not(.hidden), .news-card:not(.hidden)');
        if (firstResult) {
            firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstResult.style.backgroundColor = '#f0f4ff';
            setTimeout(() => {
                firstResult.style.backgroundColor = '';
            }, 1500);
        }
    }
}

// 记录搜索历史（本地存储）
function recordSearchHistory(term) {
    if (term.length < 2) return;
    
    try {
        let history = localStorage.getItem('newsSearchHistory');
        history = history ? JSON.parse(history) : [];
        
        // 移除重复项
        history = history.filter(item => item !== term);
        
        // 添加到开头
        history.unshift(term);
        
        // 限制历史记录数量
        if (history.length > 10) {
            history = history.slice(0, 10);
        }
        
        localStorage.setItem('newsSearchHistory', JSON.stringify(history));
    } catch (e) {
        console.log('无法保存搜索历史:', e);
    }
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    // 添加防抖，避免频繁触发搜索
    let debounceTimer;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterNews();
        }, 300);
    });
    
    // 点击页面其他地方关闭搜索计数显示
    document.addEventListener('click', function(event) {
        const searchCount = document.getElementById('searchCount');
        if (!searchInput.contains(event.target) && searchInput.value.trim() === '') {
            searchCount.classList.remove('show');
        }
    });
    
    // 可选：加载搜索历史建议
    loadSearchHistory();
}

// 加载搜索历史建议（可选功能）
function loadSearchHistory() {
    try {
        const history = JSON.parse(localStorage.getItem('newsSearchHistory') || '[]');
        if (history.length > 0) {
            // 可以在这里实现搜索历史下拉建议
            console.log('搜索历史:', history);
        }
    } catch (e) {
        console.log('无法加载搜索历史:', e);
    }
}

// 在页面加载完成后初始化搜索功能
document.addEventListener('DOMContentLoaded', function() {
    // 其他已有的初始化代码...
    
    // 初始化搜索功能
    initSearch();
    
    // 更新窗口加载事件处理
    window.onload = function() {
        // 原有的代码...
        
        // 确保搜索功能正确初始化
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value.trim().length > 0) {
            filterNews();
        }
    };
});