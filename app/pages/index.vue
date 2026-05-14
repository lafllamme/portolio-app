<template>
  <main class="page-shell">
    <section class="page-wrap">
      <nav class="mb-10 flex items-center justify-between text-[20px] leading-[24px] font-500 tracking-[-0.8px]">
        <span class="text-[#f6f4f0]">dogan teke</span>
        <div class="hidden items-center gap-12 md:flex">
          <a href="#work" class="nav-link">work</a>
          <a href="#about" class="nav-link">about me</a>
          <a href="#contact" class="nav-link">start a project</a>
        </div>
      </nav>

      <header class="pt-4">
        <h1 class="headline md:text-[225.853px] md:leading-[203.268px] md:tracking-[-13.5512px]">
          dogan teke
        </h1>
        <div class="mt-4 flex justify-end">
          <p class="max-w-[600px] text-[24px] leading-[28.8px] tracking-[-0.96px] text-muted">
            i build modern fullstack products with a frontend-first mindset, combining clean UX, robust architecture, and practical AI integrations.
          </p>
        </div>
      </header>

      <section id="work" class="mt-[5.8rem] grid grid-cols-1 gap-x-6 gap-y-16 lg:grid-cols-12">
        <article
          v-for="project in projects"
          :key="project.title"
          class="group"
          :class="project.layout"
        >
          <div class="overflow-hidden rounded-[0px] bg-surface">
            <img
              :src="project.image"
              :alt="project.alt"
              class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.022]"
            >
          </div>
          <h2 class="card-title">
            {{ project.title }}
          </h2>
          <p class="card-meta">
            {{ project.subtitle }}
          </p>
        </article>
      </section>

      <section id="about" ref="aboutRef" class="mt-[11.5rem]">
        <h2
          class="mb-16 text-statement leading-[0.96] font-600 tracking-tight text-transparent bg-clip-text transition-[background-size] duration-1000 ease-out"
          :class="aboutInView ? 'bg-[linear-gradient(90deg,#ece8df_0%,#ece8df_100%)] bg-no-repeat bg-[length:100%_100%]' : 'bg-[linear-gradient(90deg,#3d3f44_0%,#ece8df_100%)] bg-no-repeat bg-[length:0%_100%]'"
        >
          i'm Dogan Teke, a fullstack developer with a strong frontend focus. I help teams ship scalable web products with modern technologies, sharp interaction design, and AI-powered features that create real value.
        </h2>
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr_1fr] lg:gap-10">
          <img
            src="https://framerusercontent.com/images/qH75Va6nL5ddkYAQwubJVI0QORI.png?scale-down-to=2048&width=1600&height=2400"
            alt="Portrait of Dogan Teke"
            class="w-full rounded-[8px] object-cover"
          >
          <div>
            <p class="text-[1.25rem] leading-none text-muted">
              why work with me
            </p>
            <p class="mt-4 max-w-[26ch] text-bodyLg leading-[1.1] font-500">
              i combine product thinking with engineering execution. from architecture to polished UI, i focus on performance, maintainability, and a design standard that feels intentional on every screen.
            </p>
            <button class="mt-9 rounded-[8px] bg-text px-8 py-4 text-[2rem] leading-none font-500 text-[#1a1a1a] transition-all duration-250 hover:bg-[#f6f4f0] active:scale-[0.985]">
              download cv
            </button>
          </div>
          <div>
            <p class="text-[1.25rem] leading-none text-muted">
              current focus
            </p>
            <p class="mt-4 max-w-[26ch] text-bodyLg leading-[1.1] font-500">
              fullstack development with modern TypeScript stacks, advanced frontend systems, and applied AI workflows. i care about developer velocity, visual quality, and shipping features users actually use.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" class="mt-[10.75rem]">
        <div class="grid items-center gap-8 md:grid-cols-3">
          <h2 class="text-contact leading-none font-600 tracking-tight">
            get in
          </h2>
          <img
            src="https://framerusercontent.com/images/SSdVHX1oKvAE62eonEHC5cIiM.png?scale-down-to=1024&width=2400&height=2400"
            alt="close-up portrait"
            class="w-full rounded-[10px] object-cover"
          >
          <h2 class="text-right text-contact leading-none font-600 tracking-tight">
            touch
          </h2>
        </div>
      </section>

      <footer class="mt-[8.5rem] border-t border-line pt-18 pb-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div class="space-y-3">
            <p class="footer-link">email: dogan@doganteke.dev</p>
            <p class="footer-link">based in: europe, remote-first</p>
            <p class="footer-link">available for: freelance, consulting & product builds</p>
          </div>
          <div class="grid grid-cols-2 gap-10">
            <div>
              <p class="text-[16px] leading-[19.2px] tracking-[-0.32px] text-muted">
                pages
              </p>
              <div class="mt-2 space-y-1 text-[20px] leading-[24px] tracking-[-0.8px] font-500">
                <p>home</p>
                <p>about</p>
                <p>work</p>
              </div>
            </div>
            <div>
              <p class="text-[16px] leading-[19.2px] tracking-[-0.32px] text-muted">
                socials
              </p>
              <div class="mt-2 space-y-1 text-[20px] leading-[24px] tracking-[-0.8px] font-500">
                <p>instagram</p>
                <p>x(twitter)</p>
                <p>linkedin</p>
              </div>
            </div>
          </div>
        </div>
        <h2 class="headline mt-24">
          dogan teke
        </h2>
        <div class="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 text-sm text-muted">
          <p>© 2026 dogan teke. all rights reserved</p>
          <p>fullstack frontend engineering · modern ai products</p>
        </div>
      </footer>
    </section>
  </main>
