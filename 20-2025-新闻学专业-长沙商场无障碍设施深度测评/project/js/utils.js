// 通用工具函数

/**
 * 创建几何元素（圆点和线条）
 * @param {HTMLElement} container - 容器元素
 * @param {string} dotClass - 圆点类名
 * @param {string} lineClass - 线条类名
 * @param {number} dotCount - 圆点数量
 * @param {number} lineCount - 线条数量
 * @param {Object} options - 配置选项
 */
function createGeometryElements(container, dotClass, lineClass, dotCount, lineCount, options = {}) {
    const {
        dotSizeRange = [5, 25],
        lineLengthRange = [50, 250],
        lineThicknessRange = [1, 4],
        maxDistance = 400
    } = options;

    // 创建圆点
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = dotClass;
        
        const size = Math.random() * (dotSizeRange[1] - dotSizeRange[0]) + dotSizeRange[0];
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        
        // 从中心向外发散的位置
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * maxDistance + 100;
        const centerX = 50; // 百分比
        const centerY = 50; // 百分比
        
        const x = centerX + Math.cos(angle) * distance / window.innerWidth * 100;
        const y = centerY + Math.sin(angle) * distance / window.innerHeight * 100;
        
        dot.style.left = x + '%';
        dot.style.top = y + '%';
        
        container.appendChild(dot);
    }
    
    // 创建线条
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = lineClass;
        
        const length = Math.random() * (lineLengthRange[1] - lineLengthRange[0]) + lineLengthRange[0];
        const thickness = Math.random() * (lineThicknessRange[1] - lineThicknessRange[0]) + lineThicknessRange[0];
        const angle = Math.random() * 360;
        
        line.style.width = length + 'px';
        line.style.height = thickness + 'px';
        
        // 从中心向外发散的位置
        const centerX = 50; // 百分比
        const centerY = 50; // 百分比
        const distance = Math.random() * 300 + 100;
        
        const x = centerX + Math.cos(angle * Math.PI / 180) * distance / window.innerWidth * 100;
        const y = centerY + Math.sin(angle * Math.PI / 180) * distance / window.innerHeight * 100;
        
        line.style.left = x + '%';
        line.style.top = y + '%';
        line.style.transform = `rotate(${angle}deg) scale(0)`;
        
        container.appendChild(line);
    }
}

/**
 * 动画几何元素
 * @param {NodeList} dots - 圆点元素列表
 * @param {NodeList} lines - 线条元素列表
 * @param {Object} options - 动画选项
 */
function animateGeometryElements(dots, lines, options = {}) {
    const {
        dotTransition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.8s ease',
        lineTransition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease',
        opacity = 0.7
    } = options;

    dots.forEach(dot => {
        dot.style.transition = dotTransition;
        dot.style.opacity = opacity;
        dot.style.transform = 'scale(1)';
    });
    
    lines.forEach(line => {
        line.style.transition = lineTransition;
        line.style.opacity = opacity;
        line.style.transform = 'scale(1)';
    });
}

/**
 * 添加按钮点击反馈
 */
function initButtonFeedback() {
    const buttons = document.querySelectorAll('button, .geo-button, .detail-btn, .watch-full-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95) translateY(2px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 导出工具函数
window.AppUtils = {
    createGeometryElements,
    animateGeometryElements,
    initButtonFeedback,
    debounce
};