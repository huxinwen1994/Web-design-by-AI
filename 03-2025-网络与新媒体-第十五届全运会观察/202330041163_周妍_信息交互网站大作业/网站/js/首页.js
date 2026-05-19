// 轮播图：无缝循环切换
const wrapper = document.querySelector('.carousel-wrapper');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const totalSlides = slides.length; // 总共6张（4张真实 + 2张克隆）
const totalRealSlides = 4; // 真实图片数量
let currentSlide = 1; // 从第一张真实图片开始（索引1，因为索引0是克隆的最后一张）
let autoTimer = null;
let isTransitioning = false;

function applySlide(withAnimation = true) {
    if (!wrapper) return;
    wrapper.style.transition = withAnimation ? 'transform 0.8s ease-in-out' : 'none';
    // 每张slide占16.666%，所以移动currentSlide * 16.666%
    wrapper.style.transform = `translateX(-${currentSlide * 16.666}%)`;
}

function resetAutoPlay() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => changeSlide(1), 5000);
}

function changeSlide(direction) {
    if (!slides.length || isTransitioning) return;
    
    isTransitioning = true;
    currentSlide += direction;
    applySlide(true);
    resetAutoPlay();
    
    // 检查是否需要重置位置（在动画完成后瞬间跳转）
    setTimeout(() => {
        if (currentSlide === 0) {
            // 从克隆的最后一张（索引0）跳回真实的最后一张（索引4）
            wrapper.style.transition = 'none';
            currentSlide = totalRealSlides;
            applySlide(false);
            // 恢复过渡效果
            setTimeout(() => {
                wrapper.style.transition = 'transform 0.8s ease-in-out';
                isTransitioning = false;
            }, 50);
        } else if (currentSlide === totalRealSlides + 1) {
            // 从克隆的第一张（索引5）跳回真实的第一张（索引1）
            wrapper.style.transition = 'none';
            currentSlide = 1;
            applySlide(false);
            // 恢复过渡效果
            setTimeout(() => {
                wrapper.style.transition = 'transform 0.8s ease-in-out';
                isTransitioning = false;
            }, 50);
        } else {
            isTransitioning = false;
        }
    }, 800); // 等待动画完成（0.8s）
}

// 初始渲染：定位到第一张真实图片
applySlide(false);
resetAutoPlay();

// 展开更多新闻功能
function toggleNews(button) {
        const newsBlock = button.parentElement;
        const allNewsItems = Array.from(newsBlock.querySelectorAll('.news-item'));
         const buttonText = button.textContent.trim();

         if (buttonText === '展开更多') {
             const hiddenItems = allNewsItems.filter(item => !item.classList.contains('visible')).slice(0, 5);
             hiddenItems.forEach(item => {
                item.classList.add('visible');
            });
            button.textContent = '收起';
        } else {
            const visibleItems = allNewsItems.filter(item => item.classList.contains('visible')).slice(-5);
            visibleItems.forEach(item => {
                item.classList.remove('visible');
            });
            button.textContent = '展开更多';
        }
        }

