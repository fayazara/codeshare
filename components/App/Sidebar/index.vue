<template>
  <aside
    class="aside sticky top-0 border-r border-white/10 w-12 flex flex-col items-center py-0.5 z-[50]"
  >
    <UTooltip
      text="New code bin"
      :shortcuts="['CTRL', 'N']"
      :popper="{ placement: 'right' }"
    >
      <UButton
        to="/"
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
    <span class="flex-1" />
    <UTooltip text="Github" :popper="{ placement: 'right' }">
      <UButton
        icon="i-lucide-github"
        square
        variant="ghost"
        color="gray"
        size="lg"
        target="_blank"
        to="https://github.com/fayazara/codeshare"
        external
        class="flex items-center justify-center"
      />
    </UTooltip>
  </aside>
</template>
<script setup></script>
<style scoped></style>
