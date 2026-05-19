/**
 * 及时新闻 - 主交互脚本
 * 使用原生 JavaScript 实现所有交互功能
 * 简述：
 * 1.模拟数据均由prompt进行生成
 * 2.轮播图手写基础逻辑，通过prompt进行优化淡出淡入效果以及样式
 * 3.搜索功能借助prompt生成
 * 4.tab切换（分类筛选）手写实现，通过forEacth遍历改变选项卡状态，为选中元素增加active
 * 5.表单提交（意见反馈）提示部分手写实现，通过prompt进行优化
 */

// 新闻数据（模拟数据）借助prompt生成
const newsData = [
  {
    id: 1,
    title: '(内容为虚拟内容)2024年全球科技峰会在深圳成功举办，多项重磅成果发布',
    excerpt: '来自全球50多个国家的科技领袖齐聚深圳，共同探讨人工智能、量子计算等前沿技术的发展趋势。大会发布了多项突破性技术成果。',
    category: '科技',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
    date: '2024-12-05',
    views: 12580
  },
  {
    id: 2,
    title: '(内容为虚拟内容)国内新能源汽车销量再创新高',
    excerpt: '据最新统计数据显示，11月份国内新能源汽车销量突破100万辆，同比增长35%。',
    category: '财经',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=500&fit=crop',
    date: '2024-12-04',
    views: 8920
  },
  {
    id: 3,
    title: '(内容为虚拟内容)冬季流感高发期来临 专家提醒做好防护',
    excerpt: '随着气温持续下降，流感病毒活跃度增加，医学专家建议市民及时接种疫苗，注意个人卫生。',
    category: '健康',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=500&fit=crop',
    date: '2024-12-04',
    views: 6750
  },
  {
    id: 4,
    title: '(内容为虚拟内容)中国女排世界杯夺冠 创造历史佳绩',
    excerpt: '在刚刚结束的女排世界杯决赛中，中国女排以3:1战胜对手，成功卫冕冠军。',
    category: '体育',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',
    date: '2024-12-03',
    views: 15680
  },
  {
    id: 5,
    title: '(内容为虚拟内容)故宫博物院推出数字化展览新体验',
    excerpt: '故宫博物院利用VR、AR等技术，打造沉浸式数字展览，让观众足不出户即可领略故宫之美。',
    category: '文化',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=500&fit=crop',
    date: '2024-12-03',
    views: 9340
  },
  {
    id: 6,
    title: '(内容为虚拟内容)全国多地迎来今冬首场降雪',
    excerpt: '受冷空气影响，北方多省市迎来今冬首场降雪，部分地区积雪深度超过10厘米。',
    category: '社会',
    image: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&h=500&fit=crop',
    date: '2024-12-02',
    views: 7890
  },
  {
    id: 7,
    title: '(内容为虚拟内容)人工智能助力医疗诊断准确率提升',
    excerpt: 'AI辅助诊断系统在多家三甲医院投入使用，肿瘤早期筛查准确率提升至95%以上。',
    category: '科技',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=500&fit=crop',
    date: '2024-12-02',
    views: 11200
  },
  {
    id: 8,
    title: '(内容为虚拟内容)春运火车票预售正式开启',
    excerpt: '2025年春运火车票今日开始预售，铁路部门预计发送旅客将超过4亿人次。',
    category: '社会',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=500&fit=crop',
    date: '2024-12-01',
    views: 18900
  },
  {
    id: 9,
    title: '(内容为虚拟内容)国产大飞机C919商业运营满一周年',
    excerpt: 'C919商业运营一周年，累计执飞航班超过2000架次，安全运送旅客超过20万人次。',
    category: '财经',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop',
    date: '2024-12-01',
    views: 13450
  },
  {
    id: 10,
    title: '(内容为虚拟内容)北京冬奥场馆向公众开放 冰雪运动持续升温',
    excerpt: '冬奥场馆改造后正式向公众开放，市民可体验专业级冰雪设施，带动冰雪经济蓬勃发展。',
    category: '体育',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=500&fit=crop',
    date: '2024-11-30',
    views: 8760
  },
  {
    id: 11,
    title: '(内容为虚拟内容)量子计算机研发取得重大突破',
    excerpt: '我国科研团队成功研制出新一代量子计算机原型机，量子比特数达到全球领先水平。',
    category: '科技',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=500&fit=crop',
    date: '2024-11-30',
    views: 16890
  },
  {
    id: 12,
    title: '(内容为虚拟内容)全国房贷利率再次下调 购房成本持续降低',
    excerpt: '多家银行宣布下调房贷利率，首套房贷利率降至历史新低，有效减轻购房者负担。',
    category: '财经',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
    date: '2024-11-29',
    views: 21340
  },
  {
    id: 13,
    title: '(内容为虚拟内容)《黑神话：悟空》斩获年度最佳游戏大奖',
    excerpt: '国产3A游戏《黑神话：悟空》在TGA颁奖典礼上荣获年度最佳动作游戏，创造中国游戏历史。',
    category: '文化',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=500&fit=crop',
    date: '2024-11-29',
    views: 35680
  },
  {
    id: 14,
    title: '(内容为虚拟内容)高铁网络再扩容 多条新线路即将开通',
    excerpt: '年底前将有多条高铁新线路开通运营，进一步完善全国高铁网络布局。',
    category: '社会',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
    date: '2024-11-28',
    views: 14520
  },
  {
    id: 15,
    title: '(内容为虚拟内容)新型储能技术突破 电池续航大幅提升',
    excerpt: '固态电池技术取得重大进展，能量密度提升50%，有望在明年实现量产。',
    category: '科技',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    date: '2024-11-28',
    views: 12890
  },
  {
    id: 16,
    title: '(内容为虚拟内容)中医药文化走向世界 海外中医馆数量激增',
    excerpt: '中医药在全球范围内受到越来越多认可，海外中医诊所和中药店数量持续增长。',
    category: '健康',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=500&fit=crop',
    date: '2024-11-27',
    views: 7650
  },
  {
    id: 17,
    title: '(内容为虚拟内容)CBA常规赛激战正酣 多支球队争夺季后赛席位',
    excerpt: '本赛季CBA联赛竞争激烈，多支球队实力接近，季后赛席位争夺进入白热化阶段。',
    category: '体育',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop',
    date: '2024-11-27',
    views: 9870
  },
  {
    id: 18,
    title: '(内容为虚拟内容)跨境电商出口额创新高 中国制造畅销全球',
    excerpt: '今年跨境电商出口额同比增长超过30%，中国品牌在海外市场影响力持续扩大。',
    category: '财经',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    date: '2024-11-26',
    views: 11230
  },
  {
    id: 19,
    title: '(内容为虚拟内容)敦煌莫高窟数字化保护项目取得新进展',
    excerpt: '运用3D扫描和AI技术，敦煌研究院完成多个洞窟的高精度数字化采集工作。',
    category: '文化',
    image: 'https://images.unsplash.com/photo-1569839333583-7375336cde4b?w=800&h=500&fit=crop',
    date: '2024-11-26',
    views: 8540
  },
  {
    id: 20,
    title: '(内容为虚拟内容)全国空气质量持续改善 蓝天保卫战成效显著',
    excerpt: '生态环境部发布数据显示，全国空气质量优良天数比例达到历史最好水平。',
    category: '社会',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=500&fit=crop',
    date: '2024-11-25',
    views: 6780
  }
];

