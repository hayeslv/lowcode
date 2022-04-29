const componentData = ref<any[]>([]);

export const getComponentData = () => componentData;

export const addComponent = (component, index?) => {
  if (index !== undefined) {
    componentData.value.splice(index, 0, component);
  } else {
    componentData.value.push(component);
  }
};
