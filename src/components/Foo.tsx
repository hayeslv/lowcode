import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const count = ref(0);
    const addHandler = () => {
      count.value++;
    };

    return { count, addHandler };
  },
  render() {
    return <div>
      <button onClick={this.addHandler}>
    add
      </button>

      <p>{this.count}</p>
    </div>;
  },
});
