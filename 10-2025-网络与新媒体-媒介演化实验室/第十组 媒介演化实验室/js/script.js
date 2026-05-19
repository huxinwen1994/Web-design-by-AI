let scrollPosition = 0;

// 粒子背景配置
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00d4ff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00d4ff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// 打字机效果
const typingText = document.querySelector('.typing-text');
const text = '探索媒介的过去、现在与未来';
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// 页面加载时启动打字机效果
window.addEventListener('load', typeWriter);

// 时代详情数据
const eraDetails = {
    oral: {
        title: '口语时代',
        content: '口语是人类最早的传播媒介，它使人类能够分享经验、传承知识。这个时代的传播特点是即时性、面对面、依赖记忆。'
    },
    text: {
        title: '文字时代',
        content: '文字的出现使信息可以跨越时空传播。从楔形文字到甲骨文，文字系统的发展推动了人类文明的进步。'
    },
    print: {
        title: '印刷时代',
        content: '印刷术的发明使知识传播成本大大降低，推动了文艺复兴和宗教改革，开启了大众传播时代。'
    },
    electronic: {
        title: '电子时代',
        content: '电报、电话、广播、电视等电子媒介的出现，使信息传播速度和范围得到革命性提升。'
    },
    network: {
        title: '网络时代',
        content: '互联网的普及使每个人都成为信息的生产者和传播者，社交媒体改变了人际交往方式。'
    },
    ai: {
        title: '智能时代',
        content: '人工智能正在重塑媒介形态，从个性化推荐到智能生成，媒介正在变得更加智能和交互。'
    }
};

// 项目详情数据
const projectDetails = {
    "media-analysis": {
        title: "媒介数据分析",
        description: "基于大数据的媒介传播效果分析系统",
        charts: [
            {
                type: "line",
                id: "trendChart",
                title: "媒介使用趋势分析",
                data: {
                    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                    datasets: [{
                        label: '传统媒体',
                        data: [30, 28, 26, 25, 24, 23],
                        borderColor: '#ff6b35'
                    }, {
                        label: '新媒体',
                        data: [45, 48, 52, 55, 58, 60],
                        borderColor: '#00d4ff'
                    }]
                }
            },
            {
                type: "bar",
                id: "ageChart",
                title: "用户年龄分布",
                data: {
                    labels: ['18-25', '26-35', '36-45', '46-55', '56+'],
                    datasets: [{
                        label: '用户数量',
                        data: [25, 35, 20, 15, 5],
                        backgroundColor: '#00d4ff'
                    }]
                }
            },
            {
                type: "doughnut",
                id: "typeChart",
                title: "媒介类型占比",
                data: {
                    labels: ['视频', '音频', '文字', '图片', '其他'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            '#ff6b35',
                            '#00d4ff',
                            '#4CAF50',
                            '#FFC107',
                            '#9C27B0'
                        ]
                    }]
                }
            }
        ]
    },
    "recommendation-system": {
        title: "智能推荐系统",
        description: "基于用户行为的个性化内容推荐平台",
        charts: [
            {
                type: "radar",
                id: "interestChart",
                title: "用户兴趣分布",
                data: {
                    labels: ['科技', '娱乐', '体育', '新闻', '美食', '旅游'],
                    datasets: [{
                        label: '用户兴趣',
                        data: [85, 72, 68, 90, 75, 82],
                        borderColor: '#00d4ff',
                        backgroundColor: 'rgba(0, 212, 255, 0.2)'
                    }]
                }
            },
            {
                type: "line",
                id: "accuracyChart",
                title: "推荐准确率趋势",
                data: {
                    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                    datasets: [{
                        label: '推荐准确率',
                        data: [75, 78, 82, 85, 88, 92],
                        borderColor: '#ff6b35',
                        backgroundColor: 'rgba(255, 107, 53, 0.1)'
                    }]
                }
            },
            {
                type: "polarArea",
                id: "contentTypeChart",
                title: "内容类型占比",
                data: {
                    labels: ['视频', '文章', '图片', '音频', '直播'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            'rgba(0, 212, 255, 0.5)',
                            'rgba(255, 107, 53, 0.5)',
                            'rgba(76, 175, 80, 0.5)',
                            'rgba(255, 193, 7, 0.5)',
                            'rgba(156, 39, 176, 0.5)'
                        ]
                    }]
                }
            }
        ]
    }
};

// 模拟数据
const feedData = {
    tech: [
        { title: "AI技术新突破", content: "最新的人工智能研究取得重大进展..." },
        { title: "量子计算机商业化", content: "首台商用量子计算机正式发布..." },
        { title: "5G网络全覆盖", content: "城市5G网络建设完成..." }
    ],
    entertainment: [
        { title: "年度最佳电影", content: "今年的电影大奖揭晓..." },
        { title: "明星动态", content: "娱乐圈最新消息..." },
        { title: "音乐节来袭", content: "夏季音乐节阵容公布..." }
    ],
    sports: [
        { title: "世界杯精彩瞬间", content: "昨晚的比赛创造历史..." },
        { title: "NBA季后赛", content: "季后赛进入白热化阶段..." },
        { title: "奥运会筹备", content: "下一届奥运会准备工作..." }
    ],
    news: [
        { title: "国际要闻", content: "全球重要新闻汇总..." },
        { title: "经济动态", content: "最新经济数据发布..." },
        { title: "社会热点", content: "今日社会热点话题..." }
    ],
    food: [
        { title: "美食探店", content: "城市最佳餐厅推荐..." },
        { title: "烹饪技巧", content: "大厨教你做菜..." },
        { title: "美食节", content: "年度美食节即将开幕..." }
    ],
    travel: [
        { title: "最佳旅游目的地", content: "今年最值得去的地方..." },
        { title: "旅行攻略", content: "完美假期规划指南..." },
        { title: "酒店推荐", content: "精选优质酒店推荐..." }
    ]
};

