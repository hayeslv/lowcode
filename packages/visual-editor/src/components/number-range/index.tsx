import { defineComponent } from "vue";
import { useModel } from "../visual-editor/hooks/useModel";
import "./index.scss";

export const NumberRange = defineComponent({
  props: {
    start: { type: String },
    end: { type: String },
  },
  emits: {
    "update:start": (val?: string) => true,
    "update:end": (val?: string) => true,
  },
  setup(props, { emit }) {
    const startModel = useModel(() => props.start, val => emit("update:start", val));
    const endModel = useModel(() => props.end, val => emit("update:end", val));

    return () => <div class="number-range">
      <input type="text" v-model={startModel.value} />
      <span>~</span>
      <input type="text" v-model={endModel.value} />
    </div>;
  },
});
