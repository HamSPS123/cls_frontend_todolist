<template>
  <div class="flex hover:bg-slate-100 p-4 rounded cursor-pointer relative">
    <div class="flex flex-col gap-2">
      <div class="text-xl">{{ item?.title }}</div>
      <div class="flex justify-between items-center mt-2">
        <div class="text-sm">
          Response:
          <span class="font-semibold"
            >{{ item?.user?.firstname }} {{ item?.user?.lastname }}</span
          >
        </div>
        <div>
          End Date: <Tag :value="item?.dateline" severity="danger"></Tag>
        </div>
      </div>
      <div>
        <div class="text-sm">Description</div>
        {{ item?.description }}
      </div>
    </div>

    <div class="absolute top-4 right-4">
      <Button
        icon="pi pi-trash"
        severity="danger"
        variant="text"
        rounded
        aria-label="Delete"
        @click="handleDelete"
      ></Button>
      <Button
        icon="pi pi-pencil"
        severity="warning"
        variant="text"
        rounded
        aria-label="Edit"
        @click="handleEdit"
      ></Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['edit', 'delete'])
    const { item } = defineProps({
        item: {
            type: Object,
            default: null
        }
    })

    const handleEdit = () => {
       emit('edit')
    }

    const handleDelete = () => {
        emit('delete')
    }
</script>

<style></style>
