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
        <button class="border-white/10 h-9 px-4 text-sm hover:bg-gray-950">
          Download
        </button>
        <button class="border-white/10 h-9 px-4 text-sm hover:bg-gray-950">
          Copy
        </button>
        <button class="border-white/10 h-9 px-4 text-sm hover:bg-gray-950">
          Fork
        </button>
        <button class="border-white/10 h-9 px-4 text-sm hover:bg-gray-950">
          Publish
        </button>
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
          :ui="{ ring: '!ring-0', rounded: '' }"
        />
      </div>
    </footer>
  </main>
</template>

<script setup>
import githubTheme from "@/assets/github-dark.json";
import languages from "@/assets/languages";
const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnPaste: true,
  foldingHighlight: true,
  autoClosingQuotes: "always",
  autoClosingBrackets: "always",
  autoIndent: true,
  autoSurround: "languageDefined",
  scrollBeyondLastLine: false,
  fontLigatures: true,
  fontFamily: 'Cascadia Code',
  minimap: {
    enabled: false,
  },
  stickyScroll: {
    enabled: true,
  },
};

const selectedLanguage = ref("javascript");
const code = ref(`/**
  * converts an svg string to base64 png using the domUrl
  * @param {string} svgText the svgtext
  * @param {number} [margin=0] the width of the border - the image size will be height+margin by width+margin
  * @param {string} [fill] optionally backgrund canvas fill
  * @return {Promise} a promise to the bas64 png image
*/
var svgToPng = function (svgText, margin, fill) {
  // convert an svg text to png using the browser
  return new Promise(function (resolve, reject) {
    try {
      // can use the domUrl function from the browser
      var domUrl = window.URL || window.webkitURL || window;
      if (!domUrl) {
        throw new Error("(browser doesnt support this)")
      }

      // figure out the height and width from svg text
      var match = svgText.match(/height="(d+)/m);
      var height = match && match[1] ? parseInt(match[1], 10) : 200;
      var match = svgText.match(/width="(d+)/m);
      var width = match && match[1] ? parseInt(match[1], 10) : 200;
      margin = margin || 0;

      // it needs a namespace
      if (!svgText.match(/xmlns="/mi)) {
        svgText = svgText.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
      }

      // create a canvas element to pass through
      var canvas = document.createElement("canvas");
      canvas.width = height + margin * 2;
      canvas.height = width + margin * 2;
      var ctx = canvas.getContext("2d");


      // make a blob from the svg
      var svg = new Blob([svgText], {
        type: "image/svg+xml;charset=utf-8"
      });

      // create a dom object for that image
      var url = domUrl.createObjectURL(svg);

      // create a new image to hold it the converted type
      var img = new Image;

      // when the image is loaded we can get it as base64 url
      img.onload = function () {
        // draw it to the canvas
        ctx.drawImage(this, margin, margin);

        // if it needs some styling, we need a new canvas
        if (fill) {
          var styled = document.createElement("canvas");
          styled.width = canvas.width;
          styled.height = canvas.height;
          var styledCtx = styled.getContext("2d");
          styledCtx.save();
          styledCtx.fillStyle = fill;
          styledCtx.fillRect(0, 0, canvas.width, canvas.height);
          styledCtx.strokeRect(0, 0, canvas.width, canvas.height);
          styledCtx.restore();
          styledCtx.drawImage(canvas, 0, 0);
          canvas = styled;
        }
        // we don't need the original any more
        domUrl.revokeObjectURL(url);
        // now we can resolve the promise, passing the base64 url
        resolve(canvas.toDataURL());
      };

      // load the image
      img.src = url;

    } catch (err) {
      reject('failed to convert svg to png ' + err);
    }
  });
};`);
const editorRef = shallowRef();
const handleMount = (editor, monaco) => {
  editorRef.value = editor;
  monaco.editor.defineTheme("github-dark", githubTheme);
  monaco.editor.setTheme("github-dark");
};

const wordCount = computed(() => {
  const text = code.value;
  const words = text.match(/\w+/g);
  return words ? words.length : 0;
});

const letterCount = computed(() => {
  const text = code.value;
  return text.length;
});

const lineCount = computed(() => {
  return editorRef.value?.getModel()?.getLineCount() || 0;
});

function formatCode() {
  editorRef.value?.getAction("editor.action.formatDocument").run();
}
</script>

<style>
#language-select {
  @apply ring-0 !important;
}
</style>
