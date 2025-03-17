<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    :label-width="labelWidth"
  >
    <template v-for="(row, rowIndex) in formConfig" :key="rowIndex">
      <el-row :gutter="gutter">
        <template v-for="(col, colIndex) in row.cols" :key="col.prop">
          <el-col :span="col.span || 24">
            <el-form-item
              :label="col.label"
              :prop="col.prop"
              :rules="col.rules"
            >
              <!-- 动态组件渲染 -->
              <component
                :is="getFormComponent(col)"
                v-bind="getComponentProps(col)"
                v-on="getComponentEvents(col)"
              />

              <!-- 自定义插槽 -->
              <template v-if="col.slot">
                <slot :name="col.slot" :form="formData" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </template>

    <!-- 操作按钮 -->
    <el-row v-if="showActions">
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">
            {{ submitText }}
          </el-button>
          <el-button @click="handleReset">
            {{ resetText }}
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { ref } from "vue";
defineOptions({
  name: "JcForm",
  inheritAttrs: false,
});

const props = defineProps({
  formData: { type: Object, required: true },
  formConfig: { type: Array, required: true },
  rules: { type: Object, default: () => ({}) },
  labelWidth: { type: String, default: "100px" },
  gutter: { type: Number, default: 20 },
  submitText: { type: String, default: "提交" },
  resetText: { type: String, default: "重置" },
  showActions: { type: Boolean, default: true },
});

const emit = defineEmits(["submit", "reset"]);

const formRef = ref(null);

// 获取组件类型映射
const componentMap = {
  input: "el-input",
  select: "el-select",
  radio: "el-radio-group",
  checkbox: "el-checkbox-group",
  date: "el-date-picker",
};

// 获取组件属性
const getComponentProps = (col) => ({
  modelValue: props.formData[col.prop],
  ...col.attrs,
  options: col.options,
  disabled: col.disabled,
});

// 获取组件事件
const getComponentEvents = (col) => ({
  "update:modelValue": (val) => {
    props.formData[col.prop] = val;
    if (col.onChange) col.onChange(val, props.formData);
  },
});

// 获取对应组件
const getFormComponent = (col) => {
  if (col.component) return col.component;
  return componentMap[col.type] || "el-input";
};

// 表单提交
const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    emit("submit", props.formData);
  } catch (e) {
    console.error("表单验证失败", e);
  }
};

// 表单重置
const handleReset = () => {
  formRef.value.resetFields();
  emit("reset");
};
</script>
