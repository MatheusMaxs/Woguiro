# Plano de Otimização Mobile — Woguiro Website

> Plano gerado a partir de análises PageSpeed Insights (13-14/05/2026)
> Mobile: Performance 65 | Acessibilidade 100 | Práticas Recomendadas 96 | SEO 91
> Dispositivo: Moto G Power emulado | Rede: Slow 4G | Lighthouse 13.0.1
> ⚠️ Score 65 com LCP de 41.3s — o pior cenário é MOBILE

---

## SUMÁRIO EXECUTIVO — MOBILE

O mobile recebe **exatamente o mesmo payload de 23MB** que o desktop, mas com:
- **CPU 5-10x mais lenta** (Moto G Power)
- **Rede 4G limitada** (throttled)
- **Tela de 412px** (baixando imagens para 1920px+)

### 🔥 Descobertas Críticas Novas para Mobile

| Descoberta | Impacto Mobile | Detalhe |
|-----------|---------------|---------|
| **LCP 41.3s** | 🚨 CRÍTICO | 2.2x pior que desktop |
| **Forced Reflow** | 5-10x pior | CPU lenta amplifica cada reflow |
| **Render-blocking** | 760ms | 6x pior que desktop (120ms) |
| **Fonts 1.3s** | 1.316ms | Gargalo #1 em rede lenta |
| **Posters 5MB** | 5.137 KiB | Em 4G, 5MB = ~10s de download |
| **Page Weight** | 23 MB | Em 4G (3Mbps) = ~61s de download |

---

## Diagnóstico Mobile vs Desktop (Atualizado)

| Métrica | Desktop | Mobile | Diferença |
|---------|---------|--------|-----------|
| **Performance** | 100* | 65 | *score mascarado |
| **LCP** | 18.5s | **41.3s** | 🚨 2.2x pior |
| **FCP** | 0.7-0.8s | **3.4s** | 🚨 4.5x pior |
| **TBT** | 1.560ms | 0ms* | *não detectado na amostra |
| **Render-blocking** | 120-200ms | **760ms** | 🚨 4-6x pior |
| **SI** | 1.4-2.7s | **4.8s** | 🚨 2-3x pior |
| **Forced Reflow** | 373ms+ | **~1.5-3s estimado** | CPU lenta amplifica |
| **Page Weight** | 23 MB | **23 MB** | IDÊNTICO — problema #1 |

**Conclusão:**
O mobile recebe **exatamente o mesmo payload de 23MB** que o desktop, mas com CPU 5-10x mais lenta e rede 4G limitada a ~3Mbps. O resultado é LCP de **41 segundos** — tempo suficiente para o usuário desistir e fechar o site.

---

## 🎯 PRIORIDADE MÁXIMA — Mobile-First

---

### M1. Responsive Images com resolução limitada em mobile
**Economia potencial:** ~18.000 KiB

**Problema:**
Mobile baixa imagens de 40MB numa tela de 412px de largura. O Lighthouse mostra exemplos gritantes:
- `ugc-mister-tuga-poster.webp`: **5.137 KiB** para **138x245px** de exibição
- `compal-loop.webp`: **7.724 KiB** para **354x532px** de exibição

**Diagnóstico UltraThink — Proporção pixel baixado vs pixel exibido:**

| Imagem | Resolução Baixada | Exibida Em | Proporção | Economia |
|--------|------------------|------------|-----------|----------|
| `compal-loop.webp` | 1280x571 | 354x532 | 3.6x largura | 7.605 KiB |
| `ugc-mister-tuga-poster.webp` | 2160x2476 | 138x245 | **15.6x largura** | 5.131 KiB |
| `ugc-babes-papes-ai-1-poster.webp` | 2160x2476 | 138x245 | **15.6x largura** | 2.243 KiB |
| `coca-cola-loop-poster.webp` | 1296x578 | 354x630 | 3.7x largura | 1.806 KiB |
| `ugc-babespapes-ai-poster.webp` | 2160x2476 | 138x245 | **15.6x largura** | 1.733 KiB |
| `grindset-2-poster.webp` | 1080x1080 | 158x158 | 6.8x largura | 1.073 KiB |

**Em mobile 4G (3Mbps), cada 1MB = ~2.7s de download. Economizar 22MB = ~60s a menos de carregamento.**

**Ações:**

