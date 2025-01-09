<template>
    <div>
      <div v-if="loading">Loading...</div>
      <Button label="Add" icon="pi pi-plus" severity="success" @click="handleAdd" class="mb-4"></Button>    
      <div v-if="!loading" class="w-full flex justify-between gap-4">
  
        <Card class="w-full flex-1">
          <template #title>Todos</template>
          <template #content>
            <ul>
              <li v-for="(item, index) in todoStatus" class="">
                <TodoCard :item="item" @edit="handleEdit(item.id!)" @delete="handleDelete(item.id!)" />
                <Divider />
              </li>
            </ul>
          </template>
        </Card>
  
        <Card class="w-full flex-1">
          <template #title>Doing</template>
          <template #content>
            <ul>
              <li v-for="(item, index) in doingStatus" class="">
                <TodoCard :item="item" @edit="handleEdit(item.id!)" @delete="handleDelete(item.id!)" />
                <Divider />
              </li>
            </ul>
          </template>
        </Card>
  
        <Card class="w-full flex-1">
          <template #title>Done</template>
          <template #content>
            <ul>
              <li v-for="(item, index) in completeds" class="">
                <TodoCard :item="item" @edit="handleEdit(item.id!)" @delete="handleDelete(item.id!)" />
                <Divider />
              </li>
            </ul>
          </template>
        </Card>
      </div>
      <TodoAdd v-model:value="isOpenAdd" />
      <TodoEdit v-model:value="isOpenEdit" :selected="selectedId!" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import { useTodoStore } from "~/stores/todos";
  const store = useTodoStore();
  const isOpenAdd = ref<boolean>(false)
    const isOpenEdit = ref<boolean>(false)
  const selectedId = ref<number | null>(null)
  
  const { completeds, todoStatus, doingStatus, loading } = storeToRefs(store);
  
  const fetchItems = async () => {
    await store.fetchTodos();
  };
  onMounted(async () => {
    await fetchItems();
  });

  const handleEdit = (id: number) => {
    isOpenEdit.value = true
    selectedId.value = id
  }

  const handleDelete = (id: number) => {
    store.deleteTodo(id)
  }
  const handleAdd = () => {
    isOpenAdd.value = true
  }
  </script>
  
  <style></style>
  