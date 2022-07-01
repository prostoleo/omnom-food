<template>
  <section class="py-7 md:(py-12)">
    <div
      class="flex flex-col gap-3 md:(grid grid-cols-2 gap-5 items-center justify-between)"
    >
      <h2 class="text-2xl font-bold text-dark-800 w-[fit-content]">Продукты</h2>

      <div searchbox class="max-w-[50ch] md:(ml-auto)">
        <b-autocomplete
          v-model="searchQuery"
          rounded
          :data="filteredDataArray"
          placeholder="шашлык"
          icon="magnify"
          clearable
          size="is-medium"
          @select="(option) => (selected = option)"
        >
          <!-- class="md:(text-lg)" -->
          <template #empty>Не найдено</template>
        </b-autocomplete>
      </div>

      <!-- flex-col -->
      <div
        filters
        class="flex items-center gap-3 md:(flex-row items-center gap-5)"
      >
        <div>
          <!-- label="Сортировка" -->
          <b-field>
            <b-select
              v-model="sortOption"
              placeholder="Выберите сортировку"
              rounded
              size="is-medium"
            >
              <option
                v-for="sortVal in Object.values(SORT_OPT)"
                :key="sortVal"
                :value="sortVal"
              >
                {{ sortVal }}
              </option>
            </b-select>
          </b-field>
        </div>

        <div>
          <button
            class="sort-button"
            :aria-label="
              ascending
                ? `отсортировать по убыванию`
                : `отсортировать по возрастанию`
            "
            @click="ascending = !ascending"
          >
            <b-icon v-if="ascending" icon="sort-ascending"></b-icon>
            <b-icon v-else icon="sort-descending"></b-icon>
          </button>
        </div>
      </div>
    </div>

    <ProductList :products="dataToShow" />
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
