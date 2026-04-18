// script.js
document.addEventListener('DOMContentLoaded', function() {
    
    // Hide loading overlay
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('hide');
    }, 500);
    
    // Progress bar on scroll
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progressBar').style.width = scrolled + '%';
    });
    
    // Sticky Menu
    const stickyMenu = document.getElementById('stickyMenu');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            stickyMenu.classList.add('show');
        } else {
            stickyMenu.classList.remove('show');
        }
        lastScroll = currentScroll;
    });
    
    // Back to Top
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
    
    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link, .btn-primary, .btn-secondary').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    navLinks.classList.remove('show');
                }
            }
        });
    });
    
    // Detail buttons for theory cards
    const detailBtns = document.querySelectorAll('.detail-btn');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.card');
            const detailDiv = card.querySelector('.detail-content');
            if (detailDiv) {
                detailDiv.classList.toggle('show');
                this.innerHTML = detailDiv.classList.contains('show') ? 
                    '<i class="fas fa-chevron-up"></i> Clique para fechar' : 
                    '<i class="fas fa-chevron-down"></i> Clique para ver detalhes';
            }
        });
    });
    
    // Risk filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const riskCards = document.querySelectorAll('.risk-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-risk');
            riskCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-risk-level') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Matrix cell click
    const matrixCells = document.querySelectorAll('.matrix-cell');
    matrixCells.forEach(cell => {
        cell.addEventListener('click', function() {
            const riskName = this.getAttribute('data-risk');
            if (riskName) {
                const targetCard = document.querySelector(`.risk-card[data-risk-name="${riskName}"]`);
                if (targetCard) {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetCard.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        targetCard.style.transform = '';
                    }, 1000);
                }
            }
        });
    });
    
    // Quorum Calculator
    const calcQuorumBtn = document.getElementById('calcQuorum');
    if (calcQuorumBtn) {
        calcQuorumBtn.addEventListener('click', function() {
            const totalUnits = parseInt(document.getElementById('totalUnits')?.value) || 0;
            const presentUnits = parseInt(document.getElementById('presentUnits')?.value) || 0;
            const assemblyType = document.getElementById('assemblyType')?.value;
            
            if (totalUnits > 0) {
                let quorumNeeded;
                if (assemblyType === 'first') {
                    quorumNeeded = Math.ceil(totalUnits * 2 / 3);
                } else {
                    quorumNeeded = Math.ceil(totalUnits / 2) + 1;
                }
                const percent = (presentUnits / totalUnits) * 100;
                
                document.getElementById('quorumNeeded').textContent = quorumNeeded;
                document.getElementById('quorumPercent').textContent = percent.toFixed(2);
                
                const resultSpan = document.getElementById('quorumNeeded');
                if (presentUnits >= quorumNeeded) {
                    resultSpan.style.color = 'var(--success)';
                    showToast('✅ Quórum atingido! Assembleia pode deliberar.');
                } else {
                    resultSpan.style.color = 'var(--danger)';
                    showToast('⚠️ Quórum não atingido. Necessário mais unidades presentes.');
                }
            }
        });
        calcQuorumBtn.click();
    }
    
    // Liability Simulator
    const calcLiabilityBtn = document.getElementById('calcLiability');
    const riskFactorSlider = document.getElementById('riskFactor');
    if (calcLiabilityBtn) {
        const updateLiability = () => {
            const damageValue = parseFloat(document.getElementById('damageValue')?.value) || 0;
            const riskFactor = parseFloat(riskFactorSlider?.value) || 1;
            const estimate = damageValue * riskFactor;
            document.getElementById('liabilityEstimate').textContent = `R$ ${estimate.toFixed(2)}`;
        };
        calcLiabilityBtn.addEventListener('click', updateLiability);
        if (riskFactorSlider) {
            riskFactorSlider.addEventListener('input', updateLiability);
        }
        updateLiability();
    }
    
    // ROI Calculator
    function calculateROI(investimento, economiaMensal, custoMensal = 0) {
        const economiaReal = economiaMensal - custoMensal;
        if (economiaReal <= 0) return { payback: 0, roi: 0 };
        const payback = investimento / economiaReal;
        const roi = (economiaReal * 12 / investimento) * 100;
        return { payback: payback.toFixed(1), roi: roi.toFixed(1) };
    }
    
    const calcROIBtn = document.getElementById('calcROI');
    if (calcROIBtn) {
        calcROIBtn.addEventListener('click', function() {
            const investimento = parseFloat(document.getElementById('investimento')?.value) || 0;
            const economiaMensal = parseFloat(document.getElementById('economiaMensal')?.value) || 0;
            const custoMensal = parseFloat(document.getElementById('custoMensal')?.value) || 0;
            const result = calculateROI(investimento, economiaMensal, custoMensal);
            document.getElementById('payback').textContent = result.payback;
            document.getElementById('roi').textContent = result.roi;
            showToast(`💰 ROI calculado: ${result.roi}% ao ano`);
        });
        calcROIBtn.click();
    }
    
    const calcROI2Btn = document.getElementById('calcROI2');
    if (calcROI2Btn) {
        calcROI2Btn.addEventListener('click', function() {
            const investimento = parseFloat(document.getElementById('investimento2')?.value) || 0;
            const economiaMensal = parseFloat(document.getElementById('economiaMensal2')?.value) || 0;
            const result = calculateROI(investimento, economiaMensal, 0);
            document.getElementById('payback2').textContent = result.payback;
        });
        calcROI2Btn.click();
    }
    
    // Modal System
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');
    
    function openModal(content) {
        modalBody.innerHTML = content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Re-attach any scripts in modal
        const scripts = modalBody.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            newScript.textContent = oldScript.textContent;
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (closeBtn) closeBtn.onclick = closeModal;
    window.onclick = function(event) {
        if (event.target === modal) closeModal();
    };
    
    function showToast(message, duration = 3000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
    
    // Tool triggers
    const demoTriggers = document.querySelectorAll('.demo-trigger');
    demoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2><i class="fas fa-clipboard-list"></i> Checklist Digital Demo</h2>
                <div style="margin: 20px 0;">
                    <h3>Auditoria Interna - Demo</h3>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="demo-item"> Atas registradas em livro próprio</label>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="demo-item"> Conciliação bancária mensal</label>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="demo-item"> Contas aprovadas em assembleia</label>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="demo-item"> Documentação fiscal em dia</label>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="demo-item"> Seguros atualizados</label>
                    <button id="saveDemoChecklist" style="margin-top:20px; padding:10px 20px; background:var(--success); color:white; border:none; border-radius:5px; cursor:pointer;"><i class="fas fa-save"></i> Salvar Progresso</button>
                    <p id="demoProgress" style="margin-top:10px; font-weight:bold;"></p>
                </div>
                <script>
                    const savedDemo = localStorage.getItem('demoChecklist');
                    if(savedDemo) {
                        const items = JSON.parse(savedDemo);
                        document.querySelectorAll('.demo-item').forEach((item, index) => {
                            item.checked = items[index];
                        });
                    }
                    document.getElementById('saveDemoChecklist')?.addEventListener('click', () => {
                        const items = Array.from(document.querySelectorAll('.demo-item')).map(cb => cb.checked);
                        localStorage.setItem('demoChecklist', JSON.stringify(items));
                        const checked = items.filter(Boolean).length;
                        document.getElementById('demoProgress').innerHTML = '✅ Progresso salvo! (' + checked + '/5 concluídos)';
                        showToast('Checklist salvo com sucesso!');
                    });
                    const checkedCount = Array.from(document.querySelectorAll('.demo-item')).filter(cb => cb.checked).length;
                    document.getElementById('demoProgress').innerHTML = 'Progresso: ' + checkedCount + '/5';
                <\/script>
            `);
        });
    });
    
    const auditTriggers = document.querySelectorAll('.audit-trigger');
    auditTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2><i class="fas fa-clipboard-check"></i> Checklist de Auditoria</h2>
                <div id="audit-checklist">
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="audit-item"> Contratos formalizados e registrados</label>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="audit-item"> Notas fiscais arquivadas</label>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="audit-item"> Extratos bancários conciliados</label>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="audit-item"> Livro de ocorrências atualizado</label>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="audit-item"> Seguro em vigor</label>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="audit-item"> Alvarás e licenças válidos</label>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="audit-item"> Funcionários registrados</label>
                    <label style="display: block; margin: 10px 0;"><input type="checkbox" class="audit-item"> Manutenções preventivas realizadas</label>
                    <button id="calcAuditScore" style="margin:20px 0; padding:10px 20px; background:var(--primary); color:white; border:none; border-radius:5px; cursor:pointer;"><i class="fas fa-chart-line"></i> Calcular Pontuação</button>
                    <p>Pontuação: <span id="auditScoreValue">0</span>/8 (<span id="auditPercent">0</span>%)</p>
                </div>
                <script>
                    const savedAudit = localStorage.getItem('auditChecklist');
                    if(savedAudit) {
                        const items = JSON.parse(savedAudit);
                        document.querySelectorAll('.audit-item').forEach((item, index) => {
                            item.checked = items[index];
                        });
                    }
                    function updateAuditScore() {
                        const items = document.querySelectorAll('.audit-item');
                        let checked = 0;
                        items.forEach(item => { if(item.checked) checked++; });
                        const percent = (checked/8)*100;
                        document.getElementById('auditScoreValue').innerHTML = checked;
                        document.getElementById('auditPercent').innerHTML = percent.toFixed(0);
                        localStorage.setItem('auditChecklist', JSON.stringify(Array.from(items).map(cb => cb.checked)));
                        if(percent >= 70) showToast('✅ Auditoria: Bom desempenho!');
                        else if(percent >= 50) showToast('⚠️ Auditoria: Atenção necessária');
                        else showToast('❌ Auditoria: Crítico - ação imediata!');
                    }
                    document.getElementById('calcAuditScore')?.addEventListener('click', updateAuditScore);
                    updateAuditScore();
                <\/script>
            `);
        });
    });
    
    const esgTriggers = document.querySelectorAll('.esg-trigger');
    esgTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2><i class="fas fa-chart-line"></i> Dashboard ESG Avançado</h2>
                <div>
                    <h3><i class="fas fa-leaf"></i> Ambiental (E)</h3>
                    <div class="progress-bar" style="width:85%; margin:10px 0;">✅ Consumo de energia: 15% abaixo da média</div>
                    <div class="progress-bar" style="width:70%; margin:10px 0;">✅ Coleta seletiva implementada</div>
                    <div class="progress-bar" style="width:45%; margin:10px 0;">⚠️ Uso de água: otimizar</div>
                    <h3><i class="fas fa-users"></i> Social (S)</h3>
                    <div class="progress-bar" style="width:82%; margin:10px 0;">✅ Pesquisa de satisfação: 82%</div>
                    <div class="progress-bar" style="width:60%; margin:10px 0;">✅ Eventos comunitários realizados</div>
                    <h3><i class="fas fa-building"></i> Governança (G)</h3>
                    <div class="progress-bar" style="width:90%; margin:10px 0;">✅ Conselho fiscal ativo</div>
                    <div class="progress-bar" style="width:85%; margin:10px 0;">✅ Transparência nas contas</div>
                    <button onclick="showToast('Relatório ESG gerado com sucesso!')" style="margin-top:20px; padding:10px 20px; background:var(--success); color:white; border:none; border-radius:5px; cursor:pointer;"><i class="fas fa-download"></i> Gerar Relatório Completo</button>
                </div>
            `);
        });
    });
    
    const riskTriggers = document.querySelectorAll('.risk-trigger');
    riskTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2><i class="fas fa-map"></i> Mapa de Riscos Interativo</h2>
                <div style="background:var(--light); padding:20px; border-radius:10px;">
                    <h3>Matriz de Probabilidade x Impacto</h3>
                    <div class="matrix-container" style="display:table; width:100%;">
                        <div style="display:table-row; background:var(--primary); color:white;">
                            <div style="display:table-cell; padding:10px;">Risco</div>
                            <div style="display:table-cell; padding:10px;">Probabilidade</div>
                            <div style="display:table-cell; padding:10px;">Impacto</div>
                            <div style="display:table-cell; padding:10px;">Nível</div>
                        </div>
                        <div style="display:table-row;">
                            <div style="display:table-cell; padding:8px;">Incêndio</div>
                            <div style="display:table-cell; padding:8px;">Baixa</div>
                            <div style="display:table-cell; padding:8px;">Alto</div>
                            <div style="display:table-cell; padding:8px; color:var(--danger);">Alto</div>
                        </div>
                        <div style="display:table-row;">
                            <div style="display:table-cell; padding:8px;">Inadimplência</div>
                            <div style="display:table-cell; padding:8px;">Média</div>
                            <div style="display:table-cell; padding:8px;">Médio</div>
                            <div style="display:table-cell; padding:8px; color:var(--warning);">Médio</div>
                        </div>
                        <div style="display:table-row;">
                            <div style="display:table-cell; padding:8px;">Fraude</div>
                            <div style="display:table-cell; padding:8px;">Baixa</div>
                            <div style="display:table-cell; padding:8px;">Alto</div>
                            <div style="display:table-cell; padding:8px; color:var(--danger);">Alto</div>
                        </div>
                    </div>
                    <button onclick="showToast('Plano de ação detalhado enviado por e-mail')" style="margin-top:20px; padding:10px 20px; background:var(--primary); color:white; border:none; border-radius:5px; cursor:pointer;"><i class="fas fa-download"></i> Baixar Plano de Ação</button>
                </div>
            `);
        });
    });
    
    const webRegulamento = document.querySelectorAll('.web-regulamento');
    webRegulamento.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2><i class="fas fa-file-contract"></i> Regulamento do Conselho Fiscal</h2>
                <div style="max-height: 400px; overflow-y: auto;">
                    <h3>Capítulo I - Da Composição</h3>
                    <p>Art. 1º - O Conselho Fiscal será composto por 3 (três) membros efetivos e 2 (dois) suplentes, eleitos em assembleia geral para mandato de 1 (um) ano, permitida a reeleição.</p>
                    <p>Art. 2º - Os membros do Conselho Fiscal deverão ser condôminos ou representantes legais de condôminos pessoas jurídicas.</p>
                    <h3>Capítulo II - Das Atribuições</h3>
                    <p>Art. 3º - Compete ao Conselho Fiscal examinar as contas do síndico, emitir parecer e fiscalizar a execução orçamentária.</p>
                    <p>Art. 4º - O Conselho deverá se reunir ordinariamente a cada trimestre e extraordinariamente quando convocado.</p>
                    <h3>Capítulo III - Das Vedações</h3>
                    <p>Art. 5º - É vedado aos membros do Conselho Fiscal exercer qualquer função executiva na administração do condomínio.</p>
                </div>
                <button onclick="showToast('Regulamento completo disponível para download')" style="margin-top:20px; padding:10px 20px; background:var(--success); color:white; border:none; border-radius:5px; cursor:pointer;"><i class="fas fa-download"></i> Baixar Regulamento Completo</button>
            `);
        });
    });
    
    const legalTriggers = document.querySelectorAll('.legal-trigger');
    legalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const docType = this.getAttribute('data-doc');
            let title = '', content = '';
            switch(docType) {
                case 'regulamento':
                    title = 'Regulamento do Conselho Fiscal - Modelo .docx';
                    content = '<p>Documento editável em Word com todas as cláusulas necessárias para o bom funcionamento do Conselho Fiscal.</p><button onclick="showToast(\'Download iniciado!\')" style="margin-top:20px; padding:10px 20px; background:var(--success); color:white; border:none; border-radius:5px; cursor:pointer;"><i class="fas fa-download"></i> Baixar Arquivo</button>';
                    break;
                case 'regulamento-web':
                    title = 'Regulamento Web - Versão Online';
                    content = '<p>Acesse o regulamento completo online para consulta rápida.</p><a href="#" class="tool-link" style="display:inline-block; margin-top:20px;">Acessar Online →</a>';
                    break;
                case 'conciliacao':
                    title = 'Planilha de Conciliação Bancária';
                    content = '<p>Planilha Excel automatizada para conciliação bancária mensal.</p><button onclick="showToast(\'Download iniciado!\')" style="margin-top:20px; padding:10px 20px; background:var(--success); color:white; border:none; border-radius:5px; cursor:pointer;"><i class="fas fa-download"></i> Baixar Planilha</button>';
                    break;
                case 'base-legal':
                    title = 'Base Legal Completa';
                    content = '<p>Compilação completa do Código Civil e legislação pertinente à administração condominial.</p><button onclick="showToast(\'Download iniciado!\')" style="margin-top:20px; padding:10px 20px; background:var(--success); color:white; border:none; border-radius:5px; cursor:pointer;"><i class="fas fa-download"></i> Baixar Compilação</button>';
                    break;
            }
            openModal(`<h2><i class="fas fa-file"></i> ${title}</h2>${content}`);
        });
    });
    
    const supportTriggers = document.querySelectorAll('.support-trigger');
    supportTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2><i class="fab fa-whatsapp"></i> Suporte Especializado</h2>
                <p>Entre em contato conosco para tirar dúvidas técnicas sobre as ferramentas.</p>
                <button onclick="window.open('https://wa.me/5511999999999', '_blank')" style="margin-top:20px; padding:10px 20px; background:#25D366; color:white; border:none; border-radius:5px; cursor:pointer;"><i class="fab fa-whatsapp"></i> Falar no WhatsApp</button>
            `);
        });
    });
    
    const videoTriggers = document.querySelectorAll('.video-trigger, .video-balancete-trigger');
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2><i class="fas fa-video"></i> Vídeo Tutorial</h2>
                <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
                </div>
            `);
        });
    });
    
    const libraryTriggers = document.querySelectorAll('.library-trigger');
    libraryTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2><i class="fas fa-folder-open"></i> Biblioteca de Modelos</h2>
                <div style="display:grid; gap:15px;">
                    <a href="#" class="legal-item" onclick="showToast('Download de modelo de Ata')" style="display:flex; justify-content:space-between; align-items:center; padding:15px; background:var(--light); border-radius:10px; text-decoration:none; color:var(--dark);">
                        <span><i class="fas fa-file-word"></i> Modelo de Ata de Assembleia</span>
                        <span class="download-badge"><i class="fas fa-download"></i> Download</span>
                    </a>
                    <a href="#" class="legal-item" onclick="showToast('Download de modelo de Notificação')" style="display:flex; justify-content:space-between; align-items:center; padding:15px; background:var(--light); border-radius:10px; text-decoration:none; color:var(--dark);">
                        <span><i class="fas fa-file-pdf"></i> Modelo de Notificação Extrajudicial</span>
                        <span class="download-badge"><i class="fas fa-download"></i> Download</span>
                    </a>
                    <a href="#" class="legal-item" onclick="showToast('Download de planilha de controle financeiro')" style="display:flex; justify-content:space-between; align-items:center; padding:15px; background:var(--light); border-radius:10px; text-decoration:none; color:var(--dark);">
                        <span><i class="fas fa-file-excel"></i> Planilha de Controle Financeiro</span>
                        <span class="download-badge"><i class="fas fa-download"></i> Download</span>
                    </a>
                </div>
            `);
        });
    });
    
    const legislativeTriggers = document.querySelectorAll('.legislative-trigger');
    legislativeTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2><i class="fas fa-newspaper"></i> Atualizações Legislativas 2025/2026</h2>
                <div>
                    <div class="risk-card" style="margin-bottom:15px;">
                        <h3>Reforma Tributária - IBS/CBS</h3>
                        <p>Principais impactos para condomínios:</p>
                        <ul>
                            <li>Alíquota padrão prevista: 26,5%</li>
                            <li>Redução de 30% para serviços de condomínio</li>
                            <li>Implementação: 2026</li>
                        </ul>
                    </div>
                    <div class="risk-card">
                        <h3>Lei Geral de Proteção de Dados (LGPD)</h3>
                        <p>Orientações para condomínios:</p>
                        <ul>
                            <li>Nomeação de encarregado (DPO)</li>
                            <li>Política de privacidade para moradores</li>
                            <li>Base legal para tratamento de dados</li>
                        </ul>
                    </div>
                    <button onclick="showToast('Assinatura para newsletter realizada!')" style="margin-top:20px; padding:10px 20px; background:var(--primary); color:white; border:none; border-radius:5px; cursor:pointer;"><i class="fas fa-bell"></i> Receber atualizações</button>
                </div>
            `);
        });
    });
    
    const conciliationTriggers = document.querySelectorAll('.conciliation-trigger');
    conciliationTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2><i class="fas fa-file-invoice-dollar"></i> Conciliação Bancária</h2>
                <div>
                    <p>A conciliação bancária é o processo de comparação entre os registros financeiros do condomínio e os extratos bancários.</p>
                    <h3>Passo a passo:</h3>
                    <ol style="margin:20px 0 20px 20px;">
                        <li>Obtenha o extrato bancário do mês</li>
                        <li>Registre todas as despesas e receitas no livro caixa</li>
                        <li>Compare cada lançamento</li>
                        <li>Identifique divergências e ajuste</li>
                        <li>Documente as conciliações mensais</li>
                    </ol>
                    <button onclick="showToast('Planilha de conciliação baixada!')" style="margin-top:20px; padding:10px 20px; background:var(--success); color:white; border:none; border-radius:5px; cursor:pointer;"><i class="fas fa-download"></i> Baixar Planilha de Conciliação</button>
                </div>
            `);
        });
    });
    
    // Tooltip functionality
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
            this.addEventListener('mouseleave', () => tooltip.remove());
        });
    });
    
    // Download simulation for all download buttons
    document.querySelectorAll('.download-badge, .legal-item .download-badge, [onclick*="showToast"]').forEach(el => {
        if (el.getAttribute('onclick') && el.getAttribute('onclick').includes('showToast')) return;
        el.addEventListener('click', function(e) {
            if (this.tagName === 'A' && this.getAttribute('href') === '#') {
                e.preventDefault();
                showToast('📥 Download simulado: O arquivo estaria disponível aqui.');
            }
        });
    });
    
    console.log('✅ Site carregado com todas as melhorias implementadas!');
});

// Global function for PDF generation
function generatePDF(riskName) {
    const riskNames = {
        incendio: 'Incêndio',
        inadimplencia: 'Inadimplência',
        fraude: 'Fraude',
        vazamento: 'Vazamento',
        colapso: 'Colapso',
        acidente: 'Acidente'
    };
    showToast(`📄 Gerando PDF do Plano de Ação para ${riskNames[riskName] || riskName}...`);
    setTimeout(() => {
        showToast(`✅ PDF gerado! O download começará em breve.`);
    }, 1500);
}
