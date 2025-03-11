import JcCard from "./src/card.vue";

JcCard.install = function (Vue) {
  Vue.component(JcCard.name, JcCard);
};

export default JcCard;
