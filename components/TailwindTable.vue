<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-green-600 border-b border-green-900">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-medium text-green-900 px-6 py-4 text-left"
                >
                  #
                </th>
                <th
                  v-for="column in props.head"
                  scope="col"
                  class="text-sm font-medium text-green-900 px-6 py-4 text-left"
                >
                  {{ column }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in props.data"
                class="bg-green-600 transition duration-300 ease-in-out hover:bg-green-500"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-800"
                >
                  {{ index + 1 }}
                </td>
                <td
                  v-for="cell in row"
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-900"
                >
                  {{ cell }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TableProps {
  head: string[]
  data: string[][]
}
const props = defineProps<TableProps>()
if (
  props.data &&
  props.data.length &&
  props.head.length !== props.data[0].length
) {
  throw Error(
    "[TailwindTable] number columns of table head do not match the number of columns in data"
  )
}
</script>
