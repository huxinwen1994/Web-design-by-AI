// ============================
// 1. 全局函数定义
// ============================

// 点击导航跳转
function scrollToSection(id, element) {
    const targetSection = document.getElementById(id);
    const headerOffset = 80;
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

// 建议版块手风琴交互 (Accordion)
function toggleSuggestion(header) {
    const content = header.nextElementSibling;
    
    // 切换标题激活状态 (旋转箭头 + 变色)
    header.classList.toggle('active');
    
    // 切换内容高度 (过渡动画)
    if (content.style.maxHeight) {
        // 收起
        content.style.maxHeight = null;
        content.style.opacity = '0';
    } else {
        // 展开 - 设置一个足够大的 max-height
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = '1';
    }
}

// ============================
// 2. DOM加载完成后执行的主逻辑
// ============================
document.addEventListener('DOMContentLoaded', function() {
    // ============================
    // 1. 导航交互 (点击跳转 + ScrollSpy + 汉堡菜单)
    // ============================
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const hamburger = document.getElementById('hamburger');

    // 点击汉堡菜单
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 点击导航跳转 - 事件绑定
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            // 从data-target属性获取目标section的ID
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                
                // 移动端点击后收起菜单
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                }

                if (targetId) {
                    scrollToSection(targetId, this);
                }
            });
        });
    }

    // ScrollSpy: 监听页面滚动，自动切换激活态
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // 当滚动到版块 1/3 处时触发激活
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // 根据 data-target 属性匹配 ID
            if (link.getAttribute('data-target') === current) {
                link.classList.add('active');
            }
        });
    });

    // ============================
    // 2. 建议版块手风琴交互 (Accordion) - 事件绑定
    // ============================
    const suggestionHeaders = document.querySelectorAll('.suggestion-header');
    if (suggestionHeaders.length > 0) {
        suggestionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                toggleSuggestion(this);
            });
        });
    }

    // ============================
    // 3. 页面进入动画 (Intersection Observer)
    // ============================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // ============================
    // 4. ECharts 图表配置
    // ============================
    const colors = ['#1E88E5', '#FF9800', '#81C784', '#E57373'];

    // --- 饼图 ---
    const chartPieElement = document.getElementById('chart-pie');
    if (chartPieElement) {
        const chartPie = echarts.init(chartPieElement);
        chartPie.setOption({
            color: colors,
            tooltip: { trigger: 'item' },
            legend: { bottom: '0%', left: 'center' },
            series: [{
                name: '早餐类型',
                type: 'pie',
                radius: ['40%', '70%'],
                itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
                label: { show: false, position: 'center' },
                emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
                data: [
                    { value: 42, name: '包子粥类' },
                    { value: 25, name: '西式快餐' },
                    { value: 18, name: '便利店饭团' },
                    { value: 15, name: '自制/面包' }
                ]
            }]
        });
    }

    // --- 柱状图 ---
    const chartBarElement = document.getElementById('chart-bar');
    if (chartBarElement) {
        const chartBar = echarts.init(chartBarElement);
        chartBar.setOption({
            color: ['#81C784', '#1E88E5', '#FF9800'],
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { top: '0%' },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: { type: 'category', data: ['大一', '大二', '大三', '大四'] },
            yAxis: { type: 'value', max: 100 },
            series: [
                { name: '5元以内', type: 'bar', stack: 'total', data: [30, 22, 18, 25] },
                { name: '5-10元', type: 'bar', stack: 'total', data: [55, 60, 58, 52] },
                { name: '10元以上', type: 'bar', stack: 'total', data: [15, 18, 24, 23] }
            ]
        });
    }

    // --- 折线图 ---
    const chartLineElement = document.getElementById('chart-line');
    if (chartLineElement) {
        const chartLine = echarts.init(chartLineElement);
        chartLine.setOption({
            tooltip: { trigger: 'axis' },
            legend: { top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: { type: 'category', boundaryGap: false, data: ['大一', '大二', '大三', '大四'] },
            yAxis: { type: 'value' },
            series: [
                { name: '外带率', type: 'line', data: [45, 58, 72, 68], itemStyle: { color: '#FF9800' }, smooth: true },
                { name: '规律吃早餐率', type: 'line', data: [35, 30, 22, 25], itemStyle: { color: '#1E88E5' }, smooth: true }
            ]
        });
    }

    // 响应式调整
    window.addEventListener('resize', () => {
        // 重新调整图表大小
        const chartPie = echarts.getInstanceByDom(document.getElementById('chart-pie'));
        const chartBar = echarts.getInstanceByDom(document.getElementById('chart-bar'));
        const chartLine = echarts.getInstanceByDom(document.getElementById('chart-line'));
        
        if (chartPie) chartPie.resize();
        if (chartBar) chartBar.resize();
        if (chartLine) chartLine.resize();
        
        const tableWrapper = document.querySelector('.mobile-table-wrapper');
        if (tableWrapper) {
            if (window.innerWidth <= 768) {
                tableWrapper.style.display = 'block';
            } else {
                tableWrapper.style.display = 'none';
            }
        }
    });
    
    // 初始化表格显示状态
    const tableWrapper = document.querySelector('.mobile-table-wrapper');
    if (tableWrapper && window.innerWidth <= 768) {
        tableWrapper.style.display = 'block';
    }

    // ============================
    // 5. 表单提交
    // ============================
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('🎉 提交成功！感谢您对校园早餐提出的宝贵建议。');
            e.target.reset();
        });
    }
});