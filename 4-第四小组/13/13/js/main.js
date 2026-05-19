// 全局变量
let currentSlide = 0;
let reserveList = JSON.parse(localStorage.getItem('reserveList')) || [];
let theme = localStorage.getItem('theme') || 'red';
let messages = JSON.parse(localStorage.getItem('olympicMessages')) || [];
let isMessagePanelOpen = false;
let isFeedbackPanelOpen = false;

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化遮罩层
    initOverlay();

    // 初始化图片放大功能
    initImageZoom();

    // 初始化主题
    if (theme === 'blue') {
        document.body.classList.add('blue-theme');
    }
    
    // 初始化返回顶部按钮
    initBackToTop();
    
    // 搜索框显示/隐藏
    initSearch();
    
    // 轮播图功能
    initSlider();
    
    // 查看更多按钮
    initMoreButtons();
    
    // 主题切换
    initThemeToggle();
    
    // 喝彩按钮（彩带效果）
    initCheerButtons();
    
    // 留言板 - 重点优化交互
    initMessagePanel();
    
    // 意见反馈
    initFeedbackPanel();
    
    // 预约功能
    initReserveFunction();
    
    // TA的瞬间点击事件
    initMomentClick();
    
    // 精彩报道点击事件
    initNewsClick();
    
    // 初始化我的预约列表
    initReserveList();
    
    // 初始化直播控制按钮
    initLiveControls();
    
    // 阻止事件冒泡，提升交互灵敏度
    preventEventBubbling();
});

// 添加图片放大功能
function initImageZoom() {
    // 创建图片查看器
    const imageViewer = document.createElement('div');
    imageViewer.className = 'image-viewer';
    imageViewer.style.position = 'fixed';
    imageViewer.style.top = '0';
    imageViewer.style.left = '0';
    imageViewer.style.width = '100%';
    imageViewer.style.height = '100%';
    imageViewer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    imageViewer.style.display = 'none';
    imageViewer.style.justifyContent = 'center';
    imageViewer.style.alignItems = 'center';
    imageViewer.style.zIndex = '2000';
    imageViewer.style.cursor = 'zoom-out';
    
    const zoomedImage = document.createElement('img');
    zoomedImage.style.maxWidth = '90%';
    zoomedImage.style.maxHeight = '90%';
    zoomedImage.style.transition = 'all 0.3s ease';
    
    imageViewer.appendChild(zoomedImage);
    document.body.appendChild(imageViewer);
    
    // 为所有图片添加点击事件
    document.querySelectorAll('img').forEach(img => {
        // 排除logo图片
        if (!img.classList.contains('logo')) {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                zoomedImage.src = this.src;
                imageViewer.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // 防止背景滚动
            });
        }
    });
    
    // 点击图片查看器关闭
    imageViewer.addEventListener('click', function() {
        this.style.display = 'none';
        document.body.style.overflow = ''; // 恢复滚动
    });
    
    // 按ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageViewer.style.display === 'flex') {
            imageViewer.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// 初始化遮罩层
function initOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // 点击遮罩层关闭所有面板
    overlay.addEventListener('click', function() {
        closeAllPanels();
    });
}

// 获取遮罩层
function getOverlay() {
    return document.querySelector('.overlay');
}

// 显示遮罩层
function showOverlay() {
    const overlay = getOverlay();
    if (overlay) {
        overlay.style.display = 'block';
    }
}

