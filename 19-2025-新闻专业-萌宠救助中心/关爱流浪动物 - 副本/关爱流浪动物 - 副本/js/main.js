/**
 * 主交互脚本文件 - main.js
 * 包含搜索、筛选、表单验证等核心交互功能
 */

// ==================== 搜索功能 ====================
(function() {
    var searchBox = document.querySelector('.search-box input');
    var searchBtn = document.querySelector('.search-btn');
    
    if (!searchBox || !searchBtn) return;
    
    // 搜索功能
    function performSearch(keyword) {
        if (!keyword || keyword.trim() === '') {
            alert('请输入搜索关键词');
            return;
        }
        
        keyword = keyword.trim().toLowerCase();
        
        // 如果在待领养页面，搜索动物
        var adoptCards = document.querySelectorAll('.adopt-card');
        if (adoptCards.length > 0) {
            var foundCount = 0;
            for (var i = 0; i < adoptCards.length; i++) {
                var card = adoptCards[i];
                var text = card.innerText.toLowerCase();
                if (text.indexOf(keyword) > -1) {
                    card.style.display = 'block';
                    foundCount++;
                } else {
                    card.style.display = 'none';
                }
            }
            alert('找到 ' + foundCount + ' 个匹配结果');
        } else {
            // 其他页面高亮显示搜索结果
            alert('搜索功能：正在搜索 "' + keyword + '"');
            // 这里可以实现页面内容高亮等功能
        }
    }
    
    // 点击搜索按钮
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch(searchBox.value);
    });
    
    // 按回车键搜索
    searchBox.addEventListener('keypress', function(e) {
        if (e.keyCode === 13 || e.which === 13) {
            e.preventDefault();
            performSearch(searchBox.value);
        }
    });
})();

// ==================== 待领养页面筛选功能 ====================
(function() {
    var filterBar = document.querySelector('.filter-bar');
    if (!filterBar) return;
    
    var filterLinks = filterBar.querySelectorAll('a');
    var adoptCards = document.querySelectorAll('.adopt-card');
    
    // 为每个动物卡片添加data属性（如果还没有的话）
    // 这里假设已经在HTML中添加了data-type, data-age, data-size属性
    
    // 当前筛选条件
    var currentFilters = {
        type: '全部',
        age: '',
        size: ''
    };
    
    // 点击筛选项
    for (var i = 0; i < filterLinks.length; i++) {
        filterLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            var text = this.innerText;
            var parent = this.parentElement;
            
            // 移除同组的active类
            var siblings = parent.querySelectorAll('a');
            for (var j = 0; j < siblings.length; j++) {
                siblings[j].className = siblings[j].className.replace(' active', '');
            }
            
            // 添加当前的active类
            this.className += ' active';
            
            // 判断筛选类型
            var prevText = parent.previousElementSibling;
            if (prevText && prevText.tagName === 'SPAN') {
                var category = prevText.innerText.replace('：', '');
                if (category === '类型') {
                    currentFilters.type = text;
                } else if (category === '年龄') {
                    currentFilters.age = text;
                } else if (category === '体型') {
                    currentFilters.size = text;
                }
            }
            
            // 执行筛选
            filterCards();
        });
    }
    
    // 筛选卡片
    function filterCards() {
        for (var i = 0; i < adoptCards.length; i++) {
            var card = adoptCards[i];
            var show = true;
            
            // 类型筛选
            if (currentFilters.type !== '全部') {
                var cardText = card.innerText;
                if (currentFilters.type === '猫咪' && cardText.indexOf('猫') === -1) {
                    show = false;
                } else if (currentFilters.type === '狗狗' && cardText.indexOf('狗') === -1) {
                    show = false;
                }
            }
            
            // 年龄筛选（这里是简化版，实际应该用data属性）
            if (currentFilters.age !== '') {
                var cardText = card.innerText;
                if (currentFilters.age === '幼年' && cardText.indexOf('个月') === -1) {
                    show = false;
                } else if (currentFilters.age === '成年') {
                    var hasYear = cardText.match(/\d+\s*岁/);
                    if (!hasYear || parseInt(hasYear[0]) > 7) {
                        show = false;
                    }
                } else if (currentFilters.age === '老年') {
                    var hasYear = cardText.match(/\d+\s*岁/);
                    if (!hasYear || parseInt(hasYear[0]) < 8) {
                        show = false;
                    }
                }
            }
            
            // 体型筛选
            if (currentFilters.size !== '') {
                var cardText = card.innerText;
                if (cardText.indexOf(currentFilters.size) === -1) {
                    show = false;
                }
            }
            
            // 显示或隐藏卡片
            card.style.display = show ? 'block' : 'none';
        }
    }
})();

