// ================== 1. 初始化及通用逻辑 ==================
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    initMap();
    initCharts();
    startNumberCounter();
    
    // 全局点击气球特效
    document.body.addEventListener('click', (e) => {
        // 排除交互元素防止干扰
        if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT' || e.target.closest('#hnu-map') || e.target.closest('.modal-content') || e.target.closest('.importance-preview-card')) return;
        createBalloon(e.pageX, e.pageY);
    });
    
    // 初始化通知数据
    initNotifications();
    
    // 绑定事件
    bindNotificationEvents();
    bindPhoneEvents();
});

function updateDate() {
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const now = new Date();
    const str = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${days[now.getDay()]}`;
    document.getElementById('current-date').innerText = str;
}

function createBalloon(x, y) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = (x - 15) + 'px';
    b.style.top = (y - 20) + 'px';
    const colors = ['#D32F2F', '#1976D2', '#FFC107', '#009688'];
    // 自己修改：把红色气球改成黄色，因为喜欢温暖的颜色
    const color = colors[Math.floor(Math.random() * colors.length)];
    b.style.background = color;
    b.style.setProperty('--color-red', color);
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 2000);
}

// ================== 2. 轮播图逻辑 ==================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

function changeSlide(index) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}
// AI生成：自动轮播功能
setInterval(() => { changeSlide(currentSlide + 1); }, 5000);

// ================== 3. 政策展开/收起 ==================
function togglePolicy() {
    const extra = document.getElementById('policy-extra');
    const btn = document.querySelector('.toggle-btn');
    if (extra.style.display === 'block') {
        extra.style.display = 'none';
        // 自己修改
        btn.innerHTML = '展开更多 <i class="fa-solid fa-angle-down"></i>';
    } else {
        extra.style.display = 'block';
        btn.innerHTML = '收起内容 <i class="fa-solid fa-angle-up"></i>';
    }
}

// ================== 4. 搜索功能逻辑 ==================
function handleEnter(e) {
    if(e.key === 'Enter') handleSearch();
}

function handleSearch() {
    const query = document.getElementById('global-search').value.trim().toLowerCase();
    if(!query) return;

    let found = false;
    
    // 遍历所有校区数据寻找匹配
    for (const campusKey in campusData) {
        const data = campusData[campusKey];
        
        // 匹配校区名
        if (
            (campusKey === 'erliban' && query.includes('二里半')) ||
            (campusKey === 'taohuaping' && (query.includes('桃花坪') || query.includes('树达'))) ||
            (campusKey === 'south' && (query.includes('南院') || query.includes('中南')))
        ) {
            document.getElementById('campus-select').value = campusKey;
            renderMapData(campusKey);
            document.getElementById('map-module').scrollIntoView({behavior: 'smooth'});
            found = true;
            break;
        }

        // 匹配具体点位
        const point = data.points.find(p => p.title.toLowerCase().includes(query));
        if (point) {
            document.getElementById('campus-select').value = campusKey;
            renderMapData(campusKey);
            // 延时定位，确保图层已渲染
            setTimeout(() => {
                window.focusMap(point.lat, point.lng, point.title);
            }, 500); 
            document.getElementById('map-module').scrollIntoView({behavior: 'smooth'});
            found = true;
            break;
        }
    }

    if (!found) {
        showToast('未找到相关场所');
    }
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'search-toast';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ================== 5. 建议栏逻辑 ==================
function submitComment() {
    const input = document.getElementById('comment-text');
    const text = input.value.trim();
    if(!text) {
        alert('请输入内容后再发表');
        return;
    }

    const list = document.getElementById('comment-list');
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes()}`;
    
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `
        <div class="comment-date">${timeStr}</div>
        <div class="comment-text">${text}</div>
    `;
    
    list.insertBefore(item, list.firstChild);
    input.value = '';
    alert('建议发表成功！');
}