// 隐藏遮罩层
function hideOverlay() {
    const overlay = getOverlay();
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// 关闭所有面板
function closeAllPanels() {
    // 关闭留言面板
    const messagePanel = document.querySelector('.message-panel');
    if (messagePanel) {
        messagePanel.style.display = 'none';
        messagePanel.classList.remove('active');
    }
    
    // 关闭反馈面板
    const feedbackPanel = document.querySelector('.feedback-panel');
    if (feedbackPanel) {
        feedbackPanel.style.display = 'none';
        feedbackPanel.classList.remove('active');
    }
    
    // 关闭所有弹窗
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    
    // 隐藏遮罩层
    hideOverlay();
    
    // 更新状态
    isMessagePanelOpen = false;
    isFeedbackPanelOpen = false;
}

// 阻止事件冒泡 - 提升交互灵敏度
function preventEventBubbling() {
    // 为所有面板和弹窗添加事件阻止冒泡
    document.addEventListener('click', function(e) {
        if (e.target.closest('.message-panel') || 
            e.target.closest('.feedback-panel') ||
            e.target.closest('.modal')) {
            e.stopPropagation();
        }
    });
    
    // 为表单元素阻止冒泡
    const formElements = document.querySelectorAll('.form-input, .form-textarea, .submit-btn');
    formElements.forEach(el => {
        el.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

// 初始化返回顶部按钮
function initBackToTop() {
    // 创建返回顶部按钮
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.title = '返回顶部';
    document.body.appendChild(backToTop);
    
    // 初始隐藏
    backToTop.style.display = 'none';
    
    // 点击返回顶部
    backToTop.addEventListener('click', function(e) {
        e.stopPropagation();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
}

// 初始化搜索功能（新增全站检索、下拉提示）
function initSearch() {
    const searchIcon = document.querySelector('.search-icon');
    const searchBox = document.querySelector('.search-box');
    const searchInput = searchBox ? searchBox.querySelector('input') : null;
    
    // 创建搜索下拉提示框
    const searchDropdown = document.createElement('div');
    searchDropdown.className = 'search-dropdown';
    searchDropdown.style.position = 'absolute';
    searchDropdown.style.top = '100%';
    searchDropdown.style.left = '0';
    searchDropdown.style.right = '0';
    searchDropdown.style.backgroundColor = 'white';
    searchDropdown.style.borderRadius = '0 0 8px 8px';
    searchDropdown.style.boxShadow = 'var(--card-shadow)';
    searchDropdown.style.zIndex = '100';
    searchDropdown.style.maxHeight = '300px';
    searchDropdown.style.overflowY = 'auto';
    searchDropdown.style.display = 'none';
    searchBox.appendChild(searchDropdown);
    
    // 创建搜索结果弹窗
    let searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchResults.innerHTML = `
        <div class="search-results-header">
            <h3 class="search-results-title">搜索结果：<span class="search-keyword"></span></h3>
            <span class="close-results">&times;</span>
        </div>
        <div class="results-list"></div>`;

    const closeResults = searchResults.querySelector('.close-results');
    const resultsList = searchResults.querySelector('.results-list');
    const searchKeywordEl = searchResults.querySelector('.search-keyword');
    
    if (searchIcon && searchBox && searchInput) {
        // 搜索图标点击显示/隐藏搜索框
        searchIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
            
            // 如果显示搜索框，自动聚焦
            if (searchBox.style.display === 'block') {
                searchInput.focus();
            }
        });
        
        // 点击页面其他区域关闭搜索框
        document.addEventListener('click', function(e) {
            if (!searchIcon.contains(e.target) && !searchBox.contains(e.target) && !searchResults.contains(e.target)) {
                searchBox.style.display = 'none';
            }
        });
        
        // 回车键触发搜索
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                performSearch(this.value.trim());
                this.value = '';
                searchBox.style.display = 'none';
            }
        });
        
        // 输入框输入事件 - 显示下拉提示
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const keyword = this.value.trim();
                if (keyword.length < 2) {
                    searchDropdown.style.display = 'none';
                    return;
                }
                
                // 获取匹配结果
                const siteData = getSiteData();
                const matchedResults = siteData.filter(item => 
                    item.title.toLowerCase().includes(keyword.toLowerCase()) || 
                    item.content.toLowerCase().includes(keyword.toLowerCase())
                ).slice(0, 5); // 只显示前5个结果
                
                // 更新下拉框内容
                if (matchedResults.length > 0) {
                    searchDropdown.innerHTML = '';
                    matchedResults.forEach(item => {
                        const itemEl = document.createElement('div');
                        itemEl.className = 'search-dropdown-item';
                        itemEl.style.padding = '10px 15px';
                        itemEl.style.cursor = 'pointer';
                        itemEl.style.borderBottom = '1px solid var(--border-color)';
                        itemEl.innerHTML = `<strong>${item.title}</strong>`;
                        
                        // 点击跳转到对应内容
                        itemEl.addEventListener('click', function() {
                            window.location.href = item.url;
                            searchDropdown.style.display = 'none';
                            searchBox.style.display = 'none';
                        });
                        
                        // 鼠标悬停效果
                        itemEl.addEventListener('mouseover', function() {
                            this.style.backgroundColor = 'rgba(var(--primary-rgb), 0.1)';
                        });
                        
                        itemEl.addEventListener('mouseout', function() {
                            this.style.backgroundColor = '';
                        });
                        
                        searchDropdown.appendChild(itemEl);
                    });
                    searchDropdown.style.display = 'block';
                } else {
                    searchDropdown.style.display = 'none';
                }
            });
        }
        
        // 点击页面其他区域关闭下拉框
        document.addEventListener('click', function(e) {
            if (!searchBox.contains(e.target)) {
                searchDropdown.style.display = 'none';
            }
        });


        // 自主修改，创建搜索按钮（新增）
        if (!searchBox.querySelector('.search-submit')) {
            const searchSubmit = document.createElement('button');
            searchSubmit.className = 'submit-btn';
            searchSubmit.style.position = 'absolute';
            searchSubmit.style.right = '15px';
            searchSubmit.style.top = '50%';
            searchSubmit.style.transform = 'translateY(-50%)';
            searchSubmit.style.padding = '5px 10px';
            searchSubmit.style.fontSize = '14px';
            searchSubmit.style.width = '70px';
            searchSubmit.textContent = '搜索';
            searchBox.appendChild(searchSubmit);
            
            // 搜索按钮点击事件
            searchSubmit.addEventListener('click', function(e) {
                e.stopPropagation();
                const keyword = searchInput.value.trim();
                if (keyword) {
                    performSearch(keyword);
                    searchInput.value = '';
                    searchBox.style.display = 'none';
                } else {
                    alert('请输入搜索关键词！');
                    searchInput.focus();
                }
            });
        }
        
        // 关闭搜索结果
        closeResults.addEventListener('click', function(e) {
            e.stopPropagation();
            searchResults.style.display = 'none';
            hideOverlay();
        });
        
        // 点击搜索结果弹窗外部不关闭
        searchResults.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // 执行搜索
    function performSearch(keyword) {
        // 获取全站数据
        const siteData = getSiteData();
        
        // 筛选匹配结果
        const matchedResults = [];
        
        // 搜索标题和内容
        siteData.forEach(item => {
            const titleMatch = item.title.toLowerCase().includes(keyword.toLowerCase());
            const contentMatch = item.content.toLowerCase().includes(keyword.toLowerCase());
            
            if (titleMatch || contentMatch) {
                // 高亮匹配关键词
                let highlightedTitle = item.title.replace(
                    new RegExp(keyword, 'gi'),
                    match => `<span style="color: var(--primary-color); font-weight: bold;">${match}</span>`
                );
                
                let highlightedContent = item.content.substring(0, 150);
                highlightedContent = highlightedContent.replace(
                    new RegExp(keyword, 'gi'),
                    match => `<span style="color: var(--primary-color); font-weight: bold;">${match}</span>`
                );
                
                if (item.content.length > 150) {
                    highlightedContent += '...';
                }
                
                matchedResults.push({
                    ...item,
                    title: highlightedTitle,
                    content: highlightedContent
                });
            }
        });
        
        // 更新搜索结果显示
        searchKeywordEl.textContent = keyword;
        resultsList.innerHTML = '';
        
        if (matchedResults.length === 0) {
            resultsList.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>未找到与"${keyword}"相关的内容</p>
                    <p style="margin-top: 10px; font-size: 14px;">请尝试其他关键词</p>
                </div>
            `;
        } else {
            matchedResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <div class="result-type">${result.type}</div>
                    <div class="result-title">${result.title}</div>
                    <div class="result-content">${result.content}</div>
                `;
                
                // 点击搜索结果跳转
                resultItem.addEventListener('click', function() {
                    if (result.url) {
                        window.location.href = result.url;
                    } else if (result.action) {
                        result.action();
                    }
                    searchResults.style.display = 'none';
                    hideOverlay();
                });
                
                resultsList.appendChild(resultItem);
            });
        }
        
        // 显示搜索结果
        searchResults.style.display = 'block';
    }
    
    // 构建全站数据
    function getSiteData() {
        // 首页数据
        const homeData = {
            title: '欢迎来到奥运观察',
            content: '奥运观察是您了解最新奥运资讯、赛事动态和运动员风采的权威平台。在这里，您可以查看奥运概况、精彩瞬间、最新资讯和直播回放，感受奥林匹克的魅力。让我们一起为中国奥运健儿加油喝彩！',
            type: '首页',
            url: 'index.html'
        };
        
        // 奥运概况数据
        const overviewData = [
            {
                title: '中国代表队简介',
                content: '2024年巴黎奥运会中国体育代表团总人数为716人，其中运动员405人，参加30个大项、42个分项、236个小项的比赛。代表团运动员平均年龄25岁，年龄最大的是田径运动员刘虹（37岁），年龄最小的是滑板运动员郑好好（11岁）。本届代表团既有马龙、巩立姣等经验丰富的老将，也有众多首次参加奥运会的年轻选手。',
                type: '奥运概况',
                url: 'pages/overview.html'
            },
            {
                title: '2024巴黎奥运会',
                content: '2024年巴黎奥运会是第33届夏季奥林匹克运动会，将于2024年7月26日至8月11日在法国巴黎举行。本届奥运会的吉祥物是弗里热（Phryge），以法国传统弗里吉亚帽为设计灵感，象征着自由和法国大革命精神。巴黎奥运会共设32个大项、329个小项，新增了霹雳舞、滑板、攀岩和冲浪等新兴项目。',
                type: '奥运概况',
                url: 'pages/overview.html'
            }
        ];
        
        // 闪耀时刻数据
        const shiningData = [
            {
                title: '全红婵获女子10米跳台金牌',
                content: '全红婵在巴黎奥运会女子 10 米跳台决赛中，以 425.60 分的总成绩战胜队友陈芋汐成功卫冕，成为该项目奥运连冠第三人，助力中国跳水队实现该项目五连冠，更推动 “梦之队” 包揽本届奥运会全部八枚跳水金牌。',
                type: '闪耀时刻',
                url: 'pages/shining.html'
            },
            {
                title: '潘展乐获男子游泳100米自由泳金牌',
                content: '潘展乐在巴黎奥运会男子 100 米自由泳决赛中，以 46 秒 40 的成绩夺得金牌并打破世界纪录，成为中国、亚洲历史上首位该项目奥运冠军，打破了欧美选手的长期垄断。',
                type: '闪耀时刻',
                url: 'pages/shining.html'
            },
            {
                title: '谢瑜获男子射击10米气手枪金牌',
                content: '谢瑜在巴黎奥运会男子 10 米气手枪决赛中，以 240.9 环的总成绩夺得金牌，这是中国选手时隔 16 年再度斩获该项目奥运冠军。这位 24 岁的小将凭借沉稳的心态和专注的发挥，征服了所有裁判和观众，展现了历经多年磨砺的技术实力和超强抗压能力。',
                type: '闪耀时刻',
                url: 'pages/shining.html'
            },
            {
                title: '刘洋获男子竞技体操吊环金牌',
                content: '刘洋在巴黎奥运会男子竞技体操吊环决赛中，以 15.300 分的成绩成功卫冕，成为中国首位该项目奥运卫冕冠军，也是奥运会历史上第三位两夺男子吊环金牌的运动员，携手队友邹敬园包揽金银牌，延续中国队在该项目的统治地位。',
                type: '闪耀时刻',
                url: 'pages/shining.html'
            },
            {
                title: '奥运奖牌实时排行榜',
                content: '截至目前，中国代表团以38金32银18铜的成绩暂列奖牌榜第二位，美国代表团以40金44银42铜位居榜首，日本代表团以27金14银17铜排名第三。',
                type: '闪耀时刻',
                url: 'pages/shining.html'
            }
        ];
        
        // 资讯集锦数据
        const newsData = [
            {
                title: '中国代表团单日斩获5金，创本届奥运最佳战绩',
                content: '在今日的比赛中，中国选手在跳水、举重、乒乓球等项目上表现出色，单日获得5枚金牌，展现了强大的综合实力。截至目前，中国代表团以28金16银14铜的成绩暂列奖牌榜第二位。',
                type: '精彩报道',
                url: 'pages/news.html'
            },
            {
                title: '潘展乐打破世界纪录，中国男子短泳实现历史性突破',
                content: '潘展乐在巴黎奥运会男子 100 米自由泳决赛中飙出 46 秒 40 的惊人成绩，打破世界纪录并夺得金牌，成为首位斩获该项目奥运冠军的亚洲选手。他以 1.08 秒的巨大优势夺冠，彻底打破欧美选手的长期垄断，创造了泳坛历史。',
                type: '精彩报道',
                url: 'pages/news.html'
            },
            {
                title: '王楚钦&孙颖莎逆转夺冠，国乒斩获巴黎首金',
                content: '王楚钦 & 孙颖莎在巴黎奥运会乒乓球混双决赛中以 4-2 击败朝鲜组合，夺得国乒奥运历史上首枚混双金牌。两人场上频繁沟通、配合默契，关键局展现出超强调整能力和抗压韧性。',
                type: '精彩报道',
                url: 'pages/news.html'
            },
            {
                title: '黄雨婷和盛李豪射落首金，中国射击队开门红',
                content: '黄雨婷和盛李豪在 10 米气步枪混合团体决赛中以 16-12 战胜韩国组合，夺得巴黎奥运会首金。他们在比分被追至 14-12 的关键时刻稳扎稳打，合力打出 21.5 环锁定胜局，展现了超强的默契与抗压能力。',
                type: '精彩报道',
                url: 'pages/news.html'
            },
            {
                title: '今日奥运赛事安排',
                content: '今日赛事包括：09:00女子100米蝶泳半决赛（进行中）、11:30男子举重73公斤级决赛（未开始）、15:00乒乓球女子单打1/4决赛（未开始）、19:30男子400m决赛（未开始）、21:00羽毛球男子双打决赛（未开始）。',
                type: '今日赛事',
                url: 'pages/news.html'
            }
        ];
        
        // 直播回放数据
        const liveData = [
            {
                title: '今日直播安排',
                content: '今日直播包括：09:00女子100米蝶泳半决赛、11:30男子举重73公斤级决赛、15:00乒乓球女子单打1/4决赛、19:30男子400m决赛、21:00羽毛球男子双打决赛。所有赛事均可预约观看。',
                type: '直播安排',
                url: 'pages/live.html'
            },
            {
                title: '正在直播：女子100米蝶泳半决赛',
                content: '当前正在直播女子100米蝶泳半决赛，中国选手张雨霏出战，有望晋级决赛并冲击金牌。直播支持清晰度调节、全屏观看、音量控制等功能。',
                type: '正在直播',
                url: 'pages/live.html'
            },
            {
                title: '直播预约功能',
                content: '用户可预约感兴趣的奥运赛事，预约成功后会在"我的预约"板块显示，点击未开始的预约项目会提示"该项目还没有开始哦"。',
                type: '直播功能',
                url: 'pages/live.html'
            }
        ];
        
        // 合并所有数据
        return [
            homeData,
            ...overviewData,
            ...shiningData,
            ...newsData,
            ...liveData
        ];
    }
}