// ==================== 表单验证功能 ====================
(function() {
    // 邮箱格式验证
    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // 手机号格式验证
    function validatePhone(phone) {
        var re = /^1[3-9]\d{9}$/;
        return re.test(phone);
    }
    
    // 查找所有表单
    var forms = document.querySelectorAll('form');
    
    for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        
        // 跳过搜索框
        if (form.className.indexOf('search-box') > -1) continue;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var isValid = true;
            var errorMsg = [];
            
            // 验证必填项
            var inputs = this.querySelectorAll('input[required], textarea[required]');
            for (var j = 0; j < inputs.length; j++) {
                var input = inputs[j];
                if (!input.value || input.value.trim() === '') {
                    isValid = false;
                    var label = input.getAttribute('placeholder') || input.name || '输入项';
                    errorMsg.push(label + '不能为空');
                }
            }
            
            // 验证邮箱
            var emailInputs = this.querySelectorAll('input[type="email"]');
            for (var k = 0; k < emailInputs.length; k++) {
                var emailInput = emailInputs[k];
                if (emailInput.value && !validateEmail(emailInput.value)) {
                    isValid = false;
                    errorMsg.push('邮箱格式不正确');
                }
            }
            
            // 验证手机号
            var phoneInputs = this.querySelectorAll('input[type="tel"]');
            for (var l = 0; l < phoneInputs.length; l++) {
                var phoneInput = phoneInputs[l];
                if (phoneInput.value && !validatePhone(phoneInput.value)) {
                    isValid = false;
                    errorMsg.push('手机号格式不正确');
                }
            }
            
            // 显示验证结果
            if (!isValid) {
                alert('表单验证失败：\n' + errorMsg.join('\n'));
            } else {
                alert('提交成功！感谢您的参与。\n（这是前端演示，未连接后端）');
                this.reset();
            }
        });
    }
    
    // 实时验证（失去焦点时）
    var allInputs = document.querySelectorAll('input[type="email"], input[type="tel"]');
    for (var m = 0; m < allInputs.length; m++) {
        allInputs[m].addEventListener('blur', function() {
            var value = this.value;
            if (!value) return;
            
            var type = this.getAttribute('type');
            var isValid = true;
            var msg = '';
            
            if (type === 'email' && !validateEmail(value)) {
                isValid = false;
                msg = '邮箱格式不正确';
            } else if (type === 'tel' && !validatePhone(value)) {
                isValid = false;
                msg = '手机号格式不正确';
            }
            
            // 显示错误提示（简化版）
            if (!isValid) {
                this.style.borderColor = 'red';
                // 可以在这里添加错误提示文本
            } else {
                this.style.borderColor = '';
            }
        });
    }
})();

// ==================== 内容展开/折叠功能 ====================
(function() {
    var toggleBtns = document.querySelectorAll('.toggle-more');
    
    for (var i = 0; i < toggleBtns.length; i++) {
        toggleBtns[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            var targetId = this.getAttribute('data-target');
            var target = document.getElementById(targetId);
            
            if (!target) return;
            
            if (target.style.display === 'none' || target.style.display === '') {
                target.style.display = 'block';
                this.innerText = '收起';
            } else {
                target.style.display = 'none';
                this.innerText = '查看更多';
            }
        });
    }
})();

// ==================== 平滑滚动到顶部 ====================
(function() {
    // 创建返回顶部按钮
    var backToTopBtn = document.createElement('div');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = 'position:fixed;bottom:50px;right:50px;width:50px;height:50px;background:#4CAF50;color:#fff;text-align:center;line-height:50px;font-size:24px;cursor:pointer;display:none;z-index:1000;border-radius:50%;box-shadow:0 2px 5px rgba(0,0,0,0.2);';
    backToTopBtn.title = '返回顶部';
    document.body.appendChild(backToTopBtn);
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();

console.log('main.js 已加载完成');
