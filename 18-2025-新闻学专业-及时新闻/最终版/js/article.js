/**
 * 及时新闻 - 文章阅读页脚本
 * 功能：根据URL的id参数渲染不同的文章内容
 */

// 文章详情数据（模拟数据，与main.js中的newsData对应）
const articleDetails = {
  1: {
    id: 1,
    title: '2024年全球科技峰会在深圳成功举办，多项重磅成果发布',
    category: '科技',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
    date: '2024-12-05',
    views: 12580,
    likes: 328,
    tags: ['科技峰会', '人工智能', '量子计算', '深圳'],
    content: `
      <p>2024年12月5日，备受瞩目的全球科技峰会在深圳国际会展中心隆重开幕。来自全球50多个国家和地区的科技领袖、企业家、学者齐聚一堂，共同探讨人工智能、量子计算、生物科技等前沿技术的发展趋势与应用前景。</p>
      
      <h2>峰会亮点</h2>
      <p>本次峰会以"科技创新，共创未来"为主题，为期三天，设置了主论坛和多个分论坛，涵盖人工智能、量子计算、新能源、生物医药等多个热门领域。</p>
      
      <blockquote>科技创新是推动人类社会进步的核心动力，我们需要携手合作，共同应对全球性挑战。——峰会组委会主席</blockquote>
      
      <h2>重磅成果发布</h2>
      <p>在峰会上，多家科技企业发布了最新的研究成果和产品：</p>
      <ul>
        <li><strong>量子计算突破</strong>：某科技公司发布了新一代量子处理器，量子比特数达到1000+，创下新纪录</li>
        <li><strong>AI大模型升级</strong>：多家企业展示了新一代大语言模型，在推理能力和多模态理解方面取得显著进步</li>
        <li><strong>新能源技术</strong>：固态电池技术取得重大突破，能量密度提升50%</li>
        <li><strong>生物医药创新</strong>：基因编辑技术在遗传病治疗领域展现出巨大潜力</li>
      </ul>
      
      <h2>专家观点</h2>
      <p>与会专家普遍认为，2025年将是科技创新的关键之年。人工智能将进一步渗透到各行各业，量子计算有望在特定领域实现商业化应用，新能源技术将加速推动绿色转型。</p>
      
      <h3>人工智能发展趋势</h3>
      <p>多位AI领域的专家指出，大模型技术正在从"能力展示"向"实际应用"转变。未来一年，我们将看到更多AI应用落地，特别是在医疗诊断、科学研究、教育等领域。</p>
      
      <h3>量子计算前景</h3>
      <p>量子计算专家表示，虽然通用量子计算机还需要时间，但在特定问题上，量子计算已经展现出超越经典计算机的能力。预计在药物研发、材料科学等领域将率先实现应用。</p>
      
      <h2>展望未来</h2>
      <p>本次峰会的成功举办，不仅展示了全球科技创新的最新成果，也为各国科技合作搭建了重要平台。与会者纷纷表示，期待明年再次相聚，共同见证科技进步带来的美好变化。</p>
    `,
    comments: [
      { id: 1, author: '科技爱好者', time: '2小时前', text: '这次峰会的成果真的很令人振奋，期待这些技术早日落地应用！', likes: 45 },
      { id: 2, author: '深圳市民', time: '3小时前', text: '作为深圳人，很自豪能够举办这样的国际盛会。', likes: 32 },
      { id: 3, author: '研究员小王', time: '5小时前', text: '量子计算的进展确实很快，我们实验室也在这个方向努力。', likes: 28 }
    ]
  },
  2: {
    id: 2,
    title: '国内新能源汽车销量再创新高',
    category: '财经',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=600&fit=crop',
    date: '2024-12-04',
    views: 8920,
    likes: 215,
    tags: ['新能源汽车', '电动车', '汽车销量', '绿色出行'],
    content: `
      <p>据中国汽车工业协会最新统计数据显示，2024年11月份，国内新能源汽车销量突破100万辆大关，同比增长35%，再次刷新月度销量纪录。这一成绩标志着中国新能源汽车市场持续保持强劲增长势头。</p>
      
      <h2>销量数据分析</h2>
      <p>从细分市场来看，纯电动汽车销量达到72万辆，占比72%；插电式混合动力汽车销量28万辆，占比28%。其中，自主品牌表现尤为亮眼，市场份额持续扩大。</p>
      
      <h2>主要品牌表现</h2>
      <ul>
        <li><strong>比亚迪</strong>：月销量超过30万辆，继续领跑市场</li>
        <li><strong>特斯拉中国</strong>：交付量达到8.2万辆，环比增长15%</li>
        <li><strong>理想汽车</strong>：首次突破5万辆月销量</li>
        <li><strong>蔚来汽车</strong>：销量稳步增长，高端市场地位稳固</li>
      </ul>
      
      <h2>市场趋势</h2>
      <p>业内专家分析，新能源汽车销量持续增长的主要原因包括：</p>
      <ol>
        <li>技术进步带来的续航里程提升和充电速度加快</li>
        <li>充电基础设施不断完善</li>
        <li>政策支持力度持续加大</li>
        <li>消费者环保意识增强</li>
        <li>新能源汽车使用成本优势明显</li>
      </ol>
      
      <blockquote>预计2024年全年新能源汽车销量将突破1000万辆，渗透率有望达到40%。——中汽协专家</blockquote>
      
      <h2>未来展望</h2>
      <p>随着固态电池等新技术的逐步成熟，以及智能驾驶功能的不断完善，新能源汽车市场有望继续保持高速增长。同时，中国新能源汽车出口也在快速增长，正在成为全球汽车产业的重要力量。</p>
    `,
    comments: [
      { id: 1, author: '车主老张', time: '1小时前', text: '刚提了一辆新能源车，确实省钱又环保！', likes: 56 },
      { id: 2, author: '汽车分析师', time: '4小时前', text: '国产新能源车的竞争力越来越强了。', likes: 41 }
    ]
  },
  3: {
    id: 3,
    title: '冬季流感高发期来临 专家提醒做好防护',
    category: '健康',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=600&fit=crop',
    date: '2024-12-04',
    views: 6750,
    likes: 189,
    tags: ['流感', '冬季健康', '疫苗接种', '防护措施'],
    content: `
      <p>随着气温持续下降，冬季流感高发期已经来临。国家疾控中心发布提醒，近期流感病毒活跃度明显增加，建议市民做好个人防护，及时接种流感疫苗。</p>
      
      <h2>流感形势分析</h2>
      <p>根据监测数据显示，近两周流感样病例就诊比例持续上升，主要流行毒株为甲型H3N2和乙型Victoria系。专家预计，流感活动将在未来几周内达到高峰。</p>
      
      <h2>高危人群</h2>
      <p>以下人群感染流感后容易发展为重症，需要特别注意防护：</p>
      <ul>
        <li>65岁以上老年人</li>
        <li>5岁以下儿童，尤其是2岁以下婴幼儿</li>
        <li>孕妇</li>
        <li>患有慢性疾病的人群</li>
        <li>免疫功能低下者</li>
      </ul>
      
      <h2>预防措施</h2>
      <p>专家建议采取以下措施预防流感：</p>
      <ol>
        <li><strong>接种疫苗</strong>：这是预防流感最有效的方法，建议在流感季节前完成接种</li>
        <li><strong>勤洗手</strong>：使用肥皂和流动水洗手，或使用含酒精的手消毒剂</li>
        <li><strong>戴口罩</strong>：在人员密集场所佩戴口罩</li>
        <li><strong>保持通风</strong>：室内定期开窗通风</li>
        <li><strong>避免接触</strong>：尽量避免与流感患者密切接触</li>
      </ol>
      
      <blockquote>流感疫苗接种后约2周产生保护性抗体，建议尽早接种。——疾控专家</blockquote>
      
      <h2>出现症状怎么办</h2>
      <p>如果出现发热、咳嗽、咽痛、头痛、肌肉酸痛等流感样症状，应及时就医，并注意居家休息，避免带病上班上学，以免传染他人。</p>
    `,
    comments: [
      { id: 1, author: '宝妈小李', time: '30分钟前', text: '已经带孩子去打疫苗了，希望这个冬天平安度过。', likes: 67 },
      { id: 2, author: '医生小陈', time: '2小时前', text: '提醒大家，出现症状要及时就医，不要拖延。', likes: 89 }
    ]
  },
  4: {
    id: 4,
    title: '中国女排世界杯夺冠 创造历史佳绩',
    category: '体育',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop',
    date: '2024-12-03',
    views: 15680,
    likes: 892,
    tags: ['女排', '世界杯', '冠军', '体育'],
    content: `
      <p>北京时间12月3日，在刚刚结束的女排世界杯决赛中，中国女排以3:1战胜强劲对手，成功卫冕冠军，创造了历史佳绩。这是中国女排第六次获得世界杯冠军，再次展现了"女排精神"的强大力量。</p>
      
      <h2>比赛回顾</h2>
      <p>决赛中，中国女排展现出了极高的竞技水平和顽强的拼搏精神。首局比赛双方争夺激烈，中国队以25:23险胜；第二局对手调整战术，以25:21扳回一局；关键的第三、四局，中国队发挥出色，分别以25:19和25:22拿下，最终以3:1的总比分获胜。</p>
      
      <h2>关键球员表现</h2>
      <ul>
        <li><strong>主攻手</strong>：全场砍下28分，进攻成功率超过50%</li>
        <li><strong>二传手</strong>：组织进攻有条不紊，多次送出精妙传球</li>
        <li><strong>自由人</strong>：防守稳健，多次化解对方强攻</li>
        <li><strong>副攻手</strong>：拦网出色，贡献多个关键拦网得分</li>
      </ul>
      
      <h2>教练点评</h2>
      <blockquote>这场胜利属于全体队员，她们在场上展现出了真正的女排精神——团结协作、顽强拼搏、永不放弃。——主教练赛后采访</blockquote>
      
      <h2>历史意义</h2>
      <p>这次夺冠具有重要的历史意义：</p>
      <ol>
        <li>中国女排第六次获得世界杯冠军</li>
        <li>成功实现卫冕，展现了队伍的稳定性</li>
        <li>年轻队员得到锻炼，为未来奠定基础</li>
        <li>进一步弘扬了女排精神</li>
      </ol>
      
      <h2>球迷反响</h2>
      <p>比赛结束后，社交媒体上掀起了庆祝热潮。"中国女排"话题迅速登上热搜榜首，无数球迷发文祝贺，表达对女排姑娘们的敬意和祝福。</p>
    `,
    comments: [
      { id: 1, author: '排球迷老王', time: '1小时前', text: '太激动了！女排精神永远是我们的骄傲！', likes: 234 },
      { id: 2, author: '体育记者', time: '2小时前', text: '这届女排的配合越来越默契了，未来可期！', likes: 156 },
      { id: 3, author: '学生小明', time: '3小时前', text: '看完比赛热血沸腾，要向女排学习！', likes: 98 }
    ]
  },
  5: {
    id: 5,
    title: '故宫博物院推出数字化展览新体验',
    category: '文化',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1200&h=600&fit=crop',
    date: '2024-12-03',
    views: 9340,
    likes: 267,
    tags: ['故宫', '数字化', 'VR', '文化遗产'],
    content: `
      <p>故宫博物院近日宣布推出全新的数字化展览体验项目，利用VR、AR等先进技术，打造沉浸式数字展览，让观众足不出户即可领略故宫之美，感受中华传统文化的魅力。</p>
      
      <h2>项目亮点</h2>
      <p>此次推出的数字化展览包含多个创新体验：</p>
      <ul>
        <li><strong>VR故宫漫游</strong>：戴上VR设备，即可"走进"故宫各大殿宇，360度欣赏建筑细节</li>
        <li><strong>AR文物互动</strong>：通过手机AR功能，让文物"活"起来，了解其背后的故事</li>
        <li><strong>数字修复展示</strong>：展示文物修复过程，感受匠人精神</li>
        <li><strong>虚拟策展</strong>：观众可以自己"策划"展览，选择喜欢的文物组合展示</li>
      </ul>
      
      <h2>技术创新</h2>
      <p>故宫博物院与多家科技公司合作，采用了多项前沿技术：</p>
      <ol>
        <li>8K超高清影像采集，还原文物真实细节</li>
        <li>三维扫描建模，精确复制建筑结构</li>
        <li>AI智能讲解，个性化推荐参观路线</li>
        <li>云端渲染技术，保证流畅体验</li>
      </ol>
      
      <blockquote>数字技术让文化遗产焕发新生，让更多人能够接触和了解中华优秀传统文化。——故宫博物院院长</blockquote>
      
      <h2>体验方式</h2>
      <p>观众可以通过以下方式体验数字化展览：</p>
      <ul>
        <li>故宫博物院官方APP</li>
        <li>故宫官方网站在线展厅</li>
        <li>线下体验中心（北京、上海、深圳）</li>
        <li>合作VR体验馆</li>
      </ul>
      
      <h2>未来规划</h2>
      <p>故宫博物院表示，将继续推进数字化建设，计划在未来三年内完成全部重要文物的数字化采集，并推出更多创新体验项目，让故宫文化走向世界。</p>
    `,
    comments: [
      { id: 1, author: '文化爱好者', time: '45分钟前', text: '太棒了！终于可以在家"逛"故宫了！', likes: 78 },
      { id: 2, author: '设计师小张', time: '3小时前', text: '科技与文化的完美结合，点赞！', likes: 56 }
    ]
  }
};