// 轮播图初始化
function initSlider() {
    const slider = document.querySelector('.slider');
    if (!slider) return;
    
    const sliderWrapper = slider.querySelector('.slider-wrapper');
    const slideItems = sliderWrapper.querySelectorAll('.slide-item');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    
    if (!sliderWrapper || !slideItems.length || !prevBtn || !nextBtn) return;
    
    // 设置轮播图高度
    sliderWrapper.style.height = '100%';
    slideItems.forEach(item => {
        item.style.height = '100%';
    });
    
    // 设置轮播图自动播放
    let slideInterval = setInterval(nextSlide, 4000);
    
    // 鼠标悬停暂停轮播
    slider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    // 鼠标离开继续轮播
    slider.addEventListener('mouseleave', function() {
        slideInterval = setInterval(nextSlide, 4000);
    });
    
    // 上一张/下一张按钮
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        prevSlide();
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        nextSlide();
    });
    
    // 上一张
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
        updateSlider();
    }
    
    // 下一张
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideItems.length;
        updateSlider();
    }
    
    // 更新轮播图位置
    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// 查看更多按钮初始化
function initMoreButtons() {
    const moreBtns = document.querySelectorAll('.more-btn');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const closeModal = modal.querySelector('.close-modal');
    const modalBody = modal.querySelector('.modal-body');
    
    // 关闭弹窗
    closeModal.addEventListener('click', function(e) {
        e.stopPropagation();
        modal.style.display = 'none';
    });
    
    // 点击弹窗外区域关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 为每个查看更多按钮添加点击事件
    moreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.info-card');
            const cardTitle = card.querySelector('.card-title').textContent;
            const cardContent = card.querySelector('.card-content').textContent;
            
            // 详细内容
            const detailedContent = `
                <h2 style="color: var(--primary-color); margin-bottom: 25px; font-size: 24px;">${cardTitle}</h2>
                <p style="line-height: 1.8; font-size: 16px; margin-bottom: 20px;">
                    ${cardContent}
                </p>
                <p style="line-height: 1.8; font-size: 16px;">
                    ${cardTitle.includes('中国代表队') 
                        ? '<strong>详细介绍：</strong><br>中国奥运代表团由国家体育总局统一组建，本届奥运会共派出400余名运动员参赛，涵盖30个大项、42个分项。代表团运动员平均年龄25岁，既有马龙、巩立姣等经验丰富的老将，也有黄雨婷、盛李豪等年轻新秀。<br><br>代表团成立以来，进行了为期三个月的封闭集训，针对各个项目的特点制定了详细的备战计划。在赛前动员会上，代表团强调要发扬奥林匹克精神和中华体育精神，赛出风格、赛出水平。<br><br>截至目前，中国代表团已在跳水、举重、乒乓球、射击等项目上取得优异成绩，展现了中国运动员的风采。' 
                        : '<strong>详细介绍：</strong><br>2024年巴黎奥运会正式名称为第33届夏季奥林匹克运动会，将于2024年7月26日至8月11日在法国巴黎举行，部分项目的比赛将于7月24日率先开赛。<br><br>本届奥运会的吉祥物是弗里热（Phryge），这是一个以法国传统弗里吉亚帽为设计灵感的拟人化形象，颜色以蓝色为主，象征着自由和法国大革命精神。<br><br>巴黎奥运会共设32个大项、329个小项，新增了霹雳舞、滑板、攀岩和冲浪等新兴项目。比赛将在巴黎及周边城市的35个场馆举行，其中包括埃菲尔铁塔、巴黎大皇宫等著名地标。<br><br>本届奥运会的口号是“OUVRONS GRAND LES JEUX”（让我们更开放地举办奥运会），强调包容性、多元化和可持续性。'
                    }
                </p>
            `;
            
            modalBody.innerHTML = detailedContent;
            modal.style.display = 'flex';
        });
    });
}

