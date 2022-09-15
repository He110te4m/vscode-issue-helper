<script lang="ts" setup>
const { issue } = defineProps<{ issue: IssueCodeData; }>();
</script>

<template>
  <div flex flex-col>
    <div :title="issue.code" class="ellipsis">
      {{ issue.path }}
    </div>
    <div opacity="50">
      {{ issue.desc }}
    </div>
  </div>
</template>

<style>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  direction: rtl;
  text-align: left;
}
</style>
