<script setup lang="ts">
import type { ResumeLocale } from '~~/shared/resume'
import { useScrollLock } from '@vueuse/core'
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { Icon } from '#components'

interface ResumeDownloadModalProps {
  modelValue: boolean
  isSubmitting?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<ResumeDownloadModalProps>(), {
  isSubmitting: false,
  errorMessage: '',
})

const emit = defineEmits<{
  'submit': [payload: { password: string, locale: ResumeLocale }]
  'update:modelValue': [value: boolean]
}>()

const passwordInputRef = ref<HTMLInputElement | null>(null)
const password = ref('')
const selectedLocale = ref<ResumeLocale>('en')
const bodyScrollLock = import.meta.client ? useScrollLock(document.body) : ref(false)

function localeButtonClass(locale: ResumeLocale) {
  return selectedLocale.value === locale
    ? 'border border-text bg-text text-bg'
    : 'border border-line bg-transparent text-muted hover:border-text/40 hover:text-text'
}

function closeModal() {
  emit('update:modelValue', false)
}

function handleSubmit() {
  if (!password.value.trim() || props.isSubmitting)
    return

  emit('submit', {
    password: password.value,
    locale: selectedLocale.value,
  })
}

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      password.value = ''
      bodyScrollLock.value = true

      await nextTick()
      passwordInputRef.value?.focus()
      return
    }

    bodyScrollLock.value = false
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  bodyScrollLock.value = false
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-250 ease-[cubic-bezier(0.2,0.95,0.34,1)] transition-all"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-180 ease-out transition-all"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="px-4 py-6 bg-bg/72 flex items-end inset-0 justify-center fixed z-80 backdrop-blur-lg sm:items-center"
        role="presentation"
        @click.self="closeModal"
      >
        <Transition
          enter-active-class="duration-300 ease-[cubic-bezier(0.2,0.95,0.34,1)] transition-all"
          enter-from-class="translate-y-10 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="duration-180 ease-out transition-all"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-6 opacity-0"
        >
          <section
            v-if="modelValue"
            class="p-6 border border-line rounded-md bg-surface/96 max-w-[38rem] w-full shadow-[0_24px_80px_rgba(0,0,0,0.35)] relative overflow-hidden sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-download-title"
          >
            <button
              type="button"
              class="text-muted border border-line rounded-md inline-flex h-10 w-10 transition-colors duration-200 items-center right-4 top-4 justify-center absolute hover:text-text hover:border-text/30"
              aria-label="Close password dialog"
              @click="closeModal"
            >
              <Icon name="ph:x" class="text-lg color-stone-200" />
            </button>

            <p class="text-[0.8rem] text-muted tracking-[0.28em] mb-3 uppercase">
              protected document
            </p>
            <h2
              id="resume-download-title"
              class="text-[clamp(2.6rem,7vw,4.6rem)] text-text leading-[0.92] tracking-[-0.06em] font-headline"
            >
              password
            </h2>
            <p class="text-[0.98rem] text-muted leading-[1.6] mt-4 max-w-[32rem] sm:text-[1.05rem]">
              Enter the portfolio password and choose the document language. The signed download link stays valid for 7 days.
            </p>

            <div class="mt-8 flex gap-3">
              <button
                type="button"
                class="text-[0.9rem] tracking-[-0.02em] font-500 px-4 py-2 rounded-md transition-colors duration-200"
                :class="localeButtonClass('en')"
                @click="selectedLocale = 'en'"
              >
                english
              </button>
              <button
                type="button"
                class="text-[0.9rem] tracking-[-0.02em] font-500 px-4 py-2 rounded-md transition-colors duration-200"
                :class="localeButtonClass('de')"
                @click="selectedLocale = 'de'"
              >
                deutsch
              </button>
            </div>

            <form class="mt-6" @submit.prevent="handleSubmit">
              <label class="block" for="resume-download-password">
                <span class="sr-only">Portfolio password</span>
                <input
                  id="resume-download-password"
                  ref="passwordInputRef"
                  v-model="password"
                  type="password"
                  name="password"
                  autocomplete="current-password"
                  spellcheck="false"
                  inputmode="text"
                  placeholder="Enter password"
                  class="text-[clamp(1.4rem,4vw,2.4rem)] text-text tracking-[-0.05em] font-headline px-5 py-4 outline-none border border-line rounded-md bg-bg/55 min-h-[4.75rem] w-full transition-colors duration-200 placeholder:text-muted/60 focus:border-text/40"
                >
              </label>

              <p
                v-if="errorMessage"
                class="text-[0.95rem] text-[#f4caca] leading-[1.5] mt-4 px-4 py-3 border border-[#5d2b2b] rounded-md bg-[#2a1616]/80"
              >
                {{ errorMessage }}
              </p>

              <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-[0.92rem] text-muted leading-[1.5]">
                  Press Enter to unlock the portfolio PDF.
                </p>
                <button
                  type="submit"
                  class="text-[0.98rem] text-bg tracking-[-0.03em] font-500 px-6 py-3 border border-text rounded-md bg-text inline-flex min-w-[10rem] transition-all duration-200 items-center justify-center hover:bg-[#f6f4f0] disabled:opacity-60 disabled:cursor-not-allowed"
                  :disabled="isSubmitting || !password.trim()"
                >
                  {{ isSubmitting ? 'unlocking...' : 'unlock download' }}
                </button>
              </div>
            </form>
          </section>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
