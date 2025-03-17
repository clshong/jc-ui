<template>
  <JcDialog
    ref="dialogRef"
    v-bind="$attrs"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <!-- 表单内容区域 -->
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      :disabled="isViewMode"
      label-width="120px"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formModel.name" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formModel.email" />
      </el-form-item>
    </el-form>

    <!-- 底部操作 -->
    <template #footer="{ mode, handle }">
      <el-button @click="handle.cancel">{{ cancelText }}</el-button>
      <el-button
        v-if="mode !== 'view'"
        type="primary"
        @click="handleConfirm(handle.confirm)"
      >
        {{ confirmText }}
      </el-button>
    </template>
  </JcDialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";

const props = defineProps({
  // 表单验证规则
  formRules: {
    type: Object,
    default: () => ({
      name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { type: "email", message: "邮箱格式不正确", trigger: "blur" },
      ],
    }),
  },
});

const emit = defineEmits(["submit"]);

const dialogRef = ref(null);
const formRef = ref(null);
const formModel = ref(initFormData());

// 模式相关计算属性
const isViewMode = computed(() => dialogRef.value?.currentMode === "view");
const cancelText = computed(() => (isViewMode.value ? "关闭" : "取消"));
const confirmText = computed(() => (isViewMode.value ? "确定" : "提交"));

// 初始化空表单
function initFormData() {
  return { name: "", email: "" };
}

// 处理表单提交
const handleConfirm = async (dialogConfirm) => {
  try {
    // 执行表单验证
    const valid = await formRef.value.validate().catch(() => false); // 处理异常
    if (!valid) {
      ElMessage.error("表单验证失败");
      return;
    }

    // 触发外部提交
    emit("submit", {
      mode: dialogRef.value.currentMode,
      data: formModel.value,
    });

    // 关闭弹窗
    dialogConfirm();
  } catch (error) {
    console.error("handleConfirm 出错:", error);
    ElMessage.error("发生未知错误");
  }
};

// 打开弹窗方法
const open = (payload = {}) => {
  // 重置表单数据
  formModel.value = payload.data ? { ...payload.data } : initFormData();
  dialogRef.value.open(payload);
};

// 暴露方法给父组件
defineExpose({ open });
</script>