</template>

<script setup lang="ts">
const aboutRef = ref<HTMLElement | null>(null)
const aboutInView = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!aboutRef.value)
    return
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        aboutInView.value = true
    })
  }, { threshold: 0.35 })
  observer.observe(aboutRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

const projects = [
  {
    title: 'ai commerce studio',
    subtitle: 'fullstack product engineering',
    image: 'https://framerusercontent.com/images/DE2VADP6O5auX55YcUKNxpqRQWU.webp?width=1365&height=2048',
    alt: 'Minimalist coffee can design in hand',
    layout: 'lg:col-span-8',
  },
  {
    title: 'vision copilot',
    subtitle: 'frontend systems & ai ux',
    image: 'https://framerusercontent.com/images/ih5DUyl9FkErFmy16ISk8b3VA.jpg?width=1365&height=2048',
    alt: 'White branded cap on lemons',
    layout: 'lg:col-span-4 lg:pt-8',
  },
  {
    title: 'edge analytics',
    subtitle: 'dashboard architecture',
    image: 'https://framerusercontent.com/images/fYvQjvgH7i51arHZEPZLPlpbf8M.jpg?width=1365&height=2048',
    alt: 'Stack of modern books on leather chair',
    layout: 'lg:col-span-6',
  },
  {
    title: 'neural workspace',
    subtitle: 'design system & ai tools',
    image: 'https://framerusercontent.com/images/QOH1Zk5nsoAVg2S4bHQmbD476g.jpg?scale-down-to=2048&width=4500&height=3002',
    alt: 'Pastel ice cream packaging design',
    layout: 'lg:col-span-6 lg:pt-12',
  },
  {
    title: 'runtime cloud',
    subtitle: 'platform frontend',
    image: 'https://framerusercontent.com/images/orUVxfxWedv09ke2YHn9uGVoYnM.jpg?scale-down-to=2048&width=4000&height=2669',
    alt: 'Sports supplement packaging tubes',
    layout: 'lg:col-span-6',
  },
  {
    title: 'agent studio',
    subtitle: 'fullstack ai workflows',
    image: 'https://framerusercontent.com/images/900m0LBN2F4i9KSHVdT3tWA40qc.jpg?scale-down-to=2048&width=4500&height=3003',
    alt: 'Food magazine brochure mockup',
    layout: 'lg:col-span-6 lg:pt-8',
  },
]
</script>
