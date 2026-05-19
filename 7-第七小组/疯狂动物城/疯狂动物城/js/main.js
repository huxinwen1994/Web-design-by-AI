// ========== 轮播图功能 ==========
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initSearch();
    initFormSubmit();
    initToggleContent();
    initThemeSwitcher();
    initDataChart();
});

// 轮播图功能
function initCarousel() {
    const carousel = document.querySelector('.banner-carousel');
    if (!carousel) return;
    
    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    // 创建指示点
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        currentIndex = index;
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }
    
    // 更新指示点状态
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }
    
    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    }
    
    // 自动播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // 事件绑定
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    // 鼠标悬停时暂停自动播放
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // 启动自动播放
    startAutoPlay();
}

// ========== 1. 搜索/筛选功能 ==========
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearSearchBtn');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchBtn) return;
    
    // 搜索内容数据
    const searchableContent = [
        { type: '角色', title: '朱迪·霍普斯', content: '一只充满梦想和正义感的兔子警官，是动物城历史上第一位兔子警察。她勇敢、聪明、坚持不懈，用自己的行动证明了"任何人都能成就任何事"的信念。', element: null },
        { type: '角色', title: '尼克·王尔德', content: '一只机智狡猾的狐狸，最初是个街头小贩，后来成为朱迪的搭档和最好的朋友。他聪明、幽默，拥有敏锐的观察力和出色的推理能力。', element: null },
        { type: '剧情', title: '紧张刺激的破案过程', content: '影片以一起神秘的失踪案为线索，朱迪和尼克联手展开调查。剧情跌宕起伏，充满了悬念和反转，让观众跟随主角一起解开谜团。', element: null },
        { type: '剧情', title: '温馨感人的友情故事', content: '朱迪和尼克从最初的互不信任，到逐渐了解彼此，最终成为最好的搭档和朋友。他们之间的友情是影片最动人的部分之一。', element: null },
        { type: '主题', title: '打破偏见与刻板印象', content: '影片深刻探讨了偏见和刻板印象的问题。通过不同动物之间的互动，展现了如何打破固有的偏见，看到每个个体的真实价值。', element: null },
        { type: '主题', title: '追求梦想的勇气', content: '"任何人都能成就任何事"是影片的核心主题。无论你是什么物种，无论别人怎么说，只要你有梦想并为之努力，就能实现自己的目标。', element: null },
        { type: '主题', title: '多元共融的社会', content: '动物城是一个多元化的社会，不同物种的动物在这里和谐共处。影片展现了包容、理解和尊重的重要性。', element: null },
        { type: '主题', title: '友情与信任的力量', content: '影片强调了友情和信任的重要性。朱迪和尼克之间的友谊，证明了真正的朋友会相互支持、相互理解，共同面对困难。', element: null }
    ];
    
    // 收集页面中的实际元素
    function collectElements() {
        const cards = document.querySelectorAll('.content-card, .gallery-item, .feature-item');
        cards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const content = card.querySelector('p');
            if (title && content && index < searchableContent.length) {
                searchableContent[index].element = card;
            }
        });
    }
    
    collectElements();
    
    function performSearch() {
        const keyword = searchInput.value.trim().toLowerCase();
        
        if (!keyword) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            // 显示所有内容
            searchableContent.forEach(item => {
                if (item.element) {
                    item.element.style.display = '';
                }
            });
            return;
        }
        
        const results = searchableContent.filter(item => {
            return item.title.toLowerCase().includes(keyword) ||
                   item.content.toLowerCase().includes(keyword) ||
                   item.type.toLowerCase().includes(keyword);
        });
        
        // 隐藏所有内容
        searchableContent.forEach(item => {
            if (item.element) {
                item.element.style.display = 'none';
            }
        });
        
        // 显示匹配的内容
        results.forEach(item => {
            if (item.element) {
                item.element.style.display = '';
                item.element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
        
        // 显示搜索结果
        if (results.length > 0) {
            searchResults.innerHTML = `<p class="search-result-text">找到 ${results.length} 个相关结果</p>`;
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<p class="search-result-text">未找到相关结果，请尝试其他关键词</p>';
            searchResults.style.display = 'block';
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            searchableContent.forEach(item => {
                if (item.element) {
                    item.element.style.display = '';
                }
            });
        });
    }
}

// ========== 2. 表单提交功能 ==========
function initFormSubmit() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // 验证表单
        if (!formData.name || !formData.email || !formData.message) {
            alert('请填写所有必填项！');
            return;
        }
        
        // 模拟提交（前端实现）
        console.log('表单数据：', formData);
        
        // 显示提交成功消息
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '提交成功！';
        submitBtn.style.backgroundColor = '#4caf50';
        submitBtn.disabled = true;
        
        // 显示提交信息
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML = `
            <h3>提交成功！</h3>
            <p>感谢您的留言，我们会尽快回复您。</p>
            <p><strong>提交信息：</strong></p>
            <ul>
                <li>姓名：${formData.name}</li>
                <li>邮箱：${formData.email}</li>
                <li>主题：${formData.subject}</li>
            </ul>
        `;
        contactForm.appendChild(successMsg);
        
        // 5秒后重置表单
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
            successMsg.remove();
        }, 5000);
    });
}