// 轮播图数据
const carouselData = [
  {
    id: 1,
    title: '2024年度科技盛典：探索未来无限可能',
    desc: '汇聚全球顶尖科技成果，展望人工智能、量子计算、生物科技等领域的最新突破与发展趋势。',
    tag: '热点',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=600&fit=crop'
  },
  {
    id: 2,
    title: '绿色发展：中国碳中和目标稳步推进',
    desc: '多项清洁能源项目落地实施，可再生能源装机容量持续增长，绿色低碳转型成效显著。',
    tag: '环保',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&h=600&fit=crop'
  },
  {
    id: 3,
    title: '文化传承：非遗技艺焕发新生机',
    desc: '传统非遗与现代创意融合，年轻一代匠人用创新方式传承千年技艺，让文化遗产活起来。',
    tag: '文化',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1400&h=600&fit=crop'
  },
  {
    id: 4,
    title: '数字经济：新质生产力引领高质量发展',
    desc: '数字技术与实体经济深度融合，智能制造、数字金融等新业态蓬勃发展，为经济增长注入新动能。',
    tag: '财经',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=600&fit=crop'
  }
];

// 热点新闻数据
const hotNewsData = [
  { id: 1, title: '重磅！2025年经济工作会议释放重要信号', views: 28500, date: '2小时前' },
  { id: 2, title: '多地出台购房新政 楼市迎来政策暖风', views: 21300, date: '3小时前' },
  { id: 3, title: '教育部发布最新通知 中小学课程将有重大调整', views: 18900, date: '4小时前' },
  { id: 4, title: '国际油价大幅波动 国内成品油价格或将调整', views: 15600, date: '5小时前' },
  { id: 5, title: '5G-A商用加速 通信行业迎来新机遇', views: 12800, date: '6小时前' },
  { id: 6, title: '新能源汽车出口量创新高 中国品牌全球竞争力提升', views: 11200, date: '7小时前' },
  { id: 7, title: '人工智能大模型迎来新突破 多家企业发布新品', views: 9800, date: '8小时前' },
  { id: 8, title: '冬季流感高发期 专家提醒做好防护', views: 8500, date: '9小时前' },
  { id: 9, title: '《黑神话：悟空》获TGA年度最佳动作游戏', views: 7600, date: '10小时前' },
  { id: 10, title: '央行宣布降准0.5个百分点 释放长期资金', views: 6900, date: '11小时前' },
  { id: 11, title: '北京地铁新线路开通 覆盖更多区域', views: 6200, date: '12小时前' },
  { id: 12, title: '国足世预赛关键战即将打响 全国球迷关注', views: 5800, date: '13小时前' }
];

