// JavaScript交互功能实现

// ========== 功能1: 新闻搜索/筛选功能 ==========
function initSearchFunction() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const newsCards = document.querySelectorAll('.news-card, .charity-card, .feature-article');
    
    if (searchBtn && searchInput) {
        // 点击搜索按钮
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        // 按下回车键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let matchCount = 0;
        
        newsCards.forEach(card => {
            const title = card.querySelector('h3, h2');
            const content = card.querySelector('p');
            const cardText = (title ? title.textContent : '') + (content ? content.textContent : '');
            
            if (searchTerm === '' || cardText.toLowerCase().includes(searchTerm)) {
                card.style.display = '';
                card.classList.remove('hidden');
                matchCount++;
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });
        
        // 显示搜索结果提示
        showSearchResult(searchTerm, matchCount);
    }
    
    function showSearchResult(term, count) {
        // 移除之前的提示
        const oldMsg = document.querySelector('.search-result-msg');
        if (oldMsg) oldMsg.remove();
        
        if (term !== '') {
            const msg = document.createElement('div');
            msg.className = 'search-result-msg';
            msg.textContent = `搜索"${term}"找到 ${count} 条结果`;
            
            const container = document.querySelector('.container');
            if (container) {
                const pageTitle = container.querySelector('.page-title');
                if (pageTitle) {
                    pageTitle.insertAdjacentElement('afterend', msg);
                }
            }
        }
    }
}

// ========== 功能2: 内容展开/折叠功能 ==========
function initExpandCollapse() {
    // 为所有新闻卡片添加展开/折叠功能
    const newsCards = document.querySelectorAll('.news-card-content');
    
    newsCards.forEach(card => {
        const paragraphs = card.querySelectorAll('p:not(.date)');
        
        // 如果有多段内容，添加展开/折叠功能
        if (paragraphs.length > 1) {
            // 初始隐藏除第一段外的内容
            for (let i = 1; i < paragraphs.length; i++) {
                paragraphs[i].classList.add('collapsed-content');
                paragraphs[i].style.display = 'none';
            }
            
            // 创建展开/折叠按钮
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'toggle-btn';
            toggleBtn.textContent = '展开更多 ▼';
            toggleBtn.style.cssText = 'background: none; border: none; color: #c62828; cursor: pointer; font-size: 14px; padding: 5px 0; font-weight: bold;';
            
            // 插入按钮
            const dateElement = card.querySelector('.date');
            if (dateElement) {
                dateElement.insertAdjacentElement('beforebegin', toggleBtn);
            } else {
                card.appendChild(toggleBtn);
            }
            
            // 添加点击事件
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const isExpanded = this.textContent.includes('收起');
                
                for (let i = 1; i < paragraphs.length; i++) {
                    paragraphs[i].style.display = isExpanded ? 'none' : 'block';
                }
                
                this.textContent = isExpanded ? '展开更多 ▼' : '收起内容 ▲';
            });
        }
    });
    
    // 为深读页面添加展开/折叠
    const featureArticle = document.querySelector('.feature-article');
    if (featureArticle) {
        const articleContent = featureArticle.querySelector('.article-content');
        if (articleContent) {
            const paragraphs = articleContent.querySelectorAll('p');
            if (paragraphs.length > 3) {
                // 初始只显示前3段
                for (let i = 3; i < paragraphs.length; i++) {
                    paragraphs[i].style.display = 'none';
                }
                
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'btn';
                toggleBtn.textContent = '阅读全文';
                toggleBtn.style.cssText += ' margin-top: 20px;';
                
                articleContent.appendChild(toggleBtn);
                
                toggleBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const isExpanded = this.textContent.includes('收起');
                    
                    for (let i = 3; i < paragraphs.length; i++) {
                        paragraphs[i].style.display = isExpanded ? 'none' : 'block';
                    }
                    
                    this.textContent = isExpanded ? '阅读全文' : '收起内容';
                });
            }
        }
    }
}

