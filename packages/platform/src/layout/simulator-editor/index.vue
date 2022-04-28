<script lang="ts">
import { defineComponent } from "vue";
import DraggableTransitionGroup from "./draggable-transition-group.vue";
export default defineComponent({
  components: { DraggableTransitionGroup },
  setup() {
    const state = reactive({
      drag: false,
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<template>
  <div class="simulator-container">
    <div class="simulator-editor">
      <div class="simulator-editor-content">
        <DraggableTransitionGroup
          v-model:drag="drag"
          class="!min-h-680px"
          draggable=".item-drag"
        >
          <template #item="{ element: outElement }">
            <div
              class="list-group-item"
              :data-label="outElement.label"
              :class="{
                focus: outElement.focus,
                focusWithChild: outElement.focusWithChild,
                drag,
                ['has-slot']: !!Object.keys(outElement.props.slots || {}).length
              }"
            >
              222
            </div>
          </template>
        </DraggableTransitionGroup>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