// 快讯数据
const flashNewsData = [
  { time: '18:00', text: '商务部：将继续推动高水平对外开放' },
  { time: '17:30', text: '国务院新闻办发布会介绍经济运行情况' },
  { time: '16:45', text: '上证指数收盘3150点，涨幅1.2%' },
  { time: '16:00', text: '工信部：加快推进新型工业化建设' },
  { time: '15:20', text: '北京今日最高气温12度，空气质量优' },
  { time: '14:30', text: '国家统计局发布11月份经济数据' },
  { time: '14:10', text: '全国铁路单日发送旅客突破1200万人次' },
  { time: '13:05', text: '外交部回应热点问题，强调和平发展' },
  { time: '12:00', text: '教育部：推进义务教育优质均衡发展' },
  { time: '11:30', text: '新能源汽车11月销量突破100万辆' },
  { time: '10:45', text: '住建部：持续推进城市更新行动' },
  { time: '10:15', text: '多地发布人才新政，放宽落户条件' },
  { time: '09:30', text: '央行开展1500亿元逆回购操作' },
  { time: '09:00', text: '今日A股开盘，三大指数集体高开' },
  { time: '08:30', text: '国家气象局发布寒潮蓝色预警' },
  { time: '08:00', text: '早间新闻：国内外要闻速览' }
];


// DOM 元素获取
document.addEventListener('DOMContentLoaded', function () {
  // 初始化所有功能
  initNavbar();
  initCarousel();
  initCategoryFilter();
  initSearch();
  initExpandable();
  initFeedbackForm();

  // 根据页面类型渲染不同内容
  const currentPage = getCurrentPage();

  if (currentPage === 'index') {
    renderNewsList(newsData);
    renderHotNews();
    renderFlashNews();
    initLoadMore();
  } else if (currentPage === 'news') {
    renderNewsGrid(newsData);
    renderHotNews();
  } else if (currentPage === 'about') {
    // about页面不需要动态渲染新闻
  }
});


