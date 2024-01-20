<template>
  <NuxtLoadingIndicator />
  <NuxtPage />
  <UNotifications />
</template>
<script setup>
useSeoMeta({
  ogTitle: 'Codeshare - Pastebin for developers',
  description: 'Codeshare allows you to share code with other developers. Create and share code snippets without signing up.',
  ogDescription: 'Codeshare allows you to share code with other developers. Create and share code snippets without signing up.',
  ogImage: 'https://codeshare.app/social-card.png',
  ogImageWidth: "1600",
  ogImageHeight: "900",
  ogUrl: 'https://codeshare.app',
  ogImageType: 'image/png',
  ogImageAlt: 'Image describing Codeshare.apps functionality, a code editor with syntax highlighting and its features.',
  twitterTitle: 'Codeshare - Pastebin for developers',
  ogType: 'website',
  ogLocale: 'en_US',
  twitterDescription: 'Codeshare allows you to share code with other developers. Create and share code snippets without signing up.',
  twitterCard: 'summary_large_image',
  themeColor: '#111827',
})
</script>
<style>
html,
body {
  @apply bg-gray-900;
}

* {
  min-width: 0;
}
</style>
