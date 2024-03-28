<template>
  <header
    class="flex gap-3 justify-between items-center bg-gray-900 border-b border-white/10"
  >
    <h1 class="flex gap-2 items-center px-4 font-bold tracking-wide">
      <Icon class="w-5 h-5" name="i-lucide-chevron-right-square" /><span
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
      class="flex items-center border-l divide-x divide-white/10 border-white/10"
    >
      <UTooltip text="Download file" @click="$emit('download')">
        <button class="px-3 h-9 text-sm border-white/10 hover:bg-gray-950">
          <Icon name="i-lucide-download" class="w-4 h-4" />
        </button>
      </UTooltip>
      <UTooltip text="Copy code">
        <button
          @click="$emit('copy')"
          class="px-3 h-9 text-sm border-white/10 hover:bg-gray-950"
        >
          <Icon name="i-lucide-copy" class="w-4 h-4" />
        </button>
      </UTooltip>
      <UTooltip v-if="publishEnabled" text="Publish">
        <button
          @click="$emit('publish')"
          class="px-3 h-9 text-sm border-white/10 hover:bg-gray-950"
        >
          <Icon name="i-lucide-external-link" class="w-4 h-4" />
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
    required: false,
  },
});
const { snippet } = useEditor();
</script>

<style></style>