// 加载更多功能
function initLoadMore() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener('click', function () {
    // 添加加载状态
    this.classList.add('loading');

    // 模拟加载延迟
    setTimeout(() => {
      // 移除加载状态
      this.classList.remove('loading');

      // 显示提示（实际项目中这里会加载更多数据）
      showToast('已加载全部内容');

      // 隐藏按钮或禁用
      this.style.opacity = '0.5';
      this.style.pointerEvents = 'none';
      this.querySelector('span:not(.loading-spinner)').textContent = '没有更多了';
    }, 1000);
  });
}

// 显示提示消息
function showToast(message) {
  // 移除已有的 toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.75rem 1.5rem;
    background: var(--bg-dark);
    color: white;
    border-radius: 50px;
    font-size: 0.875rem;
    z-index: 9999;
    animation: toastIn 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// 获取当前页面类型
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('news.html')) return 'news';
  if (path.includes('about.html')) return 'about';
  return 'index';
}


// 导航栏功能
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navLinks = document.querySelectorAll('.navbar-link');

  // 滚动时添加阴影效果
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 移动端菜单切换
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      navbarMenu.classList.toggle('active');
    });
  }

  // 导航链接点击
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // 移除所有active类
      navLinks.forEach(l => l.classList.remove('active'));
      // 添加当前active类
      this.classList.add('active');
      // 关闭移动端菜单
      if (navbarMenu) {
        navbarMenu.classList.remove('active');
      }
    });
  });
}

// 轮播图功能 - 手写基础逻辑，借助AI增加淡出淡入效果和样式美化
let currentSlide = 0;
let carouselInterval;
let isAnimating = false;

function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  // 渲染轮播图
  renderCarousel();

  // 绑定按钮事件
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isAnimating) changeSlide(-1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isAnimating) changeSlide(1);
    });
  }

  // 自动轮播
  startAutoPlay();

  // 鼠标悬停暂停
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // 触摸滑动支持
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        changeSlide(1);
      } else {
        changeSlide(-1);
      }
    }
  }

  // 键盘支持
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
  });
}

function renderCarousel() {
  const carouselInner = document.querySelector('.carousel-inner');
  const indicators = document.querySelector('.carousel-indicators');

  if (!carouselInner) return;

  // 获取文章链接路径（根据当前页面位置判断）
  const articlePath = window.location.pathname.includes('/pages/') ? 'article.html' : 'pages/article.html';

  // 渲染轮播项 - 使用淡入淡出效果
  carouselInner.innerHTML = carouselData.map((item, index) => `
    <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}" data-article-id="${item.id}">
      <div class="carousel-slide-bg" style="background-image: url('${item.image}')"></div>
      <div class="carousel-overlay"></div>
      <div class="carousel-content">
        <span class="carousel-tag">${item.tag}</span>
        <h2 class="carousel-title">${item.title}</h2>
        <p class="carousel-desc">${item.desc}</p>
        <a href="${articlePath}?id=${item.id}" class="carousel-link">
          阅读全文
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  `).join('');

  // 渲染指示器 - 进度条样式
  if (indicators) {
    indicators.innerHTML = carouselData.map((item, index) => `
      <button class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="切换到第${index + 1}张">
        <span class="indicator-progress"></span>
        <span class="indicator-label">${item.tag}</span>
      </button>
    `).join('');

    // 指示器点击事件
    indicators.querySelectorAll('.carousel-indicator').forEach(indicator => {
      indicator.addEventListener('click', function () {
        if (!isAnimating) {
          goToSlide(parseInt(this.dataset.index));
        }
      });
    });
  }
}

function changeSlide(direction) {
  if (isAnimating) return;

  const slides = document.querySelectorAll('.carousel-slide');
  const total = slides.length;

  if (total === 0) return;

  isAnimating = true;

  // 移除当前活动状态
  slides[currentSlide].classList.remove('active');
  slides[currentSlide].classList.add('leaving');

  // 计算新索引
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = total - 1;
  if (currentSlide >= total) currentSlide = 0;

  // 添加新活动状态
  slides[currentSlide].classList.add('active', 'entering');

  // 更新指示器
  updateIndicators();

  // 动画结束后清理类名
  setTimeout(() => {
    slides.forEach(slide => {
      slide.classList.remove('leaving', 'entering');
    });
    isAnimating = false;
  }, 600);
}

