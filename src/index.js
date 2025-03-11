import JcCard from "./packages/card/index";
import JcButton from './packages/button/index'
import JcInput from './packages/input/index'
import JcDictSelect from './packages/dictSelect/index'
//组件列表
const components = [
    JcCard,
    JcButton,
    JcInput,
    JcDictSelect
]

// 定义 install 方法
const install = (Vue) => {
    // 注册组件
    components.forEach((component) => {
        Vue.component(component.name, component);
    });
};

export default install;