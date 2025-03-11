<template>
  <el-card class="jc-card">
    <!-- 头部区域 -->
    <template v-if="showHeader" #header>
      <div class="jc-card__header" :class="{ 'cursor-pointer': collapsible }" @click="handleHeaderClick">
        <div class="header-content">
          <!-- 标题插槽（优先级高于 title prop） -->
          <span v-if="title" class="title-text">{{ title }}</span>
          <slot name="title">
          </slot>
        </div>

        <!-- 折叠图标 -->
        <el-icon v-if="collapsible" class="arrow-icon" :class="{ 'is-collapsed': collapsed }">
          <arrow-up />
        </el-icon>
      </div>
    </template>

    <!-- 内容区域 -->
    <div v-show="!collapsed" class="jc-card__content">
      <slot></slot>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { ElCard, ElIcon } from 'element-plus'
import { ArrowUp } from '@element-plus/icons-vue'

defineOptions({
  name: "JcCard"
})

const props = defineProps({
  title: String,
  collapsible: {
    type: Boolean,
    default: false
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  headerClickable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:collapsed'])

// 自动判断是否显示头部
const showHeader = computed(() => {
  return props.title || props.collapsible
})

// 处理头部点击
const handleHeaderClick = () => {
  if (props.collapsible && props.headerClickable) {
    emit('update:collapsed', !props.collapsed)
  }
}
</script>

<style lang="less">
.jc-card {
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);

  .el-card__header {
    padding: 14px 20px;
    background-color: var(--el-fill-color-light);
    border-bottom: 1px solid var(--el-border-color);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--el-fill-color);
    }

    .header-content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;

      .title-text {
        font-size: 16px;
        font-weight: 600;
        color: var(--el-text-color-primary);
      }
    }

    .arrow-icon {
      color: var(--el-text-color-secondary);
      transition: transform 0.3s ease;

      &.is-collapsed {
        transform: rotate(180deg);
      }
    }
  }

  &__content {
    padding: 20px;
    transition: all 0.3s ease;

    .el-form-item {
      margin-bottom: 18px;
    }
  }

  .cursor-pointer {
    cursor: pointer;
  }
}
</style>