// 全局变量和初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面加载动画
    initPageLoading();
    // 初始化所有页面功能
    initNavigation();
    initCurrentPageFunctions();
    updateDataTime();
    // 初始化返回顶部按钮
    initBackToTop();
    // 初始化窗口大小变化监听
    initResizeHandler();
    // 初始化深色模式
    initDarkMode();
});

// 页面加载动画
function initPageLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'pageLoading';
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = '#ffffff';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.zIndex = '9999';
    loadingOverlay.style.transition = 'opacity 0.5s ease';
    loadingOverlay.innerHTML = '<div style="font-size: 1.2rem; color: #0055A4;">加载中...</div>';
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.5s ease';
        }, 500);
    }, 800);
    
    document.body.style.opacity = '0';
}

// 更新数据时间
function updateDataTime() {
    const now = new Date();
    const dateString = now.toISOString().split('T')[0];
    const timeString = now.toTimeString().split(' ')[0].substring(0, 5);
    
    const updateTimeElements = document.querySelectorAll('#updateTime, #footerUpdateTime');
    updateTimeElements.forEach(element => {
        if (element) element.textContent = `${dateString} ${timeString}`;
    });
}

// 全局导航功能
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        const navItems = document.querySelectorAll('.nav-item a');
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.includes('#') && href !== '#') {
                    e.preventDefault();
                    const targetId = href.split('#')[1];
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                        window.scrollTo({
                            top: targetElement.offsetTop - navHeight,
                            behavior: 'smooth'
                        });
                    }
                }
                
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

// 初始化返回顶部按钮
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '30px';
    backToTopBtn.style.right = '30px';
    backToTopBtn.style.width = '50px';
    backToTopBtn.style.height = '50px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.backgroundColor = '#0055A4';
    backToTopBtn.style.color = '#fff';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    backToTopBtn.style.fontSize = '18px';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
    backToTopBtn.style.transition = 'all 0.3s ease';
    backToTopBtn.style.zIndex = '999';
    backToTopBtn.style.transform = 'translateY(20px)';
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#004080';
        this.style.transform = 'translateY(20px) scale(1.1)';
    });
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#0055A4';
        this.style.transform = 'translateY(20px) scale(1)';
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    });
}

// 初始化窗口大小变化监听
function initResizeHandler() {
    window.addEventListener('resize', function() {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu && navToggle && window.innerWidth > 768) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// 初始化深色模式
function initDarkMode() {
    // 创建深色模式切换按钮
    const darkModeBtn = document.createElement('button');
    darkModeBtn.id = 'darkModeBtn';
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeBtn.style.padding = '8px 12px';
    darkModeBtn.style.border = 'none';
    darkModeBtn.style.borderRadius = '4px';
    darkModeBtn.style.backgroundColor = 'transparent';
    darkModeBtn.style.color = '#333';
    darkModeBtn.style.cursor = 'pointer';
    darkModeBtn.style.fontSize = '16px';
    darkModeBtn.style.marginLeft = '10px';
    
    // 插入到导航栏
    const navRight = document.querySelector('.nav-right');
    if (navRight) {
        navRight.appendChild(darkModeBtn);
    }
    
    // 读取本地存储的深色模式状态
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeBtn.style.color = '#fff';
    }
    
    // 切换深色模式
    darkModeBtn.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        if (isDark) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            this.style.color = '#fff';
            document.body.style.backgroundColor = '#1a1a1a';
            document.body.style.color = '#fff';
            // 全局样式适配
            document.querySelectorAll('.medal-card, .message-item, table').forEach(el => {
                el.style.backgroundColor = '#2d2d2d';
                el.style.color = '#fff';
            });
            document.querySelectorAll('input, textarea, select').forEach(el => {
                el.style.backgroundColor = '#3d3d3d';
                el.style.color = '#fff';
                el.style.borderColor = '#555';
            });
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            this.style.color = '#333';
            document.body.style.backgroundColor = '#fff';
            document.body.style.color = '#333';
            // 恢复默认样式
            document.querySelectorAll('.medal-card, .message-item, table').forEach(el => {
                el.style.backgroundColor = '';
                el.style.color = '';
            });
            document.querySelectorAll('input, textarea, select').forEach(el => {
                el.style.backgroundColor = '';
                el.style.color = '';
                el.style.borderColor = '';
            });
        }
        
        // 过渡动画
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}

// 根据当前页面初始化功能
function initCurrentPageFunctions() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        initHomePage();
    } else if (currentPage === 'match-center.html') {
        initMatchCenterPage();
    } else if (currentPage === 'interaction.html') {
        initInteractionPage();
    }
}

// 首页功能初始化
function initHomePage() {
    initSlideshow();
    initMedalBoard();
    
    const toggleEventsBtn = document.getElementById('toggleEvents');
    if (toggleEventsBtn) {
        toggleEventsBtn.addEventListener('click', function() {
            const moreEvents = document.querySelectorAll('.more-events');
            const icon = this.querySelector('i');
            
            moreEvents.forEach(event => {
                event.classList.toggle('show');
            });
            
            if (moreEvents[0] && moreEvents[0].classList.contains('show')) {
                this.innerHTML = '收起赛事 <i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = '更多赛事 <i class="fas fa-chevron-down"></i>';
            }
            
            moreEvents.forEach((event, index) => {
                setTimeout(() => {
                    if (event.classList.contains('show')) {
                        event.style.display = 'flex';
                        event.style.opacity = '1';
                        event.style.transform = 'translateY(0)';
                    } else {
                        event.style.opacity = '0';
                        event.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            event.style.display = 'none';
                        }, 300);
                    }
                }, index * 50);
            });
        });
        
        const moreEvents = document.querySelectorAll('.more-events');
        moreEvents.forEach(event => {
            event.style.display = 'none';
            event.style.opacity = '0';
            event.style.transform = 'translateY(10px)';
            event.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }
}

// 轮播图功能
let slideIndex = 1;
let slideInterval;

function initSlideshow() {
    showSlides(slideIndex);
    startSlideshow();
    initSlideAdvancedInteraction();
}

function startSlideshow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.opacity = "0";
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";
        setTimeout(() => {
            slides[slideIndex-1].style.opacity = "1";
            slides[slideIndex-1].style.transition = "opacity 0.5s ease";
        }, 50);
    }
    if (dots.length > 0 && dots[slideIndex-1]) {
        dots[slideIndex-1].className += " active";
    }
    
    startSlideshow();
}

function initSlideAdvancedInteraction() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (!slideshowContainer) return;
    
    slideshowContainer.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    slideshowContainer.addEventListener('mouseleave', function() {
        startSlideshow();
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    slideshowContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, false);
    
    slideshowContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        
        if (touchEndX - touchStartX > swipeThreshold) {
            plusSlides(-1);
        } else if (touchStartX - touchEndX > swipeThreshold) {
            plusSlides(1);
        }
        
        startSlideshow();
    }, false);
}

