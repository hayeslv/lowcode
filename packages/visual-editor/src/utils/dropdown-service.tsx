import type { PropType } from "vue";
import { inject, provide, onBeforeUnmount, onMounted, ref, createApp, getCurrentInstance, computed, reactive, defineComponent } from "vue";
import { defer } from "./defer";
import "./dropdown-service.scss";

interface DropdownServiceOption {
  reference: MouseEvent | HTMLElement;
  content: () => JSX.Element;
}

const DropdownServiceProvider = (() => {
  const DROPDOWN_SERVICE_PROVIDER = "@@DROPDOWN_SERVICE_PROVIDER"; // 也可以用 Symbol
  return {
    provide: (handler: { onClick: () => void }) => provide(DROPDOWN_SERVICE_PROVIDER, handler),
    inject: () => inject(DROPDOWN_SERVICE_PROVIDER) as { onClick: () => void },
  };
})();

const ServiceComponent = defineComponent({
  props: {
    option: { type: Object as PropType<DropdownServiceOption>, required: true },
  },
  setup(props) {
    const ctx = getCurrentInstance()!;
    const el = ref({} as HTMLDivElement);

    const state = reactive({
      option: props.option,
      showFlag: false,
      top: 0,
      left: 0,
      mouted: (() => {
        const dfd = defer();
        onMounted(() => {
          setTimeout(() => {
            dfd.resolve();
          }, 0);
        });
        return dfd.promise;
      })(),
    });

    const service = (option: DropdownServiceOption) => {
      state.option = option;

      if ("addEventListener" in option.reference) {
        const { top, left, height } = option.reference.getBoundingClientRect()!;
        state.top = top + height;
        state.left = left;
      } else {
        const { clientX, clientY } = option.reference;
        state.left = clientX;
        state.top = clientY;
      }

      methods.show();
    };

    const methods = {
      show: async() => {
        await state.mouted;
        state.showFlag = true;
      },
      hide: () => {
        state.showFlag = false;
      },
    };

    const classes = computed(() => [
      "dropdown-service",
      {
        "dropdown-service-show": state.showFlag,
      },
    ]);

    const style = computed(() => ({
      top: `${state.top}px`,
      left: `${state.left}px`,
    }));

    Object.assign(ctx.proxy, { service });

    const onMousedownDocument = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).contains(el.value)) {
        methods.hide();
      }
    };

    onMounted(() => document.body.addEventListener("mousedown", onMousedownDocument, true));
    onBeforeUnmount(() => document.body.removeEventListener("mousedown", onMousedownDocument, true));

    DropdownServiceProvider.provide({ onClick: methods.hide });

    return () => <div class={classes.value} style={style.value} ref={el}>
      {state.option.content()}
    </div>;
  },
});

export const DropdownOption = defineComponent({
  props: {
    label: { type: String },
    icon: { type: String },
  },
  emits: {
    click: (e: MouseEvent) => true,
  },
  setup(props, { emit }) {
    const { onClick: dropdownClickHandler } = DropdownServiceProvider.inject();
    const handler = {
      onClick: (e: MouseEvent) => {
        // 派发事件
        emit("click", e);
        dropdownClickHandler();
      },
    };

    return () => (
      <div class="dropdown-option" onClick={handler.onClick}>
        <i class={`iconfont ${props.icon}`}></i>
        <span>{props.label}</span>
      </div>
    );
  },
});

export const $$dropdown = (() => {
  let ins: any;
  return (option: DropdownServiceOption) => {
    if (!ins) {
      const el = document.createElement("div");
      document.body.appendChild(el);
      const app = createApp(ServiceComponent, { option });
      ins = app.mount(el);
    }
    ins.service(option);
  };
})();
