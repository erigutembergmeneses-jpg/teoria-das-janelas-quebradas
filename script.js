// js/script.js
/**
 * Script principal - Teoria das Janelas Quebradas
 * Funcionalidades: Menu mobile, filtros de jurisprudência, modal de download, FAQ, back-to-top
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== MENU MOBILE =====
  const headerToggle = document.querySelector('.header__toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (headerToggle && mainNav) {
    headerToggle.addEventListener('click', () => {
      const isExpanded = headerToggle.getAttribute('aria-expanded') === 'true';
      headerToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
      
      // Animação do hamburger
      const hamburger = headerToggle.querySelector('.hamburger');
      hamburger.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        headerToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // ===== FILTROS DE JURISPRUDÊNCIA =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const jurisCards = document.querySelectorAll('.juris-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualizar estado dos botões
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      // Filtrar cards
      jurisCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // ===== MODAL DE DOWNLOAD =====
  const modal = document.getElementById('download-modal');
  const modalClose = document.querySelector('.modal__close');
  const downloadBtns = document.querySelectorAll('.btn--download');
  const downloadForm = document.getElementById('download-form');
  const resourceNameInput = document.getElementById('resource-name');
  const resourceFormatInput = document.getElementById('resource-format');
  
  // Abrir modal
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const resource = btn.dataset.resource;
      const format = btn.dataset.format;
      
      resourceNameInput.value = resource;
      resourceFormatInput.value = format;
      
      if (modal && typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        // Fallback para navegadores sem suporte a <dialog>
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Fechar modal
  const closeModal = () => {
    if (modal && typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // Fechar ao clicar fora do modal
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  
  // Submit do formulário de download
  if (downloadForm) {
    downloadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = downloadForm.email.value;
      const resource = resourceNameInput.value;
      const format = resourceFormatInput.value;
      
      // Simular envio (substituir por integração real)
      alert(`✅ Link para baixar ${resource}.${format} enviado para ${email}!`);
      
      downloadForm.reset();
      closeModal();
      
      // Aqui você integraria com seu backend ou serviço de e-mail
      // Ex: fetch('/api/download', { method: 'POST', body: JSON.stringify({ email, resource, format }) })
    });
  }
  
  // ===== FAQ - ACCORDION =====
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      // Fechar outros itens ao abrir um (opcional)
      faqItems.forEach(other => {
        if (other !== item && other.open) {
          other.open = false;
        }
      });
    });
  });
  
  // ===== BOTÃO VOLTAR AO TOPO =====
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    const toggleBackToTop = () => {
      const scrollY = window.scrollY;
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Verificar posição inicial
    toggleBackToTop();
  }
  
  // ===== SCROLL SUAVE PARA ÂNCORAS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== FORMULÁRIO DE NEWSLETTER =====
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.email.value;
      
      // Simular inscrição
      alert(`✅ Obrigado! Você receberá atualizações em ${email}`);
      
      newsletterForm.reset();
      
      // Integrar com serviço de e-mail marketing aqui
    });
  }
  
  // ===== LAZY LOADING PARA IMAGENS =====
  if ('loading' in HTMLImageElement.prototype) {
    // Navegador suporta loading="lazy" nativo
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback com Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
  
  // ===== ANIMAÇÃO AO SCROLL (Intersection Observer) =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Aplicar animação a seções e cards
  document.querySelectorAll('.section, .resource-card, .juris-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    scrollObserver.observe(el);
  });
  
});

// ===== UTILITÁRIOS =====

/**
 * Debounce para otimizar eventos de scroll/resize
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Formatador de data para exibição
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}