function goToSlide(index) {
  if (isAnimating || index === currentSlide) return;

  const direction = index > currentSlide ? 1 : -1;
  const slides = document.querySelectorAll('.carousel-slide');

  isAnimating = true;

  slides[currentSlide].classList.remove('active');
  slides[currentSlide].classList.add('leaving');

  currentSlide = index;

  slides[currentSlide].classList.add('active', 'entering');
  updateIndicators();

  setTimeout(() => {
    slides.forEach(slide => {
      slide.classList.remove('leaving', 'entering');
    });
    isAnimating = false;
  }, 600);
}

function updateIndicators() {
  const indicators = document.querySelectorAll('.carousel-indicator');
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
}

function startAutoPlay() {
  stopAutoPlay();
  carouselInterval = setInterval(() => {
    if (!isAnimating) changeSlide(1);
  }, 5000);
}

function stopAutoPlay() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}


// 分类筛选功能
function initCategoryFilter() {
  const categoryTabs = document.querySelectorAll('.category-tab');
  const currentPage = getCurrentPage();

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // 更新active状态
      categoryTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // 获取分类
      const category = this.dataset.category;

      // 筛选新闻
      let filtered;
      if (category === 'all') {
        filtered = newsData;
      } else {
        filtered = newsData.filter(news => news.category === category);
      }

      // 根据页面类型渲染
      if (currentPage === 'index') {
        renderNewsList(filtered);
      } else {
        renderNewsGrid(filtered);
      }
    });
  });
}


// 搜索功能
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  if (!searchInput) return;

  // 搜索按钮点击
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }

  // 回车搜索
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // 实时搜索（防抖）
  let debounceTimer;
  searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, 300);
  });
}

function performSearch() {
  const searchInput = document.querySelector('.search-input');
  const keyword = searchInput.value.trim().toLowerCase();
  const currentPage = getCurrentPage();

  if (keyword === '') {
    if (currentPage === 'index') {
      renderNewsList(newsData);
    } else {
      renderNewsGrid(newsData);
    }
    // 重置分类标签
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === 'all');
    });
    return;
  }

  // 搜索标题和摘要
  const results = newsData.filter(news =>
    news.title.toLowerCase().includes(keyword) ||
    news.excerpt.toLowerCase().includes(keyword) ||
    news.category.toLowerCase().includes(keyword)
  );

  if (currentPage === 'index') {
    renderNewsList(results);
  } else {
    renderNewsGrid(results);
  }

  // 显示搜索结果提示
  showSearchResult(results.length, keyword);
}

function showSearchResult(count, keyword) {
  // 移除旧的提示
  const oldTip = document.querySelector('.search-tip');
  if (oldTip) oldTip.remove();

  // 添加新提示
  const newsList = document.getElementById('newsList') || document.getElementById('newsGrid');
  if (newsList) {
    const tip = document.createElement('div');
    tip.className = 'search-tip';
    tip.style.cssText = 'padding: 0.875rem 1rem; background: #e0f2fe; border-radius: 8px; color: #0369a1; margin-bottom: 1rem; font-size: 0.9rem;';
    tip.innerHTML = `搜索 "<strong>${keyword}</strong>" 找到 <strong>${count}</strong> 条结果`;
    newsList.parentNode.insertBefore(tip, newsList);

    // 3秒后自动消失
    setTimeout(() => tip.remove(), 3000);
  }
}

