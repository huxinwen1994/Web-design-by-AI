// 登录和注册页面交互脚本

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否是登录页面
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // 检查是否是注册页面
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

// 处理登录
function handleLogin(e) {
    e.preventDefault(); // 阻止表单默认提交
    
    const account = document.getElementById('loginAccount').value;
    const password = document.getElementById('loginPassword').value;
    
    // 简单验证（实际项目中应该有更严格的验证）
    if (!account || !password) {
        alert('请填写完整的登录信息');
        return;
    }
    
    // 显示成功消息
    showSuccessMessage('登录成功！');
}

// 处理注册
function handleRegister(e) {
    e.preventDefault(); // 阻止表单默认提交
    
    const nickname = document.getElementById('registerNickname').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    
    // 简单验证
    if (!nickname || !email || !phone || !password) {
        alert('请填写完整的注册信息');
        return;
    }
    
    // 显示成功消息
    showSuccessMessage('注册成功！');
}

// 显示成功消息并跳转
function showSuccessMessage(message) {
    const successMessage = document.getElementById('successMessage');
    const successText = successMessage.querySelector('.success-text');
    const authBox = document.getElementById('authBox');
    
    // 更新成功消息文本
    successText.textContent = message;
    
    // 隐藏表单框
    authBox.style.opacity = '0.3';
    
    // 显示成功提示
    successMessage.classList.add('show');
    
    // 2秒后跳转到首页
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 2000);
}


