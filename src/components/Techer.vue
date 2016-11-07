<template lang="html">
  <div class="techer box">
    <h1>{{ techer.name }} ({{ sumCredit }})</h1>

    <ul>
      <li v-for="subject in teching">
        <h3>{{ subject.code }} {{ subject.name }} ({{ subject.credit }})
          <a @click="removeRelation(techer.id, subject.id)">x</a>
        </h3>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Techer',
  props: ['techer', 'subjects', 'relations'],
  methods: {
    removeRelation (techer, subject) {
      this.$emit('removeRelation', techer, subject)
    }
  },
  computed: {
    sumCredit () {
      let vm = this
      return vm.teching.reduce((sum, t) => sum + t.credit, 0)
    },
    teching () {
      let vm = this
      let tech = vm.relations.filter(t => t.techer === vm.techer.id)
      return tech
      .map(t => {
        return vm.subjects.find(s => s.id === t.subject)
      })
    }
  }
}
</script>

<style lang="css">
</style>
