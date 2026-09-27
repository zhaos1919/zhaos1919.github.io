'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Mail, MoveRight } from 'lucide-react';

const projects = [
  {
    id: '01', eyebrow: 'INTERACTIVE MUSEUM · ADVENTUREX 2026', title: 'InteractiMuse', cn: '智触博物',
    intro: '把青铜礼器知识转化为手势操作、游戏反馈与空间观察，让儿童不再只是观看线上博物馆。',
    decision: '以具身学习为核心，把知识点藏进任务反馈；用统一事件总线串联摄像头、键鼠、动画、音效与任务状态。',
    role: '产品与交互 · Web 技术开发 · 空间化探索',
    stack: ['Vite + JavaScript', 'MediaPipe', 'EventBus', 'PICO / WebSpatial'],
    stats: [['周期', '5 DAY HACKATHON'], ['奖项', '3 TRACK AWARDS'], ['奖金', '¥21K'], ['状态', 'PROTOTYPE ONLINE']],
    flow: ['Explore|文物探索任务', 'Sense|端侧手势识别', 'Respond|动画与音效反馈', 'Extend|空间化 3D 展示'],
  },
  {
    id: '02', eyebrow: 'CREATIVE TOOL · 2026', title: 'PoseRef Studio', cn: '3D 姿态与光影参考系统',
    intro: '面向绘画与视觉创作者，把姿态调整、光影控制、明度检查与结果导出放进一条浏览器工作流。',
    decision: '降低专业 3D 软件的学习成本，同时保留骨骼、灯光、材质和多角色场景的关键控制能力。',
    role: '产品设计 · Three.js 开发 · 性能与可用性测试',
    stack: ['WebGL + Three.js', 'GLB Skeleton', 'PBR Material', 'Value Check'],
    stats: [['性能', '≈ 60 FPS'], ['任务完成率', '100%'], ['体验评分', '4.57 / 5'], ['测试', '3 USERS']],
    flow: ['Pose|骨骼姿态编辑', 'Light|三点 / 面积光', 'Check|明度与材质检查', 'Export|结果与配置复用'],
  },
];