// 默认文章数据（当找不到对应id时使用）
const defaultArticle = {
  id: 0,
  title: '文章不存在',
  category: '提示',
  image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1200&h=600&fit=crop',
  date: '--',
  views: 0,
  likes: 0,
  tags: [],
  content: '<p>抱歉，您访问的文章不存在或已被删除。请返回首页浏览其他内容。</p>',
  comments: []
};

// 页面初始化
document.addEventListener('DOMContentLoaded', function () {
  // 获取URL参数中的文章id
  const articleId = getArticleIdFromUrl();

  // 加载文章内容
  loadArticle(articleId);

  // 初始化交互功能
  initArticleInteractions();

  // 初始化回到顶部按钮
  initBackToTop();

  // 初始化评论功能
  initCommentSystem();
});

/**
 * 从URL获取文章ID
 */
function getArticleIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  return id ? parseInt(id) : 1; // 默认显示第一篇文章
}

/**
 * 加载文章内容
 */
function loadArticle(articleId) {
  // 获取文章数据
  const article = articleDetails[articleId] || defaultArticle;

  // 更新页面标题
  document.title = `${article.title} - 及时新闻`;

  // 渲染文章内容
  renderArticle(article);

  // 渲染相关推荐
  renderRelatedArticles(article.category, articleId);

  // 渲染上一篇/下一篇导航
  renderArticleNav(articleId);

  // 生成目录
  generateTOC();
}

