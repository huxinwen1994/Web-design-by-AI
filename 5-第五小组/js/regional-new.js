// ===== 美食集市交互系统 =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== 1. 数据定义 =====
    
    // 菜系对话数据
    const cuisineDialogues = {
        sichuan: {
            owner: "张师傅（川菜大师）",
            portrait: "https://image-assets.mihuashi.com/permanent/180020%7C-2021/11/11/14/FgSveDctWqqGGAMw-6pPM-keOjQG.jpg!artwork.detail?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
            messages: [
                "欢迎来到辣子坊！我们川菜讲究'一菜一格，百菜百味'，不只是麻辣那么简单。",
                "你看这锅底，用的是上等花椒和郫县豆瓣酱，香、辣、麻、鲜、烫，五味俱全。",
                "我们的麻婆豆腐从清朝传到现在，每一口都能尝到三百年的历史沉淀。"
            ],
            detail: {
                title: "川菜文化介绍",
                image: "https://img95.699pic.com/photo/60125/6001.jpg_wh860.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                content: `
                    <div class="detail-section">
                        <h4>🌶️ 历史渊源</h4>
                        <p>川菜起源于古代的巴国和蜀国，有着三千多年的历史。秦汉时期，川菜已具雏形，到了唐宋时期，川菜进入了繁荣时期。明清时期，随着辣椒的传入，川菜形成了现代麻辣风味的特色。</p>
                    </div>
                    <div class="detail-section">
                        <h4>👨‍🍳 风味特点</h4>
                        <ul>
                            <li><strong>麻辣味</strong>: 花椒的麻与辣椒的辣完美结合</li>
                            <li><strong>鱼香味</strong>: 咸甜酸辣兼具，姜葱蒜香浓郁</li>
                            <li><strong>怪味</strong>: 集麻辣甜咸酸鲜香于一体</li>
                            <li><strong>家常味</strong>: 咸鲜微辣，浓郁醇厚</li>
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h4>🍲 代表菜品</h4>
                        <div class="dish-grid">
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20230527/33857552_181405320109_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="麻婆豆腐">
                                <span>麻婆豆腐</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://imgs.699pic.com/images/600/170/086.jpg!detail.v1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="回锅肉">
                                <span>回锅肉</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://materials.cdn.bcebos.com/images/37102137/1a525af5909129849119b821a824b9ba.jpeg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="水煮鱼">
                                <span>水煮鱼</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h4>📍 流行地区</h4>
                        <p>四川、重庆、贵州、云南等西南地区，现已传播至世界各地。</p>
                    </div>
                `
            }
        },
        guangdong: {
            owner: "陈师傅（粤菜名厨）",
            portrait: "https://pic.nximg.cn/file/20170727/10673188_144330922000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
            messages: [
                "食在广东，味在鲜味居。我们讲究'不时不食'，只选用最新鲜的时令食材。",
                "你看这蒸笼里的虾饺，皮要薄如蝉翼，馅要鲜嫩多汁，蒸的时间要精确到秒。",
                "我们的老火靓汤，一煲就是八小时，火候的掌控是粤菜的灵魂所在。"
            ],
            detail: {
                title: "粤菜文化介绍",
                image: "https://img95.699pic.com/photo/50108/2675.jpg_wh300.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                content: `
                    <div class="detail-section">
                        <h4>🐟 历史渊源</h4>
                        <p>粤菜有着悠久的历史，起源于秦汉时期。唐宋时期，粤菜开始形成自己的特色。明清时期，随着广州成为对外贸易的重要港口，粤菜吸收了外来烹饪技艺，形成了独特的风格。</p>
                    </div>
                    <div class="detail-section">
                        <h4>👨‍🍳 风味特点</h4>
                        <ul>
                            <li><strong>清淡鲜美</strong>: 注重食材原味，少用重调味</li>
                            <li><strong>时令为先</strong>: 按照季节选择最鲜美的食材</li>
                            <li><strong>烹饪精细</strong>: 刀工讲究，火候精准</li>
                            <li><strong>兼容并蓄</strong>: 吸收各地烹饪精华</li>
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h4>🍤 代表菜品</h4>
                        <div class="dish-grid">
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20180426/26875844_110928587000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="白切鸡">
                                <span>白切鸡</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20230327/21319742_200932896129_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="烧鹅">
                                <span>烧鹅</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20240826/33247794_232649928128_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="清蒸石斑">
                                <span>清蒸石斑</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h4>📍 流行地区</h4>
                        <p>广东、香港、澳门、广西及海外华人社区，素有"食在广州"的美誉。</p>
                    </div>
                `
            }
        },
        shandong: {
            owner: "王师傅（鲁菜传人）",
            portrait: "https://pic.nximg.cn/file/20170727/10673188_144229271000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
            messages: [
                "宫廷御膳，讲究的是气派和火候。我们鲁菜是八大菜系之首，宫廷菜的源头。",
                "你看这葱烧海参，葱要炸到金黄酥脆，海参要烧到软糯入味，汤汁要收得恰到好处。",
                "我们传承的是孔府菜的技艺，讲究'食不厌精，脍不厌细'，每一道菜都是艺术品。"
            ],
            detail: {
                title: "鲁菜文化介绍",
                image: "https://n.sinaimg.cn/sinacn/w1600h1066/20180311/e615-fxpwyhw9274404.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                content: `
                    <div class="detail-section">
                        <h4>🏯 历史渊源</h4>
                        <p>鲁菜历史悠久，源远流长，是中国饮食文化的重要组成部分。早在春秋战国时期，齐鲁地区的饮食文化就已相当发达，是宫廷菜的主要来源。</p>
                    </div>
                    <div class="detail-section">
                        <h4>👨‍🍳 风味特点</h4>
                        <ul>
                            <li><strong>咸鲜为主</strong>: 以盐提鲜，以汤壮鲜</li>
                            <li><strong>讲究火候</strong>: 爆、炒、烧、炸技艺精湛</li>
                            <li><strong>善用葱姜</strong>: 葱、姜、蒜提味增香</li>
                            <li><strong>刀工精细</strong>: 切配整齐，讲究造型</li>
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h4>🍖 代表菜品</h4>
                        <div class="dish-grid">
                            <div class="dish-item">
                                <img src="https://imgs.699pic.com/images/402/674/557.jpg!list1x.v2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="葱烧海参">
                                <span>葱烧海参</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://pic4.zhimg.com/v2-6a139379b290ff96db700cbb9bd4cddb_r.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="糖醋鲤鱼">
                                <span>糖醋鲤鱼</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20201113/8536011_151714141081_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="九转大肠">
                                <span>九转大肠</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h4>📍 流行地区</h4>
                        <p>山东、北京、天津、河北及东北地区，对北方菜系影响深远。</p>
                    </div>
                `
            }
        },
        jiangsu: {
            owner: "李师傅（苏菜名家）",
            portrait: "https://pic.nximg.cn/file/20170725/10673188_152746712000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
            messages: [
                "江南水乡，吃的就是那份精致和雅致。我们苏菜讲究'刀在苏帮'，刀工是第一位的。",
                "你看这松鼠鳜鱼，要切108刀，刀刀相连却不能断，炸出来形如松鼠，浇汁后吱吱作响。",
                "我们的菜品不仅好吃，更是艺术品，追求的是色、香、味、形、器的完美统一。"
            ],
            detail: {
                title: "苏菜文化介绍",
                image: "https://n.sinaimg.cn/sinakd10121/94/w2000h1294/20200728/99fe-iwxpesx7391168.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                content: `
                    <div class="detail-section">
                        <h4>🎋 历史渊源</h4>
                        <p>苏菜起源于春秋时期，发展于隋唐，兴盛于明清。江苏地处长江下游，鱼米之乡，物产丰富，为苏菜的发展提供了得天独厚的条件。</p>
                    </div>
                    <div class="detail-section">
                        <h4>👨‍🍳 风味特点</h4>
                        <ul>
                            <li><strong>清淡鲜甜</strong>: 咸甜适中，追求食材本味</li>
                            <li><strong>刀工精湛</strong>: 有'刀在苏帮'的美誉</li>
                            <li><strong>讲究时令</strong>: 春有刀鱼，夏有鮰鱼，秋有蟹鸭</li>
                            <li><strong>烹饪细腻</strong>: 炖、焖、煨、焐技法见长</li>
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h4>🦀 代表菜品</h4>
                        <div class="dish-grid">
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20221110/14773619_145627643109_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="松鼠鳜鱼">
                                <span>松鼠鳜鱼</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20230529/3349398_090937453102_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="狮子头">
                                <span>狮子头</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://n.sinaimg.cn/sinakd10110/372/w750h422/20230720/7650-70700f5fb0701c5161975de00d2db894.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="盐水鸭">
                                <span>盐水鸭</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h4>📍 流行地区</h4>
                        <p>江苏、上海、浙江北部，体现了江南文人雅士的生活情趣。</p>
                    </div>
                `
            }
        },
        hunan: {
            owner: "刘师傅（湘菜高手）",
            portrait: "https://pic.nximg.cn/file/20170725/10673188_152745339000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
            messages: [
                "湘菜的辣和川菜不同，我们讲究'一辣二咸三鲜'，层次丰富，回味悠长。",
                "你看这剁椒鱼头，辣椒是自己种的，剁的时候要听到'咔咔'的声音，这样才香。",
                "我们湖南人不怕辣，辣不怕，怕不辣！这辣能祛湿驱寒，是生活的必需品。"
            ],
            detail: {
                title: "湘菜文化介绍",
                image: "https://pic.nximg.cn/file/20201230/29412817_151725008083_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                content: `
                    <div class="detail-section">
                        <h4>🔥 历史渊源</h4>
                        <p>湘菜有着两千多年的历史，早在汉代就已形成独特的烹饪风格。湖南地处长江中游，物产丰富，为湘菜的发展提供了良好的物质基础。</p>
                    </div>
                    <div class="detail-section">
                        <h4>👨‍🍳 风味特点</h4>
                        <ul>
                            <li><strong>香辣为主</strong>: 辣椒的香气浓郁，辣味适中</li>
                            <li><strong>注重酸辣</strong>: 酸味与辣味结合，开胃解腻</li>
                            <li><strong>油重色浓</strong>: 菜肴色泽红亮，油润诱人</li>
                            <li><strong>讲究入味</strong>: 原料充分吸收调味</li>
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h4>🐟 代表菜品</h4>
                        <div class="dish-grid">
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20201230/29412817_151725008083_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="剁椒鱼头">
                                <span>剁椒鱼头</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://materials.cdn.bcebos.com/images/69370566/2a0f0dcdc9cb9d9a74bc87e4d005a44b.jpeg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="毛氏红烧肉">
                                <span>毛氏红烧肉</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="腊味合蒸">
                                <span>腊味合蒸</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h4>📍 流行地区</h4>
                        <p>湖南、湖北部分地区，体现了湖南人'敢为人先'的精神特质。</p>
                    </div>
                `
            }
        },
        zhejiang: {
            owner: "赵师傅（浙菜名家）",
            portrait: "https://pic.nximg.cn/file/20170723/10673188_164659938000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
            messages: [
                "西湖美景，浙菜佳肴。我们讲究'南料北烹'，用北方的技法处理南方的食材。",
                "你看这西湖醋鱼，要用西湖的草鱼，饿养三天去土腥，火候要恰到好处。",
                "我们的菜品很多都有文人典故，东坡肉、叫化鸡，吃的不仅是味道，更是文化。"
            ],
            detail: {
                title: "浙菜文化介绍",
                image: "https://pic.nximg.cn/file/20150905/21573978_132623341000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                content: `
                    <div class="detail-section">
                        <h4>🏞️ 历史渊源</h4>
                        <p>浙菜有着悠久的历史，可以追溯到新石器时代。南宋时期，杭州成为都城，浙菜得到了空前的发展，形成了独特的烹饪体系。</p>
                    </div>
                    <div class="detail-section">
                        <h4>👨‍🍳 风味特点</h4>
                        <ul>
                            <li><strong>清淡鲜嫩</strong>: 注重原味，讲究时鲜</li>
                            <li><strong>制作精细</strong>: 刀工精细，火候得当</li>
                            <li><strong>南料北烹</strong>: 南方食材用北方技法</li>
                            <li><strong>文人菜系</strong>: 许多菜品与历史典故相关</li>
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h4>🍖 代表菜品</h4>
                        <div class="dish-grid">
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20150905/21573978_132623341000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="西湖醋鱼">
                                <span>西湖醋鱼</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20241230/10999350_091222132108_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="东坡肉">
                                <span>东坡肉</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="龙井虾仁">
                                <span>龙井虾仁</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h4>📍 流行地区</h4>
                        <p>浙江、上海、江苏南部，体现了江南文人雅士的生活情趣。</p>
                    </div>
                `
            }
        },
        fujian: {
            owner: "郑师傅（闽菜大师）",
            portrait: "https://pic.nximg.cn/file/20170727/10673188_144328614000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
            messages: [
                "依山傍海，闽菜的味道来自山海之间。我们以烹制山珍海味而著称。",
                "你看这佛跳墙，要用海参、鲍鱼、鱼翅等十八种珍贵食材，在酒坛里煨上三天三夜。",
                "我们讲究'一汤十变'，汤菜是闽菜的精华，好的汤能让人回味无穷。"
            ],
            detail: {
                title: "闽菜文化介绍",
                image: "https://imgs.699pic.com/images/402/675/066.jpg!detail.v1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                content: `
                    <div class="detail-section">
                        <h4>⛰️ 历史渊源</h4>
                        <p>闽菜起源于福建闽侯县，发展于唐宋，兴盛于明清。福建地处东南沿海，海产丰富，山林资源充足，为闽菜的发展提供了丰富的食材。</p>
                    </div>
                    <div class="detail-section">
                        <h4>👨‍🍳 风味特点</h4>
                        <ul>
                            <li><strong>清鲜和醇</strong>: 口味清淡，荤香不腻</li>
                            <li><strong>汤菜见长</strong>: 有'一汤十变'之说</li>
                            <li><strong>善用调料</strong>: 红糟、虾油等特色调料</li>
                            <li><strong>山珍海味</strong>: 擅长烹制海鲜和山货</li>
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h4>🦞 代表菜品</h4>
                        <div class="dish-grid">
                            <div class="dish-item">
                                <img src="https://imgs.699pic.com/images/402/675/066.jpg!detail.v1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="佛跳墙">
                                <span>佛跳墙</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20170407/10372225_180718930039_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="荔枝肉">
                                <span>荔枝肉</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20200904/31287421_212045790000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="土笋冻">
                                <span>土笋冻</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h4>📍 流行地区</h4>
                        <p>福建、台湾、广东潮汕地区及海外侨乡，体现了福建'海纳百川'的地域特色。</p>
                    </div>
                `
            }
        },
        anhui: {
            owner: "吴师傅（徽菜传人）",
            portrait: "https://pic.nximg.cn/file/20170725/10673188_152746712000_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
            messages: [
                "徽州山水，孕育出独特的徽菜。我们讲究'三重'：重油、重色、重火功。",
                "你看这臭鳜鱼，闻起来臭，吃起来香，经过特殊腌制，肉质鲜嫩无比。",
                "我们的菜品很多都有食疗功效，讲究'以食养生'，这是徽菜的精髓。"
            ],
            detail: {
                title: "徽菜文化介绍",
                image: "https://pic.nximg.cn/file/20221025/10384715_184326712107_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                content: `
                    <div class="detail-section">
                        <h4>🏔️ 历史渊源</h4>
                        <p>徽菜起源于南宋时期的古徽州（今安徽黄山一带），兴盛于明清。徽商遍及全国，将徽菜带到了各地，促进了徽菜的发展。</p>
                    </div>
                    <div class="detail-section">
                        <h4>👨‍🍳 风味特点</h4>
                        <ul>
                            <li><strong>咸鲜浓醇</strong>: 味道浓郁，回味悠长</li>
                            <li><strong>重油重色</strong>: 菜肴油润，色泽红亮</li>
                            <li><strong>讲究火功</strong>: 烧、炖、蒸、焖技法见长</li>
                            <li><strong>注重食疗</strong>: 讲究'以食养生'</li>
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h4>🐟 代表菜品</h4>
                        <div class="dish-grid">
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20221025/10384715_184326712107_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="臭鳜鱼">
                                <span>臭鳜鱼</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://pic.nximg.cn/file/20201115/8536011_105148391083_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="毛豆腐">
                                <span>毛豆腐</span>
                            </div>
                            <div class="dish-item">
                                <img src="https://img95.699pic.com/photo/50247/6588.jpg_wh300.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="火腿炖甲鱼">
                                <span>火腿炖甲鱼</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h4>📍 流行地区</h4>
                        <p>安徽、江西、浙江西部，体现了徽商'贾而好儒'的文化特点。</p>
                    </div>
                `
            }
        }
    };

    // ===== 2. 全局变量 =====
    let currentCuisine = null;
    let currentDialogueIndex = 0;
    let isDialoguing = false;
    
    // DOM元素
    const roadProgress = document.getElementById('roadProgress');
    const dialogueOverlay = document.getElementById('dialogueOverlay');
    const dialogueContainer = document.getElementById('dialogueContainer');
    const dialogueOwner = document.getElementById('dialogueOwner');
    const ownerPortrait = document.getElementById('ownerPortrait');
    const ownerTitle = document.getElementById('ownerTitle');
    const dialogueMessages = document.getElementById('dialogueMessages');
    const nextBtn = document.getElementById('nextBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const detailOverlay = document.getElementById('detailOverlay');
    const detailContent = document.getElementById('detailContent');
    const detailTitle = document.getElementById('detailTitle');
    const stalls = document.querySelectorAll('.stall');
    const themeToggle = document.querySelector('.theme-toggle-market');
    const themeIcon = themeToggle.querySelector('i');
    
    // 音效元素
    const marketAmbient = document.getElementById('marketAmbient');
    const stallHoverSound = document.getElementById('stallHoverSound');
    const dialogueSound = document.getElementById('dialogueSound');
    const cookingSound = document.getElementById('cookingSound');
    
    // ===== 3. 初始化函数 =====
    function initMarket() {
        console.log('美食集市初始化...');
        
        // 初始化音效
        initAudio();
        
        // 初始化滚动监听
        initScroll();
        
        // 初始化摊位动画
        initStallsAnimation();
        
        // 初始化主题切换
        initThemeToggle();
        
        // 初始化摊位悬停效果
        initStallHover();
        
        // 开始环境音效
        startAmbientSound();
        
        console.log('美食集市初始化完成！');
    }
    
    // ===== 4. 音效系统 =====
    function initAudio() {
        // 设置音效音量
        marketAmbient.volume = 0.3;
        stallHoverSound.volume = 0.5;
        dialogueSound.volume = 0.4;
        cookingSound.volume = 0.6;
        
        // 预加载音效
        marketAmbient.load();
        stallHoverSound.load();
    }
    
    function startAmbientSound() {
        // 延迟启动环境音，避免页面加载时立即播放
        setTimeout(() => {
            marketAmbient.play().catch(e => {
                console.log('环境音效需要用户交互后播放:', e);
            });
        }, 1000);
    }
    
    function playStallHoverSound() {
        stallHoverSound.currentTime = 0;
        stallHoverSound.play().catch(e => console.log('悬停音效播放失败:', e));
    }
    
    function playDialogueSound() {
        dialogueSound.currentTime = 0;
        dialogueSound.play().catch(e => console.log('对话音效播放失败:', e));
    }
    
    function playCookingSound() {
        cookingSound.currentTime = 0;
        cookingSound.play().catch(e => console.log('烹饪音效播放失败:', e));
    }
    
    // ===== 5. 滚动系统 =====
    function initScroll() {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateRoadProgress();
                    updateStallsVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // 初始更新
        updateRoadProgress();
        updateStallsVisibility();
    }
    
    function updateRoadProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        
        // 更新道路进度条
        const progressHeight = scrollPercent * 100;
        roadProgress.style.height = `${progressHeight}%`;
        
        // 更新灯笼亮度（根据滚动位置）
        const lanterns = document.querySelectorAll('.lantern');
        lanterns.forEach((lantern, index) => {
            const lanternPos = (index + 1) * 20; // 每个灯笼大约在20%的位置
            const distance = Math.abs(progressHeight - lanternPos);
            const brightness = Math.max(0, 100 - distance * 2);
            lantern.style.opacity = `${brightness / 100}`;
        });
    }
    
    function updateStallsVisibility() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        stalls.forEach(stall => {
            const rect = stall.getBoundingClientRect();
            const elementTop = rect.top + scrollTop;
            const elementVisible = 150;
            
            if (scrollTop > elementTop - windowHeight + elementVisible) {
                stall.classList.add('visible');
            }
        });
    }
    
    // ===== 6. 摊位动画系统 =====
    function initStallsAnimation() {
        // 为每个摊位添加独特的动画
        stalls.forEach((stall, index) => {
            const cuisine = stall.getAttribute('data-cuisine');
            
            // 根据菜系类型添加特定动画
            switch(cuisine) {
                case 'sichuan':
                    // 川菜火车动画
                    initSichuanAnimations(stall);
                    break;
                case 'guangdong':
                    // 粤菜巴士动画
                    initGuangdongAnimations(stall);
                    break;
                case 'shandong':
                    // 鲁菜宫殿动画
                    initShandongAnimations(stall);
                    break;
                // 其他菜系动画类似...
            }
            
            // 添加悬停效果
            stall.addEventListener('mouseenter', function() {
                playStallHoverSound();
                this.querySelector('.stall-container').style.transform = 'translateY(-15px) scale(1.03)';
            });
            
            stall.addEventListener('mouseleave', function() {
                this.querySelector('.stall-container').style.transform = 'translateY(-10px) scale(1.02)';
            });
        });
    }
    
    function initSichuanAnimations(stall) {
        // 火锅气泡动画
        const soup = stall.querySelector('.hotpot-soup');
        if (soup) {
            setInterval(() => {
                soup.style.animation = 'none';
                setTimeout(() => {
                    soup.style.animation = 'soup-bubble 2s infinite ease-in-out';
                }, 10);
            }, 5000);
        }
        
        // 火车烟雾动画
        const smokeParticles = stall.querySelectorAll('.smoke-particle');
        smokeParticles.forEach(particle => {
            particle.style.animation = 'smoke-rise 3s infinite ease-in-out';
        });
        
        // 辣椒摆动动画
        const chiliStrings = stall.querySelectorAll('.chili-string');
        chiliStrings.forEach((string, index) => {
            string.querySelector('::before').style.animation = `chili-swing ${2 + index * 0.5}s infinite ease-in-out`;
        });
    }
    
    function initGuangdongAnimations(stall) {
        // 点心旋转动画
        const dimsumItems = stall.querySelectorAll('.dimsum-item');
        dimsumItems.forEach((item, index) => {
            item.style.animation = `dimsum-rotate ${4 + index}s infinite linear`;
        });
        
        // 蒸汽动画
        const steamElements = stall.querySelectorAll('.steam');
        steamElements.forEach((steam, index) => {
            steam.style.animation = `steam-rise ${2 + index * 0.5}s infinite ease-in-out`;
        });
        
        // 霓虹灯闪烁
        const neonSign = stall.querySelector('.neon-sign');
        if (neonSign) {
            setInterval(() => {
                neonSign.style.animation = 'none';
                setTimeout(() => {
                    neonSign.style.animation = 'neon-flicker 2s infinite alternate';
                }, 10);
            }, 3000);
        }
    }
    
    function initShandongAnimations(stall) {
        // 宫殿灯笼摆动
        const palaceLanterns = stall.querySelectorAll('.palace-lantern');
        palaceLanterns.forEach((lantern, index) => {
            lantern.style.animation = `lantern-sway ${3 + index}s infinite ease-in-out`;
        });
    }
    
    // ===== 7. 摊位悬停效果 =====
    function initStallHover() {
        const talkButtons = document.querySelectorAll('.talk-btn');
        
        talkButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
                this.style.boxShadow = '0 15px 35px rgba(255, 107, 53, 0.4)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 8px 20px rgba(255, 140, 66, 0.3)';
            });
            
            button.addEventListener('click', function() {
                playCookingSound();
            });
        });
    }
    
    // ===== 8. 对话系统 =====
    function startDialogue(cuisineId) {
        if (isDialoguing) return;
        
        currentCuisine = cuisineId;
        currentDialogueIndex = 0;
        isDialoguing = true;
        
        const dialogueData = cuisineDialogues[cuisineId];
        if (!dialogueData) return;
        
        // 更新对话界面
        dialogueOwner.textContent = dialogueData.owner;
        ownerPortrait.src = dialogueData.portrait;
        ownerTitle.textContent = dialogueData.owner;
        
        // 清空之前的消息
        dialogueMessages.innerHTML = '';
        
        // 显示第一条消息
        showNextMessage();
        
        // 显示对话界面
        dialogueOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 禁用滚动
        
        // 播放对话音效
        playDialogueSound();
    }
    
    function showNextMessage() {
        const dialogueData = cuisineDialogues[currentCuisine];
        if (!dialogueData || currentDialogueIndex >= dialogueData.messages.length) {
            // 对话结束，显示了解更多按钮
            nextBtn.style.display = 'none';
            learnMoreBtn.style.display = 'inline-block';
            return;
        }
        
        // 创建新消息元素
        const messageDiv = document.createElement('div');
        messageDiv.className = 'dialogue-message';
        messageDiv.textContent = dialogueData.messages[currentDialogueIndex];
        
        // 添加到消息容器
        dialogueMessages.appendChild(messageDiv);
        
        // 滚动到最新消息
        dialogueMessages.scrollTop = dialogueMessages.scrollHeight;
        
        // 更新索引
        currentDialogueIndex++;
        
        // 如果这是最后一条消息，修改按钮文本
        if (currentDialogueIndex === dialogueData.messages.length) {
            nextBtn.textContent = '对话结束';
        }
        
        // 播放音效
        playDialogueSound();
    }
    
    function nextDialogue() {
        showNextMessage();
    }
    
    function closeDialogue() {
        dialogueOverlay.style.display = 'none';
        document.body.style.overflow = ''; // 恢复滚动
        isDialoguing = false;
        
        // 重置按钮状态
        nextBtn.style.display = 'inline-block';
        learnMoreBtn.style.display = 'none';
        nextBtn.textContent = '继续';
    }
    
    // ===== 9. 菜系详情系统 =====
    function showCuisineDetail() {
        if (!currentCuisine) return;
        
        const dialogueData = cuisineDialogues[currentCuisine];
        if (!dialogueData) return;
        
        // 更新详情内容
        detailTitle.textContent = dialogueData.detail.title;
        
        // 创建详情内容
        detailContent.innerHTML = `
            <div class="detail-main">
                <div class="detail-image">
                    <img src="${dialogueData.detail.image}" alt="${dialogueData.detail.title}">
                </div>
                ${dialogueData.detail.content}
            </div>
        `;
        
        // 添加详情页面的样式
        addDetailStyles();
        
        // 隐藏对话界面
        closeDialogue();
        
        // 显示详情界面
        detailOverlay.style.display = 'flex';
    }
    
    function addDetailStyles() {
        // 确保详情页面的样式存在
        if (!document.getElementById('detail-styles')) {
            const style = document.createElement('style');
            style.id = 'detail-styles';
            style.textContent = `
                .detail-main {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                
                .detail-image {
                    width: 100%;
                    height: 300px;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }
                
                .detail-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                
                .detail-image img:hover {
                    transform: scale(1.05);
                }
                
                .detail-section {
                    background: rgba(160, 82, 45, 0.05);
                    padding: 1.5rem;
                    border-radius: 15px;
                    border-left: 4px solid var(--accent-color);
                }
                
                body.dark-mode .detail-section {
                    background: rgba(205, 133, 63, 0.1);
                }
                
                .detail-section h4 {
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                    font-size: 1.3rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                body.dark-mode .detail-section h4 {
                    color: var(--dark-primary);
                }
                
                .detail-section ul {
                    list-style: none;
                    padding-left: 1rem;
                }
                
                .detail-section li {
                    margin-bottom: 0.8rem;
                    padding-left: 1.5rem;
                    position: relative;
                }
                
                .detail-section li::before {
                    content: '•';
                    color: var(--accent-color);
                    position: absolute;
                    left: 0;
                    font-size: 1.5rem;
                }
                
                .dish-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .dish-item {
                    text-align: center;
                }
                
                .dish-item img {
                    width: 100%;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 10px;
                    border: 2px solid var(--secondary-color);
                    transition: all 0.3s ease;
                }
                
                .dish-item img:hover {
                    transform: translateY(-5px);
                    border-color: var(--accent-color);
                }
                
                .dish-item span {
                    display: block;
                    margin-top: 0.5rem;
                    font-weight: bold;
                    color: var(--primary-color);
                }
                
                body.dark-mode .dish-item span {
                    color: var(--dark-primary);
                }
                
                @media (max-width: 768px) {
                    .dish-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                @media (max-width: 480px) {
                    .dish-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function closeDetail() {
        detailOverlay.style.display = 'none';
    }
    
    // ===== 10. 主题切换系统 =====
    function initThemeToggle() {
        // 检查本地存储的主题偏好
        const currentTheme = localStorage.getItem('market-theme') || 'day';
        
        // 应用保存的主题
        if (currentTheme === 'night') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        // 切换主题
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // 更新图标
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('market-theme', 'night');
                
                // 夜间模式特效
                activateNightEffects();
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('market-theme', 'day');
                
                // 日间模式特效
                activateDayEffects();
            }
            
            // 添加点击动画
            this.style.transform = 'rotate(360deg) scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    }
    
    function activateNightEffects() {
        // 夜间模式特效
        console.log('切换到夜间模式');
        
        // 所有灯笼更亮
        const lanterns = document.querySelectorAll('.lantern');
        lanterns.forEach(lantern => {
            lantern.style.boxShadow = '0 0 20px var(--lantern-light-night)';
        });
        
        // 摊位添加发光效果
        const stalls = document.querySelectorAll('.stall-container');
        stalls.forEach(stall => {
            stall.style.boxShadow = `
                0 20px 40px var(--stall-shadow-night),
                0 0 30px rgba(255, 140, 66, 0.1),
                inset 0 0 20px rgba(255, 215, 0, 0.05)
            `;
        });
    }
    
    function activateDayEffects() {
        // 日间模式特效
        console.log('切换到日间模式');
        
        // 恢复日间灯笼效果
        const lanterns = document.querySelectorAll('.lantern');
        lanterns.forEach(lantern => {
            lantern.style.boxShadow = '0 0 10px var(--lantern-light-day)';
        });
        
        // 恢复日间摊位效果
        const stalls = document.querySelectorAll('.stall-container');
        stalls.forEach(stall => {
            stall.style.boxShadow = `
                0 20px 40px var(--stall-shadow-day),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `;
        });
    }
    
    // ===== 11. 回到顶部按钮 =====
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        // 滚动显示/隐藏按钮
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // 点击回到顶部
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== 12. 搜索功能（与首页一致） =====
    function initSearch() {
        const searchInput = document.querySelector('.search-box input');
        const searchButton = document.querySelector('.search-box button');
        
        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
        
        function performSearch() {
            const query = searchInput.value.trim();
            if (query) {
                // 搜索对应的摊位
                const stalls = document.querySelectorAll('.stall');
                let found = false;
                
                stalls.forEach(stall => {
                    const stallName = stall.querySelector('.stall-name').textContent;
                    if (stallName.includes(query) || query.includes(stallName.substring(0, 2))) {
                        // 滚动到该摊位
                        stall.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                        
                        // 添加高亮效果
                        stall.querySelector('.stall-container').style.animation = 'none';
                        setTimeout(() => {
                            stall.querySelector('.stall-container').style.animation = 'pulse-highlight 1s ease 3';
                        }, 10);
                        
                        found = true;
                    }
                });
                
                if (!found) {
                    alert(`未找到与"${query}"相关的摊位`);
                }
                
                searchInput.value = '';
            } else {
                alert('请输入搜索关键词');
            }
        }
        
        // 添加高亮动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse-highlight {
                0%, 100% { 
                    box-shadow: 0 20px 40px var(--stall-shadow-day),
                                0 0 30px rgba(255, 140, 66, 0.3);
                }
                50% { 
                    box-shadow: 0 20px 40px var(--stall-shadow-day),
                                0 0 50px rgba(255, 140, 66, 0.6);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== 13. 导航栏激活状态 =====
    function initNavActive() {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === 'regional.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // ===== 14. 页面初始化 =====
    function initPage() {
        initNavActive();
        initMarket();
        initBackToTop();
        initSearch();
        
        // 延迟显示摊位，创造入场效果
        setTimeout(() => {
            updateStallsVisibility();
        }, 500);
        
        console.log('美食集市页面加载完成！');
    }
    
    // ===== 15. 导出函数供HTML调用 =====
    window.startDialogue = startDialogue;
    window.nextDialogue = nextDialogue;
    window.closeDialogue = closeDialogue;
    window.showCuisineDetail = showCuisineDetail;
    window.closeDetail = closeDetail;
    
    // ===== 16. 启动页面 =====
    setTimeout(initPage, 100);
});