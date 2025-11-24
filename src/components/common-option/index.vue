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
export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
    list: {
      type: Array,
      default: () => [
        {
          value: 1,
          label: "生成1个",
        },
        {
          value: 2,
          label: "生成2个",
        },
        {
          value: 3,
          label: "生成3个",
        },
        {
          value: 4,
          label: "生成4个",
        },
        {
          value: 5,
          label: "生成5个",
        },
      ],
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
};
</script>
