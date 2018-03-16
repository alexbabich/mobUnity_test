<template>
    <b-container fluid class="mt-3">
        <p>Please choose year</p>
        <ul class="list-unstyled list-inline mu-list">
            <li v-for="item in currentNumberOfItems" :key="item.id" class="mt-2 list-inline-item mu-list_item">
                <router-link :to="`/single/${item + 1949}`" :formTitle="item + 1949">{{item + 1949}}</router-link>
            </li>
        </ul>
    </b-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'HelloWorld',
  data () {
    return {
      startYear: 1950,
      endYear: moment(Date()).format('YYYY')
    }
  },
  filters: {
  },
  methods: {
  },
  computed: {
    currentNumberOfItems () {
      let countYear = this.endYear - this.startYear
      return countYear
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
  @import '../assets/css/general';
</style>
