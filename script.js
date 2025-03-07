// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 通用悬停效果函数
    const createHoverEffect = (element, enterCallback, leaveCallback) => {
        if (!element) return;

        const handleEnter = () => enterCallback(element);
        const handleLeave = () => leaveCallback(element);

        // 桌面端事件
        element.addEventListener('mouseenter', handleEnter);
        element.addEventListener('mouseleave', handleLeave);

        // 移动端事件
        element.addEventListener('touchstart', handleEnter);
        element.addEventListener('touchend', handleLeave);
    };

    // 二维码交互
    const qrcode = document.querySelector('.header-qrcode');
    createHoverEffect(
        qrcode,
        (el) => {
            el.style.transform = 'scale(1.8) translateY(20px)';
            el.style.zIndex = '1000';
            el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
        },
        (el) => {
            el.style.transform = 'scale(1)';
            el.style.zIndex = '';
            el.style.boxShadow = 'none';
        }
    );

    // 自动更新年份
    const updateCopyrightYear = () => {
        const footerText = document.querySelector('.footer-content p');
        if (footerText) {
            const currentYear = new Date().getFullYear();
            footerText.innerHTML = footerText.innerHTML
                .replace('2023-2025', `2023-${currentYear}`)
                .replace('2025', currentYear);
        }
    };
    updateCopyrightYear();

    // 卡片交互系统
    const initAnnouncements = () => {
        document.querySelectorAll('.announcement').forEach(card => {
            createHoverEffect(
                card,
                (el) => {
                    el.style.transform = 'translateY(-3px)';
                    el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                },
                (el) => {
                    el.style.transform = 'none';
                    el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                }
            );
        });
    };
    initAnnouncements();

    // 窗口尺寸变化时重置状态
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (qrcode) qrcode.style.transform = 'scale(1)';
            document.querySelectorAll('.announcement').forEach(card => {
                card.style.transform = 'none';
            });
        }, 100);
    });
});