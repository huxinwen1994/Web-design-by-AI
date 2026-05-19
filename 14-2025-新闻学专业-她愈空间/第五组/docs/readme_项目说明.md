👩‍⚕️ 她愈空间 (She-Cure Space) - 子宫内膜异位症科普与支持平台
1. 项目概览、主题与技术栈
项目名称： 她愈空间 (She-Cure Space)

项目主题： 子宫内膜异位症 (Endometriosis) 科普与支持平台

设计理念： 采用暖色系治愈风格（主色调：柔和粉色 var(--primary: #E85D75)），旨在营造专业、关怀且用户友好的信息环境。

技术栈： HTML5, CSS3 (原生响应式), 纯原生 JavaScript。项目未引入任何前端框架或外部库。

2. 网站信息结构与模块拆分
网站包含 6 个核心页面，功能覆盖信息展示、风险评估、知识巩固和社区交流。

首页 (index.html)：项目介绍、功能引导、粒子背景动画 (particle.js)。

了解内异症 (about.html)：专业科普、诊断流程图、参考文献切换交互。

症状自测 (quiz.html)：交互功能 I，核心风险评估。

治疗与管理 (treatment.html)：交互功能 II，Tabs 切换；响应式表格。

交流与支持 (support.html)：交互功能 III，实时匿名发帖社区。

巩固挑战 (review.html)：交互功能 IV，知识连线配对游戏。

3. 核心交互功能深度解析
本项目实现了 4 个复杂的纯原生 JavaScript 交互功能，并解决了响应式表格的难题。

A. 交互功能 I：症状自测评分与反馈 (quiz.html)
评分机制： 问卷包含 10 题，每题 4 个选项，分值 0-3 分，总分 30 分。

JS 逻辑： 监听表单 submit 事件并阻止默认行为。通过循环累加所有 input[type="radio"] 的 value 属性获得 totalScore。

阈值判定： 使用精确的 if/else if 结构进行四级风险判定（例如：低风险 totalScore <= 6，高风险 totalScore > 21）。

反馈： 动态更新分数和建议文字，并为结果元素添加对应的颜色类（green, yellow, orange, red）。

B. 交互功能 II：标签页切换 (Tabs) (treatment.html)
切换机制： 纯原生 JS 逻辑，监听导航项 .tab 的点击事件。

内容映射： 利用被点击标签的 data-target 属性，精确获取目标内容区域的 ID。

状态同步： 通过移除和添加 active 类，确保点击时只有对应的标签和内容区高亮显示。

C. 交互功能 III：社区实时发帖与置顶 (support.html)
实时插入（关键）： 纯原生 JS 逻辑。在表单提交后，动态构建完整的帖子卡片 HTML 字符串。

DOM 操作： 使用 document.getElementById('postList').insertAdjacentHTML('afterbegin', newPostHTML) 方法，确保新帖子卡片被插入到列表容器的最顶部，实现新帖置顶效果。

模态框： 使用简单的 style.display 切换来控制发帖模态框的显示与隐藏。

D. 交互功能 IV：连线配对与答案校验 (review.html)
配对逻辑： 纯原生 JS 逻辑。使用全局变量 selectedLeft 存储当前选中的左侧项，并使用 userMatches 对象记录用户的配对结果。

点击机制： 区分左侧点击（选择）和右侧点击（完成配对），并实时添加 selected 或 matched 状态类。

答案校验： 预设正确的 correctAnswers 映射。点击“检查答案”时，遍历用户结果并与预设答案比对，并根据结果动态添加 correct (绿色) / incorrect (红色) 颜色类进行视觉反馈。

E. 响应式表格实现（硬性指标）
实现文件： treatment.html / style.css

HTML 结构： 表格中所有 <td> 元素均包含 data-label 属性，用于存储列名。

CSS 媒体查询 (关键)： 在 @media screen and (max-width: 768px) 中，强制表格行转变为块级元素 (display: block)。

列名显示： 利用 CSS 的 ::before 伪元素和 content: attr(data-label) 属性，在手机端将列名动态插入到每个数据项前，实现卡片式堆叠显示，极大提高可读性。

4. Prompt 驱动开发模式总结
阶段一： 采用结构定义 Prompt，一次性生成所有文件骨架、CSS 变量、粒子动画和初始内容。开发者扮演架构师角色。

阶段二： 采用功能聚焦 Prompt，针对每个硬性交互要求，发出高度专业化的指令（如指定 insertAdjacentHTML 和 data-label 的用法）。

开发者角色： 我主要担任“集成与调试员”的角色，负责定义系统边界、统一 CSS 变量使用，并确保将 AI 生成的独立代码片段无缝整合到统一的文件结构中，并设置正确的逻辑参数。

5. 网站运行与测试说明
运行环境： 推荐使用 Chrome、Firefox 或 Edge 浏览器。

启动方式： 直接在浏览器中打开 index.html 文件即可。

关键测试点：

症状自测： 勾选选项后点击“查看结果”，检查分数和风险等级颜色是否正确变化。

治疗与管理： 点击不同标签页，并缩小浏览器窗口，检查药物表格是否正确堆叠显示为列表。

交流与支持： 点击“分享我的故事”，填写内容并点击“发布”，检查新帖子是否实时显示在列表顶部。