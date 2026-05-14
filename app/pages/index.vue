<template>
  <main class="page-shell">
    <section class="page-wrap">
      <nav class="mb-8 flex items-center justify-between text-sm font-500 tracking-tight">
        <span class="text-[#f6f4f0]">mike bennet</span>
        <div class="hidden gap-8 md:flex">
          <a href="#work" class="nav-link">work</a>
          <a href="#about" class="nav-link">about me</a>
          <a href="#contact" class="nav-link">start a project</a>
        </div>
      </nav>

      <header class="pt-4">
        <h1 class="headline">
          mike bennet
        </h1>
        <div class="mt-7 flex justify-end">
          <p class="max-w-[46rem] text-kicker leading-[1.15] text-muted">
            i design strategic brand identities that help small businesses and startups stand out and connect with their customers.
          </p>
        </div>
      </header>

      <section id="work" class="mt-section grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
        <article
          v-for="project in projects"
          :key="project.title"
          class="group"
          :class="project.layout"
        >
          <div class="overflow-hidden rounded-[10px] bg-surface">
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

      <section id="about" ref="aboutRef" class="mt-sectionLg">
        <h2
          class="mb-16 text-statement leading-[0.96] font-600 tracking-tight text-transparent bg-clip-text transition-[background-size] duration-1000 ease-out"
          :class="aboutInView ? 'bg-[linear-gradient(90deg,#ece8df_0%,#ece8df_100%)] bg-no-repeat bg-[length:100%_100%]' : 'bg-[linear-gradient(90deg,#3d3f44_0%,#ece8df_100%)] bg-no-repeat bg-[length:0%_100%]'"
        >
          i'm Mike Bennet, a brand designer based in Portland, Oregon. I work with small business owners and startup founders who want a brand identity that positions them as the premium choice in their market.
        </h2>
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr_1fr]">
          <img
            src="https://framerusercontent.com/images/qH75Va6nL5ddkYAQwubJVI0QORI.png?scale-down-to=2048&width=1600&height=2400"
            alt="Portrait of Mike Bennet"
            class="w-full rounded-[10px] object-cover"
          >
          <div>
            <p class="text-base text-muted">
              why work with me
            </p>
            <p class="mt-4 max-w-[26ch] text-bodyLg leading-[1.1] font-500">
              i believe the best brands come from true collaboration. when we work together, you're not just getting a designer, you're getting a strategic partner who takes time to understand your business, your customers, and your goals.
            </p>
            <button class="mt-10 rounded-[8px] bg-text px-8 py-4 text-lg font-500 text-[#1a1a1a] transition-all duration-250 hover:bg-[#f6f4f0] active:scale-[0.985]">
              download resume
            </button>
          </div>
          <div>
            <p class="text-base text-muted">
              when i'm not designing
            </p>
            <p class="mt-4 max-w-[26ch] text-bodyLg leading-[1.1] font-500">
              you'll find me exploring portland's coffee scene, hiking around mt. hood, or shooting film photography. i'm always looking for inspiration in unexpected places, whether that's vintage typography at a flea market or color combinations in nature.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" class="mt-sectionLg">
        <div class="grid items-center gap-8 md:grid-cols-3">
          <h2 class="text-[clamp(4.75rem,9.5vw,13.75rem)] leading-none font-600 tracking-tight">
            get in
          </h2>
          <img
            src="https://framerusercontent.com/images/SSdVHX1oKvAE62eonEHC5cIiM.png?scale-down-to=1024&width=2400&height=2400"
            alt="close-up portrait"
            class="w-full rounded-[10px] object-cover keyframes-float animate-[float_5s_ease-in-out_infinite]"
          >
          <h2 class="text-right text-[clamp(4.75rem,9.5vw,13.75rem)] leading-none font-600 tracking-tight">
            touch
          </h2>
        </div>
      </section>

      <footer class="mt-section border-t border-line pt-18 pb-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div class="space-y-3">
            <p class="footer-link">email: mike@mikebennet.design</p>
            <p class="footer-link">based in: portland, oregon</p>
            <p class="footer-link">available for: freelance projects & full-time</p>
          </div>
          <div class="grid grid-cols-2 gap-10">
            <div>
              <p class="text-base text-muted">
                pages
              </p>
              <div class="mt-2 space-y-1 text-[1.95rem] leading-[1.1] font-500">
                <p>home</p>
                <p>about</p>
                <p>work</p>
              </div>
            </div>
            <div>
              <p class="text-base text-muted">
                socials
              </p>
              <div class="mt-2 space-y-1 text-[1.95rem] leading-[1.1] font-500">
                <p>instagram</p>
                <p>x(twitter)</p>
                <p>linkedin</p>
              </div>
            </div>
          </div>
        </div>
        <h2 class="headline mt-24">
          mike bennet
        </h2>
        <div class="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 text-sm text-muted">
          <p>© 2026 mike bennet. all rights reserved</p>
          <p>framer template created by lazar filipovic</p>
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
    title: 'brew can co.',
    subtitle: 'packaging design',
    image: 'https://framerusercontent.com/images/DE2VADP6O5auX55YcUKNxpqRQWU.webp?width=1365&height=2048',
    alt: 'Minimalist coffee can design in hand',
    layout: 'lg:col-span-8',
  },
  {
    title: 'lemon drop',
    subtitle: 'brand identity & positioning',
    image: 'https://framerusercontent.com/images/ih5DUyl9FkErFmy16ISk8b3VA.jpg?width=1365&height=2048',
    alt: 'White branded cap on lemons',
    layout: 'lg:col-span-4 lg:pt-8',
  },
  {
    title: 'kernel house',
    subtitle: 'brand identity',
    image: 'https://framerusercontent.com/images/fYvQjvgH7i51arHZEPZLPlpbf8M.jpg?width=1365&height=2048',
    alt: 'Stack of modern books on leather chair',
    layout: 'lg:col-span-6',
  },
  {
    title: 'scoop & roll',
    subtitle: 'complete brand identity',
    image: 'https://framerusercontent.com/images/QOH1Zk5nsoAVg2S4bHQmbD476g.jpg?scale-down-to=2048&width=4500&height=3002',
    alt: 'Pastel ice cream packaging design',
    layout: 'lg:col-span-6 lg:pt-12',
  },
  {
    title: 'peak performance',
    subtitle: 'packaging design & brand identity',
    image: 'https://framerusercontent.com/images/orUVxfxWedv09ke2YHn9uGVoYnM.jpg?scale-down-to=2048&width=4000&height=2669',
    alt: 'Sports supplement packaging tubes',
    layout: 'lg:col-span-6',
  },
  {
    title: 'savor magazine',
    subtitle: 'print design & editorial branding',
    image: 'https://framerusercontent.com/images/900m0LBN2F4i9KSHVdT3tWA40qc.jpg?scale-down-to=2048&width=4500&height=3003',
    alt: 'Food magazine brochure mockup',
    layout: 'lg:col-span-6 lg:pt-8',
  },
]
</script>
