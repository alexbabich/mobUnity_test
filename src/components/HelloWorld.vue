<template>
  <div class="rp-input-wrapper">
    <b-container fluid>
      <div class="mt-2 ml-5 rp-logo"></div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import {API} from '@/api_connection'

export default {
  name: 'HelloWorld',
  data () {
    return {
      runBranchName: '',
      runUrl: '',
      runBranchName2: '',
      runUrl2: '',
      selected: null,
      statusVariant: [
        { value: '1', text: 'success' },
        { value: '2', text: 'finished' },
        { value: '3', text: 'start' },
        { value: '4', text: 'in_progress' }
      ],
      errors: [],
      allSelected: false,
      allSelected2: false,
      fieldsTestTable: fieldsTestTable,
      fieldsRunTable: fieldsRunTable,
      rowsTestTable: '',
      rowsRunTable: '',
      modalInfoLog: { title: '', content: '' }
    }
  },
  filters: {
    isEmpty: (value) => {
      if (value === '' || value == null) return 'absent'
      else return value
    },
    formatDate: (value) => {
      if (value) return moment(value).format('DD/MM/YYYY hh:mm')
    },
    formatStatus: (value) => {
      switch (value) {
        case 'start':
          return 'start'
        case 'success':
          return 'success'
        case 'finished':
          return 'finished'
        case 'in_progress':
          return 'in progress'
        default:
          return 'absent'
      }
    },
    formatStatusClass: (value) => {
      switch (value) {
        case 'start':
          return 'text-success'
        case 'success':
          return 'text-success'
        case 'in_progress':
          return 'text-danger'
        case 'finished':
          return 'text-danger'
        default:
          return 'absent'
      }
    }
  },
  mounted: {
  },
  methods: {
    runBranch (testId) {
      let pushedData = {
        testUrl: this.runUrl,
        branch: this.runBranchName,
        test_id: testId
      }
      // axios.post(`http://34.192.233.68:8080/startTask`, JSON.stringify(pushedData), config)
      //   .then(response => {
      //     console.log(response)
      //     console.log('saved successfully')
      //   })
      //   .catch(e => {
      //     this.errors.push(e)
      //   })
      // let self = this
      // axios({
      //   method: 'post',
      //   url: 'http://34.192.233.68:8080/startTask',
      //   data: JSON.stringify({
      //     testUrl: self.runUrl,
      //     branch: self.runBranchName,
      //     test_id: testId
      //   }
      // })
      this.$http.post('http://34.192.233.68:8080/startTask', JSON.stringify(pushedData))
        .then(function (res) {
          console.log(res)
          console.log('saved successfully')
        }, function (res) {
        })
      this.$root.$emit('bv::hide::modal', 'openBranchNow')
    },
    runBranch2 (testId) {
      axios.post(`startTask`, {
        testUrl: this.runUrl2,
        branch: this.runBranchName2,
        test_id: testId
      })
        .then(response => {
        })
        .catch(e => {
          this.errors.push(e)
        })
      this.$root.$emit('bv::hide::modal', 'openBranchNow2')
    },
    resetRunBranch () {
      this.runUrl = ''
      this.runBranchName = ''
    },
    resetRunBranch2 () {
      this.runUrl2 = ''
      this.runBranchName2 = ''
    },
    openBranchNow (index, button) {
      this.$root.$emit('bv::show::modal', 'openBranchNow', button)
    },
    selectAllItems () {
      this.allSelected = !this.allSelected
      this.rowsTestTable.forEach(row => {
        if (this.allSelected) {
          row.checkbox = true
        } else {
          row.checkbox = false
        }
      })
    },
    openBranchNow2 (index, button) {
      this.$root.$emit('bv::show::modal', 'openBranchNow2', button)
    },
    selectAllItems2 () {
      this.allSelected2 = !this.allSelected2
      this.rowsRunTable.forEach(row => {
        if (this.allSelected2) {
          row.checkbox = true
        } else {
          row.checkbox = false
        }
      })
    },
    showLog (item, index, button) {
      this.modalInfoLog.title = `Row index: ${index}`
      this.modalInfoLog.content = this.getPayload(index)
      this.$root.$emit('bv::show::modal', 'modalInfoLog', button)
    },
    resetModalLog () {
      this.modalInfoLog.title = ''
      this.modalInfoLog.content = ''
    },
    getResult (idTest) {
      let ty = this.rowsRunTable.filter(res => { return res.id === idTest && res.result }).map(res => res.result.exec_time)[0]
      return ty || '0'
    },
    getPayload (idTest) {
      let itemPayload = this.rowsRunTable.filter(res => { return res.id === idTest && res.result }).map(res => res.result.payload)[0]
      let itemStatus = this.rowsRunTable.filter(res => { return res.id === idTest && res.result }).map(res => res.result.status)[0]
      return itemPayload || itemStatus || 'none'
    }
  },
  computed: {
  },
  created () {
    API.get(`test`)
      .then(response => {
        this.rowsTestTable = response.data.data.map(function (incident) {
          return incident
        })
      })
      .catch(e => {
        this.errors.push(e)
      })

    API.get(`run`)
      .then(response => {
        this.rowsRunTable = response.data.data.map(function (incident) {
          // console.log(incident)
          return incident
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style lang="scss">
  @import '../assets/css/general';

  /* begin style for select rp-status-select */
  .rp-status-select {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
    font-size: 16px !important;
    padding: 0 !important;
    cursor: pointer;
  }
  /* end style for select rp-status-select */

  .rp-category {

    span {
      position: relative;
      display: inline-block;
      margin-right: 5px;

      &::after {
        content: ',';
        position: relative;
      }

      &:last-child::after {
        display: none;
      }
    }
  }

  .modal-content {

    .modal-header {
      padding: 10px 20px 0;
    }

    .modal-body {
      padding: 0 24px 24px;
    }
  }
</style>
