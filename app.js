const btnDrop = document.getElementById('btn-drop');
const voidInput = document.getElementById('void-input');
const interfaceWrapper = document.getElementById('interface');
const container = document.querySelector('.void-container');
const voidResponse = document.getElementById('void-response');

btnDrop.addEventListener('click', () => {
    const text = voidInput.value.trim();
    if (!text) return;

    const rect = voidInput.getBoundingClientRect();
    
    interfaceWrapper.style.opacity = '0';
    interfaceWrapper.style.pointerEvents = 'none'; // Защита от лишних кликов во время полета
    voidInput.blur();

    animateTextToVoid(text, rect);
});

function animateTextToVoid(text, sourceRect) {
    const letters = Array.from(text);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const letterDelay = 36; 

    letters.forEach((char, index) => {
        if (char === ' ' && letters[index - 1] === ' ') return;

        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'flying-letter';

        const startX = sourceRect.left + (Math.random() * sourceRect.width);
        const startY = sourceRect.top + (Math.random() * sourceRect.height);

        span.style.left = `${startX}px`;
        span.style.top = `${startY}px`;

        container.appendChild(span);

        setTimeout(() => {
            const randomRotation = Math.random() * 1080 - 540;
            
            span.style.transform = `translate(${centerX - startX}px, ${centerY - startY}px) scale(0.01) rotate(${randomRotation}deg)`;
            span.style.opacity = '0';
            span.style.filter = 'blur(6px)';
        }, index * letterDelay);
    });

    const animationEndTime = letters.length * letterDelay + 5400;

    // Включаем финальный отклик Бездны
    setTimeout(() => {
        voidResponse.classList.remove('hidden');
        setTimeout(() => {
            voidResponse.classList.add('visible');
        }, 50);
    }, animationEndTime - 1500);

    // Полный возврат чистого интерфейса
    setTimeout(() => {
        voidResponse.classList.remove('visible');
        
        setTimeout(() => {
            voidResponse.classList.add('hidden');
            voidInput.value = '';
            interfaceWrapper.style.opacity = '1';
            interfaceWrapper.style.pointerEvents = 'auto'; // Снова разрешаем клики
            document.querySelectorAll('.flying-letter').forEach(el => el.remove());
        }, 1000);

    }, animationEndTime + 2500);
}