// ========== 功能3: 导航栏移动端响应式菜单 ==========
function initMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    
    // 创建汉堡菜单按钮
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = 'display: none; background: none; border: none; color: white; font-size: 28px; cursor: pointer; padding: 5px;';
    
    if (navbar) {
        const logo = navbar.querySelector('.logo');
        if (logo) {
            logo.insertAdjacentElement('afterend', menuToggle);
        }
        
        const navLinks = navbar.querySelector('.nav-links');
        const authLinks = navbar.querySelector('.auth-links');
        
        menuToggle.addEventListener('click', function() {
            if (navLinks) {
                navLinks.classList.toggle('mobile-active');
            }
            if (authLinks) {
                authLinks.classList.toggle('mobile-active');
            }
        });
    }
}

// ========== 功能4: 返回顶部按钮 ==========
function initBackToTop() {
    // 创建返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #c62828;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        z-index: 1000;
        transition: background-color 0.3s;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // 显示/隐藏按钮
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
    
    // 鼠标悬停效果
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#9b1c1c';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#c62828';
    });
}

// ========== 功能5: 表单验证（用于登录和注册页面） ==========
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');
            
            // 清除之前的错误消息
            document.querySelectorAll('.error-msg').forEach(msg => msg.remove());
            
            inputs.forEach(input => {
                const value = input.value.trim();
                
                // 检查必填项
                if (value === '') {
                    showError(input, '此字段不能为空');
                    isValid = false;
                    return;
                }
                
                // 邮箱验证
                if (input.type === 'email') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(value)) {
                        showError(input, '请输入有效的邮箱地址');
                        isValid = false;
                    }
                }
                
                // 密码长度验证
                if (input.type === 'password' && value.length < 6) {
                    showError(input, '密码至少需要6个字符');
                    isValid = false;
                }
                
                // 确认密码验证
                if (input.name === 'confirm-password') {
                    const password = form.querySelector('input[name="password"]');
                    if (password && value !== password.value) {
                        showError(input, '两次输入的密码不一致');
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // 显示成功消息
                const successMsg = document.createElement('div');
                successMsg.className = 'success-msg';
                successMsg.textContent = '提交成功！';
                successMsg.style.cssText = 'background-color: #4caf50; color: white; padding: 15px; margin: 15px 0; border-radius: 4px; text-align: center;';
                
                form.insertAdjacentElement('beforebegin', successMsg);
                
                // 3秒后清除表单
                setTimeout(() => {
                    form.reset();
                    successMsg.remove();
                }, 3000);
            }
        });
    });
    
    function showError(input, message) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-msg';
        errorMsg.textContent = message;
        errorMsg.style.cssText = 'color: #c62828; font-size: 12px; margin-top: 5px;';
        
        input.style.borderColor = '#c62828';
        input.parentElement.appendChild(errorMsg);
        
        // 输入时移除错误提示
        input.addEventListener('input', function() {
            this.style.borderColor = '#ddd';
            const error = this.parentElement.querySelector('.error-msg');
            if (error) error.remove();
        });
    }
}

// ========== 功能6: 模态框管理 ==========
function createModal(title, content) {
    // 移除旧的模态框
    const oldModal = document.getElementById('dynamicModal');
    if (oldModal) oldModal.remove();
    
    // 创建新的模态框
    const modal = document.createElement('div');
    modal.id = 'dynamicModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => modal.style.display = 'block', 10);
    
    // 关闭按钮事件
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 300);
    };
    
    // 点击背景关闭
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        }
    };
    
    return modal;
}

// ========== 功能7: 比赛参与表单 ==========
function initCharityForms() {
    // 为所有“我要参与”按钮添加事件
    const participateBtns = document.querySelectorAll('.charity-card-content .btn');
    participateBtns.forEach(btn => {
        if (btn.textContent.includes('我要参与')) {
            btn.onclick = function(e) {
                e.preventDefault();
                showParticipationForm();
            };
        }
    });
    
    // 为“立即报名”按钮添加事件
    const registerBtns = document.querySelectorAll('a.btn');
    registerBtns.forEach(btn => {
        if (btn.textContent.includes('立即报名')) {
            btn.onclick = function(e) {
                e.preventDefault();
                showVolunteerForm();
            };
        }
    });
}

