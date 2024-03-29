<template>
  <main class="flex flex-col h-screen text-white">
    <AppNavbar
      @publish="publishSnippet"
      @copy="copySnippet"
      @download="downloadSnippet"
      :publish-enabled="false"
      :title="snippet.title"
    />
    <div class="flex flex-1">
      <AppSidebar />
      <ClientOnly>
        <vue-monaco-editor
          v-model:value="snippet.body"
          theme="vs-dark"
          :options="MONACO_EDITOR_OPTIONS"
          :language="snippet.language"
          @mount="handleMount"
          class="flex-1"
          @change="onChange"
        >
          <template #default>
            <div class="flex justify-center items-center">
              <div class="text-gray-500">Loading editor...</div>
            </div>
          </template>
        </vue-monaco-editor>
      </ClientOnly>
    </div>
    <footer
      class="flex justify-between items-center bg-gray-900 border-t border-white/10"
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
        class="flex items-center text-xs border-l divide-x divide-white/10 border-white/10"
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
            <Icon name="i-heroicons-map" class="w-4 h-4" />
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
            <Icon name="i-lucide-sparkles" class="w-4 h-4" />
          </button>
        </UTooltip>
        <USelectMenu
          v-model="snippet.language"
          :options="languages"
          class="w-48"
          searchable
          id="language-select"
          searchable-placeholder="Search a language..."
          :ui="{ rounded: '' }"
        />
      </div>
    </footer>
    <UModal v-model="confirmationModal">
      <div class="p-4 space-y-4">
        <p>Publish code</p>
        <UFormGroup label="File name">
          <UInput size="lg" placeholder="File name" v-model="snippet.title" />
        </UFormGroup>
        <UAlert
          icon="i-heroicons-exclamation-triangle"
          title="Heads up!"
          description="This snippet will be public and anyone will be able to see it. Make sure you don't include any sensitive information."
        />
        <UButton @click="confirmPublish" size="lg" block color="black"
          >Publish</UButton
        >
      </div>
    </UModal>
  </main>
</template>

<script setup>
const {
  MONACO_EDITOR_OPTIONS,
  languages,
  editorRef,
  confirmationModal,
  lineCount,
  toggleMinimap,
  handleMount,
  onChange,
  formatCode,
  publishSnippet,
  confirmPublish,
  copySnippet,
  downloadSnippet,
} = useEditor();
const route = useRoute();
const { data: snippet } = await useFetch(`/api/codebin/${route.params.id}`);

const wordCount = computed(() => {
  const text = snippet.value.body;
  const words = text.match(/\w+/g);
  return words ? words.length : 0;
});

const letterCount = computed(() => {
  const text = snippet.value.body;
  return text.length;
});

useHead({
  title: `${snippet.value.title} - Codeshare.app`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: `Codeshare.app - ${snippet.value.title}`,
    },
  ],
});
</script>

<style>
#language-select {
  @apply ring-0 !important;
}
</style>
