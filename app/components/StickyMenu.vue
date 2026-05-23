<script setup lang="ts">
import AppTransitionLink from '~/components/AppTransitionLink.vue'
</script>

<template>
  <header class="bg-bg left-0 right-0 top-0 fixed z-50">
    <nav class="text-[20px] leading-[24px] tracking-[-0.8px] font-500 font-body mx-auto px-7 py-3 max-w-container">
      <div class="grid-cols-12 hidden items-center md:grid">
        <AppTransitionLink to="/" class="text-text col-span-1 whitespace-nowrap justify-self-start">
          dogan teke
        </AppTransitionLink>
        <AppTransitionLink to="/#work" class="nav-link col-span-1 col-start-4 whitespace-nowrap justify-self-center">
          work
        </AppTransitionLink>
        <AppTransitionLink to="/#about" class="nav-link col-span-1 col-start-8 whitespace-nowrap justify-self-center">
          about me
        </AppTransitionLink>
        <AppTransitionLink to="/#contact" class="nav-link col-span-1 col-start-12 whitespace-nowrap justify-self-end">
          start a project
        </AppTransitionLink>
      </div>
      <div class="flex items-center justify-between md:hidden">
        <AppTransitionLink to="/#top" class="text-text">
          dogan teke
        </AppTransitionLink>
        <AppTransitionLink to="/#work" class="nav-link">
          work
        </AppTransitionLink>
      </div>
    </nav>
  </header>
</template>
