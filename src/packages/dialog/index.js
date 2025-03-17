import JcDialog from "./src/dialog";

JcDialog.install = function (Vue) {
    Vue.component(JcDialog.name, JcDialog);
};

export default JcDialog;