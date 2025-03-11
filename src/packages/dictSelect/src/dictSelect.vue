<template>
  <div class="jc-dict-select">
    <!-- 可编辑状态 -->
    <el-select
      v-if="editable"
      v-model="modelValue"
      :multiple="multiple"
      placeholder="请选择"
      v-bind="$attrs"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      />
    </el-select>

    <!-- 只读状态 -->
    <div v-else class="readonly-content">
      <span>{{ displayText }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref, onMounted } from "vue";

// 组件配置
defineOptions({
  name: "JcDictSelect",
  inheritAttrs: false, // 避免属性继承到根元素
});

// Props声明
const props = defineProps({
  dictCode: String,
  editable: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

// 双向绑定
const modelValue = defineModel();

// 数据相关
const options = ref([]);
const loading = ref(false);

// 显示文本计算
const displayText = computed(() => {
  if (!modelValue.value) return "-";

  // 处理多选情况
  if (props.multiple) {
    const values = Array.isArray(modelValue.value)
      ? modelValue.value
      : [modelValue.value];
    return values
      .map((v) => options.value.find((item) => item.value === v)?.label)
      .filter(Boolean)
      .join(", ");
  }

  // 处理单选情况
  return (
    options.value.find((item) => item.value === modelValue.value)?.label || ""
  );
});

// 获取字典数据
const fetchOptions = async () => {
  if (!props.dictCode) return;

  try {
    loading.value = true;
    // const res = await dictList({ dictCode: props.dictCode });

    if (res.code === 0) {
      options.value = res.data.map((item) => ({
        label: item.dataKey,
        value: item.dataValue,
      }));
    }
  } catch (e) {
    console.error("字典数据获取失败:", e);
  } finally {
    loading.value = false;
  }
};

// 监听字典编码变化
watch(() => props.dictCode, fetchOptions);

// 初始化时获取数据
onMounted(() => {
  if (props.editable) {
    fetchOptions();
  }
});

// 暴露方法供外部调用刷新
defineExpose({ refresh: fetchOptions });
</script>

<style scoped>
.jc-dict-select {
  width: 100%;
}

.readonly-content {
  padding: 8px 0;
  min-height: 40px; /* 保持与输入框同高 */
}
</style>