// 奖牌榜详细数据
const medalDetailData = {
    "中国": [
        { sport: "乒乓球", gold: 4, silver: 1, bronze: 0 },
        { sport: "跳水", gold: 7, silver: 2, bronze: 0 },
        { sport: "举重", gold: 5, silver: 1, bronze: 0 },
        { sport: "游泳", gold: 3, silver: 2, bronze: 3 },
        { sport: "田径", gold: 2, silver: 3, bronze: 2 },
        { sport: "其他", gold: 1, silver: 6, bronze: 5 }
    ],
    "美国": [
        { sport: "田径", gold: 8, silver: 6, bronze: 4 },
        { sport: "游泳", gold: 7, silver: 5, bronze: 3 },
        { sport: "篮球", gold: 2, silver: 0, bronze: 0 },
        { sport: "体操", gold: 3, silver: 2, bronze: 3 },
        { sport: "其他", gold: 5, silver: 5, bronze: 5 }
    ],
    "日本": [
        { sport: "柔道", gold: 5, silver: 3, bronze: 2 },
        { sport: "体操", gold: 3, silver: 2, bronze: 3 },
        { sport: "游泳", gold: 2, silver: 1, bronze: 2 },
        { sport: "其他", gold: 5, silver: 4, bronze: 5 }
    ],
    "英国": [
        { sport: "田径", gold: 4, silver: 5, bronze: 6 },
        { sport: "游泳", gold: 2, silver: 3, bronze: 2 },
        { sport: "自行车", gold: 3, silver: 2, bronze: 4 },
        { sport: "其他", gold: 3, silver: 4, bronze: 3 }
    ],
    "澳大利亚": [
        { sport: "游泳", gold: 6, silver: 7, bronze: 4 },
        { sport: "田径", gold: 2, silver: 2, bronze: 2 },
        { sport: "其他", gold: 2, silver: 3, bronze: 3 }
    ],
    "法国": [
        { sport: "击剑", gold: 3, silver: 2, bronze: 3 },
        { sport: "柔道", gold: 2, silver: 3, bronze: 2 },
        { sport: "其他", gold: 3, silver: 5, bronze: 7 }
    ],
    "德国": [
        { sport: "赛艇", gold: 2, silver: 3, bronze: 2 },
        { sport: "游泳", gold: 1, silver: 2, bronze: 3 },
        { sport: "其他", gold: 4, silver: 4, bronze: 6 }
    ],
    "意大利": [
        { sport: "击剑", gold: 2, silver: 2, bronze: 3 },
        { sport: "田径", gold: 1, silver: 2, bronze: 2 },
        { sport: "其他", gold: 3, silver: 4, bronze: 5 }
    ],
    "荷兰": [
        { sport: "自行车", gold: 3, silver: 4, bronze: 2 },
        { sport: "游泳", gold: 1, silver: 1, bronze: 1 },
        { sport: "其他", gold: 1, silver: 2, bronze: 3 }
    ],
    "韩国": [
        { sport: "射箭", gold: 2, silver: 1, bronze: 2 },
        { sport: "跆拳道", gold: 1, silver: 2, bronze: 3 },
        { sport: "其他", gold: 1, silver: 2, bronze: 3 }
    ]
};

// 初始化奖牌榜
function initMedalBoard() {
    const medalCardsContainer = document.getElementById('medalCards');
    const medalFilter = document.getElementById('medalFilter');
    
    if (!medalCardsContainer) return;
    
    // 新增国家搜索框
    const searchContainer = document.createElement('div');
    searchContainer.style.margin = '10px 0';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '搜索国家...';
    searchInput.style.padding = '8px 12px';
    searchInput.style.border = '1px solid #ddd';
    searchInput.style.borderRadius = '4px';
    searchInput.style.width = '200px';
    searchInput.style.marginLeft = '10px';
    searchContainer.appendChild(searchInput);
    
    const filterContainer = medalFilter?.parentNode;
    if (filterContainer) {
        filterContainer.appendChild(searchContainer);
    }
    
    // 初始渲染奖牌榜
    renderMedalCards(medalData);
    
    // 筛选+搜索功能
    function handleMedalFilter() {
        const filterValue = medalFilter ? medalFilter.value : 'gold';
        const searchValue = searchInput.value.toLowerCase().trim();
        let filteredData = [...medalData];
        
        if (searchValue) {
            filteredData = filteredData.filter(item => 
                item.country.toLowerCase().includes(searchValue)
            );
        }
        
        switch(filterValue) {
            case 'gold':
                filteredData.sort((a, b) => b.gold - a.gold);
                break;
            case 'total':
                filteredData.sort((a, b) => b.total - a.total);
                break;
            case 'name':
                filteredData.sort((a, b) => a.country.localeCompare(b.country, 'zh-CN'));
                break;
            case 'china':
                filteredData = filteredData.filter(country => country.country === "中国");
                break;
            default:
                filteredData.sort((a, b) => b.gold - a.gold);
        }
        
        // 排序动画：先隐藏所有卡片，再逐个显示
        medalCardsContainer.style.opacity = '0';
        setTimeout(() => {
            renderMedalCards(filteredData);
            medalCardsContainer.style.opacity = '1';
            medalCardsContainer.style.transition = 'opacity 0.3s ease';
        }, 300);
    }
    
    if (medalFilter) {
        medalFilter.addEventListener('change', handleMedalFilter);
    }
    searchInput.addEventListener('input', handleMedalFilter);
    
    // 创建奖牌详情弹窗
    createMedalDetailModal();
}

// 创建奖牌详情弹窗
function createMedalDetailModal() {
    // 遮罩层
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'medalModalOverlay';
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalOverlay.style.zIndex = '1000';
    modalOverlay.style.display = 'none';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.alignItems = 'center';
    
    // 弹窗容器
    const modal = document.createElement('div');
    modal.id = 'medalModal';
    modal.style.width = '90%';
    modal.style.maxWidth = '600px';
    modal.style.backgroundColor = '#fff';
    modal.style.borderRadius = '8px';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    modal.style.transform = 'scale(0.9)';
    modal.style.opacity = '0';
    modal.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    
    // 弹窗头部
    const modalHeader = document.createElement('div');
    modalHeader.style.display = 'flex';
    modalHeader.style.justifyContent = 'space-between';
    modalHeader.style.alignItems = 'center';
    modalHeader.style.marginBottom = '20px';
    
    const modalTitle = document.createElement('h3');
    modalTitle.id = 'medalModalTitle';
    modalTitle.style.margin = '0';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#666';
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeBtn);
    
    // 弹窗内容
    const modalContent = document.createElement('div');
    modalContent.id = 'medalModalContent';
    modalContent.style.maxHeight = '70vh';
    modalContent.style.overflowY = 'auto';
    
    modal.appendChild(modalHeader);
    modal.appendChild(modalContent);
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
    
    // 关闭弹窗
    closeBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });
    
    // 键盘ESC关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            modalOverlay.style.display = 'none';
        }
    });
}

// 显示奖牌详情弹窗
function showMedalDetailModal(country) {
    const modalOverlay = document.getElementById('medalModalOverlay');
    const modal = document.getElementById('medalModal');
    const modalTitle = document.getElementById('medalModalTitle');
    const modalContent = document.getElementById('medalModalContent');
    
    if (!modalOverlay || !modal || !modalTitle || !modalContent) return;
    
    // 设置标题
    modalTitle.textContent = `${country} 奖牌明细`;
    
    // 设置内容
    const detailData = medalDetailData[country] || [];
    let contentHtml = '<table style="width:100%; border-collapse:collapse;">';
    contentHtml += `
        <tr style="border-bottom:2px solid #ddd;">
            <th style="padding:8px; text-align:left;">项目</th>
            <th style="padding:8px; text-align:center;">金牌</th>
            <th style="padding:8px; text-align:center;">银牌</th>
            <th style="padding:8px; text-align:center;">铜牌</th>
        </tr>
    `;
    
    detailData.forEach(item => {
        contentHtml += `
            <tr style="border-bottom:1px solid #eee;">
                <td style="padding:8px;">${item.sport}</td>
                <td style="padding:8px; text-align:center; color:#ffd700;">${item.gold}</td>
                <td style="padding:8px; text-align:center; color:#c0c0c0;">${item.silver}</td>
                <td style="padding:8px; text-align:center; color:#cd7f32;">${item.bronze}</td>
            </tr>
        `;
    });
    
    contentHtml += '</table>';
    modalContent.innerHTML = contentHtml;
    
    // 显示弹窗并添加动画
    modalOverlay.style.display = 'flex';
    setTimeout(() => {
        modal.style.transform = 'scale(1)';
        modal.style.opacity = '1';
    }, 10);
}