// 主题切换初始化
function initThemeToggle() {
    // 创建主题选择器
    const themePicker = document.createElement('div');
    themePicker.className = 'theme-picker';
    themePicker.innerHTML = `
        <div class="theme-color active" data-theme="red" style="background-color: #e74c3c;"></div>
        <div class="theme-color" data-theme="blue" style="background-color: #3498db;"></div>
        <div class="theme-color" data-theme="green" style="background-color: #27ae60;"></div>
        <div class="theme-color" data-theme="orange" style="background-color: #e67e22;"></div>
    `;
    
    // 获取主题切换按钮
    const themeToggle = document.querySelector('.theme-toggle-btn');
    if (themeToggle) {
        // 将选择器添加到按钮
        themeToggle.appendChild(themePicker);
        
        // 点击按钮显示/隐藏选择器
        themeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            themePicker.classList.toggle('active');
        });
        
        // 点击颜色选项切换主题
        const colorOptions = themePicker.querySelectorAll('.theme-color');
        colorOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const newTheme = this.getAttribute('data-theme');
                
                // 移除所有主题类
                document.body.classList.remove('red-theme', 'blue-theme', 'green-theme', 'orange-theme');
                
                // 添加选中的主题类
                if (newTheme !== 'red') { // 默认是红色主题，不需要添加类
                    document.body.classList.add(`${newTheme}-theme`);
                }
                
                // 更新本地存储
                localStorage.setItem('theme', newTheme);
                
                // 更新选中状态
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // 隐藏选择器
                themePicker.classList.remove('active');
            });
        });
        
        // 初始化选中状态
        colorOptions.forEach(option => {
            if (option.getAttribute('data-theme') === theme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    // 点击页面其他区域关闭选择器
    document.addEventListener('click', function() {
        themePicker.classList.remove('active');
    });
}

// 自主修改，创建彩带效果
function createConfetti() {
    const colors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6', '#ffffff', '#e67e22'];
    const confettiCount = 300;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // 随机样式
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        // 随机动画参数
        const duration = Math.random() * 4000 + 2000;
        const rotation = Math.random() * 1440;
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        // 动画
        confetti.animate([
            { transform: `translateY(-10px) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(${direction * rotation}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0,0,0.2,1)'
        });
        
        document.body.appendChild(confetti);
        
        // 移除元素
        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}

// 初始化喝彩按钮
function initCheerButtons() {
    // 喝彩按钮
    const cheerBtn = document.querySelector('.cheer-btn');
    if (cheerBtn) {
        cheerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            createConfetti();
        });
    }
    
    // 彩带互动文字
    const confettiToggle = document.querySelector('.confetti-toggle');
    if (confettiToggle) {
        confettiToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            createConfetti();
        });
    }
}

// 初始化留言面板 - 优化位置和交互流畅度
function initMessagePanel() {
    const messageBtn = document.querySelector('.message-btn');
    
    // 创建留言面板（确保只创建一次）
    let messagePanel = document.querySelector('.message-panel');
    if (!messagePanel) {
        messagePanel = document.createElement('div');
        messagePanel.className = 'message-panel';
        messagePanel.innerHTML = `
            <div class="panel-title">为奥运健儿加油</div>
            <div class="panel-form">
                <textarea class="form-textarea" placeholder="写下你对奥运健儿的祝福…"></textarea>
                <button class="submit-btn">提交留言</button>
            </div>
            <div class="messages-list"></div>
            <span class="close-panel">关闭</span>
        `;
        document.body.appendChild(messagePanel);
    }
    
    const closePanel = messagePanel.querySelector('.close-panel');
    const submitBtn = messagePanel.querySelector('.submit-btn');
    const contentInput = messagePanel.querySelector('.form-textarea');
    const messagesList = messagePanel.querySelector('.messages-list');
    
    // 显示留言板 - 优化点击响应和位置
    if (messageBtn) {
        messageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 如果面板已打开，直接聚焦输入框
            if (isMessagePanelOpen) {
                contentInput.focus();
                return;
            }
            
            // 关闭其他面板
            closeAllPanels();
            
            // 显示留言面板（固定在右下角，不再居中）
            messagePanel.style.display = 'block';
            messagePanel.classList.add('active');
            isMessagePanelOpen = true;
            
            // 不再显示遮罩层（优化交互流畅度）
            // showOverlay();
            
            // 加载已保存的留言
            renderMessages();
            
            // 聚焦输入框（延迟确保面板已显示）
            setTimeout(() => {
                contentInput.focus();
            }, 100);
        });
    }
    
    // 关闭留言板 - 确保响应灵敏
    closePanel.addEventListener('click', function(e) {
        e.stopPropagation();
        messagePanel.style.display = 'none';
        messagePanel.classList.remove('active');
        isMessagePanelOpen = false;
        // hideOverlay(); // 同步移除遮罩层显示
    });
    
    // 提交留言 - 优化交互
    submitBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (!contentInput.value.trim()) {
            alert('请输入您的祝福！');
            contentInput.focus();
            return;
        }
        
        // 创建留言对象
        const message = {
            id: Date.now(),
            text: contentInput.value.trim(),
            time: new Date().toLocaleString()
        };
        
        // 添加到留言列表
        messages.unshift(message);
        
        // 保存到本地存储
        localStorage.setItem('olympicMessages', JSON.stringify(messages));
        
        // 重新渲染留言
        renderMessages();
        
        // 清空输入框并保持聚焦
        contentInput.value = '';
        contentInput.focus();
        
        // 提示成功（改用轻量提示，优化流畅度）
        const tip = document.createElement('div');
        tip.style.position = 'fixed';
        tip.style.bottom = '20px';
        tip.style.right = '30px';
        tip.style.backgroundColor = 'var(--primary-color)';
        tip.style.color = 'white';
        tip.style.padding = '8px 15px';
        tip.style.borderRadius = '5px';
        tip.style.zIndex = '9999';
        tip.style.animation = 'fadeInOut 2s ease';
        tip.textContent = '留言提交成功！';
        document.body.appendChild(tip);
        
        setTimeout(() => {
            tip.remove();
        }, 2000);
    });
    
    // 支持回车键提交（优化交互）
    contentInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            submitBtn.click();
        }
        // 普通回车不提交，只换行
        if (e.key === 'Enter' && !e.ctrlKey) {
            return;
        }
    });
    
    // 阻止面板内事件冒泡
    messagePanel.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // 渲染留言列表
    function renderMessages() {
        if (messages.length === 0) {
            messagesList.innerHTML = '<div style="text-align: center; color: #999; padding: 10px;">暂无留言，快来写下你的祝福吧！</div>';
            return;
        }
        
        let html = '';
        messages.forEach(msg => {
            html += `
                <div class="message-item">
                    <div class="message-text">${msg.text}</div>
                    <div class="message-time">${msg.time}</div>
                </div>
            `;
        });
        
        messagesList.innerHTML = html;
    }
    
    // 添加轻量提示动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(20px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(20px); }
        }
    `;
    document.head.appendChild(style);
}

// 初始化意见反馈面板
function initFeedbackPanel() {
    const feedbackBtn = document.querySelector('.feedback-toggle');
    
    // 创建反馈面板（确保只创建一次）
    let feedbackPanel = document.querySelector('.feedback-panel');
    if (!feedbackPanel) {
        feedbackPanel = document.createElement('div');
        feedbackPanel.className = 'feedback-panel';
        feedbackPanel.innerHTML = `
            <div class="panel-title">意见反馈</div>
            <div class="panel-form">
                <input type="text" class="form-input" placeholder="您的联系方式（选填）">
                <textarea class="form-textarea" placeholder="请输入您的意见或建议..."></textarea>
                <button class="submit-btn">提交反馈</button>
            </div>
            <span class="close-panel">关闭</span>
        `;
        document.body.appendChild(feedbackPanel);
    }
    
    const closePanel = feedbackPanel.querySelector('.close-panel');
    const submitBtn = feedbackPanel.querySelector('.submit-btn');
    const contactInput = feedbackPanel.querySelector('.form-input');
    const contentInput = feedbackPanel.querySelector('.form-textarea');
    
    // 显示反馈面板
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 关闭其他面板
            closeAllPanels();
            
            // 显示反馈面板
            feedbackPanel.style.display = 'block';
            feedbackPanel.classList.add('active');
            isFeedbackPanelOpen = true;
            
            // 显示遮罩层
            showOverlay();
            
            // 聚焦输入框
            setTimeout(() => {
                contentInput.focus();
            }, 100);
        });
    }
    
    // 关闭反馈面板
    closePanel.addEventListener('click', function(e) {
        e.stopPropagation();
        feedbackPanel.style.display = 'none';
        feedbackPanel.classList.remove('active');
        isFeedbackPanelOpen = false;
        hideOverlay();
    });
    
    // 提交反馈
    submitBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (!contentInput.value.trim()) {
            alert('请输入您的意见或建议！');
            contentInput.focus();
            return;
        }
        
        // 模拟提交
        alert('反馈提交成功！我们会尽快处理您的意见。');
        
        // 清空输入框
        contactInput.value = '';
        contentInput.value = '';
        
        // 关闭面板
        feedbackPanel.style.display = 'none';
        feedbackPanel.classList.remove('active');
        isFeedbackPanelOpen = false;
        hideOverlay();
    });
    
    // 阻止面板内事件冒泡
    feedbackPanel.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// 初始化预约功能
function initReserveFunction() {
    const reserveBtns = document.querySelectorAll('.reserve-btn');
    
    reserveBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const scheduleItem = this.closest('.schedule-item');
            const time = scheduleItem.querySelector('.schedule-time').textContent;
            const event = scheduleItem.querySelector('.schedule-event').textContent;
            const teams = scheduleItem.querySelector('.schedule-teams') ? scheduleItem.querySelector('.schedule-teams').textContent : '';
            
            const reserveItem = {
                id: Date.now(),
                time: time,
                event: event,
                teams: teams
            };
            
            // 检查是否已预约
            const isExisted = reserveList.some(item => 
                item.time === time && item.event === event && item.teams === teams
            );
            
            if (isExisted) {
                alert('您已预约该项目！');
                return;
            }
            
            reserveList.push(reserveItem);
            localStorage.setItem('reserveList', JSON.stringify(reserveList));
            
            alert('预约成功！');
            initReserveList();
        });
    });
}

