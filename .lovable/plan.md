

# LIA Analytics Dashboard — Plano de Implementação

## Visão Geral
Dashboard analítico "Dark Luxury" para a LIA (Assistente Virtual da Cacau Show), com tema inspirado em chocolate/café com acentos dourados. Dados 100% mock, sem backend. Layout com drag & drop para reorganizar widgets.

---

## 1. Design System & Tema
- **Background:** Marrom profundo (#1A120B / #2B1D16)
- **Cards:** Tom mais claro (#3E2C22) com blur/opacidade
- **Acentos:** Dourado (#D4AF37 / #E5C06E)
- **Texto:** Off-white/Bege (#F5F5F0)
- **Bordas:** Douradas com baixa opacidade
- **Tipografia:** Playfair Display para títulos, Inter para dados
- Variáveis CSS customizadas no Tailwind para todo o tema

## 2. Layout Principal (Sidebar + Header)
- **Sidebar fixa à esquerda** com logo "LIA Analytics" (ícone dourado), navegação: Overview, Deep Dive, Cohort Analysis, Geo Distribution, Settings
- **Header superior** com: título da página, breadcrumb, dropdown "Last 30 Days", botão "Export Report" dourado, toggle "Edit Layout" (ícone engrenagem)
- **User profile** no rodapé da sidebar (Admin User)

## 3. Página Principal — Deep Dive Analysis

### 3a. KPI Cards (4 cards no topo)
- Total Active Leads: 12,450 (↑ 12% verde)
- Avg. Messages/Lead: 8.4 (↓ 2.1% vermelho)
- Conversion Rate: 14.2% (↑ 4.5% verde)
- Retention (Day 7): 42% (↑ 1.2% verde)
- Cada card com ícone Lucide e indicador de variação

### 3b. Cohort Heatmap ("Messages by Client Cohort")
- Tabela heatmap com linhas = datas de coorte, colunas = Day 0 a Day 7
- Células com gradiente de cor (marrom claro → dourado forte) proporcional ao valor
- 5 coortes com dados mock decrescentes

### 3c. Conversion Barriers
- Barras de progresso horizontais com cores diferenciadas
- Underage Candidate (35%), Already Registered (28%), No Investment Capital (15%), Out of Coverage (12%), Other/Unresponsive (10%)
- Caixa de "Insight" amarela com dica contextual

### 3d. Peak Activity Hours
- Gráfico de barras verticais (Recharts) — 24h
- Barras 14:00–16:00 em dourado destacado (pico), restante em marrom opaco
- Badge "Most Active: 14:00 - 16:00"

### 3e. Geo Distribution (Top Cities)
- Lista estilizada com ranking numerado e badges de estado (SP, RJ, MG, PR)
- São Paulo 18% (2,450), Rio 14% (1,820), BH 9% (1,105), Curitiba 7% (980)
- Botão "View All Cities"

## 4. Modo Canvas (Drag & Drop)
- Botão "Edit Layout" no header ativa/desativa modo edição
- Quando ativo: borda pontilhada nos widgets, alça de arrasto visível, widgets reordenáveis por drag & drop
- Quando desativado: salva posições no localStorage
- Ao recarregar: restaura layout salvo do localStorage
- Implementação com HTML5 drag & drop nativo (sem dependência extra)

## 5. Navegação entre Páginas
- Cada item da sidebar será uma rota (React Router)
- Página principal (Deep Dive) totalmente funcional com todos os widgets
- Demais páginas (Overview, Geo Distribution, Settings) com placeholder inicial

## 6. Componentes Modulares
Cada widget será um componente isolado e reutilizável:
- `KPICard` — card de métrica individual
- `CohortHeatmap` — tabela heatmap
- `ConversionBarriers` — barras de conversão + insight
- `PeakActivityChart` — gráfico de barras Recharts
- `GeoDistribution` — lista de cidades
- `DraggableGrid` — wrapper do sistema de drag & drop

