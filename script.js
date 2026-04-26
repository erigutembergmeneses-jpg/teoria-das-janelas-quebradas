// Recursos disponíveis
const resources = {
    pdf1: {
        title: 'Artigo Original - Broken Windows',
        text: 'Acesse o artigo completo "Broken Windows" de James Q. Wilson e George L. Kelling, que originou a teoria das janelas quebradas em 1982.',
        url: 'Broken%20 Windows%20(Janelas%20Quebradas).pdf',
        icon: 'fa-file-pdf',
        type: 'pdf'
    },
    pdf2: {
        title: 'Teoria Ilustrada',
        text: 'Material ilustrado explicando de forma prática como a teoria das janelas quebradas se aplica aos condomínios.',
        url: 'teoria-janelas.pdf',
        icon: 'fa-book-open',
        type: 'pdf'
    },
    external: {
        title: 'Ferramentas de Gestão',
        text: 'Acesse ferramentas práticas de gestão condominial para implementação da teoria no seu condomínio.',
        url: 'https://erigutembergmeneses-jpg.github.io/conselho-fiscal-condominio-das-contas',
        icon: 'fa-cog',
        type: 'external'
    },
    about: {
        title: 'Busque qualquer palavra ou assunto dentro do livro',
        text: 'Bem-vindo à busca inteligente!\n229 páginas indexadas e prontas para consulta.\n\nDigite qualquer palavra ou assunto no campo acima e encontre trechos exatos do livro.',
        url: 'https://erigutembergmeneses-jpg.github.io/busca-livro-condominio',
        icon: 'fa-search',
        type: 'external'
    },
    // ➕ NOVO RECURSO: Coletânea de Anexos
    anexos: {
        title: 'Coletânea de Anexos',
        text: 'Checklists, roteiros, modelos de parecer, cláusulas LGPD, matriz de riscos e ferramentas práticas para governança condominial baseada na Teoria das Janelas Quebradas. Material auditável e juridicamente defensável.',
        url: 'coletanea-anexos.pdf',
        icon: 'fa-clipboard-list',
        type: 'pdf'
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

    // Efeito de parallax na imagem do escudo
    const shield = document.querySelector('.vigilante-shield');
    if (shield) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            shield.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }
});

// Função para abrir recursos
function openResource(resourceKey) {
    const resource = resources[resourceKey];
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalAction = document.getElementById('modal-action');
    const modalIcon = document.querySelector('.modal-icon');

    // Verifica se o recurso existe
    if (!resource) {
        console.error(`Recurso não encontrado: ${resourceKey}`);
        modalTitle.textContent = 'Recurso Indisponível';
        modalText.textContent = 'Este recurso não foi encontrado ou está em manutenção.';
        modalIcon.className = 'fas fa-exclamation-triangle modal-icon';
        modalAction.style.display = 'none';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        return;
    }

    modalTitle.textContent = resource.title;
    modalText.textContent = resource.text;
    modalIcon.className = `fas ${resource.icon} modal-icon`;

    if (resource.url) {
        // Define texto do botão conforme o tipo de recurso
        if (resource.type === 'pdf') {
            modalAction.textContent = 'Baixar PDF';
        } else {
            modalAction.textContent = 'Acessar Agora';
        }
        
        modalAction.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            try {
                if (resource.type === 'external') {
                    // Links externos abrem em nova aba
                    window.open(resource.url, '_blank', 'noopener,noreferrer');
                } else {
                    // PDFs: tenta abrir em nova aba
                    const pdfWindow = window.open(resource.url, '_blank', 'noopener,noreferrer');
                    
                    // Fallback: se o navegador bloquear o popup, tenta na mesma aba
                    if (!pdfWindow || pdfWindow.closed || typeof pdfWindow.closed === 'undefined') {
                        window.location.href = resource.url;
                    }
                }
                closeModal();
            } catch (error) {
                console.error('Erro ao abrir recurso:', error);
                modalText.textContent = 'Não foi possível abrir o recurso. Tente novamente ou verifique seu bloqueador de pop-ups.';
            }
        };
        modalAction.style.display = 'inline-block';
        modalAction.style.cursor = 'pointer';
    } else {
        modalAction.style.display = 'none';
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Garante que o modal esteja visível
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Fechar modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.style.opacity = '0';
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

// Adicionar efeito de brilho ao mover mouse nos cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.15) 0%, transparent 70%)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)';
        }
    });
});

console.log('🛡️ Teoria das Janelas Quebradas - Site carregado com sucesso!');
