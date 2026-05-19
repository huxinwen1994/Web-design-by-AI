// 高清图片URL映射 - 使用Unsplash API获取高质量图片
const imageMapping = {
    'banner.jpg': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=400&fit=crop&q=90',
    'plant-trees.jpg': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop&q=90',
    'car-policy.jpg': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop&q=90',
    'metro-line.jpg': 'https://images.unsplash.com/photo-1581262177000-8c2d80f6c477?w=800&h=600&fit=crop&q=90',
    'university-ranking.jpg': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop&q=90',
    'winter-olympic.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=90',
    'space-day.jpg': 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop&q=90',
    'charity-banner.jpg': 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&h=500&fit=crop&q=90',
    'education-charity.jpg': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&q=90',
    'lunch-charity.jpg': 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&h=600&fit=crop&q=90',
    'environment-charity.jpg': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop&q=90',
    'volunteer-news.jpg': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop&q=90',
    'donation-news.jpg': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&q=90',
    'disability-news.jpg': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop&q=90',
    'rural-development.jpg': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop&q=90',
    'education-reform.jpg': 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop&q=90',
    'digital-economy.jpg': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=90',
    'home.jpg': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop&q=90',
    'imf-report.jpg': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&q=90',
    'asean-summit.jpg': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop&q=90',
    'climate-conference.jpg': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop&q=90',
    'olympic-venue.jpg': 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=600&fit=crop&q=90'
};

// 当页面加载完成后替换所有图片
// 注意：已禁用Unsplash图片替换，直接使用本地图片以确保所有图片都能正常显示
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    // 为所有图片添加淡入效果
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s';
        
        // 当图片加载完成时显示
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.onload = function() {
                this.style.opacity = '1';
            };
            img.onerror = function() {
                this.style.opacity = '1';
                console.warn('图片加载失败:', this.src);
            };
        }
    });
    
    // 如果需要使用 Unsplash 高清图片，请取消下面代码的注释
    /*
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const filename = src.split('/').pop();
            if (imageMapping[filename]) {
                img.setAttribute('src', imageMapping[filename]);
            }
        }
    });
    */
});
