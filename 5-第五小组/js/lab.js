/* lab.js - 食材实验室页面交互逻辑 */

// ===== 全局变量与状态管理 =====
let currentChallenge = null;
let currentStepIndex = 0;
let score = 0;
let hintsRemaining = 3;
let startTime = null;
let ingredientsUsed = [];
let challengeStarted = false;

// ===== 菜品实验数据 =====
const recipeChallenges = {
    "tomato-egg": {
        name: "番茄炒蛋",
        description: "国民家常菜，简单又美味，掌握基础烹饪顺序",
        difficulty: "简单",
        totalTime: "10分钟",
        steps: 5,
        ingredients: ["油", "鸡蛋", "番茄", "盐", "葱花"],
        ingredientPool: ["油", "鸡蛋", "番茄", "盐", "葱花", "大蒜", "糖"], // 正确食材+干扰项
        stepsData: [
            { hint: "1. 热锅，放入油", ingredient: "油" },
            { hint: "2. 倒入打散的蛋液", ingredient: "鸡蛋" },
            { hint: "3. 炒熟后盛出备用", ingredient: null }, // 无食材放入的操作步骤
            { hint: "4. 锅中放入另一种食材", ingredient: "番茄" },
            { hint: "5. 最后加入调味", ingredient: "盐" }
        ],
        tips: "鸡蛋要先打散，番茄要切块。先炒鸡蛋再炒番茄，最后混合调味。",
        recipeLink: "recipes.html#tomato-egg"
    },
    "beef-stew": {
        name: "土豆炖牛肉",
        description: "营养丰富的经典炖菜，学习食材处理顺序",
        difficulty: "中等",
        totalTime: "60分钟",
        steps: 6,
        ingredients: ["牛肉", "姜片", "土豆", "胡萝卜", "酱油", "料酒"],
        ingredientPool: ["牛肉", "土豆", "胡萝卜", "姜片", "酱油", "料酒", "八角", "洋葱", "糖"],
        stepsData: [
            { hint: "1. 先将肉类焯水", ingredient: "牛肉" },
            { hint: "2. 热油炒香香料", ingredient: "姜片" },
            { hint: "3. 加入焯好的肉翻炒", ingredient: null },
            { hint: "4. 加入蔬菜一起炖煮", ingredient: "土豆" },
            { hint: "5. 加入另一种蔬菜", ingredient: "胡萝卜" },
            { hint: "6. 最后调味", ingredient: "酱油" }
        ],
        tips: "牛肉要先焯水去腥，炖煮时用小火慢炖更入味。",
        recipeLink: "recipes.html#beef-stew"
    },
    "kungpao-chicken": {
        name: "宫保鸡丁",
        description: "川菜经典，学习复合调味与火候控制",
        difficulty: "中等",
        totalTime: "25分钟",
        steps: 7,
        ingredients: ["鸡肉", "花生", "干辣椒", "花椒", "葱", "姜", "蒜"],
        ingredientPool: ["鸡肉", "花生", "干辣椒", "花椒", "葱", "姜", "蒜", "糖", "醋", "酱油"],
        stepsData: [
            { hint: "1. 鸡肉切丁腌制", ingredient: "鸡肉" },
            { hint: "2. 准备坚果", ingredient: "花生" },
            { hint: "3. 热油爆香辣味调料", ingredient: "干辣椒" },
            { hint: "4. 加入另一种香料", ingredient: "花椒" },
            { hint: "5. 放入鸡肉翻炒", ingredient: null },
            { hint: "6. 加入调味蔬菜", ingredient: "葱" },
            { hint: "7. 最后放入坚果", ingredient: null }
        ],
        tips: "鸡肉要先腌制，花生最后放保持脆度。",
        recipeLink: "recipes.html#kungpao-chicken"
    },
    "mapo-tofu": {
        name: "麻婆豆腐",
        description: "麻辣鲜香，学习川味调料的使用顺序",
        difficulty: "中等",
        totalTime: "20分钟",
        steps: 6,
        ingredients: ["豆腐", "牛肉末", "豆瓣酱", "花椒", "葱", "蒜"],
        ingredientPool: ["豆腐", "牛肉末", "豆瓣酱", "花椒", "葱", "蒜", "辣椒粉", "豆豉"],
        stepsData: [
            { hint: "1. 准备主要食材", ingredient: "豆腐" },
            { hint: "2. 准备肉类配料", ingredient: "牛肉末" },
            { hint: "3. 炒香主要调味料", ingredient: "豆瓣酱" },
            { hint: "4. 加入麻辣香料", ingredient: "花椒" },
            { hint: "5. 放入蔬菜配料", ingredient: "葱" },
            { hint: "6. 最后加入蒜末", ingredient: "蒜" }
        ],
        tips: "豆腐要先用盐水焯一下，不容易碎。",
        recipeLink: "recipes.html#mapo-tofu"
    },
    "steamed-fish": {
        name: "清蒸鱼",
        description: "粤菜代表，学习海鲜处理与清蒸技巧",
        difficulty: "中等",
        totalTime: "30分钟",
        steps: 5,
        ingredients: ["鱼", "姜", "葱", "料酒", "蒸鱼豉油"],
        ingredientPool: ["鱼", "姜", "葱", "料酒", "蒸鱼豉油", "香菜", "辣椒"],
        stepsData: [
            { hint: "1. 处理主要食材", ingredient: "鱼" },
            { hint: "2. 放入去腥调料", ingredient: "姜" },
            { hint: "3. 加入增香料", ingredient: "葱" },
            { hint: "4. 淋上去腥酒", ingredient: "料酒" },
            { hint: "5. 最后浇上酱汁", ingredient: "蒸鱼豉油" }
        ],
        tips: "蒸鱼时间要控制好，根据鱼的大小调整。",
        recipeLink: "recipes.html#steamed-fish"
    },
    "twice-cooked-pork": {
        name: "回锅肉",
        description: "川菜经典，学习两次烹饪的技巧与火候",
        difficulty: "困难",
        totalTime: "40分钟",
        steps: 8,
        ingredients: ["五花肉", "蒜苗", "豆瓣酱", "豆豉", "甜面酱", "姜", "蒜", "糖"],
        ingredientPool: ["五花肉", "蒜苗", "豆瓣酱", "豆豉", "甜面酱", "姜", "蒜", "糖", "料酒", "酱油"],
        stepsData: [
            { hint: "1. 准备主要肉类", ingredient: "五花肉" },
            { hint: "2. 准备蔬菜配料", ingredient: "蒜苗" },
            { hint: "3. 炒香主要酱料", ingredient: "豆瓣酱" },
            { hint: "4. 加入发酵调味", ingredient: "豆豉" },
            { hint: "5. 加入另一种酱料", ingredient: "甜面酱" },
            { hint: "6. 放入去腥调料", ingredient: "姜" },
            { hint: "7. 加入香辛料", ingredient: "蒜" },
            { hint: "8. 最后调整甜度", ingredient: "糖" }
        ],
        tips: "五花肉要先煮熟再切片回锅炒。",
        recipeLink: "recipes.html#twice-cooked-pork"
    },
    "fish-pork": {
        name: "鱼香肉丝",
        description: "学习鱼香汁的调配与炒制顺序",
        difficulty: "中等",
        totalTime: "25分钟",
        steps: 7,
        ingredients: ["猪肉", "木耳", "胡萝卜", "笋", "葱", "姜", "蒜"],
        ingredientPool: ["猪肉", "木耳", "胡萝卜", "笋", "葱", "姜", "蒜", "豆瓣酱", "糖", "醋"],
        stepsData: [
            { hint: "1. 准备主要肉类", ingredient: "猪肉" },
            { hint: "2. 准备菌类配菜", ingredient: "木耳" },
            { hint: "3. 准备根茎类蔬菜", ingredient: "胡萝卜" },
            { hint: "4. 准备笋类蔬菜", ingredient: "笋" },
            { hint: "5. 加入调味蔬菜", ingredient: "葱" },
            { hint: "6. 放入去腥调料", ingredient: "姜" },
            { hint: "7. 最后加入蒜末", ingredient: "蒜" }
        ],
        tips: "鱼香汁要提前调好：糖、醋、酱油比例很重要。",
        recipeLink: "recipes.html#fish-pork"
    },
    "braised-pork": {
        name: "红烧肉",
        description: "学习糖色炒制与慢炖的火候控制",
        difficulty: "困难",
        totalTime: "90分钟",
        steps: 8,
        ingredients: ["五花肉", "冰糖", "料酒", "生姜", "葱", "八角", "香叶", "酱油"],
        ingredientPool: ["五花肉", "冰糖", "料酒", "生姜", "葱", "八角", "香叶", "酱油", "老抽", "桂皮"],
        stepsData: [
            { hint: "1. 准备主要食材", ingredient: "五花肉" },
            { hint: "2. 炒糖色用的糖", ingredient: "冰糖" },
            { hint: "3. 加入去腥酒", ingredient: "料酒" },
            { hint: "4. 放入姜片", ingredient: "生姜" },
            { hint: "5. 加入增香料", ingredient: "葱" },
            { hint: "6. 放入第一种香料", ingredient: "八角" },
            { hint: "7. 加入第二种香料", ingredient: "香叶" },
            { hint: "8. 最后调味上色", ingredient: "酱油" }
        ],
        tips: "炒糖色要注意火候，不要炒焦了。",
        recipeLink: "recipes.html#braised-pork"
    }
};

