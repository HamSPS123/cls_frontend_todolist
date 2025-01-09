import { defineStore } from "pinia";
import type { Todo } from "~/utils/interfaces/todos.interface";

export const useTodoStore = defineStore("todos", () => {
  const todos = ref<Todo[]>([]);
  const loading = ref<boolean>(false);
  const selectedTodo = ref<Todo>({});

  const todoStatus = computed(() =>
    todos.value.filter((item) => item.status === "todo")
  );

  const doingStatus = computed(() =>
    todos.value.filter((item) => item.status === "doing")
  );

  const completeds = computed(() =>
    todos.value.filter((item) => item.status === "done")
  );

  const fetchTodos = async () => {
    try {
      loading.value = true;
      const response: any = await $fetch("/todos.json");
      todos.value = response;

      //   if (data.todos) {
      //     this.todos = data.todos;
      //   }
    } catch (error) {
      console.log("error", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const onSelected = (id: number) => {
    selectedTodo.value = todos.value.find((item) => item?.id === id)!;
  };

  const editTodo = (todo: Todo) => {
    console.log(todo)
    todos.value = todos.value.map((item) => item.id === todo.id ? todo : item)
  }

  const deleteTodo= (id: number) => {
    todos.value = todos.value.filter((item) => item.id !== id)
  }

  return {
    todos,
    loading,
    fetchTodos,
    onSelected,
    completeds,
    todoStatus,
    doingStatus,
    selectedTodo,
    editTodo,
    deleteTodo
  };
});
