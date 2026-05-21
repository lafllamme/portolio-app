<script setup lang="ts">
import { NuxtLink } from '#components'
</script>

<template>
  <header class="bg-bg left-0 right-0 top-0 fixed z-50">
    <nav class="text-[20px] leading-[24px] tracking-[-0.8px] font-500 font-body mx-auto px-7 py-3 max-w-container">
      <div class="grid-cols-12 hidden items-center md:grid">
        <NuxtLink to="/#top" class="text-[#f6f4f0] col-span-1 whitespace-nowrap justify-self-start">
          dogan teke
        </NuxtLink>
        <NuxtLink to="/#work" class="nav-link col-span-1 col-start-4 whitespace-nowrap justify-self-center">
          work
        </NuxtLink>
        <NuxtLink to="/#about" class="nav-link col-span-1 col-start-8 whitespace-nowrap justify-self-center">
          about me
        </NuxtLink>
        <NuxtLink to="/#contact" class="nav-link col-span-1 col-start-12 whitespace-nowrap justify-self-end">
          start a project
        </NuxtLink>
      </div>
      <div class="flex items-center justify-between md:hidden">
        <NuxtLink to="/#top" class="text-[#f6f4f0]">
          dogan teke
        </NuxtLink>
        <NuxtLink to="/#work" class="nav-link">
          work
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