// 奖牌榜数据
const medalData = [
    { country: "美国", flag: "https://flagcdn.com/w40/us.png", gold: 25, silver: 18, bronze: 15, total: 58 },
    { country: "中国", flag: "https://flagcdn.com/w40/cn.png", gold: 22, silver: 15, bronze: 12, total: 49 },
    { country: "日本", flag: "https://flagcdn.com/w40/jp.png", gold: 15, silver: 10, bronze: 12, total: 37 },
    { country: "英国", flag: "https://flagcdn.com/w40/gb.png", gold: 12, silver: 14, bronze: 15, total: 41 },
    { country: "澳大利亚", flag: "https://flagcdn.com/w40/au.png", gold: 10, silver: 12, bronze: 9, total: 31 },
    { country: "法国", flag: "https://flagcdn.com/w40/fr.png", gold: 8, silver: 10, bronze: 12, total: 30 },
    { country: "德国", flag: "https://flagcdn.com/w40/de.png", gold: 7, silver: 9, bronze: 11, total: 27 },
    { country: "意大利", flag: "https://flagcdn.com/w40/it.png", gold: 6, silver: 8, bronze: 10, total: 24 },
    { country: "荷兰", flag: "https://flagcdn.com/w40/nl.png", gold: 5, silver: 7, bronze: 6, total: 18 },
    { country: "韩国", flag: "https://flagcdn.com/w40/kr.png", gold: 4, silver: 5, bronze: 8, total: 17 }
];

// 渲染奖牌榜卡片
function renderMedalCards(data) {
    const medalCardsContainer = document.getElementById('medalCards');
    if (!medalCardsContainer) return;
    
    medalCardsContainer.innerHTML = '';
    
    if (data.length === 0) {
        const emptyTip = document.createElement('div');
        emptyTip.style.textAlign = 'center';
        emptyTip.style.padding = '20px';
        emptyTip.style.color = '#666';
        emptyTip.textContent = '暂无匹配的国家';
        medalCardsContainer.appendChild(emptyTip);
        return;
    }
    
    data.forEach((country, index) => {
        const medalCard = document.createElement('div');
        medalCard.className = 'medal-card';
        medalCard.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease';
        medalCard.style.opacity = '0';
        medalCard.style.transform = 'translateY(20px)';
        medalCard.style.cursor = 'pointer';
        
        // 排序动画：逐个显示
        setTimeout(() => {
            medalCard.style.opacity = '1';
            medalCard.style.transform = 'translateY(0)';
        }, index * 100);
        
        medalCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        });
        medalCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // 点击显示详情弹窗
        medalCard.addEventListener('click', () => {
            showMedalDetailModal(country.country);
        });
        
        medalCard.innerHTML = `
            <div class="medal-card-header">
                <img src="${country.flag}" alt="${country.country}国旗" class="medal-card-flag">
                <div class="medal-card-country">${country.country}</div>
            </div>
            <div class="medal-card-medals">
                <div class="medal-count medal-gold">
                    <div class="medal-number">${country.gold}</div>
                    <div class="medal-label">金牌</div>
                </div>
                <div class="medal-count medal-silver">
                    <div class="medal-number">${country.silver}</div>
                    <div class="medal-label">银牌</div>
                </div>
                <div class="medal-count medal-bronze">
                    <div class="medal-number">${country.bronze}</div>
                    <div class="medal-label">铜牌</div>
                </div>
            </div>
            <div class="medal-total">
                总奖牌数: ${country.total}
            </div>
            <div style="text-align:center; margin-top:10px; font-size:12px; color:#666;">
                <i class="fas fa-info-circle"></i> 点击查看明细
            </div>
        `;
        
        medalCardsContainer.appendChild(medalCard);
    });
}

// 赛事结果数据
const matchResultData = {
    "2024-08-15 09:00 男子100米预赛": { status: "已结束", result: "科尔利 9.88秒 晋级", report: "美国选手科尔利以9.88秒的成绩获得小组第一，中国选手苏炳添以10.05秒晋级下一轮。" },
    "2024-08-15 10:30 女子200米自由泳决赛": { status: "已结束", result: "莱德基 1:53.72 夺冠", report: "美国名将莱德基打破奥运会纪录夺冠，中国选手杨浚瑄获得第四名。" },
    "2024-08-16 09:30 女子团体决赛": { status: "已结束", result: "美国 166.563 夺冠", report: "美国体操女团以总分166.563分夺冠，中国队获得银牌。" }
};

// 赛事表格数据
const scheduleData = [
    { date: "2024-08-15", time: "09:00", sport: "田径", venue: "法兰西体育场", teams: "男子100米预赛", status: "进行中", link: "#" },
    { date: "2024-08-15", time: "10:30", sport: "游泳", venue: "巴黎水上运动中心", teams: "女子200米自由泳决赛", status: "即将开始", link: "#" },
    { date: "2024-08-15", time: "14:00", sport: "乒乓球", venue: "巴黎南竞技场", teams: "男单四分之一决赛", status: "未开始", link: "#" },
    { date: "2024-08-15", time: "16:45", sport: "篮球", venue: "皮埃尔·莫鲁瓦球场", teams: "女子小组赛：美国 vs 法国", status: "未开始", link: "#" },
    { date: "2024-08-16", time: "09:30", sport: "体操", venue: "贝尔西体育馆", teams: "女子团体决赛", status: "未开始", link: "#" },
    { date: "2024-08-16", time: "11:15", sport: "击剑", venue: "大皇宫", teams: "男子重剑个人决赛", status: "未开始", link: "#" },
    { date: "2024-08-16", time: "15:00", sport: "网球", venue: "罗兰·加洛斯", teams: "男子单打半决赛", status: "未开始", link: "#" },
    { date: "2024-08-16", time: "19:00", sport: "举重", venue: "巴黎会议宫", teams: "男子81公斤级决赛", status: "未开始", link: "#" }
];

// 赛事中心页面功能初始化（整合版）
function initMatchCenterPage() {
    // 原有核心逻辑
    initScheduleTable();
    initScheduleFilters();
    
    // 新增增强功能
    enhanceMatchTableStyle(); // 包含微闪动画样式
    initMatchStatusUpdate();
    initMatchResultModal();
    initMatchTableSort();
    initMatchFavoriteFunction(); // 收藏功能
    initLiveFlashAnimation(); // 初始化进行中微闪动画
}

// ===================== 原有核心功能（修正版） =====================
// 初始化赛事表格
function initScheduleTable() {
    const scheduleTable = document.getElementById('scheduleTable');
    if (!scheduleTable) {
        console.warn('未找到赛事表格容器：scheduleTable');
        return;
    }
    
    renderScheduleTable(scheduleData);
}

// 渲染赛事表格
function renderScheduleTable(data) {
    const scheduleTable = document.getElementById('scheduleTable');
    if (!scheduleTable) return;
    
    scheduleTable.innerHTML = '';
    
    if (data.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="7" style="text-align:center; padding:20px; color:#666;">暂无匹配的赛事数据</td>`;
        scheduleTable.appendChild(emptyRow);
        return;
    }
    
    data.forEach(item => {
        const row = document.createElement('tr');
        row.dataset.matchKey = `${item.date}_${item.time}_${item.teams}`; // 新增唯一标识用于收藏
        
        // 根据状态设置样式
        let statusClass = '';
        if (item.status === "进行中") statusClass = 'live';
        else if (item.status === "即将开始") statusClass = 'upcoming';
        else statusClass = 'pending'; // 修正：未开始统一用pending类
        
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td>${item.sport}</td>
            <td>${item.venue}</td>
            <td>${item.teams}</td>
            <td><span class="event-status ${statusClass}">${item.status}</span></td>
            <td>
                <a href="${item.link}" class="schedule-link">观看直播</a>
                <button class="favorite-btn" data-match-key="${row.dataset.matchKey}" style="margin-left:5px; padding:2px 6px; border:none; border-radius:3px; cursor:pointer; background:#f8f9fa;">
                    <i class="fas fa-star ${isMatchFavorite(row.dataset.matchKey) ? 'text-yellow' : ''}"></i>
                </button>
            </td>
        `;
        
        scheduleTable.appendChild(row);
    });
}

