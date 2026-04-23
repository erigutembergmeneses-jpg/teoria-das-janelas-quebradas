// Script simples para garantir comportamento interativo e avisos caso PDFs não carreguem
document.addEventListener('DOMContentLoaded', () => {
    console.log('Site: Teoria das Janelas Quebradas — interface carregada.');

    // Verifica se os arquivos PDF estão acessíveis (opcional, apenas aviso amigável no console)
    const pdfs = [
        'Broken Windows (Janelas Quebradas).pdf',
        'teoria-janelas.pdf'
    ];

    pdfs.forEach(pdf => {
        fetch(pdf, { method: 'HEAD', cache: 'no-cache' })
            .then(resp => {
                if (!resp.ok) {
                    console.warn(`⚠️ Arquivo não encontrado ou inacessível: ${pdf}`);
                } else {
                    console.log(`✅ Disponível: ${pdf}`);
                }
            })
            .catch(() => console.warn(`⚠️ Não foi possível acessar: ${pdf}`));
    });

    // Adiciona um pequeno efeito de clique nos cards (feedback tátil)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Evita conflito se clicou dentro de links
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            // Apenas um efeito visual sutil
            card.style.transform = 'scale(0.99)';
            setTimeout(() => {
                card.style.transform = '';
            }, 120);
        });
    });
});


