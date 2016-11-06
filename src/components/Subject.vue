<template lang="html">
  <div class="subject box">

    <h1>{{ subject.id }} {{ subject.name }} ({{ subject.credit }})</h1>

    <ul>
      <li v-for="by in techBy">
        <h3>{{ by.name }} <a @click="removeRelation(by.id, subject.id)">x</a></h3>
      </li>
    </ul>

    <div v-if="techerOptions.length > 0" class="form-inline">
      <select v-model="selectedTecher" class="form-control">
        <option v-for="techer in techerOptions" :value="techer.id">{{ techer.name }}</option>
      </select>
      <button @click="addRelation()" class="btn btn-info"> + เพิ่มอาจารย์ผู้สอน</button>
    </div>

  </div>
</template>

<script>
/* global alert */
export default {
  name: 'Subject',
  props: ['subject', 'techers', 'relations'],
  data () {
    return {
      selectedTecher: null
    }
  },
  computed: {
    techerOptions () {
      let vm = this
      return vm.techers.filter(techer => !vm.techBy.find(tb => tb.id === techer.id))
    },
    techBy () {
      let vm = this
      let by = vm.relations.filter(r => r.subject === vm.subject.id)
      return by.map(b => {
        return vm.techers.find(t => t.id === b.techer)
      })
    }
  },
  methods: {
    addRelation () {
      if (this.selectedTecher) {
        this.$emit('addRelation', this.selectedTecher, this.subject.id)
      } else {
        alert('โปรดเลือกอาจารย์ผู้สอน')
      }
    },
    removeRelation (techer, subject) {
      this.$emit('removeRelation', techer, subject)
    }
  }
}
</script>

<style lang="css">
</style>
