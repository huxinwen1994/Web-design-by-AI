// particle.js - 悬浮粒子动画
class ParticleAnimation {
    constructor(options = {}) {
      // 默认配置
      this.config = {
        container: options.container || 'body',
        particleCount: options.particleCount || 80,
        color: options.color || ['#E85D75', '#F9C5D1', '#8A4F96', '#FFF5F7'],
        size: options.size || [2, 6],
        speed: options.speed || [0.1, 0.5],
        opacity: options.opacity || [0.2, 0.8],
        connectDistance: options.connectDistance || 100,
        zIndex: options.zIndex || -1
      };
  
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.container = document.querySelector(this.config.container);
      
      if (!this.container) return;
      
      this.initCanvas();
      this.createParticles();
      this.animate();
      this.bindEvents();
    }
  
    // 初始化画布
    initCanvas() {
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = this.config.zIndex;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.container.appendChild(this.canvas);
    }
  
    // 创建粒子
    createParticles() {
      for (let i = 0; i < this.config.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * (this.config.size[1] - this.config.size[0]) + this.config.size[0],
          color: this.config.color[Math.floor(Math.random() * this.config.color.length)],
          speedX: (Math.random() - 0.5) * (this.config.speed[1] - this.config.speed[0]) + this.config.speed[0],
          speedY: (Math.random() - 0.5) * (this.config.speed[1] - this.config.speed[0]) + this.config.speed[0],
          opacity: Math.random() * (this.config.opacity[1] - this.config.opacity[0]) + this.config.opacity[0],
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    }
  
    // 绘制粒子
    drawParticles() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.particles.forEach((particle, index) => {
        // 绘制粒子
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
        this.ctx.fill();
        
        // 粒子移动
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // 边界检测
        if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX = -particle.speedX;
        if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY = -particle.speedY;
      });
      
      // 绘制粒子连线
      this.connectParticles();
    }
  
    // 粒子连线
    connectParticles() {
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.config.connectDistance) {
            const opacity = 1 - distance / this.config.connectDistance;
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(232, 93, 117, ${opacity * 0.2})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.stroke();
          }
        }
      }
    }
  
    // 动画循环
    animate() {
      this.drawParticles();
      requestAnimationFrame(() => this.animate());
    }
  
    // 绑定窗口事件
    bindEvents() {
      window.addEventListener('resize', () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      });
    }
  }
  
  // 页面加载完成后初始化
  window.addEventListener('DOMContentLoaded', () => {
    new ParticleAnimation({
      particleCount: 60,
      color: ['#E85D75', '#F9C5D1', '#8A4F96', '#FFF5F7', '#5A2E63'],
      size: [1, 4],
      speed: [0.05, 0.3],
      connectDistance: 80
    });
  });

  