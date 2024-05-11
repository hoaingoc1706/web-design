const brandContainer = document.getElementById('brandContainer');
let isDown = false;
let startX;
let scrollLeft;

brandContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - brandContainer.offsetLeft;
    scrollLeft = brandContainer.scrollLeft;
    brandContainer.style.cursor = 'grabbing';
});

brandContainer.addEventListener('mouseleave', () => {
    isDown = false;
    brandContainer.style.cursor = 'grab'; 
});

brandContainer.addEventListener('mouseup', () => {
    isDown = false;
    brandContainer.style.cursor = 'grab'; 
});

brandContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - brandContainer.offsetLeft;
    const walk = (x - startX) * 2; 
    brandContainer.scrollLeft = scrollLeft - walk;
});