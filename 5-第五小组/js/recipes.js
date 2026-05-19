// recipes.js - 食谱探索页面交互

// 食谱数据库
const recipesData = [
    {
        id: 1,
        name: "麻婆豆腐",
        cuisine: "川菜",
        difficulty: "简单",
        time: "30分钟",
        description: "经典的川菜代表，麻辣鲜香，豆腐嫩滑，口感丰富",
        image: "https://pic.nximg.cn/file/20221219/34418314_130034916104_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        tags: ["麻辣", "下饭菜", "素菜"],
        ingredients: [
            { name: "嫩豆腐", quantity: "400克" },
            { name: "猪肉末", quantity: "100克" },
            { name: "郫县豆瓣酱", quantity: "2汤匙" },
            { name: "花椒粉", quantity: "1茶匙" },
            { name: "生姜", quantity: "20克" },
            { name: "大蒜", quantity: "3瓣" },
            { name: "小葱", quantity: "2根" },
            { name: "食用油", quantity: "适量" },
            { name: "水淀粉", quantity: "适量" }
        ],
        steps: [
            "豆腐切成2厘米见方的块，用开水加少许盐焯烫2分钟，捞出沥干",
            "热锅凉油，放入猪肉末炒至变色，加入豆瓣酱炒出红油",
            "加入姜末、蒜末炒香，倒入适量开水烧开",
            "放入焯好的豆腐块，小火炖煮5分钟",
            "分三次淋入水淀粉勾芡，让汤汁浓稠",
            "撒上花椒粉和葱花，轻轻翻匀即可出锅"
        ],
        tips: "豆腐焯水可以去除豆腥味并保持形状完整"
    },
    {
        id: 2,
        name: "清蒸鲈鱼",
        cuisine: "粤菜",
        difficulty: "中等",
        time: "25分钟",
        description: "粤菜经典，鱼肉鲜嫩，原汁原味，健康美味",
        image: "https://pic.nximg.cn/file/20230327/31527039_182800840128_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        tags: ["清淡", "海鲜", "健康"],
        ingredients: [
            { name: "新鲜鲈鱼", quantity: "1条（约500克）" },
            { name: "生姜", quantity: "50克" },
            { name: "葱", quantity: "2根" },
            { name: "红椒", quantity: "半个" },
            { name: "蒸鱼豉油", quantity: "3汤匙" },
            { name: "食用油", quantity: "2汤匙" },
            { name: "料酒", quantity: "1汤匙" },
            { name: "盐", quantity: "适量" }
        ],
        steps: [
            "鲈鱼处理干净，两面切花刀，用盐和料酒腌制10分钟",
            "生姜一半切片一半切丝，葱切丝，红椒切丝",
            "盘底铺姜片，放上鲈鱼，鱼身上放几片姜",
            "水开后上锅，大火蒸8-10分钟（根据鱼大小调整）",
            "蒸好后倒掉盘中的汤汁，捡去姜片",
            "在鱼身上铺上葱丝、姜丝、红椒丝",
            "淋上烧热的食用油，最后浇上蒸鱼豉油即可"
        ],
        tips: "蒸鱼时间要控制好，过熟会影响口感"
    },
    {
        id: 3,
        name: "红烧肉",
        cuisine: "家常菜",
        difficulty: "中等",
        time: "90分钟",
        description: "家常经典，肥而不腻，瘦而不柴，入口即化",
        image: "https://pic.nximg.cn/file/20221031/14773619_122730593102_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        tags: ["家常", "下饭菜", "节日菜"],
        ingredients: [
            { name: "五花肉", quantity: "500克" },
            { name: "冰糖", quantity: "50克" },
            { name: "生姜", quantity: "30克" },
            { name: "葱", quantity: "2根" },
            { name: "八角", quantity: "2个" },
            { name: "桂皮", quantity: "1小块" },
            { name: "料酒", quantity: "2汤匙" },
            { name: "老抽", quantity: "1汤匙" },
            { name: "生抽", quantity: "2汤匙" },
            { name: "食用油", quantity: "适量" }
        ],
        steps: [
            "五花肉切成3厘米见方的块，冷水下锅焯水捞出",
            "锅中放少许油，放入冰糖炒成焦糖色",
            "放入五花肉翻炒上色，加入料酒、老抽、生抽",
            "加入开水没过肉，放入葱、姜、八角、桂皮",
            "大火烧开后转小火慢炖60分钟",
            "开大火收汁至汤汁浓稠即可出锅"
        ],
        tips: "炒糖色时要小火慢炒，避免炒糊发苦"
    },
    {
        id: 4,
        name: "宫保鸡丁",
        cuisine: "川菜",
        difficulty: "中等",
        time: "30分钟",
        description: "川菜经典，鸡丁滑嫩，花生香脆，麻辣酸甜",
        image: "https://pic.nximg.cn/file/20230225/29159477_124243476106_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        tags: ["麻辣", "下饭菜", "经典"],
        ingredients: [
            { name: "鸡胸肉", quantity: "300克" },
            { name: "花生米", quantity: "100克" },
            { name: "干辣椒", quantity: "10个" },
            { name: "花椒", quantity: "1茶匙" },
            { name: "葱", quantity: "2根" },
            { name: "生姜", quantity: "20克" },
            { name: "大蒜", quantity: "3瓣" },
            { name: "料酒", quantity: "1汤匙" },
            { name: "生抽", quantity: "2汤匙" },
            { name: "醋", quantity: "1汤匙" },
            { name: "白糖", quantity: "1汤匙" },
            { name: "水淀粉", quantity: "适量" }
        ],
        steps: [
            "鸡胸肉切成1.5厘米的丁，用料酒、水淀粉腌制15分钟",
            "干辣椒剪段，葱切段，姜蒜切片",
            "热锅凉油，放入花生米炸香捞出",
            "锅中留底油，放入花椒、干辣椒炒香",
            "加入鸡丁滑炒至变色，放入姜蒜片炒香",
            "加入生抽、醋、白糖调味",
            "最后放入花生米和葱段，快速翻炒均匀出锅"
        ],
        tips: "鸡丁滑油时油温不宜过高"
    },
    {
        id: 5,
        name: "番茄炒蛋",
        cuisine: "家常菜",
        difficulty: "简单",
        time: "15分钟",
        description: "家常快手菜，酸甜开胃，营养均衡",
        image: "https://pic.nximg.cn/file/20230413/14773619_165357952108_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        tags: ["快手菜", "家常", "营养"],
        ingredients: [
            { name: "番茄", quantity: "2个" },
            { name: "鸡蛋", quantity: "3个" },
            { name: "葱", quantity: "1根" },
            { name: "糖", quantity: "1茶匙" },
            { name: "盐", quantity: "适量" },
            { name: "食用油", quantity: "适量" }
        ],
        steps: [
            "番茄洗净切块，鸡蛋打散加少许盐",
            "热锅凉油，倒入鸡蛋液炒至凝固盛出",
            "锅中再放少许油，放入番茄块翻炒",
            "炒至番茄出汁，加入糖和适量盐",
            "倒入炒好的鸡蛋，翻炒均匀",
            "撒上葱花即可出锅"
        ],
        tips: "番茄炒软出汁是关键"
    },
    {
        id: 6,
        name: "剁椒鱼头",
        cuisine: "湘菜",
        difficulty: "中等",
        time: "40分钟",
        description: "湘菜招牌，鲜辣开胃，鱼肉鲜嫩，剁椒香气浓郁",
        image: "https://pic.nximg.cn/file/20230223/24151444_111434859101_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        tags: ["香辣", "招牌菜", "宴客菜"],
        ingredients: [
            { name: "鳙鱼头", quantity: "1个（约1000克）" },
            { name: "剁椒", quantity: "200克" },
            { name: "生姜", quantity: "50克" },
            { name: "大蒜", quantity: "1头" },
            { name: "葱", quantity: "2根" },
            { name: "料酒", quantity: "2汤匙" },
            { name: "蒸鱼豉油", quantity: "3汤匙" },
            { name: "食用油", quantity: "适量" }
        ],
        steps: [
            "鱼头处理干净，从背部剖开，用料酒和盐腌制15分钟",
            "生姜一半切片一半切末，大蒜切末，葱切葱花",
            "盘底铺姜片，放上鱼头",
            "将剁椒、姜末、蒜末混合均匀铺在鱼头上",
            "水开后上锅，大火蒸15-18分钟",
            "取出后淋上蒸鱼豉油，撒上葱花",
            "浇上烧热的食用油即可"
        ],
        tips: "蒸鱼的时间要根据鱼头大小适当调整"
    },
    {
        id: 7,
        name: "糖醋里脊",
        cuisine: "鲁菜",
        difficulty: "中等",
        time: "45分钟",
        description: "传统鲁菜，外酥里嫩，酸甜可口",
        image: "https://pic.nximg.cn/file/20221115/424943_141732192100_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        tags: ["甜酸", "经典", "炸物"],
        ingredients: [
            { name: "猪里脊", quantity: "300克" },
            { name: "鸡蛋", quantity: "1个" },
            { name: "面粉", quantity: "50克" },
            { name: "淀粉", quantity: "50克" },
            { name: "番茄酱", quantity: "3汤匙" },
            { name: "白糖", quantity: "2汤匙" },
            { name: "白醋", quantity: "1汤匙" },
            { name: "料酒", quantity: "1汤匙" },
            { name: "盐", quantity: "适量" },
            { name: "食用油", quantity: "适量" }
        ],
        steps: [
            "里脊肉切成条，用料酒、盐腌制15分钟",
            "面粉、淀粉、鸡蛋加适量水调成面糊",
            "将里脊肉裹上面糊，油温六成热下锅炸至金黄捞出",
            "升高油温，复炸30秒使表面更酥脆",
            "锅中留底油，放入番茄酱、白糖、白醋炒匀",
            "加入少许水烧开，勾薄芡",
            "放入炸好的里脊快速翻炒均匀即可"
        ],
        tips: "复炸可以使外皮更加酥脆"
    },
    {
        id: 8,
        name: "蒜蓉西兰花",
        cuisine: "家常菜",
        difficulty: "简单",
        time: "15分钟",
        description: "清爽健康，蒜香浓郁，营养丰富",
        image: "https://pic.nximg.cn/file/20151123/22029572_122829228000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        tags: ["素食", "健康", "快手菜"],
        ingredients: [
            { name: "西兰花", quantity: "1颗" },
            { name: "大蒜", quantity: "5瓣" },
            { name: "盐", quantity: "适量" },
            { name: "食用油", quantity: "适量" },
            { name: "蚝油", quantity: "1汤匙" }
        ],
        steps: [
            "西兰花掰成小朵，用盐水浸泡10分钟后洗净",
            "大蒜切末",
            "锅中水烧开，加少许盐和油，放入西兰花焯烫1分钟捞出",
            "热锅凉油，放入蒜末炒香",
            "放入焯好的西兰花翻炒",
            "加入蚝油和适量盐调味，翻炒均匀即可"
        ],
        tips: "焯水时加少许油可以保持蔬菜颜色翠绿"
    }
];

