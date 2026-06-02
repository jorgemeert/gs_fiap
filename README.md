# 🚀 OrbitFlow
> **Global Solution — Web Development & Front-end Design | FIAP**

🔗 **Deploy:** [orbit-flow-six.vercel.app](https://orbit-flow-six.vercel.app/)

---

## 👥 Integrantes

| Nome | |
|------|-|
| Jorge Meert | 🧑‍💻 |
| Vinicius Henrique | 🧑‍💻 |
| Gabriel Donato | 🧑‍💻 |

---

## ❓ O Problema

Escolher onde construir uma base de lançamento de foguetes não é simples. A **latitude do local** impacta diretamente a energia necessária para colocar um foguete em órbita — quanto mais próximo do equador, maior o ganho com a rotação da Terra, e menor o combustível necessário.

Sem uma ferramenta acessível, comparar diferentes locais no mundo e entender qual é mais eficiente energeticamente exigiria cálculos complexos e difíceis de visualizar.

---

## 💡 A Solução

O **OrbitFlow** é uma aplicação web interativa que permite:

- 🗺️ **Clicar em qualquer ponto do mapa** para capturar a latitude automaticamente
- 📊 **Analisar individualmente** a eficiência energética de uma base de lançamento
- ⚖️ **Comparar duas bases** lado a lado, com cálculo de ganho de rotação e energia estimada
- 🏷️ **Classificar a eficiência** em níveis: Perfeita, Alta, Média, Baixa e Muito Baixa

Tudo isso de forma simples, visual e direto ao ponto.

---

## 🎨 Escolhas de Design

### Cores
- **Preto `#1a1a1a`** — cor principal dos painéis de dados. Remete a ambientes de controle de missão e monitores técnicos, transmitindo seriedade e imersão no tema espacial.
- **Vermelho `#dc2626`** — usado no botão de ação principal e na linha divisória do header. Cor de alerta e ação em sistemas críticos, reforçando a ideia de um lançamento.

### Tipografia
- **Arial** — fonte sem serifa, legível e neutra. A escolha foi intencional: evita distração visual e mantém o foco nos dados, como em interfaces de sistemas técnicos reais.

### Estrutura da Interface
- Layout em duas colunas (mapa + painel de dados) para que o usuário veja o mapa e os resultados simultaneamente, sem precisar rolar a página.
- Alternância entre **Análise Individual** e **Análise Comparativa** via botões de modo, mantendo a interface limpa e sem sobrecarga de informação.
- Rodapé dedicado às simplificações do modelo, separando claramente os dados operacionais das limitações técnicas.

---

## 🛠️ Tecnologias

- `HTML` `CSS` `JavaScript`
- [Leaflet.js](https://leafletjs.com/) + OpenStreetMap

---

## ⚠️ Simplificações Adotadas

- Lançamentos considerados do nível do mar até a órbita geoestacionária
- Perdas aerodinâmicas não são consideradas
- Modelo assume cargas orbitando no mesmo sentido de rotação da Terra
