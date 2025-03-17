<template>
  <el-dialog
    v-model="visible"
    :title="computedTitle"
    :width="width"
    :close-on-click-modal="false"
    @closed="handleClosed"
  >
    <div class="jc-dialog-body">
      <slot :mode="currentMode" :formData="formData"></slot>
    </div>

    <template #footer>
      <div class="jc-dialog-footer">
        <slot
          name="footer"
          :mode="currentMode"
          :handle="{ confirm, cancel }"
        ></slot>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";

defineOptions({
  name: "JcDialog",
  inheritAttrs: false,
});

const visible = defineModel();
const currentMode = ref("");
const formData = ref(null);

const props = defineProps({
  title: String,
  width: {
    type: [String, Number],
    default: 600,
    validator: (v) =>
      typeof v === "number"
        ? v > 0
        : typeof v === "string"
        ? /^\d+(px|%)$/.test(v)
        : false,
  },
});

const emit = defineEmits(["open", "close", "confirm", "cancel"]);

// 智能标题计算
const modeTitles = {
  add: "新增",
  edit: "编辑",
  view: "查看",
};
const computedTitle = computed(() => {
  return currentMode.value
    ? `${modeTitles[currentMode.value]}${props.title}`
    : props.title;
});

// 对外开放方法
const open = (options = {}) => {
  currentMode.value = options.mode || "add";
  formData.value = options.data || null;
  visible.value = true;
};

const close = () => {
  visible.value = false;
  resetState();
};

// 状态重置
const resetState = () => {
  currentMode.value = "";
  formData.value = null;
};

// 操作处理
const confirm = () => {
  emit("confirm", { mode: currentMode.value, data: formData.value });
  close();
};

const cancel = () => {
  emit("cancel");
  close();
};

// 生命周期处理
watch(visible, (val) => {
  if (val) emit("open", { mode: currentMode.value, data: formData.value });
});

const handleClosed = () => {
  emit("close");
  resetState();
};

defineExpose({ open, close, confirm, cancel });
</script>

<style lang="less">
.jc-dialog-body {
  padding: 20px 10px;
  max-height: 70vh;
  overflow: auto;
}
.jc-dialog-footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