// 初始化我的预约列表
function initReserveList() {
    const reserveListEl = document.querySelector('.reserve-list');
    if (!reserveListEl) return;
    
    if (reserveList.length === 0) {
        reserveListEl.innerHTML = '<div class="reserve-empty">还没有预约项目</div>';
        return;
    }
    
    let html = '';
    reserveList.forEach(item => {
        html += `
            <div class="schedule-item" data-id="${item.id}">
                <div class="schedule-time">${item.time}</div>
                <div class="schedule-event">${item.event}</div>
                ${item.teams ? `<div class="schedule-teams">${item.teams}</div>` : ''}
            </div>
        `;
    });
    
    reserveListEl.innerHTML = html;
    
    // 预约项目点击事件
    const reserveItems = reserveListEl.querySelectorAll('.schedule-item');
    reserveItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            // 创建全屏提示
            const alertModal = document.createElement('div');
            alertModal.className = 'modal';
            alertModal.innerHTML = `
                <div class="modal-content" style="max-width: 500px; text-align: center; padding: 50px 20px;">
                    <span class="close-modal">&times;</span>
                    <div style="font-size: 24px; color: var(--primary-color); margin-bottom: 20px;">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h3 style="font-size: 20px; margin-bottom: 10px;">该项目还没有开始哦</h3>
                    <p style="color: #666;">请在比赛开始时间前关注直播</p>
                </div>
            `;
            document.body.appendChild(alertModal);
            
            // 显示弹窗
            alertModal.style.display = 'flex';
            
            // 关闭按钮
            const closeBtn = alertModal.querySelector('.close-modal');
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                alertModal.style.display = 'none';
                setTimeout(() => {
                    alertModal.remove();
                }, 300);
            });
            
            // 点击外部关闭
            alertModal.addEventListener('click', function(e) {
                if (e.target === alertModal) {
                    alertModal.style.display = 'none';
                    setTimeout(() => {
                        alertModal.remove();
                    }, 300);
                }
            });
        });
    });
}