// 食材图标映射
const ingredientIcons = {
    "油": "fas fa-oil-can",
    "鸡蛋": "fas fa-egg",
    "番茄": "fas fa-apple-alt",
    "盐": "fas fa-mortar-pestle",
    "葱花": "fas fa-seedling",
    "大蒜": "fas fa-garlic",
    "糖": "fas fa-cube",
    "牛肉": "fas fa-drumstick-bite",
    "土豆": "fas fa-carrot",
    "胡萝卜": "fas fa-carrot",
    "姜片": "fas fa-leaf",
    "酱油": "fas fa-flask",
    "料酒": "fas fa-wine-bottle",
    "八角": "fas fa-star",
    "洋葱": "fas fa-onion",
    "鸡肉": "fas fa-drumstick-bite",
    "花生": "fas fa-peanut",
    "干辣椒": "fas fa-pepper-hot",
    "花椒": "fas fa-pepper-hot",
    "葱": "fas fa-seedling",
    "姜": "fas fa-leaf",
    "蒜": "fas fa-garlic",
    "醋": "fas fa-flask",
    "豆腐": "fas fa-square",
    "牛肉末": "fas fa-hamburger",
    "豆瓣酱": "fas fa-jar",
    "辣椒粉": "fas fa-pepper-hot",
    "豆豉": "fas fa-seedling",
    "鱼": "fas fa-fish",
    "蒸鱼豉油": "fas fa-flask",
    "香菜": "fas fa-seedling",
    "辣椒": "fas fa-pepper-hot",
    "五花肉": "fas fa-bacon",
    "蒜苗": "fas fa-seedling",
    "甜面酱": "fas fa-jar",
    "猪肉": "fas fa-piggy-bank",
    "木耳": "fas fa-mushroom",
    "笋": "fas fa-bamboo",
    "冰糖": "fas fa-cube",
    "香叶": "fas fa-leaf",
    "老抽": "fas fa-flask",
    "桂皮": "fas fa-tree"
};

