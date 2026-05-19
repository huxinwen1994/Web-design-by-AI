// 视频播放控制
function initVideoPlayer() {
    const video = document.querySelector('#mainVideo');
    const playPauseBtn = document.querySelector('#playPauseBtn');
    const progressBar = document.querySelector('#progressBar');
    const progressFill = document.querySelector('#progressFill');
    const currentTimeEl = document.querySelector('#currentTime');
    const durationEl = document.querySelector('#duration');
    const watchFullBtn = document.querySelector('.watch-full-btn');
    
    if (!video) return;
    
    // 播放/暂停控制
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // 视频时间更新
    video.addEventListener('timeupdate', () => {
        const currentTime = video.currentTime;
        const duration = video.duration;
        
        // 更新进度条
        const progress = (currentTime / duration) * 100;
        progressFill.style.width = `${progress}%`;
        
        // 更新时间显示
        currentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
    });
    
    // 点击进度条跳转
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });
    
    // 视频播放状态变化
    video.addEventListener('play', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    
    video.addEventListener('pause', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // 观看完整视频按钮
    if (watchFullBtn) {
        watchFullBtn.addEventListener('click', () => {
            video.currentTime = 0;
            video.play();
        });
    }
    
    // 格式化时间显示
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initVideoPlayer();
});