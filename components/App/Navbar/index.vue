<template>
  <header
    class="border-b bg-gray-900 border-white/10 flex items-center justify-between gap-3"
  >
    <h1 class="font-bold tracking-wide flex items-center gap-2 px-4">
      <Icon class="h-5 w-5" name="i-lucide-chevron-right-square" /><span
        >CODESHARE</span
      >
    </h1>
    <UInput
      v-if="publishEnabled"
      v-model="snippet.title"
      placeholder="untitled.txt"
      size="2xs"
    />
    <span v-else class="text-xs">{{ title }}</span>
    <div
      class="border-l divide-x divide-white/10 border-white/10 flex items-center"
    >
      <UTooltip text="Download file" @click="$emit('download')">
        <button class="border-white/10 h-9 px-3 text-sm hover:bg-gray-950">
          <Icon name="i-lucide-download" class="h-4 w-4" />
        </button>
      </UTooltip>
      <UTooltip text="Copy code">
        <button
          @click="$emit('copy')"
          class="border-white/10 h-9 px-3 text-sm hover:bg-gray-950"
        >
          <Icon name="i-lucide-copy" class="h-4 w-4" />
        </button>
      </UTooltip>
      <UTooltip v-if="publishEnabled" text="Publish">
        <button
          @click="$emit('publish')"
          class="border-white/10 h-9 px-3 text-sm hover:bg-gray-950"
        >
          <Icon name="i-lucide-external-link" class="h-4 w-4" />
        </button>
      </UTooltip>
    </div>
  </header>
</template>

<script setup>
defineProps({
  publishEnabled: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
const { snippet } = useEditor();
</script>

<style></style>