// TA的瞬间点击事件
function initMomentClick() {
    const momentDescs = document.querySelectorAll('.moment-desc');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const closeModal = modal.querySelector('.close-modal');
    const modalBody = modal.querySelector('.modal-body');
    
    // 关闭弹窗
    closeModal.addEventListener('click', function(e) {
        e.stopPropagation();
        modal.style.display = 'none';
    });
    
    // 点击外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    momentDescs.forEach(desc => {
        desc.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.moment-card');
            const title = card.querySelector('.moment-title').textContent;
            const img = card.querySelector('.moment-img').src;
            const descText = this.textContent;
            
            const detailedContent = `
                <h2 style="color: var(--primary-color); margin-bottom: 20px; font-size: 22px;">${title}</h2>
                <img src="${img}" alt="${title}" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
                <p style="line-height: 1.8; font-size: 16px; margin-bottom: 20px;">
                    ${descText}
                </p>
                <p style="line-height: 1.8; font-size: 16px;">
                    <strong>详细报道：</strong><br>
                    在${title.split('获')[0]}的决赛中，中国选手发挥出色，以完美的表现征服了裁判和观众。这枚金牌不仅是个人努力的成果，更是中国体育事业发展的见证。<br><br>
                    比赛过程中，选手面对强大的对手，始终保持冷静，发挥出了训练中的最高水平。最后时刻的关键表现更是展现了中国运动员顽强拼搏、永不放弃的精神风貌。<br><br>
                    赛后，选手表示："这块金牌属于所有支持我的人，我为祖国感到骄傲！"
                </p>
            `;
            
            modalBody.innerHTML = detailedContent;
            modal.style.display = 'flex';
        });
    });
}

