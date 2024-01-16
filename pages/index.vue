<template>
  <main class="h-screen flex flex-col text-white">
    <AppNavbar
      @publish="publishSnippet"
      @copy="copySnippet"
      @download="downloadSnippet"
      @fork="forkSnippet"
    />
    <div class="flex-1 flex">
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
        <UFormGroup label="Email">
          <UInput size="lg" placeholder="File name" v-model="snippet.title" />
        </UFormGroup>
        <UAlert
          icon="i-heroicons-exclamation-triangle"
          title="Heads up!"
          description="This snippet will be public and anyone will be able to see it. Make sure you don't include any sensitive information."
        />
        <UButton size="lg" block color="black">Publish</UButton>
      </div>
    </UModal>
  </main>
</template>

<script setup>
const {
  MONACO_EDITOR_OPTIONS,
  languages,
  lineCount,
  wordCount,
  letterCount,
  editorRef,
  toggleMinimap,
  snippet,
  handleMount,
  onChange,
  formatCode,
} = useEditor();

const confirmationModal = ref(false);

const publishSnippet = async () => {
  if (!snippet.value.body) {
    return;
  }
  confirmationModal.value = true;
  // const data = await $fetch("/api/codebin", {
  //   method: "POST",
  //   body: snippet.value,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
};
const copySnippet = () => {
  console.log("copySnippet");
};
const downloadSnippet = () => {
  console.log("downloadSnippet");
};
const forkSnippet = () => {
  console.log("forkSnippet");
};
</script>

<style>
#language-select {
  @apply ring-0 !important;
}
</style>
