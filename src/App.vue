<template>
  <!-- 基础用法 -->
  <jc-button icon="Plus" type="text" plain @click="handle">新增</jc-button>

  <jc-card title="基本信息">
    <el-form>...</el-form>
  </jc-card>

  <A />
  <hr>
  <!-- 自定义标题 -->
  <jc-card title="hah" collapsible v-model:collapsed="isCollapsed">
    <template #title>
      <el-tag type="warning">注意事项</el-tag>
      <span style="font-size: 12px; color: #fcc548">
        请仔细核对以下信息
      </span>
    </template>
    <div>...</div>
  </jc-card>
</template>

<script setup>
import { ref } from 'vue'
import A from './pages/A.vue'

const isCollapsed = ref(false)

const handle = () => {
  isCollapsed.value = !isCollapsed.value
}

</script>