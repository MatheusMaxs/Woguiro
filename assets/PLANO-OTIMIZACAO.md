# Plano de Otimização Consolidado — Woguiro Website

> Plano gerado a partir de análises PageSpeed Insights (13-14/05/2026)
> Último desktop: Performance 39-62 | Acessibilidade 100 | Práticas Recomendadas 96 | SEO 91
> ⚠️ Score 100 ocasional mascara métricas reais ruins: LCP 18.5s, TBT 1.560ms, Page Weight 23MB

---

## SUMÁRIO EXECUTIVO

O site está com **Performance Score 100** no Lighthouse, mas isso é uma miragem causada por custom throttling leve. As métricas reais continuam péssimas:

| Métrica | Valor Real | Problema Raiz |
|---------|-----------|---------------|
| **LCP** | 18.5s | Imagens 40MB + LoadingScreen bloqueia 4.2s |
| **TBT** | 1.560ms | GSAP ScrollTrigger + framer-motion + forced reflow |
| **Page Weight** | 23 MB | Imagens e vídeos sem otimização alguma |
| **Performance** | 39-62 | Varia conforme página e throttling |
| **SEO** | 91 | robots.txt inválido, sem sitemap, sem OG tags |

### 🔥 Três Descobertas Críticas Novas

| Descoberta | Impacto | Detalhe |
|-----------|---------|---------|
| **Forced Reflow** | 373ms+ | GSAP + React causam layout thrashing pesado |
| **LCP Delay 4.5s** | 4.540ms | LoadingScreen segura renderização; animação de entrada atrasa LCP |
| **Posters 5MB** | 5.137 KiB | Poster de thumbnail exibido em 138x245px baixa 5MB |

---

## 🎯 PRIORIDADE MÁXIMA — Impacto Crítico em Performance

---

### 1. Otimização de Imagens + Responsivo + Formatos Modernos
**Economia potencial:** ~22.611 KiB → ~18.000 KiB

**Problema:**
Imagens em `dist/assets/` têm 20-40MB cada (ex: `planta-primavera` = 40MB, `livraria-rua` = 35MB). O LCP está em 18.5s por causa disso.

**Diagnóstico UltraThink — Proporção Imagem vs Display:**

O Lighthouse revela um problema grave de proporção:

| Imagem | Tamanho Baixado | Exibido Em | Proporção | Economia |
|--------|----------------|------------|-----------|----------|
| `compal-loop.webp` | 7.724 KiB | 354x532px | 1280x571 → 354x532 | 7.605 KiB |
| `ugc-mister-tuga-poster.webp` | 5.137 KiB | 138x245px | 2160x2476 → 138x245 | 5.131 KiB |
| `ugc-babes-papes-ai-1-poster.webp` | 2.249 KiB | 138x245px | 2160x2476 → 138x245 | 2.243 KiB |
| `coca-cola-loop-poster.webp` | 1.843 KiB | 354x630px | 1296x578 → 354x630 | 1.806 KiB |
| `ugc-babespapes-ai-poster.webp` | 1.739 KiB | 138x245px | 2160x2476 → 138x245 | 1.733 KiB |
| `grindset-2-poster.webp` | 1.077 KiB | 158x158px | 1080x1080 → 158x158 | 1.073 KiB |

**Cada poster de vídeo está sendo baixado em RESOLUÇÃO ORIGINAL (2160x2476) para ser exibido em 138x245 pixels — uma proporção de 100:1.**

**Ações Técnicas (sem perder qualidade visual):**