- No `srcset`, limitar mobile a **480w no máximo** (nunca 768w+ em celular)
- Usar `sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"`
- **REDIMENSIONAR POSTERS para 480px no lado maior** — posters de 2160x2476 são criminosos em mobile
- Para hero LCP: versão dedicada de no máximo **480px de largura** com `fetchpriority="high"`
- Adicionar `<source media="(max-width: 768px)" srcset="hero-mobile.webp">` no hero
- Usar `decoding="async"` em todas as imagens mobile

**Arquivos afetados:**
- `src/components/Hero/HeroBackground.tsx`
- `src/components/WorksPreview/WorksPreview.tsx`
- `src/pages/WorksPage.tsx`
- `src/pages/WorkProjectPage.tsx`
- `src/data/homeContent.ts`
- `src/data/workProjects.ts`

---

### M2. Vídeos com resolução reduzida em mobile
**Economia potencial:** ~350MB → ~30MB (redução de ~90%)

**Problema:**
Mobile baixa vídeos de 92MB para reproduzir em tela de 412px. Em 4G, 92MB = ~4 minutos de carregamento contínuo.

**Diagnóstico UltraThink — Custo real dos vídeos em mobile:**

| Vídeo | Tamanho Atual | Em 4G (3Mbps) | Após Otimização | Em 4G |
|-------|--------------|---------------|-----------------|-------|
| `ugc-mister-tuga.mp4` | 92 MB | ~4 min | 3-5 MB (480p) | ~10s |
| `ugc-babespapes-1.mp4` | 52 MB | ~2.3 min | 2-3 MB | ~7s |
| `ugc-babespapes-ai.mp4` | 50 MB | ~2.2 min | 2-3 MB | ~7s |
| `ugc-babes-papes-ai-1.mp4` | 48 MB | ~2.1 min | 2-3 MB | ~7s |
| `coca-cola-loop.mp4` | 45 MB | ~2 min | 2-3 MB | ~7s |
| `grindset-2.mp4` | 38 MB | ~1.7 min | 2-3 MB | ~7s |
| `livraria-sessao.mp4` | 33 MB | ~1.5 min | 2-3 MB | ~7s |
| `ugc-mister-tuga-2.mp4` | 33 MB | ~1.5 min | 2-3 MB | ~7s |
| **Total** | **~391 MB** | **~17 min** | **~20-25 MB** | **~1 min** |

**Ações:**

- Mobile deve receber no máximo **480p** de resolução de vídeo
- **Bitrate target:** CRF 26-28 H.264 para mobile (~1-2 Mbps)
- Usar `<source media="(max-width: 768px)" src="video-480p.mp4">` nos componentes de vídeo
- **Remover `autoplay` de TODOS os vídeos em mobile** (só dar play quando usuário clicar)
- Mudar `preload="none"` em mobile para todos os vídeos
- Poster de vídeos em mobile com resolução máxima de 320px

**Arquivos afetados:**
- `src/pages/WorksPage.tsx` — `MediaPreview`
- `src/pages/WorkProjectPage.tsx` — `CaseMedia`

---

### M3. Eliminar CustomCursor em mobile
**Economia:** ~30KB de JS + event listeners

**Problema:**
O componente CustomCursor é renderizado mesmo em touch devices, adicionando JS + evento listeners desnecessários. Já existe early-return no useEffect, mas o componente ainda é montado no DOM.

**Ações:**

- Já existe `if (matchMedia('(hover: none), (pointer: coarse)').matches)` que early-return
- **Não renderizar o componente em mobile:** check condicional em `App.tsx`
- Adicionar `React.lazy()` + `Suspense` com check de `pointer: fine` antes de importar

**Arquivos afetados:**
- `src/App.tsx` — lazy load condicional
- `src/components/CustomCursor/CustomCursor.tsx`

---

### M4. Network-Aware Loading
**Economia potencial:** Adaptável conforme conexão do usuário

**Problema:**
Mobile em 4G lenta baixa o mesmo que mobile em WiFi rápido. Não há adaptação.

**Ações:**

- Detectar `navigator.connection.effectiveType`:
  - `4g` → carrega imagens em 480w, vídeos em 480p, preload="metadata"
  - `3g` → carrega imagens em 320w, vídeos em 360p, sem autoplay
  - `2g` / `slow-2g` → carrega imagens em 240w, POSTERS em vez de vídeos, sem animações
- Implementar hook `useNetworkQuality()` que retorna o nível de conexão
- Passar como contexto ou prop para componentes de mídia
- **Ouvir eventos de mudança de conexão** (`navigator.connection.onchange`) para adaptar

