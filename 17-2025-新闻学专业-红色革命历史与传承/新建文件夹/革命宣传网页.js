// red-revolution-scripts.js
// 红色革命主题网站 - 主要交互脚本

// Tab切换功能
function switchTab(selected, id) {
    // 重置所有Tab样式
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 高亮当前Tab
    selected.classList.add('active');
    
    // 隐藏所有内容区域
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 显示对应内容区域
    document.getElementById('tab' + id).classList.add('active');
}

// 为所有Tab按钮绑定点击事件
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有Tab按钮
    const tabButtons = document.querySelectorAll('.tab');
    
    // 为每个Tab按钮添加点击事件监听
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const tabId = index + 1; // 因为Tab是从1开始编号的
            switchTab(this, tabId);
        });
    });
    
    // 初始化其他功能
    initializeQuiz();
    initializeMatching();
    initializeSorting();
    initializeRanks();
});

// 革命事件填空题答案
const blankAnswers = {
    blank1: '南昌起义',
    blank2: '秋收起义',
    blank3: '长征'
};

// 检查填空题答案
function checkBlanks() {
    let score = 0;
    let total = 3;
    let allAnswered = true;
    
    // 检查每个填空题
    for (let i = 1; i <= 3; i++) {
        const blankId = `blank${i}`;
        const feedbackId = `feedback-blank${i}`;
        const userAnswer = document.getElementById(blankId).value.trim();
        const feedback = document.getElementById(feedbackId);
        
        if (!userAnswer) {
            feedback.textContent = '请填写答案！';
            feedback.className = 'blank-feedback blank-wrong';
            feedback.style.display = 'block';
            allAnswered = false;
            continue;
        }
        
        if (userAnswer === blankAnswers[blankId]) {
            score++;
            feedback.textContent = '回答正确！';
            feedback.className = 'blank-feedback blank-correct';
        } else {
            feedback.textContent = `回答错误，正确答案是：${blankAnswers[blankId]}`;
            feedback.className = 'blank-feedback blank-wrong';
        }
        
        feedback.style.display = 'block';
    }
    
    // 显示结果
    const resultDiv = document.getElementById('blankResult');
    if (allAnswered) {
        if (score === total) {
            resultDiv.className = 'result result-success';
            resultDiv.textContent = '优秀！您对革命事件非常了解！';
        } else if (score >= 1) {
            resultDiv.className = 'result result-success';
            resultDiv.textContent = `良好！您答对了 ${score} 题，继续加油！`;
        } else {
            resultDiv.className = 'result result-error';
            resultDiv.textContent = '需要加强学习哦，建议多了解革命历史事件。';
        }
        
        resultDiv.style.display = 'block';
    }
}

// 重置填空题
function resetBlanks() {
    // 清除所有输入
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`blank${i}`).value = '';
        document.getElementById(`feedback-blank${i}`).style.display = 'none';
    }
    
    // 隐藏结果
    document.getElementById('blankResult').style.display = 'none';
}

// 人物专栏测验答案
const quizAnswers = {
    q1: 'A',
    q2: 'B',
    q3: 'A'
};

let userQuizAnswers = {
    q1: null,
    q2: null,
    q3: null
};

// 初始化测验功能
function initializeQuiz() {
    // 为每个选项添加点击事件监听器
    const quizRadios = document.querySelectorAll('#tab3 input[type="radio"]');
    quizRadios.forEach(radio => {
        radio.addEventListener('click', function() {
            const questionName = this.name;
            userQuizAnswers[questionName] = this.value;
            
            // 重置该问题的反馈
            const feedback = document.getElementById(`feedback${questionName.slice(1)}`);
            feedback.style.display = 'none';
        });
    });
    
    // 为提交按钮添加事件
    const checkBtn = document.querySelector('#tab3 .btn-check');
    if (checkBtn) {
        checkBtn.addEventListener('click', checkQuiz);
    }
    
    // 为重置按钮添加事件
    const resetBtn = document.querySelector('#tab3 .btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetQuiz);
    }
}

