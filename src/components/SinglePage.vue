<template>
    <b-container fluid class="mt-3">
        <a href="javascript:history.go(-1)">~go back</a>
        <b-row>
            <h3 class="col-12">{{mess}} year</h3>
        </b-row>
        <b-row>
            <ul class="list-unstyled list-inline col-12">
                <li class="mt-2 list-inline-item" v-for="item in listItem">
                    <b-card :title="item.RaceName"
                            class="mb-2">
                        <p>Race name - {{item.RaceName}}</p>
                        <p>Date - {{item.Date}}</p>
                        <p>Round - {{item.Round}}</p>
                        <p>Circuit name - {{item.Circuit.CircuitName}}</p>
                        <p>Link - <b-link :href="item.Circuit.URL">{{item.Circuit.CircuitName}}</b-link></p>
                        <p>Location - {{item.Circuit.Location.Locality}}, {{item.Circuit.Location.Country}}</p>
                    </b-card>
                </li>
            </ul>
        </b-row>
        <b-table striped hover :items="raceItem" :fields="fields">
            <template slot="name" slot-scope="data">
                {{data.item.Driver.GivenName}} {{data.item.Driver.FamilyName}}
            </template>
            <template slot="nationality" slot-scope="data">
                {{data.item.Driver.Nationality}}
            </template>
        </b-table>
    </b-container>
</template>

<script>
import {API} from '@/api_connection'

export default {
  props: ['formTitle'],
  name: 'single-page',
  data () {
    return {
      errors: [],
      listItem: '',
      raceItem: [],
      mess: this.$route.params.id,
      fields: [ 'Position', {key: 'name', label: 'Driver'}, {key: 'nationality', label: 'Nationality'} ]
    }
  },
  created () {
    API.get('getraces/' + this.$route.params.id)
      .then(response => {
        this.listItem = response.data.map(function (incident) {
          return incident
        })
      })
      .catch(e => {
        this.errors.push(e)
      })

    API.get('getdriverstandings/' + this.$route.params.id)
      .then(response => {
        this.raceItem = response.data.map(function (incident) {
          return incident
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style scoped>

</style>