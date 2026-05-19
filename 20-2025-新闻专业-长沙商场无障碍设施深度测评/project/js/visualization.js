// visualization.js
// 页面保护函数 - 确保只在数据页面初始化图表
function shouldInitializeCharts() {
    const dataPage2 = document.getElementById('data-page-2');
    return dataPage2 && dataPage2.classList.contains('active');
}

// 图表管理器 - 防止重复初始化
class ChartProtection {
    constructor() {
        this.initialized = false;
        this.currentPage = null;
    }
    
    canInitialize() {
        if (!shouldInitializeCharts()) {
            console.log('图表初始化被阻止：不在数据页面');
            return false;
        }
        
        if (this.initialized && this.currentPage === 'data-page-2') {
            console.log('图表已经初始化，跳过重复初始化');
            return false;
        }
        
        return true;
    }
    
    markInitialized() {
        this.initialized = true;
        this.currentPage = 'data-page-2';
    }
    
    reset() {
        this.initialized = false;
        this.currentPage = null;
    }
}

const chartProtection = new ChartProtection();

// 等待容器可见
function waitForContainerVisible(containerId, callback, maxAttempts = 50) {
    let attempts = 0;
    
    function check() {
        const container = document.getElementById(containerId);
        if (container && container.offsetWidth > 0 && container.offsetHeight > 0) {
            callback();
        } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(check, 50);
        } else {
            console.warn(`容器 ${containerId} 在超时时间内未获得尺寸`);
            callback();
        }
    }
    
    check();
}

// 可视化数据
const mallScores = [
    { name: "万象城", district: "岳麓区", total: 86, categories: [100, 91.4, 72.5] },
    { name: "德思勤", district: "雨花区", total: 82, categories: [96, 100, 57.5] },
    { name: "荟聚", district: "岳麓区", total: 82, categories: [84, 100, 65] },
    { name: "永旺梦乐城", district: "长沙县", total: 73, categories: [42, 85.7, 81.3] },
    { name: "国金中心", district: "天心区", total: 73, categories: [44, 85.7, 80] },
    { name: "大悦城", district: "开福区", total: 72, categories: [80, 77.1, 62.5] },
    { name: "月亮岛天街", district: "望城区", total: 64.5, categories: [58, 68.6, 65] },
    { name: "万家丽广场", district: "芙蓉区", total: 56.5, categories: [74, 88.6, 17.5] }
];

const commonProblems = [
    { problem: "语音转文字", count: 8 },
    { problem: "有挂衣钩", count: 7 },
    { problem: "文字转语音", count: 6 },
    { problem: "无占用", count: 6 },
    { problem: "有低位台", count: 5 }
];

const categoryNames = ["外部与入口", "内部通行与电梯", "服务与卫生间"];

// 辅助函数
function getColorByScore(score) {
    if (score >= 80) return "#10b981";
    if (score >= 70) return "#f59e0b";
    if (score >= 60) return "#f97316";
    return "#ef4444";
}

// 初始化函数
function initializeChartsFixed() {
    if (!chartProtection.canInitialize()) {
        return;
    }
    
    console.log('开始修复图表初始化...');
    
    try {
        // 获取canvas元素并设置尺寸
        const barCanvas = document.getElementById('barChartCanvas');
        const radarCanvas = document.getElementById('radarChart');
        const heatmapContainer = document.getElementById('heatmapChart');
        if (radarCanvas) {
            const radarContainer = radarCanvas.parentElement;
            const selector = radarContainer.querySelector('.mall-selector');
            if (selector) {
                selector.remove();
            }
        }
        // 设置canvas尺寸
        if (barCanvas) {
            const barContainer = barCanvas.parentElement;
            barCanvas.width = barContainer.clientWidth;
            barCanvas.height = barContainer.clientHeight;
        }
        
        if (radarCanvas) {
            const radarContainer = radarCanvas.parentElement;
            radarCanvas.width = radarContainer.clientWidth;
            radarCanvas.height = radarContainer.clientHeight;
        }
        
        // 销毁现有图表
        if (barCanvas && barCanvas.chart) barCanvas.chart.destroy();
        if (radarCanvas && radarCanvas.chart) radarCanvas.chart.destroy();
        if (heatmapContainer) heatmapContainer.innerHTML = '';
        
        // 重新初始化
        createTotalScoreChart();
        createCategoryComparisonChart();
        createCommonProblemsChart();
        
        chartProtection.markInitialized();
        console.log('图表初始化完成');
    } catch (error) {
        console.error('图表初始化失败:', error);
        chartProtection.reset();
    }
}