- **srcset responsivo com densidades:** gerar 4 tamanhos (480w, 768w, 1200w, 1920w) para cada imagem usando `<img srcset="..." sizes="...">`
- **AVIF como formato primário + WebP fallback** via `<picture>` — AVIF reduz ~50-60% sobre WebP com qualidade equivalente
- **Comprimir WebP com qualidade 80-85%** (mantém qualidade, reduz tamanho)
- **REDIMENSIONAR POSTERS para no máximo 720px no lado maior** — matar a proporção 100:1
- Adicionar plugin Vite para gerar múltiplas variantes automáticas no build (`vite-imagetools` ou `vite-plugin-image-optimizer`)
- Adicionar `loading="lazy"` consistente em imagens abaixo da dobra
- Adicionar `fetchpriority="high"` no elemento LCP de cada página
- Adicionar `fetchpriority="low"` nas demais imagens lazy

**Arquivos afetados:**
- `src/data/homeContent.ts` — imports de imagens
- `src/data/workProjects.ts` — imports de imagens
- `src/pages/WorksPage.tsx` — componente `MediaPreview`
- `src/pages/WorkProjectPage.tsx` — componente `CaseMedia`
- `src/components/WorksPreview/WorksPreview.tsx` — imagens nos cards
- `src/components/Hero/HeroBackground.tsx` — vídeo de fundo

---

### 2. Otimização de Vídeos + Streaming Adaptativo
**Economia potencial:** ~350-400MB

**Problema:**
Videos enormes — `ugc-mister-tuga` = 92MB, `ugc-babespapes-1` = 52MB, `coca-cola-loop` = 45MB.

**Diagnóstico UltraThink — Por que os vídeos são tão grandes:**

O Lighthouse mostra que cada vídeo na página de works é baixado por inteiro (preload="auto") mesmo estando fora da viewport inicial. Os 10 vídeos da works page somam ~400MB de transferência potencial. Em uma conexão de 10Mbps, são **5+ minutos** de carregamento contínuo.

Além disso, os vídeos usam bitrates muito altos para o propósito deles (loops de portfolio em thumbnails de 138x245px não precisam de 40Mbps).

**Ações Técnicas (sem perder qualidade perceptível):**

- **3 resoluções por vídeo:** 480p, 720p, 1080p com `<source media="...">` para cada
- **Target bitrate:** CRF 23-24 H.264 (~2-5 Mbps em vez de 40+ Mbps atuais)
- Codificar em **AV1** (economia adicional de ~30%) com fallback H.264
- Mudar `preload="auto"` → `preload="none"` em **todos os vídeos que não são hero LCP**
- Mudar `preload="auto"` → `preload="auto"` **apenas no vídeo LCP**
- Cortar loops para duração mínima (5-8s em vez de 15-30s atuais)
- Poster de vídeos em AVIF/WebP otimizado com resolução máxima de 720px

**Arquivos afetados:**
- `src/pages/WorksPage.tsx` — `MediaPreview` com `preload="auto"`
- `src/pages/WorkProjectPage.tsx` — `CaseMedia` com `preload`
- `src/components/Hero/HeroBackground.tsx` — vídeo hero com `preload="auto"`

---

### 3. Arquivo robots.txt
**SEO Impact:** 91 → 100

**Problema:**
O robots.txt está servindo o HTML da página inteira (24 erros de sintaxe) porque o Vercel redireciona todas as rotas para `index.html`.

**Ações:**

