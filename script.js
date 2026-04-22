// Script para a página - Teoria das Janelas Quebradas

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚪 Teoria das Janelas Quebradas - Site carregado com sucesso!');
    
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
