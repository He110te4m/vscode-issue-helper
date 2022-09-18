<script lang="ts" setup>
const issueData = useIssueData()

window.console.log('issueData', issueData)
let list = $ref<string[]>([])
onMounted(async () => {
  list = await getRepository()
})
</script>

<template>
  <form w="full" flex flex-col>
    <div h="32px" flex items="center">
      Issue Title
    </div>
    <input
      v-model="issueData.title" border="~ color-zinc-500" b-rd="2px" p="x-4 y-2" text="14px" outline="none"
      bg="inherit"
    >

    <div h="32px" flex items="center">
      Issue Description
    </div>
    <textarea
      v-model="issueData.content" border="~ color-zinc-500" b-rd="2px" p="x-4 y-2" text="14px" rows="6"
      resize="none" outline="none" bg="inherit"
    />

    <div h="32px" flex items="center">
      Select repository
    </div>
    <select
      v-model="issueData.repo" border="~ color-zinc-500" b-rd="2px" p="x-4 y-2" text="14px" outline="none" bg="inherit"
    >
      <option v-for="item in list" :key="item" b-rd="0" p="x-2 y-1" :title="item" class="ellipsis">
        {{ item }}
      </option>
    </select>

    <div flex justify="end" items="center" text="14px" mt="2">
      <button mx="2" border="~ color-zinc-500" p="x-2 y-1" b-rd="2px">
        Cancel
      </button>
      <button border="~ color-zinc-500" p="x-2 y-1" b-rd="2px">
        Submit
      </button>
    </div>

    <hr v-show="issueData.codeSnippets.length" my="4">

    <div flex flex-col>
      <IssueCode v-for="item in issueData.codeSnippets" :key="item.id" :issue="item" />
    </div>
  </form>
</template>
