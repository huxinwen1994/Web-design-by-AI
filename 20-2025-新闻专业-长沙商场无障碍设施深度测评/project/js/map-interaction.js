// 地图交互功能
class MapInteraction {
    constructor() {
        this.mallData = {
            "月亮岛": {
                totalScore: 64.5,
                rating: "中等",
                categories: [
                    { name: "外部与入口", score: 58 },
                    { name: "内部通行", score: 68.6 },
                    { name: "服务设施", score: 65 }
                ],
                highlights: [
                    "无障碍卫生间设施完善",
                    "电梯语音提示清晰",
                    "主要通道宽度充足"
                ],
                problems: [
                    "入口坡道坡度稍陡",
                    "部分导视标识不清晰",
                    "低位服务台数量不足"
                ]
            },
            "大悦城": {
                totalScore: 72,
                rating: "良好",
                categories: [
                    { name: "外部与入口", score: 80 },
                    { name: "内部通行", score: 77.1 },
                    { name: "服务设施", score: 62.5 }
                ],
                highlights: [
                    "入口无障碍通道设计合理",
                    "电梯配备语音和盲文",
                    "无障碍停车位充足"
                ],
                problems: [
                    "卫生间紧急呼叫系统部分失灵",
                    "部分区域导视不连续",
                    "服务台高度不适合轮椅使用者"
                ]
            },
            "万象城": {
                totalScore: 86,
                rating: "优秀",
                categories: [
                    { name: "外部与入口", score: 100 },
                    { name: "内部通行", score: 91.4 },
                    { name: "服务设施", score: 72.5 }
                ],
                highlights: [
                    "全方位无障碍设计",
                    "智能导视系统完善",
                    "专业无障碍服务团队",
                    "无障碍设施维护良好"
                ],
                problems: [
                    "高峰时段电梯等待时间较长",
                    "部分商铺门槛较高"
                ]
            },
            "国金": {
                totalScore: 73,
                rating: "良好",
                categories: [
                    { name: "外部与入口", score: 44 },
                    { name: "内部通行", score: 85.7 },
                    { name: "服务设施", score: 80 }
                ],
                highlights: [
                    "内部通行设施完善",
                    "服务设施齐全",
                    "导视系统清晰"
                ],
                problems: [
                    "入口无障碍通道设计不合理",
                    "部分区域改造空间有限"
                ]
            },
            "荟聚": {
                totalScore: 82,
                rating: "优秀",
                categories: [
                    { name: "外部与入口", score: 84 },
                    { name: "内部通行", score: 100 },
                    { name: "服务设施", score: 65 }
                ],
                highlights: [
                    "内部通行满分设计",
                    "入口通道宽敞平缓",
                    "电梯设施先进完善"
                ],
                problems: [
                    "服务设施细节有待提升",
                    "部分卫生间设施维护不足"
                ]
            },
            "德思勤": {
                totalScore: 82,
                rating: "优秀",
                categories: [
                    { name: "外部与入口", score: 96 },
                    { name: "内部通行", score: 100 },
                    { name: "服务设施", score: 57.5 }
                ],
                highlights: [
                    "入口设计近乎完美",
                    "内部通行无障碍",
                    "电梯设施配置齐全"
                ],
                problems: [
                    "服务设施是主要短板",
                    "无障碍卫生间数量不足"
                ]
            },
            "万家丽": {
                totalScore: 56.5,
                rating: "需改进",
                categories: [
                    { name: "外部与入口", score: 74 },
                    { name: "内部通行", score: 88.6 },
                    { name: "服务设施", score: 17.5 }
                ],
                highlights: [
                    "内部通行设施相对完善",
                    "主要通道设计合理"
                ],
                problems: [
                    "服务设施严重不足",
                    "无障碍卫生间缺失",
                    "导视系统不完善"
                ]
            },
            "永旺梦": {
                totalScore: 73,
                rating: "良好",
                categories: [
                    { name: "外部与入口", score: 42 },
                    { name: "内部通行", score: 85.7 },
                    { name: "服务设施", score: 81.3 }
                ],
                highlights: [
                    "服务设施配置完善",
                    "内部通行设计良好",
                    "无障碍卫生间设施齐全"
                ],
                problems: [
                    "入口无障碍设计不足",
                    "外部通道需要改进"
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        console.log('地图交互系统已初始化');
    }
    
    
    bindEvents() {
        // 地图标记点点击事件
        document.querySelectorAll('.map-marker').forEach(marker => {
            marker.addEventListener('click', (e) => {
                e.stopPropagation();
                const mallName = marker.getAttribute('data-mall');
                this.showMallDetail(mallName);
            });
        });
        
        // 侧边栏列表点击事件
        document.querySelectorAll('.mall-list-item').forEach(item => {
            item.addEventListener('click', () => {
                const mallName = item.getAttribute('data-mall');
                this.showMallDetail(mallName);
                this.highlightMall(mallName);
            });
        });
        
        // 关闭弹窗事件
        document.querySelector('.close-map-modal').addEventListener('click', () => {
            this.hideModal();
        });
        
        // 点击弹窗外部关闭
        document.getElementById('mapModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('mapModal')) {
                this.hideModal();
            }
        });
        
        // ESC键关闭弹窗
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }
    
   showMallDetail(mallName) {
    console.log('=== 显示商场详情 ===', mallName);
    
    const data = this.mallData[mallName];
    if (!data) {
        console.error('未找到商场数据:', mallName);
        return;
    }
    
    console.log('商场数据:', data);
    
    // 更新弹窗标题
    const modalTitle = document.getElementById('modalMallName');
    if (modalTitle) {
        modalTitle.textContent = mallName + '无障碍设施测评';
        console.log('标题已更新:', modalTitle.textContent);
    } else {
        console.error('未找到modalMallName元素');
    }
    
    // 生成弹窗内容
    const modalBody = document.querySelector('.map-modal-body');
    if (modalBody) {
        const content = this.generateModalContent(mallName, data);
        console.log('生成的内容长度:', content.length);
        console.log('内容预览:', content.substring(0, 300) + '...');
        
        modalBody.innerHTML = content;
        console.log('内容已设置到modalBody');
        
        // 等待DOM更新
        setTimeout(() => {
            console.log('DOM更新完成，开始检查元素');
            
            // 检查元素是否存在
            const testBars = modalBody.querySelectorAll('.bar-fill');
            const testContainers = modalBody.querySelectorAll('.bar-container');
            
            console.log('DOM更新后检查:');
            console.log('- bar-fill数量:', testBars.length);
            console.log('- bar-container数量:', testContainers.length);
            
            if (testBars.length > 0) {
                console.log('元素检查通过，开始动画');
                this.animateScoreBars();
            } else {
                console.error('元素检查失败，没有找到bar-fill元素');
            }
        }, 100);
    } else {
        console.error('未找到modalBody元素');
    }
    
    // 显示弹窗
    this.showModal();
    
    // 添加下载按钮事件
    setTimeout(() => {
        const downloadBtn = modalBody.querySelector('.download-btn');
        if (downloadBtn) {
            console.log('找到下载按钮，添加事件');
            downloadBtn.addEventListener('click', () => {
                this.downloadReport(mallName);
            });
        } else {
            console.log('未找到下载按钮');
        }
    }, 200);
}

   generateModalContent(mallName, data) {
    return `
        <div class="mall-score-display">
            <div class="total-score">${data.totalScore}</div>
            <div class="score-label">综合得分</div>
            <div class="rating-badge">${data.rating}</div>
        </div>
        
        <div class="category-scores">
            <h4>分类表现</h4>
            <div class="score-bars">
                ${data.categories.map((category, index) => `
                    <div class="score-bar">
                        <span class="category-name">${category.name}</span>
                        <div class="bar-container">
                            <div class="bar-fill" 
                                 style="width: 0%" 
                                 data-score="${category.score}"
                                 id="score-bar-${index}"></div>
                        </div>
                        <span class="bar-value">${category.score}分</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="highlights-section">
            <h4>💡 亮点表现</h4>
            <div class="highlights-list">
                ${data.highlights.map(highlight => `
                    <div class="highlight-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${highlight}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="problems-section">
            <h4>⚠️ 待改进问题</h4>
            <div class="problems-list">
                ${data.problems.map(problem => `
                    <div class="problem-item">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>${problem}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="download-section">
            <button class="download-btn">
                <i class="fas fa-download"></i>
                下载完整测评报告
            </button>
        </div>
    `;
}

    
animateScoreBars() {
    console.log('=== 开始动画评分条 ===');
    
    const bars = document.querySelectorAll('.bar-fill');
    
    console.log('找到bar-fill数量:', bars.length);
    
    bars.forEach((bar, index) => {
        const score = parseInt(bar.getAttribute('data-score'));
        
        console.log(`评分条 ${index + 1}: ${score}分`);
        
        // 只设置宽度动画，其他样式由CSS控制
        bar.style.width = '0';
        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // 强制重绘
        bar.offsetHeight;
        
        // 延迟动画
        setTimeout(() => {
            bar.style.width = score + '%';
            console.log(`评分条 ${index + 1} 设置为: ${score}%`);
        }, (index + 1) * 500);
    });
}
    highlightMall(mallName) {
        // 移除所有激活状态
        document.querySelectorAll('.mall-list-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 激活当前商场
        document.querySelector(`.mall-list-item[data-mall="${mallName}"]`).classList.add('active');
    }
    
    showModal() {
        document.getElementById('mapModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    hideModal() {
        document.getElementById('mapModal').classList.remove('show');
        document.body.style.overflow = '';
    }
    
    downloadReport(mallName) {
    // 定义商场到文件的映射（根据你提供的文件名）
    const mallFileMap = {
        "德思勤": "德思勤万家丽.xlsx",
        "万家丽": "德思勤万家丽.xlsx",
        "国金": "天心开福国金大悦.xlsx",
        "大悦城": "天心开福国金大悦.xlsx",
        "月亮岛": "月亮岛梦乐城.xlsx",
        "永旺梦": "月亮岛梦乐城.xlsx",
        "荟聚": "岳麓区荟聚万象城.xlsx",
        "万象城": "岳麓区荟聚万象城.xlsx"
    };
    
    // 获取对应的文件名
    const fileName = mallFileMap[mallName];
    
    if (!fileName) {
        console.error(`未找到 ${mallName} 对应的报告文件`);
        alert(`抱歉，${mallName} 的测评报告暂时不可用`);
        return;
    }
    
    console.log(`下载 ${mallName} 的完整测评报告: ${fileName}`);
    
    // 显示确认对话框
    const userConfirmed = confirm(
        `是否下载 ${mallName} 的完整测评报告？\n\n` +
        `文件名称：${fileName}\n` +
        `文件包含详细的无障碍设施测评数据\n\n` +
        `点击"确定"开始下载Excel文件`
    );
    
    if (!userConfirmed) {
        console.log('用户取消了下载');
        return;
    }
    
    // 文件路径 - 假设文件在 reports 文件夹中
    const filePath = `reports/${fileName}`;
    
    // 对于Excel文件，推荐使用强制下载的方式
    try {
        // 创建隐藏的下载链接
        const downloadLink = document.createElement('a');
        downloadLink.href = filePath;
        
        // 设置下载的文件名（可以自定义）
        const downloadFileName = `${mallName}-无障碍设施测评报告.xlsx`;
        downloadLink.download = downloadFileName;
        downloadLink.style.display = 'none';
        
        // 添加到文档并触发点击
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        // 清理DOM
        setTimeout(() => {
            if (downloadLink.parentNode) {
                document.body.removeChild(downloadLink);
            }
        }, 100);
        
        console.log(`下载链接已触发: ${filePath}`);
        
        // 显示下载提示
        setTimeout(() => {
            alert(`正在下载 ${mallName} 的测评报告...\n文件: ${downloadFileName}`);
        }, 300);
        
    } catch (error) {
        console.error('下载过程中出现错误:', error);
        
        // 如果方法1失败，尝试直接打开（作为后备方案）
        alert(`正在打开 ${mallName} 的测评报告...\n如果文件没有自动下载，请右键链接选择"另存为"`);
        window.open(filePath, '_blank');
    }
}
}

// 初始化地图交互
document.addEventListener('DOMContentLoaded', function() {
    window.mapInteraction = new MapInteraction();
});

// 页面切换时重新初始化
document.addEventListener('navigateToPage', function(e) {
    if (e.detail.pageId === 'data-page-1') {
        setTimeout(() => {
            if (!window.mapInteraction) {
                window.mapInteraction = new MapInteraction();
            }
        }, 100);
    }
});