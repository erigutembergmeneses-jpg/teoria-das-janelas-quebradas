// Script para interatividade da página - Teoria das Janelas Quebradas

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚪 Teoria das Janelas Quebradas - Site carregado com sucesso!');
    
    // Adiciona efeito de fade-in nos cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Tooltip interativo nas ilustrações
    const illustrations = document.querySelectorAll('.illustration');
    illustrations.forEach(ill => {
        ill.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        ill.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Log de clique nos botões PDF
    const pdfButtons = document.querySelectorAll('.btn-pdf');
    pdfButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const pdfName = this.textContent.trim();
            console.log(`📄 Abrindo PDF: ${pdfName}`);
        });
    });
    
    // Efeito de destaque nas linhas da tabela
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#fef9e4';
            this.style.transition = 'background-color 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Mensagem no console com informações da teoria
    console.log(`
    ╔══════════════════════════════════════════════════════════╗
    ║   🚪 TEORIA DAS JANELAS QUEBRADAS - Condomínios          ║
    ╠══════════════════════════════════════════════════════════╣
    ║   "Pequenas desordens levam a grandes problemas."       ║
    ║   Mantenha o ambiente cuidado para evitar degradação.   ║
    ╚══════════════════════════════════════════════════════════╝
    `);
});
