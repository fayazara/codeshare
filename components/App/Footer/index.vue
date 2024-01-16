<template>
  <footer
    class="border-t bg-gray-900 border-white/10 flex items-center justify-between"
  >
    <div
      class="flex items-center divide-x divide-white/10 text-xs [&>div]:p-2 border-r border-white/10"
    >
      <div>
        <span class="font-semibold">{{ wordCount }}</span>
        <span class="text-gray-300"> words</span>
      </div>
      <div>
        <span class="font-semibold">{{ letterCount }}</span>
        <span class="text-gray-300"> letters</span>
      </div>
      <div>
        <span class="font-semibold">{{ lineCount }}</span>
        <span class="text-gray-300"> lines</span>
      </div>
    </div>
    <div
      class="flex items-center divide-x divide-white/10 text-xs border-l border-white/10"
    >
      <UTooltip
        :text="`Toggle minimap (${
          MONACO_EDITOR_OPTIONS.minimap.enabled ? 'on' : 'off'
        })`"
        :shortcuts="['CTRL', 'M']"
        :popper="{ placement: 'top' }"
      >
        <button class="p-2 hover:bg-gray-950" @click="toggleMinimap">
          <Icon name="i-heroicons-map" class="h-4 w-4" />
        </button>
      </UTooltip>
      <UTooltip
        text="Format code"
        :shortcuts="['CTRL', 'F']"
        :popper="{ placement: 'top' }"
      >
        <button class="p-2 hover:bg-gray-950" @click="formatCode">
          <Icon name="i-lucide-sparkles" class="h-4 w-4" />
        </button>
      </UTooltip>
      <USelectMenu
        v-model="selectedLanguage"
        :options="languages"
        class="w-48"
        searchable
        id="language-select"
        searchable-placeholder="Search a language..."
        :ui="{ rounded: '' }"
      />
    </div>
  </footer>
</template>

<script setup></script>

<style></style>
