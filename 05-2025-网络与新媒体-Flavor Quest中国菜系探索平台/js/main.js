// ===== 动态滚动效果 =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollY = window.pageYOffset;
    
    // 导航栏透明度变化
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // 英雄区域视差效果
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = scrollY / 1000;
        hero.style.transform = `translateY(${Math.min(scrollY * 0.1, 100)}px)`;
        hero.style.opacity = `${1 - Math.min(scrollY * 0.002, 0.3)}`;
    }
});

// ===== 粒子背景 =====
function createParticles() {
    const container = document.createElement('div');
    container.className = 'particle-background';
    document.body.prepend(container);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 100 + 50;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        
        container.appendChild(particle);
    }
}

// 添加粒子动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(10px, -10px) rotate(5deg); }
        50% { transform: translate(-5px, 5px) rotate(-5deg); }
        75% { transform: translate(-10px, -5px) rotate(3deg); }
    }
`;
document.head.appendChild(style);

// ===== 页面加载动画 =====
document.addEventListener('DOMContentLoaded', function() {
        // ===== 轮播图功能 =====
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    if (carousel) {
        let currentIndex = 0;
        let autoSlideInterval;
        const totalItems = carouselItems.length;
        
        // 切换到指定索引
        function goToSlide(index) {
            // 更新当前索引
            currentIndex = (index + totalItems) % totalItems;
            
            // 更新轮播项
            carouselItems.forEach((item, i) => {
                item.classList.remove('active', 'prev');
                if (i === currentIndex) {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 50);
                }
            });
            
            // 更新指示器
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
            
            // 重置自动轮播计时器
            resetAutoSlide();
        }
        
        // 下一张
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        // 上一张
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        // 自动轮播
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        // 重置自动轮播
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
        
        // 初始化轮播
        function initCarousel() {
            // 添加事件监听器
            nextBtn?.addEventListener('click', nextSlide);
            prevBtn?.addEventListener('click', prevSlide);
            
            // 指示器点击事件
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
            
            // 键盘控制
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
            });
            
            // 触摸滑动支持
            let touchStartX = 0;
            let touchEndX = 0;
            
            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            carousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // 向左滑动，下一张
                        nextSlide();
                    } else {
                        // 向右滑动，上一张
                        prevSlide();
                    }
                }
            }
            
            // 鼠标悬停暂停
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            carousel.addEventListener('mouseleave', startAutoSlide);
            
            // 开始自动轮播
            startAutoSlide();
            
            console.log('轮播图初始化完成');
        }
        
        // 初始化轮播图
        initCarousel();
    }
    // 创建粒子背景
    createParticles();
    
    // 淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 卡片入场动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.feature-card, .cuisine-card').forEach(card => {
        observer.observe(card);
    });
});
// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. 深色模式切换 =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // 检查本地存储的主题偏好
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // 应用保存的主题
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // 切换主题
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // 更新图标
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
        
        // 添加点击动画
        this.style.transform = 'rotate(360deg) scale(1.1)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
    
    // ===== 2. 回到顶部按钮 =====
    const backToTopBtn = document.getElementById('backToTop');
    
    // 滚动显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击回到顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== 3. 搜索功能模拟 =====
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    searchButton.addEventListener('click', function() {
        performSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            alert(`搜索内容: ${query}\n(这是前端模拟搜索，实际项目中会连接后端API)`);
            searchInput.value = '';
        } else {
            alert('请输入搜索关键词');
        }
    }
    
    // ===== 4. 卡片悬停效果增强 =====
    const cards = document.querySelectorAll('.feature-card, .cuisine-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ===== 5. 导航链接点击效果 =====
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有active类
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加当前active类
            this.classList.add('active');
            
            // 如果是内部链接，添加平滑滚动
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== 6. 页面加载动画 =====
    // 添加简单的加载完成动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('美食探索者网站已加载完成！');
});
// ===== 搜索功能实现 =====

function initSearch() {
    // 获取所有搜索框和按钮
    const searchBoxes = document.querySelectorAll('.search-box');
    
    searchBoxes.forEach(searchBox => {
        const input = searchBox.querySelector('input[type="text"]');
        const button = searchBox.querySelector('button');
        
        if (!input || !button) return;
        
        // 按钮点击搜索
        button.addEventListener('click', function() {
            performSearch(input.value.trim());
        });
        
        // 按回车键搜索
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(input.value.trim());
            }
        });
        
        // 输入时实时显示建议（可选）
        input.addEventListener('input', function() {
            if (input.value.trim().length > 0) {
                showSearchSuggestions(input.value.trim());
            }
        });
    });
}

// 执行搜索
function performSearch(query) {
    if (!query) {
        showSearchMessage('请输入搜索关键词', 'info');
        return;
    }
    
    console.log(`执行搜索: ${query}`);
    
    // 显示搜索中状态
    showSearchMessage(`正在搜索 "${query}"...`, 'loading');
    
    // 模拟搜索延迟
    setTimeout(() => {
        // 这里可以替换为真实的搜索逻辑
        const searchResults = simulateSearch(query);
        
        if (searchResults.length > 0) {
            showSearchResults(query, searchResults);
        } else {
            showSearchMessage(`没有找到 "${query}" 相关的内容`, 'error');
        }
    }, 800);
}

// 模拟搜索数据
function simulateSearch(query) {
    // 菜品数据
    const dishes = [
        { name: '番茄炒蛋', category: '家常菜', page: 'recipes.html#tomato-egg' },
        { name: '土豆炖牛肉', category: '炖菜', page: 'recipes.html#beef-stew' },
        { name: '宫保鸡丁', category: '川菜', page: 'recipes.html#kungpao-chicken' },
        { name: '麻婆豆腐', category: '川菜', page: 'recipes.html#mapo-tofu' },
        { name: '清蒸鱼', category: '粤菜', page: 'recipes.html#steamed-fish' },
        { name: '回锅肉', category: '川菜', page: 'recipes.html#twice-cooked-pork' },
        { name: '鱼香肉丝', category: '川菜', page: 'recipes.html#fish-pork' },
        { name: '红烧肉', category: '家常菜', page: 'recipes.html#braised-pork' },
        { name: '川菜', category: '菜系', page: 'regional.html#sichuan' },
        { name: '粤菜', category: '菜系', page: 'regional.html#guangdong' },
        { name: '湘菜', category: '菜系', page: 'regional.html#hunan' },
        { name: '鲁菜', category: '菜系', page: 'regional.html#shandong' }
    ];
    
    // 食材数据
    const ingredients = ['番茄', '鸡蛋', '牛肉', '土豆', '鸡肉', '豆腐', '鱼', '猪肉'];
    
    const queryLower = query.toLowerCase();
    
    // 搜索匹配
    return dishes.filter(item => 
        item.name.toLowerCase().includes(queryLower) ||
        item.category.toLowerCase().includes(queryLower)
    );
}

// 显示搜索建议
function showSearchSuggestions(query) {
    // 这里可以添加实时搜索建议功能
    console.log(`搜索建议: ${query}`);
}

// 显示搜索消息
function showSearchMessage(message, type = 'info') {
    // 移除现有的消息框
    const existingMsg = document.querySelector('.search-message');
    if (existingMsg) existingMsg.remove();
    
    // 创建消息框
    const messageDiv = document.createElement('div');
    messageDiv.className = `search-message search-${type}`;
    messageDiv.innerHTML = `
        <span>${message}</span>
        <button class="close-search-msg">&times;</button>
    `;
    
    // 添加到页面
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.parentNode.insertBefore(messageDiv, searchBox.nextSibling);
        
        // 添加关闭按钮事件
        const closeBtn = messageDiv.querySelector('.close-search-msg');
        closeBtn.addEventListener('click', () => messageDiv.remove());
        
        // 3秒后自动消失（如果是info类型）
        if (type === 'info' || type === 'loading') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 3000);
        }
    }
}

// 显示搜索结果
function showSearchResults(query, results) {
    // 移除现有的结果框
    const existingResults = document.querySelector('.search-results');
    if (existingResults) existingResults.remove();
    
    // 移除现有的消息框
    const existingMsg = document.querySelector('.search-message');
    if (existingMsg) existingMsg.remove();
    
    // 创建结果容器
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'search-results';
    
    // 结果标题
    resultsDiv.innerHTML = `
        <div class="search-results-header">
            <h3>"${query}" 的搜索结果 (${results.length}个)</h3>
            <button class="close-search-results">&times;</button>
        </div>
        <div class="search-results-list">
            ${results.map(result => `
                <a href="${result.page}" class="search-result-item">
                    <div class="result-content">
                        <h4>${result.name}</h4>
                        <span class="result-category">${result.category}</span>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </a>
            `).join('')}
        </div>
    `;
    
    // 添加到页面
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(resultsDiv, mainContent.firstChild);
        
        // 添加关闭按钮事件
        const closeBtn = resultsDiv.querySelector('.close-search-results');
        closeBtn.addEventListener('click', () => resultsDiv.remove());
        
        // 点击外部关闭
        document.addEventListener('click', function closeResults(e) {
            if (!resultsDiv.contains(e.target) && 
                !e.target.closest('.search-box')) {
                resultsDiv.remove();
                document.removeEventListener('click', closeResults);
            }
        });
        
        // 滚动到结果
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 初始化搜索功能
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
});