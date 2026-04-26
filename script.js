// Recursos disponíveis
const resources = {
    pdf1: {
        title: 'Artigo Original - Broken Windows',
        text: 'Acesse o artigo completo "Broken Windows" de James Q. Wilson e George L. Kelling, que originou a teoria das janelas quebradas em 1982.',
        url: 'Broken Windows (Janelas Quebradas).pdf',
        icon: 'fa-file-pdf'
    },
    pdf2: {
        title: 'Teoria Ilustrada',
        text: 'Material ilustrado explicando de forma prática como a teoria das janelas quebradas se aplica aos condomínios.',
        url: 'teoria-janelas.pdf',
        icon: 'fa-book-open'
    },
    external: {
        title: 'Ferramentas de Gestão',
        text: 'Acesse ferramentas práticas de gestão condominial para implementação da teoria no seu condomínio.',
        url: 'https://erigutembergmeneses-jpg.github.io/busca-livro-condominio',
        icon: 'fa-external-link-alt'
    },
    about: {
        title: 'Aplicação Prática',
        text: 'A teoria das janelas quebradas aplicada a condomínios sugere que pequenos problemas não resolvidos (como lixo acumulado, graffiti, áreas descuidadas) criam um ambiente que incentiva problemas maiores. Manter a ordem e o cuidado com detalhes previne deterioração do ambiente condominial.',
        url: null,
        icon: 'fa-shield-alt'
    }
};

// Animação de entrada dos cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });

    // Efeito de parallax no escudo
    const shield = document.querySelector('.shield-container');
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        shield.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
});

// Função para abrir recursos
function openResource(resourceKey) {
    const resource = resources[resourceKey];
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalAction = document.getElementById('modal-action');
    const modalIcon = document.querySelector('.modal-icon');

    modalTitle.textContent = resource.title;
    modalText.textContent = resource.text;
    modalIcon.className = `fas ${resource.icon} modal-icon`;

    if (resource.url) {
        modalAction.textContent = 'Acessar Agora';
        modalAction.onclick = () => {
            if (resourceKey === 'external') {
                window.open(resource.url, '_blank');
            } else {
                window.open(resource.url, '_blank');
            }
            closeModal();
        };
        modalAction.style.display = 'inline-block';
    } else {
        modalAction.style.display = 'none';
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Efeito de digitação no subtítulo
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicializar efeito de digitação após carregamento
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.subtitle');
    const originalText = subtitle.textContent;
    setTimeout(() => {
        typeWriter(subtitle, originalText, 30);
    }, 1000);
});

// Animação de contagem para estatísticas
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value + (obj.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observar estatísticas para animar
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = parseInt(stat.textContent);
                const suffix = stat.textContent.includes('%') ? '%' : '';
                stat.dataset.suffix = suffix;
                animateValue(stat, 0, finalValue, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Adicionar efeito de brilho ao mover mouse nos cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = card.querySelector('.card-glow');
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.15) 0%, transparent 70%)`;
    });
    
    card.addEventListener('mouseleave', () => {
        const glow = card.querySelector('.card-glow');
        glow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)';
    });
});

console.log('🛡️ Teoria das Janelas Quebradas - Site carregado com sucesso!');