**Arquivos novos:**
- `src/hooks/useNetworkQuality.ts`
- `src/context/NetworkContext.tsx`

---

### M5. Render-Blocking em Mobile: Fontes Críticas + JS Defer
**Economia potencial:** 760ms

**Problema:**
Mobile perde **760ms** com render-blocking, **6x mais que desktop** (120ms). Google Fonts é o principal culpado.

**Diagnóstico UltraThink — Timeline do blocking em mobile:**

```
0ms    → Navegação
~200ms → HTML recebido
~300ms → CSS (15.5KB) começa a baixar → BLOQUEIA RENDER
~400ms → Google Fonts CSS (1.6KB) → BLOQUEIA RENDER
~600ms → CSS processado
~700ms → Google Fonts woff2 começa a baixar (48KB + 31KB)
~900ms → woff2 #1 baixado
~1.1s  → woff2 #2 baixado
~1.2s  → Render inicial finalmente liberado
        = 760ms de blocking total
```

**Ações:**

- **Self-host fonts (Inter, JetBrains Mono)** → elimina 1.316ms de download externo
- **Fontes convertidas para woff2 com subset** → de 80KB para ~30KB total
- **`font-display: optional`** → browser não espera pela fonte, usa fallback imediatamente
- Garantir que `<script type="module">` tenha `defer` (já está no final do body)
- **Inline do CSS crítico no `<head>`** → elimina 150ms de request CSS
- Pré-conectar para origens críticas com `crossorigin` (já existe, manter até self-host)

**Arquivos afetados:**
- `index.html`
- `public/fonts/` (novo)
- `src/styles/global.css`

---

### M6. Reduzir JavaScript não usado em mobile
**Economia:** 72 KiB + ~300ms de parse/execução

**Problema:**
Three.js e CustomCursor são baixados mesmo quando não usados em mobile. Além disso, o **ScrollTrigger do GSAP** registra plugins e faz cálculos desnecessários.

**Diagnóstico UltraThink — Custo do JS em mobile (CPU lenta):**

| Script | Tamanho | Tempo Parse (Mobile) | Necessário em Mobile? |
|--------|---------|---------------------|----------------------|
| `three.js` via chunk | ~150KB | ~200ms | ❌ Decorativo |
| `@react-three/fiber` | ~40KB | ~60ms | ❌ Decorativo |
| `@react-three/drei` | ~30KB | ~40ms | ❌ Decorativo |
| GSAP + ScrollTrigger | ~70KB | ~100ms | ⚠️ Parcial |
| framer-motion | ~113KB | ~150ms | ⚠️ Necessário |
| CustomCursor | ~10KB | ~15ms | ❌ Touch |

**Total economizável em mobile: ~300KB + ~400ms de parse**

**Ações:**

- **`FloatingAtmosphere.tsx`** (Three.js) → não renderizar em mobile (decorativo, `aria-hidden`)
- **`CustomCursor.tsx`** → não renderizar em mobile
- **`useScrollReveal.ts`** → substituir GSAP ScrollTrigger por CSS IntersectionObserver em mobile
- **Animações de entrada** (framer-motion) → manter, mas remover `filter: blur()` que pesa na CPU
- Condicional de carregamento: `if (typeof window !== 'undefined' && !matchMedia('(pointer: coarse)').matches)`

**Arquivos afetados:**
- `src/pages/HomePage.tsx` — remover FloatingAtmosphere em mobile
- `src/App.tsx` — não renderizar CustomCursor em mobile
- `src/hooks/useScrollReveal.ts`

---

### M7. Lazy Loading Agressivo em Mobile
**Economia potencial:** Adia ~80% dos assets

**Problema:**
Mobile tenta carregar todos os 23MB de uma vez, mesmo com rede lenta.

**Ações:**

- Em mobile, usar `loading="lazy"` para **TODAS as imagens exceto o LCP**
- Em mobile, usar `preload="none"` para **TODOS os vídeos (exceto hero LCP)**
- Adicionar `decoding="async"` em todas as imagens em mobile
- Adicionar `fetchpriority="low"` em imagens abaixo da dobra em mobile
- **Considerar não carregar a seção de archive de works** em mobile (apenas os 4 cards principais + view all)
- **Considerar não carregar vídeos em mobile até interação do usuário** (click-to-load)

