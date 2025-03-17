<template>
  <jc-table
    :request="fetchTableData"
    :columns="columns"
    :page-size="10"
    @change="handleValueChange"
  >
    <!-- 自定义状态列 -->
    <template #status="{ row }">
      <el-tag :type="row.status ? 'success' : 'danger'">
        {{ row.status ? "启用" : "禁用" }}
      </el-tag>
    </template>

    <!-- 自定义操作列 -->
    <template #action="{ row, index }">
      <el-button @click="handleEdit(row)">编辑</el-button>
      <el-button type="danger" @click="handleDelete(index)">删除</el-button>
    </template>
  </jc-table>
</template>

<script setup>
import { ref } from "vue";

// 表格列配置
const columns = ref([
  {
    prop: "name",
    label: "姓名",
    editable: true,
    editType: "input",
    editProps: {
      placeholder: "请输入姓名",
      clearable: true,
    },
  },
  {
    prop: "gender",
    label: "性别",
    editable: true,
    editType: "select",
    editProps: {
      options: [
        { label: "男", value: 1 },
        { label: "女", value: 0 },
      ],
    },
    onChange: ({ row }) => {
      // 性别改变时清空职称
      row.title = "";
    },
  },
  {
    prop: "title",
    label: "职称",
    editable: true,
    editType: "select",
    editProps: ({ row }) => ({
      options: getTitlesByGender(row.gender),
    }),
  },
  {
    prop: "status",
    label: "状态",
    slot: "status",
  },
  {
    prop: "action",
    label: "操作",
    slot: "action",
  },
]);

// 模拟职称数据
const getTitlesByGender = (gender) => {
  return gender === 1
    ? [
        { label: "工程师", value: 1 },
        { label: "技术总监", value: 2 },
      ]
    : [
        { label: "设计师", value: 3 },
        { label: "创意总监", value: 4 },
      ];
};

// 模拟API请求
const fetchTableData = async (params) => {
  // 实际对接后端接口
  return {
    data: {
      records: [
        { id: 1, name: "张三", gender: 1, title: 1, status: true },
        { id: 2, name: "李四", gender: 0, title: 3, status: false },
      ],
      total: 2,
    },
  };
};

// 处理数据变化
const handleValueChange = ({ row, prop, value }) => {
  console.log("数据变更:", prop, value, row);
};

// 其他操作
const handleEdit = (row) => {
  /* 编辑逻辑 */
};
const handleDelete = (index) => {
  /* 删除逻辑 */
};
</script>
