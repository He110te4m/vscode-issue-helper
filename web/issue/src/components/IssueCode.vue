<script lang="ts" setup>
const { issue } = defineProps<{ issue: IssueCodeData }>()
</script>

<template>
  <div flex flex-col>
    <div :title="issue.code">
      <div class="ellipsis">
        {{ issue.path }}
      </div>
    </div>
    <div opacity="50">
      {{ issue.desc }}
    </div>
  </div>
</template>