**Arquivos afetados:**
- `src/pages/WorksPage.tsx`
- `src/pages/WorkProjectPage.tsx`
- `src/components/WorksPreview/WorksPreview.tsx`
- `src/components/Hero/HeroBackground.tsx`

---

### M8. Progressive Content Loading em Mobile
**Economia potencial:** ~15MB não baixados até o usuário scrollar

**Problema:**
23MB de conteúdo na página inicial em 4G lenta — tudo tenta carregar de uma vez, mesmo seções que estão fora da viewport.

**Diagnóstico UltraThink — Custo por seção na Home em mobile:**

| Seção | Conteúdo | Peso Estimado | Visível Imediatamente? |
|-------|----------|---------------|----------------------|
| Hero | Video background + texto | ~20MB (video) | ✅ SIM (LCP) |
| FloatingAtmosphere | CSS only | ~0KB | ❌ Decorativo |
| WorksPreview | 4 imagens + 4 cards | ~4MB | ⚠️ Parcial |
| AboutPreview | 1 imagem + texto | ~200KB | ❌ Abaixo da dobra |
| PartnershipsSection | Texto | ~0KB | ❌ Abaixo da dobra |
| ContactSection | Texto + links | ~0KB | ❌ Abaixo da dobra |

**Ações:**

- Implementar **IntersectionObserver** para carregar seções apenas quando visíveis:
  - **Hero** → carrega primeiro (crítico)
  - **WorksPreview** → carrega quando hero entra em viewport por 1s
  - **AboutPreview, PartnershipsSection, ContactSection** → carregam sob demanda
- **Dividir a HomePage em chunks lazy** com `React.lazy()` para cada seção
- **Seções abaixo da dobra:** usar `content-visibility: auto` no CSS
- **Imagens de seções abaixo da dobra:** `loading="lazy"` + `fetchpriority="low"`

**Arquivos afetados:**
- `src/pages/HomePage.tsx`
- `src/components/WorksPreview/WorksPreview.tsx`

---

### M9. Touch Optimization

**Ações:**

- Garantir que `CustomCursor` não interfere em eventos de touch (já faz check de `pointer: coarse`)
- Ajustar `touch-action: manipulation` em elementos interativos (já existe parcialmente)
- Remover `hover` states que não funcionam em touch (já estão corretos com CSS)
- Verificar lightbox em mobile: gesto de swipe para fechar (melhoria futura)
- Aumentar hit targets (botões, links) para mínimo 44px em mobile (verificar)

**Arquivos afetados:**
- `src/pages/WorkProjectPage.tsx` — lightbox
- `src/components/CustomCursor/CustomCursor.tsx`
- `src/styles/home.css`
- `src/styles/hero.css`

---

### M10. Network Payload Reduzido em Mobile
**Meta:** 23,020 KiB → ~3.000 KiB

**Problema:**
O maior impacto em mobile é o peso total de 23MB. Tudo o que não é essencial deve ser adiado ou omitido.

**Cálculo de economia combinada:**

| Otimização | Economia | Peso Restante |
|------------|----------|---------------|
| Atual | — | 23,020 KiB |
| M1 — Imagens responsivas (max 480w) | -15,000 KiB | 8,020 KiB |
| M2 — Vídeos 480p + preload none | -4,000 KiB | 4,020 KiB |
| M5 — Fontes self-hosted + inline CSS | -80 KiB | 3,940 KiB |
| M6 — Remover Three.js + CustomCursor | -300 KiB | 3,640 KiB |
| M7 — Lazy loading agressivo | -500 KiB (adiado) | 3,140 KiB |
| **Total** | **~19,880 KiB** | **~3,140 KiB** |

**Ações:**

- Combinar M1 + M2 + M4 + M7 + M8 para redução de ~86% do payload
- Meta: mobile não deve baixar mais que **3-4MB** no total
- Hero isolado com `fetchpriority="high"` para iniciar o mais rápido possível
- Todo o resto deve vir depois com prioridade baixa

---

## 🔄 O que o Plano Geral Já Cobre (que ajuda mobile)