// ================== 6. AED 重要性模态框逻辑 ==================
function openImportanceModal() {
    document.getElementById('importance-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

function closeImportanceModal() {
    document.getElementById('importance-modal').classList.remove('active');
    document.body.style.overflow = ''; // 恢复背景滚动
}

// 点击模态框背景关闭
document.getElementById('importance-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeImportanceModal();
    }
});

// ================== 7. Chart.js 图表初始化 ==================
function initCharts() {
    Chart.defaults.font.family = "'Microsoft YaHei', sans-serif";

    new Chart(document.getElementById('chart-distribution'), {
        type: 'bar',
        data: { labels: ['二里半', '桃花坪', '南院', '咸嘉湖'], datasets: [{ label: 'AED数量', data: [20, 12, 8, 5], backgroundColor: '#D32F2F' }] },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    new Chart(document.getElementById('chart-coverage'), {
        type: 'doughnut',
        data: { labels: ['教学楼', '宿舍', '体育馆', '食堂'], datasets: [{ data: [40, 30, 20, 10], backgroundColor: ['#1976D2', '#FFC107', '#D32F2F', '#009688'] }] },
        options: { responsive: true, plugins: { legend: { position: 'right', labels: { boxWidth: 10 } } } }
    });

    new Chart(document.getElementById('chart-growth'), {
        type: 'line',
        data: { labels: ['2019', '2020', '2021', '2022', '2023'], datasets: [{ label: '设备总数', data: [5, 12, 25, 35, 45], borderColor: '#1976D2', tension: 0.3, fill: true, backgroundColor: 'rgba(25, 118, 210, 0.1)' }] },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    new Chart(document.getElementById('chart-cognition'), {
        type: 'bar',
        data: { labels: ['会使用AED', '听说过AED', '完全不了解'], datasets: [{ label: '占比', data: [25, 65, 10], backgroundColor: ['#009688', '#FFC107', '#D32F2F'], indexAxis: 'y' }] },
        options: { indexAxis: 'y', responsive: true }
    });

    new Chart(document.getElementById('chart-barriers'), {
        type: 'pie',
        data: { labels: ['怕担责', '不会用', '怕造成伤害'], datasets: [{ data: [45, 35, 20], backgroundColor: ['#D32F2F', '#1976D2', '#FFC107'] }] }
    });
}

// ================== 8. Leaflet 地图逻辑 ==================
let map;
let markersLayer;

// 校区数据定义 (坐标已调整：桃花坪在树达学院附近，南院在中南大学附近)
const campusData = {
    "erliban": {
        center: [28.1888, 112.9463],
        points: [
            { lat: 28.1888, lng: 112.9463, title: "图书馆总馆 (1F大厅)", status: "normal", dist: "120m" },
            { lat: 28.1905, lng: 112.9430, title: "体育学院 (入口处)", status: "good", dist: "350m" },
            { lat: 28.1850, lng: 112.9480, title: "至善楼 (2F电梯口)", status: "normal", dist: "500m" },
            { lat: 28.1920, lng: 112.9450, title: "木兰路宿舍 (宿管处)", status: "warning", dist: "600m" },
            { lat: 28.1870, lng: 112.9420, title: "理学院 (一楼大厅)", status: "normal", dist: "200m" }
        ]
    },
    "taohuaping": {
        // 调整至树达学院附近
        center: [28.1580, 112.9380], 
        points: [
            { lat: 28.1580, lng: 112.9380, title: "树达学院综合楼 (大厅)", status: "normal", dist: "50m" },
            { lat: 28.1590, lng: 112.9390, title: "桃花坪艺术楼", status: "good", dist: "150m" },
            { lat: 28.1570, lng: 112.9370, title: "学生公寓 (门口)", status: "normal", dist: "300m" }
        ]
    },
    "south": {
        // 调整至中南大学附近区域
        center: [28.1680, 112.9320], 
        points: [
            { lat: 28.1680, lng: 112.9320, title: "美术学院 (展厅入口)", status: "normal", dist: "80m" },
            { lat: 28.1690, lng: 112.9330, title: "音乐学院 (琴房楼下)", status: "warning", dist: "200m" },
            { lat: 28.1670, lng: 112.9310, title: "南院食堂", status: "good", dist: "300m" }
        ]
    }
};

function initMap() {
    // 初始化地图，检查地图容器是否存在
    if(!document.getElementById('hnu-map')) return;

    map = L.map('hnu-map').setView(campusData.erliban.center, 15);
    
    // AI生成：重点修改：使用 高德地图 (GaoDe / AutoNavi) 的瓦片层，解决国内加载空白问题
    L.tileLayer('https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains: ["1", "2", "3", "4"],
        attribution: '&copy; 高德地图',
        maxZoom: 19
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);
    renderMapData('erliban');
    document.getElementById('campus-select').addEventListener('change', function(e) { renderMapData(e.target.value); });
}

function renderMapData(campusKey) {
    const data = campusData[campusKey];
    if(!data) return;
    map.flyTo(data.center, 15);
    markersLayer.clearLayers();
    const listContainer = document.getElementById('dynamic-loc-list');
    listContainer.innerHTML = '';
    const aedIcon = L.divIcon({ className: 'custom-aed-icon', html: '<div style="background:#D32F2F; color:white; width:30px; height:30px; border-radius:50%; display:flex; justify-content:center; align-items:center; border:2px solid white; box-shadow:0 2px 5px rgba(0,0,0,0.3); font-weight:bold; font-size:12px;">AED</div>', iconSize: [30, 30], iconAnchor: [15, 15] });

    data.points.forEach(p => {
        L.marker([p.lat, p.lng], { icon: aedIcon }).addTo(markersLayer).bindPopup(`<b>${p.title}</b><br>设备状态: ${getStatusText(p.status)}<br><button style="margin-top:5px; background:var(--color-blue); color:#fff; border:none; padding:2px 5px; cursor:pointer">导航</button>`);
        const card = document.createElement('div');
        card.className = 'location-card';
        card.innerHTML = `<div class="loc-name">${p.title}</div><div class="loc-status">${getStatusIcon(p.status)} ${getStatusTextFull(p.status)} | 距离 ${p.dist}</div>`;
        card.onclick = () => window.focusMap(p.lat, p.lng, p.title);
        listContainer.appendChild(card);
    });
}

function getStatusText(status) { if(status === 'warning') return '需维护'; return '正常'; }
function getStatusTextFull(status) { if(status === 'warning') return '需更换电极片'; return '状态良好'; }
function getStatusIcon(status) { if(status === 'warning') return '<i class="fa-solid fa-battery-half" style="color:orange"></i>'; return '<i class="fa-solid fa-battery-full"></i>'; }
window.focusMap = function(lat, lng, title) { map.flyTo([lat, lng], 17); L.popup().setLatLng([lat, lng]).setContent(`<b>${title}</b><br>选中位置`).openOn(map); }

// ================== 9. 数字跳动动画 ==================
function startNumberCounter() {
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const inc = target / 100;
        let count = 0;
        const updateCount = () => { count += inc; if(count < target) { counter.innerText = Math.ceil(count); requestAnimationFrame(updateCount); } else { counter.innerText = target; } };
        updateCount();
    });
}

// ================== 10. 表单处理 ==================
function handleSignup(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const name = document.getElementById('name').value;
    if(!document.getElementById('signup-form').checkValidity()){ alert("请完善填写信息"); return false; }
    btn.innerText = "提交中..."; btn.disabled = true;
    setTimeout(() => { alert(`报名成功！\n学员：${name}\n您的报名序号是：HNU-AED-20251027-045`); btn.innerText = "已报名"; document.getElementById('signup-form').reset(); }, 1500);
    return false;
}

// ================== 11. 底部滚动栏控制 ==================
function toggleTicker() {
    const item = document.querySelector('.ticker-item');
    const btn = document.querySelector('.ticker-btn');
    if (item.style.animationPlayState === 'paused') { item.style.animationPlayState = 'running'; btn.classList.remove('fa-play'); btn.classList.add('fa-pause'); } else { item.style.animationPlayState = 'paused'; btn.classList.remove('fa-pause'); btn.classList.add('fa-play'); }
}

// ================== 12. 通知系统逻辑 ==================
// 通知数据
const notifications = [
    {
        id: 1,
        title: "AED设备维护通知",
        content: "<p>根据设备维护计划，本周五（10月27日）将对二里半校区图书馆、体育学院的AED设备进行例行检查与维护。维护期间设备将暂停使用，请师生注意。</p><p>维护时间：10月27日 14:00-16:00</p><p>维护内容：电极片有效期检查、电池状态检测、设备功能测试</p>",
        time: "2025-10-26 09:15",
        unread: true
    },
    {
        id: 2,
        title: "急救培训开班通知",
        content: "<p>11月急救培训课程现已开放报名，本期培训将重点讲解AED使用与心肺复苏配合技巧。培训合格者将获得红十字会颁发的急救员证书。</p><p>培训时间：11月5日、12日、19日（共三期）</p><p>培训地点：校医院二楼培训室</p><p>报名方式：本平台培训报名栏目或校医院前台</p>",
        time: "2025-10-25 14:30",
        unread: true
    },
    {
        id: 3,
        title: "新增AED设备公告",
        content: "<p>为完善校园急救网络，学校在桃子湖创意园新增2台AED设备，分别位于综合楼大厅和艺术工坊入口处。至此，全校AED设备总数达到47台，覆盖率提升至94%。</p><p>新增设备位置：</p><ul><li>桃子湖创意园综合楼大厅</li><li>桃子湖创意园艺术工坊入口</li></ul>",
        time: "2025-10-24 10:45",
        unread: false
    },
    {
        id: 4,
        title: "AED使用成功案例",
        content: "<p>10月20日，体育学院一名学生在篮球训练时突发心脏骤停，现场师生使用体育馆AED设备成功实施急救，为后续医疗救治赢得宝贵时间。这是本学期第2例AED成功施救案例。</p><p>急救时间线：</p><ul><li>14:30 学生倒地</li><li>14:31 现场师生拨打88879120</li><li>14:32 AED设备到位</li><li>14:33 首次除颤</li><li>14:35 恢复自主呼吸</li><li>14:40 校医院急救车到达</li></ul>",
        time: "2025-10-22 16:20",
        unread: false
    },
    {
        id: 5,
        title: "冬季急救知识讲座",
        content: "<p>冬季是心脑血管疾病高发期，校医院将于11月8日举办冬季急救知识专题讲座，内容涵盖冬季运动安全、心脑血管疾病预防、低温症处理等。</p><p>讲座时间：11月8日 19:00-21:00</p><p>讲座地点：至善楼学术报告厅</p><p>主讲人：校医院王主任、长沙市急救中心专家</p>",
        time: "2025-10-21 11:10",
        unread: false
    },
    {
        id: 6,
        title: "AED设备位置优化调整",
        content: "<p>根据使用数据分析，学校对部分AED设备位置进行优化调整：</p><ul><li>木兰路宿舍AED设备从3楼移至1楼宿管处</li><li>理学院AED设备增加夜间照明标识</li><li>音乐学院AED设备位置重新标注于入口明显处</li></ul><p>调整工作已于10月20日完成，请师生知悉。</p>",
        time: "2025-10-20 08:45",
        unread: false
    },
    {
        id: 7,
        title: "急救志愿者招募",
        content: "<p>校园急救志愿者队伍现面向全校师生招募新成员。志愿者将接受专业急救培训，参与校园急救演练，协助AED设备巡检等工作。</p><p>招募要求：</p><ul><li>湖师大在校师生</li><li>有责任心，乐于助人</li><li>每月可参与至少一次志愿活动</li></ul><p>报名截止：11月15日</p>",
        time: "2025-10-19 15:30",
        unread: false
    },
    {
        id: 8,
        title: "AED设备使用数据统计",
        content: "<p>2025年第三季度AED设备使用数据统计：</p><ul><li>设备总使用次数：8次</li><li>成功施救案例：2例</li><li>培训使用次数：47次</li><li>设备自检通过率：99.8%</li><li>平均响应时间：2分48秒</li></ul><p>详细报告已上传至平台数据中心，可供查阅。</p>",
        time: "2025-10-18 13:20",
        unread: false
    },
    {
        id: 9,
        title: "AED设备操作视频更新",
        content: "<p>平台AED操作指导视频已更新，新增多角度演示、常见问题解答等内容。新版视频更直观、更易学，欢迎师生观看学习。</p><p>视频内容包括：</p><ul><li>AED设备快速定位</li><li>电极片粘贴技巧</li><li>与心肺复苏配合要点</li><li>儿童模式使用方法</li><li>设备维护自检流程</li></ul>",
        time: "2025-10-17 09:55",
        unread: false
    },
    {
        id: 10,
        title: "校园急救演练预告",
        content: "<p>学校将于11月消防宣传月期间组织大规模校园急救演练，模拟多种突发情况下的急救响应。演练将检验AED设备响应、师生急救技能、各部门协调能力。</p><p>演练时间：11月15日 14:30-16:30</p><p>演练区域：二里半校区主教学楼周边</p><p>参与人员：校医院、保卫处、各学院急救志愿者</p>",
        time: "2025-10-16 16:40",
        unread: false
    },
    {
        id: 11,
        title: "AED设备电池更换通知",
        content: "<p>根据设备维护计划，将对以下校区AED设备电池进行批次更换：</p><ul><li>二里半校区：10月30日</li><li>桃花坪校区：10月31日</li><li>南院校区：11月1日</li></ul><p>更换期间设备将暂停使用约30分钟，请师生注意。更换后的电池有效期至2026年10月。</p>",
        time: "2025-10-15 10:25",
        unread: false
    },
    {
        id: 12,
        title: "急救知识竞赛报名",
        content: "<p>湖南师范大学第一届校园急救知识竞赛开始报名！竞赛内容包括AED使用、心肺复苏、创伤救护、急症处理等。获奖者将获得证书及奖品。</p><p>竞赛时间：11月25日 14:00-17:00</p><p>竞赛地点：国际学术报告厅</p><p>报名方式：各学院团委或平台在线报名</p><p>报名截止：11月20日</p>",
        time: "2025-10-14 14:15",
        unread: false
    },
    {
        id: 13,
        title: "AED设备巡检系统上线",
        content: "<p>校园AED设备智能巡检系统正式上线，系统可实时监控设备状态、记录使用情况、自动提醒维护。师生可通过平台查看各设备实时状态。</p><p>系统功能：</p><ul><li>设备状态实时监控</li><li>使用记录自动生成</li><li>维护提醒自动推送</li><li>数据分析报告</li></ul>",
        time: "2025-10-13 11:30",
        unread: false
    },
    {
        id: 14,
        title: "冬季AED设备防冻措施",
        content: "<p>随着冬季来临，为保障AED设备正常使用，已对室外及半室外AED设备采取防冻措施：</p><ul><li>设备箱增加保温层</li><li>电池低温保护启动</li><li>定期检查电极片状态</li><li>增加巡检频次</li></ul><p>如发现设备异常，请及时联系校医院或保卫处。</p>",
        time: "2025-10-12 09:45",
        unread: false
    },
    {
        id: 15,
        title: "急救培训反馈收集",
        content: "<p>为提升急救培训质量，现收集往期学员培训反馈。您的意见将帮助我们改进课程内容、教学方式，让急救培训更实用、更有效。</p><p>反馈方式：</p><ul><li>平台在线问卷</li><li>校医院意见箱</li><li>电子邮件：aed_feedback@hunnu.edu.cn</li></ul><p>反馈截止：10月31日</p>",
        time: "2025-10-11 15:20",
        unread: false
    },
    {
        id: 16,
        title: "AED设备捐赠感谢",
        content: "<p>感谢迈瑞医疗向我校捐赠5台最新型号AED设备，这批设备将部署于咸嘉湖校区和医学院。至此，校企合作捐赠AED设备总数达到12台。</p><p>捐赠设备特点：</p><ul><li>中文语音指导更清晰</li><li>儿童模式一键切换</li><li>续航时间更长</li><li>智能自检功能</li></ul>",
        time: "2025-10-10 13:10",
        unread: false
    },
    {
        id: 17,
        title: "急救技能认证通知",
        content: "<p>通过急救培训并考核合格的师生，可申请红十字会急救员认证。认证有效期为三年，到期需重新考核。</p><p>认证申请流程：</p><ul><li>完成全部培训课程</li><li>通过理论和实操考核</li><li>提交身份信息及照片</li><li>缴纳认证工本费（学生优惠）</li></ul><p>证书发放时间：考核后30个工作日内</p>",
        time: "2025-10-09 10:35",
        unread: false
    },
    {
        id: 18,
        title: "AED设备使用宣传周",
        content: "<p>11月第一周为AED设备使用宣传周，期间将举办系列活动：</p><ul><li>AED设备开放体验日</li><li>急救技能挑战赛</li><li>急救知识有奖问答</li><li>成功施救案例分享会</li></ul><p>活动详情请关注平台通知，欢迎师生积极参与。</p>",
        time: "2025-10-08 14:50",
        unread: false
    },
    {
        id: 19,
        title: "急救联络员培训",
        content: "<p>各学院急救联络员培训将于10月28日举行，培训内容包括：</p><ul><li>AED设备管理与维护</li><li>急救事件报告流程</li><li>急救资源协调</li><li>应急通信使用</li></ul><p>培训时间：10月28日 9:00-12:00</p><p>培训地点：校医院三楼会议室</p><p>参加人员：各学院指定急救联络员</p>",
        time: "2025-10-07 11:25",
        unread: false
    },
    {
        id: 20,
        title: "平台功能优化通知",
        content: "<p>感谢师生对AED急救资源查询平台的支持！根据使用反馈，我们对平台进行了以下优化：</p><ul><li>地图加载速度提升</li><li>设备查询精度提高</li><li>培训报名流程简化</li><li>通知系统新增分类</li><li>移动端适配优化</li></ul><p>欢迎继续提出宝贵意见！</p>",
        time: "2025-10-06 16:15",
        unread: false
    }
];

function initNotifications() {
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = '';
    
    // 按时间倒序排序
    const sortedNotifications = [...notifications].sort((a, b) => 
        new Date(b.time) - new Date(a.time)
    );
    
    sortedNotifications.forEach(notification => {
        const item = document.createElement('div');
        item.className = `notification-item ${notification.unread ? 'unread' : ''}`;
        item.dataset.id = notification.id;
        item.innerHTML = `
            <div class="notification-title">${notification.title}</div>
            <div class="notification-time">${notification.time}</div>
        `;
        notificationList.appendChild(item);
    });
}

function bindNotificationEvents() {
    const notificationBell = document.getElementById('notification-bell');
    const notificationSidebar = document.getElementById('notification-sidebar');
    const notificationClose = document.getElementById('notification-close');
    const notificationList = document.getElementById('notification-list');
    const notificationModal = document.getElementById('notification-modal');
    const notificationModalClose = document.getElementById('notification-modal-close');
    const notificationModalCloseBtn = document.getElementById('notification-modal-close-btn');
    
    // 点击铃铛打开侧边栏
    notificationBell.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationSidebar.classList.toggle('active');
    });
    
    // 点击关闭按钮关闭侧边栏
    notificationClose.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationSidebar.classList.remove('active');
    });
    
    // 点击侧边栏外部关闭
    document.addEventListener('click', (e) => {
        if (!notificationSidebar.contains(e.target) && !notificationBell.contains(e.target)) {
            notificationSidebar.classList.remove('active');
        }
    });
    
    // 点击通知项打开详情弹窗
    notificationList.addEventListener('click', (e) => {
        const notificationItem = e.target.closest('.notification-item');
        if (!notificationItem) return;
        
        const notificationId = parseInt(notificationItem.dataset.id);
        const notification = notifications.find(n => n.id === notificationId);
        
        if (notification) {
            // 标记为已读
            notification.unread = false;
            notificationItem.classList.remove('unread');
            
            // 更新红点状态
            updateNotificationDot();
            
            // 显示详情弹窗
            showNotificationDetail(notification);
        }
    });
    
    // 关闭通知详情弹窗
    notificationModalClose.addEventListener('click', () => {
        notificationModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    notificationModalCloseBtn.addEventListener('click', () => {
        notificationModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // 点击弹窗外部关闭
    notificationModal.addEventListener('click', (e) => {
        if (e.target === notificationModal) {
            notificationModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function showNotificationDetail(notification) {
    const notificationModal = document.getElementById('notification-modal');
    const titleElement = document.getElementById('notification-modal-title');
    const timeElement = document.getElementById('notification-modal-time');
    const textElement = document.getElementById('notification-modal-text');
    
    titleElement.textContent = notification.title;
    timeElement.textContent = notification.time;
    textElement.innerHTML = notification.content;
    
    notificationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateNotificationDot() {
    const dot = document.querySelector('.notification .dot');
    const hasUnread = notifications.some(notification => notification.unread);
    
    if (hasUnread) {
        dot.style.display = 'block';
    } else {
        dot.style.display = 'none';
    }
}

// ================== 13. 电话弹窗逻辑 ==================
function bindPhoneEvents() {
    const emergencyPhone = document.getElementById('emergency-phone');
    const phoneModal = document.getElementById('phone-modal');
    const phoneCloseBtn = document.getElementById('phone-close-btn');
    const callNowBtn = document.getElementById('call-now-btn');
    const copyNumberBtn = document.getElementById('copy-number-btn');
    
    // 点击电话号码打开弹窗
    emergencyPhone.addEventListener('click', (e) => {
        e.preventDefault();
        phoneModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // 关闭弹窗
    phoneCloseBtn.addEventListener('click', () => {
        phoneModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // 点击弹窗外部关闭
    phoneModal.addEventListener('click', (e) => {
        if (e.target === phoneModal) {
            phoneModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // 立即拨打按钮
    callNowBtn.addEventListener('click', () => {
        // 在真实环境中，这会触发电话拨打
        // 这里我们模拟拨打效果
        callNowBtn.innerHTML = '<i class="fa-solid fa-phone"></i> 拨打中...';
        callNowBtn.disabled = true;
        
        setTimeout(() => {
            alert('正在拨打校园急救热线 88879120...');
            callNowBtn.innerHTML = '<i class="fa-solid fa-phone"></i> 立即拨打';
            callNowBtn.disabled = false;
            phoneModal.classList.remove('active');
            document.body.style.overflow = '';
        }, 1000);
    });
    
    // 复制号码按钮
    copyNumberBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('88879120')
            .then(() => {
                // 临时改变按钮文本
                const originalText = copyNumberBtn.innerHTML;
                copyNumberBtn.innerHTML = '<i class="fa-solid fa-check"></i> 已复制';
                
                setTimeout(() => {
                    copyNumberBtn.innerHTML = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('复制失败:', err);
                alert('复制失败，请手动复制号码：88879120');
            });
    });
}