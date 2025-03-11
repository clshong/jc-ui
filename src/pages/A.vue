<template>
  <!-- 可折叠卡片 -->
  <jc-card title="高级设置" collapsible v-model:collapsed="isCollapsed">
    <el-form>...</el-form>
  </jc-card>

  <!-- 基础用法 -->
  <jc-input v-model="value" />

  <!-- 带后缀搜索按钮 -->
  <jc-input
    v-model="searchText"
    suffix-text="搜索"
    suffix-icon="Search"
    @suffix-click="handleSearch"
  />

  <!-- 带前缀单位 -->
  <jc-input v-model="price" prefix-text="¥" prefix-icon="Money" />

  <!-- 表格行内编辑 -->
  <jc-input v-model="row.name" :row="row" @row-change="handleRowChange" />

  <!-- 只读状态 -->
  <jc-input v-model="readonlyValue" :editable="false" suffix-text="元" />

  <jc-dict-select v-model="value" dict-code="GENDER" :multiple="true" />
</template>

<script setup>
import { ref } from "vue";
const isCollapsed = ref(true);

const value = ref("");
const searchText = ref("");
const price = ref(0);
const readonlyValue = ref(100);
const row = ref({ id: 1, name: "初始值" });

const handleSearch = (row) => {
  console.log("触发搜索", row);
};

const handleRowChange = (row) => {
  console.log("行数据变更", row);
};
</script>

<style lang="less" scoped></style>
