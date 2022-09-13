<script lang="ts" setup>
import IssueManager from './views/IssueManager.vue';

isDark.value = Array.from(document.body.classList).includes('vscode-dark');
</script>

<template>
  <main font-sans p="x-4 y-10" text="cente" w="full" h="full">
    <IssueManager />
  </main>
</template>