// 创建柱状图
function createTotalScoreChart() {
    try {
        const canvas = document.getElementById('barChartCanvas');
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Failed to get 2D context');
            return;
        }
        
        if (canvas.chart) {
            canvas.chart.destroy();
        }
        
        const sortedMalls = [...mallScores].sort((a, b) => b.total - a.total);
        
        canvas.chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: sortedMalls.map(mall => mall.name),
                datasets: [{
                    label: '总分',
                    data: sortedMalls.map(mall => mall.total),
                    backgroundColor: sortedMalls.map(mall => {
                        const color = getColorByScore(mall.total);
                        return color + 'E6';
                    }),
                    borderColor: sortedMalls.map(mall => getColorByScore(mall.total)),
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                const score = context.parsed.y;
                                return `总分: ${score}分`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return value + '分';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('创建柱状图失败:', error);
    }
}

// 创建雷达图
function createCategoryComparisonChart() {
    try {
        const canvas = document.getElementById('radarChart');
        if (!canvas) {
            console.error('Radar canvas element not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Failed to get radar 2D context');
            return;
        }
        
        const chartContainer = canvas.parentElement;
        const existingSelector = chartContainer.querySelector('.mall-selector');
        if (existingSelector) {
            existingSelector.remove();
        }
        // ===== 新增结束 =====
        
        if (canvas.chart) {
            canvas.chart.destroy();
        }
        // 创建选择器容器
       
        const selectorHtml = `
            <div class="mall-selector" style="margin-bottom: 20px; padding: 15px; background: #f8fafc; border-radius: 10px;">
                <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #374151;">选择要显示的商场：</h4>
                <div class="selector-buttons" style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${mallScores.map((mall, index) => `
                        <button class="mall-toggle-btn ${index < 4 ? 'active' : ''}" 
                                data-mall="${mall.name}"
                                style="padding: 6px 12px; border: 2px solid ${getColorByScore(mall.total)}; 
                                       background: ${index < 4 ? getColorByScore(mall.total) : 'white'}; 
                                       color: ${index < 4 ? 'white' : getColorByScore(mall.total)}; 
                                       border-radius: 20px; font-size: 12px; cursor: pointer;">
                            ${mall.name}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        chartContainer.insertAdjacentHTML('afterbegin', selectorHtml);
        
        // 默认显示前4个商场
        const selectedMalls = mallScores.slice(0, 4);
        
        function createRadarChart(malls) {
            if (canvas.chart) {
                canvas.chart.destroy();
            }
            
            canvas.chart = new Chart(canvas, {
                type: 'radar',
                data: {
                    labels: categoryNames,
                    datasets: malls.map(mall => ({
                        label: mall.name,
                        data: mall.categories,
                        backgroundColor: getColorByScore(mall.total) + '33',
                        borderColor: getColorByScore(mall.total),
                        borderWidth: 2,
                        pointBackgroundColor: getColorByScore(mall.total),
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }))
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: {
                                    size: 12
                                },
                                padding: 15
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleFont: {
                                size: 14
                            },
                            bodyFont: {
                                size: 13
                            },
                            padding: 12,
                            cornerRadius: 8
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 20,
                                font: {
                                    size: 11
                                }
                            },
                            pointLabels: {
                                font: {
                                    size: 12
                                }
                            }
                        }
                    }
                }
            });
        }
        
        createRadarChart(selectedMalls);
        
        // 添加按钮点击事件
        const buttons = chartContainer.querySelectorAll('.mall-toggle-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const mallName = this.dataset.mall;
                const isActive = this.classList.contains('active');
                
                if (!isActive) {
                    const activeButtons = chartContainer.querySelectorAll('.mall-toggle-btn.active');
                    if (activeButtons.length >= 4) {
                        return;
                    }
                    this.classList.add('active');
                    const mall = mallScores.find(m => m.name === mallName);
                    this.style.background = getColorByScore(mall.total);
                    this.style.color = 'white';
                } else {
                    this.classList.remove('active');
                    const mall = mallScores.find(m => m.name === mallName);
                    this.style.background = 'white';
                    this.style.color = getColorByScore(mall.total);
                }
                
                // 更新图表数据
                const activeMalls = [];
                chartContainer.querySelectorAll('.mall-toggle-btn.active').forEach(btn => {
                    const name = btn.dataset.mall;
                    const mall = mallScores.find(m => m.name === name);
                    if (mall) activeMalls.push(mall);
                });
                
                if (activeMalls.length === 0) {
                    const firstButton = chartContainer.querySelector('.mall-toggle-btn');
                    firstButton.classList.add('active');
                    const firstMall = mallScores[0];
                    firstButton.style.background = getColorByScore(firstMall.total);
                    firstButton.style.color = 'white';
                    activeMalls.push(firstMall);
                }
                
                createRadarChart(activeMalls);
            });
        });
    } catch (error) {
        console.error('创建雷达图失败:', error);
    }
}

