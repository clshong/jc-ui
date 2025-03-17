import JcLayout from "./src/layout.vue";

JcLayout.install = function (Vue) {
    Vue.component(JcLayout.name, JcLayout);
};

export default JcLayout;