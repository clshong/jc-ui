<template>
  <el-row :gutter="gutter" class="jc-layout">
    <el-col v-for="(col, index) in cols" :key="index" :span="col.col">
      <!-- 将当前列数据和索引传递给插槽，方便外部自定义渲染 -->
      <slot :col="col" :index="index"></slot>
    </el-col>
  </el-row>
</template>

<script setup>
defineOptions({
  name: "JcLayout",
  inheritAttrs: false,
});

const props = defineProps({
  gutter: {
    type: Number,
    default: 20,
  },
  // 使用函数返回默认值，避免多个组件实例共享同一个数组引用
  cols: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="less">
/* 这里可根据需要添加样式 */
</style>
