document.addEventListener('DOMContentLoaded', () => {
    console.log("Teoria das Janelas Quebradas - Sistema Iniciado");

    // Efeito simples de parallax nos cards ao rolar
    const cards = document.querySelectorAll('.card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        cards.forEach((card, index) => {
            // Move os cards levemente opostos ao scroll para efeito visual
            const speed = index === 0 ? -0.05 : 0.05;
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animação de entrada dos cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