// 精彩报道点击事件
function initNewsClick() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            const title = this.querySelector('.news-title').textContent;
            
          // 创建新闻详情弹窗
            const newsModal = document.createElement('div');
            newsModal.className = 'modal';
            newsModal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="modal-body">
                        <h2 style="color: var(--primary-color); margin-bottom: 20px; font-size: 22px;">${title}</h2>
                        <div style="line-height: 1.8; font-size: 16px;">
                            <p style="margin-bottom: 15px;">
                                北京时间${new Date().toLocaleDateString()}，2024巴黎奥运会进入第${Math.floor(Math.random() * 10) + 1}个比赛日的争夺。在今天的比赛中，中国代表团表现出色，在多个项目上取得了优异成绩。
                            </p>
                            <p style="margin-bottom: 15px;">
                                ${title.includes('5金') ? 
                                    '在今日的比赛中，中国代表团在跳水、举重、乒乓球、射击和体操项目上各获一枚金牌，单日斩获5金，创造了本届奥运会开赛以来的最佳战绩。截至目前，中国代表团以28金16银14铜的成绩暂列奖牌榜第二位。' :
                                    title.includes('潘展乐') ?
                                    '潘展乐在巴黎奥运会男子 100 米自由泳决赛中飙出 46 秒 40 的惊人成绩，打破世界纪录并夺得金牌，成为首位斩获该项目奥运冠军的亚洲选手。他以 1.08 秒的巨大优势夺冠，彻底打破欧美选手的长期垄断，创造了泳坛历史。' :
                                    title.includes('王楚钦&孙颖莎') ?
                                    '王楚钦 & 孙颖莎在巴黎奥运会乒乓球混双决赛中以 4-2 击败朝鲜组合，夺得国乒奥运历史上首枚混双金牌。两人场上频繁沟通、配合默契，关键局展现出超强调整能力和抗压韧性。':
                                    '黄雨婷和盛李豪在 10 米气步枪混合团体决赛中以 16-12 战胜韩国组合，夺得巴黎奥运会首金。他们在比分被追至 14-12 的关键时刻稳扎稳打，合力打出 21.5 环锁定胜局，展现了超强的默契与抗压能力。'}
                            </p>
                            <p style="margin-bottom: 15px;">
                                赛后，国家体育总局对运动员们的表现给予了高度评价，认为他们展现了中国运动员的良好精神风貌和高超的竞技水平。
                            </p>
                            <p>
                                接下来的比赛中，中国代表团还将在羽毛球、排球、游泳等项目上向金牌发起冲击，让我们继续为奥运健儿加油！
                            </p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(newsModal);
            
            // 显示弹窗
            newsModal.style.display = 'flex';
            
            // 关闭按钮
            const closeBtn = newsModal.querySelector('.close-modal');
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                newsModal.style.display = 'none';
                setTimeout(() => {
                    newsModal.remove();
                }, 300);
            });
            
            // 点击外部关闭
            newsModal.addEventListener('click', function(e) {
                if (e.target === newsModal) {
                    newsModal.style.display = 'none';
                    setTimeout(() => {
                        newsModal.remove();
                    }, 300);
                }
            });
        });
    });
}

