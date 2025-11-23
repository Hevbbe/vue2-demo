<template>
  <el-select v-model="localValue" v-bind="$attrs">
    <el-option
      v-for="item in list"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
import { carousel } from "./index";
export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  watch: {
    value(n) {
      this.localValue = n;
    },
    localValue(n) {
      this.$emit("input", n);
    },
  },
  computed: {
    list() {
      return carousel;
    },
  },
};
</script>
