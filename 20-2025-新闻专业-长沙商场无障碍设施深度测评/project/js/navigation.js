// 页面导航管理

class Navigation {
    constructor() {
        this.pages = document.querySelectorAll('.page');
        this.currentPage = 'home-page';
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateNavigationState();
    }

    // 绑定事件
    bindEvents() {
        const navLinks = document.querySelectorAll('.nav-link, .geo-button, .nav-btn');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                
                if (targetPage) {
                    this.navigateTo(targetPage, link);
                }
            });
        });

        // 绑定阅读全文按钮
        const readFullBtn = document.getElementById('read-full-article');
        if (readFullBtn) {
            readFullBtn.addEventListener('click', () => {
                this.navigateTo('full-article-page');
            });
        }

        // 绑定返回摘要按钮
        const backToSummary = document.getElementById('back-to-summary');
        if (backToSummary) {
            backToSummary.addEventListener('click', () => {
                this.navigateTo('text-news-page');
            });
        }

        // 绑定按钮反馈
        AppUtils.initButtonFeedback();
    }

    // 导航到指定页面
    navigateTo(targetPageId, clickedElement) {
        // 更新导航栏激活状态
        this.updateNavActiveState(targetPageId, clickedElement);
        
        // 获取当前活动页面
        const currentPage = document.querySelector('.page.active');
        const targetPage = document.getElementById(targetPageId);
        
        if (!currentPage || !targetPage) return;
        
        // 确定滑动方向
        const direction = this.getSlideDirection(currentPage, targetPage);
        
        // 创建页面切换动画
        const transition = new PageTransition();
        transition.create(direction);
        
        // 应用滑动动画
        this.animatePageTransition(currentPage, targetPage, direction);
        
        // 更新当前页面
        this.currentPage = targetPageId;
    }

    // 更新导航激活状态
    updateNavActiveState(targetPageId, clickedElement) {
        document.querySelectorAll('.nav-link').forEach(nav => {
            nav.classList.remove('active');
        });
        
        if (clickedElement.classList.contains('nav-link')) {
            clickedElement.classList.add('active');
        } else {
            // 如果是按钮点击，找到对应的导航链接并激活
            const correspondingNav = document.querySelector(`.nav-link[data-page="${targetPageId}"]`);
            if (correspondingNav) {
                correspondingNav.classList.add('active');
            }
        }
    }

    // 获取滑动方向
    getSlideDirection(currentPage, targetPage) {
        const currentIndex = Array.from(this.pages).indexOf(currentPage);
        const targetIndex = Array.from(this.pages).indexOf(targetPage);
        return targetIndex > currentIndex ? 'next' : 'prev';
    }

    // 执行页面切换动画
    animatePageTransition(currentPage, targetPage, direction) {
        if (direction === 'next') {
            currentPage.style.transform = 'translateX(-100%)';
        } else {
            currentPage.style.transform = 'translateX(100%)';
        }
        
        currentPage.classList.remove('active');
        
        setTimeout(() => {
            targetPage.classList.add('active');
            targetPage.style.transform = 'none';
            
            // 滚动到顶部
            targetPage.scrollTop = 0;

            // 触发页面切换完成事件
            const event = new CustomEvent('navigateToPage', {
    detail: { 
        pageId: targetPage.id,
        currentPage: this.currentPage
    }
        });
            document.dispatchEvent(event);
            
        }, 300);
    }

    // 更新导航状态（用于初始化）
    updateNavigationState() {
        // 可以根据需要添加更多导航状态逻辑
        console.log('导航系统已初始化，当前页面:', this.currentPage);
    }

    // 获取当前页面
    getCurrentPage() {
        return this.currentPage;
    }

    // 前进到下一页
    next() {
        const currentIndex = Array.from(this.pages).indexOf(document.getElementById(this.currentPage));
        const nextIndex = (currentIndex + 1) % this.pages.length;
        const nextPage = this.pages[nextIndex].id;
        this.navigateTo(nextPage);
    }

    // 后退到上一页
    prev() {
        const currentIndex = Array.from(this.pages).indexOf(document.getElementById(this.currentPage));
        const prevIndex = (currentIndex - 1 + this.pages.length) % this.pages.length;
        const prevPage = this.pages[prevIndex].id;
        this.navigateTo(prevPage);
    }
}

// 导出导航类
window.Navigation = Navigation;