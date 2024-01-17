import githubTheme from "@/assets/github-dark.json";
import languages from "@/assets/languages";

export const useEditor = () => {
  const { copy } = useClipboard();
  const MONACO_EDITOR_OPTIONS = ref({
    automaticLayout: true,
    formatOnPaste: true,
    foldingHighlight: true,
    autoClosingQuotes: "always",
    autoClosingBrackets: "always",
    autoIndent: true,
    autoSurround: "languageDefined",
    scrollBeyondLastLine: false,
    fontLigatures: true,
    fontFamily: "Cascadia Code",
    minimap: {
      enabled: false,
    },
    stickyScroll: {
      enabled: true,
    },
    inlineSuggest: {
      enabled: true,
      showToolbar: 'always'
    },
  });
  const snippet = useState("snippet", () => {
    return {
      title: "untitled.txt",
      body: "",
      language: "plaintext",
    };
  });
  const confirmationModal = ref(false);
  const loading = ref(false);
  const toast = useToast();
  const selectedLanguage = ref("plaintext");
  const lineCount = ref(0);
  const editorRef = shallowRef();

  const handleMount = (editor, monaco) => {
    editorRef.value = editor;
    monaco.editor.defineTheme("github-dark", githubTheme);
    monaco.editor.setTheme("github-dark");
    lineCount.value = editorRef.value?.getModel()?.getLineCount() || 0;
  };

  const wordCount = computed(() => {
    const text = snippet.value.body;
    const words = text.match(/\w+/g);
    return words ? words.length : 0;
  });

  const letterCount = computed(() => {
    const text = snippet.value.body;
    return text.length;
  });

  const onChange = () => {
    if (!editorRef.value) return;
    lineCount.value = editorRef.value?.getModel()?.getLineCount() || 0;
  };

  function formatCode() {
    editorRef.value?.getAction("editor.action.formatDocument").run();
  }

  function toggleMinimap() {
    MONACO_EDITOR_OPTIONS.value.minimap.enabled =
      !MONACO_EDITOR_OPTIONS.value.minimap.enabled;
  }

  const publishSnippet = async () => {
    if (!snippet.value.body) return;
    confirmationModal.value = true;
  };

  const copySnippet = () => {
    copy(snippet.value.body);
    toast.add({
      title: "Success",
      description: "Snippet copied to clipboard.",
      color: "green",
      icon: "i-heroicons-check-circle",
    });
  };

  const confirmPublish = async () => {
    try {
      loading.value = true;
      confirmationModal.value = false;
      const data = await $fetch("/api/codebin", {
        method: "POST",
        body: snippet.value,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.add({
        title: "Success",
        description: "Snippet published successfully, URL copied to clipboard.",
        color: "green",
        icon: "i-heroicons-check-circle",
      });
      copy(`${window.location.origin}/${data.uid}`);
      navigateTo(`/${data.uid}`);
    } catch (error) {
      toast.add({
        title: "Error",
        description: error.message,
        color: "red",
        icon: "i-heroicons-x-circle",
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    MONACO_EDITOR_OPTIONS,
    selectedLanguage,
    languages,
    lineCount,
    wordCount,
    letterCount,
    editorRef,
    snippet,
    loading,
    confirmationModal,
    toggleMinimap,
    handleMount,
    onChange,
    formatCode,
    publishSnippet,
    confirmPublish,
    copySnippet,
  };
};
