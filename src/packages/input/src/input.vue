<template>
  <div class="jc-input">
    <el-input v-if="editable" ref="inputRef" v-model="inputValue" v-bind="mergedAttrs" @change="handleChange">
      <!-- 前缀内容 -->
      <template v-if="prefixContent" #prefix>
        <component :is="prefixIcon ? ElIcon : 'span'" class="c-input__prefix" @click="handlePrefixClick">
          <el-icon v-if="prefixIcon">
            <component :is="prefixIcon" />
          </el-icon>
          <span v-if="prefixText">{{ prefixText }}</span>
        </component>
      </template>

      <!-- 后缀内容 -->
      <template v-if="suffixContent" #suffix>
        <component :is="suffixIcon ? ElIcon : 'span'" class="c-input__suffix" @click="handleSuffixClick">
          <el-icon v-if="suffixIcon">
            <component :is="suffixIcon" />
          </el-icon>
          <span v-if="suffixText">{{ suffixText }}</span>
        </component>
      </template>
    </el-input>

    <!-- 只读状态 -->
    <div v-else class="c-input__readonly">
      <span class="value-text">{{ displayValue }}</span>
      <span v-if="suffixText" class="suffix-text">{{ suffixText }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue'
import { ElInput, ElIcon } from 'element-plus'

defineOptions({
  name: "JcInput"
})

const props = defineProps({
  modelValue: [String, Number],
  editable: {
    type: Boolean,
    default: true
  },
  row: Object,
  suffixIcon: String,
  suffixText: String,
  prefixIcon: String,
  prefixText: String,
  emptyText: {
    type: String,
    default: '-'
  }
})

const emit = defineEmits([
  'update:modelValue',
  'change',
  'suffix-click',
  'prefix-click'
])

const attrs = useAttrs()
const inputRef = ref(null)

// 合并属性（处理默认placeholder）
const mergedAttrs = computed(() => ({
  placeholder: '请输入内容',
  ...attrs,
  ...props.$attrs
}))

// 处理双向绑定
const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 显示值处理
const displayValue = computed(() => {
  const val = props.modelValue
  return val !== null && val !== undefined ? val : props.emptyText
})

// 判断是否需要显示前后缀
const prefixContent = computed(() => props.prefixIcon || props.prefixText)
const suffixContent = computed(() => props.suffixIcon || props.suffixText)

// 事件处理
const handleChange = (val) => {
  emit('change', val)
  if (props.row) {
    emit('row-change', props.row)
  }
}

const handleSuffixClick = (e) => {
  e.stopPropagation()
  emit('suffix-click', props.row)
}

const handlePrefixClick = (e) => {
  e.stopPropagation()
  emit('prefix-click', props.row)
}

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

<style lang="less">
.jc-input {
  .el-input {

    // 自定义图标样式
    &__prefix,
    &__suffix {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      transition: color 0.2s;

      .el-icon {
        color: var(--el-color-primary);
      }

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  &__readonly {
    display: flex;
    align-items: center;
    min-height: var(--el-component-size);
    padding: 0 12px;

    .value-text {
      color: var(--el-text-color-regular);
    }

    .suffix-text {
      margin-left: 8px;
      color: var(--el-text-color-secondary);
    }
  }
}
</style>