// 检查测验答案
function checkQuiz() {
    let score = 0;
    let allAnswered = true;
    
    // 检查每个问题的答案
    for (let i = 1; i <= 3; i++) {
        const questionName = `q${i}`;
        const feedback = document.getElementById(`feedback${i}`);
        
        if (userQuizAnswers[questionName] === null) {
            feedback.textContent = '请先选择一个答案！';
            feedback.className = 'quiz-feedback quiz-wrong';
            feedback.style.display = 'block';
            allAnswered = false;
            continue;
        }
        
        if (userQuizAnswers[questionName] === quizAnswers[questionName]) {
            score++;
            feedback.textContent = '回答正确！';
            feedback.className = 'quiz-feedback quiz-correct';
        } else {
            feedback.textContent = '回答错误，请再仔细思考。';
            feedback.className = 'quiz-feedback quiz-wrong';
        }
        
        feedback.style.display = 'block';
    }
    
    // 显示结果
    const resultDiv = document.getElementById('quizResult');
    if (allAnswered) {
        if (score === 3) {
            resultDiv.className = 'result result-success';
            resultDiv.textContent = '优秀！您对革命人物非常了解！';
        } else if (score >= 1) {
            resultDiv.className = 'result result-success';
            resultDiv.textContent = `良好！您答对了 ${score} 题，继续加油！`;
        } else {
            resultDiv.className = 'result result-error';
            resultDiv.textContent = '需要加强学习哦，建议多了解革命历史人物。';
        }
        
        resultDiv.style.display = 'block';
    }
}

// 重置测验
function resetQuiz() {
    // 清除所有选择
    const quizRadios = document.querySelectorAll('#tab3 input[type="radio"]');
    quizRadios.forEach(radio => {
        radio.checked = false;
    });
    
    // 重置用户答案状态
    userQuizAnswers = {
        q1: null,
        q2: null,
        q3: null
    };
    
    // 隐藏所有反馈
    const feedbacks = document.querySelectorAll('#tab3 .quiz-feedback');
    feedbacks.forEach(feedback => {
        feedback.style.display = 'none';
    });
    
    // 隐藏结果
    document.getElementById('quizResult').style.display = 'none';
}

// 历史遗迹连线题
let selectedItems = [];
const correctMatching = {
    '1': 'B',
    '2': 'D',
    '3': 'A',
    '4': 'C'
};

// 初始化连线题功能
function initializeMatching() {
    // 为连线项添加点击事件
    const matchingItems = document.querySelectorAll('#tab4 .matching-item');
    matchingItems.forEach(item => {
        item.addEventListener('click', function() {
            selectItem(this);
        });
    });
    
    // 为检查按钮添加事件
    const checkBtn = document.querySelector('#tab4 .btn-check');
    if (checkBtn) {
        checkBtn.addEventListener('click', checkMatching);
    }
    
    // 为重置按钮添加事件
    const resetBtn = document.querySelector('#tab4 .btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetMatching);
    }
}

// 选择连线项
function selectItem(element) {
    const id = element.getAttribute('data-id');
    
    // 如果已经选中，则取消选中
    if (selectedItems.includes(element)) {
        element.classList.remove('selected');
        element.style.backgroundColor = '';
        selectedItems = selectedItems.filter(item => item !== element);
        return;
    }
    
    // 如果已经选中了两个，先清空
    if (selectedItems.length >= 2) {
        selectedItems.forEach(item => {
            item.classList.remove('selected');
            item.style.backgroundColor = '';
        });
        selectedItems = [];
    }
    
    // 选中当前项
    element.classList.add('selected');
    element.style.backgroundColor = 'rgba(180, 0, 0, 0.9)';
    selectedItems.push(element);
}

