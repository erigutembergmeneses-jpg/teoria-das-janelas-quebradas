// Dados iniciais
let scoreESG = 0;
const riscosData = [
    { nome: 'Incêndio', probabilidade: 'Alta', impacto: 'Alto', nivel: 'critica' },
    { nome: 'Inadimplência', probabilidade: 'Média', impacto: 'Médio', nivel: 'moderada' },
    { nome: 'Fraude', probabilidade: 'Média', impacto: 'Alto', nivel: 'critica' },
    { nome: 'Vazamento', probabilidade: 'Média', impacto: 'Baixo', nivel: 'baixa' },
    { nome: 'Acidente', probabilidade: 'Alta', impacto: 'Médio', nivel: 'alta' },
    { nome: 'Multas', probabilidade: 'Baixa', impacto: 'Médio', nivel: 'moderada' }
];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    inicializarGraficos();
    inicializarChecklist();
    inicializarAnimacoes();
});

// Gráficos Chart.js
let energiaChart, aguaChart, reciclagemChart;

function inicializarGraficos() {
    // Gráfico de Energia
    const ctxEnergia = document.getElementById('energiaChart').getContext('2d');
    energiaChart = new Chart(ctxEnergia, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Consumo (kWh)',
                data: [1200, 1150, 1100, 1050, 1000, 950],
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Água
    const ctxAgua = document.getElementById('aguaChart').getContext('2d');
    aguaChart = new Chart(ctxAgua, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Consumo (m³)',
                data: [180, 175, 170, 165, 160, 155],
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Reciclagem
    const ctxReciclagem = document.getElementById('reciclagemChart').getContext('2d');
    reciclagemChart = new Chart(ctxReciclagem, {
        type: 'doughnut',
        data: {
            labels: ['Reciclado', 'Não reciclado'],
            datasets: [{
                data: [45, 55],
                backgroundColor: ['#27ae60', '#e74c3c']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    atualizarMetricas();
}

// Checklist ESG
function inicializarChecklist() {
    const checkboxes = document.querySelectorAll('#esgChecklist input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calcularScoreESG);
    });
}

function calcularScoreESG() {
    const checkboxes = document.querySelectorAll('#esgChecklist input[type="checkbox"]:checked');
    let totalPontos = 0;
    
    checkboxes.forEach(checkbox => {
        totalPontos += parseInt(checkbox.getAttribute('data-pontos'));
    });
    
    scoreESG = totalPontos;
    document.getElementById('checklistScore').textContent = scoreESG;
    document.getElementById('scoreValor').textContent = scoreESG;
    
    // Atualizar barra de score
    const porcentagem = (scoreESG / 100) * 100;
    document.getElementById('scoreFill').style.width = porcentagem + '%';
    
    // Atualizar métricas
    atualizarMetricas();
}

function atualizarMetricas() {
    // Simular atualização de métricas baseada no score
    const energiaBase = 1200 - (scoreESG * 2);
    const aguaBase = 180 - (scoreESG * 0.5);
    const reciclagemBase = 20 + (scoreESG * 0.6);
    
    document.getElementById('energiaValor').textContent = Math.round(energiaBase) + ' kWh';
    document.getElementById('aguaValor').textContent = Math.round(aguaBase) + ' m³';
    document.getElementById('reciclagemValor').textContent = Math.round(reciclagemBase) + '%';
    
    // Atualizar gráficos
    if (energiaChart) {
        energiaChart.data.datasets[0].data = [
            energiaBase * 1.1,
            energiaBase * 1.05,
            energiaBase * 1.02,
            energiaBase * 0.98,
            energiaBase * 0.95,
            energiaBase
        ];
        energiaChart.update();
    }
    
    if (aguaChart) {
        aguaChart.data.datasets[0].data = [
            aguaBase * 1.1,
            aguaBase * 1.05,
            aguaBase * 1.02,
            aguaBase * 0.98,
            aguaBase * 0.95,
            aguaBase
        ];
        aguaChart.update();
    }
    
    if (reciclagemChart) {
        reciclagemChart.data.datasets[0].data = [reciclagemBase, 100 - reciclagemBase];
        reciclagemChart.update();
    }
}

// Calculadora ROI
document.getElementById('roiForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const investimento = parseFloat(document.getElementById('roiInvestimento').value);
    const economia = parseFloat(document.getElementById('roiEconomia').value);
    
    if (investimento && economia) {
        const payback = investimento / economia;
        const retornoAnual = ((economia * 12) / investimento) * 100;
        
        document.getElementById('roiPayback').textContent = payback.toFixed(1);
        document.getElementById('roiRetorno').textContent = retornoAnual.toFixed(1);
        document.getElementById('roiResultado').style.display = 'block';
    }
});

// Calculadora de Quórum
document.getElementById('quorumForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const total = parseInt(document.getElementById('quorumTotal').value);
    const tipo = document.getElementById('quorumTipo').value;
    
    let fracao = 1;
    let percentual = 100;
    
    switch(tipo) {
        case '2/3':
            fracao = 2/3;
            percentual = 66.67;
            break;
        case '1/2':
            fracao = 1/2;
            percentual = 50;
            break;
        case '3/4':
            fracao = 3/4;
            percentual = 75;
            break;
        case 'unanimidade':
            fracao = 1;
            percentual = 100;
            break;
    }
    
    const necessario = Math.ceil(total * fracao);
    
    document.getElementById('quorumNecessario').textContent = necessario;
    document.getElementById('quorumPercentual').textContent = percentual;
    document.getElementById('quorumResultado').style.display = 'block';
});

// Simulador de Responsabilidade
document.getElementById('responsabilidadeForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('respTipo').value;
    const gravidade = document.getElementById('respGravidade').value;
    
    let valorBase = 0;
    let alerta = '';
    
    // Calcular valor baseado no tipo e gravidade
    if (tipo === 'moral') {
        if (gravidade === 'leve') valorBase = 3000;
        else if (gravidade === 'media') valorBase = 8000;
        else if (gravidade === 'grave') valorBase = 20000;
    } else if (tipo === 'material') {
        if (gravidade === 'leve') valorBase = 5000;
        else if (gravidade === 'media') valorBase = 15000;
        else if (gravidade === 'grave') valorBase = 50000;
    } else if (tipo === 'estetico') {
        if (gravidade === 'leve') valorBase = 10000;
        else if (gravidade === 'media') valorBase = 25000;
        else if (gravidade === 'grave') valorBase = 60000;
    }
    
    // Alertas
    if (gravidade === 'grave') {
        alerta = '⚠️ Risco alto de ação judicial. Consulte um advogado imediatamente!';
    } else if (gravidade === 'media') {
        alerta = '⚠️ Recomenda-se buscar orientação jurídica preventiva.';
    } else {
        alerta = '✓ Situação de menor risco, mas ainda requer atenção.';
    }
    
    document.getElementById('respValor').textContent = 'R$ ' + valorBase.toLocaleString('pt-BR');
    document.getElementById('respAlerta').textContent = alerta;
    document.getElementById('responsabilidadeResultado').style.display = 'block';
});

// Plano de Ação
function abrirPlanoAcao(risco) {
    const modal = document.getElementById('modalPlanoAcao');
    const titulo = document.getElementById('modalTitulo');
    const corpo = document.getElementById('modalCorpo');
    
    const planos = {
        incendio: {
            titulo: 'Plano de Ação - Risco de Incêndio',
            acoes: [
                '✅ Verificar validade dos extintores mensalmente',
                '✅ Realizar simulados de evacuação semestrais',
                '✅ Manter saídas de emergência desobstruídas',
                '✅ Instalar detectores de fumaça',
                '✅ Treinar equipe de brigada de incêndio',
                '✅ Revisar instalação elétrica anualmente'
            ]
        },
        inadimplencia: {
            titulo: 'Plano de Ação - Inadimplência',
            acoes: [
                '✅ Enviar boletos com antecedência',
                '✅ Implementar cobrança automatizada',
                '✅ Oferecer opções de parcelamento',
                '✅ Notificar extrajudicialmente após 30 dias',
                '✅ Ajuizar ação de cobrança após 90 dias',
                '✅ Negociar dívidas em assembleias'
            ]
        },
        fraude: {
            titulo: 'Plano de Ação - Prevenção à Fraude',
            acoes: [
                '✅ Implementar conciliação bancária mensal',
                '✅ Exigir duas assinaturas para pagamentos',
                '✅ Realizar auditorias trimestrais',
                '✅ Digitalizar todos os comprovantes',
                '✅ Rotacionar funções administrativas',
                '✅ Canal de denúncias anônimo'
            ]
        }
    };
    
    const plano = planos[risco];
    if (plano) {
        titulo.textContent = plano.titulo;
        corpo.innerHTML = '<ul style="list-style: none; padding: 0;">' + 
            plano.acoes.map(acao => `<li style="padding: 0.75rem; margin: 0.5rem 0; background: #f8f9fa; border-radius: 5px;">${acao}</li>`).join('') + 
            '</ul>';
        modal.style.display = 'block';
    }
}

function fecharModal() {
    document.getElementById('modalPlanoAcao').style.display = 'none';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modalPlanoAcao');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Animações de scroll
function inicializarAnimacoes() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card, .calculadora-card, .ferramenta-card, .recurso-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scroll para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Exportar funções para o escopo global
window.abrirPlanoAcao = abrirPlanoAcao;
window.fecharModal = fecharModal;