// 获取DOM元素
// 兼容旧的 `.timeline-era` 和新的 `.timeline-item` 选择器
const eraElements = document.querySelectorAll('.timeline-era, .timeline-item');
const modal = document.getElementById('eraModal');
const modalContent = document.querySelector('.era-detail');
const closeModal = document.querySelector('#eraModal .close-modal');
const filterBubbleModal = document.getElementById('filterBubbleModal');
const tagButtons = document.querySelectorAll('.tag-btn');
const generateBtn = document.getElementById('generateFeed');
const feedContainer = document.getElementById('generatedFeed');

// 标签选择功能
tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
    });
});

// 生成信息流
generateBtn.addEventListener('click', () => {
    const selectedTags = Array.from(document.querySelectorAll('.tag-btn.selected'))
        .map(btn => btn.dataset.tag);

    if (selectedTags.length === 0) {
        alert('请至少选择一个兴趣标签！');
        return;
    }

    // 清空现有内容
    feedContainer.innerHTML = '';

    // 生成信息流
    selectedTags.forEach(tag => {
        const items = feedData[tag];
        items.forEach(item => {
            const feedItem = document.createElement('div');
            feedItem.className = 'feed-item';
            feedItem.innerHTML = `
                <h4>${item.title}</h4>
                <p>${item.content}</p>
            `;
            feedContainer.appendChild(feedItem);
        });
    });

    // 添加动画效果
    const feedItems = feedContainer.querySelectorAll('.feed-item');
    feedItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// 为每个时代节点和项目卡片添加点击事件
eraElements.forEach(era => {
    
    // 检查是否是项目卡片
    const isProjectCard = era.querySelector('h3').textContent.includes('项目') ||
                         era.querySelector('h3').textContent.includes('媒介数据分析') ||
                         era.querySelector('h3').textContent.includes('智能推荐系统');

    if (isProjectCard) {
        // 项目卡片点击事件
        era.addEventListener('click', () => {
            // 确定项目类型
            let projectType;
            const title = era.querySelector('h3').textContent;
            if (title.includes('媒介数据分析')) {
                projectType = 'media-analysis';
            } else if (title.includes('智能推荐系统')) {
                projectType = 'recommendation-system';
            } else {
                // 默认项目
                projectType = 'media-analysis';
            }

            const project = projectDetails[projectType];
            
            // 保存当前滚动位置
            scrollPosition = window.pageYOffset;
            document.body.classList.add('modal-open');
            document.body.style.top = `-${scrollPosition}px`;

            // 生成项目模态框内容
            modalContent.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div class="data-analysis-container">
                    ${project.charts.map(chart => `
                        <div class="chart-section">
                            <h3>${chart.title}</h3>
                            <canvas id="${chart.id}"></canvas>
                        </div>
                    `).join('')}
                </div>
            `;

            // 添加样式
            const style = document.createElement('style');
            style.textContent = `
                .data-analysis-container {
                    padding: 20px;
                }
                .chart-section {
                    margin-bottom: 30px;
                    background: rgba(255,255,255,0.05);
                    padding: 20px;
                    border-radius: 10px;
                }
                .chart-section h3 {
                    color: var(--accent-blue);
                    margin-bottom: 15px;
                }
                .chart-section canvas {
                    width: 100% !important;
                    height: auto !important;
                    max-width: none;
                    aspect-ratio: 4/3;
                }
            `;
            document.head.appendChild(style);

            // 初始化图表
            setTimeout(() => {
                project.charts.forEach(chart => {
                    new Chart(document.getElementById(chart.id), {
                        type: chart.type,
                        data: chart.data,
                        options: {
                            responsive: false,
                            maintainAspectRatio: false,
                            scales: chart.type !== 'doughnut' && chart.type !== 'polarArea' ? {
                                y: {
                                    beginAtZero: true
                                }
                            } : {}
                        }
                    });
                });
            }, 100);

            modal.style.display = 'block';
        });
    } else if (era.dataset.era) {
        // 时代节点点击事件
        era.addEventListener('click', () => {
            const eraType = era.dataset.era;
            const details = eraDetails[eraType];

            // 保存当前滚动位置
            scrollPosition = window.pageYOffset;
            document.body.classList.add('modal-open');
            document.body.style.top = `-${scrollPosition}px`;

            // 口语时代的内容
            if (eraType === 'oral') {
                modalContent.innerHTML = `
                    <h2>${details.title}</h2>
                    <p>${details.content}</p>
                    <div class="dialogue-container">
                        <h3>对话模拟器</h3>
                        <div class="chat-container" id="chatContainer"></div>
                        <div class="dialogue-input">
                            <div class="dialogue-roles">
                                <div class="role-container role-a">
                                    <div class="role-avatar">👩</div>
                                    <textarea class="role-text" placeholder="请输入角色A的对话..." rows="2"></textarea>
                                </div>
                                <div class="role-container role-b">
                                    <div class="role-avatar">👨</div>
                                    <textarea class="role-text" placeholder="请输入角色B的对话..." rows="2"></textarea>
                                </div>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                                <button id="speakBtn" class="generate-btn" style="flex: 1; margin-right: 0.5rem;">朗读对话</button>
                                <button id="pauseBtn" class="generate-btn" style="flex: 1; margin-right: 0.5rem; background: var(--accent-orange); display: none;">暂停朗读</button>
                                <button class="add-dialogue-btn">+</button>
                            </div>
                        </div>
                    </div>
                `;

                // 立即初始化对话模拟器并获取停止函数
                const stopSpeaking = initDialogueSimulator();

                // 为口语时代模态框的关闭事件添加停止朗读的功能
                const closeOralModal = () => {
                    stopSpeaking();
                };

                // 重写关闭按钮的点击事件
                const closeBtn = document.querySelector('#eraModal .close-modal');
                const originalCloseHandler = closeBtn.onclick;
                closeBtn.onclick = () => {
                    closeOralModal();
                    if (originalCloseHandler) originalCloseHandler();
                };

                // 重写模态框外部点击关闭事件
                const originalWindowClickHandler = window.onclick;
                window.onclick = (e) => {
                    if (e.target === modal) {
                        closeOralModal();
                    }
                    if (originalWindowClickHandler) originalWindowClickHandler(e);
                };
            }
            // 网络时代
            else if (eraType === 'network') {
                modalContent.innerHTML = `
                    <h2>${details.title}</h2>
                    <p>${details.content}</p>
                    <button class="open-filter-bubble-btn" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--accent-blue); border: none; border-radius: 5px; color: white; cursor: pointer;">
                        体验信息茧房模拟器
                    </button>
                `;

                // 添加打开信息茧房模拟器的按钮事件
                const openFilterBtn = modalContent.querySelector('.open-filter-bubble-btn');
                openFilterBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                    filterBubbleModal.style.display = 'block';
                });
            }
            // 印刷时代
            else if (eraType === 'print') {
                const sentences = [
                    "纸上得来终觉浅",
                    "绝知此事要躬行",
                    "书山有路勤为径",
                    "学海无涯苦作舟"
                ];
                const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
                const characters = randomSentence.split('');

                modalContent.innerHTML = `
                    <h2>${details.title}</h2>
                    <p>${details.content}</p>
                    <h3 style="text-align: center; margin: 20px 0;">印刷术模拟器</h3>
                    <div class="printing-container">
                        <div class="printing-game">
                            <h4>活字印刷模拟</h4>
                            <div class="sentence-display">${randomSentence}</div>
                            <div class="work-area">
                                <div class="paper" id="paper"></div>
                                <div class="types" id="types"></div>
                            </div>
                            <div class="game-info">
                                <div class="timer">时间: <span id="timer">0</span>秒</div>
                                <button id="startGame">开始游戏</button>
                            </div>
                        </div>
                        
                        <div class="typewriter-section">
                            <h4>打字机模拟</h4>
                            <div class="typewriter">
                                <div class="paper-output" id="paperOutput"></div>
                                <div class="keyboard-input">
                                    <input type="text" id="typewriterInput" placeholder="在此输入文本...">
                                    <button id="startPrinting">开始印刷</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // 添加游戏样式
                const style = document.createElement('style');
                style.textContent = `
                    .printing-container {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 2rem;
                        margin-top: 20px;
                    }
                    
                    .printing-game, .typewriter-section {
                        padding: 20px;
                        background: rgba(255,255,255,0.05);
                        border-radius: 10px;
                        height: fit-content;
                    }
                    
                    .printing-game h4, .typewriter-section h4 {
                        color: var(--accent-blue);
                        text-align: center;
                        margin-bottom: 15px;
                    }
                    
                    .sentence-display {
                        font-size: 20px;
                        margin-bottom: 20px;
                        padding: 10px;
                        background: rgba(255,255,255,0.1);
                        border-radius: 5px;
                        text-align: center;
                    }
                    
                    .work-area {
                        position: relative;
                        height: 250px;
                        margin: 15px 0;
                    }
                    
                    .paper {
                        position: absolute;
                        top: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 300px;
                        height: 120px;
                        background: white;
                        border: 2px solid #333;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        padding: 8px;
                    }
                    
                    .types {
                        position: absolute;
                        bottom: 10px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 300px;
                        height: 60px;
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                        padding: 8px;
                        background: rgba(0,0,0,0.1);
                        border-radius: 5px;
                        justify-content: center;
                    }
                    
                    .type {
                        width: 35px;
                        height: 35px;
                        background: #8B4513;
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: move;
                        border-radius: 3px;
                        font-size: 18px;
                        user-select: none;
                    }
                    
                    .type.dragging {
                        opacity: 0.5;
                    }
                    
                    .type.correct {
                        background: #4CAF50;
                    }
                    
                    .type-slot {
                        position: relative;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 35px;
                        height: 35px;
                        border: 2px dashed #ccc;
                    }
                    
                    .type-slot .type {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        margin: 0;
                    }
                    
                    .game-info {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 15px;
                    }
                    
                    .timer {
                        font-size: 16px;
                    }
                    
                    #startGame {
                        padding: 8px 16px;
                        background: var(--accent-blue);
                        border: none;
                        border-radius: 5px;
                        color: white;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    #startGame:hover {
                        background: var(--accent-orange);
                    }
                    
                    .typewriter {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }
                    
                    .paper-output {
                        min-height: 150px;
                        max-height: 200px;
                        padding: 15px;
                        background: white;
                        color: black;
                        border-radius: 5px;
                        font-family: 'SimSun', serif;
                        line-height: 1.6;
                        overflow-y: auto;
                        border: 1px solid #ccc;
                    }
                    
                    .keyboard-input {
                        display: flex;
                        gap: 10px;
                    }
                    
                    #typewriterInput {
                        flex: 1;
                        padding: 8px;
                        background: rgba(255,255,255,0.1);
                        border: 1px solid var(--accent-blue);
                        border-radius: 5px;
                        color: var(--text-primary);
                    }
                    
                    #startPrinting {
                        padding: 8px 16px;
                        background: var(--accent-blue);
                        border: none;
                        border-radius: 5px;
                        color: white;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    #startPrinting:hover {
                        background: var(--accent-orange);
                    }
                    
                    /* 响应式设计 */
                    @media (max-width: 768px) {
                        .printing-container {
                            grid-template-columns: 1fr;
                            gap: 1rem;
                        }
                        
                        .paper {
                            width: 250px;
                        }
                        
                        .types {
                            width: 250px;
                        }
                    }
                `;
                document.head.appendChild(style);

                // 初始化游戏代码
                const paper = document.getElementById('paper');
                const types = document.getElementById('types');
                const timerDisplay = document.getElementById('timer');
                const startButton = document.getElementById('startGame');
                let startTime;
                let timerInterval;
                let draggedElement = null;

                // 初始化打字机功能
                const typewriterInput = modalContent.querySelector('#typewriterInput');
                const startPrintingBtn = modalContent.querySelector('#startPrinting');
                const paperOutput = modalContent.querySelector('#paperOutput');
                
                // 创建活字
                function createTypes() {
                    types.innerHTML = '';
                    const shuffledChars = [...characters].sort(() => Math.random() - 0.5);
                    shuffledChars.forEach(char => {
                        const type = document.createElement('div');
                        type.className = 'type';
                        type.textContent = char;
                        type.draggable = true;
                        types.appendChild(type);
                    });
                }

                // 创建纸张上的空位
                function createPaperSlots() {
                    paper.innerHTML = '';
                    characters.forEach(() => {
                        const slot = document.createElement('div');
                        slot.className = 'type-slot';
                        paper.appendChild(slot);
                    });
                }

                // 开始游戏
                startButton.addEventListener('click', () => {
                    createTypes();
                    createPaperSlots();
                    startTime = Date.now();
                    timerInterval = setInterval(updateTimer, 100);
                    startButton.disabled = true;
                });

                // 更新计时器
                function updateTimer() {
                    const elapsed = Math.floor((Date.now() - startTime) / 1000);
                    timerDisplay.textContent = elapsed;
                }

                // 拖放功能
                types.addEventListener('dragstart', (e) => {
                    if (e.target.classList.contains('type')) {
                        draggedElement = e.target;
                        e.target.classList.add('dragging');
                    }
                });

                types.addEventListener('dragend', (e) => {
                    if (e.target.classList.contains('type')) {
                        e.target.classList.remove('dragging');
                    }
                });

                paper.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    const slot = e.target.closest('.type-slot');
                    if (slot && !slot.querySelector('.type')) {
                        slot.appendChild(draggedElement);
                    }
                });

                paper.addEventListener('drop', (e) => {
                    e.preventDefault();
                    checkWin();
                });

                // 检查是否完成
                function checkWin() {
                    const currentText = Array.from(paper.querySelectorAll('.type')).map(type => type.textContent).join('');
                    if (currentText === randomSentence) {
                        clearInterval(timerInterval);
                        const time = Math.floor((Date.now() - startTime) / 1000);
                        alert(`恭喜完成！用时 ${time} 秒`);
                        startButton.disabled = false;
                    }
                }

                // 打字机功能
                typewriterInput.addEventListener('input', (e) => {
                    e.target.style.borderColor = 'var(--accent-orange)';
                    setTimeout(() => {
                        e.target.style.borderColor = 'var(--accent-blue)';
                    }, 200);
                });

                // 打字机效果的实现
                startPrintingBtn.addEventListener('click', () => {
                    const text = typewriterInput.value.trim();
                    if (!text) {
                        alert('请输入要印刷的文本！');
                        return;
                    }

                    paperOutput.innerHTML = '';
                    let index = 0;

                    function printNextChar() {
                        if (index < text.length) {
                            const char = text[index];
                            
                            const charSpan = document.createElement('span');
                            charSpan.textContent = char;
                            paperOutput.appendChild(charSpan);

                            index++;
                            if (index < text.length) {
                                setTimeout(printNextChar, 200);
                            }
                        }
                    }

                    printNextChar();
                    typewriterInput.value = '';
                });
            }
            // 文字时代
            else if (eraType === 'text') {
                modalContent.innerHTML = `
                    <h2>${details.title}</h2>
                    <p>${details.content}</p>
                    <div class="writing-board">
                        <canvas id="writingCanvas"></canvas>
                        <div class="writing-controls">
                            <div class="tool-section">
                                <div class="color-picker">
                                    <input type="color" id="colorPicker" value="#000000">
                                    <label for="colorPicker">选择颜色</label>
                                </div>
                                <div class="bg-picker">
                                    <label for="bgPicker">背景颜色</label>
                                    <input type="color" id="bgPicker" value="#f8f4e6">
                                </div>
                                <div class="tool-buttons">
                                    <button id="penBtn" class="tool-btn active">画笔</button>
                                    <button id="eraserBtn" class="tool-btn">橡皮擦</button>
                                </div>
                            </div>
                            <div class="action-buttons">
                                <button id="clearBtn">清空</button>
                                <button id="undoBtn">撤销</button>
                                <button id="saveBtn">保存</button>
                            </div>
                        </div>
                    </div>
                `;

                // 添加样式
                const style = document.createElement('style');
                style.textContent = `
                    .writing-board {
                        margin-top: 20px;
                        text-align: center;
                    }
                    #writingCanvas {
                        border: 2px solid var(--accent-blue);
                        cursor: crosshair;
                        background-color: #f8f4e6;
                        background-image: repeating-linear-gradient(
                            0deg,
                            #e0e0e0,
                            #e0e0e0 1px,
                            transparent 1px,
                            transparent 20px
                        ),
                        repeating-linear-gradient(
                            90deg,
                            #e0e0e0,
                            #e0e0e0 1px,
                            transparent 1px,
                            transparent 20px
                        );
                    }
                    .writing-controls {
                        margin-top: 10px;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .tool-section {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 20px;
                        padding: 10px;
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 5px;
                    }
                    .color-picker, .bg-picker {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    #colorPicker, #bgPicker {
                        width: 40px;
                        height: 40px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .tool-buttons {
                        display: flex;
                        gap: 10px;
                    }
                    .tool-btn {
                        padding: 8px 16px;
                        background: var(--accent-blue);
                        border: none;
                        border-radius: 5px;
                        color: white;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .tool-btn.active {
                        background: var(--accent-orange);
                    }
                    .tool-btn:hover {
                        transform: scale(1.05);
                    }
                    .action-buttons {
                        display: flex;
                        justify-content: center;
                        gap: 10px;
                    }
                    .action-buttons button {
                        padding: 8px 16px;
                        background: var(--accent-blue);
                        border: none;
                        border-radius: 5px;
                        color: white;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .action-buttons button:hover {
                        background: var(--accent-orange);
                    }
                `;
                document.head.appendChild(style);

                // 初始化画布
                const canvas = document.getElementById('writingCanvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 600;
                canvas.height = 400;

                let isDrawing = false;
                let lastX = 0;
                let lastY = 0;
                let history = [];
                let currentTool = 'pen';
                let currentColor = '#000000';
                let currentBgColor = '#f8f4e6';

                // 保存当前画布状态
                function saveState() {
                    history.push(canvas.toDataURL());
                    if (history.length > 20) history.shift();
                }

                // 绘制背景
                function drawBackground() {
                    ctx.fillStyle = currentBgColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // 绘制网格线
                    ctx.strokeStyle = '#e0e0e0';
                    ctx.lineWidth = 1;
                    for (let i = 0; i <= canvas.width; i += 20) {
                        ctx.beginPath();
                        ctx.moveTo(i, 0);
                        ctx.lineTo(i, canvas.height);
                        ctx.stroke();
                    }
                    for (let i = 0; i <= canvas.height; i += 20) {
                        ctx.beginPath();
                        ctx.moveTo(0, i);
                        ctx.lineTo(canvas.width, i);
                        ctx.stroke();
                    }
                }

                // 绘制功能
                function startDrawing(e) {
                    isDrawing = true;
                    saveState();
                    const rect = canvas.getBoundingClientRect();
                    lastX = e.clientX - rect.left;
                    lastY = e.clientY - rect.top;
                }

                function draw(e) {
                    if (!isDrawing) return;
                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(x, y);

                    if (currentTool === 'pen') {
                        ctx.globalCompositeOperation = 'source-over';
                        ctx.strokeStyle = currentColor;
                        ctx.lineWidth = 2;
                    } else {
                        ctx.globalCompositeOperation = 'destination-out';
                        ctx.lineWidth = 10;
                    }

                    ctx.lineCap = 'round';
                    ctx.stroke();

                    lastX = x;
                    lastY = y;
                }

                function stopDrawing() {
                    isDrawing = false;
                }

                // 工具切换
                document.getElementById('penBtn').addEventListener('click', () => {
                    currentTool = 'pen';
                    document.getElementById('penBtn').classList.add('active');
                    document.getElementById('eraserBtn').classList.remove('active');
                    canvas.style.cursor = 'crosshair';
                });

                document.getElementById('eraserBtn').addEventListener('click', () => {
                    currentTool = 'eraser';
                    document.getElementById('eraserBtn').classList.add('active');
                    document.getElementById('penBtn').classList.remove('active');
                    canvas.style.cursor = 'grab';
                });

                // 颜色选择
                document.getElementById('colorPicker').addEventListener('change', (e) => {
                    currentColor = e.target.value;
                });

                // 背景颜色选择
                document.getElementById('bgPicker').addEventListener('change', (e) => {
                    currentBgColor = e.target.value;
                    drawBackground();
                });

                // 添加事件监听
                canvas.addEventListener('mousedown', startDrawing);
                canvas.addEventListener('mousemove', draw);
                canvas.addEventListener('mouseup', stopDrawing);
                canvas.addEventListener('mouseout', stopDrawing);

                // 触摸事件支持
                canvas.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const mouseEvent = new MouseEvent('mousedown', {
                        clientX: touch.clientX,
                        clientY: touch.clientY
                    });
                    canvas.dispatchEvent(mouseEvent);
                });

                canvas.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const mouseEvent = new MouseEvent('mousemove', {
                        clientX: touch.clientX,
                        clientY: touch.clientY
                    });
                    canvas.dispatchEvent(mouseEvent);
                });

                canvas.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    const mouseEvent = new MouseEvent('mouseup', {});
                    canvas.dispatchEvent(mouseEvent);
                });

                // 清空按钮
                document.getElementById('clearBtn').addEventListener('click', () => {
                    saveState();
                    drawBackground();
                });

                // 撤销按钮
                document.getElementById('undoBtn').addEventListener('click', () => {
                    if (history.length > 0) {
                        const img = new Image();
                        img.src = history.pop();
                        img.onload = () => {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(img, 0, 0);
                        };
                    }
                });

                // 保存按钮
                document.getElementById('saveBtn').addEventListener('click', () => {
                    // 创建临时画布
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = canvas.width;
                    tempCanvas.height = canvas.height;
                    const tempCtx = tempCanvas.getContext('2d');

                    // 先绘制背景
                    tempCtx.fillStyle = currentBgColor;
                    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

                    // 绘制网格线
                    tempCtx.strokeStyle = '#e0e0e0';
                    tempCtx.lineWidth = 1;
                    for (let i = 0; i <= tempCanvas.width; i += 20) {
                        tempCtx.beginPath();
                        tempCtx.moveTo(i, 0);
                        tempCtx.lineTo(i, tempCanvas.height);
                        tempCtx.stroke();
                    }
                    for (let i = 0; i <= tempCanvas.height; i += 20) {
                        tempCtx.beginPath();
                        tempCtx.moveTo(0, i);
                        tempCtx.lineTo(tempCanvas.width, i);
                        tempCtx.stroke();
                    }

                    // 绘制原画布内容
                    tempCtx.drawImage(canvas, 0, 0);

                    // 保存图片
                    const link = document.createElement('a');
                    link.download = 'writing.jpg';
                    link.href = tempCanvas.toDataURL('image/jpeg');
                    link.click();
                });

                // 初始化背景
                drawBackground();
            }
            // 电子时代
            else if (eraType === 'electronic') {
                modalContent.innerHTML = `
                    <h2>${details.title}</h2>
                    <p>${details.content}</p>
                    <div class="electronic-container">
                        <div class="tv-container">
                            <h3>老式电视</h3>
                            <div class="tv-set">
                                <div class="tv-screen">
                                    <img id="tvImage" src="assets/tv1.webp" alt="80年代照片">
                                </div>
                                <div class="tv-controls">
                                    <div class="knob" id="tvKnob"></div>
                                </div>
                            </div>
                        </div>
                        <div class="radio-container">
                            <h3>老式收音机</h3>
                            <div class="radio-set">
                                <div class="radio-speaker">
                                    <div class="speaker-grid"></div>
                                </div>
                                <div class="radio-controls">
                                    <div class="knob" id="radioKnob"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // 更新样式
                const style = document.createElement('style');
                style.textContent = `
                    .electronic-container {
                        display: flex;
                        flex-direction: column;
                        gap: 2rem;
                        margin-top: 2rem;
                        max-width: 600px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    
                    .tv-container, .radio-container {
                        text-align: center;
                    }
                    
                    .tv-set {
                        background: url('assets/bg1.jpg') no-repeat center;
                        background-size: cover;
                        border-radius: 20px;
                        padding: 2rem;
                        position: relative;
                        height: 400px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .tv-screen {
                        width: 400px;
                        height: 300px;
                        background: #000;
                        border-radius: 10px;
                        overflow: hidden;
                        position: relative;
                        box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
                        border: 15px solid #2a2a2a;
                    }
                    
                    .tv-screen img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    
                    .tv-controls {
                        position: absolute;
                        bottom: 20px;
                        right: 20px;
                    }
                    
                    .radio-set {
                        background: url('assets/bg2.jpg') no-repeat center;
                        background-size: cover;
                        border-radius: 20px;
                        padding: 2rem;
                        position: relative;
                        height: 300px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .radio-speaker {
                        width: 400px;
                        height: 200px;
                        background: #2a2a2a;
                        border-radius: 10px;
                        padding: 1rem;
                        position: relative;
                        border: 10px solid #3a3a3a;
                    }
                    
                    .speaker-grid {
                        width: 100%;
                        height: 100%;
                        background-image: 
                            repeating-linear-gradient(0deg, #333 0px, transparent 1px, transparent 10px, #333 11px),
                            repeating-linear-gradient(90deg, #333 0px, transparent 1px, transparent 10px, #333 11px);
                        border-radius: 5px;
                    }
                    
                    .radio-controls {
                        position: absolute;
                        bottom: 20px;
                        right: 20px;
                    }
                    
                    .knob {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        background: linear-gradient(145deg, #e6e6e6, #ffffff);
                        box-shadow: 5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff;
                        cursor: pointer;
                        position: relative;
                        transition: transform 0.3s ease;
                    }
                    
                    .knob::before {
                        content: '';
                        position: absolute;
                        top: 5px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 3px;
                        height: 20px;
                        background: #666;
                        border-radius: 2px;
                    }
                    
                    .knob:active {
                        transform: rotate(90deg);
                    }
                    
                    @media (max-width: 768px) {
                        .tv-screen, .radio-speaker {
                            width: 90%;
                            max-width: 350px;
                        }
                        
                        .tv-set, .radio-set {
                            height: auto;
                            min-height: 300px;
                        }
                    }
                `;
                document.head.appendChild(style);

                // 电视图片切换
                const tvImages = [
                    'assets/tv1.webp',
                    'assets/tv2.jpg',
                    'assets/tv3.jpg'
                ];
                let currentTvImage = 0;

                document.getElementById('tvKnob').addEventListener('click', () => {
                    currentTvImage = (currentTvImage + 1) % tvImages.length;
                    document.getElementById('tvImage').src = tvImages[currentTvImage];
                });

                // 广播音频切换
                const radioStations = [
                    { name: '新闻台', audio: 'news.mp3' },
                    { name: '音乐台', audio: 'music.mp3' },
                    { name: '戏曲台', audio: 'opera.mp3' }
                ];
                let currentStation = 0;
                let currentAudio = null;

                document.getElementById('radioKnob').addEventListener('click', () => {
                    if (currentAudio) {
                        currentAudio.pause();
                    }

                    currentStation = (currentStation + 1) % radioStations.length;
                    const station = radioStations[currentStation];

                    // 创建新的音频对象
                    currentAudio = new Audio(station.audio);
                    currentAudio.play();

                    // 显示当前电台名称
                    const stationDisplay = document.createElement('div');
                    stationDisplay.className = 'station-display';
                    stationDisplay.textContent = station.name;
                    stationDisplay.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: rgba(0,0,0,0.8);
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 5px;
                        animation: fadeInOut 2s ease;
                    `;

                    document.querySelector('.radio-speaker').appendChild(stationDisplay);
                    setTimeout(() => stationDisplay.remove(), 2000);
                });
            }
            // 智能时代
            else if (eraType === 'ai') {
                modalContent.innerHTML = `
                    <h2>${details.title}</h2>
                    <p>${details.content}</p>
                    <div class="ai-chat-container">
                        <div class="chat-messages" id="chatMessages"></div>
                        <div class="chat-input">
                            <textarea id="messageInput" placeholder="输入你的问题..."></textarea>
                            <button id="sendButton">发送</button>
                        </div>
                    </div>
                `;

                // 添加样式
                const style = document.createElement('style');
                style.textContent = `
                    .ai-chat-container {
                        max-width: 800px;
                        margin: 2rem auto;
                        height: 500px;
                        display: flex;
                        flex-direction: column;
                        background: var(--glass-bg);
                        border-radius: 10px;
                        overflow: hidden;
                    }
                    
                    .chat-messages {
                        flex: 1;
                        overflow-y: auto;
                        padding: 1rem;
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .message {
                        max-width: 80%;
                        padding: 0.8rem 1rem;
                        border-radius: 10px;
                        animation: fadeIn 0.3s ease;
                        word-wrap: break-word;
                    }
                    
                    .message.user {
                        align-self: flex-end;
                        background: var(--accent-blue);
                        color: white;
                    }
                    
                    .message.ai {
                        align-self: flex-start;
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255,255,255,0.2);
                    }
                    
                    .message.error {
                        align-self: center;
                        background: rgba(255, 107, 53, 0.2);
                        border: 1px solid var(--accent-orange);
                        color: var(--accent-orange);
                        max-width: 90%;
                        text-align: center;
                    }
                    
                    .message.thinking {
                        align-self: flex-start;
                        background: rgba(255,255,255,0.05);
                        border: 1px dashed var(--accent-blue);
                        color: var(--text-secondary);
                        font-style: italic;
                    }
                    
                    .chat-input {
                        padding: 1rem;
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                        display: flex;
                        gap: 1rem;
                    }
                    
                    #messageInput {
                        flex: 1;
                        padding: 0.5rem;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid var(--accent-blue);
                        border-radius: 5px;
                        color: var(--text-primary);
                        resize: none;
                        min-height: 40px;
                        max-height: 100px;
                        font-family: inherit;
                    }
                    
                    #sendButton {
                        padding: 0.5rem 1.5rem;
                        background: var(--accent-blue);
                        border: none;
                        border-radius: 5px;
                        color: white;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: inherit;
                    }
                    
                    #sendButton:hover {
                        background: var(--accent-orange);
                    }
                    
                    #sendButton:disabled {
                        background: #666;
                        cursor: not-allowed;
                    }
                    
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .typing-dots {
                        display: inline-block;
                    }
                    
                    .typing-dots span {
                        animation: typing 1.4s infinite;
                    }
                    
                    .typing-dots span:nth-child(2) {
                        animation-delay: 0.2s;
                    }
                    
                    .typing-dots span:nth-child(3) {
                        animation-delay: 0.4s;
                    }
                    
                    @keyframes typing {
                        0%, 60%, 100% {
                            opacity: 0.3;
                        }
                        30% {
                            opacity: 1;
                        }
                    }
                `;
                document.head.appendChild(style);

                // 初始化聊天功能
                const chatMessages = document.getElementById('chatMessages');
                const messageInput = document.getElementById('messageInput');
                const sendButton = document.getElementById('sendButton');

                // 在这里直接设置你的DeepSeek API密钥
                const API_KEY = 'sk-7224e979a72842659d65de1d43e6d45b'; // 请替换为你的实际API密钥

                // 存储对话历史
                let conversationHistory = [
                    {
                        role: "system",
                        content: "你是一个友好的AI助手，专门帮助用户了解媒介演化历史。请用中文回答，回答要简洁明了。"
                    }
                ];

                // 添加消息到聊天界面
                function addMessage(role, content, isThinking = false) {
                    const messageDiv = document.createElement('div');

                    if (isThinking) {
                        messageDiv.className = 'message thinking';
                        messageDiv.innerHTML = `
                            <div class="typing-dots">
                                AI正在思考<span>.</span><span>.</span><span>.</span>
                            </div>
                        `;
                    } else {
                        messageDiv.className = `message ${role}`;
                        // 处理换行和链接
                        const formattedContent = content.replace(/\n/g, '<br>')
                            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: var(--accent-blue);">$1</a>');
                        messageDiv.innerHTML = formattedContent;
                    }

                    chatMessages.appendChild(messageDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }

                // 添加错误消息
                function addError(message) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'message error';
                    errorDiv.textContent = message;
                    chatMessages.appendChild(errorDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }

                // 发送消息函数
                async function sendMessage() {
                    const message = messageInput.value.trim();

                    if (!message) return;

                    // 禁用发送按钮
                    sendButton.disabled = true;
                    messageInput.disabled = true;

                    // 添加用户消息
                    addMessage('user', message);
                    messageInput.value = '';

                    // 添加思考中的消息
                    addMessage('ai', '', true);
                    const thinkingMessage = chatMessages.lastChild;

                    try {
                        // 添加到对话历史
                        conversationHistory.push({
                            role: "user",
                            content: message
                        });

                        // 调用DeepSeek API
                        const response = await fetch('https://api.deepseek.com/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${API_KEY}`
                            },
                            body: JSON.stringify({
                                model: 'deepseek-chat',
                                messages: conversationHistory,
                                temperature: 0.7,
                                max_tokens: 2000,
                                stream: false
                            })
                        });

                        // 移除思考中的消息
                        chatMessages.removeChild(thinkingMessage);

                        if (!response.ok) {
                            const errorData = await response.json().catch(() => ({}));
                            throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
                        }

                        const data = await response.json();

                        if (data.choices && data.choices[0] && data.choices[0].message) {
                            const aiMessage = data.choices[0].message.content;

                            // 添加到对话历史
                            conversationHistory.push({
                                role: "assistant",
                                content: aiMessage
                            });

                            // 添加AI回复
                            addMessage('ai', aiMessage);
                        } else {
                            throw new Error('API返回格式异常');
                        }

                    } catch (error) {
                        console.error('Error:', error);

                        // 移除思考中的消息
                        if (thinkingMessage.parentNode) {
                            chatMessages.removeChild(thinkingMessage);
                        }

                        // 显示具体的错误信息
                        let errorMessage = '抱歉，我现在无法回应。';

                        if (error.message.includes('401')) {
                            errorMessage = 'API密钥无效';
                        } else if (error.message.includes('429')) {
                            errorMessage = '请求过于频繁，请稍后再试';
                        } else if (error.message.includes('402')) {
                            errorMessage = 'API配额不足';
                        } else {
                            errorMessage = `错误: ${error.message}`;
                        }

                        addError(errorMessage);
                    } finally {
                        // 重新启用发送按钮
                        sendButton.disabled = false;
                        messageInput.disabled = false;
                        messageInput.focus();
                    }
                }

                // 绑定发送按钮事件
                sendButton.addEventListener('click', sendMessage);

                // 支持回车发送
                messageInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                    }
                });

                // 自动调整文本框高度
                messageInput.addEventListener('input', () => {
                    messageInput.style.height = 'auto';
                    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
                });

                // 添加欢迎消息
                setTimeout(() => {
                    addMessage('ai', '你好！我是DeepSeek AI助手，专门帮助你了解媒介演化历史。有什么问题尽管问我吧！');
                }, 500);
            }
            // 其他时代
            else {
                modalContent.innerHTML = `
                    <h2>${details.title}</h2>
                    <p>${details.content}</p>
                `;
            }

            modal.style.display = 'block';
        });
    }
});

