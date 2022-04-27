<script lang="ts">
import draggable from "vuedraggable";
import { useVModel } from "@vueuse/core";
import type { SetupContext } from "vue";

export default defineComponent({
  name: "DraggableTransitionGroup",
  components: { draggable },
  props: {
    moduleValue: {
      type: Array,
      default: () => [],
    },
    drag: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: "_vid",
    },
    group: {
      type: Object,
      default: () => ({ name: "components" }),
    },
    fallbackClass: String,
  },
  emits: ["update:moduleValue", "update:drag"],
  setup(props, { emit }: SetupContext) {
    const state = reactive({
      list: useVModel(props, "moduleValue", emit),
      isDrag: useVModel(props, "drag", emit),
    });

    const dragOptions = computed(() => ({
      animation: 200,
      disabled: false,
      scroll: true,
      ghostClass: "ghost",
    }));

    return {
      ...toRefs(state),
      dragOptions,
    };
  },
});
</script>

<template>
  <draggable
    v-model="list"
    class="dragArea list-group"
    :class="{ isDrag }"
    tag="transition-group"
    :component-data="{ tag: 'div', type: 'transition-group', name: !isDrag ? 'flip-list' : null }"
    :group="group"
    v-bind="{ ...dragOptions, ...$attrs }"
    :item-key="itemKey"
    @start="isDrag = true"
    @end="isDrag = false"
  >
    <template #item="item">
      <div :class="{ 'item-drag': item.element.draggable }" :data-el="item.element.draggable">
        <slot name="item" v-bind="item" />
      </div>
    </template>
  </draggable>
</template>

<style lang="scss" scoped>
</style>