// 初始化赛事筛选
function initScheduleFilters() {
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const favoriteFilterBtn = document.getElementById('favoriteFilterBtn'); // 新增收藏筛选按钮
    
    // 初始化收藏筛选按钮（如果存在）
    if (favoriteFilterBtn) {
        favoriteFilterBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                this.innerHTML = '<i class="fas fa-star text-yellow"></i> 仅看收藏';
                const favoriteKeys = getFavoriteMatchKeys();
                const filteredData = scheduleData.filter(item => {
                    const matchKey = `${item.date}_${item.time}_${item.teams}`;
                    return favoriteKeys.includes(matchKey);
                });
                renderScheduleTable(filteredData);
            } else {
                this.innerHTML = '<i class="fas fa-star"></i> 收藏筛选';
                renderScheduleTable(scheduleData);
            }
            
            // 重新初始化增强功能
            initMatchStatusUpdate();
            initMatchResultModal();
            initMatchTableSort();
            initMatchFavoriteFunction();
            initLiveFlashAnimation(); // 重新初始化微闪动画
        });
    }
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyScheduleFilters);
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetScheduleFilters);
    }
}

// 应用赛事筛选
function applyScheduleFilters() {
    const sportFilter = document.getElementById('sportFilter');
    const dateFilter = document.getElementById('dateFilter');
    const countryFilter = document.getElementById('countryFilter');
    
    const sportValue = sportFilter ? sportFilter.value : 'all';
    const dateValue = dateFilter ? dateFilter.value : '';
    const countryValue = countryFilter ? countryFilter.value.toLowerCase() : '';
    
    let filteredData = [...scheduleData];
    
    // 按项目筛选
    if (sportValue !== 'all') {
        filteredData = filteredData.filter(item => item.sport === getSportName(sportValue));
    }
    
    // 按日期筛选
    if (dateValue) {
        filteredData = filteredData.filter(item => item.date === dateValue);
    }
    
    // 按国家筛选
    if (countryValue) {
        filteredData = filteredData.filter(item => 
            item.teams.toLowerCase().includes(countryValue)
        );
    }
    
    renderScheduleTable(filteredData);
    // 筛选后重新初始化增强功能
    initMatchStatusUpdate();
    initMatchResultModal();
    initMatchTableSort();
    initMatchFavoriteFunction();
    initLiveFlashAnimation(); // 重新初始化微闪动画
}

// 重置赛事筛选
function resetScheduleFilters() {
    const sportFilter = document.getElementById('sportFilter');
    const dateFilter = document.getElementById('dateFilter');
    const countryFilter = document.getElementById('countryFilter');
    const favoriteFilterBtn = document.getElementById('favoriteFilterBtn');
    
    if (sportFilter) sportFilter.value = 'all';
    if (dateFilter) dateFilter.value = '2024-08-15';
    if (countryFilter) countryFilter.value = '';
    if (favoriteFilterBtn) {
        favoriteFilterBtn.classList.remove('active');
        favoriteFilterBtn.innerHTML = '<i class="fas fa-star"></i> 收藏筛选';
    }
    
    renderScheduleTable(scheduleData);
    // 重置后重新初始化增强功能
    initMatchStatusUpdate();
    initMatchResultModal();
    initMatchTableSort();
    initMatchFavoriteFunction();
    initLiveFlashAnimation(); // 重新初始化微闪动画
}

// 获取项目名称
function getSportName(sportKey) {
    const sportMap = {
        'athletics': '田径',
        'swimming': '游泳',
        'gymnastics': '体操',
        'table-tennis': '乒乓球',
        'basketball': '篮球',
        'football': '足球',
        'volleyball': '排球'
    };
    
    return sportMap[sportKey] || sportKey;
}

// ===================== 新增增强功能（含微闪动画+收藏） =====================
// 0. 「进行中」微闪动画初始化（核心新增）
function initLiveFlashAnimation() {
    // 移除已存在的动画定时器，避免重复
    if (window.liveFlashTimer) {
        clearInterval(window.liveFlashTimer);
    }
    
    // 每300ms切换一次透明度，实现微闪效果
    window.liveFlashTimer = setInterval(() => {
        document.querySelectorAll('.event-status.live').forEach(el => {
            const currentOpacity = el.style.opacity || 1;
            el.style.opacity = currentOpacity === 1 ? 0.6 : 1;
            // 保留过渡动画，让闪烁更柔和
            el.style.transition = 'opacity 0.2s ease';
        });
    }, 300);
}

// 1. 赛事收藏功能
function initMatchFavoriteFunction() {
    // 初始化收藏按钮事件
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const matchKey = this.getAttribute('data-match-key');
            toggleMatchFavorite(matchKey);
            
            // 更新按钮样式
            const starIcon = this.querySelector('i');
            if (isMatchFavorite(matchKey)) {
                starIcon.classList.add('text-yellow');
                // 提示收藏成功
                showToast('收藏成功！');
            } else {
                starIcon.classList.remove('text-yellow');
                // 提示取消收藏
                showToast('已取消收藏');
            }
        });
    });
}

// 检查赛事是否已收藏
function isMatchFavorite(matchKey) {
    try {
        const favorites = JSON.parse(localStorage.getItem('favoriteMatches') || '[]');
        return favorites.includes(matchKey);
    } catch (e) {
        console.error('读取收藏数据失败:', e);
        localStorage.setItem('favoriteMatches', '[]');
        return false;
    }
}

// 切换赛事收藏状态
function toggleMatchFavorite(matchKey) {
    try {
        let favorites = JSON.parse(localStorage.getItem('favoriteMatches') || '[]');
        if (favorites.includes(matchKey)) {
            favorites = favorites.filter(key => key !== matchKey);
        } else {
            favorites.push(matchKey);
        }
        localStorage.setItem('favoriteMatches', JSON.stringify(favorites));
    } catch (e) {
        console.error('修改收藏数据失败:', e);
        showToast('收藏失败，请重试', 'error');
    }
}

// 获取所有收藏的赛事Key
function getFavoriteMatchKeys() {
    try {
        return JSON.parse(localStorage.getItem('favoriteMatches') || '[]');
    } catch (e) {
        console.error('读取收藏列表失败:', e);
        return [];
    }
}