// 全局变量
let currentFilters = {
    cuisine: 'all',
    difficulty: 'all',
    time: 'all'
};
let currentSearch = '';
let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

// DOM元素
const recipesGrid = document.getElementById('recipesGrid');
const recipesCount = document.getElementById('recipesCount');
const recipeSearch = document.getElementById('recipeSearch');
const flipCard = document.querySelector('.flip-card');
const flipButton = document.getElementById('flipButton');
const changeRecommendationBtn = document.getElementById('changeRecommendationBtn');
const showRecipeBtn = document.getElementById('showRecipeBtn');
const copyToast = document.getElementById('copyToast');
let currentRecommendation = null;

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initializeRecipes();
    setupEventListeners();
    updateRecipesCount();
    
    // 初始化随机推荐
    getRandomRecommendation();
});

// 初始化食谱展示
function initializeRecipes() {
    renderRecipes(recipesData);
}

// 渲染食谱卡片
function renderRecipes(recipes) {
    recipesGrid.innerHTML = '';
    
    recipes.forEach(recipe => {
        const isFavorite = favoriteRecipes.includes(recipe.id);
        const recipeCard = createRecipeCard(recipe, isFavorite);
        recipesGrid.appendChild(recipeCard);
    });
}

// 创建食谱卡片HTML
function createRecipeCard(recipe, isFavorite) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.dataset.id = recipe.id;
    card.dataset.cuisine = `cuisine-${recipe.cuisine}`;
    card.dataset.difficulty = `difficulty-${recipe.difficulty}`;
    card.dataset.time = `time-${recipe.time}`;
    
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        <div class="recipe-content">
            <div class="recipe-header">
                <h3 class="recipe-title">${recipe.name}</h3>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${recipe.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            
            <div class="recipe-meta">
                <span class="recipe-meta-item">
                    <i class="fas fa-utensils"></i> ${recipe.cuisine}
                </span>
                <span class="recipe-meta-item">
                    <i class="fas fa-signal"></i> ${recipe.difficulty}
                </span>
                <span class="recipe-meta-item">
                    <i class="fas fa-clock"></i> ${recipe.time}
                </span>
            </div>
            
            <div class="recipe-tags">
                ${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
            </div>
            
            <p class="recipe-description">${recipe.description}</p>
            
            <div class="recipe-details">
                <button class="details-toggle">
                    <span>查看详细食谱</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="details-content">
                    <div class="details-section">
                        <h5><i class="fas fa-carrot"></i> 食材清单</h5>
                        <ul class="ingredients-list">
                            ${recipe.ingredients.map(ing => `
                                <li>
                                    <span class="ingredient-name">${ing.name}</span>
                                    <span class="ingredient-quantity">${ing.quantity}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="details-section">
                        <h5><i class="fas fa-list-ol"></i> 制作步骤</h5>
                        <ol class="steps-list">
                            ${recipe.steps.map((step, index) => `
                                <li>
                                    <div class="step-content">${step}</div>
                                </li>
                            `).join('')}
                        </ol>
                    </div>
                    
                    ${recipe.tips ? `
                    <div class="details-section">
                        <h5><i class="fas fa-lightbulb"></i> 小贴士</h5>
                        <p class="step-content">${recipe.tips}</p>
                    </div>
                    ` : ''}
                    
                    <button class="copy-recipe-btn" data-id="${recipe.id}">
                        <i class="fas fa-copy"></i> 一键复制食谱
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// 设置事件监听器
function setupEventListeners() {
    // 筛选按钮点击事件
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterGroup = this.parentElement.parentElement.querySelector('h4').textContent;
            const filterValue = this.dataset.filter;
            
            // 更新按钮状态
            this.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新筛选条件
            if (filterGroup === '按菜系') {
                currentFilters.cuisine = filterValue;
            } else if (filterGroup === '按难度') {
                currentFilters.difficulty = filterValue;
            } else if (filterGroup === '按时间') {
                currentFilters.time = filterValue;
            }
            
            applyFilters();
        });
    });
    
    // 搜索功能
    recipeSearch.addEventListener('input', function() {
        currentSearch = this.value.toLowerCase();
        applyFilters();
    });
    
    // 食谱网格委托事件
    recipesGrid.addEventListener('click', function(e) {
        // 收藏按钮点击
        if (e.target.closest('.favorite-btn')) {
            const btn = e.target.closest('.favorite-btn');
            const recipeId = parseInt(btn.dataset.id);
            toggleFavorite(recipeId, btn);
        }
        
        // 展开/折叠详情
        if (e.target.closest('.details-toggle')) {
            const toggle = e.target.closest('.details-toggle');
            const content = toggle.nextElementSibling;
            
            toggle.classList.toggle('active');
            content.classList.toggle('expanded');
        }
        
        // 复制食谱按钮
        if (e.target.closest('.copy-recipe-btn')) {
            const btn = e.target.closest('.copy-recipe-btn');
            const recipeId = parseInt(btn.dataset.id);
            copyRecipe(recipeId);
        }
    });
    
    // 随机推荐功能
    flipButton.addEventListener('click', function() {
        flipCard.classList.add('flipped');
        getRandomRecommendation();
    });
    
    // 换一个推荐
    changeRecommendationBtn.addEventListener('click', function() {
        getRandomRecommendation();
    });
    
    // 查看食谱按钮
    showRecipeBtn.addEventListener('click', function() {
        if (currentRecommendation) {
            const recipeElement = document.querySelector(`.recipe-card[data-id="${currentRecommendation.id}"]`);
            if (recipeElement) {
                // 滚动到对应食谱
                recipeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // 高亮显示
                recipeElement.style.boxShadow = '0 0 0 3px var(--primary-color)';
                recipeElement.style.transition = 'box-shadow 0.3s ease';
                
                // 3秒后移除高亮
                setTimeout(() => {
                    recipeElement.style.boxShadow = '';
                }, 3000);
            }
        }
    });
}

// 应用筛选条件
function applyFilters() {
    let filteredRecipes = recipesData.filter(recipe => {
        // 搜索筛选
        if (currentSearch) {
            const searchStr = currentSearch.toLowerCase();
            const nameMatch = recipe.name.toLowerCase().includes(searchStr);
            const descMatch = recipe.description.toLowerCase().includes(searchStr);
            const tagMatch = recipe.tags.some(tag => tag.toLowerCase().includes(searchStr));
            const cuisineMatch = recipe.cuisine.toLowerCase().includes(searchStr);
            
            if (!nameMatch && !descMatch && !tagMatch && !cuisineMatch) {
                return false;
            }
        }
        
        // 菜系筛选
        if (currentFilters.cuisine !== 'all') {
            if (currentFilters.cuisine !== `cuisine-${recipe.cuisine}`) {
                return false;
            }
        }
        
        // 难度筛选
        if (currentFilters.difficulty !== 'all') {
            if (currentFilters.difficulty !== `difficulty-${recipe.difficulty}`) {
                return false;
            }
        }
        
        // 时间筛选
        if (currentFilters.time !== 'all') {
            if (currentFilters.time !== `time-${recipe.time}`) {
                return false;
            }
        }
        
        return true;
    });
    
    renderRecipes(filteredRecipes);
    updateRecipesCount(filteredRecipes.length);
}

// 更新食谱数量显示
function updateRecipesCount(count) {
    const totalCount = count || recipesData.length;
    recipesCount.textContent = totalCount;
}

// 切换收藏状态
function toggleFavorite(recipeId, button) {
    const index = favoriteRecipes.indexOf(recipeId);
    
    if (index === -1) {
        // 添加收藏
        favoriteRecipes.push(recipeId);
        button.classList.add('active');
        showToast('已添加到收藏');
    } else {
        // 移除收藏
        favoriteRecipes.splice(index, 1);
        button.classList.remove('active');
        showToast('已从收藏移除');
    }
    
    // 保存到本地存储
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}

// 获取随机推荐
function getRandomRecommendation() {
    const randomIndex = Math.floor(Math.random() * recipesData.length);
    currentRecommendation = recipesData[randomIndex];
    
    const resultElement = document.getElementById('recommendationResult');
    resultElement.innerHTML = `
        <img src="${currentRecommendation.image}" alt="${currentRecommendation.name}" class="recommendation-image">
        <h4>${currentRecommendation.name}</h4>
        <div class="recommendation-tags">
            <span class="recommendation-tag">${currentRecommendation.cuisine}</span>
            <span class="recommendation-tag">${currentRecommendation.difficulty}</span>
            <span class="recommendation-tag">${currentRecommendation.time}</span>
        </div>
        <p class="recommendation-desc">${currentRecommendation.description}</p>
    `;
}

// 复制食谱到剪贴板
function copyRecipe(recipeId) {
    const recipe = recipesData.find(r => r.id === recipeId);
    if (!recipe) return;
    
    const textToCopy = `
${recipe.name} 食谱

🍴 基本信息：
菜系：${recipe.cuisine}
难度：${recipe.difficulty}
时间：${recipe.time}

🥕 食材清单：
${recipe.ingredients.map(ing => `- ${ing.name}：${ing.quantity}`).join('\n')}

👩‍🍳 制作步骤：
${recipe.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

💡 小贴士：
${recipe.tips || '无'}

---
食谱来自「食·光」美食探索者网站
    `.trim();
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            showToast('食谱已复制到剪贴板！');
        })
        .catch(err => {
            console.error('复制失败:', err);
            showToast('复制失败，请手动复制');
        });
}

// 显示提示框
function showToast(message) {
    if (copyToast) {
        const toastContent = copyToast.querySelector('span');
        if (toastContent) {
            toastContent.textContent = message;
        }
        
        copyToast.classList.add('show');
        
        setTimeout(() => {
            copyToast.classList.remove('show');
        }, 3000);
    }
}

// 导出函数供其他文件使用（如果需要）
window.getRandomRecommendation = getRandomRecommendation;
window.toggleFavorite = toggleFavorite;
window.copyRecipe = copyRecipe;