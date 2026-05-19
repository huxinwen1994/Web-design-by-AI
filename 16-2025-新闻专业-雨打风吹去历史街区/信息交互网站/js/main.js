// 修复后的main.js - 包含所有核心功能
console.log('main.js已加载');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded触发');
    
    // ==================== 页面加载动画功能 ====================
    const pageLoader = document.getElementById('pageLoader');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    // 如果已经加载完成（可能是缓存），直接隐藏
    if (document.readyState === 'complete') {
        hideLoader();
        return;
    }
    
    // 模拟加载进度（0-100%）
    let progress = 0;
    const progressInterval = setInterval(function() {
        progress += Math.random() * 15 + 5; // 每次增加5-20%
        
        if (progress > 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        
        progressBar.style.width = progress + '%';
        progressText.textContent = Math.min(Math.round(progress), 100) + '%';
        
        // 当进度达到100%时，等一会儿再隐藏
        if (progress >= 100) {
            setTimeout(hideLoader, 500);
        }
    }, 200);
    
    // 真实加载完成事件
    window.addEventListener('load', function() {
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressText.textContent = '100%';
        setTimeout(hideLoader, 500);
    });
    
    // 如果加载时间过长（10秒），强制隐藏
    setTimeout(function() {
        hideLoader();
    }, 10000);
    
    function hideLoader() {
        if (pageLoader && !pageLoader.classList.contains('fade-out')) {
            pageLoader.classList.add('fade-out');
            
            // 动画结束后移除元素，释放资源
            setTimeout(function() {
                pageLoader.style.display = 'none';
            }, 1000);
        }
    }
    
    // ==================== 导航栏功能 ====================
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 固定导航栏滚动效果
    const fixedNav = document.querySelector('.fixed-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            fixedNav.classList.add('scrolled');
        } else {
            fixedNav.classList.remove('scrolled');
        }
        
        // 显示/隐藏返回顶部按钮
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // 汉堡菜单功能
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavBtns = document.querySelectorAll('.mobile-menu .nav-btn');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // 返回顶部功能
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==================== 滚动触发动画 ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.timeline-item, .featured-card, .tour-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // ==================== 轮播图功能 ====================
    const carousel = document.querySelector('.carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    const intervalTime = 5000;
    
    function initCarousel() {
        if (!carousel) return;
        
        updateCarousel();
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }, intervalTime);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
    }
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    initCarousel();
    
    // ==================== Tab切换功能 ====================
    const tabElements = document.querySelectorAll('.news-tab');
    
    tabElements.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(this, tabId);
        });
    });
    
    function switchTab(selectedTab, tabId) {
        // 重置所有Tab样式
        const tabs = document.querySelectorAll('.news-tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // 隐藏所有内容区域
        const contents = document.querySelectorAll('.news-content');
        contents.forEach(content => {
            content.classList.remove('active');
        });
        
        // 高亮当前Tab
        selectedTab.classList.add('active');
        
        // 显示对应内容区域
        const contentId = 'news-content-' + tabId;
        const targetContent = document.getElementById(contentId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    // ==================== 新闻标题点击计数（简单版） ====================
    document.addEventListener('DOMContentLoaded', function() {
        const counterElement = document.getElementById('click-counter');
        let clickCount = localStorage.getItem('newsClickCount') ? parseInt(localStorage.getItem('newsClickCount')) : 0;
        
        if (counterElement) {
            counterElement.textContent = clickCount;
        }
        
        // 为所有新闻标题内的链接添加点击事件
        const newsLinks = document.querySelectorAll('.news-title a');
        
        newsLinks.forEach(link => {
            link.addEventListener('click', function() {
                // 增加计数
                clickCount++;
                if (counterElement) {
                    counterElement.textContent = clickCount;
                }
                localStorage.setItem('newsClickCount', clickCount);
                
                // 保持原有链接，不修改跳转行为
                // 可以添加一些视觉反馈
                const originalColor = this.style.color;
                this.style.color = '#c17c54';
                
                setTimeout(() => {
                    this.style.color = originalColor;
                }, 300);
            });
        });
    });


    
    
    // ==================== 夜间模式切换功能 ====================
    const nightModeToggle = document.getElementById('nightModeToggle');
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        document.body.classList.add('night-mode');
        updateToggleButton(true);
    }
    
    // 切换按钮点击事件
    if (nightModeToggle) {
        nightModeToggle.addEventListener('click', function() {
            const isNightMode = document.body.classList.toggle('night-mode');
            
            // 保存用户偏好
            localStorage.setItem('theme', isNightMode ? 'night' : 'day');
            
            // 更新按钮文字和图标
            updateToggleButton(isNightMode);
            
            // 添加切换动画效果
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // 更新切换按钮的文字和图标
    function updateToggleButton(isNightMode) {
        if (nightModeToggle) {
            const icon = nightModeToggle.querySelector('i');
            const text = nightModeToggle.querySelector('span');
            
            if (isNightMode) {
                icon.className = 'fas fa-sun';
                text.textContent = '日间模式';
            } else {
                icon.className = 'fas fa-moon';
                text.textContent = '夜间模式';
            }
        }
    }
    
    console.log('所有功能初始化完成');
});

// ==================== 古建筑换装游戏 ====================
function changeBuildingColor(part, color, name) {
    console.log("点击颜色按钮:", part, color, name);
    
    if (part === 'roof') {
        const roofElement = document.getElementById('game-roof');
        if (roofElement) {
            roofElement.style.background = color;
        }
        
        const displayElement = document.getElementById('display-roof');
        if (displayElement) {
            displayElement.textContent = name;
            displayElement.style.color = color;
        }
    }
    else if (part === 'wall') {
        const wallElement = document.getElementById('game-wall');
        if (wallElement) {
            wallElement.style.background = color;
        }
        
        const displayElement = document.getElementById('display-wall');
        if (displayElement) {
            displayElement.textContent = name;
            displayElement.style.color = color;
        }
    }
    else if (part === 'door') {
        const doorElement = document.getElementById('game-door');
        if (doorElement) {
            doorElement.style.background = color;
        }
        
        const leftWindow = document.getElementById('game-window-left');
        const rightWindow = document.getElementById('game-window-right');
        if (leftWindow) leftWindow.style.background = color;
        if (rightWindow) rightWindow.style.background = color;
        
        const displayElement = document.getElementById('display-door');
        if (displayElement) {
            displayElement.textContent = name;
            displayElement.style.color = color;
        }
    }
    
    showSuccessMessage(`已更改为：${name}`);
}

function resetBuildingColors() {
    console.log("重置所有颜色");
    
    const roofElement = document.getElementById('game-roof');
    if (roofElement) roofElement.style.background = '#8c6d46';
    
    const wallElement = document.getElementById('game-wall');
    if (wallElement) wallElement.style.background = '#f8f4e9';
    
    const doorElement = document.getElementById('game-door');
    const leftWindow = document.getElementById('game-window-left');
    const rightWindow = document.getElementById('game-window-right');
    if (doorElement) doorElement.style.background = '#3a2e1e';
    if (leftWindow) leftWindow.style.background = '#3a2e1e';
    if (rightWindow) rightWindow.style.background = '#3a2e1e';
    
    const displayRoof = document.getElementById('display-roof');
    const displayWall = document.getElementById('display-wall');
    const displayDoor = document.getElementById('display-door');
    
    if (displayRoof) {
        displayRoof.textContent = '青瓦顶';
        displayRoof.style.color = '#8c6d46';
    }
    if (displayWall) {
        displayWall.textContent = '白墙';
        displayWall.style.color = '#8c6d46';
    }
    if (displayDoor) {
        displayDoor.textContent = '黑木门';
        displayDoor.style.color = '#8c6d46';
    }
    
    showSuccessMessage('颜色已重置为默认！');
}

function randomBuildingColors() {
    console.log("生成随机搭配");
    
    const roofColors = [
        {color: '#8c6d46', name: '青瓦顶'},
        {color: '#c17c54', name: '琉璃瓦'},
        {color: '#3a2e1e', name: '黑瓦顶'},
        {color: '#d4bf9d', name: '黄瓦顶'},
        {color: '#a52a2a', name: '红瓦顶'}
    ];
    
    const wallColors = [
        {color: '#f8f4e9', name: '白墙'},
        {color: '#e6d2b5', name: '米黄墙'},
        {color: '#d9c3a9', name: '土黄墙'},
        {color: '#b09f8d', name: '灰墙'},
        {color: '#8c7b6b', name: '青砖墙'}
    ];
    
    const doorColors = [
        {color: '#3a2e1e', name: '黑木门'},
        {color: '#8c6d46', name: '原木门'},
        {color: '#c17c54', name: '朱红门'},
        {color: '#2c3e50', name: '青灰门'},
        {color: '#7b3f00', name: '深棕门'}
    ];
    
    const randomRoof = roofColors[Math.floor(Math.random() * roofColors.length)];
    const randomWall = wallColors[Math.floor(Math.random() * wallColors.length)];
    const randomDoor = doorColors[Math.floor(Math.random() * doorColors.length)];
    
    changeBuildingColor('roof', randomRoof.color, randomRoof.name);
    changeBuildingColor('wall', randomWall.color, randomWall.name);
    changeBuildingColor('door', randomDoor.color, randomDoor.name);
    
    showSuccessMessage(`随机搭配完成！<br>屋顶：${randomRoof.name}<br>墙体：${randomWall.name}<br>门窗：${randomDoor.name}`);
}

function showSuccessMessage(message) {
    const messageElement = document.getElementById('success-message');
    if (messageElement) {
        messageElement.innerHTML = message;
        messageElement.style.display = 'block';
        
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000);
    } else {
        alert(message.replace(/<br>/g, '\n'));
    }
}

console.log('main.js加载完成');

// === 修复版漫步交互逻辑 ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('漫步板块加载中...');
    
    // 节点数据
    const nodesData = [
        {
            title: "明清牌坊",
            era: "明清风貌",
            description: "这座石牌坊建于明朝万历年间（1573-1620），是古代科举制度的珍贵见证。牌坊高8米，采用当地青石雕刻而成，上有'文光射斗'四字，寓意文采照耀北斗星。",
            year: "明·万历年间",
            location: "街区入口广场",
            value: "科举文化重要载体"
        },
        {
            title: "百年戏台",
            era: "清代建筑",
            description: "这座木结构戏台始建于清光绪年间（1875-1908），是江南地区保存最完整的古戏台之一。戏台采用榫卯结构，不用一钉一铆。",
            year: "清·光绪年间",
            location: "街区中心广场",
            value: "传统戏曲活态传承"
        },
        {
            title: "古街商号",
            era: "商贸记忆",
            description: "这条石板街两侧分布着三十多家明清时期的商铺旧址，包括当铺、药铺、绸缎庄、茶楼等。每家商号的门面都保留着历史原貌。",
            year: "明清时期",
            location: "主街两侧",
            value: "古代商业文化实证"
        },
        {
            title: "宗祠建筑",
            era: "家族文化",
            description: "这座三进式宗祠建于清乾隆年间，是该姓氏家族的祭祀场所。建筑采用硬山顶式，梁柱雕有'二十四孝'故事。",
            year: "清·乾隆年间",
            location: "街区东北角",
            value: "宗族文化建筑典范"
        },
        {
            title: "古树名木",
            era: "自然遗产",
            description: "这棵古榕树已有320多年树龄，树冠如盖，覆盖面积达200平方米。相传为清初种植，见证了街区的历史变迁。",
            year: "清·康熙年间",
            location: "街区南端",
            value: "生态历史活见证"
        }
    ];
    
    // 游戏状态
    const walkState = {
        isWalking: false,
        isPaused: false,
        isAutoFast: false,
        currentNode: 0,
        progress: 0,
        animationId: null,
        startTime: null,
        nodesReached: []
    };
    
    // 获取DOM元素
    const elements = {
        walker: document.getElementById('walker'),
        progressFill: document.getElementById('walk-progress'),
        progressText: document.getElementById('progress-text'),
        distanceText: document.getElementById('distance-text'),
        startBtn: document.getElementById('start-walk-btn'),
        pauseBtn: document.getElementById('pause-walk-btn'),
        resetBtn: document.getElementById('reset-walk-btn'),
        autoBtn: document.getElementById('auto-walk-btn'),
        nodeDetail: document.getElementById('node-detail'),
        nodeTitle: document.getElementById('node-title'),
        nodeEra: document.getElementById('node-era'),
        nodeDescription: document.getElementById('node-description'),
        nodeYear: document.getElementById('node-year'),
        nodeLocation: document.getElementById('node-location'),
        nodeValue: document.getElementById('node-value'),
        nodes: document.querySelectorAll('.timeline-node')
    };
    
    // 初始化显示
    updateNodeInfo(-1);
    
    // 计算小人在S形路径上的位置
    function calculateWalkerPosition(progress) {
        // 将0-100的进度转换为0-1
        const t = progress / 100;
        
        // S形曲线参数
        let x, y;
        
        if (t <= 0.25) {
            // 第一段：向右弯曲
            const t1 = t * 4;
            x = 0.5 + (t1 * 0.3);
            y = t1 * 0.2;
        } else if (t <= 0.5) {
            // 第二段：向左弯曲
            const t1 = (t - 0.25) * 4;
            x = 0.8 - (t1 * 0.3);
            y = 0.2 + (t1 * 0.25);
        } else if (t <= 0.75) {
            // 第三段：向右弯曲
            const t1 = (t - 0.5) * 4;
            x = 0.5 + (t1 * 0.3);
            y = 0.45 + (t1 * 0.25);
        } else {
            // 第四段：向左回中
            const t1 = (t - 0.75) * 4;
            x = 0.8 - (t1 * 0.3);
            y = 0.7 + (t1 * 0.2);
        }
        
        // 转换为百分比
        const leftPercent = x * 100;
        const topPercent = 5 + (y * 80); // 从5%开始，总高度80%
        
        return { left: leftPercent, top: topPercent };
    }
    
    // 开始漫步
    function startWalking() {
        if (walkState.isWalking) return;
        
        console.log('开始漫步');
        
        walkState.isWalking = true;
        walkState.isPaused = false;
        walkState.startTime = Date.now();
        
        // 更新按钮状态
        elements.startBtn.style.display = 'none';
        elements.pauseBtn.style.display = 'flex';
        
        // 开始动画循环
        animateWalk();
    }
    
    // 漫步动画
    function animateWalk() {
        if (!walkState.isWalking || walkState.isPaused) return;
        
        // 计算经过的时间（秒）
        const elapsedTime = (Date.now() - walkState.startTime) / 1000;
        
        // 计算进度
        const speed = walkState.isAutoFast ? 0.02 : 0.01; // 快速模式0.02，正常0.01
        walkState.progress = Math.min(elapsedTime * speed * 100, 100);
        
        // 更新UI
        updateProgress();
        
        // 检查节点到达
        checkNodes();
        
        // 继续或结束
        if (walkState.progress < 100) {
            walkState.animationId = requestAnimationFrame(animateWalk);
        } else {
            finishWalking();
        }
    }
    
    // 更新进度显示
    function updateProgress() {
        // 更新进度条
        elements.progressFill.style.width = walkState.progress + '%';
        elements.progressText.textContent = `漫步进度: ${Math.floor(walkState.progress)}%`;
        elements.distanceText.textContent = `已行走: ${Math.floor(500 * walkState.progress / 100)}米`;
        
        // 更新小人位置
        const pos = calculateWalkerPosition(walkState.progress);
        elements.walker.style.left = pos.left + '%';
        elements.walker.style.top = pos.top + '%';
        
        console.log('位置更新:', pos);
    }
    
    // 检查节点
    function checkNodes() {
        // 节点触发点（进度百分比）
        const nodeTriggers = [10, 30, 50, 70, 90];
        
        nodeTriggers.forEach((trigger, index) => {
            if (walkState.progress >= trigger && !walkState.nodesReached.includes(index)) {
                activateNode(index);
                walkState.nodesReached.push(index);
            }
        });
    }
    
    // 激活节点
    function activateNode(index) {
        if (index >= elements.nodes.length) return;
        
        // 激活节点视觉
        const node = elements.nodes[index];
        node.classList.add('active');
        
        // 更新节点信息
        updateNodeInfo(index);
        
        // 添加脉冲动画
        node.style.animation = 'none';
        setTimeout(() => {
            node.style.animation = 'nodeGlow 2s infinite alternate';
        }, 10);
    }
    
    // 更新节点信息
    function updateNodeInfo(index) {
        if (index === -1) {
            // 初始状态
            elements.nodeTitle.textContent = '欢迎开始文化漫步';
            elements.nodeEra.textContent = '准备出发';
            elements.nodeDescription.textContent = '点击"开始漫步"按钮，跟随文化使者探访历史文化街区的精彩节点';
            elements.nodeYear.textContent = '-';
            elements.nodeLocation.textContent = '-';
            elements.nodeValue.textContent = '-';
        } else if (index < nodesData.length) {
            const data = nodesData[index];
            elements.nodeTitle.textContent = data.title;
            elements.nodeEra.textContent = data.era;
            elements.nodeDescription.textContent = data.description;
            elements.nodeYear.textContent = data.year;
            elements.nodeLocation.textContent = data.location;
            elements.nodeValue.textContent = data.value;
        }
    }
    
    // 暂停/继续
    function togglePause() {
        if (!walkState.isWalking) return;
        
        walkState.isPaused = !walkState.isPaused;
        
        if (walkState.isPaused) {
            elements.pauseBtn.innerHTML = '<span class="btn-icon">▶️</span><span class="btn-text">继续漫步</span>';
            cancelAnimationFrame(walkState.animationId);
        } else {
            elements.pauseBtn.innerHTML = '<span class="btn-icon">⏸️</span><span class="btn-text">暂停漫步</span>';
            walkState.startTime = Date.now() - (walkState.progress / (walkState.isAutoFast ? 0.02 : 0.01) * 100);
            animateWalk();
        }
    }
    
    // 重置漫步
    function resetWalking() {
        if (walkState.isWalking && !confirm('确定要重新开始吗？当前进度将丢失。')) {
            return;
        }
        
        console.log('重置漫步');
        
        // 停止动画
        if (walkState.animationId) {
            cancelAnimationFrame(walkState.animationId);
        }
        
        // 重置状态
        walkState.isWalking = false;
        walkState.isPaused = false;
        walkState.currentNode = 0;
        walkState.progress = 0;
        walkState.nodesReached = [];
        walkState.animationId = null;
        
        // 重置UI
        elements.startBtn.style.display = 'flex';
        elements.pauseBtn.style.display = 'none';
        elements.pauseBtn.innerHTML = '<span class="btn-icon">⏸️</span><span class="btn-text">暂停漫步</span>';
        
        // 重置进度
        updateProgress();
        
        // 重置节点
        elements.nodes.forEach(node => {
            node.classList.remove('active');
        });
        
        // 重置信息
        updateNodeInfo(-1);
        
        // 重置小人位置
        const pos = calculateWalkerPosition(0);
        elements.walker.style.left = pos.left + '%';
        elements.walker.style.top = pos.top + '%';
    }
    
    // 切换快速模式
    function toggleAutoMode() {
        walkState.isAutoFast = !walkState.isAutoFast;
        
        if (walkState.isAutoFast) {
            elements.autoBtn.innerHTML = '<span class="btn-icon">🐢</span><span class="btn-text">正常模式</span>';
            elements.autoBtn.style.background = 'linear-gradient(135deg, #8b5a2b, #a98760)';
            elements.autoBtn.style.color = 'white';
        } else {
            elements.autoBtn.innerHTML = '<span class="btn-icon">⚡</span><span class="btn-text">快速模式</span>';
            elements.autoBtn.style.background = 'linear-gradient(135deg, #d4b483, #f0e8d8)';
            elements.autoBtn.style.color = '#8b5a2b';
        }
        
        // 如果正在漫步，调整时间基准
        if (walkState.isWalking && !walkState.isPaused) {
            walkState.startTime = Date.now() - (walkState.progress / (walkState.isAutoFast ? 0.02 : 0.01) * 100);
        }
    }
    
    // 完成漫步
    function finishWalking() {
        console.log('漫步完成');
        
        walkState.isWalking = false;
        
        // 更新按钮
        elements.startBtn.style.display = 'flex';
        elements.startBtn.innerHTML = '<span class="btn-icon">🔄</span><span class="btn-text">重新开始</span>';
        elements.pauseBtn.style.display = 'none';
        
        // 显示完成信息
        elements.nodeTitle.textContent = '漫步完成！';
        elements.nodeEra.textContent = '探索结束';
        elements.nodeDescription.textContent = '恭喜您完成了历史文化街区的虚拟漫步！您已探访了所有重要文化节点，希望这次体验让您对历史文化有了更深的了解。';
        elements.nodeYear.textContent = '今日';
        elements.nodeLocation.textContent = '全程';
        elements.nodeValue.textContent = '文化体验完成';
        
        // 小人庆祝
        celebrateCompletion();
    }
    
    // 庆祝完成
    function celebrateCompletion() {
        elements.walker.style.animation = 'none';
        
        setTimeout(() => {
            elements.walker.style.animation = 'bounce 0.5s ease 3';
            
            // 临时添加弹跳动画
            const style = document.createElement('style');
            style.textContent = `
                @keyframes bounce {
                    0%, 100% { transform: translate(-50%, 0); }
                    50% { transform: translate(-50%, -15px); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.head.removeChild(style);
            }, 1500);
        }, 10);
    }
    
    // 节点点击事件
    function setupNodeEvents() {
        elements.nodes.forEach((node, index) => {
            node.addEventListener('click', () => {
                if (index < nodesData.length) {
                    updateNodeInfo(index);
                    
                    // 临时激活显示
                    node.classList.add('active');
                    setTimeout(() => {
                        if (!walkState.nodesReached.includes(index)) {
                            node.classList.remove('active');
                        }
                    }, 3000);
                }
            });
        });
    }
    
    // 绑定事件
    function bindEvents() {
        console.log('绑定事件...');
        
        // 开始按钮
        elements.startBtn.addEventListener('click', startWalking);
        
        // 暂停按钮
        elements.pauseBtn.addEventListener('click', togglePause);
        
        // 重置按钮
        elements.resetBtn.addEventListener('click', resetWalking);
        
        // 快速模式按钮
        elements.autoBtn.addEventListener('click', toggleAutoMode);
        
        // 节点点击事件
        setupNodeEvents();
        
        // 键盘控制
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ':
                case 'Spacebar':
                    e.preventDefault();
                    if (walkState.isWalking) {
                        togglePause();
                    } else {
                        startWalking();
                    }
                    break;
                case 'r':
                case 'R':
                    resetWalking();
                    break;
                case 'a':
                case 'A':
                    toggleAutoMode();
                    break;
            }
        });
        
        console.log('事件绑定完成');
    }
    
    // 初始化
    function init() {
        console.log('初始化漫步板块...');
        bindEvents();
        console.log('漫步板块初始化完成！');
    }
    
    // 开始初始化
    init();
});


// === 历史文化知识问答游戏 ===
function initSimpleQuizGame() {
    console.log("初始化简单版知识问答游戏...");
    
    // 题目数据库（10道题）
    const questions = [
        {
            question: "下列哪个是北京最著名的胡同文化街区？",
            options: ["南锣鼓巷", "王府井", "三里屯", "中关村"],
            correct: 0,
            explanation: "南锣鼓巷是北京最古老的街区之一，完整保存着元代胡同院落肌理，是胡同文化的代表。"
        },
        {
            question: "苏州平江路历史街区以什么特色闻名？",
            options: ["小桥流水", "欧式建筑", "现代艺术", "工业遗产"],
            correct: 0,
            explanation: "平江路完整保留了'水陆并行、河街相邻'的双棋盘格局，是典型的小桥流水江南水乡风貌。"
        },
        {
            question: "成都宽窄巷子最早是什么人修建的？",
            options: ["清代满族八旗官兵", "明代商人", "宋代文人", "民国军阀"],
            correct: 0,
            explanation: "宽窄巷子由宽巷子、窄巷子和井巷子组成，是清代满城遗留下来的较成规模的古街道。"
        },
        {
            question: "下列哪个不是历史街区保护的原则？",
            options: ["修旧如旧", "整体保护", "推倒重建", "活态传承"],
            correct: 2,
            explanation: "历史街区保护反对'推倒重建'，强调在保持原有风貌的基础上进行适当修缮。"
        },
        {
            question: "广州永庆坊位于哪个区域？",
            options: ["西关", "东山", "天河", "越秀"],
            correct: 0,
            explanation: "永庆坊位于广州最美骑楼街——荔湾区恩宁路，是极具广州都市人文底蕴的西关旧址地域。"
        },
        {
            question: "哈尔滨中央大街的建筑风格主要是？",
            options: ["欧式建筑", "中式建筑", "日式建筑", "现代建筑"],
            correct: 0,
            explanation: "中央大街汇集��文艺复兴、巴洛克、折衷主义及现代多种风格的欧式建筑，被誉为'建筑艺术博物馆'。"
        },
        {
            question: "历史街区的'活态保护'指的是什么？",
            options: ["保留原有的社会功能和生活气息", "全部改成博物馆", "只保护建筑外观", "禁止居民居住"],
            correct: 0,
            explanation: "活态保护强调在保护物质文化遗产的同时，也要传承非物质文化遗产，保留社区原有的社会结构和生活方式。"
        },
        {
            question: "福州三坊七巷的'三坊'不包括以下哪个？",
            options: ["衣锦坊", "文儒坊", "光禄坊", "安民巷"],
            correct: 3,
            explanation: "三坊七巷的'三坊'指衣锦坊、文儒坊、光禄坊；'七巷'指杨桥巷、郎官巷、塔巷、黄巷、安民巷、宫巷、吉庇巷。"
        },
        {
            question: "中国第一部专门针对历史街区保护的地方性法规是针对哪个街区的？",
            options: ["黄山市屯溪老街", "北京南锣鼓巷", "苏州平江路", "成都宽窄巷子"],
            correct: 0,
            explanation: "1997年《黄山市屯溪老街保护管理办法》出台，是中国第一部专门针对历史街区���护的地方性法规。"
        },
        {
            question: "下列哪个历史街区以'明清县城活标本'著称？",
            options: ["平遥古城", "凤凰古城", "丽江古城", "阆中古城"],
            correct: 0,
            explanation: "平遥古城是中国现存最为完整的明清县城，街巷格局、建筑风貌保留完整，被誉为'中国古代城市的活标本'。"
        }
    ];
    
    // 游戏状态
    let gameState = {
        currentQuestion: 0,
        score: 0,
        correctCount: 0,
        userAnswers: [],
        isPlaying: false,
        startTime: null,
        endTime: null
    };
    
    // 获取DOM元素
    const elements = {
        startBtn: document.getElementById('start-quiz-btn'),
        resetBtn: document.getElementById('reset-quiz-btn'),
        questionDisplay: document.getElementById('question-display'),
        feedbackArea: document.getElementById('feedback-area'),
        resultArea: document.getElementById('result-area'),
        currentScore: document.getElementById('current-score'),
        questionProgress: document.getElementById('question-progress'),
        accuracyRate: document.getElementById('accuracy-rate'),
        questionNumber: document.getElementById('question-number'),
        questionText: document.getElementById('question-text'),
        optionsContainer: document.querySelector('.options-container'),
        feedbackResult: document.getElementById('feedback-result'),
        feedbackExplanation: document.getElementById('feedback-explanation'),
        nextQuestionBtn: document.getElementById('next-question-btn'),
        finalScore: document.getElementById('final-score'),
        finalAccuracy: document.getElementById('final-accuracy'),
        timeUsed: document.getElementById('time-used'),
        highScore: document.getElementById('high-score'),
        playAgainBtn: document.getElementById('play-again-btn'),
        shareResultBtn: document.getElementById('share-result-btn')
    };
    
    // 从本地存储获取最高分
    let highScore = localStorage.getItem('quizHighScore') || 0;
    if (elements.highScore) elements.highScore.textContent = highScore + '分';
    
    // 开始游戏
    function startGame() {
        console.log("开始游戏");
        
        // 重置游戏状态
        gameState = {
            currentQuestion: 0,
            score: 0,
            correctCount: 0,
            userAnswers: [],
            isPlaying: true,
            startTime: Date.now()
        };
        
        // 更新UI
        updateUI();
        
        // 显示第一题
        showQuestion();
        
        // 隐藏其他区域
        elements.feedbackArea.style.display = 'none';
        elements.resultArea.style.display = 'none';
        elements.questionDisplay.style.display = 'block';
        
        // 更新按钮文字
        elements.startBtn.textContent = '游戏中...';
        elements.startBtn.style.background = '#8c7b6b';
    }
    
    // 重置游戏
    function resetGame() {
        if (confirm('确定要重新开始吗？当前进度将丢失。')) {
            startGame();
        }
    }
    
    // 显示题目
    function showQuestion() {
        const question = questions[gameState.currentQuestion];
        
        // 更新题目信息
        elements.questionNumber.textContent = gameState.currentQuestion + 1;
        elements.questionText.textContent = question.question;
        elements.questionProgress.textContent = `${gameState.currentQuestion + 1}/${questions.length}`;
        
        // 清空选项容器
        elements.optionsContainer.innerHTML = '';
        
        // 生成选项按钮
        const letters = ['A', 'B', 'C', 'D'];
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.innerHTML = `
                <div class="option-letter">${letters[index]}</div>
                ${option}
            `;
            
            // 添加点击事件
            button.addEventListener('click', () => selectAnswer(index));
            
            elements.optionsContainer.appendChild(button);
        });
        
        // 更新准确率
        updateAccuracy();
    }
    
    // 选择答案
    function selectAnswer(answerIndex) {
        if (!gameState.isPlaying) return;
        
        const question = questions[gameState.currentQuestion];
        const isCorrect = answerIndex === question.correct;
        
        // 记录用户答案
        gameState.userAnswers.push({
            questionIndex: gameState.currentQuestion,
            selected: answerIndex,
            correct: question.correct,
            isCorrect: isCorrect
        });
        
        // 更新分数
        if (isCorrect) {
            gameState.score += 10;
            gameState.correctCount++;
        }
        
        // 显示反馈
        showFeedback(isCorrect, answerIndex);
        
        // 更新UI
        updateUI();
    }
    
    // 显示反馈
    function showFeedback(isCorrect, selectedIndex) {
        const question = questions[gameState.currentQuestion];
        const letters = ['A', 'B', 'C', 'D'];
        
        // 标记正确和错误答案
        document.querySelectorAll('.option-btn').forEach((btn, index) => {
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                btn.classList.add('wrong');
            }
            btn.classList.add('selected');
        });
        
        // 显示反馈内容
        elements.feedbackResult.innerHTML = isCorrect ? 
            '✅ 回答正确！+10分' : '❌ 回答错误';
        
        elements.feedbackExplanation.innerHTML = `
            <div style="margin-bottom: 10px;">正确答案：${letters[question.correct]} - ${question.options[question.correct]}</div>
            <div>${question.explanation}</div>
        `;
        
        // 显示反馈区域
        elements.feedbackArea.style.display = 'block';
        
        // 禁用选项按钮
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
        });
    }
    
    // 下一题
    function nextQuestion() {
        gameState.currentQuestion++;
        
        // 如果还有题目，显示下一题
        if (gameState.currentQuestion < questions.length) {
            // 隐藏反馈
            elements.feedbackArea.style.display = 'none';
            
            // 显示下一题
            showQuestion();
        } else {
            // 游戏结束
            finishGame();
        }
    }
    
    // 完成游戏
    function finishGame() {
        gameState.isPlaying = false;
        gameState.endTime = Date.now();
        
        // 计算用时
        const timeUsed = Math.floor((gameState.endTime - gameState.startTime) / 1000);
        
        // 计算准确率
        const accuracy = Math.round((gameState.correctCount / questions.length) * 100);
        
        // 更新最高分
        if (gameState.score > highScore) {
            highScore = gameState.score;
            localStorage.setItem('quizHighScore', highScore);
        }
        
        // 显示结果
        elements.questionDisplay.style.display = 'none';
        elements.feedbackArea.style.display = 'none';
        elements.resultArea.style.display = 'block';
        
        // 更新结果数据
        elements.finalScore.textContent = gameState.score;
        elements.finalAccuracy.textContent = accuracy + '%';
        elements.timeUsed.textContent = timeUsed + '秒';
        elements.highScore.textContent = highScore + '分';
        
        // 重置开始按钮
        elements.startBtn.textContent = '开始挑战';
        elements.startBtn.style.background = '#8c6d46';
    }
    
    // 再玩一次
    function playAgain() {
        startGame();
    }
    
    // 分享成绩
    function shareResult() {
        const accuracy = Math.round((gameState.correctCount / questions.length) * 100);
        const shareText = `我在历史文化知识问答中获得了${gameState.score}分，正确率${accuracy}%！快来测试你的知识吧！`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('成绩已复制到剪贴板！快去分享吧！');
            }).catch(() => {
                prompt('复制以下文本分享给朋友：', shareText);
            });
        } else {
            prompt('复制以下文本分享给朋友：', shareText);
        }
    }
    
    // 更新UI
    function updateUI() {
        // 更新分数
        elements.currentScore.textContent = gameState.score;
        
        // 更新准确率
        updateAccuracy();
    }
    
    // 更新准确率
    function updateAccuracy() {
        const totalAnswered = gameState.userAnswers.length;
        if (totalAnswered > 0) {
            const currentCorrect = gameState.userAnswers.filter(a => a.isCorrect).length;
            const accuracy = Math.round((currentCorrect / totalAnswered) * 100);
            elements.accuracyRate.textContent = accuracy + '%';
        } else {
            elements.accuracyRate.textContent = '0%';
        }
    }
    
    // 绑定事件
    function bindEvents() {
        // 开始按钮
        if (elements.startBtn) {
            elements.startBtn.addEventListener('click', startGame);
        }
        
        // 重置按钮
        if (elements.resetBtn) {
            elements.resetBtn.addEventListener('click', resetGame);
        }
        
        // 下一题按钮
        if (elements.nextQuestionBtn) {
            elements.nextQuestionBtn.addEventListener('click', nextQuestion);
        }
        
        // 再玩一次按钮
        if (elements.playAgainBtn) {
            elements.playAgainBtn.addEventListener('click', playAgain);
        }
        
        // 分享按钮
        if (elements.shareResultBtn) {
            elements.shareResultBtn.addEventListener('click', shareResult);
        }
        
        console.log("事件绑定完成");
    }
    
    // 初始化游戏
    function init() {
        console.log("游戏初始化中...");
        
        // 绑定事件
        bindEvents();
        
        // 初始UI状态
        elements.questionDisplay.style.display = 'none';
        elements.feedbackArea.style.display = 'none';
        elements.resultArea.style.display = 'none';
        
        console.log("简单版知识问答游戏初始化完成！");
    }
    
    // 页面加载后初始化
    setTimeout(init, 100);
}

// 在DOMContentLoaded中调用
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initSimpleQuizGame, 300);
    });
} else {
    setTimeout(initSimpleQuizGame, 300);
}

// 初始化问答游戏
initSimpleQuizGame();

// 反馈按钮动画效果
function initFeedbackAnimation() {
    console.log("初始化反馈动画...");
    
    // 监听反馈发送按钮点击事件
    // 假设你的反馈按钮有以下几种可能的ID或类名
    const feedbackButtonSelectors = [
        '#feedback-submit',           // ID选择器
        '.feedback-submit',           // 类选择器
        '.submit-feedback',           // 另一种类选择器
        'button[type="submit"]',      // 提交类型按钮
        'button:contains("发送")'      // 包含"发送"文字的按钮
    ];
    
    let feedbackButton = null;
    
    // 尝试查找反馈按钮
    feedbackButtonSelectors.forEach(selector => {
        if (!feedbackButton) {
            const btn = document.querySelector(selector);
            if (btn) {
                feedbackButton = btn;
                console.log(`找到反馈按钮: ${selector}`);
            }
        }
    });
    
    // 如果没找到特定按钮，可以尝试其他方式
    if (!feedbackButton) {
        // 查找包含"反馈"相关文字的按钮
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(btn => {
            if (!feedbackButton && (
                btn.textContent.includes('反馈') || 
                btn.textContent.includes('发送') ||
                btn.textContent.includes('submit') ||
                btn.textContent.toLowerCase().includes('feedback')
            )) {
                feedbackButton = btn;
                console.log('通过文本内容找到反馈按钮');
            }
        });
    }
    
    // 如果还是没找到，手动创建一个提示
    if (!feedbackButton) {
        console.warn('未找到反馈按钮，请检查按钮选择器');
        return;
    }
    
    // 添加点击事件监听
    feedbackButton.addEventListener('click', function(event) {
        // 如果按钮在表单中，可能需要延迟执行
        if (this.type === 'submit') {
            event.preventDefault(); // 先阻止默认提交行为
            showThankYouAnimation(this);
            
            // 实际项目中可能需要在这里处理表单提交
            setTimeout(() => {
                // 这里可以添加实际提交表单的代码
                // 例如: this.form.submit();
                console.log('模拟表单提交');
            }, 2000);
        } else {
            // 如果不是提交按钮，直接显示动画
            showThankYouAnimation(this);
        }
    });
    
    console.log("反馈按钮动画初始化完成");
}

// 显示感谢动画
function showThankYouAnimation(button) {
    console.log("显示感谢动画");
    
    // 保存按钮原始文本和状态
    const originalText = button.innerHTML;
    const originalBackground = button.style.background;
    const originalColor = button.style.color;
    
    // 1. 显示感谢提示
    button.innerHTML = '感谢反馈！';
    button.style.background = '#4CAF50';
    button.style.color = 'white';
    button.style.transition = 'all 0.3s ease';
    
    // 2. 创建飞机动画
    createPlaneAnimation(button);
    
    // 3. 恢复按钮状态（2秒后）
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = originalBackground;
        button.style.color = originalColor;
    }, 2000);
}

// 创建飞机飞行动画
function createPlaneAnimation(button) {
    // 获取按钮位置
    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    // 创建飞机元素
    const plane = document.createElement('div');
    plane.innerHTML = '✈️';
    plane.style.cssText = `
        position: fixed;
        font-size: 24px;
        z-index: 9999;
        left: ${buttonCenterX}px;
        top: ${buttonCenterY}px;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        pointer-events: none;
    `;
    
    document.body.appendChild(plane);
    
    // 强制重绘，确保初始状态应用
    plane.offsetHeight;
    
    // 开始动画
    setTimeout(() => {
        // 飞到屏幕右上角
        plane.style.opacity = '1';
        plane.style.left = 'calc(100vw - 50px)';
        plane.style.top = '20px';
        plane.style.fontSize = '40px';
        plane.style.transform = 'translate(0, 0) rotate(15deg)';
        
        // 同时创建飞行轨迹（可选）
        createFlightTrail(plane, buttonCenterX, buttonCenterY);
    }, 50);
    
    // 动画结束后移除飞机
    setTimeout(() => {
        plane.style.opacity = '0';
        setTimeout(() => {
            if (plane.parentNode) {
                plane.parentNode.removeChild(plane);
            }
        }, 1000);
    }, 2000);
}

// 创建飞行轨迹（可选增强效果）
function createFlightTrail(plane, startX, startY) {
    const trailCount = 10;
    const trailElements = [];
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.innerHTML = '✨';
        trail.style.cssText = `
            position: fixed;
            font-size: 12px;
            z-index: 9998;
            left: ${startX}px;
            top: ${startY}px;
            opacity: 0;
            transition: all ${1 + i * 0.1}s ease-out;
            pointer-events: none;
        `;
        document.body.appendChild(trail);
        trailElements.push(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0.8';
            trail.style.left = `${startX + (i * 20)}px`;
            trail.style.top = `${startY - (i * 15)}px`;
            
            // 渐隐
            setTimeout(() => {
                trail.style.opacity = '0';
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 500);
            }, 500);
        }, i * 50);
    }
}

// 替代方案：更简单的版本（如果上面的太复杂）
function simpleFeedbackAnimation() {
    console.log("使用简化版反馈动画");
    
    // 直接查找所有可能的反馈按钮
    const possibleButtons = [
        document.querySelector('#feedback-submit'),
        document.querySelector('.feedback-submit'),
        document.querySelector('.submit-btn'),
        document.querySelector('button[onclick*="feedback"]'),
        document.querySelector('button[onclick*="submit"]')
    ].filter(btn => btn); // 过滤掉null值
    
    possibleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 防止重复绑定
            if (this.getAttribute('data-animated')) return;
            this.setAttribute('data-animated', 'true');
            
            // 显示简单感谢提示
            simpleThankYouEffect(this);
            
            // 防止表单立即提交（如果是表单按钮）
            if (this.type === 'submit') {
                e.preventDefault();
                
                // 延迟提交
                setTimeout(() => {
                    if (this.form) {
                        this.form.submit();
                    }
                }, 1500);
            }
        });
    });
}

// 简化版感谢效果
function simpleThankYouEffect(button) {
    const originalText = button.textContent;
    
    // 1. 改变按钮文字
    button.textContent = '感谢反馈 ✈️';
    button.style.background = '#2196F3';
    button.style.color = 'white';
    button.style.transition = 'all 0.3s ease';
    
    // 2. 创建简单飞机飞出效果
    const plane = document.createElement('span');
    plane.textContent = '✈️';
    plane.style.cssText = `
        position: absolute;
        font-size: 20px;
        margin-left: 5px;
        display: inline-block;
        animation: flyAway 1.5s forwards;
    `;
    
    // 添加CSS动画关键帧
    if (!document.querySelector('#flyAwayStyle')) {
        const style = document.createElement('style');
        style.id = 'flyAwayStyle';
        style.textContent = `
            @keyframes flyAway {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(100px, -100px) scale(1.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.appendChild(plane);
    
    // 3. 恢复按钮状态
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.color = '';
        
        // 移除飞机元素
        if (plane.parentNode) {
            plane.parentNode.removeChild(plane);
        }
    }, 1500);
}

// 页面加载后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // 先尝试完整版动画
        initFeedbackAnimation();
        
        // 如果没找到按钮，等待一小段时间再尝试简化版
        setTimeout(() => {
            const anyButton = document.querySelector('#feedback-submit, .feedback-submit');
            if (!anyButton) {
                simpleFeedbackAnimation();
            }
        }, 500);
    });
} else {
    setTimeout(() => {
        initFeedbackAnimation();
        setTimeout(() => {
            const anyButton = document.querySelector('#feedback-submit, .feedback-submit');
            if (!anyButton) {
                simpleFeedbackAnimation();
            }
        }, 500);
    }, 300);
}

// 调试函数：手动触发动画（如果按钮无法正常找到）
function debugShowFeedbackAnimation() {
    console.log("调试：手动显示反馈动画");
    
    // 创建测试按钮（如果不存在）
    if (!document.querySelector('#test-feedback-btn')) {
        const testBtn = document.createElement('button');
        testBtn.id = 'test-feedback-btn';
        testBtn.textContent = '测试反馈按钮';
        testBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 20px;
            background: #FF9800;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 10000;
        `;
        document.body.appendChild(testBtn);
        
        testBtn.addEventListener('click', function() {
            showThankYouAnimation(this);
        });
    }
}

// 在控制台可以使用 debugShowFeedbackAnimation() 测试效果
window.debugShowFeedbackAnimation = debugShowFeedbackAnimation;