// 创建热力图
function createCommonProblemsChart() {
    try {
        const container = document.getElementById('heatmapChart');
        if (!container) {
            console.error('Heatmap container not found');
            return;
        }
        
        container.innerHTML = '';
        
        const containerWidth = container.clientWidth;
        const height = 400;
        
        const margin = { top: 40, right: 80, bottom: 60, left: 200 };
        const width = containerWidth - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        
        const svg = d3.select(container)
            .append("svg")
            .attr("width", containerWidth)
            .attr("height", height);
        
        const x = d3.scaleLinear()
            .domain([0, d3.max(commonProblems, d => d.count)])
            .range([0, width]);
        
        const y = d3.scaleBand()
            .domain(commonProblems.map(d => d.problem))
            .range([0, chartHeight])
            .padding(0.2);
        
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        
        // 添加网格线
        g.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(x)
                .ticks(5)
                .tickSize(-chartHeight)
                .tickFormat("")
            )
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.3);
        
        // 添加条形
        g.selectAll(".bar")
            .data(commonProblems)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", d => y(d.problem))
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("width", 0)
            .attr("fill", "#4A90E2")
            .attr("rx", 4)
            .transition()
            .duration(800)
            .delay((d, i) => i * 100)
            .attr("width", d => x(d.count));
        
        // 添加问题标签（左侧）
        g.selectAll(".problem-label")
            .data(commonProblems)
            .enter()
            .append("text")
            .attr("class", "problem-label")
            .attr("y", d => y(d.problem) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("x", -10)
            .attr("text-anchor", "end")
            .style("font-size", "13px")
            .style("fill", "#374151")
            .style("font-weight", "500")
            .text(d => d.problem);
        
        // 添加数值标签（右侧）
        g.selectAll(".value-label")
            .data(commonProblems)
            .enter()
            .append("text")
            .attr("class", "value-label")
            .attr("y", d => y(d.problem) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("x", d => x(d.count) + 10)
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .style("fill", "#6B7280")
            .style("opacity", 0)
            .text(d => `${d.count}个商场`)
            .transition()
            .duration(800)
            .delay((d, i) => i * 100 + 400)
            .style("opacity", 1);
        
        // 添加x轴
        g.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(x).ticks(5))
            .style("font-size", "12px")
            .style("color", "#6B7280");
        
        // 添加标题
        svg.append("text")
            .attr("x", containerWidth / 2)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style("fill", "#374151")
            .text("高频问题分布");
    } catch (error) {
        console.error('创建热力图失败:', error);
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成');
    
    const dataPage2 = document.getElementById('data-page-2');
    if (dataPage2 && dataPage2.classList.contains('active')) {
        console.log('当前已在数据页面2，直接初始化图表');
        setTimeout(() => {
            initializeChartsFixed();
        }, 300);
    }
});

// 页面切换监听
document.addEventListener('navigateToPage', function(e) {
    const pageId = e.detail.pageId;
    console.log('收到导航事件，目标页面:', pageId);
    
    if (pageId !== 'data-page-2') {
        chartProtection.reset();
        console.log('离开数据页面，重置图表状态');
    }
    
    if (pageId === 'data-page-2') {
        console.log('切换到数据页面2，准备初始化图表');
        setTimeout(() => {
            initializeChartsFixed();
        }, 600);
    }
});

// 窗口大小改变时重新绘制图表
window.addEventListener('resize', function() {
    if (document.getElementById('data-page-2')?.classList.contains('active')) {
        setTimeout(initializeChartsFixed, 300);
    }
});