function showParticipationForm() {
    const formContent = `
        <form id="participationForm">
            <div class="form-group">
                <label>姓名 *</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>联系电话 *</label>
                <input type="tel" name="phone" required>
            </div>
            <div class="form-group">
                <label>电子邮箱 *</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>年龄（岁）</label>
                <input type="number" name="amount" min="1" placeholder="请输入您的年龄">
            </div>
            <div class="form-group">
                <label>作品提交</label>
                <textarea name="message" placeholder="jpg/png"></textarea>
            </div>
            <button type="submit" class="btn" style="width: 100%;">提交</button>
        </form>
    `;
    
    const modal = createModal('比赛参与', formContent);
    
    // 表单提交事件
    setTimeout(() => {
        const form = document.getElementById('participationForm');
        if (form) {
            form.onsubmit = function(e) {
                e.preventDefault();
                handleFormSubmit(form, '感谢您的参与！获奖结果将短信发送至您手机');
            };
        }
    }, 100);
}

function showVolunteerForm() {
    const formContent = `
        <form id="volunteerForm">
            <div class="form-group">
                <label>姓名 *</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>联系电话 *</label>
                <input type="tel" name="phone" required>
            </div>
            <div class="form-group">
                <label>电子邮箱 *</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>意向比赛</label>
                <select name="activity" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 6px;">
                    <option>古代文学作品</option>
                    <option>现代文学作品</option>
                    <option>当代文学作品</option>
                    </select>
            </div>
            <div class="form-group">
                <label>自我介绍</label>
                <textarea name="introduction" placeholder="请简单介绍一下您的经历和特长..."></textarea>
            </div>
            <button type="submit" class="btn" style="width: 100%;">提交报名</button>
        </form>
    `;
    
    const modal = createModal('志愿者报名', formContent);
    
    setTimeout(() => {
        const form = document.getElementById('volunteerForm');
        if (form) {
            form.onsubmit = function(e) {
                e.preventDefault();
                handleFormSubmit(form, '报名成功！');
            };
        }
    }, 100);
}

