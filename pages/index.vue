<template>
  <main class="h-screen flex flex-col text-white">
    <header
      class="border-b bg-gray-900 border-white/10 flex items-center justify-between gap-3"
    >
      <h1 class="font-bold tracking-wide flex items-center gap-2 px-4">
        <Icon class="h-5 w-5" name="i-lucide-chevron-right-square" /><span
          >CODESHARE</span
        >
      </h1>
      <div
        class="border-l divide-x divide-white/10 border-white/10 flex items-center"
      >
        <UTooltip text="Download file">
          <button class="border-white/10 h-9 px-3 text-sm hover:bg-gray-950">
            <Icon name="i-lucide-download" class="h-4 w-4" />
          </button>
        </UTooltip>
        <UTooltip text="Copy code">
          <button class="border-white/10 h-9 px-3 text-sm hover:bg-gray-950">
            <Icon name="i-lucide-copy" class="h-4 w-4" />
          </button>
        </UTooltip>
        <UTooltip text="Fork">
          <button class="border-white/10 h-9 px-3 text-sm hover:bg-gray-950">
            <Icon name="i-lucide-git-fork" class="h-4 w-4" />
          </button>
        </UTooltip>
        <UTooltip text="Publish">
          <button class="border-white/10 h-9 px-3 text-sm hover:bg-gray-950">
            <Icon name="i-lucide-send" class="h-4 w-4" />
          </button>
        </UTooltip>
      </div>
    </header>
    <div class="flex-1 flex">
      <aside
        class="aside sticky top-0 border-r border-white/10 w-12 flex flex-col items-center py-0.5 z-[50]"
      >
        <UTooltip
          text="New code bin"
          :shortcuts="['CTRL', 'N']"
          :popper="{ placement: 'right' }"
        >
          <UButton
            icon="i-lucide-file-code-2"
            square
            variant="ghost"
            color="gray"
            size="lg"
            class="flex items-center justify-center"
          />
        </UTooltip>
        <UTooltip
          text="New diff editor"
          :shortcuts="['CTRL', 'D']"
          :popper="{ placement: 'right' }"
        >
          <UButton
            icon="i-lucide-file-diff"
            square
            variant="ghost"
            color="gray"
            size="lg"
            class="flex items-center justify-center"
          />
        </UTooltip>
      </aside>
      <ClientOnly>
        <vue-monaco-editor
          v-model:value="code"
          theme="vs-dark"
          :options="MONACO_EDITOR_OPTIONS"
          :language="selectedLanguage"
          @mount="handleMount"
          class="flex-1"
          @change="onChange"
        >
          <template #default>
            <div class="flex items-center justify-center">
              <div class="text-gray-500">Loading editor...</div>
            </div>
          </template>
        </vue-monaco-editor>
      </ClientOnly>
    </div>
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
          <button
            class="p-2 hover:bg-gray-950"
            @click="toggleMinimap"
            :disabled="!editorRef"
          >
            <Icon name="i-heroicons-map" class="h-4 w-4" />
          </button>
        </UTooltip>
        <UTooltip
          text="Format code"
          :shortcuts="['CTRL', 'F']"
          :popper="{ placement: 'top' }"
        >
          <button
            class="p-2 hover:bg-gray-950"
            @click="formatCode"
            :disabled="!editorRef"
          >
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
  </main>
</template>

<script setup>
const {
  MONACO_EDITOR_OPTIONS,
  selectedLanguage,
  languages,
  code,
  lineCount,
  wordCount,
  letterCount,
  editorRef,
  toggleMinimap,
  handleMount,
  onChange,
  formatCode,
} = useEditor();
</script>

<style>
#language-select {
  @apply ring-0 !important;
}
</style>
