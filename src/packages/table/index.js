import JcTable from './src/table.vue'

JcTable.install = function (Vue) {
    Vue.component(JcTable.name, JcTable);
};

export default JcTable;