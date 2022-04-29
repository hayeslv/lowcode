const editor = ref<Element | null>(null);

export const getEditor = () => editor;

export const initEditor = (el: string) => {
  editor.value = document.querySelector(el);
};
