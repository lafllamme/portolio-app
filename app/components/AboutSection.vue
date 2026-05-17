<script setup lang="ts">
import ScrollReveal from '~/components/ScrollReveal.vue'

const aboutScrollText = `i'm Dogan Teke, a fullstack developer with a strong frontend focus. I help teams ship scalable web products with modern technologies, sharp interaction design, and AI-powered features that create real value.`
</script>

<template>
  <section id="about" class="mt-[11.5rem]">
    <ScrollReveal
      :children="aboutScrollText"
      :base-rotation="3"
      container-class-name="font-headline text-[clamp(3.1rem,5.625vw,4.5rem)] leading-[1.1] tracking-[-0.05em] font-500 mb-16 text-text"
      text-class-name="block"
      rotation-end="bottom 78%"
      word-animation-end="bottom 62%"
    />
    <div class="gap-12 grid grid-cols-1 antialiased lg:gap-10 lg:grid-cols-[1fr_1fr_1fr]">
      <img
        src="https://i.imgur.com/OAs7adG.png"
        alt="Portrait of Dogan Teke"
        class="rounded-[8px] w-full object-cover"
      >
      <div>
        <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px]">
          why work with me
        </p>
        <p class="font-body text-[24px] leading-[28.8px] tracking-[-0.48px] font-500 mt-[10px]">
          i combine product thinking with engineering execution. from architecture to polished UI, i focus on performance, maintainability, and a design standard that feels intentional on every screen.
        </p>
        <button class="font-body text-[16px] text-[#1a1a1a] leading-[19.2px] tracking-[-0.48px] font-500 mt-9 px-6 py-3 rounded-[4px] bg-text transition-all duration-250 hover:bg-[#f6f4f0] active:scale-[0.985]">
          download resume
        </button>
      </div>
      <div>
        <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px]">
          current focus
        </p>
        <p class="font-body text-[24px] leading-[28.8px] tracking-[-0.48px] font-500 mt-[10px]">
          fullstack development with modern TypeScript stacks, advanced frontend systems, and applied AI workflows. i care about developer velocity, visual quality, and shipping features users actually use.
        </p>
      </div>
    </div>
  </section>
</template>