// 检查连线匹配
function checkMatching() {
    if (selectedItems.length !== 2) {
        alert('请选择两个项目进行连线！');
        return;
    }
    
    const item1 = selectedItems[0];
    const item2 = selectedItems[1];
    const id1 = item1.getAttribute('data-id');
    const id2 = item2.getAttribute('data-id');
    
    // 检查是否一个是遗址，一个是描述
    const isSite1 = !isNaN(id1);
    const isSite2 = !isNaN(id2);
    
    if (isSite1 === isSite2) {
        document.getElementById('matchingResult').className = 'result result-error';
        document.getElementById('matchingResult').textContent = '错误！请选择一个遗址和一个描述进行连线。';
        document.getElementById('matchingResult').style.display = 'block';
        return;
    }
    
    // 确定哪个是遗址，哪个是描述
    let siteId, descId;
    if (isSite1) {
        siteId = id1;
        descId = id2;
    } else {
        siteId = id2;
        descId = id1;
    }
    
    // 检查匹配是否正确
    if (correctMatching[siteId] === descId) {
        item1.style.backgroundColor = 'rgba(0, 100, 0, 0.7)';
        item2.style.backgroundColor = 'rgba(0, 100, 0, 0.7)';
        item1.classList.remove('selected');
        item2.classList.remove('selected');
        
        document.getElementById('matchingResult').className = 'result result-success';
        document.getElementById('matchingResult').textContent = '正确！连线成功！';
        document.getElementById('matchingResult').style.display = 'block';
        
        selectedItems = [];
        
        // 检查是否全部匹配
        const allMatched = document.querySelectorAll('#tab4 .matching-item[style*="rgba(0, 100, 0"]').length === 8;
        if (allMatched) {
            setTimeout(() => {
                document.getElementById('matchingResult').textContent = '太棒了！您已经正确完成了所有连线！';
            }, 500);
        }
    } else {
        document.getElementById('matchingResult').className = 'result result-error';
        document.getElementById('matchingResult').textContent = '错误！这个连线不正确，请再试试。';
        document.getElementById('matchingResult').style.display = 'block';
    }
}

// 重置连线题
function resetMatching() {
    // 清除所有选中和匹配状态
    const matchingItems = document.querySelectorAll('#tab4 .matching-item');
    matchingItems.forEach(item => {
        item.classList.remove('selected');
        item.style.backgroundColor = '';
    });
    
    selectedItems = [];
    
    // 隐藏结果
    document.getElementById('matchingResult').style.display = 'none';
}

// 诗歌排序题 - 正确顺序
const correctPoemOrder = ['1', '2', '3', '4', '5', '6', '7', '8'];

// 初始化排序题功能
function initializeSorting() {
    // 初始化打乱顺序
    shufflePoemItems();
    
    // 为检查按钮添加事件
    const checkBtn = document.querySelector('#tab5 .btn-check');
    if (checkBtn) {
        checkBtn.addEventListener('click', checkSorting);
    }
    
    // 为重置按钮添加事件
    const resetBtn = document.querySelector('#tab5 .btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetSorting);
    }
    
    // 初始化拖拽功能
    initializeDragAndDrop('sortContainer');
}

// 检查诗歌排序
function checkSorting() {
    const items = document.querySelectorAll('#sortContainer .sort-item');
    let currentOrder = [];
    
    items.forEach(item => {
        currentOrder.push(item.getAttribute('data-id'));
    });
    
    // 检查排序是否正确
    let isCorrect = true;
    for (let i = 0; i < currentOrder.length; i++) {
        if (currentOrder[i] !== correctPoemOrder[i]) {
            isCorrect = false;
            break;
        }
    }
    
    const resultDiv = document.getElementById('sortingResult');
    if (isCorrect) {
        resultDiv.className = 'result result-success';
        resultDiv.textContent = '正确！您完美地恢复了《七律·长征》的正确顺序！';
    } else {
        resultDiv.className = 'result result-error';
        resultDiv.textContent = '排序不正确，请再试试。提示：注意诗句的平仄和对仗关系。';
    }
    
    resultDiv.style.display = 'block';
}

