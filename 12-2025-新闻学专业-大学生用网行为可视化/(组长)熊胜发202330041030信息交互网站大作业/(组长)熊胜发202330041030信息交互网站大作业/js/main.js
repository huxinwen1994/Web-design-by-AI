// ==================== JavaScript 逻辑 ====================

// 全局函数：关闭模态框
window.closeModal = function(id) { 
    const el = document.getElementById(id); 
    el.classList.remove('show'); 
    setTimeout(() => el.style.display = 'none', 300); 
};

// 主要逻辑
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 实时网速模拟 ---
    setInterval(() => {
        const speed = (Math.random() * 10 + 10).toFixed(1);
        const speedElement = document.getElementById('live-speed');
        if(speedElement) {
            speedElement.innerText = `${speed} MB/s`;
            speedElement.style.color = '#4A90E2';
            setTimeout(() => speedElement.style.color = '', 300);
        }
    }, 2000);

    // --- 2. 流量预警 (减到0停止) ---
    const trafficTrigger = document.getElementById('traffic-alert-trigger');
    const trafficModal = document.getElementById('modal-traffic');
    const trafficValSpan = document.getElementById('traffic-val');
    let currentTraffic = 10.0000;
    const decreaseStep = 2 / 60 / 10; 
    setInterval(() => {
        currentTraffic -= decreaseStep;
        if(currentTraffic <= 0) currentTraffic = 0;
        if(trafficModal.style.display === 'flex') trafficValSpan.innerText = currentTraffic.toFixed(4);
    }, 100);
    trafficTrigger.addEventListener('click', () => {
        trafficValSpan.innerText = currentTraffic.toFixed(4);
        trafficModal.style.display = 'flex';
        setTimeout(() => trafficModal.classList.add('show'), 10);
    });

    // --- 3. 互动调研表单验证 ---
    const feedbackBtn = document.getElementById('btn-submit-feedback');
    const feedbackInput = document.getElementById('feedback-input');
    feedbackBtn.addEventListener('click', () => {
        const val = feedbackInput.value.trim();
        if(!val) alert('你还未填写内容'); else { alert('感谢您的反馈！'); feedbackInput.value = ''; }
    });

    // =========================================================================
    // 4. 核心逻辑更新：校园网络"潮汐"模拟实验室
    // =========================================================================
    
    // 4.1 潮汐地图初始化 (使用ECharts EffectScatter 模拟流场)
    const tideChart = echarts.init(document.getElementById('campus-tide-map'));
    
    // 模拟校园坐标 (相对坐标 0-100)
    // 区域定义：[x, y, 名字, 类型]
    const locations = [
        {name: '图书馆', x: 50, y: 80, type: 'study'},
        {name: '第一食堂', x: 30, y: 50, type: 'life'},
        {name: '第二食堂', x: 70, y: 50, type: 'life'},
        {name: '男生宿舍A', x: 20, y: 20, type: 'dorm'},
        {name: '女生宿舍B', x: 80, y: 20, type: 'dorm'},
        {name: '教学楼', x: 50, y: 60, type: 'study'}
    ];

    // 场景数据配置
    const scenarios = {
        'exam-8am': {
            title: '考试周 - 上午 8:00',
            data: [ // value: [x, y, 流量拥堵度(0-100), 节点大小]
                {name: '图书馆', value: [50, 80, 95, 40], itemStyle: {color: '#e74c3c'}}, // 极拥堵
                {name: '教学楼', value: [50, 60, 80, 30], itemStyle: {color: '#e67e22'}},
                {name: '宿舍', value: [20, 20, 10, 15], itemStyle: {color: '#2ecc71'}}, // 空闲
                {name: '宿舍', value: [80, 20, 10, 15], itemStyle: {color: '#2ecc71'}},
                {name: '食堂', value: [30, 50, 20, 20], itemStyle: {color: '#3498db'}},
                {name: '食堂', value: [70, 50, 20, 20], itemStyle: {color: '#3498db'}}
            ],
            guide: "<strong>避堵攻略：</strong>此时图书馆爆满，网速极慢。建议前往空闲的宿舍区或食堂复习，下载速度可提升300%。"
        },
        'weekend-10pm': {
            title: '周末 - 晚上 10:00',
            data: [
                {name: '图书馆', value: [50, 80, 10, 15], itemStyle: {color: '#2ecc71'}},
                {name: '教学楼', value: [50, 60, 5, 15], itemStyle: {color: '#2ecc71'}},
                {name: '宿舍', value: [20, 20, 90, 40], itemStyle: {color: '#e74c3c'}}, // 拥堵
                {name: '宿舍', value: [80, 20, 95, 40], itemStyle: {color: '#e74c3c'}},
                {name: '食堂', value: [30, 50, 15, 20], itemStyle: {color: '#3498db'}},
                {name: '食堂', value: [70, 50, 15, 20], itemStyle: {color: '#3498db'}}
            ],
            guide: "<strong>避堵攻略：</strong>宿舍区正处于视频游戏高峰，延迟较高。如下载大文件，建议连接图书馆网络，此时如入无人之境。"
        },
        'lunch-12pm': {
            title: '工作日 - 中午 12:00',
            data: [
                {name: '图书馆', value: [50, 80, 30, 20], itemStyle: {color: '#3498db'}},
                {name: '教学楼', value: [50, 60, 20, 20], itemStyle: {color: '#3498db'}},
                {name: '宿舍', value: [20, 20, 40, 25], itemStyle: {color: '#f1c40f'}},
                {name: '宿舍', value: [80, 20, 40, 25], itemStyle: {color: '#f1c40f'}},
                {name: '食堂', value: [30, 50, 85, 35], itemStyle: {color: '#e74c3c'}}, // 拥堵
                {name: '食堂', value: [70, 50, 85, 35], itemStyle: {color: '#e74c3c'}}
            ],
            guide: "<strong>避堵攻略：</strong>食堂移动支付并发量大，可能卡顿。建议避开饭点高峰或使用校园卡支付。"
        }
    };

    // 渲染地图函数
    function renderTideMap(scenarioKey) {
        const scenario = scenarios[scenarioKey];
        
        // 更新攻略文字
        const guideBox = document.getElementById('guide-display');
        guideBox.querySelector('.guide-text').innerHTML = scenario.guide;
        guideBox.style.animation = 'none';
        guideBox.offsetHeight; /* trigger reflow */
        guideBox.style.animation = 'fadeIn 0.5s';

        tideChart.setOption({
            backgroundColor: '#1a1a2e', // 深色背景模拟科技感
            title: { text: scenario.title, left: 'center', top: 10, textStyle: { color: '#fff' } },
            tooltip: { formatter: params => `${params.name}<br>拥堵指数: ${params.value[2]}%` },
            grid: { top: 0, bottom: 0, left: 0, right: 0 },
            xAxis: { show: false, min: 0, max: 100 },
            yAxis: { show: false, min: 0, max: 100 },
            series: [{
                type: 'effectScatter',
                symbolSize: function (val) { return val[3]; }, // 根据数据决定大小
                data: scenario.data,
                rippleEffect: { brushType: 'stroke', scale: 3 }, // 涟漪效果模拟"潮汐"
                label: { show: true, formatter: '{b}', position: 'right', color: '#fff' }
            }]
        });
    }

    // 初始化默认场景
    renderTideMap('exam-8am');

    // 绑定场景切换按钮
    document.getElementById('btn-run-simulation').addEventListener('click', () => {
        const key = document.getElementById('scenario-select').value;
        renderTideMap(key);
    });

    // 4.2 自定义压力测试逻辑
    const slider = document.getElementById('user-count-slider');
    const countDisplay = document.getElementById('user-count-display');
    const expChartDiv = document.getElementById('experiment-chart');
    let expChart = null;

    slider.addEventListener('input', (e) => {
        countDisplay.innerText = `${e.target.value} 人`;
    });

    document.getElementById('btn-run-experiment').addEventListener('click', () => {
        const users = parseInt(slider.value);
        expChartDiv.classList.add('active');
        
        if (!expChart) expChart = echarts.init(expChartDiv);

        // 模拟算法：人数越多，网速越低，且波动越大
        const baseSpeed = 20; // 20MB/s 基准
        const dropFactor = users / 5000; // 拥堵系数
        const data = [];
        for (let i = 0; i <= 60; i++) {
            // 模拟波动：随机噪声 + 负载下降
            let speed = baseSpeed * (1 - dropFactor * 0.8) + (Math.random() * 2 - 1);
            if (speed < 0.5) speed = 0.5; // 最低限度
            data.push(speed.toFixed(1));
        }

        expChart.setOption({
            title: { text: `压力测试结果: ${users}人并发`, left: 'center', textStyle: { fontSize: 14 } },
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: Array.from({length:61}, (_,i)=>`${i}s`), name: '时间' },
            yAxis: { type: 'value', name: '网速(MB/s)', min: 0, max: 25 },
            series: [{
                data: data,
                type: 'line',
                smooth: true,
                areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#e74c3c'}, {offset: 1, color: '#fff'}]) },
                lineStyle: { color: '#c0392b' },
                markLine: { data: [{ type: 'average', name: '平均网速' }] }
            }]
        });
        expChart.resize();
    });

    // ==========================================
    // 5. 其他原有图表 (热力图/核心数据/轮播)
    // ==========================================
    
    // 首页热力图
    const chartHero1 = echarts.init(document.getElementById('hero-chart-1'));
    const hours = ['0a','2a','4a','6a','8a','10a','12p','2p','4p','6p','8p','10p'];
    const days = ['体育馆','图书馆','第一食堂','男生宿舍','女生宿舍','教学楼A','教学楼B'];
    const generateData = () => {
        return days.map((day, i) => {
            return hours.map((hour, j) => {
                let val = Math.random() * 50;
                if(day.includes('宿舍') && (j<4 || j>10)) val += 50;
                if(day.includes('食堂') && (j===6 || j===9)) val += 80;
                if(day.includes('教学') && (j>4 && j<10)) val += 60;
                return [j, i, Math.floor(val)];
            });
        }).flat();
    };
    chartHero1.setOption({
        baseOption: {
            timeline: { axisType: 'category', autoPlay: true, playInterval: 2000, data: ['工作日','周末','考试周','假期'] },
            tooltip: { position: 'top' }, grid: { height: '60%', top: '10%' },
            xAxis: { type: 'category', data: hours, splitArea: { show: true } },
            yAxis: { type: 'category', data: days, splitArea: { show: true } },
            visualMap: { min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center', bottom: '0%', inRange: { color: ['#f6efa6','#d88273','#bf444c'] } },
            series: [{ type: 'heatmap', label: { show: true }, itemStyle: { emphasis: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } } }]
        },
        options: [ {series:[{data:generateData()}]}, {series:[{data:generateData()}]}, {series:[{data:generateData()}]}, {series:[{data:generateData()}]} ]
    });

    // 核心统计
    const chartArea = echarts.init(document.getElementById('chart-area-traffic'));
    chartArea.setOption({ color:['#7B68EE'], tooltip:{trigger:'axis'}, xAxis:{data:['0:00','6:00','12:00','18:00','24:00']}, yAxis:{}, series:[{type:'line',smooth:true,areaStyle:{opacity:0.3},data:[120,132,901,934,290], emphasis:{focus:'series'}}] });
    
    const chartRing = echarts.init(document.getElementById('chart-ring-apps'));
    chartRing.setOption({ tooltip:{trigger:'item'}, color:['#4A90E2','#FF8C00','#2ECC71'], series:[{type:'pie',radius:['40%','70%'],data:[{value:1048,name:'视频娱乐'},{value:735,name:'社交'},{value:580,name:'学习工具'}], emphasis:{scale:true, scaleSize:10}}] });
    
    const chartLine = echarts.init(document.getElementById('chart-line-trend'));
    chartLine.setOption({ tooltip:{trigger:'axis'}, xAxis:{data:['9月','10月','11月','12月']}, yAxis:{}, series:[{type:'line',smooth:true,data:[150,230,224,218], emphasis:{focus:'series'}}] });

    // 轮播逻辑
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carousel-dots');
    let currentSlide = 0;
    slides.forEach((_, i) => {
        let d = document.createElement('div'); d.className = `dot ${i===0?'active':''}`; 
        d.innerHTML = '●'; d.onclick = () => switchSlide(i);
        dotsContainer.appendChild(d);
    });
    function switchSlide(n) {
        slides[currentSlide].classList.remove('active'); document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active'); document.querySelectorAll('.dot')[currentSlide].classList.add('active');
        if(currentSlide === 0) chartHero1.resize();
        if(currentSlide === 1) chartHero2 && chartHero2.resize();
    }
    setInterval(() => switchSlide(currentSlide+1), 8000);

    // 自评逻辑
    document.getElementById('self-eval-form').addEventListener('submit', (e) => {
        e.preventDefault();
        let score = [1,2,3,4,5].reduce((acc, id) => acc + parseInt(document.getElementById('q'+id).value), 0);
        let t = "", c = "", d = "", a = [];
        if(score >= 20) { t="深度沉迷"; c="level-deep"; d="严重影响生活"; }
        else if(score >= 12) { t="沉迷"; c="level-addict"; d="有明显依赖倾向"; }
        else if(score >= 6) { t="良好"; c="level-good"; d="较为平衡"; }
        else { t="健康"; c="level-healthy"; d="非常自律"; }
        
        a.push('<i class="fa-solid fa-clock"></i> 建议安装屏幕时间管理软件。');
        if(document.getElementById('q3').value == "5") a.push('<i class="fa-solid fa-bed"></i> 针对熬夜：设定睡眠闹钟，手机放卧室外。');
        if(document.getElementById('q4').value == "3") a.push('<i class="fa-solid fa-bullseye"></i> 针对分心：使用番茄工作法。');
        if(score < 6) a.push('<i class="fa-solid fa-share-nodes"></i> 分享您的自律经验给同学。');

        document.getElementById('persona-content').innerHTML = `<div class="result-level ${c}">${t} (得分: ${score})</div><p style="text-align:center;color:#666;margin-bottom:15px;">${d}</p><h4><i class="fa-solid fa-user-doctor"></i> 建议：</h4><ul class="advice-list">${a.map(i=>`<li>${i}</li>`).join('')}</ul>`;
        let m = document.getElementById('modal-persona'); m.style.display='flex'; setTimeout(()=>m.classList.add('show'),10);
    });

    // 案例库逻辑
    const cases = [
        {id:1,name:"张同学",tag:"游戏成瘾",desc:"昼夜颠倒",detail:"每日游戏9小时，多门挂科。"},
        {id:2,name:"李同学",tag:"资料囤积",desc:"只下不看",detail:"日均流量20GB，知识焦虑。"},
        {id:3,name:"王同学",tag:"短视频沉迷",desc:"碎片化",detail:"注意力涣散，卸载APP后好转。"},
        {id:4,name:"陈同学",tag:"社交依赖",desc:"点赞焦虑",detail:"过度在意网络反馈，现实社恐。"},
        {id:5,name:"赵同学",tag:"直播购物",desc:"入不敷出",detail:"透支生活费，需财商教育。"}
    ];
    document.getElementById('case-list-container').innerHTML = cases.map(c=>`<div class="case-card" onclick="openCase(${c.id})"><div style="font-weight:bold;color:var(--tech-blue);">${c.name}</div><div class="case-tag">${c.tag}</div><p style="font-size:0.9rem;color:#666;margin-top:5px;">${c.desc}</p></div>`).join('');
    window.openCase = function(id) {
        let c = cases.find(i=>i.id===id);
        if(c){ document.getElementById('case-content').innerHTML=`<h3>${c.name} - ${c.tag}</h3><p>${c.detail}</p>`; let m=document.getElementById('modal-case'); m.style.display='flex'; setTimeout(()=>m.classList.add('show'),10); }
    };

    // 杂项图表
    const chartHero2 = echarts.init(document.getElementById('hero-chart-2'));
    chartHero2.setOption({ radar:{indicator:[{name:'社交',max:100},{name:'娱乐',max:100},{name:'学习',max:100},{name:'购物',max:100},{name:'其他',max:100}]}, series:[{type:'radar',data:[[85,90,60,40,20]],areaStyle:{color:'rgba(74,144,226,0.6)'}}] });
    const chartSat = echarts.init(document.getElementById('chart-radar-satisfaction'));
    chartSat.setOption({ radar:{indicator:[{name:'网速',max:10},{name:'稳定',max:10},{name:'价格',max:10},{name:'覆盖',max:10},{name:'服务',max:10}],radius:'65%'}, series:[{type:'radar',data:[[8,9,7,8,9]],areaStyle:{color:'rgba(123,104,238,0.5)'}}] });

    window.addEventListener('resize', () => { [tideChart, expChart, chartHero1, chartHero2, chartArea, chartRing, chartLine, chartSat].forEach(c => c && c.resize()); });
});

// 简单的眨眼动画兼容
const styleSheet = document.createElement("style");
styleSheet.innerText = "@keyframes blink { 50% { opacity: 0.4; } }";
document.head.appendChild(styleSheet);