// 弹窗控制
function toggleModal() {
    const modal = document.getElementById('backgroundModal');
    modal.classList.toggle('active');
}

// 点击外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('backgroundModal');
    if (event.target === modal) {
        modal.classList.remove('active');
    }
}

// 颜色选择
document.getElementById('colorPicker').addEventListener('input', (e) => {
    document.body.style.background = e.target.value;
    document.body.style.backgroundImage = 'none';
    savePreference('color', e.target.value);
});

// 图片上传
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            document.body.style.backgroundImage = `url(${event.target.result})`;
            savePreference('image', event.target.result);
        }
        reader.readAsDataURL(file);
    }
});

// 随机渐变
function setRandomGradient() {
    const color1 = `hsl(${Math.random() * 360}, 70%, 50%)`;
    const color2 = `hsl(${Math.random() * 360}, 70%, 50%)`;
    const angle = Math.random() * 360;
    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    
    document.body.style.background = gradient;
    document.body.style.backgroundImage = 'none';
    savePreference('gradient', gradient);
}

// 保存设置
function savePreference(type, value) {
    localStorage.setItem('background', JSON.stringify({ type, value }));
}

// 加载设置
function loadPreference() {
    const saved = JSON.parse(localStorage.getItem('background'));
    if (saved) {
        if (saved.type === 'color') {
            document.body.style.background = saved.value;
        } else if (saved.type === 'image') {
            document.body.style.backgroundImage = `url(${saved.value})`;
        } else if (saved.type === 'gradient') {
            document.body.style.background = saved.value;
        }
    }
}

// 重置背景
function resetBackground() {
    localStorage.removeItem('background');
    document.body.style.background = '#ffffff';
    document.body.style.backgroundImage = 'none';
    toggleModal();
}

// 初始化加载
window.onload = loadPreference;