// 重置诗歌排序
function resetSorting() {
    // 打乱诗歌排序题顺序
    shufflePoemItems();
    document.getElementById('sortingResult').style.display = 'none';
}

// 打乱诗歌排序题顺序
function shufflePoemItems() {
    const container = document.getElementById('sortContainer');
    if (!container) return;
    
    const items = Array.from(container.querySelectorAll('.sort-item'));
    
    // 打乱数组顺序
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(items[j]);
    }
}

// 军衔排序题 - 正确顺序
const correctRankOrder = ['1', '4', '2', '5', '6', '3'];

// 初始化军衔排序功能
function initializeRanks() {
    // 初始化打乱顺序
    shuffleRankItems();
    
    // 为检查按钮添加事件
    const checkBtn = document.querySelector('#tab6 .btn-check');
    if (checkBtn) {
        checkBtn.addEventListener('click', checkRanks);
    }
    
    // 为重置按钮添加事件
    const resetBtn = document.querySelector('#tab6 .btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetRanks);
    }
    
    // 初始化拖拽功能
    initializeDragAndDrop('rankContainer');
}

// 检查军衔排序
function checkRanks() {
    const items = document.querySelectorAll('#rankContainer .sort-item');
    let currentOrder = [];
    
    items.forEach(item => {
        currentOrder.push(item.getAttribute('data-id'));
    });
    
    // 检查排序是否正确
    let isCorrect = true;
    for (let i = 0; i < currentOrder.length; i++) {
        if (currentOrder[i] !== correctRankOrder[i]) {
            isCorrect = false;
            break;
        }
    }
    
    const resultDiv = document.getElementById('ranksResult');
    if (isCorrect) {
        resultDiv.className = 'result result-success';
        resultDiv.textContent = '正确！您准确排列了解放军军衔的高低顺序！';
    } else {
        resultDiv.className = 'result result-error';
        resultDiv.textContent = '排序不正确，请再试试。提示：解放军军衔从高到低为将官、校官、尉官。';
    }
    
    resultDiv.style.display = 'block';
}

// 重置军衔排序
function resetRanks() {
    // 打乱军衔排序题顺序
    shuffleRankItems();
    document.getElementById('ranksResult').style.display = 'none';
}

// 打乱军衔排序题顺序
function shuffleRankItems() {
    const container = document.getElementById('rankContainer');
    if (!container) return;
    
    const items = Array.from(container.querySelectorAll('.sort-item'));
    
    // 打乱数组顺序
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(items[j]);
    }
}

// 初始化拖拽功能
function initializeDragAndDrop(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let draggedItem = null;
    
    container.querySelectorAll('.sort-item').forEach(item => {
        item.setAttribute('draggable', 'true');
        
        item.addEventListener('dragstart', function(e) {
            draggedItem = this;
            setTimeout(() => {
                this.style.opacity = '0.4';
            }, 0);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        });
        
        item.addEventListener('dragend', function() {
            setTimeout(() => {
                if (draggedItem) {
                    draggedItem.style.opacity = '1';
                    draggedItem = null;
                }
            }, 0);
        });
        
        item.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        item.addEventListener('dragenter', function(e) {
            e.preventDefault();
            if (this !== draggedItem) {
                this.style.backgroundColor = 'rgba(180, 0, 0, 0.9)';
            }
        });
        
        item.addEventListener('dragleave', function() {
            if (this !== draggedItem) {
                this.style.backgroundColor = '';
            }
        });
        
        item.addEventListener('drop', function(e) {
            e.preventDefault();
            if (draggedItem && this !== draggedItem) {
                this.style.backgroundColor = '';
                
                const allItems = Array.from(container.querySelectorAll('.sort-item'));
                const thisIndex = allItems.indexOf(this);
                const draggedIndex = allItems.indexOf(draggedItem);
                
                if (draggedIndex < thisIndex) {
                    container.insertBefore(draggedItem, this.nextSibling);
                } else {
                    container.insertBefore(draggedItem, this);
                }
            }
        });
    });
}