// ===== DOM 元素引用 =====
const selectionArea = document.getElementById('selectionArea');
const challengeArea = document.getElementById('challengeArea');
const backToSelectionBtn = document.getElementById('backToSelection');
const startChallengeBtns = document.querySelectorAll('.start-challenge-btn');
const currentRecipeName = document.getElementById('currentRecipeName');
const currentRecipeDesc = document.getElementById('currentRecipeDesc');
const progressFill = document.getElementById('progressFill');
const currentStep = document.getElementById('currentStep');
const totalSteps = document.getElementById('totalSteps');
const stepInstruction = document.getElementById('stepInstruction');
const stepsContainer = document.getElementById('stepsContainer');
const ingredientsGrid = document.getElementById('ingredientsGrid');
const potDropZone = document.getElementById('potDropZone');
const potContent = document.getElementById('potContent');
const currentHintText = document.getElementById('currentHintText');
const hintStatus = document.getElementById('hintStatus');
const showHintBtn = document.getElementById('showHint');
const hintCount = document.getElementById('hintCount');
const resetChallengeBtn = document.getElementById('resetChallenge');
const skipStepBtn = document.getElementById('skipStep');
const startCookingBtn = document.getElementById('startCooking');
const clearPotBtn = document.getElementById('clearPot');
const scoreValue = document.getElementById('scoreValue');
const resultMessage = document.getElementById('resultMessage');
const usedIngredients = document.getElementById('usedIngredients');
const cookingTips = document.getElementById('cookingTips');
const completionArea = document.getElementById('completionArea');
const viewRecipeDetailBtn = document.getElementById('viewRecipeDetail');
const retryChallengeBtn = document.getElementById('retryChallenge');
const finalMessage = document.getElementById('finalMessage');