// 轻提示工具
function showToast(message, type = 'success') {
    // 移除已存在的toast
    const existingToast = document.getElementById('matchToast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.id = 'matchToast';
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '8px 16px';
    toast.style.borderRadius = '4px';
    toast.style.backgroundColor = type === 'success' ? '#27ae60' : '#e74c3c';
    toast.style.color = '#fff';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 显示toast
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // 3秒后隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2000);
}

// 2. 赛事状态实时更新 + 倒计时功能
function initMatchStatusUpdate() {
    const scheduleTable = document.getElementById('scheduleTable');
    if (!scheduleTable) return;

    // 实时更新赛事状态
    function updateMatchStatus() {
        const now = new Date();
        
        document.querySelectorAll('#scheduleTable tr').forEach(row => {
            // 跳过空数据行
            if (row.cells.length === 1 && row.cells[0].colSpan === 7) return;
            
            const dateCell = row.querySelector('td:first-child');
            const timeCell = row.querySelector('td:nth-child(2)');
            const statusCell = row.querySelector('.event-status');
            
            if (!dateCell || !timeCell || !statusCell) return;
            
            const matchDatetime = new Date(`${dateCell.textContent} ${timeCell.textContent}`);
            if (isNaN(matchDatetime.getTime())) {
                console.warn('赛事时间格式错误:', `${dateCell.textContent} ${timeCell.textContent}`);
                return;
            }
            const timeDiff = matchDatetime - now;
            
            // 计算时间差（分钟）
            const diffMinutes = Math.floor(timeDiff / (1000 * 60));
            
            // 更新状态文本
            if (statusCell.classList.contains('upcoming') || statusCell.classList.contains('pending')) {
                if (diffMinutes <= 0) {
                    // 赛事开始 - 自动添加微闪动画
                    statusCell.textContent = '进行中';
                    statusCell.classList.remove('upcoming', 'pending');
                    statusCell.classList.add('live');
                    statusCell.style.opacity = 1; // 初始化透明度
                } else if (diffMinutes <= 15) {
                    // 即将开始（15分钟内）
                    statusCell.textContent = `即将开始(${diffMinutes}分钟后)`;
                    statusCell.classList.remove('pending');
                    statusCell.classList.add('upcoming');
                }
            }
        });
    }

    // 初始化倒计时
    function initMatchCountdown() {
        document.querySelectorAll('#scheduleTable tr').forEach(row => {
            // 跳过空数据行
            if (row.cells.length === 1 && row.cells[0].colSpan === 7) return;
            
            const dateCell = row.querySelector('td:first-child');
            const timeCell = row.querySelector('td:nth-child(2)');
            const statusCell = row.querySelector('.event-status');
            
            if (!dateCell || !timeCell || !statusCell) return;
            
            // 只给未开始/即将开始的赛事添加倒计时
            const isPending = statusCell.textContent === '未开始' || statusCell.textContent.includes('即将开始');
            if (isPending) {
                // 移除已有的倒计时单元格
                const existingCountdown = row.querySelector('.match-countdown');
                if (existingCountdown) {
                    existingCountdown.remove();
                }
                
                const countdownCell = document.createElement('td');
                countdownCell.className = 'match-countdown';
                countdownCell.style.color = '#0055A4';
                countdownCell.style.fontWeight = '600';
                row.appendChild(countdownCell);
                
                // 计算倒计时
                const matchDatetime = new Date(`${dateCell.textContent} ${timeCell.textContent}`);
                if (isNaN(matchDatetime.getTime())) {
                    countdownCell.textContent = '时间格式错误';
                    return;
                }
                
                // 单次更新倒计时
                function updateCountdown() {
                    const now = new Date();
                    const diff = matchDatetime - now;
                    
                    if (diff <= 0) {
                        countdownCell.textContent = '赛事已开始';
                        return;
                    }
                    
                    // 计算天/时/分/秒
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    
                    let countdownText = '';
                    if (days > 0) countdownText += `${days}天`;
                    if (hours > 0) countdownText += `${hours}时`;
                    if (minutes > 0) countdownText += `${minutes}分`;
                    countdownText += `${seconds}秒`;
                    
                    countdownCell.textContent = countdownText;
                }
                
                // 立即执行一次
                updateCountdown();
                // 避免重复定时器
                const timerKey = `countdown_${row.dataset.matchKey}`;
                if (window[timerKey]) clearInterval(window[timerKey]);
                window[timerKey] = setInterval(updateCountdown, 1000);
            }
        });
    }

    // 初始化
    updateMatchStatus();
    initMatchCountdown();
    // 每分钟更新一次状态
    if (!window.matchStatusTimer) {
        window.matchStatusTimer = setInterval(updateMatchStatus, 60000);
    }
}

// 3. 赛事结果快速查看弹窗
function initMatchResultModal() {
    // 移除已存在的弹窗避免重复创建
    const existingModal = document.getElementById('matchResultModal');
    if (existingModal) existingModal.remove();
    
    // 创建结果弹窗
    const resultModal = document.createElement('div');
    resultModal.id = 'matchResultModal';
    resultModal.style.position = 'fixed';
    resultModal.style.top = '0';
    resultModal.style.left = '0';
    resultModal.style.width = '100%';
    resultModal.style.height = '100%';
    resultModal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    resultModal.style.zIndex = '1000';
    resultModal.style.display = 'none';
    resultModal.style.justifyContent = 'center';
    resultModal.style.alignItems = 'center';
    resultModal.style.opacity = '0';
    resultModal.style.transition = 'opacity 0.3s ease';
    
    const modalContent = document.createElement('div');
    modalContent.style.width = '90%';
    modalContent.style.maxWidth = '600px';
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.borderRadius = '8px';
    modalContent.style.padding = '20px';
    modalContent.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.transition = 'transform 0.3s ease';
    
    const modalHeader = document.createElement('div');
    modalHeader.style.display = 'flex';
    modalHeader.style.justifyContent = 'space-between';
    modalHeader.style.alignItems = 'center';
    modalHeader.style.marginBottom = '15px';
    
    const modalTitle = document.createElement('h3');
    modalTitle.id = 'matchResultTitle';
    modalTitle.style.margin = '0';
    modalTitle.style.color = '#0055A4';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#666';
    
    const modalBody = document.createElement('div');
    modalBody.id = 'matchResultBody';
    modalBody.style.lineHeight = '1.6';
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    resultModal.appendChild(modalContent);
    document.body.appendChild(resultModal);
    
    // 关闭弹窗
    closeBtn.addEventListener('click', () => {
        resultModal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            resultModal.style.display = 'none';
        }, 300);
    });
    
    resultModal.addEventListener('click', (e) => {
        if (e.target === resultModal) {
            closeBtn.click();
        }
    });
    
    // 键盘ESC关闭
    document.removeEventListener('keydown', handleEscClose);
    document.addEventListener('keydown', handleEscClose);
    
    function handleEscClose(e) {
        if (e.key === 'Escape' && resultModal.style.display === 'flex') {
            closeBtn.click();
        }
    }
    
    // 为已结束赛事添加查看结果按钮
    function addResultButtons() {
        document.querySelectorAll('#scheduleTable tr').forEach(row => {
            // 跳过空数据行
            if (row.cells.length === 1 && row.cells[0].colSpan === 7) return;
            
            const statusCell = row.querySelector('.event-status');
            const teamsCell = row.querySelector('td:nth-child(5)');
            const linkCell = row.querySelector('td:last-child');
            
            if (!statusCell || !teamsCell || !linkCell) return;
            
            // 移除已存在的结果按钮
            const existingBtn = linkCell.querySelector('button:not(.favorite-btn)');
            if (existingBtn) existingBtn.remove();
            
            const matchKey = `${row.querySelector('td:first-child').textContent} ${row.querySelector('td:nth-child(2)').textContent} ${teamsCell.textContent}`;
            const matchResult = matchResultData[matchKey];
            
            // 已结束赛事添加查看结果按钮
            if (matchResult && matchResult.status === '已结束') {
                statusCell.textContent = '已结束';
                statusCell.classList.remove('live', 'upcoming', 'pending');
                statusCell.classList.add('finished');
                statusCell.style.opacity = 1; // 取消闪烁
                clearInterval(window.liveFlashTimer); // 停止该赛事闪烁（如果有）
                
                // 创建结果按钮
                const resultBtn = document.createElement('button');
                resultBtn.innerHTML = '<i class="fas fa-trophy"></i> 查看结果';
                resultBtn.style.padding = '4px 8px';
                resultBtn.style.background = '#0055A4';
                resultBtn.style.color = '#fff';
                resultBtn.style.border = 'none';
                resultBtn.style.borderRadius = '4px';
                resultBtn.style.cursor = 'pointer';
                resultBtn.style.marginLeft = '5px';
                
                // 点击显示结果
                resultBtn.addEventListener('click', () => {
                    modalTitle.textContent = `${teamsCell.textContent} - 比赛结果`;
                    modalBody.innerHTML = `
                        <div style="margin-bottom:10px; font-size:18px; font-weight:bold;">${matchResult.result}</div>
                        <div style="padding:10px; background:#f8f9fa; border-radius:4px;">${matchResult.report}</div>
                        <div style="margin-top:15px; font-size:14px; color:#666;">
                            <i class="fas fa-info-circle"></i> 数据更新时间: ${updateDataTimeText()}
                        </div>
                    `;
                    // 显示弹窗并添加动画
                    resultModal.style.display = 'flex';
                    setTimeout(() => {
                        resultModal.style.opacity = '1';
                        modalContent.style.transform = 'scale(1)';
                    }, 10);
                });
                
                linkCell.appendChild(resultBtn);
            }
        });
    }
    
    // 辅助函数：获取格式化时间
    function updateDataTimeText() {
        const now = new Date();
        const dateString = now.toISOString().split('T')[0];
        const timeString = now.toTimeString().split(' ')[0].substring(0, 5);
        return `${dateString} ${timeString}`;
    }
    
    addResultButtons();
}

