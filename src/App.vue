<template>
  <!-- 基础用法 -->
  <!-- <jc-button icon="Plus" type="text" plain @click="handle">新增</jc-button>

  <jc-card title="基本信息">
    <el-form>...</el-form>
  </jc-card>

  <A />
  <hr /> -->
  <!-- 自定义标题 -->
  <!-- <jc-card title="hah" collapsible v-model:collapsed="isCollapsed">
    <template #title>
      <el-tag type="warning">注意事项</el-tag>
      <span style="font-size: 12px; color: #fcc548"> 请仔细核对以下信息 </span>
    </template>
    <div>...</div>
  </jc-card>
  <hr />
  <B ref="childDialog" @submit="handleSubmit" />
  <el-button @click="openDialog('add')">新增用户</el-button>
  <el-button @click="openDialog('edit', rowData)">编辑</el-button>
  <el-button @click="openDialog('view', rowData)">查看</el-button>
  <hr />
  <jc-dict-code dictCode="00"></jc-dict-code> -->
  <el-config-provider :locale="zhCn">
    <C />
  </el-config-provider>
</template>

<script setup>
import { ref } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import A from "./pages/A.vue";
import B from "./pages/B.vue";
import C from "./pages/c.vue";

const isCollapsed = ref(false);

const childDialog = ref(null);
const rowData = ref({ name: "示例用户", email: "user@example.com" }); // 模拟行数据

// 打开弹窗
const openDialog = (mode, data) => {
  childDialog.value.open({ mode, data });
};

// 处理提交
const handleSubmit = async ({ mode, data }) => {
  try {
    // 根据模式调用不同API
    const api = mode === "add" ? createUserApi : updateUserApi;
    await api(data);
    ElMessage.success(`${mode === "add" ? "新增" : "更新"}成功`);
    // 刷新数据...
  } catch (error) {
    ElMessage.error(error.message);
  }
};

// 模拟API
const createUserApi = (data) =>
  new Promise((resolve) => {
    console.log("创建用户:", data);
    setTimeout(resolve, 1000);
  });

const updateUserApi = (data) =>
  new Promise((resolve) => {
    console.log("更新用户:", data);
    setTimeout(resolve, 1000);
  });

const handle = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>