// 弹窗相关
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');
const completionModal = document.getElementById('completionModal');
const hintModal = document.getElementById('hintModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');
const closeErrorModal = document.getElementById('closeErrorModal');
const closeHintModal = document.getElementById('closeHintModal');
const continueBtn = document.getElementById('continueChallenge');
const tryAgainBtn = document.getElementById('tryAgain');
const useHintModalBtn = document.getElementById('useHintModal');
const goToRecipeBtn = document.getElementById('goToRecipe');
const retryFromModalBtn = document.getElementById('retryFromModal');
const backToSelectionModalBtn = document.getElementById('backToSelectionModal');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const completedRecipeName = document.getElementById('completedRecipeName');
const finalScore = document.getElementById('finalScore');
const completionTime = document.getElementById('completionTime');
const hintsUsed = document.getElementById('hintsUsed');
const completionCongrats = document.getElementById('completionCongrats');
const hintIngredientName = document.getElementById('hintIngredientName');

// ===== 初始化函数 =====
function init() {
    // 绑定事件监听器
    bindEvents();
    
    // 初始化提示次数
    updateHintCount();
    
    // 更新得分显示
    updateScore();
    
    console.log('食材实验室已初始化');
}

function bindEvents() {
    // 开始挑战按钮
    startChallengeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const recipeId = this.getAttribute('data-recipe-id');
            startChallenge(recipeId);
        });
    });
    
    // 返回选择按钮
    backToSelectionBtn.addEventListener('click', backToSelection);
    
    // 提示按钮
    showHintBtn.addEventListener('click', showHint);
    
    // 控制按钮
    resetChallengeBtn.addEventListener('click', resetChallenge);
    skipStepBtn.addEventListener('click', skipStep);
    startCookingBtn.addEventListener('click', startCooking);
    clearPotBtn.addEventListener('click', clearPot);
    
    // 完成区域按钮
    viewRecipeDetailBtn.addEventListener('click', viewRecipeDetail);
    retryChallengeBtn.addEventListener('click', resetChallenge);
    
    // 弹窗按钮
    closeSuccessModal.addEventListener('click', () => hideModal(successModal));
    closeErrorModal.addEventListener('click', () => hideModal(errorModal));
    closeHintModal.addEventListener('click', () => hideModal(hintModal));
    continueBtn.addEventListener('click', continueToNextStep);
    tryAgainBtn.addEventListener('click', () => hideModal(errorModal));
    useHintModalBtn.addEventListener('click', useHintFromModal);
    goToRecipeBtn.addEventListener('click', viewRecipeDetail);
    retryFromModalBtn.addEventListener('click', retryFromModal);
    backToSelectionModalBtn.addEventListener('click', backToSelectionFromModal);
    
    // 点击模态框外部关闭
    [successModal, errorModal, completionModal, hintModal].forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal(this);
            }
        });
    });
    
    // 拖拽事件
    potDropZone.addEventListener('dragover', handleDragOver);
    potDropZone.addEventListener('drop', handleDrop);
    potDropZone.addEventListener('dragenter', handleDragEnter);
    potDropZone.addEventListener('dragleave', handleDragLeave);
}