function handleFormSubmit(form, successMessage) {
    // 验证表单
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#c62828';
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    if (!isValid) {
        alert('请填写所有必填项！');
        return;
    }
    
    // 模拟提交
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> 提交中...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // 显示成功消息
        const modal = document.getElementById('dynamicModal');
        if (modal) {
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <div style="font-size: 60px; color: #4caf50; margin-bottom: 20px;">✔</div>
                    <h3 style="margin-bottom: 15px;">提交成功！</h3>
                    <p style="color: #666;">${successMessage}</p>
                    <button class="btn" onclick="document.getElementById('dynamicModal').style.display='none';" style="margin-top: 20px;">关闭</button>
                </div>
            `;
        }
    }, 1500);
}

// ========== 功能8: 反馈按钮 ==========
function initFeedbackButton() {
    const feedbackBtn = document.createElement('div');
    feedbackBtn.className = 'feedback-btn';
    feedbackBtn.textContent = '意见反馈';
    document.body.appendChild(feedbackBtn);
    
    feedbackBtn.onclick = function() {
        showFeedbackForm();
    };
}

function showFeedbackForm() {
    const formContent = `
        <form id="feedbackForm">
            <div class="form-group">
                <label>反馈类型 *</label>
                <select name="type" required style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 6px;">
                    <option value="">请选择</option>
                    <option>功能建议</option>
                    <option>问题报告</option>
                    <option>内容建议</option>
                    <option>其他</option>
                </select>
            </div>
            <div class="form-group">
                <label>您的姓名</label>
                <input type="text" name="name" placeholder="可选">
            </div>
            <div class="form-group">
                <label>您的邮箱</label>
                <input type="email" name="email" placeholder="方便我们联系您">
            </div>
            <div class="form-group">
                <label>详细内容 *</label>
                <textarea name="content" required placeholder="请详细描述您的反馈内容..."></textarea>
            </div>
            <button type="submit" class="btn" style="width: 100%;">提交反馈</button>
        </form>
    `;
    
    const modal = createModal('意见反馈', formContent);
    
    setTimeout(() => {
        const form = document.getElementById('feedbackForm');
        if (form) {
            form.onsubmit = function(e) {
                e.preventDefault();
                handleFormSubmit(form, '感谢您的反馈！我们将认真考虑您的建议。');
            };
        }
    }, 100);
}

// ========== 功能9: 动态页面生成 ==========
function createDynamicPage(title, content) {
    // 创建一个新的文章页面
    const articleHTML = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} - 华心报</title>
            <link rel="stylesheet" href="../css/style.css">
            <script src="../js/main.js"></script>
            <script src="../js/images.js"></script>
        </head>
        <body>
            <nav class="navbar">
                <div class="container">
                    <div class="logo"><img src="../assets/logo.png" alt="华心报Logo">华心报</div>
                    <ul class="nav-links">
                        <li><a href="../index.html">首页</a></li>
                        <li><a href="shendu.html">深读</a></li>
                        <li><a href="gongyi.html">公益</a></li>
                        <li><a href="kandian.html">第一看点</a></li>
                        <li><a href="shishi.html">时事</a></li>
                        <li><a href="hot.html">最近热文</a></li>
                    </ul>
                    <ul class="auth-links">
                        <li><a href="login.html">登录</a></li>
                        <li><a href="register.html">注册</a></li>
                    </ul>
                </div>
            </nav>
            <div class="container">
                <div class="article-page">
                    <h1>${title}</h1>
                    <div class="article-meta">
                        <span>作者：华心报记者</span>
                        <span>发布时间：${new Date().toLocaleDateString('zh-CN')}</span>
                        <span>阅读量：${Math.floor(Math.random() * 50000) + 1000}</span>
                    </div>
                    ${content}
                </div>
            </div>
            <footer class="footer">
                <div class="container">
                    <ul class="footer-links">
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">联系方式</a></li>
                        <li><a href="#">广告服务</a></li>
                        <li><a href="#">隐私政策</a></li>
                        <li><a href="#">版权声明</a></li>
                    </ul>
                    <p class="copyright">© 2025 华心报网站 版权所有</p>
                </div>
            </footer>
        </body>
        </html>
    `;
    return articleHTML;
}

// ========== 功能10: 侧边栏链接点击事件 ==========
// 注释掉：不再需要模态框功能，链接直接跳转到详细页面
// function initSidebarLinks() {
//     const sidebarLinks = document.querySelectorAll('.sidebar a[href="#"]');
//     
//     sidebarLinks.forEach(link => {
//         link.onclick = function(e) {
//             e.preventDefault();
//             const title = this.textContent;
//             showArticleModal(title);
//         };
//     });
// }

// function showArticleModal(title) {
//     const content = `
//         <div style="padding: 20px;">
//             <p style="font-size: 16px; line-height: 1.8; margin-bottom: 15px;">
//                 这是关于「${title}」的详细内容。本文将深入探讨该话题的背景、现状和未来发展趋势。
//             </p>
//             <p style="font-size: 16px; line-height: 1.8; margin-bottom: 15px;">
//                 随着社会的不断发展，这一领域的变化日新月异。从政策制定到实际执行，
//                 每个环节都体现了国家对此的高度重视。
//             </p>
//             <p style="font-size: 16px; line-height: 1.8; margin-bottom: 15px;">
//                 未来，我们将继续关注这一领域的发展，为读者带来更多深度报道和分析。
//             </p>
//             <div style="text-align: center; margin-top: 25px;">
//                 <button class="btn" onclick="document.getElementById('dynamicModal').style.display='none';">关闭</button>
//             </div>
//         </div>
//     `;
//     
//     createModal(title, content);
// }

// ========== 页面加载完成后初始化所有功能 ==========
document.addEventListener('DOMContentLoaded', function() {
    initSearchFunction();
    initExpandCollapse();
    initMobileMenu();
    initBackToTop();
    initFormValidation();
    initCharityForms();
    initFeedbackButton();
    // initSidebarLinks(); // 已注释：不再需要模态框功能
    
    console.log('所有交互功能已加载完成！');
});
