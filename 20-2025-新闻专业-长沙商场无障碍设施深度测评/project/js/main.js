// 主应用入口

class AccessibilityApp {
    constructor() {
        this.currentPage = 'home-page';
        this.splashAnimation = null;
        this.navigation = null;
        this.init();
    }

    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startApp());
        } else {
            this.startApp();
        }
    }

    startApp() {
        // 初始化所有模块
        this.initAnimations();
        this.initNavigation();
        this.initEventListeners();
        
        console.log('无障碍测评应用已初始化');
    }

    initAnimations() {
        // 开屏动画逻辑
        this.splashAnimation = new SplashAnimation();
        this.splashAnimation.animate();
    }

    initNavigation() {
        // 页面导航逻辑
        this.navigation = new Navigation();
        this.currentPage = this.navigation.getCurrentPage();
   const pages = document.querySelectorAll('.page');
    console.log('已注册页面:', Array.from(pages).map(page => page.id)); }

    initEventListeners() {
        // 全局事件监听
        this.bindGlobalEvents();
        
        // 窗口调整大小事件
        window.addEventListener('resize', AppUtils.debounce(() => {
            this.handleResize();
        }, 250));
    }

    bindGlobalEvents() {
        // 键盘导航支持
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    handleKeyboardNavigation(e) {
        // 左右箭头键切换页面
        if (e.key === 'ArrowRight') {
            this.navigation.next();
        } else if (e.key === 'ArrowLeft') {
            this.navigation.prev();
        }
        
        // ESC键返回首页
        if (e.key === 'Escape') {
            this.navigation.navigateTo('home-page');
        }
    }

    handleResize() {
        // 响应式处理
        console.log('窗口大小改变，当前页面:', this.currentPage);
        
        // 可以在这里添加响应式相关的逻辑
        // 比如重新计算布局、调整动画元素位置等
    }

    // 获取应用状态（用于调试）
    getAppState() {
        return {
            currentPage: this.currentPage,
            navigation: this.navigation ? '已初始化' : '未初始化',
            splashAnimation: this.splashAnimation ? '已初始化' : '未初始化'
        };
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', function() {
    window.app = new AccessibilityApp();
    
    // 将应用实例暴露给全局，方便调试
    console.log('应用已启动，使用 app.getAppState() 查看状态');
});