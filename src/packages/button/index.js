import JcButton from "./src/button.vue";

JcButton.install = function (Vue) {
    Vue.component(JcButton.name, JcButton);
};

export default JcButton;