const capabilities = [
  ['01', 'PRODUCT', '从真实问题出发做需求拆解、功能规划与可验证原型。'],
  ['02', 'AI WORKFLOW', '使用 ChatGPT、Claude、豆包、Codex 等工具重构内容生产流程。'],
  ['03', 'WEB & 3D', 'Vite、JavaScript、Three.js、MediaPipe 与浏览器端实时交互。'],
  ['04', 'OPERATIONS', '完整经历选题、制作、发布、数据复盘与持续优化。'],
];

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const heroArt = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')), { threshold: .1 });
    els.forEach(el => observer.observe(el));
    const pointer = (event: PointerEvent) => {
      cursorDot.current?.style.setProperty('transform', `translate3d(${event.clientX}px,${event.clientY}px,0)`);
      cursorRing.current?.animate(
        { transform: `translate3d(${event.clientX}px,${event.clientY}px,0)` },
        { duration: 420, fill: 'forwards', easing: 'cubic-bezier(.2,.75,.25,1)' },
      );
      const x = (event.clientX / window.innerWidth - .5) * 22;
      const y = (event.clientY / window.innerHeight - .5) * 22;
      heroArt.current?.style.setProperty('--mouse-x', `${x}px`);
      heroArt.current?.style.setProperty('--mouse-y', `${y}px`);
      heroArt.current?.querySelectorAll<HTMLElement>('.liquid-blob').forEach((blob, index) => {
        const strength = [.54, .34, .21, .13][index] ?? .1;
        const localX = (event.clientX - window.innerWidth * .73) * strength;
        const localY = (event.clientY - window.innerHeight * .5) * strength;
        blob.style.setProperty('--liquid-x', `${localX}px`);
        blob.style.setProperty('--liquid-y', `${localY}px`);
      });
    };
    const hover = (event: Event) => {
      const target = event.target as HTMLElement;
      cursorRing.current?.classList.toggle('is-active', Boolean(target.closest('a,button,[data-cursor]')));
    };
    const scroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current?.style.setProperty('transform', `scaleX(${max > 0 ? window.scrollY / max : 0})`);
    };
    window.addEventListener('pointermove', pointer);
    document.addEventListener('pointerover', hover);
    window.addEventListener('scroll', scroll, { passive: true });
    scroll();
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', pointer);
      document.removeEventListener('pointerover', hover);
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  return <main>
    <div className="cursor-dot" ref={cursorDot} aria-hidden="true"/>
    <div className="cursor-ring" ref={cursorRing} aria-hidden="true"/>
    <div className="scroll-progress" ref={scrollProgress} aria-hidden="true"/>
    <a className="skip-link" href="#work">跳至项目</a>
    <nav className="site-nav" aria-label="主导航">
      <a className="nav-mark" href="#top">ZS</a>
      <div className="nav-links"><a href="#about">ABOUT</a><a href="#work">WORK</a><a href="#experience">EXPERIENCE</a></div>
      <a className="nav-mail" href="mailto:s67587698@gmail.com"><Mail size={15}/> EMAIL</a>
    </nav>

    <section className="hero" id="top">
      <div className="hero-copy" data-reveal>
        <p className="micro">PORTFOLIO / 2026 · SHANGHAI</p>
        <h1>赵珊珊</h1>
        <p className="hero-statement">I turn <em>messy problems</em> into<br/>products people can experience.</p>
        <p className="hero-cn">计算机科学与技术本科生，关注 AI 工具、Web 交互与创作工作流。</p>
        <div className="hero-actions"><a className="button primary" href="#work">View selected work <ArrowDown size={17}/></a><a className="button secondary" href="mailto:s67587698@gmail.com">Get in touch <Mail size={16}/></a></div>
      </div>
      <div className="hero-art" ref={heroArt}>
        <svg className="liquid-filter" aria-hidden="true">
          <filter id="liquid-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12" result="goo"/></filter>
        </svg>
        <div className="liquid-field" aria-hidden="true">
          <div className="liquid-blob liquid-one"><i/></div><div className="liquid-blob liquid-two"><i/></div><div className="liquid-blob liquid-three"><i/></div><div className="liquid-blob liquid-four"><i/></div>
        </div>
        <div className="orb orb-b"/><span className="cross" aria-hidden="true">+</span>
        <div className="ring-shell" aria-label="环形页面导航">
          <div className="ring-orbit" aria-hidden="true"><span/><span/><span/><span/></div>
          <a className="ring-link ring-about" href="#about">About</a>
          <a className="ring-link ring-work" href="#work">Selected work</a>
          <a className="ring-link ring-exp" href="#experience">Experience</a>
          <a className="ring-link ring-contact" href="#contact">Contact</a>
          <div className="ring-core" aria-hidden="true"><span>explore</span></div>
        </div>
      </div>
      <p className="hero-strip">PRODUCT DESIGN · AI WORKFLOW · WEB DEVELOPMENT · CONTENT OPERATIONS</p>
    </section>

    <section className="about section-grid" id="about">
      <div className="portrait-wrap" data-reveal><img src="/zhaoshanshan-portrait.png" alt="赵珊珊证件照"/><span>PORTRAIT / REPLACEABLE</span></div>
      <div className="about-copy" data-reveal><p className="section-index">00 — ABOUT</p><h2>我喜欢把真实业务里的麻烦，<br/>变成可以使用、测试和迭代的产品。<i className="type-caret" aria-hidden="true"/></h2><p>我既理解内容生产和运营数据，也愿意进入代码、交互与性能细节。比起停在想法，我更习惯做出原型，再用真实反馈修正判断。</p><div className="about-tags"><span>COMPUTER SCIENCE</span><span>AI TOOLS</span><span>WEB & 3D</span><span>FAST PROTOTYPING</span></div></div>
    </section>

    <section className="work" id="work">
      <header className="section-heading" data-reveal><p className="section-index">01 — SELECTED WORK</p><h2>Two products,<br/><em>built to be used.</em></h2><p>从交互式文化体验到浏览器端 3D 创作工具，我负责把问题拆成产品机制，并把机制做成可演示的体验。</p></header>
      <div className="project-switch" role="tablist" aria-label="选择项目">{projects.map((p,i)=><button key={p.id} role="tab" aria-selected={activeProject===i} onClick={()=>setActiveProject(i)} className={activeProject===i?'active':''}><span>{p.id}</span>{p.title}</button>)}</div>
      {projects.map((p,i)=><article className="project" key={p.id} hidden={activeProject!==i}>
        <div className="project-intro"><p className="micro">{p.id} / {p.eyebrow}</p><h3>{p.title}</h3><h4>{p.cn}</h4><p className="project-lead">{p.intro}</p><div className="decision"><span>PRODUCT DECISION</span><p>{p.decision}</p></div><dl><dt>MY ROLE</dt><dd>{p.role}</dd></dl></div>
        <div className="project-visual"><div className="visual-label"><span>SYSTEM POSTER / 2026</span><span>PROJECT VISUAL PLACEHOLDER</span></div><div className="flow">{p.flow.map((item,n)=>{const [a,b]=item.split('|');return <div className="flow-step" key={item}><span>0{n+1}</span><strong>{a}</strong><strong>{b}</strong>{n<3&&<MoveRight className="flow-arrow" size={20}/>}</div>})}</div><div className="asset-placeholder"><span>+</span><p>项目封面 / 界面截图 / 演示视频</p><small>ASSET TO BE PROVIDED</small></div><div className="stack-list">{p.stack.map(x=><span key={x}>{x}</span>)}</div></div>
        <div className="stats">{p.stats.map(([a,b])=><div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div>
      </article>)}
    </section>

    <section className="capabilities"><header data-reveal><p className="section-index">02 — PRACTICE</p><h2>What I bring<br/>to the table.</h2></header><div className="capability-list">{capabilities.map(([n,t,d])=><div className="capability" key={n} data-reveal><span>{n}</span><h3>{t}</h3><p>{d}</p><ArrowUpRight size={20}/></div>)}</div></section>

    <section className="experience" id="experience">
      <header className="section-heading compact" data-reveal><p className="section-index">03 — EXPERIENCE</p><h2>Learning by<br/><em>building.</em></h2></header>
      <div className="timeline">
        <article className="timeline-item" data-reveal><time>2022.09 — 2026.06</time><div><p>EDUCATION</p><h3>山东师范大学</h3><h4>计算机科学与技术 · 本科</h4><p>计算机专业训练，为 Web 开发、AI 工具应用和流程自动化实践建立基础。</p></div><span className="timeline-dot">01</span></article>
        <article className="timeline-item" data-reveal><time>2026.03 — 2026.06</time><div><p>INTERNSHIP</p><h3>喜播集团</h3><h4>小红书 KOS 运营实习生</h4><p>累计产出 107 篇内容、涨粉 1000+；整理内容制作 SOP，并独立开发 AI 图文批量生成工具，使团队出图效率提升 87%。</p></div><span className="timeline-dot">02</span></article>
        <article className="timeline-item placeholder-item" data-reveal><time>NEXT</time><div><p>TO BE CONTINUED</p><h3>下一段经历</h3><h4>信息待补充</h4><p>这里预留下一段实习、工作或重要项目经历的位置。</p></div><span className="timeline-dot">+</span></article>
      </div>
    </section>

    <section className="visual-diary"><div className="diary-copy" data-reveal><p className="section-index light">04 — VISUAL DIARY</p><h2>More than<br/>a résumé.</h2><p>生活、摄影、创作与个人表达的空间。素材会在你提供后替换这里的占位页。</p></div><div className="diary-placeholder"><span>PERSONAL IMAGE / VIDEO</span><strong>+</strong><small>WAITING FOR YOUR MATERIAL</small></div></section>

    <footer id="contact"><p className="micro">AVAILABLE FOR CONVERSATIONS / 2026</p><h2>Let&apos;s build something<br/><em>people can feel.</em></h2><div className="footer-links"><a href="mailto:s67587698@gmail.com">s67587698@gmail.com <ArrowUpRight size={18}/></a><span>Shanghai · Pudong</span><span>198 6213 8821</span></div><div className="footer-bottom"><strong>赵珊珊</strong><span>© 2026 · MADE WITH CURIOSITY</span></div></footer>
  </main>;
}