// 关闭模态框
closeModal.addEventListener('click', () => {
    // 停止所有语音朗读
    speechSynthesis.cancel();

    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    // 恢复滚动位置
    window.scrollTo(0, scrollPosition);
});

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        // 恢复滚动位置
        window.scrollTo(0, scrollPosition);
    }
});

// 关闭信息茧房模拟器
document.querySelector('#filterBubbleModal .close-modal').addEventListener('click', () => {
    filterBubbleModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    // 恢复滚动位置
    window.scrollTo(0, scrollPosition);
    // 重置选择
    tagButtons.forEach(btn => btn.classList.remove('selected'));
    feedContainer.innerHTML = '';
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 初始化对话模拟器的独立函数
function initDialogueSimulator() {
    const chatContainer = document.getElementById('chatContainer');
    const speakBtn = document.getElementById('speakBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const addBtn = document.querySelector('.add-dialogue-btn');
    const roleAText = document.querySelector('.role-a .role-text');
    const roleBText = document.querySelector('.role-b .role-text');

    let dialogues = [];
    let isSpeaking = false;
    let isPaused = false;
    let currentIndex = 0;

    // 添加对话到聊天界面
    function addMessage(role, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        messageDiv.innerHTML = `
            <div class="message-avatar">${role === 'role-a' ? '👩' : '👨'}</div>
            <div class="message-content">${text}</div>
        `;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // 添加淡入动画
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(10px)';
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
    }

    // 添加新对话组
    addBtn.addEventListener('click', () => {
        const textA = roleAText.value.trim();
        const textB = roleBText.value.trim();

        if (!textA || !textB) {
            alert('请输入两个角色的对话内容！');
            return;
        }

        dialogues.push({ roleA: textA, roleB: textB });
        addMessage('role-a', textA);
        addMessage('role-b', textB);

        // 清空输入框
        roleAText.value = '';
        roleBText.value = '';

        // 重新聚焦到第一个输入框
        roleAText.focus();
    });

    // 支持按Enter键快速添加
    [roleAText, roleBText].forEach(textarea => {
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                addBtn.click();
            }
        });
    });

    // 暂停/继续朗读功能
    pauseBtn.addEventListener('click', () => {
        if (isSpeaking && !isPaused) {
            // 暂停朗读
            speechSynthesis.pause();
            isPaused = true;
            pauseBtn.textContent = '继续朗读';
            pauseBtn.style.background = 'var(--accent-blue)';
        } else if (isSpeaking && isPaused) {
            // 继续朗读
            speechSynthesis.resume();
            isPaused = false;
            pauseBtn.textContent = '暂停朗读';
            pauseBtn.style.background = 'var(--accent-orange)';
        }
    });

    // 朗读所有对话
    speakBtn.addEventListener('click', () => {
        if (dialogues.length === 0) {
            alert('请先添加对话内容！');
            return;
        }

        // 如果已经在朗读，先停止
        if (isSpeaking) {
            speechSynthesis.cancel();
        }

        // 显示暂停按钮，隐藏朗读按钮
        speakBtn.style.display = 'none';
        pauseBtn.style.display = 'block';

        isSpeaking = true;
        isPaused = false;
        currentIndex = 0;

        speakNext();
    });

    // 递归函数：朗读下一个对话
    function speakNext() {
        if (currentIndex >= dialogues.length || !isSpeaking) {
            // 朗读完成或已停止
            isSpeaking = false;
            speakBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
            return;
        }

        const dialogue = dialogues[currentIndex];

        // 朗读角色A的对话
        const utteranceA = new SpeechSynthesisUtterance(dialogue.roleA);
        utteranceA.lang = 'zh-CN';
        utteranceA.pitch = 1.2;
        utteranceA.rate = 0.9;

        // 朗读角色B的对话
        const utteranceB = new SpeechSynthesisUtterance(dialogue.roleB);
        utteranceB.lang = 'zh-CN';
        utteranceB.pitch = 0.8;
        utteranceB.rate = 0.9;

        // 依次朗读
        speechSynthesis.speak(utteranceA);

        utteranceA.onend = () => {
            if (!isSpeaking || isPaused) return;

            setTimeout(() => {
                if (!isSpeaking || isPaused) return;

                speechSynthesis.speak(utteranceB);

                utteranceB.onend = () => {
                    if (!isSpeaking || isPaused) return;

                    currentIndex++;
                    setTimeout(() => {
                        if (isSpeaking && !isPaused) {
                            speakNext();
                        }
                    }, 500);
                };
            }, 300);
        };
    }

    // 添加示例对话
    setTimeout(() => {
        if (dialogues.length === 0) {
            const exampleDialogues = [
                { roleA: "你好！今天天气真不错。", roleB: "是啊，适合出去散步。" },
                { roleA: "你最近在读什么书？", roleB: "我在读一本关于媒介演化的书。" }
            ];

            exampleDialogues.forEach(dialogue => {
                dialogues.push(dialogue);
                addMessage('role-a', dialogue.roleA);
                addMessage('role-b', dialogue.roleB);
            });
        }
    }, 500);

    return function stopSpeaking() {
        isSpeaking = false;
        isPaused = false;
        speechSynthesis.cancel();
    };
}