// script.js
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Detalhes dos cards da Teoria
    const detailBtns = document.querySelectorAll('.detail-btn');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.card');
            const detailId = card.getAttribute('data-detail');
            const detailDiv = document.getElementById(detailId);
            if (detailDiv) {
                detailDiv.classList.toggle('show');
                this.textContent = detailDiv.classList.contains('show') ? '🔼 Clique para fechar' : '🔽 Clique para ver detalhes';
            }
        });
    });

    // 2. Filtro do Mapa de Riscos
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
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. Calculadora de Quórum
    const calcQuorumBtn = document.getElementById('calcQuorum');
    if (calcQuorumBtn) {
        calcQuorumBtn.addEventListener('click', function() {
            const totalUnits = parseInt(document.getElementById('totalUnits')?.value) || 0;
            const presentUnits = parseInt(document.getElementById('presentUnits')?.value) || 0;
            
            if (totalUnits > 0) {
                const quorumNeeded = Math.ceil(totalUnits * 0.5) + 1;
                const percent = (presentUnits / totalUnits) * 100;
                
                document.getElementById('quorumNeeded').textContent = quorumNeeded;
                document.getElementById('quorumPercent').textContent = percent.toFixed(2);
                
                if (presentUnits >= quorumNeeded) {
                    document.getElementById('quorumNeeded').style.color = '#28a745';
                } else {
                    document.getElementById('quorumNeeded').style.color = '#dc3545';
                }
            }
        });
        // Trigger initial calculation
        calcQuorumBtn.click();
    }

    // 4. Simulador de Responsabilidade Civil
    const calcLiabilityBtn = document.getElementById('calcLiability');
    if (calcLiabilityBtn) {
        calcLiabilityBtn.addEventListener('click', function() {
            const damageValue = parseFloat(document.getElementById('damageValue')?.value) || 0;
            const estimate = damageValue * 1.5; // Simples: 50% a mais para custas e honorários
            document.getElementById('liabilityEstimate').textContent = `R$ ${estimate.toFixed(2)}`;
        });
        calcLiabilityBtn.click();
    }

    // 5. Calculadora ROI
    function calculateROI(investimento, economiaMensal) {
        if (economiaMensal <= 0) return { payback: 0, roi: 0 };
        const payback = investimento / economiaMensal;
        const roi = (economiaMensal * 12 / investimento) * 100;
        return { payback: payback.toFixed(1), roi: roi.toFixed(1) };
    }

    const calcROIBtn = document.getElementById('calcROI');
    if (calcROIBtn) {
        calcROIBtn.addEventListener('click', function() {
            const investimento = parseFloat(document.getElementById('investimento')?.value) || 0;
            const economiaMensal = parseFloat(document.getElementById('economiaMensal')?.value) || 0;
            const result = calculateROI(investimento, economiaMensal);
            document.getElementById('payback').textContent = result.payback;
            document.getElementById('roi').textContent = result.roi;
        });
        calcROIBtn.click();
    }

    const calcROI2Btn = document.getElementById('calcROI2');
    if (calcROI2Btn) {
        calcROI2Btn.addEventListener('click', function() {
            const investimento = parseFloat(document.getElementById('investimento2')?.value) || 0;
            const economiaMensal = parseFloat(document.getElementById('economiaMensal2')?.value) || 0;
            const result = calculateROI(investimento, economiaMensal);
            document.getElementById('payback2').textContent = result.payback;
        });
        calcROI2Btn.click();
    }

    // 6. Modal System
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');
    
    function openModal(content) {
        modalBody.innerHTML = content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (closeBtn) closeBtn.onclick = closeModal;
    window.onclick = function(event) {
        if (event.target === modal) closeModal();
    };
    
    // 7. Demo Checklist
    const demoTriggers = document.querySelectorAll('.demo-trigger');
    demoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2>✅ Checklist Digital Demo</h2>
                <div style="margin: 20px 0;">
                    <h3>Auditoria Interna</h3>
                    <label><input type="checkbox"> Atas registradas em livro próprio</label><br>
                    <label><input type="checkbox"> Conciliação bancária mensal</label><br>
                    <label><input type="checkbox"> Contas aprovadas em assembleia</label><br>
                    <label><input type="checkbox"> Documentação fiscal em dia</label><br>
                    <label><input type="checkbox"> Seguros atualizados</label><br>
                    <button onclick="alert('Demo: Checklist salvo!')" style="margin-top:20px; padding:10px 20px; background:#28a745; color:white; border:none; border-radius:5px; cursor:pointer;">Salver Progresso</button>
                </div>
            `);
        });
    });
    
    // 8. Audit Checklist
    const auditTriggers = document.querySelectorAll('.audit-trigger');
    auditTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            let score = 0;
            openModal(`
                <h2>📋 Checklist de Auditoria</h2>
                <div id="audit-checklist">
                    <label><input type="checkbox" class="audit-item"> Contratos formalizados e registrados</label><br>
                    <label><input type="checkbox" class="audit-item"> Notas fiscais arquivadas</label><br>
                    <label><input type="checkbox" class="audit-item"> Extratos bancários conciliados</label><br>
                    <label><input type="checkbox" class="audit-item"> Livro de ocorrências atualizado</label><br>
                    <label><input type="checkbox" class="audit-item"> Seguro em vigor</label><br>
                    <label><input type="checkbox" class="audit-item"> Alvarás e licenças válidos</label><br>
                    <label><input type="checkbox" class="audit-item"> Funcionários registrados</label><br>
                    <label><input type="checkbox" class="audit-item"> Manutenções preventivas realizadas</label><br>
                    <button id="calcScore" style="margin:20px 0; padding:10px 20px; background:#0f3460; color:white; border:none; border-radius:5px; cursor:pointer;">Calcular Pontuação</button>
                    <p>Pontuação: <span id="scoreValue">0</span>/8 (0%)</p>
                </div>
                <script>
                    document.getElementById('calcScore')?.addEventListener('click', function() {
                        const items = document.querySelectorAll('.audit-item');
                        let checked = 0;
                        items.forEach(item => { if(item.checked) checked++; });
                        const percent = (checked/8)*100;
                        document.getElementById('scoreValue').innerHTML = checked + '/8 (' + percent + '%)';
                        if(percent >= 70) alert('✅ Auditoria: Bom desempenho!');
                        else if(percent >= 50) alert('⚠️ Auditoria: Atenção necessária');
                        else alert('❌ Auditoria: Crítico - ação imediata!');
                    });
                <\/script>
            `);
        });
    });
    
    // 9. ESG Dashboard
    const esgTriggers = document.querySelectorAll('.esg-trigger');
    esgTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2>📈 Dashboard ESG Avançado</h2>
                <div>
                    <h3>Ambiental (E)</h3>
                    <p>✅ Consumo de energia: 15% abaixo da média</p>
                    <p>✅ Coleta seletiva implementada</p>
                    <p>⚠️ Uso de água: otimizar</p>
                    <h3>Social (S)</h3>
                    <p>✅ Pesquisa de satisfação: 82%</p>
                    <p>✅ Eventos comunitários realizados</p>
                    <h3>Governança (G)</h3>
                    <p>✅ Conselho fiscal ativo</p>
                    <p>✅ Transparência nas contas</p>
                    <button onclick="alert('Relatório ESG gerado!')" style="margin-top:20px; padding:10px 20px; background:#28a745; color:white; border:none; border-radius:5px; cursor:pointer;">Gerar Relatório Completo</button>
                </div>
            `);
        });
    });
    
    // 10. Risk Map
    const riskTriggers = document.querySelectorAll('.risk-trigger');
    riskTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2>🗺️ Mapa de Riscos Interativo</h2>
                <div style="background:#f8f9fa; padding:20px; border-radius:10px;">
                    <h3>Matriz de Probabilidade x Impacto</h3>
                    <table style="width:100%; border-collapse:collapse;">
                        <tr style="background:#dc3545; color:white;"><th>Risco</th><th>Probabilidade</th><th>Impacto</th><th>Nível</th></tr>
                        <tr><td>Incêndio</td><td>Baixa</td><td>Alto</td><td style="color:#dc3545">Alto</td></tr>
                        <tr><td>Inadimplência</td><td>Média</td><td>Médio</td><td style="color:#ffc107">Médio</td></tr>
                        <tr><td>Fraude</td><td>Baixa</td><td>Alto</td><td style="color:#dc3545">Alto</td></tr>
                        <tr><td>Vazamento</td><td>Média</td><td>Médio</td><td style="color:#ffc107">Médio</td></tr>
                    </table>
                    <button onclick="alert('Plano de ação detalhado enviado por e-mail')" style="margin-top:20px; padding:10px 20px; background:#0f3460; color:white; border:none; border-radius:5px; cursor:pointer;">Baixar Plano de Ação</button>
                </div>
            `);
        });
    });
    
    // 11. Web Regulamento
    const webRegulamento = document.querySelectorAll('.web-regulamento');
    webRegulamento.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(`
                <h2>📜 Regulamento do Conselho Fiscal</h2>
                <div style="max-height: 400px; overflow-y: auto;">
                    <h3>Capítulo I - Da Composição</h3>
                    <p>Art. 1º - O Conselho Fiscal será composto por 3 (três) membros efetivos e 2 (dois) suplentes, eleitos em assembleia geral...</p>
                    <h3>Capítulo II - Das Atribuições</h3>
                    <p>Art. 2º - Compete ao Conselho Fiscal examinar as contas do síndico, emitir parecer e fiscalizar a execução orçamentária...</p>
                    <h3>Capítulo III - Das Reuniões</h3>
                    <p>Art. 3º - O Conselho se reunirá ordinariamente a cada trimestre e extraordinariamente quando convocado...</p>
                </div>
                <button onclick="alert('Regulamento completo disponível para download')" style="margin-top:20px; padding:10px 20px; background:#28a745; color:white; border:none; border-radius:5px; cursor:pointer;">📥 Baixar Regulamento Completo</button>
            `);
        });
    });
    
    // 12. Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // 13. Tooltips para links de download (simulação)
    const downloadLinks = document.querySelectorAll('.download-badge, .legal-item .download-badge, .legal-item .link-badge');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            setTimeout(() => {
                alert('Download simulado: O arquivo seria baixado aqui.\nEm produção, este link apontaria para o arquivo real.');
            }, 100);
        });
    });
    
    // 14. Animações de entrada
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
    
    console.log('✅ Site carregado com todas as ferramentas integradas e funcionais!');
});
