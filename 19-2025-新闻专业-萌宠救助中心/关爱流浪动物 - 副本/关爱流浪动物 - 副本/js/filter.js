/**
 * 动物筛选功能 - filter.js
 * 基于data属性实现精确的多条件筛选
 */

(function() {
    var filterBar = document.querySelector('.filter-bar');
    if (!filterBar) return;
    
    var filterLinks = filterBar.querySelectorAll('a');
    var adoptCards = document.querySelectorAll('.adopt-card');
    
    // 当前筛选条件
    var currentFilters = {
        type: '',    // 'cat' or 'dog'
        age: '',     // 'young', 'adult', 'senior'
        size: ''     // 'small', 'medium', 'large'
    };
    
    // 类型映射
    var typeMap = {
        '全部': '',
        '猫咪': 'cat',
        '狗狗': 'dog'
    };
    
    var ageMap = {
        '幼年': 'young',
        '成年': 'adult',
        '老年': 'senior'
    };
    
    var sizeMap = {
        '小型': 'small',
        '中型': 'medium',
        '大型': 'large'
    };
    
    // 获取筛选类别
    function getFilterCategory(link) {
        var prevSibling = link.parentElement.previousElementSibling;
        while (prevSibling && prevSibling.tagName !== 'SPAN') {
            prevSibling = prevSibling.previousElementSibling;
        }
        
        if (prevSibling) {
            var text = prevSibling.innerText || prevSibling.textContent;
            return text.replace('：', '').replace(':', '');
        }
        return '';
    }
    
    // 更新筛选条件
    function updateFilter(category, value) {
        if (category === '类型') {
            currentFilters.type = typeMap[value] || '';
        } else if (category === '年龄') {
            currentFilters.age = ageMap[value] || '';
        } else if (category === '体型') {
            currentFilters.size = sizeMap[value] || '';
        }
    }
    
    // 执行筛选
    function filterCards() {
        var visibleCount = 0;
        
        for (var i = 0; i < adoptCards.length; i++) {
            var card = adoptCards[i];
            var show = true;
            
            // 类型筛选
            if (currentFilters.type !== '') {
                var cardType = card.getAttribute('data-type');
                if (cardType !== currentFilters.type) {
                    show = false;
                }
            }
            
            // 年龄筛选
            if (currentFilters.age !== '') {
                var cardAge = card.getAttribute('data-age');
                if (cardAge !== currentFilters.age) {
                    show = false;
                }
            }
            
            // 体型筛选
            if (currentFilters.size !== '') {
                var cardSize = card.getAttribute('data-size');
                if (cardSize !== currentFilters.size) {
                    show = false;
                }
            }
            
            // 显示或隐藏卡片
            if (show) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        }
        
        // 显示筛选结果数量
        console.log('筛选结果：' + visibleCount + ' 只动物');
    }
    
    // 绑定点击事件
    for (var i = 0; i < filterLinks.length; i++) {
        filterLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            var value = this.innerText || this.textContent;
            var category = getFilterCategory(this);
            
            // 移除同组的active类
            var siblings = this.parentElement.querySelectorAll('a');
            for (var j = 0; j < siblings.length; j++) {
                siblings[j].className = siblings[j].className.replace(/\s*active/g, '');
            }
            
            // 添加当前的active类
            if (this.className.indexOf('active') === -1) {
                this.className += ' active';
            }
            
            // 更新筛选条件
            updateFilter(category, value);
            
            // 执行筛选
            filterCards();
        });
    }
    
    console.log('filter.js 已加载完成');
})();
