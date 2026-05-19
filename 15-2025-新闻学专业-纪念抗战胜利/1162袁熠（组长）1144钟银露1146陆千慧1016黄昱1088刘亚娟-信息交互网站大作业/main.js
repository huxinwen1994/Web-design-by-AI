// 移动端菜单切换
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.createElement('div');

mobileMenu.id = 'mobile-menu';
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
            <div class="mobile-menu-content">
                <a href="#home" class="mobile-nav-link">首页</a>
                <a href="#news" class="mobile-nav-link">新闻</a>
                <a href="#commentary" class="mobile-nav-link">解说</a>
                <a href="#videos" class="mobile-nav-link">视频</a>
                <a href="#heroes" class="mobile-nav-link">英烈缅怀</a>
                <a href="#archives" class="mobile-nav-link">史料文献</a>
                <a href="#interactive" class="mobile-nav-link">互动纪念</a>
                <a href="#history" class="mobile-nav-link">历史回顾</a>
                <div class="mobile-search-container">
                    <input type="text" id="mobileSearchInput" placeholder="搜索...">
                </div>
            </div>
        `;
document.body.appendChild(mobileMenu);

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// 搜索功能
const searchData = [
    { type: 'news', title: '中国人民抗日战争暨世界反法西斯战争胜利80周年纪念大会举行', url: 'https://cpc.people.com.cn/n1/2025/0903/c64387-40556346.html' },
    { type: 'news', title: '全国抗战胜利80周年纪念章颁发暨慰问活动开展', url: 'https://www.mva.gov.cn/sy/zt/qmshggzxd/gx/jxzx/yw/202510/t20251010_515159.html' },
    { type: 'news', title: '广西"铭记抗战史・传承英雄志"系列纪念活动', url: 'https://www.mva.gov.cn/sy/zt/qmshggzxd/gx/jxzx/yw/202510/t20251010_515159.html' },
    { type: 'news', title: '辽宁勿忘"九一八"撞钟鸣警仪式', url: 'http://www.xinhuanet.com/local/20250918/0e0d14fc97b34e11afe1e455a84de436/c.html' },
    { type: 'news', title: '加拿大华人团体联合举办抗战胜利80周年系列活动', url: 'http://www.chinanews.com.cn/hr/2025/03-25/10388418.shtml' },
    { type: 'news', title: '马来西亚南侨机工纪念设施揭幕仪式', url: 'https://m.haiwainet.cn/middle/232657/2025/0903/content_32891404_1.html' },
    { type: 'commentary', title: '九三阅兵式深度解读', url: 'https://cqrb.cn/shishi/2025-09-05/2403053_pc.html' },
    { type: 'commentary', title: '阅兵式背后的故事', url: 'https://www.sohu.com/a/932161511_122478945' },
    { type: 'commentary', title: '平型关大捷', url: '#commentary' },
    { type: 'commentary', title: '台儿庄战役', url: '#commentary' },
    { type: 'commentary', title: '百团大战', url: '#commentary' },
    { type: 'video', title: '九三阅兵完整视频', url: 'https://tv.cctv.com/2025/08/23/VIDESRtw5KyzrREsntvN2lzL250823.shtml' },
    { type: 'video', title: '《东方主战场》', url: 'https://tv.cctv.com/2025/05/06/VIDAdUhw9P3oc65w00Pz1L2H250506.shtm' },
    { type: 'video', title: '抗战老兵李恒彪回冉庄讲述抗战记忆', url: 'https://tv.cctv.com/2025/09/19/VIDEVis1kF6LTZOZRJO3ybzh250919.shtml' },
    { type: 'heroes', title: '杨靖宇', url: '#heroes' },
    { type: 'heroes', title: '赵一曼', url: '#heroes' },
    { type: 'heroes', title: '张自忠', url: '#heroes' }
];

function handleSearch(inputElement, resultsElement) {
    const searchTerm = inputElement.value.toLowerCase();

    if (searchTerm.length < 2) {
        resultsElement.classList.add('hidden');
        return;
    }

    const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(searchTerm)
    );

    if (filteredResults.length > 0) {
        resultsElement.innerHTML = filteredResults.map(item => `
                    <div class="search-result-item" onclick="window.open('${item.url}', '_blank')">
                        <span class="search-result-type">[${item.type}]</span>
                        <span class="search-result-title">${item.title}</span>
                    </div>
                `).join('');
        resultsElement.classList.remove('hidden');
    } else {
        resultsElement.innerHTML = '<div class="search-result-item">没有找到相关内容</div>';
        resultsElement.classList.remove('hidden');
    }
}

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const mobileSearchInput = document.getElementById('mobileSearchInput');

searchInput.addEventListener('input', () => handleSearch(searchInput, searchResults));
mobileSearchInput.addEventListener('input', () => handleSearch(mobileSearchInput, searchResults));

// 点击其他地方关闭搜索结果
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        searchResults.classList.add('hidden');
    }
});

// 留言板功能
const messageForm = document.getElementById('messageForm');
const messageList = document.getElementById('messageList');
const messageTextarea = document.getElementById('message');
const charCount = document.querySelector('.char-count');

// 实时字数统计
messageTextarea.addEventListener('input', () => {
    const currentLength = messageTextarea.value.length;
    charCount.textContent = `${currentLength}/500`;
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = messageTextarea.value;

    if (name && message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message-item';
        messageElement.innerHTML = `
                    <h4 class="message-author">${name}</h4>
                    <p class="message-content">${message}</p>
                    <p class="message-time">${new Date().toLocaleString('zh-CN')}</p>
                `;

        messageList.insertBefore(messageElement, messageList.firstChild);

        // 清空表单
        document.getElementById('name').value = '';
        messageTextarea.value = '';
        charCount.textContent = '0/500';

        // 显示提交成功动画
        const submitBtn = messageForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '✓ 提交成功';
        submitBtn.style.background = '#27ae60';
        setTimeout(() => {
            submitBtn.innerHTML = '提交寄语';
            submitBtn.style.background = '#e74c3c';
        }, 2000);
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // 关闭移动端菜单
            mobileMenu.classList.remove('active');
        }
    });
});

// 回到顶部功能
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 滚动时的淡入效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.content-section, .article-card, .video-card, .timeline-item').forEach(element => {
    observer.observe(element);
});

// 时间轴点击展开/收起功能
document.querySelectorAll('.timeline-year').forEach(year => {
    year.addEventListener('click', function () {
        const content = this.nextElementSibling;
        content.classList.toggle('active');
    });
});









document.querySelectorAll('.toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const article = btn.closest('.article-card');
        const content = article.querySelector('.article-content');

        content.classList.toggle('expanded');

        // 按钮文字切换
        if (content.classList.contains('expanded')) {
            btn.textContent = '收起内容';
        } else {
            btn.textContent = '内容展开';
        }
    });
});









  const sidebarCarousel = document.querySelector(".sidebar-carousel");
    const track = sidebarCarousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const dotsContainer = sidebarCarousel.querySelector(".carousel-dots");
    let index = 0;

    // 创建点
    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.children);

    function goTo(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(d => d.classList.remove("active"));
        dots[index].classList.add("active");
    }

    dots.forEach((dot, i) =>
        dot.addEventListener("click", () => {
            goTo(i);
        })
    );

    setInterval(() => goTo(index + 1), 3500);

// 新闻标签切换
document.querySelectorAll('.news-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有活动状态
        document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.news-tab-content').forEach(c => c.classList.remove('active'));
        
        // 激活当前标签
        tab.classList.add('active');
        const tabId = tab.dataset.tab;
        const contentMap = {
            'politics': 'politics-news',
            'local': 'local-news',
            'international': 'international-news'
        };
        const contentId = contentMap[tabId];
        if (contentId) {
            document.getElementById(contentId).classList.add('active');
        }
    });
});

// 解说标签切换
document.querySelectorAll('.commentary-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.commentary-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.commentary-tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const tabId = tab.dataset.tab;
        const contentMap = {
            'parade': 'parade-commentary',
            'battles': 'battles-commentary'
        };
        const contentId = contentMap[tabId];
        if (contentId) {
            document.getElementById(contentId).classList.add('active');
        }
    });
});

// 视频标签切换
document.querySelectorAll('.video-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.video-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.video-tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const tabId = tab.dataset.tab;
        const contentMap = {
            'documentary': 'documentary-videos',
            'oral': 'oral-videos',
            'parade-video': 'parade-video-videos'
        };
        const contentId = contentMap[tabId];
        if (contentId) {
            document.getElementById(contentId).classList.add('active');
        }
    });
});

// 英烈标签切换
document.querySelectorAll('.heroes-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.heroes-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.heroes-tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const tabId = tab.dataset.tab;
        const contentMap = {
            'heroes-list': 'heroes-list-content',
            'heroes-stories': 'heroes-stories-content',
            'heroes-message': 'heroes-message-content'
        };
        const contentId = contentMap[tabId];
        if (contentId) {
            document.getElementById(contentId).classList.add('active');
        }
    });
});

// 史料标签切换
document.querySelectorAll('.archives-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.archives-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.archives-tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const tabId = tab.dataset.tab;
        const contentMap = {
            'photos': 'photos-content',
            'letters': 'letters-content'
        };
        const contentId = contentMap[tabId];
        if (contentId) {
            document.getElementById(contentId).classList.add('active');
        }
    });
});

// 英烈轮播功能
const heroesCarousel = document.querySelector('.heroes-carousel-track');
const heroCards = document.querySelectorAll('.hero-card');
const prevHeroBtn = document.querySelector('.prev-btn');
const nextHeroBtn = document.querySelector('.next-btn');
let currentHeroIndex = 0;

if (heroesCarousel && heroCards.length > 0) {
    function getHeroesPerView() {
        // 根据屏幕宽度决定每屏显示数量
        if (window.innerWidth <= 768) {
            return 1; // 移动端显示1个
        } else if (window.innerWidth <= 1024) {
            return 2; // 平板显示2个
        } else {
            return 4; // 桌面端显示4个
        }
    }

    function getCardWidth() {
        if (window.innerWidth <= 768) {
            return window.innerWidth - 100; // 移动端全宽减去padding
        } else {
            return 200; // 桌面端固定200px
        }
    }

    function updateHeroesCarousel() {
        const heroesPerView = getHeroesPerView();
        const cardWidth = getCardWidth();
        const gap = 20;
        const maxIndex = Math.max(0, heroCards.length - heroesPerView);
        currentHeroIndex = Math.min(currentHeroIndex, maxIndex);
        currentHeroIndex = Math.max(0, currentHeroIndex);
        
        const translateX = -(currentHeroIndex * (cardWidth + gap));
        heroesCarousel.style.transform = `translateX(${translateX}px)`;
    }

    if (prevHeroBtn) {
        prevHeroBtn.addEventListener('click', () => {
            currentHeroIndex = Math.max(0, currentHeroIndex - 1);
            updateHeroesCarousel();
        });
    }

    if (nextHeroBtn) {
        nextHeroBtn.addEventListener('click', () => {
            const heroesPerView = getHeroesPerView();
            const maxIndex = Math.max(0, heroCards.length - heroesPerView);
            currentHeroIndex = Math.min(currentHeroIndex + 1, maxIndex);
            updateHeroesCarousel();
        });
    }

    // 响应式调整
    window.addEventListener('resize', () => {
        updateHeroesCarousel();
    });

    // 初始化
    updateHeroesCarousel();
}

// 英烈祭扫寄语功能
const heroesMessageForm = document.getElementById('heroesMessageForm');
const heroesMessageList = document.getElementById('heroesMessageList');
const heroesMessageTextarea = document.getElementById('heroesMessage');
const heroesCharCount = heroesMessageForm ? heroesMessageForm.querySelector('.char-count') : null;

if (heroesMessageTextarea && heroesCharCount) {
    heroesMessageTextarea.addEventListener('input', () => {
        const currentLength = heroesMessageTextarea.value.length;
        heroesCharCount.textContent = `${currentLength}/500`;
    });
}

if (heroesMessageForm) {
    heroesMessageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('heroesName').value;
        const message = heroesMessageTextarea.value;

        if (name && message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.innerHTML = `
                <h4 class="message-author">${name}</h4>
                <p class="message-content">${message}</p>
                <p class="message-time">${new Date().toLocaleString('zh-CN')}</p>
            `;

            heroesMessageList.insertBefore(messageElement, heroesMessageList.firstChild);

            // 清空表单
            document.getElementById('heroesName').value = '';
            heroesMessageTextarea.value = '';
            heroesCharCount.textContent = '0/500';

            // 显示提交成功动画
            const submitBtn = heroesMessageForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '✓ 提交成功';
            submitBtn.style.background = '#27ae60';
            setTimeout(() => {
                submitBtn.innerHTML = '提交寄语';
                submitBtn.style.background = '#e74c3c';
            }, 2000);
        }
    });
}

// 在线献花功能
const flowerBtn = document.getElementById('flowerBtn');
const flowerCount = document.getElementById('flowerCount');

if (flowerBtn && flowerCount) {
    // 从localStorage读取献花人数
    let count = parseInt(localStorage.getItem('flowerCount')) || 0;
    flowerCount.textContent = count;

    flowerBtn.addEventListener('click', () => {
        // 增加计数
        count++;
        flowerCount.textContent = count;
        localStorage.setItem('flowerCount', count.toString());

        // 动画效果
        flowerBtn.innerHTML = '✓ 已献花';
        flowerBtn.style.background = '#27ae60';
        flowerBtn.disabled = true;

        // 创建花朵飘落效果
        createFlowerAnimation();

        setTimeout(() => {
            flowerBtn.innerHTML = '献花';
            flowerBtn.style.background = '#e74c3c';
            flowerBtn.disabled = false;
        }, 2000);
    });
}

// 花朵飘落动画
function createFlowerAnimation() {
    const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹'];
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            flower.style.position = 'fixed';
            flower.style.left = Math.random() * 100 + '%';
            flower.style.top = '-50px';
            flower.style.fontSize = '30px';
            flower.style.pointerEvents = 'none';
            flower.style.zIndex = '9999';
            flower.style.animation = 'fall 3s linear forwards';
            document.body.appendChild(flower);

            setTimeout(() => {
                flower.remove();
            }, 3000);
        }, i * 100);
    }
}

// 添加飘落动画CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(calc(100vh + 50px)) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);