// 4. 赛事表格排序功能
function initMatchTableSort() {
    const scheduleTable = document.getElementById('scheduleTable');
    if (!scheduleTable) return;
    
    // 移除已存在的表头避免重复
    const headerRow = scheduleTable.querySelector('tr th');
    if (headerRow) {
        scheduleTable.removeChild(scheduleTable.firstChild);
    }
    
    // 创建表头行
    const newHeaderRow = document.createElement('tr');
    newHeaderRow.innerHTML = `
        <th style="padding:8px; text-align:left; background:#f8f9fa; cursor:pointer;" data-sort="date">日期 ▼</th>
        <th style="padding:8px; text-align:left; background:#f8f9fa; cursor:pointer;" data-sort="time">时间</th>
        <th style="padding:8px; text-align:left; background:#f8f9fa; cursor:pointer;" data-sort="sport">项目</th>
        <th style="padding:8px; text-align:left; background:#f8f9fa;">场馆</th>
        <th style="padding:8px; text-align:left; background:#f8f9fa;">对阵/赛事</th>
        <th style="padding:8px; text-align:left; background:#f8f9fa; cursor:pointer;" data-sort="status">状态</th>
        <th style="padding:8px; text-align:left; background:#f8f9fa;">操作</th>
    `;
    
    // 插入表头
    scheduleTable.insertBefore(newHeaderRow, scheduleTable.firstChild);
    
    // 排序功能
    let sortDirection = 'asc'; // asc/desc
    let currentSort = 'date';
    
    // 表头点击排序
    document.querySelectorAll('#scheduleTable th[data-sort]').forEach(th => {
        th.addEventListener('click', function() {
            const sortBy = this.getAttribute('data-sort');
            
            // 切换排序方向
            if (currentSort === sortBy) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortDirection = 'asc';
                currentSort = sortBy;
            }
            
            // 更新表头图标
            document.querySelectorAll('#scheduleTable th[data-sort]').forEach(header => {
                header.textContent = header.textContent.replace(' ▲', '').replace(' ▼', '');
                if (header.getAttribute('data-sort') === sortBy) {
                    header.textContent += sortDirection === 'asc' ? ' ▲' : ' ▼';
                }
            });
            
            // 排序数据
            let sortedData = [...scheduleData];
            
            switch(sortBy) {
                case 'date':
                    sortedData.sort((a, b) => {
                        const compare = a.date.localeCompare(b.date);
                        return sortDirection === 'asc' ? compare : -compare;
                    });
                    break;
                case 'time':
                    sortedData.sort((a, b) => {
                        const compare = a.time.localeCompare(b.time);
                        return sortDirection === 'asc' ? compare : -compare;
                    });
                    break;
                case 'sport':
                    sortedData.sort((a, b) => {
                        const compare = a.sport.localeCompare(b.sport);
                        return sortDirection === 'asc' ? compare : -compare;
                    });
                    break;
                case 'status':
                    // 状态排序：进行中 > 即将开始 > 未开始 > 已结束
                    const statusOrder = { '进行中': 0, '即将开始': 1, '未开始': 2, '已结束': 3 };
                    sortedData.sort((a, b) => {
                        const aStatus = statusOrder[a.status] || 3;
                        const bStatus = statusOrder[b.status] || 3;
                        return sortDirection === 'asc' ? aStatus - bStatus : bStatus - aStatus;
                    });
                    break;
            }
            
            // 重新渲染表格
            renderScheduleTable(sortedData);
            // 重新初始化增强功能
            initMatchStatusUpdate();
            initMatchResultModal();
            initMatchTableSort();
            initMatchFavoriteFunction();
            initLiveFlashAnimation(); // 重新初始化微闪动画
        });
    });
}

