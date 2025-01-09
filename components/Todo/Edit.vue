<template>
  <Dialog
    v-model:visible="isOpen"
    header="Edit"
    modal
    :style="{ width: '25rem' }"
    @hide="onHide"
  >
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col gap-2">
        <div>
          <label for="title" class="block">Title</label>
          <InputText id="title" v-model="form.title" class="w-full" :invalid="!!(submit && !form.title)" />
          <Message severity="error" size="small" variant="simple" v-if="submit && form.title === ''">Title is required.</Message>
        </div>
        <div>
          <label for="description" class="block">Description</label>
          <Textarea
            id="description"
            v-model="form.description"
            class="w-full"
            :invalid="!!(submit && !form.description)"
          ></Textarea>
          <Message severity="error" size="small" variant="simple" v-if="submit && form.description === ''">Description is required.</Message>
        </div>
        <div>
          <label for="dateline" class="block">Dateline</label>
          <Calendar
            id="dateline"
            v-model="form.dateline"
            class="w-full"
            :invalid="!!(submit && !form.dateline)"
          ></Calendar>
          <Message severity="error" size="small" variant="simple" v-if="submit && !form.dateline">Dateline is required.</Message>
        </div>
        <div>
          <label for="user" class="block">Responsible</label>
          <Dropdown
            id="user"
            :options="userList"
            option-label="firstname"
            v-model="form.user"
            class="w-full"
            :invalid="!!(submit && !form.user)"
          ></Dropdown>
          <Message severity="error" size="small" variant="simple" v-if="submit && !form.user">Reponsible is required.</Message>
        </div>

        <div>
          <label for="status" class="block">Responsible</label>
          <Dropdown
            id="status"
            :options="['todo', 'doing', 'done']"
            v-model="form.status"
            class="w-full"
            :invalid="!!(submit && !form.status)"
          ></Dropdown>
          <Message severity="error" size="small" variant="simple" v-if="submit && !form.status">Status is required.</Message>
        </div>
      </div>
    </form>
    <template #footer>
      <Button
        label="Cancel"
        text
        severity="secondary"
        @click="onHide"
        autofocus
      ></Button>
      <Button
        label="Save"
        outlined
        severity="secondary"
        @click="onSubmit"
        autofocus
      ></Button>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useTodoStore } from "~/stores/todos";

const emit = defineEmits(["update:value"]);
const store = useTodoStore();
const submit = ref<boolean>(false)

const prop = defineProps({
  selected: {
    type: Number,
    default: null,
  },
  value: {
    type: Boolean,
    default: false,
  },
});

const { selectedTodo } = storeToRefs(store);

const isOpen = computed({
  get: () => {
    return prop.value;
  },
  set: (value) => {
    emit("update:value", value);
  },
});

const onHide = () => {
  isOpen.value = false;
};

const onSubmit = () => {
    submit.value = true
    if(form.value.title !== '' && form.value.description !== '') {
        console.log({id: prop.selected, ...form.value})
        store.editTodo({id: prop.selected, ...form.value, dateline: form.value.dateline.toISOString()})
        onHide()
    }
}

const form = ref({
  title: "",
  description: "",
  dateline: new Date(),
  user: {},
  status: ''
});

const userList = ref([
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Smith",
  },
  {
    id: 3,
    firstname: "Alice",
    lastname: "Johnson",
  },
]);

watch(
  () => prop.selected,
  () => {
    if (prop.selected) {
      store.onSelected(prop.selected);
      form.value = {
        title: selectedTodo.value.title!,
        description: selectedTodo.value.description!,
        dateline: new Date(selectedTodo.value?.dateline!),
        user: selectedTodo.value?.user!,
        status: selectedTodo.value.status!
      };
    }
  }
);
</script>

<style></style>