// ========== 3. 内容展开/折叠功能 ==========
function initToggleContent() {
    // 场景详情展开/折叠
    const toggleScenes = document.getElementById('toggleScenes');
    const scenesDetail = document.getElementById('scenesDetail');
    
    if (toggleScenes && scenesDetail) {
        toggleScenes.addEventListener('click', function() {
            const isHidden = scenesDetail.style.display === 'none';
            scenesDetail.style.display = isHidden ? 'block' : 'none';
            toggleScenes.textContent = isHidden ? '收起场景详情' : '展开场景详情';
            
            if (isHidden) {
                scenesDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // 主题列表展开/折叠
    const toggleThemes = document.getElementById('toggleThemes');
    const themesList = document.getElementById('themesList');
    
    if (toggleThemes && themesList) {
        let isExpanded = true;
        toggleThemes.addEventListener('click', function() {
            isExpanded = !isExpanded;
            themesList.style.display = isExpanded ? 'flex' : 'none';
            toggleThemes.textContent = isExpanded ? '收起主题详情' : '展开主题详情';
        });
    }
}

// ========== 4. 主题切换功能 ==========
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    if (themeButtons.length === 0) return;
    
    // 主题配置
    const themes = {
        default: {
            primary: '#1e88e5',
            secondary: '#1565c0',
            background: '#f8f8f8',
            text: '#333',
            cardBg: '#fff'
        },
        dark: {
            primary: '#424242',
            secondary: '#212121',
            background: '#1a1a1a',
            text: '#e0e0e0',
            cardBg: '#2d2d2d'
        },
        colorful: {
            primary: '#e91e63',
            secondary: '#c2185b',
            background: '#fce4ec',
            text: '#333',
            cardBg: '#fff'
        }
    };
    
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // 更新按钮状态
            themeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 应用主题
            const themeColors = themes[theme];
            if (themeColors) {
                document.documentElement.style.setProperty('--theme-primary', themeColors.primary);
                document.documentElement.style.setProperty('--theme-secondary', themeColors.secondary);
                document.documentElement.style.setProperty('--theme-background', themeColors.background);
                document.documentElement.style.setProperty('--theme-text', themeColors.text);
                document.documentElement.style.setProperty('--theme-card-bg', themeColors.cardBg);
                
                // 更新导航栏和页脚
                const nav = document.querySelector('.nav');
                const footer = document.querySelector('.footer');
                if (nav) nav.style.backgroundColor = themeColors.primary;
                if (footer) footer.style.backgroundColor = themeColors.primary;
                
                // 更新卡片背景
                const cards = document.querySelectorAll('.content-card, .feature-item');
                cards.forEach(card => {
                    card.style.backgroundColor = themeColors.cardBg;
                    card.style.color = themeColors.text;
                });
                
                // 保存主题到本地存储
                localStorage.setItem('selectedTheme', theme);
            }
        });
    });
    
    // 加载保存的主题
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        const savedBtn = document.querySelector(`[data-theme="${savedTheme}"]`);
        if (savedBtn) savedBtn.click();
    }
}

// ========== 5. 数据可视化图表 ==========
function initDataChart() {
    const chartButtons = document.querySelectorAll('.chart-btn');
    const chartCanvas = document.getElementById('dataChart');
    
    if (!chartCanvas || chartButtons.length === 0) return;
    
    const ctx = chartCanvas.getContext('2d');
    
    // 图表数据
    const chartData = {
        characters: {
            labels: ['朱迪', '尼克', '闪电', '狮子市长', '羊副市长', '其他'],
            values: [25, 22, 15, 12, 10, 16],
            colors: ['#1e88e5', '#43a047', '#fb8c00', '#e91e63', '#9c27b0', '#607d8b']
        },
        themes: {
            labels: ['打破偏见', '追求梦想', '多元共融', '友情信任'],
            values: [30, 28, 22, 20],
            colors: ['#1e88e5', '#43a047', '#fb8c00', '#e91e63']
        },
        scenes: {
            labels: ['市中心', '雨林区', '撒哈拉广场', '冻土镇', '小啮齿镇'],
            values: [25, 20, 18, 17, 20],
            colors: ['#1e88e5', '#43a047', '#fb8c00', '#e91e63', '#9c27b0']
        }
    };
    
    let currentChart = 'characters';
    
    function drawChart(type) {
        const data = chartData[type];
        if (!data) return;
        
        // 清空画布
        ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
        
        const width = chartCanvas.width;
        const height = chartCanvas.height;
        const padding = 60;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        const maxValue = Math.max(...data.values);
        const barWidth = chartWidth / data.labels.length - 20;
        const barSpacing = 20;
        
        // 绘制坐标轴
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // 绘制网格线
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // 绘制柱状图
        data.labels.forEach((label, index) => {
            const value = data.values[index];
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
            const y = height - padding - barHeight;
            
            // 绘制柱子
            ctx.fillStyle = data.colors[index];
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // 绘制数值
            ctx.fillStyle = '#333';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value, x + barWidth / 2, y - 5);
            
            // 绘制标签
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.save();
            ctx.translate(x + barWidth / 2, height - padding + 20);
            ctx.rotate(-Math.PI / 4);
            ctx.fillText(label, 0, 0);
            ctx.restore();
        });
        
        // 绘制标题
        ctx.fillStyle = '#333';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        const titleMap = {
            characters: '主要角色受欢迎度',
            themes: '主题思想关注度',
            scenes: '场景区域受欢迎度'
        };
        ctx.fillText(titleMap[type] || '数据统计', width / 2, 30);
    }
    
    // 按钮点击事件
    chartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            chartButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentChart = this.getAttribute('data-chart');
            drawChart(currentChart);
        });
    });
    
    // 初始绘制
    drawChart(currentChart);
    
    // 响应式调整
    function resizeChart() {
        const container = document.getElementById('chartContainer');
        if (container) {
            chartCanvas.width = container.offsetWidth - 40;
            chartCanvas.height = 400;
            drawChart(currentChart);
        }
    }
    
    window.addEventListener('resize', resizeChart);
    resizeChart();
}

