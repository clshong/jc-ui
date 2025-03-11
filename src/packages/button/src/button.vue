<template>
  <el-button
    :type="type"
    v-bind="$attrs"
    v-on="$attrs"
    :disabled="disabled"
    @click="handleClick"
  >
    <el-icon v-if="icon">
      <component :is="icon" />
    </el-icon>
    <slot>
      {{ text }}
    </slot>
  </el-button>
</template>

<script setup>
defineOptions({
  name: "JcButton",
  inheritAttrs: false, // 避免属性继承到根元素
});
const props = defineProps({
  // 按钮类型
  type: {
    type: String,
    default: "primary",
  },
  // 按钮文字
  text: String,
  // 图标
  icon: {
    type: [String, Object],
    default: null,
  },
  // 禁用状态
  disabled: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
});

const emit = defineEmits(["click"]);

const handleClick = (evt) => {
  if (!props.disabled) {
    emit("click", evt);
  }
};
</script>

<style>
.el-button {
  /* 图标与文字间距 */
  .el-icon + span {
    margin-left: 6px;
  }

  /* 只有图标时的处理 */
  .el-icon:not(:first-child) {
    margin-left: 0;
  }
}
</style>
