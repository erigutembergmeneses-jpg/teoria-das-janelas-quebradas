# 🚪 Teoria das Janelas Quebradas — Gestão Condominial

> **Site interativo para síndicos, conselheiros fiscais e gestores condominiais**, aplicando a *Teoria das Janelas Quebradas* (Wilson & Kelling, 1982) à prevenção de degradação ambiental e social em condomínios.

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-181717?logo=github)](https://erigutembergmeneses-jpg.github.io/teoria-das-janelas-quebradas)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)

---

## 📌 Sobre o Projeto

A **Teoria das Janelas Quebradas** postula que sinais visíveis de desordem (como uma janela quebrada não reparada) incentivam comportamentos antissociais e degradação progressiva do ambiente. 

Este projeto adapta essa teoria para o contexto condominial brasileiro, oferecendo:

- ✅ **Fundamentação teórica** acessível e aplicada
- ✅ **Tabela de riscos** com ações preventivas e prazos ideais
- ✅ **Ferramentas interativas** (calculadoras, checklists, dashboard ESG)
- ✅ **Recursos práticos** para síndicos e conselheiros fiscais
- ✅ **Design responsivo** e acessível (mobile-first)

> 🎯 **Objetivo**: Transformar conhecimento acadêmico em ação prática para condomínios mais seguros, sustentáveis e harmoniosos.

---

## ✨ Funcionalidades Implementadas

### 🎨 Design e Experiência do Usuário
- [x] Hero section com imagem de fundo otimizada (`janelas-quebradas-bg.png`)
- [x] Menu de navegação fixo com toggle mobile
- [x] Botão "Voltar ao topo" com animação suave
- [x] Barra de progresso de leitura
- [x] Loading overlay inicial com spinner
- [x] Sistema de notificações toast para feedback
- [x] Suporte a tema escuro/claro com persistência (localStorage)
- [x] Design 100% responsivo (mobile-first)

### 📚 Conteúdo Interativo
- [x] Cards explicativos da teoria com ícones Font Awesome
- [x] Tabela dinâmica de aplicação prática com hover effects
- [x] Links diretos para materiais em PDF (download)

### 🛠️ Ferramentas de Gestão (Placeholders Funcionais)
- [x] **Calculadora de Quóruns**: interface preparada para cálculo de assembleias
- [x] **Checklist de Auditoria**: estrutura para avaliação de 8 pontos críticos
- [x] **Dashboard ESG**: layout para métricas de sustentabilidade condominial

### 💾 Persistência e Acessibilidade
- [x] Salvamento de preferências de tema no localStorage
- [x] Estrutura semântica HTML5 para leitores de tela
- [x] Navegação por teclado com foco visível
- [x] Suporte a `prefers-reduced-motion` para acessibilidade

### 🔗 Integrações Externas
- [x] Google Fonts (Inter + Playfair Display)
- [x] Font Awesome 6 (ícones vetoriais)
- [x] Links para recursos externos (fóruns, vídeos, modelos)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade | Versão |
|------------|-----------|--------|
| **HTML5** | Estrutura semântica | Latest |
| **CSS3** | Estilização com variáveis, Grid, Flexbox | Latest |
| **JavaScript (Vanilla)** | Interatividade sem dependências | ES6+ |
| **Font Awesome** | Ícones vetoriais | 6.4.0 |
| **Google Fonts** | Tipografia web | Inter + Playfair Display |
| **LocalStorage API** | Persistência de preferências | Nativo |

### 🎨 Sistema de Design
```css
:root {
  --color-primary: #2c3e50;    /* Azul escuro profissional */
  --color-secondary: #e74c3c;  /* Vermelho para ações/alertas */
  --color-accent: #3498db;     /* Azul para links e destaque */
  --font-main: 'Inter', sans-serif;
  --font-heading: 'Playfair Display', serif;
}