// 5. 赛事表格样式增强（包含微闪动画基础样式）
function enhanceMatchTableStyle() {
    // 移除已存在的样式避免重复
    const existingStyle = document.querySelector('style[data-match-style]');
    if (existingStyle) existingStyle.remove();
    
    const style = document.createElement('style');
    style.setAttribute('data-match-style', 'true');
    style.textContent = `
        /* 基础样式修正 */
        * { box-sizing: border-box; }
        
        /* 赛事状态样式 + 微闪动画基础样式 */
        .event-status.live { 
            color: #e74c3c; 
            font-weight: bold; 
            opacity: 1;
            transition: opacity 0.2s ease; /* 柔和过渡 */
            position: relative;
        }
        /* 可选：添加小红点闪烁（增强视觉效果） */
        .event-status.live::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #e74c3c;
            margin-right: 4px;
            animation: pulse 1s infinite alternate;
        }
        @keyframes pulse {
            from { transform: scale(0.8); opacity: 0.7; }
            to { transform: scale(1); opacity: 1; }
        }
        .event-status.upcoming { color: #f39c12; }
        .event-status.finished { color: #27ae60; }
        .event-status.pending { color: #95a5a6; }
        
        /* 赛事表格样式 */
        #scheduleTable { width: 100%; border-collapse: collapse; margin: 10px 0; }
        #scheduleTable th, #scheduleTable td { padding: 10px; border: 1px solid #ddd; }
        #scheduleTable th { background-color: #f8f9fa; font-weight: bold; user-select: none; }
        #scheduleTable th:hover { background-color: #e9ecef; }
        #scheduleTable tr:hover { background-color: #f8f9fa; }
        
        /* 倒计时样式 */
        .match-countdown { color: #0055A4; font-weight: 600; }
        
        /* 结果弹窗样式 */
        #matchResultModal { transition: opacity 0.3s ease; }
        #matchResultModal .modal-content { transition: transform 0.3s ease; }
        
        /* 响应式调整 */
        @media (max-width: 768px) {
            #scheduleTable th:nth-child(4), #scheduleTable td:nth-child(4) { display: none; }
            #scheduleTable { font-size: 14px; }
            #scheduleTable td { padding: 6px; }
            .match-countdown { font-size: 12px; }
        }
        
        /* 按钮样式优化 */
        .schedule-link { color: #0055A4; text-decoration: none; }
        .schedule-link:hover { text-decoration: underline; }
        
        /* 收藏样式 */
        .text-yellow { color: #f1c40f !important; }
        .favorite-btn:hover { background-color: #e9ecef !important; }
        #favoriteFilterBtn { 
            padding: 6px 12px; 
            border: 1px solid #ddd; 
            border-radius: 4px; 
            background: #fff; 
            cursor: pointer;
            margin-left: 10px;
        }
        #favoriteFilterBtn.active { 
            background: #f1c40f; 
            color: #fff; 
            border-color: #f1c40f;
        }
        
        /* Toast提示样式 */
        #matchToast { 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
}
// 表情数据
const emojiData = [
    '😊', '😂', '🤩', '👍', '👏', '💪', '🏆', '🇨🇳', '🔥', '🎉',
    '🥳', '💯', '✨', '🌟', '❤️', '🙌', '👊', '🚀', '🏅', '🥇'
];

// 用户互动页面初始化
function initInteractionPage() {
    initMessageForm();
    loadMessages();
    // 初始化表情选择面板
    initEmojiPanel();
}

// 初始化表情选择面板
function initEmojiPanel() {
    const messageForm = document.getElementById('messageForm');
    if (!messageForm) return;
    
    // 创建表情按钮
    const emojiBtn = document.createElement('button');
    emojiBtn.id = 'emojiBtn';
    emojiBtn.innerHTML = '<i class="fas fa-smile"></i>';
    emojiBtn.style.padding = '8px 12px';
    emojiBtn.style.border = '1px solid #ddd';
    emojiBtn.style.borderRadius = '4px 0 0 4px';
    emojiBtn.style.backgroundColor = '#f8f9fa';
    emojiBtn.style.cursor = 'pointer';
    emojiBtn.style.marginRight = '-1px';
    
    // 创建图片上传按钮
    const uploadBtn = document.createElement('button');
    uploadBtn.id = 'uploadBtn';
    uploadBtn.innerHTML = '<i class="fas fa-image"></i>';
    uploadBtn.style.padding = '8px 12px';
    uploadBtn.style.border = '1px solid #ddd';
    uploadBtn.style.borderRadius = '0 4px 4px 0';
    uploadBtn.style.backgroundColor = '#f8f9fa';
    uploadBtn.style.cursor = 'pointer';
    
    // 创建文件输入
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    fileInput.id = 'imageUpload';
    
    // 插入到表单
    const contentContainer = document.querySelector('.message-content-container');
    if (contentContainer) {
        const btnGroup = document.createElement('div');
        btnGroup.style.display = 'flex';
        btnGroup.style.marginBottom = '10px';
        btnGroup.appendChild(emojiBtn);
        btnGroup.appendChild(uploadBtn);
        btnGroup.appendChild(fileInput);
        contentContainer.prepend(btnGroup);
    }
    
    // 创建表情面板
    const emojiPanel = document.createElement('div');
    emojiPanel.id = 'emojiPanel';
    emojiPanel.style.position = 'absolute';
    emojiPanel.style.backgroundColor = '#fff';
    emojiPanel.style.border = '1px solid #ddd';
    emojiPanel.style.borderRadius = '4px';
    emojiPanel.style.padding = '10px';
    emojiPanel.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    emojiPanel.style.display = 'none';
    emojiPanel.style.flexWrap = 'wrap';
    emojiPanel.style.gap = '5px';
    emojiPanel.style.zIndex = '100';
    emojiPanel.style.maxWidth = '300px';
    
    // 添加表情
    emojiData.forEach(emoji => {
        const emojiItem = document.createElement('span');
        emojiItem.textContent = emoji;
        emojiItem.style.padding = '5px 8px';
        emojiItem.style.borderRadius = '4px';
        emojiItem.style.cursor = 'pointer';
        emojiItem.style.fontSize = '16px';
        
        emojiItem.addEventListener('mouseenter', () => {
            emojiItem.style.backgroundColor = '#f0f0f0';
        });
        emojiItem.addEventListener('mouseleave', () => {
            emojiItem.style.backgroundColor = 'transparent';
        });
        
        // 点击插入表情
        emojiItem.addEventListener('click', () => {
            const messageContent = document.getElementById('messageContent');
            if (messageContent) {
                messageContent.value += emoji;
                messageContent.dispatchEvent(new Event('input'));
            }
            emojiPanel.style.display = 'none';
        });
        
        emojiPanel.appendChild(emojiItem);
    });
    
    document.body.appendChild(emojiPanel);
    
    // 切换表情面板显示
    emojiBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const rect = emojiBtn.getBoundingClientRect();
        emojiPanel.style.top = `${rect.bottom + 5}px`;
        emojiPanel.style.left = `${rect.left}px`;
        emojiPanel.style.display = emojiPanel.style.display === 'none' ? 'flex' : 'none';
    });
    
    // 点击空白处关闭表情面板
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#emojiBtn') && !e.target.closest('#emojiPanel')) {
            emojiPanel.style.display = 'none';
        }
    });
    
    // 图片上传
    uploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // 限制文件大小（5MB）
        if (file.size > 5 * 1024 * 1024) {
            alert('图片大小不能超过5MB');
            return;
        }
        
        // 读取图片并显示预览
        const reader = new FileReader();
        reader.onload = function(event) {
            // 创建预览图
            const preview = document.createElement('img');
            preview.src = event.target.result;
            preview.style.maxWidth = '100%';
            preview.style.maxHeight = '200px';
            preview.style.marginTop = '10px';
            
            // 检查是否已有预览
            const existingPreview = document.querySelector('.image-preview');
            if (existingPreview) {
                existingPreview.remove();
            }
            
            preview.className = 'image-preview';
            contentContainer.appendChild(preview);
            
            // 保存图片数据到隐藏字段
            let imageDataInput = document.getElementById('imageData');
            if (!imageDataInput) {
                imageDataInput = document.createElement('input');
                imageDataInput.type = 'hidden';
                imageDataInput.id = 'imageData';
                messageForm.appendChild(imageDataInput);
            }
            imageDataInput.value = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// 初始化留言表单
function initMessageForm() {
    const messageForm = document.getElementById('messageForm');
    const messageContent = document.getElementById('messageContent');
    const charCount = document.getElementById('charCount');
    const formSuccess = document.getElementById('formSuccess');
    const userName = document.getElementById('userName');
    const nameError = document.getElementById('nameError');
    const contentError = document.getElementById('contentError');
    
    if (messageContent && charCount) {
        messageContent.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (contentError) {
                if (count > 0 && count < 10) {
                    contentError.textContent = `还需输入${10 - count}个字符`;
                    contentError.style.display = 'block';
                } else {
                    contentError.style.display = 'none';
                }
            }
            
            validateForm();
        });
    }
    
    if (userName && nameError) {
        userName.addEventListener('blur', function() {
            if (!this.value.trim()) {
                nameError.textContent = '请输入您的姓名';
                nameError.style.display = 'block';
            } else {
                nameError.style.display = 'none';
            }
        });
    }
    
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const userNameVal = userName ? userName.value : '';
                const contentVal = messageContent ? messageContent.value : '';
                const emotion = document.querySelector('input[name="emotion"]:checked')?.value || 'support';
                // 获取图片数据
                const imageDataInput = document.getElementById('imageData');
                const imageData = imageDataInput ? imageDataInput.value : '';
                
                const newMessage = {
                    id: Date.now(),
                    userName: userNameVal,
                    content: contentVal,
                    emotion: emotion,
                    time: new Date().toLocaleString(),
                    likes: 0,
                    liked: false,
                    imageData: imageData,
                    replies: [] // 回复列表
                };
                
                saveMessage(newMessage);
                messageForm.reset();
                if (charCount) charCount.textContent = '0';
                
                // 移除图片预览
                const preview = document.querySelector('.image-preview');
                if (preview) preview.remove();
                if (imageDataInput) imageDataInput.value = '';
                
                if (formSuccess) {
                    formSuccess.style.display = 'flex';
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 3000);
                }
                
                loadMessages();
            }
        });
    }
}

// 验证表单
function validateForm() {
    const userName = document.getElementById('userName');
    const messageContent = document.getElementById('messageContent');
    const nameError = document.getElementById('nameError');
    const contentError = document.getElementById('contentError');
    let isValid = true;
    
    if (userName && nameError) {
        if (!userName.value.trim()) {
            nameError.textContent = '请输入您的姓名';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
    }
    
    if (messageContent && contentError) {
        if (messageContent.value.length < 10) {
            contentError.textContent = '留言内容至少需要10个字符';
            contentError.style.display = 'block';
            isValid = false;
        } else {
            contentError.style.display = 'none';
        }
    }
    
    return isValid;
}

// 保存留言到本地存储
function saveMessage(message) {
    try {
        let messages = JSON.parse(localStorage.getItem('olympicMessages') || '[]');
        messages.unshift(message);
        localStorage.setItem('olympicMessages', JSON.stringify(messages));
    } catch (e) {
        console.error('保存留言失败:', e);
    }
}

// 保存回复
function saveReply(messageId, replyContent) {
    try {
        let messages = JSON.parse(localStorage.getItem('olympicMessages') || '[]');
        const messageIndex = messages.findIndex(msg => msg.id === messageId);
        
        if (messageIndex !== -1) {
            const reply = {
                id: Date.now(),
                userName: '我',
                content: replyContent,
                time: new Date().toLocaleString()
            };
            
            // 限制最多2级回复
            if (!messages[messageIndex].replies) {
                messages[messageIndex].replies = [];
            }
            
            messages[messageIndex].replies.push(reply);
            localStorage.setItem('olympicMessages', JSON.stringify(messages));
            return true;
        }
    } catch (e) {
        console.error('保存回复失败:', e);
    }
    return false;
}

// 加载留言列表
function loadMessages() {
    const messageList = document.getElementById('messageList');
    const messageCount = document.getElementById('messageCount');
    
    if (!messageList || !messageCount) return;
    
    let messages = [];
    try {
        messages = JSON.parse(localStorage.getItem('olympicMessages') || '[]');
    } catch (e) {
        console.error('加载留言失败:', e);
        localStorage.setItem('olympicMessages', '[]');
    }
    
    messageCount.textContent = messages.length;
    messageList.innerHTML = '';
    
    if (messages.length === 0) {
        messageList.innerHTML = '<p class="no-messages">暂无留言，快来发表第一条留言吧！</p>';
        return;
    }
    
    messages.forEach((message, index) => {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.style.opacity = '0';
        messageItem.style.transform = 'translateY(20px)';
        messageItem.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
        
        const emotionConfig = {
            support: { icon: 'fa-hands-helping', class: 'emotion-support', text: '支持' },
            expect: { icon: 'fa-star', class: 'emotion-expect', text: '期待' },
            cheer: { icon: 'fa-trophy', class: 'emotion-cheer', text: '加油' }
        };
        
        const emotion = emotionConfig[message.emotion] || emotionConfig.support;
        const firstChar = message.userName.charAt(0).toUpperCase();
        
        // 构建留言HTML
        let messageHtml = `
            <div class="message-header">
                <div class="message-user">
                    <div class="message-avatar">${firstChar}</div>
                    <div class="message-info">
                        <h4>${message.userName}</h4>
                        <div class="message-time">${message.time}</div>
                    </div>
                </div>
                <span class="message-emotion ${emotion.class}">
                    <i class="fas ${emotion.icon}"></i> ${emotion.text}
                </span>
            </div>
            <div class="message-content">${message.content}</div>
        `;
        
        // 添加图片
        if (message.imageData) {
            messageHtml += `
                <div class="message-image" style="margin:10px 0;">
                    <img src="${message.imageData}" style="max-width:100%; max-height:200px; border-radius:4px;">
                </div>
            `;
        }
        
        // 添加操作按钮（点赞+回复）
        messageHtml += `
            <div class="message-actions" style="display:flex; gap:10px; margin-top:10px;">
                <button class="like-btn ${message.liked ? 'liked' : ''}" data-id="${message.id}">
                    <i class="fas fa-heart"></i> 点赞 (${message.likes || 0})
                </button>
                <button class="reply-btn" data-id="${message.id}">
                    <i class="fas fa-reply"></i> 回复
                </button>
            </div>
        `;
        
        // 回复区域
        messageHtml += `
            <div class="reply-container" data-id="${message.id}" style="margin-top:10px; display:none;">
                <textarea class="reply-input" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px; margin-bottom:5px; resize:none;" placeholder="输入回复内容..."></textarea>
                <button class="submit-reply-btn" data-id="${message.id}" style="padding:6px 12px; background:#0055A4; color:#fff; border:none; border-radius:4px; cursor:pointer;">
                    提交回复
                </button>
                <button class="cancel-reply-btn" style="padding:6px 12px; background:#eee; border:none; border-radius:4px; cursor:pointer; margin-left:5px;">
                    取消
                </button>
            </div>
        `;
        
        // 回复列表
        messageHtml += `<div class="replies-list" style="margin-top:10px; padding-left:20px; border-left:2px solid #eee;">`;
        
        // 渲染回复
        if (message.replies && message.replies.length > 0) {
            message.replies.forEach(reply => {
                messageHtml += `
                    <div class="reply-item" style="padding:8px; background:#f8f9fa; border-radius:4px; margin-bottom:5px;">
                        <div style="font-weight:bold; font-size:14px;">${reply.userName}</div>
                        <div style="font-size:14px; margin:5px 0;">${reply.content}</div>
                        <div style="font-size:12px; color:#666;">${reply.time}</div>
                    </div>
                `;
            });
        }
        
        messageHtml += `</div>`;
        
        messageItem.innerHTML = messageHtml;
        messageList.appendChild(messageItem);
        
        setTimeout(() => {
            messageItem.style.opacity = '1';
            messageItem.style.transform = 'translateY(0)';
        }, 50);
    });
    
    addLikeEventListeners();
    // 添加回复事件监听
    addReplyEventListeners();
}

// 添加回复事件监听
function addReplyEventListeners() {
    // 回复按钮
    const replyBtns = document.querySelectorAll('.reply-btn');
    replyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const messageId = this.getAttribute('data-id');
            const replyContainer = document.querySelector(`.reply-container[data-id="${messageId}"]`);
            if (replyContainer) {
                replyContainer.style.display = 'block';
                // 聚焦输入框
                const replyInput = replyContainer.querySelector('.reply-input');
                if (replyInput) replyInput.focus();
            }
        });
    });
    
    // 取消回复
    const cancelBtns = document.querySelectorAll('.cancel-reply-btn');
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const replyContainer = this.closest('.reply-container');
            if (replyContainer) {
                replyContainer.style.display = 'none';
                // 清空输入框
                const replyInput = replyContainer.querySelector('.reply-input');
                if (replyInput) replyInput.value = '';
            }
        });
    });
    
    // 提交回复
    const submitBtns = document.querySelectorAll('.submit-reply-btn');
    submitBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const messageId = parseInt(this.getAttribute('data-id'));
            const replyContainer = this.closest('.reply-container');
            const replyInput = replyContainer.querySelector('.reply-input');
            const replyContent = replyInput.value.trim();
            
            if (!replyContent) {
                alert('回复内容不能为空');
                return;
            }
            
            if (saveReply(messageId, replyContent)) {
                loadMessages();
            } else {
                alert('回复失败，请重试');
            }
        });
    });
}

// 添加点赞事件监听
function addLikeEventListeners() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.style.transition = 'all 0.3s ease';
        
        button.addEventListener('click', function() {
            const messageId = parseInt(this.getAttribute('data-id'));
            toggleLike(messageId, this);
            
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// 切换点赞状态
function toggleLike(messageId, button) {
    try {
        let messages = JSON.parse(localStorage.getItem('olympicMessages') || '[]');
        const messageIndex = messages.findIndex(msg => msg.id === messageId);
        
        if (messageIndex !== -1) {
            if (messages[messageIndex].liked) {
                messages[messageIndex].likes--;
            } else {
                messages[messageIndex].likes++;
            }
            
            messages[messageIndex].liked = !messages[messageIndex].liked;
            localStorage.setItem('olympicMessages', JSON.stringify(messages));
            
            button.classList.toggle('liked');
            if (messages[messageIndex].liked) {
                button.style.color = '#e74c3c';
            } else {
                button.style.color = '';
            }
            button.innerHTML = `<i class="fas fa-heart"></i> 点赞 (${messages[messageIndex].likes})`;
        }
    } catch (e) {
        console.error('点赞失败:', e);
    }
}
// 新闻展开/收起功能
function toggleNews(link) {
    const newsCard = link.closest('.news-card');
    const fullText = newsCard.querySelector('.news-full');
    const newsImage = newsCard.querySelector('.news-image');
    const arrowIcon = link.querySelector('i');
    
    if (fullText.style.display === 'none' || !fullText.style.display) {
        // 展开新闻
        fullText.style.display = 'block';
        if (newsImage) newsImage.style.display = 'block';
        link.innerHTML = '收起 <i class="fas fa-arrow-up"></i>';
        link.classList.add('expanded');
        
        // 平滑滚动到展开的内容
        fullText.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        // 收起新闻
        fullText.style.display = 'none';
        if (newsImage) newsImage.style.display = 'none';
        link.innerHTML = '阅读更多 <i class="fas fa-arrow-right"></i>';
        link.classList.remove('expanded');
    }
}

// 在页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 确保所有新闻图片初始隐藏
    document.querySelectorAll('.news-image').forEach(img => {
        img.style.display = 'none';
    });
});