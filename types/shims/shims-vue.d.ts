declare module "*.vue" {
  import type { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare type Nullable<T> = T | null;

declare type CustomizedHTMLElement<T> = HTMLElement & T;

type Indexable<T> = Record<string, T>;