/**
 * 渲染文章内容
 */
function renderArticle(article) {
  // 分类标签
  const categoryEl = document.getElementById('articleCategory');
  const tagEl = document.getElementById('articleTag');
  if (categoryEl) categoryEl.textContent = article.category;
  if (tagEl) tagEl.textContent = article.category;

  // 标题
  const titleEl = document.getElementById('articleTitle');
  if (titleEl) titleEl.textContent = article.title;

  // 日期
  const dateEl = document.getElementById('articleDate');
  if (dateEl) dateEl.textContent = article.date;

  // 阅读量
  const viewsEl = document.getElementById('articleViews');
  if (viewsEl) viewsEl.textContent = formatViews(article.views);

  // 封面图
  const imageEl = document.getElementById('articleImage');
  if (imageEl) {
    imageEl.src = article.image;
    imageEl.alt = article.title;
  }

  // 正文内容
  const contentEl = document.getElementById('articleContent');
  if (contentEl) contentEl.innerHTML = article.content;

  // 标签
  const tagsEl = document.getElementById('articleTags');
  if (tagsEl && article.tags.length > 0) {
    tagsEl.innerHTML = article.tags.map(tag =>
      `<a href="#" class="tag-item">${tag}</a>`
    ).join('');
  }

  // 点赞数
  const likeCountEl = document.getElementById('likeCount');
  if (likeCountEl) likeCountEl.textContent = article.likes;

  // 评论
  renderComments(article.comments);
}

