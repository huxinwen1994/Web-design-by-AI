// 动画管理模块

class SplashAnimation {
    constructor() {
        this.splashScreen = document.getElementById('splash-screen');
        this.splashGeometry = document.getElementById('splash-geometry');
        this.accessibleText = document.querySelector('.accessible-text');
        this.orText = document.querySelector('.or-text');
        this.notText = document.querySelector('.not-text');
    }

    // 创建开屏动画元素
    createSplashElements() {
        if (!this.splashGeometry) return;
        
        AppUtils.createGeometryElements(
            this.splashGeometry,
            'splash-dot',
            'splash-line',
            25, // 圆点数量
            15  // 线条数量
        );
    }

    // 执行开屏动画
    animate() {
        this.createSplashElements();
        
        // 第一阶段：圆点和线条动画
        setTimeout(() => {
            const dots = document.querySelectorAll('.splash-dot');
            const lines = document.querySelectorAll('.splash-line');
            
            AppUtils.animateGeometryElements(dots, lines);
        }, 300);
        
        // 第二阶段：文字动画
        setTimeout(() => {
            if (this.accessibleText) this.accessibleText.style.transform = 'translateX(0)';
            if (this.orText) this.orText.style.transform = 'scale(1)';
            if (this.notText) this.notText.style.transform = 'translateX(0)';
        }, 800);
        
        // 第三阶段：淡出
        setTimeout(() => {
            this.hide();
        }, 2500);
    }

    // 隐藏开屏动画
    hide() {
        if (!this.splashScreen) return;
        
        this.splashScreen.style.transition = 'opacity 0.8s ease';
        this.splashScreen.style.opacity = '0';
        
        setTimeout(() => {
            this.splashScreen.style.display = 'none';
        }, 800);
    }
}

class PageTransition {
    constructor() {
        this.transitionOverlay = document.getElementById('page-transition');
    }

    // 创建页面切换动画
    create(direction = 'next') {
        if (!this.transitionOverlay) return;
        
        this.transitionOverlay.innerHTML = '';
        this.transitionOverlay.style.display = 'block';
        
        // 创建圆点元素
        for (let i = 0; i < 20; i++) {
            const dot = document.createElement('div');
            dot.className = 'transition-dot';
            
            const size = Math.random() * 30 + 10;
            dot.style.width = size + 'px';
            dot.style.height = size + 'px';
            
            // 随机位置
            dot.style.top = Math.random() * 100 + '%';
            dot.style.left = Math.random() * 100 + '%';
            
            // 根据方向设置初始位置
            if (direction === 'next') {
                dot.style.transform = 'scale(0) translateX(-100vw)';
            } else {
                dot.style.transform = 'scale(0) translateX(100vw)';
            }
            
            this.transitionOverlay.appendChild(dot);
            
            // 动画
            setTimeout(() => {
                dot.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease';
                dot.style.transform = 'scale(1) translateX(0)';
                dot.style.opacity = '0.7';
            }, i * 30);
        }
        
        // 创建线条元素
        for (let i = 0; i < 12; i++) {
            const line = document.createElement('div');
            line.className = 'transition-line';
            
            const length = Math.random() * 200 + 50;
            const thickness = Math.random() * 4 + 1;
            
            line.style.width = length + 'px';
            line.style.height = thickness + 'px';
            
            // 随机位置和旋转
            line.style.top = Math.random() * 100 + '%';
            line.style.left = Math.random() * 100 + '%';
            line.style.transform = 'scale(0) rotate(' + (Math.random() * 360) + 'deg)';
            
            this.transitionOverlay.appendChild(line);
            
            // 动画
            setTimeout(() => {
                line.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease';
                line.style.transform = 'scale(1) rotate(' + (Math.random() * 360) + 'deg)';
                line.style.opacity = '0.7';
            }, i * 40);
        }
        
        // 隐藏过渡层
        setTimeout(() => {
            this.hide();
        }, 800);
    }

    // 隐藏过渡动画
    hide() {
        if (!this.transitionOverlay) return;
        
        this.transitionOverlay.style.transition = 'opacity 0.5s ease';
        this.transitionOverlay.style.opacity = '0';
        
        setTimeout(() => {
            this.transitionOverlay.style.display = 'none';
            this.transitionOverlay.style.opacity = '1';
        }, 500);
    }
}

// 导出动画类
window.SplashAnimation = SplashAnimation;
window.PageTransition = PageTransition;