// ===== 挑战管理函数 =====
function startChallenge(recipeId) {
    if (!recipeChallenges[recipeId]) {
        console.error('菜品不存在:', recipeId);
        return;
    }
    
    currentChallenge = recipeChallenges[recipeId];
    currentStepIndex = 0;
    score = 0;
    hintsRemaining = 3;
    startTime = new Date();
    ingredientsUsed = [];
    challengeStarted = true;
    
    // 切换到挑战区域
    selectionArea.style.display = 'none';
    challengeArea.style.display = 'block';
    
    // 更新挑战信息
    updateChallengeInfo();
    
    // 初始化步骤
    updateStepsDisplay();
    
    // 初始化食材库
    updateIngredientsGrid();
    
    // 更新提示区域
    updateHintArea();
    
    // 清空锅
    clearPot();
    
    // 更新反馈区域
    updateFeedback();
    
    // 滚动到挑战区域
    challengeArea.scrollIntoView({ behavior: 'smooth' });
    
    console.log(`开始挑战: ${currentChallenge.name}`);
}

function backToSelection() {
    if (challengeStarted && !confirm('确定要放弃当前挑战吗？进度将丢失。')) {
        return;
    }
    
    challengeArea.style.display = 'none';
    selectionArea.style.display = 'block';
    challengeStarted = false;
    
    // 滚动到选择区域
    selectionArea.scrollIntoView({ behavior: 'smooth' });
}

function updateChallengeInfo() {
    currentRecipeName.textContent = currentChallenge.name;
    currentRecipeDesc.textContent = currentChallenge.description;
    totalSteps.textContent = currentChallenge.steps;
    cookingTips.textContent = currentChallenge.tips;
}

// ===== 步骤管理函数 =====
function updateStepsDisplay() {
    stepsContainer.innerHTML = '';
    
    currentChallenge.stepsData.forEach((step, index) => {
        const stepItem = document.createElement('div');
        stepItem.className = 'step-item';
        if (index === currentStepIndex) {
            stepItem.classList.add('active');
        } else if (index < currentStepIndex) {
            stepItem.classList.add('completed');
        }
        
        stepItem.innerHTML = `
            <span class="step-number">${index + 1}</span>
            <span class="step-text">${step.hint}</span>
        `;
        
        stepsContainer.appendChild(stepItem);
    });
    
    // 更新当前步骤显示
    updateCurrentStep();
}

function updateCurrentStep() {
    if (!currentChallenge || currentStepIndex >= currentChallenge.stepsData.length) {
        return;
    }
    
    const currentStepData = currentChallenge.stepsData[currentStepIndex];
    
    // 更新进度
    currentStep.textContent = currentStepIndex + 1;
    const progressPercent = ((currentStepIndex + 1) / currentChallenge.steps) * 100;
    progressFill.style.width = `${progressPercent}%`;
    
    // 更新提示
    currentHintText.textContent = currentStepData.hint;
    
    // 更新状态
    if (currentStepData.ingredient === null) {
        // 无食材步骤
        stepInstruction.textContent = '此步骤无需放入食材，点击"跳过此步"继续';
        hintStatus.innerHTML = '<i class="fas fa-forward"></i> 可跳过';
        hintStatus.className = 'status-indicator waiting';
    } else {
        stepInstruction.textContent = `请将正确的食材拖入锅中：${currentStepData.ingredient}`;
        hintStatus.innerHTML = '<i class="fas fa-clock"></i> 等待操作';
        hintStatus.className = 'status-indicator waiting';
    }
    
    // 更新按钮状态
    skipStepBtn.disabled = currentStepData.ingredient !== null;
}

// ===== 食材管理函数 =====
function updateIngredientsGrid() {
    ingredientsGrid.innerHTML = '';
    
    currentChallenge.ingredientPool.forEach(ingredient => {
        const ingredientItem = document.createElement('div');
        ingredientItem.className = 'ingredient-item';
        ingredientItem.setAttribute('draggable', 'true');
        ingredientItem.setAttribute('data-ingredient', ingredient);
        
        // 检查食材是否已使用
        if (ingredientsUsed.includes(ingredient)) {
            ingredientItem.classList.add('used');
            ingredientItem.setAttribute('draggable', 'false');
        }
        
        const iconClass = ingredientIcons[ingredient] || 'fas fa-question';
        
        ingredientItem.innerHTML = `
            <i class="${iconClass} ingredient-icon"></i>
            <span class="ingredient-name">${ingredient}</span>
        `;
        
        // 拖拽事件
        ingredientItem.addEventListener('dragstart', handleDragStart);
        
        ingredientsGrid.appendChild(ingredientItem);
    });
}