/**
 * 渲染评论列表
 */
function renderComments(comments) {
  const commentListEl = document.getElementById('commentList');
  const commentCountEl = document.getElementById('commentCount');

  if (commentCountEl) {
    commentCountEl.textContent = comments.length;
  }

  if (commentListEl) {
    if (comments.length === 0) {
      commentListEl.innerHTML = '<div class="no-comments">暂无评论，快来发表你的看法吧~</div>';
      return;
    }

    commentListEl.innerHTML = comments.map(comment => `
      <div class="comment-item">
        <div class="comment-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-author">${comment.author}</span>
            <span class="comment-time">${comment.time}</span>
          </div>
          <p class="comment-text">${comment.text}</p>
          <div class="comment-actions">
            <button class="comment-action-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              ${comment.likes}
            </button>
            <button class="comment-action-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              回复
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

/**
 * 渲染相关推荐
 */
function renderRelatedArticles(category, currentId) {
  const relatedListEl = document.getElementById('relatedList');
  if (!relatedListEl) return;

  // 从所有文章中筛选同分类的文章（排除当前文章）
  const relatedArticles = Object.values(articleDetails)
    .filter(article => article.id !== currentId)
    .slice(0, 3);

  relatedListEl.innerHTML = relatedArticles.map(article => `
    <a href="article.html?id=${article.id}" class="related-item">
      <img src="${article.image.replace('w=1200', 'w=200').replace('h=600', 'h=140')}" alt="${article.title}">
      <div class="related-info">
        <h4>${article.title}</h4>
        <span>${formatViews(article.views)}阅读</span>
      </div>
    </a>
  `).join('');
}

/**
 * 渲染上一篇/下一篇导航
 */
function renderArticleNav(currentId) {
  const prevEl = document.getElementById('prevArticle');
  const nextEl = document.getElementById('nextArticle');

  const articleIds = Object.keys(articleDetails).map(Number).sort((a, b) => a - b);
  const currentIndex = articleIds.indexOf(currentId);

  // 上一篇
  if (prevEl) {
    if (currentIndex > 0) {
      const prevId = articleIds[currentIndex - 1];
      const prevArticle = articleDetails[prevId];
      prevEl.href = `article.html?id=${prevId}`;
      prevEl.querySelector('.nav-title').textContent = prevArticle.title;
    } else {
      prevEl.style.opacity = '0.5';
      prevEl.style.pointerEvents = 'none';
    }
  }

  // 下一篇
  if (nextEl) {
    if (currentIndex < articleIds.length - 1) {
      const nextId = articleIds[currentIndex + 1];
      const nextArticle = articleDetails[nextId];
      nextEl.href = `article.html?id=${nextId}`;
      nextEl.querySelector('.nav-title').textContent = nextArticle.title;
    } else {
      nextEl.style.opacity = '0.5';
      nextEl.style.pointerEvents = 'none';
    }
  }
}

/**
 * 生成文章目录
 */
function generateTOC() {
  const contentEl = document.getElementById('articleContent');
  const tocNavEl = document.getElementById('tocNav');

  if (!contentEl || !tocNavEl) return;

  const headings = contentEl.querySelectorAll('h2, h3');

  if (headings.length === 0) {
    tocNavEl.innerHTML = '<p style="font-size: 0.8rem; color: var(--text-light);">暂无目录</p>';
    return;
  }

  let tocHtml = '';
  headings.forEach((heading, index) => {
    const id = `heading-${index}`;
    heading.id = id;
    const level = heading.tagName.toLowerCase();
    const levelClass = level === 'h3' ? 'level-3' : '';
    tocHtml += `<a href="#${id}" class="toc-item ${levelClass}">${heading.textContent}</a>`;
  });

  tocNavEl.innerHTML = tocHtml;

  // 目录点击平滑滚动
  tocNavEl.querySelectorAll('.toc-item').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const offset = 100; // 导航栏高度
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // 滚动时高亮当前目录项
  window.addEventListener('scroll', function () {
    const scrollPos = window.pageYOffset + 120;

    headings.forEach((heading, index) => {
      const tocItem = tocNavEl.querySelectorAll('.toc-item')[index];
      if (!tocItem) return;

      const headingTop = heading.offsetTop;
      const nextHeading = headings[index + 1];
      const nextTop = nextHeading ? nextHeading.offsetTop : Infinity;

      if (scrollPos >= headingTop && scrollPos < nextTop) {
        tocNavEl.querySelectorAll('.toc-item').forEach(item => item.classList.remove('active'));
        tocItem.classList.add('active');
      }
    });
  });
}

/**
 * 初始化文章交互功能
 */
function initArticleInteractions() {
  // 点赞按钮
  const likeBtn = document.getElementById('likeBtn');
  if (likeBtn) {
    likeBtn.addEventListener('click', function () {
      this.classList.toggle('active');
      const countEl = this.querySelector('.action-count');
      if (countEl) {
        let count = parseInt(countEl.textContent);
        countEl.textContent = this.classList.contains('active') ? count + 1 : count - 1;
      }
      showToast(this.classList.contains('active') ? '点赞成功' : '已取消点赞');
    });
  }

  // 收藏按钮
  const collectBtn = document.getElementById('collectBtn');
  if (collectBtn) {
    collectBtn.addEventListener('click', function () {
      this.classList.toggle('active');
      showToast(this.classList.contains('active') ? '收藏成功' : '已取消收藏');
    });
  }

  // 分享按钮
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      // 复制链接到剪贴板
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        showToast('链接已复制到剪贴板');
      }).catch(() => {
        showToast('分享功能暂不可用');
      });
    });
  }
}

/**
 * 初始化回到顶部按钮
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  // 滚动显示/隐藏
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // 点击回到顶部
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * 初始化评论系统
 */
function initCommentSystem() {
  const commentInput = document.getElementById('commentInput');
  const charCountEl = document.getElementById('charCount');
  const submitBtn = document.getElementById('submitComment');

  // 字数统计
  if (commentInput && charCountEl) {
    commentInput.addEventListener('input', function () {
      const length = this.value.length;
      charCountEl.textContent = length;

      if (length > 500) {
        charCountEl.style.color = 'var(--error)';
      } else {
        charCountEl.style.color = '';
      }
    });
  }

  // 提交评论
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      const content = commentInput.value.trim();

      if (!content) {
        showToast('请输入评论内容');
        return;
      }

      if (content.length > 500) {
        showToast('评论内容不能超过500字');
        return;
      }

      // 模拟提交评论
      showToast('评论发表成功');
      commentInput.value = '';
      charCountEl.textContent = '0';

      // 添加新评论到列表
      addNewComment(content);
    });
  }
}

/**
 * 添加新评论
 */
function addNewComment(content) {
  const commentListEl = document.getElementById('commentList');
  const commentCountEl = document.getElementById('commentCount');

  // 移除"暂无评论"提示
  const noComments = commentListEl.querySelector('.no-comments');
  if (noComments) noComments.remove();

  // 创建新评论元素
  const newComment = document.createElement('div');
  newComment.className = 'comment-item';
  newComment.innerHTML = `
    <div class="comment-avatar">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>
    <div class="comment-body">
      <div class="comment-header">
        <span class="comment-author">游客用户</span>
        <span class="comment-time">刚刚</span>
      </div>
      <p class="comment-text">${escapeHtml(content)}</p>
      <div class="comment-actions">
        <button class="comment-action-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          0
        </button>
        <button class="comment-action-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          回复
        </button>
      </div>
    </div>
  `;

  // 插入到列表开头
  commentListEl.insertBefore(newComment, commentListEl.firstChild);

  // 更新评论数
  if (commentCountEl) {
    commentCountEl.textContent = parseInt(commentCountEl.textContent) + 1;
  }
}

/**
 * HTML转义
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 格式化阅读量
 */
function formatViews(views) {
  if (views >= 10000) {
    return (views / 10000).toFixed(1) + 'w';
  }
  return views.toString();
}

/**
 * 显示提示消息（如果main.js中没有定义则使用此函数）
 */
if (typeof showToast !== 'function') {
  function showToast(message) {
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
}