// 新闻渲染 - 列表式（首页三列布局）
function renderNewsList(news) {
  const newsList = document.getElementById('newsList');
  if (!newsList) return;

  if (news.length === 0) {
    newsList.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: #6b7280;">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">暂无相关新闻</p>
        <p style="font-size: 0.85rem;">试试其他关键词或分类</p>
      </div>
    `;
    return;
  }

  // 获取文章链接路径（根据当前页面位置判断）
  const articlePath = window.location.pathname.includes('/pages/') ? 'article.html' : 'pages/article.html';

  newsList.innerHTML = news.map((item, index) => `
    <a href="${articlePath}?id=${item.id}" class="news-list-item fade-in" style="animation-delay: ${index * 0.05}s">
      <div class="news-list-image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="news-list-content">
        <span class="news-list-tag">${item.category}</span>
        <h3 class="news-list-title">${item.title}</h3>
        <p class="news-list-excerpt">${item.excerpt}</p>
        <div class="news-list-meta">
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${item.date}
          </span>
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            ${formatViews(item.views)}阅读
          </span>
        </div>
      </div>
    </a>
  `).join('');
}

// 新闻渲染 - 卡片式（新闻中心页面）
function renderNewsGrid(news) {
  const newsGrid = document.getElementById('newsGrid');
  if (!newsGrid) return;

  if (news.length === 0) {
    newsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #6b7280;">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">暂无相关新闻</p>
        <p style="font-size: 0.85rem;">试试其他关键词或分类</p>
      </div>
    `;
    return;
  }

  // 获取文章链接路径（根据当前页面位置判断）
  const articlePath = window.location.pathname.includes('/pages/') ? 'article.html' : 'pages/article.html';

  newsGrid.innerHTML = news.map((item, index) => `
    <a href="${articlePath}?id=${item.id}" class="news-card fade-in" style="animation-delay: ${index * 0.05}s">
      <div class="news-card-image">
        <img src="${item.image}" alt="${item.title}">
        <span class="news-card-tag">${item.category}</span>
      </div>
      <div class="news-card-body">
        <h3 class="news-card-title">${item.title}</h3>
        <p class="news-card-excerpt">${item.excerpt}</p>
        <div class="news-card-meta">
          <span class="news-card-date">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${item.date}
          </span>
          <span class="news-card-views">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            ${formatViews(item.views)}
          </span>
        </div>
      </div>
    </a>
  `).join('');
}


// 热点新闻渲染
function renderHotNews() {
  const hotNewsList = document.getElementById('hotNewsList') || document.getElementById('hotArticles');
  if (!hotNewsList) return;

  const displayCount = getCurrentPage() === 'index' ? 8 : 5;
  const dataToShow = hotNewsData.slice(0, displayCount);

  hotNewsList.innerHTML = dataToShow.map((item, index) => `
    <div class="hot-news-item">
      <span class="hot-news-rank">${index + 1}</span>
      <div class="hot-news-item-content">
        <h4 class="hot-news-item-title">${item.title}</h4>
        <span class="hot-news-item-meta">${item.date} · ${formatViews(item.views)}阅读</span>
      </div>
    </div>
  `).join('');
}

// 快讯渲染
function renderFlashNews() {
  const flashNewsList = document.getElementById('flashNewsList');
  if (!flashNewsList) return;

  flashNewsList.innerHTML = flashNewsData.map(item => `
    <li class="flash-news-item">
      <span class="flash-news-time">${item.time}</span>
      <span class="flash-news-text">${item.text}</span>
    </li>
  `).join('');
}

// 展开/折叠功能
function initExpandable() {
  const expandables = document.querySelectorAll('.expandable');

  expandables.forEach(item => {
    const header = item.querySelector('.expandable-header');
    if (header) {
      header.addEventListener('click', function () {
        // 关闭其他展开项
        expandables.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
          }
        });
        // 切换当前项
        item.classList.toggle('active');
      });
    }
  });
}


// 反馈表单功能
function initFeedbackForm() {
  const form = document.querySelector('.feedback-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // 获取表单数据
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // 简单验证
    if (!name || !email || !message) {
      alert('请填写完整信息');
      return;
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('请输入有效的邮箱地址');
      return;
    }

    // 模拟提交（实际项目中这里会发送到服务器）
    console.log('表单提交:', { name, email, message });

    // 显示成功提示
    const successMsg = document.querySelector('.form-success');
    if (successMsg) {
      successMsg.classList.add('show');
      setTimeout(() => successMsg.classList.remove('show'), 3000);
    }

    // 重置表单
    form.reset();
  });
}


// 工具函数
function formatViews(views) {
  if (views >= 10000) {
    return (views / 10000).toFixed(1) + 'w';
  }
  return views.toString();
}

// 平滑滚动到指定元素
function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
