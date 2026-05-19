// 选项卡切换函数
function switchTab(tabName, shouldScroll = true) {
    // 隐藏所有标签内容
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    // 移除所有按钮激活状态
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    // 显示目标标签，激活目标按钮
    document.getElementById(tabName).classList.add('active');
    
    // 找到对应的选项卡按钮并激活
    const targetButton = Array.from(tabButtons).find(button => {
        return button.textContent.trim() === (tabName === 'call' ? '运动健儿加油区' : '赛事讨论区');
    });
    if (targetButton) {
        targetButton.classList.add('active');
    }
    
    if (shouldScroll) {
        const tabsTop = document.querySelector('.tabs');
        if (tabsTop) {
            tabsTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

        // 图片预览函数
        function previewImages(event, type) {
            const previewContainer = document.getElementById(type + '-preview');
            previewContainer.innerHTML = ''; // 清空原有预览
            const files = event.target.files;
            if (files.length === 0) return;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.startsWith('image/')) continue;

                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    previewContainer.appendChild(img);
                }
                reader.readAsDataURL(file);
            }
        }

// 发布帖子函数
function addPost(type) {
    const input = document.getElementById(type + '-input');
    const inputValue = input.value.trim();
    if (!inputValue) {
        alert('请输入内容后再发布！');
        return;
    }

    // 获取预览图片（简化版，实际项目需处理文件上传）
    const previewContainer = document.getElementById(type + '-preview');
    const previewImages = previewContainer.getElementsByTagName('img');
    let imgSrc = './images/default.jpg'; // 默认图片
    if (previewImages.length > 0) {
        imgSrc = previewImages[0].src;
    }

    // 创建新帖子卡片
    const postCard = document.createElement('div');
    postCard.className = 'post-card ' + type;
    
    // 组装帖子内容
    const postHtml = `
        <img src="${imgSrc}" alt="用户上传图片" class="post-images">
        <div class="post-content">
            <div class="post-header">
                <span class="post-author">我</span>
            </div>
            <div class="post-text">${inputValue}</div>
            ${type === 'discuss' ? '<div class="post-time">' + new Date().toLocaleString() + '</div>' : ''}
        </div>
    `;
    postCard.innerHTML = postHtml;

    // 添加到帖子列表顶部
    const postsGrid = document.getElementById(type + '-posts');
    postsGrid.insertBefore(postCard, postsGrid.firstChild);

    // 清空输入和预览
    input.value = '';
    previewContainer.innerHTML = '';
    document.getElementById(type + '-image-input').value = '';

    alert('发布成功！');
}

// 让下拉菜单点击不跳到底部，并支持 hash 深链
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'call' || hash === 'discuss') {
        switchTab(hash, false);
        const tabsTop = document.querySelector('.tabs');
        if (tabsTop) {
            tabsTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // 处理下拉菜单点击事件
    document.querySelectorAll('.dropdown-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const targetTab = link.dataset.tab;
            if (!targetTab) {
                console.warn('下拉菜单项缺少data-tab属性');
                return;
            }
            
            // 检查是否在互动页（使用更可靠的方式）
            const currentPage = window.location.pathname || window.location.href;
            const isInteractivePage = currentPage.includes('互动页') || currentPage.includes('互动页.html') || 
                                     document.querySelector('#call') !== null || 
                                     document.querySelector('#discuss') !== null;
            
            if (isInteractivePage) {
                console.log('切换到tab:', targetTab);
                // 确保switchTab函数存在
                if (typeof switchTab === 'function') {
                    switchTab(targetTab, false);
                    history.replaceState(null, '', `#${targetTab}`);
                } else {
                    console.error('switchTab函数未定义');
                }
            } else {
                // 如果是其他页面，跳转到互动页并切换tab
                window.location.href = `./互动页.html#${targetTab}`;
            }
        });
    });
    
    // 防止下拉菜单点击时页面跳转到底部
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // 如果点击的是下拉链接，已经在上面的处理中处理了
            // 这里防止其他情况下的跳转
            if (!item.classList.contains('dropdown-link')) {
                e.stopPropagation();
            }
        });
    });
});