| Item do Plano Geral (`PLANO-OTIMIZACAO.md`) | Impacto Mobile |
|---------------------------------------------|----------------|
| **1. Imagens AVIF + srcset responsivo** | ⭐⭐⭐⭐⭐ Essencial |
| **2. Vídeos adaptativos (3 resoluções)** | ⭐⭐⭐⭐⭐ Essencial |
| **3. robots.txt** | ⭐ (SEO only) |
| **4. Fontes self-hosted + subset** | ⭐⭐⭐⭐⭐ 760ms savings |
| **5. Critical CSS inline** | ⭐⭐⭐⭐⭐ Essencial |
| **6. Priority hints estratégicos** | ⭐⭐⭐⭐⭐ Essencial |
| **7. Erros de console** | ⭐ |
| **8. Forced Reflow fix** | ⭐⭐⭐⭐⭐ Impacto 5-10x maior em mobile |
| **9. LCP Delay fix (LoadingScreen)** | ⭐⭐⭐⭐⭐ 4.5s de delay eliminado |
| **10. TBT alto fix** | ⭐⭐⭐⭐⭐ |
| **11-20. Demais itens** | Suporte geral |

**O plano mobile adiciona 10 itens específicos que NÃO estão no plano geral:**

| Item Mobile | O que faz de diferente |
|-------------|------------------------|
| **M1** | Resoluções menores para mobile (max 480w) |
| **M2** | Vídeos 480p + preload none + sem autoplay |
| **M3** | Não renderizar CustomCursor em touch |
| **M4** | Network-aware loading (detecta 3G/4G) |
| **M5** | Foco extra em render-blocking (760ms → ~50ms) |
| **M6** | Remover Three.js + GSAP ScrollTrigger em mobile |
| **M7** | Lazy loading mais agressivo (preload none) |
| **M8** | Carregamento progressivo de seções (IntersectionObserver) |
| **M9** | Touch optimization |
| **M10** | Meta de payload reduzido (23MB → 3MB) + cálculo de economia |

---

## 📊 Métricas Mobile Esperadas

| Métrica | Mobile Atual | Após Otimizações | Meta Google |
|---------|-------------|-------------------|-------------|
| **LCP** | 41.3s | **2.5-3.5s** | <4.0s (mobile) |
| **FCP** | 3.4s | **1.2-1.8s** | <3.0s (mobile) |
| **SI** | 4.8s | **2.0-3.0s** | <5.0s |
| **TBT** | 0ms* | **<100ms** | <200ms |
| **Render-blocking** | 760ms | **<100ms** | — |
| **Performance Score** | 65 | **85-95** | 90+ |
| **Page Weight** | 23 MB | **3-4 MB** | <5 MB |
| **Forced Reflow** | ~1.5-3s (est.) | **<20ms** | — |

---

## 📋 Ordem de Execução Mobile

| Fase | Item | Esforço | Impacto LCP | Impacto TBT |
|------|------|---------|-------------|-------------|
| **1** | M5 — Fontes self-hosted + inline CSS crítico | 2h | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **2** | M9 — Reduzir failsafe LoadingScreen 4.2s→1.5s | 15min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **3** | M9 — Remover `filter: blur()` das animações de entrada | 30min | ⭐⭐⭐⭐ | ⭐⭐ |
| **4** | M1 — srcset com resolução limitada (max 480w) | 2h | ⭐⭐⭐⭐⭐ | — |
| **5** | M5 — Redimensionar posters (5MB→50KB) | 1h | ⭐⭐⭐⭐ | — |
| **6** | M6 — Remover Three.js + CustomCursor em mobile | 1h | ⭐⭐ | ⭐⭐⭐ |
| **7** | M2 — Vídeos 480p em mobile + preload none + sem autoplay | 2h | ⭐⭐⭐⭐ | — |
| **8** | M7 — Lazy loading agressivo + fetchpriority low | 1h | ⭐⭐⭐⭐ | — |
| **9** | M9 — Touch optimization + hit targets | 1h | ⭐ | — |
| **10** | M3 — CustomCursor não renderizar em mobile | 30min | ⭐ | ⭐⭐ |
| **11** | M8 — Progressive content loading (IntersectionObserver) | 3h | ⭐⭐⭐ | ⭐⭐ |
| **12** | M4 — Network-aware loading hook | 3h | ⭐⭐⭐ | ⭐ |
| **13** | M10 — Validação de payload reduzido (23MB→3MB) | 30min | — | — |

---

**Estimativa total mobile:** ~18h (sendo ~8h específicas, ~10h sobrepostas com plano geral)

**Resultado esperado:** LCP **41.3s → ~3.0s**, Performance **65 → 90+**, Page Weight **23MB → ~3MB**, Render-blocking **760ms → <100ms**
