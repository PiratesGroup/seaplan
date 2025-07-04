// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击菜单项时关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// 滚动时导航栏样式变化
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 数字动画效果
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                const duration = 2000; // 2秒
                const increment = finalNumber / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalNumber) {
                        current = finalNumber;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(current) + (target.textContent.includes('+') ? '+' : '');
                }, 16);
                
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

// 页面加载完成后初始化数字动画
if (document.querySelector('.stat-number')) {
    animateNumbers();
}

// 联系表单处理
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // 简单的表单验证
        if (!data.name || !data.email || !data.message) {
            showMessage('请填写必填字段', 'error');
            return;
        }
        
        // 邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('请输入有效的邮箱地址', 'error');
            return;
        }
        
        // 模拟发送（实际应用中需要连接后端服务）
        showLoading();
        
        setTimeout(() => {
            hideLoading();
            showMessage('消息发送成功！我们会尽快与您联系。', 'success');
            contactForm.reset();
        }, 2000);
    });
}

// 显示消息提示
function showMessage(message, type) {
    // 移除现有的消息
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新的消息提示
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // 添加样式
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // 显示动画
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 4000);
}

// 显示加载状态
function showLoading() {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
    }
}

// 隐藏加载状态
function hideLoading() {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = '发送消息';
    }
}

// 页面元素淡入动画
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .product-item, .process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// 初始化滚动动画
initScrollAnimations();

// 返回顶部按钮
function createBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // 滚动显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(100px)';
        }
    });
    
    // 点击回到顶部
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 悬停效果
    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.transform = 'translateY(0) scale(1)';
    });
}

// 创建返回顶部按钮
createBackToTopButton();

// 响应式处理
function handleResize() {
    const contactGrid = document.querySelector('.contact-info-grid');
    if (contactGrid && window.innerWidth <= 768) {
        contactGrid.style.gridTemplateColumns = '1fr';
    } else if (contactGrid) {
        contactGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
    }
    
    // 联系页面布局调整
    const contactLayout = document.querySelector('div[style*="grid-template-columns: 1fr 1fr"]');
    if (contactLayout && window.innerWidth <= 768) {
        contactLayout.style.gridTemplateColumns = '1fr';
        contactLayout.style.gap = '2rem';
    } else if (contactLayout) {
        contactLayout.style.gridTemplateColumns = '1fr 1fr';
        contactLayout.style.gap = '4rem';
    }
}

// 页面加载和窗口大小变化时处理响应式
window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);

// 添加页面加载完成的平滑过渡
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
});

console.log('海平面智能科技官网已加载完成！'); 