function handleDragStart(e) {
    if (e.target.classList.contains('used')) {
        e.preventDefault();
        return;
    }
    
    const ingredient = e.target.getAttribute('data-ingredient') || 
                      e.target.closest('.ingredient-item').getAttribute('data-ingredient');
    
    e.dataTransfer.setData('text/plain', ingredient);
    e.dataTransfer.effectAllowed = 'move';
    
    // 添加拖拽样式
    const ingredientEl = e.target.classList.contains('ingredient-item') ? 
                        e.target : e.target.closest('.ingredient-item');
    ingredientEl.classList.add('dragging');
    
    setTimeout(() => {
        ingredientEl.classList.remove('dragging');
    }, 0);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    potDropZone.classList.add('drag-over');
}

function handleDragLeave(e) {
    if (!potDropZone.contains(e.relatedTarget)) {
        potDropZone.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    potDropZone.classList.remove('drag-over');
    
    const ingredient = e.dataTransfer.getData('text/plain');
    
    if (!ingredient) return;
    
    // 验证食材
    validateIngredient(ingredient);
}

function validateIngredient(ingredient) {
    if (!currentChallenge || !challengeStarted) return;
    
    const currentStepData = currentChallenge.stepsData[currentStepIndex];
    
    if (currentStepData.ingredient === null) {
        showError('此步骤无需放入食材，请点击"跳过此步"');
        return;
    }
    
    if (ingredientsUsed.includes(ingredient)) {
        showError('这个食材已经使用过了！');
        return;
    }
    
    if (ingredient === currentStepData.ingredient) {
        // 正确！
        handleCorrectIngredient(ingredient);
    } else {
        // 错误
        handleWrongIngredient(ingredient);
    }
}

function handleCorrectIngredient(ingredient) {
    // 添加到已使用食材
    ingredientsUsed.push(ingredient);
    
    // 添加到锅中
    addIngredientToPot(ingredient);
    
    // 更新状态
    hintStatus.innerHTML = '<i class="fas fa-check"></i> 正确！';
    hintStatus.className = 'status-indicator correct';
    
    // 加分
    score += 10;
    if (hintsRemaining === 3) {
        score += 5; // 未使用提示的额外奖励
    }
    updateScore();
    
    // 显示成功消息
    resultMessage.innerHTML = `<p><i class="fas fa-check-circle"></i> 正确！你放入了 <strong>${ingredient}</strong></p>`;
    
    // 显示成功弹窗
    successMessage.textContent = `太棒了！你放入了正确的食材：${ingredient}`;
    showModal(successModal);
    
    // 更新食材库显示
    updateIngredientsGrid();
    
    // 更新已使用食材显示
    updateUsedIngredients();
    
    console.log(`正确放入: ${ingredient}`);
}

function handleWrongIngredient(ingredient) {
    // 扣分
    score = Math.max(0, score - 5);
    updateScore();
    
    // 更新状态
    hintStatus.innerHTML = '<i class="fas fa-times"></i> 不正确';
    hintStatus.className = 'status-indicator error';
    
    // 显示错误消息
    resultMessage.innerHTML = `<p><i class="fas fa-times-circle"></i> 这个食材不太合适...</p>`;
    
    // 显示错误弹窗
    errorMessage.textContent = `${ingredient} 不太适合当前步骤，再试试看！`;
    showModal(errorModal);
    
    console.log(`错误放入: ${ingredient}`);
}

function addIngredientToPot(ingredient) {
    const ingredientInPot = document.createElement('div');
    ingredientInPot.className = 'ingredient-in-pot';
    ingredientInPot.setAttribute('data-ingredient', ingredient);
    
    const iconClass = ingredientIcons[ingredient] || 'fas fa-question';
    ingredientInPot.innerHTML = `<i class="${iconClass}"></i>`;
    
    potContent.querySelector('.empty-pot-message')?.remove();
    potContent.appendChild(ingredientInPot);
    
    // 动画效果
    ingredientInPot.style.animation = 'dropIn 0.5s ease';
    
    // 启动火焰效果（如果这是第一步）
    if (currentStepIndex === 0) {
        document.getElementById('fireEffect').classList.add('active');
        startCookingBtn.disabled = true;
        startCookingBtn.textContent = '正在烹饪中...';
    }
}

function clearPot() {
    potContent.innerHTML = '<p class="empty-pot-message">将食材拖到这里开始烹饪</p>';
    document.getElementById('fireEffect').classList.remove('active');
    startCookingBtn.disabled = false;
    startCookingBtn.innerHTML = '<i class="fas fa-fire"></i> 开火烹饪';
}

// ===== 提示系统 =====
function showHint() {
    if (hintsRemaining <= 0) {
        alert('提示次数已用完！');
        return;
    }
    
    if (!currentChallenge || currentStepIndex >= currentChallenge.stepsData.length) {
        return;
    }
    
    const currentStepData = currentChallenge.stepsData[currentStepIndex];
    
    if (currentStepData.ingredient === null) {
        alert('当前步骤不需要食材提示！');
        return;
    }
    
    // 扣减提示次数
    hintsRemaining--;
    updateHintCount();
    
    // 扣分
    score = Math.max(0, score - 2);
    updateScore();
    
    // 显示提示弹窗
    const ingredient = currentStepData.ingredient;
    const iconClass = ingredientIcons[ingredient] || 'fas fa-question';
    
    hintIngredientName.innerHTML = `<i class="${iconClass}"></i> <span>${ingredient}</span>`;
    showModal(hintModal);
    
    console.log(`显示提示: ${ingredient}, 剩余提示: ${hintsRemaining}`);
}

function useHintFromModal() {
    hideModal(hintModal);
    // 提示已经在showHint中显示，这里不需要额外操作
}

function updateHintCount() {
    hintCount.textContent = hintsRemaining;
    showHintBtn.disabled = hintsRemaining <= 0;
}

// ===== 步骤控制函数 =====
function continueToNextStep() {
    hideModal(successModal);
    
    // 移动到下一步
    currentStepIndex++;
    
    if (currentStepIndex >= currentChallenge.steps) {
        // 完成所有步骤
        completeChallenge();
    } else {
        // 更新步骤显示
        updateStepsDisplay();
        
        // 清空锅（如果不是最后一步）
        if (currentStepIndex < currentChallenge.steps - 1) {
            clearPot();
        }
        
        // 更新反馈
        resultMessage.innerHTML = `<p>准备好下一步了吗？当前需要：${currentChallenge.stepsData[currentStepIndex].ingredient || '无食材步骤'}</p>`;
    }
}

function skipStep() {
    if (!currentChallenge || currentStepIndex >= currentChallenge.stepsData.length) {
        return;
    }
    
    const currentStepData = currentChallenge.stepsData[currentStepIndex];
    
    if (currentStepData.ingredient !== null) {
        alert('此步骤需要放入食材，不能跳过！');
        return;
    }
    
    // 移动到下一步
    currentStepIndex++;
    
    if (currentStepIndex >= currentChallenge.steps) {
        completeChallenge();
    } else {
        updateStepsDisplay();
        resultMessage.innerHTML = `<p>已跳过无需食材的步骤</p>`;
    }
}

function startCooking() {
    if (!currentChallenge || !challengeStarted) return;
    
    // 检查是否有食材在锅中
    const hasIngredients = potContent.querySelector('.ingredient-in-pot');
    
    if (!hasIngredients) {
        showError('锅中没有食材，请先放入食材！');
        return;
    }
    
    // 启动火焰效果
    document.getElementById('fireEffect').classList.add('active');
    startCookingBtn.disabled = true;
    startCookingBtn.textContent = '正在烹饪中...';
    
    // 显示烹饪消息
    resultMessage.innerHTML = `<p><i class="fas fa-fire"></i> 正在烹饪中...</p>`;
    
    // 模拟烹饪时间
    setTimeout(() => {
        if (currentStepData.ingredient) {
            // 如果是需要食材的步骤，自动验证
            const ingredientInPot = potContent.querySelector('.ingredient-in-pot');
            if (ingredientInPot) {
                const ingredient = ingredientInPot.getAttribute('data-ingredient');
                validateIngredient(ingredient);
            }
        }
    }, 1500);
}

// ===== 挑战完成函数 =====
function completeChallenge() {
    if (!currentChallenge) return;
    
    challengeStarted = false;
    
    // 计算总用时
    const endTime = new Date();
    const timeDiff = Math.floor((endTime - startTime) / 1000 / 60); // 分钟
    
    // 计算最终得分
    const hintsUsedCount = 3 - hintsRemaining;
    const timeBonus = Math.max(0, 20 - timeDiff); // 时间奖励
    const finalScoreValue = score + timeBonus;
    
    // 显示完成区域
    completionArea.style.display = 'block';
    finalMessage.textContent = `恭喜！你成功完成了 ${currentChallenge.name} 的制作！`;
    
    // 更新完成弹窗信息
    completedRecipeName.textContent = currentChallenge.name;
    completionCongrats.textContent = `恭喜！你成功完成了 ${currentChallenge.name} 的制作！`;
    finalScore.textContent = finalScoreValue;
    completionTime.textContent = timeDiff;
    hintsUsed.textContent = hintsUsedCount;
    
    // 显示完成弹窗
    showModal(completionModal);
    
    // 更新反馈
    resultMessage.innerHTML = `<p><i class="fas fa-trophy"></i> 挑战完成！最终得分: ${finalScoreValue}</p>`;
    
    // 保存进度到本地存储
    saveProgress(currentChallenge.name, finalScoreValue);
    
    console.log(`挑战完成: ${currentChallenge.name}, 得分: ${finalScoreValue}, 用时: ${timeDiff}分钟`);
}

function resetChallenge() {
    if (!currentChallenge) return;
    
    if (confirm('确定要重新开始挑战吗？当前进度将丢失。')) {
        startChallenge(Object.keys(recipeChallenges).find(
            key => recipeChallenges[key].name === currentChallenge.name
        ));
    }
}

function retryFromModal() {
    hideModal(completionModal);
    resetChallenge();
}

function backToSelectionFromModal() {
    hideModal(completionModal);
    backToSelection();
}

// ===== 反馈和得分函数 =====
function updateScore() {
    scoreValue.textContent = score;
}

function updateUsedIngredients() {
    usedIngredients.innerHTML = '';
    
    if (ingredientsUsed.length === 0) {
        usedIngredients.innerHTML = '<p class="empty-message">尚未使用食材</p>';
        return;
    }
    
    ingredientsUsed.forEach(ingredient => {
        const tag = document.createElement('div');
        tag.className = 'used-ingredient-tag';
        
        const iconClass = ingredientIcons[ingredient] || 'fas fa-question';
        tag.innerHTML = `<i class="${iconClass}"></i> ${ingredient}`;
        
        usedIngredients.appendChild(tag);
    });
}

function updateFeedback() {
    updateUsedIngredients();
    updateScore();
}

// ===== 弹窗控制函数 =====
function showModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showError(message) {
    alert(message);
}

// ===== 食谱链接函数 =====
function viewRecipeDetail() {
    if (currentChallenge && currentChallenge.recipeLink) {
        window.location.href = currentChallenge.recipeLink;
    } else {
        window.location.href = 'recipes.html';
    }
}

// ===== 进度保存函数 =====
function saveProgress(recipeName, score) {
    try {
        const progress = JSON.parse(localStorage.getItem('cookingProgress') || '{}');
        progress[recipeName] = {
            score: score,
            date: new Date().toISOString(),
            completed: true
        };
        localStorage.setItem('cookingProgress', JSON.stringify(progress));
    } catch (e) {
        console.error('保存进度失败:', e);
    }
}

function loadProgress() {
    try {
        return JSON.parse(localStorage.getItem('cookingProgress') || '{}');
    } catch (e) {
        console.error('加载进度失败:', e);
        return {};
    }
}

// ===== 初始化执行 =====
document.addEventListener('DOMContentLoaded', init);