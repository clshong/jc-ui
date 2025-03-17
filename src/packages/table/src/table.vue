<template>
  <div class="jc-table">
    <!-- 表格主体 -->
    <el-table
      v-loading="state.loading"
      :data="state.formData"
      border
      stripe
      v-bind="$attrs"
    >
      <template v-for="col in columns" :key="col.prop">
        <el-table-column v-bind="col">
          <template #default="{ row, $index }">
            <!-- 编辑模式 -->
            <template v-if="col.editable">
              <component
                :is="getEditorComponent(col)"
                v-model="row[col.prop]"
                v-bind="getEditorProps(col, row)"
                @update:model-value="
                  handleValueChange($index, col.prop, $event)
                "
              />
            </template>

            <!-- 自定义插槽 -->
            <template v-else-if="col.slot">
              <slot :name="col.slot" :row="row" :index="$index" />
            </template>

            <!-- 默认显示 -->
            <span v-else>{{ row[col.prop] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div style="margin: 10px 0"></div>
    <!-- 分页 -->
    <el-pagination
      v-if="showPagination"
      v-model:current-page="state.page"
      v-model:page-size="state.pageSize"
      :total="state.total"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="fetchData"
      @current-change="fetchData"
      class="jc-pagination"
    />
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";
defineOptions({
  name: "JcTable",
  inheritAttrs: false,
});

const props = defineProps({
  request: { type: Function, required: true },
  columns: { type: Array, required: true },
  initialPage: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  pageSizes: { type: Array, default: () => [10, 20, 50, 100] },
  showPagination: { type: Boolean, default: true },
  autoLoad: { type: Boolean, default: true },
});

const emit = defineEmits(["update:modelValue", "change", "page-change"]);

const state = reactive({
  loading: false,
  formData: [],
  page: props.initialPage,
  pageSize: props.pageSize,
  total: 0,
});

// 组件类型映射
const editorComponents = {
  input: "jc-input",
  select: "el-select",
  date: "el-date-picker",
  checkbox: "el-checkbox-group",
  radio: "el-radio-group",
};

// 获取编辑器组件
const getEditorComponent = (col) => {
  return editorComponents[col.editType] || "el-input";
};

// 获取编辑器属性
const getEditorProps = (col, row) => {
  if (typeof col.editProps === "function") {
    return col.editProps(row);
  }
  return col.editProps || {};
};

// 处理值变化
const handleValueChange = (rowIndex, prop, value) => {
  const row = state.formData[rowIndex];
  row[prop] = value;

  // 执行联动逻辑
  const column = props.columns.find((c) => c.prop === prop);
  if (column?.onChange) {
    column.onChange({
      row,
      value,
      rowIndex,
    });
  }

  emit("change", {
    row,
    prop,
    value,
    rowIndex,
  });
};

// 请求数据
const fetchData = async () => {
  state.loading = true;
  try {
    const params = {
      page: state.page,
      size: state.pageSize,
    };

    const res = await props.request(params);

    state.formData = res.data.records.map((item) => ({ ...item }));
    state.total = res.data.total;

    emit("page-change", {
      page: state.page,
      size: state.pageSize,
    });
  } finally {
    state.loading = false;
  }
};

// 初始化加载
watchEffect(() => {
  if (props.autoLoad) fetchData();
});

// 暴露公共方法
defineExpose({
  refresh: fetchData,
  getTableData: () => state.formData,
});
</script>

<style scoped>
.jc-table {
  background: #fff;
  padding: 16px;
  border-radius: 4px;
}
.jc-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
