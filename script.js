/**
 * ============================================================================
 * SCRIPT PRINCIPAL - TEORIA DAS JANELAS QUEBRADAS
 * Versão: 2.0.0 | Otimizado para performance e acessibilidade
 * ============================================================================
 */

(function() {
    'use strict';

    // Configurações globais
    const CONFIG = {
        scrollThrottle: 16, // ~60fps
        parallaxEnabled: true,
        parallaxStrength: 0.03,
        animationDuration: 600,
        observerRootMargin: '50px',
        observerThreshold: 0.1
    };

    // Cache de elementos para performance
    const DOM = {
        cards: null,
        prefersReducedMotion: null
    };

    // Estado do sistema
    const state = {
        isScrolling: false,
        scrollTimeout: null,
        observers: []
    };

    /**
     * Inicializa o sistema após o DOM estar pronto
     */
    function init() {
        console.log('✅ Teoria das Janelas Quebradas - Sistema Iniciado v2.0');
        
        // Verifica preferência do usuário para animações
        DOM.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        // Cache de elementos
        DOM.cards = document.querySelectorAll('.card:not(.no-animate)');
        
        // Configura eventos
        setupEventListeners();
        
        // Inicia animações se permitido
        if (!DOM.prefersReducedMotion.matches && CONFIG.parallaxEnabled) {
            initAnimations();
        }
        
        // Listener para mudanças em prefers-reduced-motion em tempo real
        DOM.prefersReducedMotion.addEventListener?.('change', (e) => {
            if (e.matches) {
                disableAnimations();
            } else if (CONFIG.parallaxEnabled) {
                initAnimations();
            }
        });

        // Cleanup automático ao descarregar a página
        window.addEventListener('beforeunload', cleanup);
    }

    /**
     * Configura todos os event listeners com throttling
     */
    function setupEventListeners() {
        // Scroll com throttling para performance
        let lastScrollTime = 0;
        
        const handleScroll = (event) => {
            const now = Date.now();
            
            // Throttle: só executa se passou o intervalo mínimo
            if (now - lastScrollTime >= CONFIG.scrollThrottle) {
                lastScrollTime = now;
                onScroll(event);
            }
        };

        // Usa passive: true para melhor performance de scroll
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Resize com debounce para recalcular layouts se necessário
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Recalcula posições se necessário
                if (state.isScrolling) {
                    updateParallax();
                }
            }, 150);
        }, { passive: true });
    }

    /**
     * Inicializa animações de entrada e parallax
     */
    function initAnimations() {
        if (!DOM.cards.length) return;

        // 1. Animação de entrada com Intersection Observer
        initEntranceAnimation();
        
        // 2. Efeito parallax suave ao scroll
        initParallaxEffect();
    }

    /**
     * Animação de entrada dos cards quando entram na viewport
     */
    function initEntranceAnimation() {
        // Verifica se o CSS já está cuidando da animação
        const hasCSSAnimation = window.getComputedStyle(DOM.cards[0]).animationName !== 'none';
        
        if (hasCSSAnimation) {
            console.log('🎨 Usando animações CSS nativas (fadeInUp)');
            return; // CSS já cuida disso, não precisa de JS
        }

        const observerOptions = {
            root: null,
            rootMargin: CONFIG.observerRootMargin,
            threshold: CONFIG.observerThreshold
        };

        const entranceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCardEntrance(entry.target);
                    entranceObserver.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, observerOptions);

        DOM.cards.forEach((card, index) => {
            // Delay escalonado para efeito cascata
            card.style.transitionDelay = `${index * 100}ms`;
            entranceObserver.observe(card);
        });

        state.observers.push(entranceObserver);
    }

    /**
     * Aplica animação de entrada em um card individual
     */
    function animateCardEntrance(card) {
        // Força reflow para garantir que a transição funcione
        card.offsetHeight; // eslint-disable-line no-unused-expressions
        
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Remove estilos inline após animação para não conflitar com :hover
        setTimeout(() => {
            card.style.transition = '';
            card.style.transitionDelay = '';
        }, CONFIG.animationDuration + 100);
    }

    /**
     * Inicializa efeito parallax sutil nos cards
     */
    function initParallaxEffect() {
        // Aplica will-change apenas durante a animação para performance
        DOM.cards.forEach(card => {
            card.style.willChange = 'transform';
        });
    }

    /**
     * Handler principal do scroll com parallax
     */
    function onScroll(event) {
        if (!CONFIG.parallaxEnabled || DOM.prefersReducedMotion.matches) return;
        
        state.isScrolling = true;
        updateParallax();
        
        // Marca fim do scroll após 150ms sem movimento
        clearTimeout(state.scrollTimeout);
        state.scrollTimeout = setTimeout(() => {
            state.isScrolling = false;
            // Remove will-change após parar de rolar para liberar memória
            DOM.cards.forEach(card => {
                card.style.willChange = 'auto';
            });
        }, 150);
    }

    /**
     * Atualiza posição dos cards com efeito parallax
     * Usa transform3d para GPU acceleration
     */
    function updateParallax() {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        
        DOM.cards.forEach((card, index) => {
            // Direção alternada para efeito visual mais interessante
            const direction = index % 2 === 0 ? 1 : -1;
            const offset = scrolled * CONFIG.parallaxStrength * direction;
            
            // Usa translate3d para ativar aceleração por hardware
            // Mantém o hover CSS funcionando ao não sobrescrever totalmente o transform
            const currentTransform = card.dataset.originalTransform || '';
            card.style.transform = `translate3d(0, ${offset}px, 0) ${currentTransform}`;
            
            // Armazena transform base para referência futura
            if (!card.dataset.originalTransform) {
                card.dataset.originalTransform = '';
            }
        });
    }

    /**
     * Desabilita todas as animações para acessibilidade
     */
    function disableAnimations() {
        console.log('♿ Animações desativadas por preferência do usuário');
        
        // Remove efeitos de parallax
        DOM.cards.forEach(card => {
            card.style.transform = '';
            card.style.willChange = '';
            card.style.transition = '';
            card.style.opacity = '';
        });
        
        // Desconecta observers
        state.observers.forEach(observer => observer.disconnect());
        state.observers = [];
        
        CONFIG.parallaxEnabled = false;
    }

    /**
     * Limpa recursos e event listeners (cleanup)
     */
    function cleanup() {
        console.log('🧹 Limpando recursos...');
        
        // Desconecta todos os Intersection Observers
        state.observers.forEach(observer => observer.disconnect());
        state.observers = [];
        
        // Limpa timeouts pendentes
        clearTimeout(state.scrollTimeout);
        
        // Remove estilos inline aplicados
        if (DOM.cards) {
            DOM.cards.forEach(card => {
                card.style.transform = '';
                card.style.opacity = '';
                card.style.transition = '';
                card.style.willChange = '';
                delete card.dataset.originalTransform;
            });
        }
    }

    /**
     * API pública para controle externo (opcional)
     */
    window.TJQ = {
        // Reativa animações manualmente
        enableAnimations: () => {
            if (DOM.prefersReducedMotion.matches) {
                console.warn('⚠️ Animações bloqueadas por preferência do sistema');
                return false;
            }
            CONFIG.parallaxEnabled = true;
            initAnimations();
            return true;
        },
        
        // Desativa animações manualmente
        disableAnimations: disableAnimations,
        
        // Força atualização do parallax (útil após carregamento dinâmico)
        refresh: () => {
            DOM.cards = document.querySelectorAll('.card:not(.no-animate)');
            if (CONFIG.parallaxEnabled && !DOM.prefersReducedMotion.matches) {
                initAnimations();
            }
        },
        
        // Obtém status do sistema
        getStatus: () => ({
            animationsEnabled: CONFIG.parallaxEnabled && !DOM.prefersReducedMotion.matches,
            cardsCount: DOM.cards?.length || 0,
            reducedMotion: DOM.prefersReducedMotion?.matches ?? false
        })
    };

    // Inicializa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
