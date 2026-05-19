// js/counter.js - 独立的新闻点击计数功能

// 等待页面完全加载
window.addEventListener('load', function() {
    console.log('counter.js 已加载 - 开始初始化计数功能');
    
    // 获取计数器元素
    const clickCounterElement = document.getElementById('click-counter');
    if (!clickCounterElement) {
        console.error('未找到计数器元素 #click-counter');
        return;
    }
    
    // 初始化计数（从本地存储读取）
    let clickCount = 0;
    clickCounterElement.textContent = clickCount;
    console.log('当前计数:', clickCount);
    
    // 为所有新闻标题链接添加点击事件
    const newsTitles = document.querySelectorAll('.news-title');
    console.log('找到新闻标题数量:', newsTitles.length);
    
    newsTitles.forEach((title, index) => {
        // 找到标题内的链接（如果有）
        const link = title.querySelector('a');
        
        if (link) {
            // 新闻标题中有链接
            link.addEventListener('click', function(event) {
                // 增加计数
                clickCount++;
                clickCounterElement.textContent = clickCount;
                console.log(`点击了新闻 ${index + 1}, 新计数: ${clickCount}`);
                
                // 视觉反馈
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            });
        } else {
            // 新闻标题没有链接，给标题本身添加点击事件
            title.style.cursor = 'pointer';
            title.addEventListener('click', function() {
                // 增加计数
                clickCount++;
                clickCounterElement.textContent = clickCount;
                localStorage.setItem('newsClickCount', clickCount);
                console.log(`点击了新闻 ${index + 1}, 新计数: ${clickCount}`);
                
                // 视觉反馈
                this.style.color = '#c17c54';
                setTimeout(() => {
                    this.style.color = '';
                }, 500);
            });
        }
    });
    
    console.log('计数功能初始化完成');
});