// 初始化直播控制功能（添加到现有initLiveControls函数）
function initLiveControls() {
    const livePlayer = document.querySelector('.live-player');
    if (!livePlayer) return;
    
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressFilled = document.querySelector('.progress-filled');
    const volumeBtn = document.querySelector('.control-btn:nth-child(2)');
    const fullscreenBtn = document.querySelector('.control-btn:nth-child(4)');
    
    // 播放/暂停切换
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-pause')) {
                icon.classList.replace('fa-pause', 'fa-play');
                this.innerHTML = '<i class="fas fa-play"></i> 播放';
                // 模拟暂停
                document.querySelector('.loading-animation').style.display = 'none';
            } else {
                icon.classList.replace('fa-play', 'fa-pause');
                this.innerHTML = '<i class="fas fa-pause"></i> 暂停';
                // 模拟播放
                document.querySelector('.loading-animation').style.display = 'block';
            }
        });
    }
    
    // 进度条控制
    if (progressBar && progressFilled) {
        progressBar.addEventListener('click', function(e) {
            const scrubTime = (e.offsetX / this.offsetWidth) * 100;
            progressFilled.style.width = `${scrubTime}%`;
        });
    }
    
    // 音量控制模拟
    if (volumeBtn) {
        volumeBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-volume-up')) {
                icon.classList.replace('fa-volume-up', 'fa-volume-mute');
                this.innerHTML = '<i class="fas fa-volume-mute"></i> 静音';
            } else {
                icon.classList.replace('fa-volume-mute', 'fa-volume-up');
                this.innerHTML = '<i class="fas fa-volume-up"></i> 音量';
            }
        });
    }
    
    // 全屏控制
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            const videoContainer = document.querySelector('.live-player');
            if (!document.fullscreenElement) {
                videoContainer.requestFullscreen().catch(err => {
                    console.log(`全屏错误: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }
    
    // 模拟直播时间更新
    setInterval(() => {
        const liveTimeEl = document.querySelector('.live-time');
        if (liveTimeEl) {
            const timeText = liveTimeEl.textContent;
            const [hours, minutes, seconds] = timeText.match(/\d+/g).map(Number);
            
            let newSeconds = seconds + 1;
            let newMinutes = minutes;
            let newHours = hours;
            
            if (newSeconds >= 60) {
                newSeconds = 0;
                newMinutes++;
            }
            
            if (newMinutes >= 60) {
                newMinutes = 0;
                newHours++;
            }
            
            liveTimeEl.innerHTML = `<i class="fas fa-clock"></i> ${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        }
    }, 1000);
}

// 全局点击事件 - 关闭面板
document.addEventListener('click', function() {
    if (isMessagePanelOpen || isFeedbackPanelOpen) {
        closeAllPanels();
    }
});


// 初始化音量控制
const volumeSlider = document.querySelector('.volume-slider');
const volumeBtn = document.querySelector('.volume-btn');

if (volumeSlider && volumeBtn) {
    // 音量滑块事件
    volumeSlider.addEventListener('input', function() {
        const volume = this.value;
        // 这里可以添加实际控制视频音量的代码
        console.log('音量调整为:', volume + '%');
        
        // 更新音量图标
        if (volume == 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i> 音量';
        } else if (volume < 50) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i> 音量';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i> 音量';
        }
    });
}

// 初始化清晰度选择
const qualityOptions = document.querySelectorAll('.quality-option');
const qualityBtn = document.querySelector('.quality-btn');

qualityOptions.forEach(option => {
    option.addEventListener('click', function() {
        const quality = this.textContent;
        // 这里可以添加实际切换清晰度的代码
        console.log('切换清晰度为:', quality);
        
        // 更新按钮显示当前选中的清晰度
        qualityBtn.innerHTML = `<i class="fas fa-tv"></i> ${quality}`;
    });
});