# Interface de Transmissão e Armazenamento de Mensagens

Este projeto consiste em uma ferramenta web profissional desenvolvida exclusivamente para a composição, manipulação e cópia rápida de blocos de texto e mensagens. O design foi concebido sob princípios minimalistas, focando na eficiência do fluxo de trabalho e na total eliminação de elementos visuais distrativos.

## Funcionalidades Principais

* **Área de Texto Otimizada:** Campo de entrada com tipografia de alta legibilidade para redação e revisão de conteúdos de qualquer extensão.
* **Mecanismo de Cópia Integrado:** Botão de ação direta conectado à API nativa de área de transferência (Clipboard API) do navegador.
* **Interface Corporativa:** Estilização em modo escuro (Dark Mode) baseada na paleta de cores Slate e Zinc, reduzindo a fadiga ocular em uso prolongado.
* **Ícones Vetoriais Nativos:** Utilização de elementos SVG puros incorporados diretamente no código, dispensando o carregamento de pacotes externos e garantindo máxima performance.
* **Notificação de Confirmação:** Sistema interno de aviso estilo toast para validação imediata da cópia do texto sem interrupções.

## Arquitetura Tecnológica

O sistema utiliza padrões modernos de desenvolvimento web sem a necessidade de frameworks ou dependências externas:

* **HTML5:** Estrutura semântica e acessível.
* **CSS3:** Estilização modular com variáveis globais e transições suaves de estado (foco e alternância).
* **JavaScript (ES6+):** Processamento lógico assíncrono para manipulação de eventos e transferência de dados.

## Estrutura de Arquivos

```text
├── index.html       # Estrutura de marcação e ícones SVG
├── style.css        # Identidade visual, tipografia e animações
└── script.js        # Lógica de controle e gerenciamento da área de transferência