- Criar `public/robots.txt` com conteúdo adequado:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.woguiro.com/sitemap.xml
  ```

- Configurar `vercel.json` para servir robots.txt estaticamente:
  ```json
  {
    "rewrites": [...],
    "headers": [
      {
        "source": "/robots.txt",
        "destination": "/robots.txt"
      }
    ]
  }
  ```

**Arquivos afetados:**
- `public/robots.txt` (novo)
- `vercel.json`

---

### 4. Fontes Self-Hosted + Subset + Preload
**Economia potencial:** 908ms–1.316ms no critical path

**Problema:**
O Lighthouse revela que `fonts.gstatic.com` é o **maior gargalo de rede isolado**:
- Homepage: **908ms** para baixar as fontes
- Works page: **1.316ms** para baixar as fontes
- Isso é mais lento que o próprio bundle JS (308-370ms)

Mesmo com `preconnect` ativo, o download dos woff2 de 48KB + 31KB leva 900ms+ porque:
1. DNS + TLS handshake para fonts.gstatic.com
2. Dois arquivos woff2 de ~80KB total
3. Conexão pode ser lenta dependendo da região

**Ações:**

- Baixar Inter e JetBrains Mono para `public/fonts/`
- **Subsetting:** remover caracteres não usados (grego, cirílico, etc) — economia de ~50-60% do tamanho
- Usar **woff2** (já é o formato padrão)
- Adicionar `<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>`
- Usar `font-display: optional` (site dark, falha não é catastrófica)
- Remover chamadas externas para Google Fonts do `index.html`

**Arquivos afetados:**
- `index.html` — remover links Google Fonts, adicionar preload
- `public/fonts/` (novo diretório)
- `src/styles/global.css` — atualizar `@font-face`

---

### 5. Critical CSS Inline
**Economia potencial:** 150-200ms de render-blocking

**Problema:**
CSS completo (72KB) é render-blocking. O Lighthouse mostra que o CSS leva 120-200ms bloqueando a renderização.

**Ações:**

- Usar `vite-plugin-critical` ou `critters` para extrair CSS do hero/layout inicial
- **Inline no `<head>`** (~10-15KB de CSS crítico)
- CSS não-crítico carregado com `media="print" onload="this.media='all'"` (não bloqueia render)

**Arquivos afetados:**
- `vite.config.ts` — adicionar plugin critical
- `index.html` — receber CSS inline via build

---

### 6. Priority Hints Estratégicos
**Economia potencial:** Reduz LCP delay em ~500ms

**Problema:**
Sem hints, o navegador não sabe qual recurso carregar primeiro. O LCP atual leva 18.5s porque recursos não-críticos competem com o crítico.

**Ações:**

| Página | LCP Candidate | fetchpriority |
|--------|---------------|---------------|
| Home | Hero text (WOGUIRO) / hero video | `high` |
| `/works` | Título `<h1>` / primeira imagem do mosaico | `high` |
| `/works/:slug` | Hero image/video do projeto | `high` |
| Demais assets | — | `low` ou sem hint |

**Arquivos afetados:**
- `src/pages/WorksPage.tsx`
- `src/pages/WorkProjectPage.tsx`
- `src/components/Hero/HeroBackground.tsx`
- `src/pages/HomePage.tsx`

---

### 7. Erros de Console (Best Practices)

**Problema:**
Múltiplos `net::ERR_CONNECTION_FAILED` para assets — o build atual tem referências a arquivos que não foram deployados ou os nomes hasheados mudaram.

**Ações:**

- Rebuild completo limpo: `rm -rf dist && npm run build`
- Verificar deploy no Vercel — confirmar que todos os assets foram enviados
- Verificar logs de 404 no Vercel para assets faltantes

---

## ⚡ ALTA PRIORIDADE — Performance e UX

---

### 8. Forced Reflow / Layout Thrashing — NOVO
**Economia potencial:** 373ms+ de blocking time

**Problema:**
O Lighthouse detectou forced reflow em múltiplos scripts:

| Fonte | Tempo Total de Reflow | Onde |
|-------|----------------------|------|
| **GSAP** (`gsap-D81XIXqa.js`) | **373ms** | `useScrollReveal.ts` + LoadingScreen |
| **React** (`react-B1DBXVsL.js`) | **264ms** | framer-motion animações de layout |
| **Bundle** (`index-BJTJjz42.js`) | ~12ms | Animações diversas |

**Causa raiz:** `useScrollReveal.ts` (linhas 20-55) usa `gsap.from()` com ScrollTrigger que:
1. Invalida o DOM ao modificar `opacity`, `transform`, `filter`
2. Imediatamente depois consulta propriedades geométricas (posição do scroll)
3. Isso força o navegador a fazer reflow síncrono
4. Em mobile, isso é 5-10x mais custoso

Além disso, o `LoadingScreen.tsx` anima múltiplas propriedades simultaneamente com GSAP, causando reflows em cascata.

**Ações:**

- **Em `useScrollReveal.ts`:** Substituir `gsap.from()` por animações CSS com `@keyframes` e IntersectionObserver para scroll reveal (elimina ScrollTrigger dependency em non-critical animations)
- **Em `LoadingScreen.tsx`:** Separar leitura e escrita do layout. Usar `will-change: transform, opacity` no painel e nos chars. Reduzir failsafe timeout de **4.200ms → 2.000ms**
- **Em todos os componentes:** Garantir que animações usem apenas `transform` e `opacity` (nunca animar propriedades que disparam layout)
- Adicionar `will-change: transform` em elementos animados com GSAP

**Arquivos afetados:**
- `src/hooks/useScrollReveal.ts`
- `src/components/LoadingScreen/LoadingScreen.tsx`
- `src/styles/home.css`
- `src/styles/loading.css`

---

### 9. LCP Element Delay — LoadingScreen Bloqueia Render — NOVO
**Economia potencial:** 4.540ms → ~500ms (redução de 4s no LCP)

**Problema:**
O Lighthouse mostra que o LCP tem **4.540ms de atraso na renderização do elemento**. Isso significa que o conteúdo principal está pronto no HTML mas demora 4.5s para aparecer.

**Causa raiz (mapeada):**

```
Timeline do LCP na Homepage:
0ms    → Navegação inicial
166ms  → HTML carregado (0.95 KiB)
254ms  → Google Fonts CSS
~900ms → Fontes woff2 baixadas
1.2s   → Bundle JS carregado
1.5s   → React hidrata + framer-motion inicializa
2.0s   → LoadingScreen aparece (GSAP anima)
4.2s   ← FAILSAFE TIMEOUT do LoadingScreen (4.200ms)
4.3s   → LoadingScreen dismiss + animação de entrada da HomePage
6.2s   → framer-motion termina animação de entrada (opacity, y, blur)
6.5s   → LCP text "WOGUIRO" finalmente renderiza
--- 
MAS OS VIDEOS/IMAGENS ABAIXO AINDA ESTÃO CARREGANDO ---
18.5s  → LCP final (imagem/vídeo carregou)
```

**O loading de 18.5s tem 3 componentes:**
1. **LoadingScreen segura a tela por 4.2s** (failsafe timeout)
2. **Animações framer-motion de entrada** (0.62s de duração + blur filter)
3. **Assets enormes carregando** (os 23MB restantes)

**Ações:**

- **Reduzir failsafe timeout do LoadingScreen de 4.200ms → 1.500ms** (já tem sessionStorage, visitantes recorrentes não veem)
- **LoadingScreen deve usar `will-change` e animar apenas `opacity` e `transform`** (não causar reflow)
- **Animações de entrada das páginas:** para o LCP candidate, usar `opacity` e `transform` apenas, remover `filter: blur()` (que é custoso e atrasa paint)
- **Pular animação de entrada se `prefers-reduced-motion`** (já existe, verificar)
- **`<h1>` do hero deve ter `content-visibility: auto`** para priorizar renderização

**Arquivos afetados:**
- `src/components/LoadingScreen/LoadingScreen.tsx`
- `src/pages/HomePage.tsx` — animação de entrada
- `src/pages/WorksPage.tsx` — animação de entrada
- `src/pages/WorkProjectPage.tsx` — animação de entrada
- `src/styles/home.css`

---

### 10. TBT Alto (1.110ms–1.560ms) mesmo com Performance 100 — NOVO

**Problema:**
O TBT está em **1.110ms (home)** e **1.560ms (works)** — muito acima dos 200ms recomendados, mesmo com score 100.

**Distribuição das long tasks:**

| Task | Duração | Fonte |
|------|---------|-------|
| GSAP ScrollTrigger register | ~380ms | `gsap.js` |
| framer-motion layout animation | ~264ms | `react.js` (via React) |
| Bundle init + React hydration | ~310ms | `index.js` |
| Three.js init (FloatingAtmosphere) | ~220ms | `three.js` via chunk |
| LoadingScreen GSAP timeline | ~180ms | `index.js` |

**Ações:**

- **Lazy load FloatingAtmosphere (Three.js) — 220ms eliminado** em páginas que não são Home
- **Reduzir timeout do LoadingScreen — 180ms de animação não bloqueante**
- **Substituir ScrollTrigger em `useScrollReveal` por CSS IntersectionObserver** — elimina 380ms de registro do plugin
- **Quebrar hydration em chunks** com `React.lazy()` para seções abaixo da dobra
- **Usar `requestIdleCallback`** para animações não críticas (partículas, floating atmosphere)

**Arquivos afetados:**
- `src/hooks/useScrollReveal.ts`
- `src/components/LoadingScreen/LoadingScreen.tsx`
- `src/pages/HomePage.tsx`
- `src/App.tsx`

---

### 11. Render-Blocking Resources + Resource Hints
**Economia:** 120-200ms

**Ações:**

- `preconnect` para origens críticas (já existe, manter até self-host fonts)
- `prefetch` para `/works` quando usuário está na Home (precarregar chunk JS)
- `modulepreload` para chunks de JS (já existe no dist)
- `dns-prefetch` para YouTube API (`www.googleapis.com`)
- Mover `<script type="module">` para o `<head>` com `defer`

**Arquivos afetados:**
- `index.html`

---

### 12. Unused CSS/JS + Bundle Splitting
**Economia:** CSS: 10-12KB, JS: 72KB

**Ações:**

- Dividir CSS por página:
  - `global.css` (comum: reset, variáveis, tipografia) → importado em `main.tsx`
  - `home.css` → importado apenas em `HomePage.tsx`
  - Criar `works.css` → importado apenas em `WorksPage.tsx` + `WorkProjectPage.tsx`
  - Manter `hero.css`, `site-nav.css`, `cursor.css`, `loading.css`, `grain.css` conforme uso
- Verificar bundles JS com `rollup-plugin-visualizer`
- Garantir que `vite-manual-chunks` está isolando Three.js corretamente

**Arquivos afetados:**
- `src/styles/global.css` — remover imports de CSS específicos de página
- `src/main.tsx` — manter apenas global.css
- `src/pages/HomePage.tsx` — importar home.css
- `src/pages/WorksPage.tsx` — importar works.css
- `src/pages/WorkProjectPage.tsx` — importar works.css
- `vite.config.ts` — adicionar visualizer plugin

---

### 13. Lazy Loading Estratégico de Componentes Pesados

**Ações:**

- **`FloatingAtmosphere`** (Three.js) → `React.lazy()` + `Suspense` — ~220KB de JS não baixado em páginas works
- **`CustomCursor`** → renderizar apenas em desktop (media query + lazy load)
- **`LoadingScreen`** → já é condicional (sessionStorage), reduzir timeout de 4.2s para 1.5s
- **Three.js** deve estar em chunk separado (`manualChunks.three`)

**Arquivos afetados:**
- `src/App.tsx` — lazy load CustomCursor
- `src/pages/HomePage.tsx` — lazy load FloatingAtmosphere
- `vite.config.ts` — verificar manualChunks

---

### 14. Uncomposited Animations (9-12 elementos)

**Ações:**

- Garantir que animações framer-motion usem apenas `opacity`, `x`, `y`, `scale`, `rotate`
- Substituir transições de `filter: blur()` por `will-change: transform` + layers
- Nos estilos CSS: `transition` em `border-color`, `background-color`, `box-shadow` disparam layout → isolar com `will-change` ou separar em pseudo-elementos
- Animação `.work-card-float` → usar `translate` em vez de animar propriedades que disparam layout
- Especificamente para o LCP: remover `filter: blur()` da animação de entrada das páginas (é a maior causa de uncomposited animation no LCP candidate)

**Arquivos afetados:**
- `src/styles/home.css` — várias transições
- `src/styles/hero.css`
- `src/styles/global.css`
- `src/pages/WorksPage.tsx` — animações framer-motion
- `src/pages/WorkProjectPage.tsx` — animações framer-motion
- `src/pages/HomePage.tsx` — animações framer-motion

---

### 15. Service Worker + PWA
**(Velocidade de Carregamento em Visitas Recorrentes)**

**Ações:**

- Adicionar `vite-plugin-pwa` com Workbox
- **Cache-first** para assets imutáveis (JS, CSS, fontes, imagens com hash)
- **Network-first** para páginas HTML
- **Stale-while-revalidate** para imagens sem hash
- Offline fallback page
- Manifest para instalação PWA (nome, ícones, theme-color)

**Arquivos afetados:**
- `vite.config.ts` — adicionar VitePWA plugin
- `public/manifest.json` (novo)

---

### 16. HTTP Caching Headers no Vercel

**Ações:**
```json
{
  "source": "/assets/(.*)",
  "headers": [
    { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
  ]
},
{
  "source": "/fonts/(.*)",
  "headers": [
    { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
  ]
}
```

**Arquivos afetados:**
- `vercel.json`

---

### 17. Sitemap XML + Open Graph + SEO Completo

**Ações:**

- `public/sitemap.xml` com todas as URLs:
  - `https://www.woguiro.com/`
  - `https://www.woguiro.com/works`
  - `https://www.woguiro.com/works/livraria-cultural-session`
  - `https://www.woguiro.com/works/ugc-video-pack`
  - `https://www.woguiro.com/works/grindset-editing-study`
  - `https://www.woguiro.com/works/coca-cola-compal-motion-loops`
  - `https://www.woguiro.com/works/ponte-de-lima-street-archive`
  - (mais todos os projetos em `WORK_PROJECTS`)
- OG tags via `react-helmet-async`: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter Cards: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `canonical` URL em cada página
- `hreflang` para as traduções (pt, en, etc)

**Arquivos afetados:**
- `public/sitemap.xml` (novo)
- `src/pages/HomePage.tsx` — adicionar OG tags no Helmet
- `src/pages/WorksPage.tsx` — adicionar OG tags no Helmet
- `src/pages/WorkProjectPage.tsx` — adicionar OG tags no Helmet

---

## 🛡️ MÉDIA PRIORIDADE — Segurança e Boas Práticas

---

### 18. Security Headers (CSP, HSTS, COOP, XFO)

**Ações:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; media-src 'self'; connect-src 'self' https://www.googleapis.com;"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

**Arquivos afetados:**
- `vercel.json`

---

### 19. Acessibilidade Manual (10 itens pendentes)

**Ações:**

- Verificar foco do teclado nos componentes interativos (especialmente lightbox, filtros)
- Garantir `tabindex` lógico nos mosaicos de projetos (`WorksPage.tsx`)
- Adicionar `aria-label` nos botões de lightbox
- Verificar se CustomCursor não bloqueia interações de teclado
- Adicionar `role="region"` e `aria-label` nas seções principais
- Garantir que links tenham texto descritivo (já tem, verificar)

**Arquivos afetados:**
- `src/pages/WorksPage.tsx`
- `src/pages/WorkProjectPage.tsx`
- `src/components/CustomCursor/CustomCursor.tsx`
- `src/components/Hero/Hero.tsx`
- `src/components/AboutPreview/AboutPreview.tsx`
- `src/components/ContactSection/ContactSection.tsx`

---

### 20. Prerender / Meta Tags Estáticas

**Ações:**

- Garantir `react-helmet-async` funciona corretamente (já implementado)
- Adicionar meta tags para compartilhamento em redes sociais
- Considerar Vite SSR/SSG para gerar HTML estático com meta tags

**Arquivos afetados:**
- `src/pages/HomePage.tsx`
- `src/pages/WorksPage.tsx`
- `src/pages/WorkProjectPage.tsx`

---

## 📊 Métricas Esperadas

| Métrica | Atual | Após Otimizações | Meta Google |
|---------|-------|-------------------|-------------|
| **LCP** | 18.5s | **1.8-2.5s** | <2.5s |
| **FCP** | 0.7-0.8s | **0.4-0.5s** | <1.8s |
| **TBT** | 1.110-1.560ms | **50-150ms** | <200ms |
| **CLS** | 0 | **0** (manter) | <0.1 |
| **Performance Score** | 39-62 | **90-100** | 90+ |
| **SEO Score** | 91 | **100** | 100 |
| **Best Practices** | 96 | **100** | 100 |
| **Page Weight** | 23 MB | **1.5-3 MB** | <3 MB |
| **Requests** | ~50 | **20-30** | <30 |
| **Forced Reflow** | 373ms+ | **<10ms** | — |
| **LCP Delay** | 4.540ms | **<300ms** | — |

---

## 📋 Ordem de Execução Final

| Fase | Tarefa | Esforço | Impacto LCP | Impacto TBT | Impacto SEO |
|------|--------|---------|-------------|-------------|-------------|
| **1** | `public/robots.txt` + config Vercel | 15min | — | — | ⭐⭐⭐⭐⭐ |
| **2** | Fontes self-hosted + subset + preload | 1h | ⭐⭐⭐⭐⭐ | — | — |
| **3** | Reduzir failsafe LoadingScreen 4.2s→1.5s | 15min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | — |
| **4** | Remover `filter: blur()` das animações de entrada | 30min | ⭐⭐⭐⭐ | ⭐ | — |
| **5** | Redimensionar posters de vídeo (5MB→50KB) | 1h | ⭐⭐⭐⭐ | — | — |
| **6** | Imagens: AVIF + srcset responsivo | 4h | ⭐⭐⭐⭐⭐ | — | — |
| **7** | Vídeos: 3 resoluções + preload="none" | 3h | ⭐⭐⭐⭐ | — | — |
| **8** | Substituir ScrollTrigger por CSS IntersectionObserver | 3h | ⭐⭐ | ⭐⭐⭐⭐⭐ | — |
| **9** | Critical CSS inline | 1h | ⭐⭐⭐ | — | — |
| **10** | Lazy loading: Three.js, CustomCursor | 1h | ⭐⭐ | ⭐⭐⭐ | — |
| **11** | Service Worker + PWA | 2h | ⭐ | ⭐ | — |
| **12** | HTTP caching headers no Vercel | 15min | ⭐ | — | — |
| **13** | Priority hints (fetchpriority) | 30min | ⭐⭐⭐ | — | — |
| **14** | Security headers (CSP, HSTS, etc) | 30min | — | — | ⭐⭐ |
| **15** | Sitemap + OG tags + meta | 1h | — | — | ⭐⭐⭐⭐ |
| **16** | CSS splitting + unused CSS/JS purge | 2h | ⭐ | ⭐ | — |
| **17** | Uncomposited animations + forced reflow fix | 2h | ⭐⭐ | ⭐⭐⭐ | — |
| **18** | Acessibilidade manual | 2h | — | — | ⭐ |
| **19** | Rebuild + verificar deploy | 30min | — | — | — |

---

**Estimativa total:** ~20-24h de trabalho
**Resultado esperado:** LCP **18.5s → ~2.0s**, TBT **1.560ms → ~100ms**, Performance **39→90+**, SEO **91→100**, Page Weight **23MB → ~2MB**
