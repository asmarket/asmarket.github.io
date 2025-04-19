class ModernPreloader {
    constructor() {
        this.createPreloader();
        this.initializePreloader();
    }

    createPreloader() {
        const preloaderHTML = `
            <div id="modern-preloader">
                <div class="preloader-content">
                    <div class="preloader-logo">ASMARKET08017</div>
                    <div class="preloader-progress">
                        <div class="progress-bar"></div>
                        <div class="progress-text"></div>
                    </div>
                    <div class="preloader-message">En desarrollo, vuelve a intentarlo más tarde.</div>
                </div>
            </div>
        `;

        const styles = `
            #modern-preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0a0a0a;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                font-family: 'Marcellus', serif;
            }

            .preloader-content {
                text-align: center;
                color: #e2b53f;
            }

            .preloader-logo {
                font-size: 4rem;
                font-weight: 700;
                margin-bottom: 2rem;
                position: relative;
                display: inline-block;
            }

            .preloader-logo::after {
                content: '';
                position: absolute;
                width: 120%;
                height: 2px;
                background: #e2b53f;
                bottom: -10px;
                left: -10%;
                transform: scaleX(0);
                transform-origin: left;
                animation: lineGrow 2s ease-in-out infinite;
            }

            .preloader-progress {
                width: 200px;
                height: 2px;
                background: rgba(226, 181, 63, 0.2);
                margin: 2rem auto;
                position: relative;
            }

            .progress-bar {
                height: 100%;
                width: 0%;
                background: #e2b53f;
                transition: width 0.3s ease;
            }

            .progress-text {
                position: absolute;
                right: 0;
                top: -25px;
                font-size: 14px;
                font-family: 'Outfit', sans-serif;
            }

            .preloader-message {
                font-family: 'Outfit', sans-serif;
                font-size: 1rem;
                opacity: 0.7;
            }

            @keyframes lineGrow {
                0%, 100% { transform: scaleX(0); }
                50% { transform: scaleX(1); }
            }
        `;

        // Add styles to head
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);

        // Add preloader to body
        document.body.insertAdjacentHTML('beforeend', preloaderHTML);
    }

    initializePreloader() {
        const preloader = document.getElementById('modern-preloader');
        const progressBar = preloader.querySelector('.progress-bar');
        const progressText = preloader.querySelector('.progress-text');
        let progress = 0;

        const updateProgress = () => {
            if (progress < 1) {
                progress += Math.random() * 1;
                progress = Math.min(progress, 1);

                progressBar.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}%`;

                if (progress < 1) {
                    requestAnimationFrame(updateProgress);
                } else {
                    this.completeLoading(preloader);
                }
            }
        };

        requestAnimationFrame(updateProgress);
    }

    completeLoading(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                preloader.remove();
                document.body.classList.add('loaded');
                document.dispatchEvent(new CustomEvent('preloaderComplete'));
            }, 500);
        }, 500);
    }
}

// Export initialization function
export function initPreloader() {
    return new ModernPreloader();
}

// Auto-initialize if loaded directly
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initPreloader);
}
