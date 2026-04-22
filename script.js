/**
 * Script Principal - Teoria das Janelas Quebradas
 * Versão: 2.0 | Corrigida e Otimizada
 * Autor: Erigutemberg Meneses
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚪 Teoria das Janelas Quebradas - Site carregado com sucesso!');

  // ===== 1. Remover Loading Overlay =====
  setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.add('hidden');
    }
  }, 800);

  // ===== 2. Barra de Progresso de Scroll =====
  const progressBar = document.getElementById('progressBar');
  
  function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  }
  
  window.addEventListener('scroll', updateProgressBar);

  // ===== 3. Botão Voltar ao Topo =====
  const backToTopBtn = document.getElementById('backToTop');
  
  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', toggleBackToTop);
  
  backToTopBtn?.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== 4. Menu Mobile Toggle =====
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  navToggle?.addEventListener('click', function() {
    navMenu?.classList.toggle('active');
    const icon = this.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });

  // Fechar menu ao clicar em um link (mobile)
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
      const icon = navToggle?.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  });

  // ===== 5. Navegação Suave para Âncoras =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== 6. Efeito Hover nas Linhas da Tabela =====
  const tableRows = document.querySelectorAll('.application-table tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'rgba(231, 76, 60, 0.08)';
      this.style.transition = 'background-color 0.2s ease';
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
    });
  });

  // ===== 7. Logs de Clique nos Botões PDF =====
  const pdfButtons = document.querySelectorAll('.btn-pdf');
  pdfButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const pdfName = this.textContent.trim();
      console.log(`📄 Abrindo PDF: ${pdfName}`);
      showToast(`📥 Iniciando download: ${pdfName}`);
    });
  });

  // ===== 8. Funções das Ferramentas (Placeholders) =====
  window.abrirCalculadora = function() {
    showToast('🧮 Calculadora de Quóruns: em desenvolvimento');
    console.log('🔧 Abrindo calculadora de quóruns...');
  };
  
  window.abrirChecklist = function() {
    showToast('✅ Checklist de Auditoria: em desenvolvimento');
    console.log('🔧 Abrindo checklist de auditoria...');
  };
  
  window.abrirESG = function() {
    showToast('📊 Dashboard ESG: em desenvolvimento');
    console.log('🔧 Abrindo dashboard ESG...');
  };

  // ===== 9. Sistema de Toast Notifications =====
  function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, duration);
    }
  }
  
  // Expor showToast globalmente para uso externo
  window.showToast = showToast;

  // ===== 10. Mensagem de Boas-vindas no Console =====
  console.log(`
╔══════════════════════════════════════════════════════════╗
║ 🚪 TEORIA DAS JANELAS QUEBRADAS - Condomínios           ║
╠══════════════════════════════════════════════════════════╣
║ "Pequenas desordens levam a grandes problemas."         ║
║ Mantenha o ambiente cuidado para evitar degradação.     ║
║                                                          ║
║ Autor: Erigutemberg Meneses                             ║
║ Site: https://erigutembergmeneses.com.br                ║
║ Licença: CC BY-SA 4.0                                   ║
╚══════════════════════════════════════════════════════════╝
  `);

  // ===== 11. Detecção de Preferência de Tema Escuro =====
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }
  
  initTheme();

  // ===== 12. Persistência de Dados do Checklist (Exemplo) =====
  function saveChecklistProgress(data) {
    try {
      localStorage.setItem('checklist_progress', JSON.stringify(data));
      console.log('✅ Progresso do checklist salvo');
    } catch (e) {
      console.warn('⚠️ Não foi possível salvar progresso:', e);
    }
  }
  
  function loadChecklistProgress() {
    try {
      const saved = localStorage.getItem('checklist_progress');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.warn('⚠️ Não foi possível carregar progresso:', e);
      return null;
    }
  }

});
