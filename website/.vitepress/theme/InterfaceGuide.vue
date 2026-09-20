<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'

const preference = inject<Ref<string>>('guide-interface', ref('web'))
const ready = ref(false)
onMounted(() => {
  ready.value = true
})
</script>

<template>
  <div class="interface-guide">
    <label v-if="ready" class="interface-guide__choice">
      Instructions for
      <select v-model="preference">
        <option value="web">Web app (recommended)</option>
        <option value="cli">CLI / Agent</option>
      </select>
    </label>
    <p v-if="ready" class="interface-guide__hint">Your choice follows you between guide pages.</p>
    <section v-show="!ready || preference === 'web'" aria-label="Web app instructions">
      <slot name="web" />
    </section>
    <section v-show="!ready || preference === 'cli'" aria-label="CLI and Agent instructions">
      <slot name="cli" />
    </section>
  </div>
</template>

<style scoped>
.interface-guide__choice {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
select {
  padding: 0.4rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  font: inherit;
}
select:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.interface-guide__hint {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}
</style>
