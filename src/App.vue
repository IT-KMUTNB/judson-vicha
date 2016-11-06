<template>
  <div id="app">
    <h2>ไฟล์อาจารย์</h2>
    <input type="file" v-on:change="onChangeTeacher">
    <h2>ไฟล์วิชา</h2>
    <input type="file" v-on:change="onChangeSubjects">
    <div class="container-fluid">
      <div class="row">

        <div class="col-md-6">
          <div v-for="subject in localStorage.subjects">
            <subject
              :subject="subject"
              :techers="localStorage.techers"
              :relations="localStorage.relations"
              @addRelation="addRelation"
              @removeRelation="removeRelation"></subject>
          </div>
        </div>

        <div class="col-md-6">
          <div v-for="techer in localStorage.techers">
            <techer
              :techer="techer"
              :subjects="localStorage.subjects"
              :relations="localStorage.relations"
              @removeRelation="removeRelation"></techer>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Subject from './components/Subject'
import Techer from './components/Techer'
/* global FileReader, btoa, atob */
export default {
  name: 'app',
  data () {
    return {
      strr: '1'
    }
  },
  methods: {
    addRelation (techer, subject) {
      if (!this.localStorage.relations.find(r => r.techer === techer && r.subject === subject)) {
        this.localStorage.relations.push({
          techer,
          subject
        })
      }
    },
    removeRelation (techer, subject) {
      let index = this.localStorage.relations.findIndex(relation => relation.techer === techer && relation.subject === subject)
      this.localStorage.relations.splice(index, 1)
    },
    onChangeTeacher (e) {
      var vm = this
      var files = e.target.files
      var file = files[0]
      var base64 = ''
      console.log(file)
      if (files && file) {
        var reader = new FileReader()
      }
      reader.onload = function (readerEvt) {
        var binaryString = readerEvt.target.result
        base64 = btoa(binaryString)
        var str = decodeURIComponent(escape(atob(base64)))
        vm.convertToJsonTeacher(str)
        // console.log(str)
      }
      reader.readAsBinaryString(file)
    },
    convertToJsonTeacher (str) {
      var teacher = []
      var items = str.split('\n')
      items = items.slice(1, items.length)
      items.forEach(item => {
        var colums = item.split(',')
        if (colums[0] !== '') {
          var data = {
            id: colums[0],
            name: colums[1]
          }
          teacher.push(data)
          console.log(data)
        }
      })
      this.localStorage.techers = teacher
    },
    onChangeSubjects (e) {
      var vm = this
      var files = e.target.files
      var file = files[0]
      var base64 = ''
      console.log(file)
      if (files && file) {
        var reader = new FileReader()
      }
      reader.onload = function (readerEvt) {
        var binaryString = readerEvt.target.result
        base64 = btoa(binaryString)
        var str = decodeURIComponent(escape(atob(base64)))
        vm.convertToJsonSubjects(str)
        // console.log(str)
      }
      reader.readAsBinaryString(file)
    },
    convertToJsonSubjects (str) {
      var subject = []
      var items = str.split('\n')
      items = items.slice(1, items.length)
      items.forEach(item => {
        var colums = item.split(',')
        if (colums[0] !== '') {
          var data = {
            id: colums[0],
            name: colums[1],
            credit: parseInt(colums[2])
          }
          subject.push(data)
          console.log(data)
        }
      })
      this.localStorage.subjects = subject
    }
  },
  created () {
    if (!this.localStorage.techers) {
      this.localStorage.techers = []
    }
    // this.localStorage.techers = [
    //   {
    //     id: 1,
    //     name: 'อ.อนิราช มิ่งขวัญ'
    //   },
    //   {
    //     id: 2,
    //     name: 'อ.นิติการ นาคเจือทอง'
    //   },
    //   {
    //     id: 3,
    //     name: 'อ.นิมิต ศรีคำทา'
    //   }
    // ]
    if (!this.localStorage.subjects) {
      this.localStorage.subjects = []
    }
    // this.localStorage.subjects = [
    //
    //   {
    //     id: '662301',
    //     name: 'Data Structure',
    //     credit: 3
    //   },
    //   {
    //     id: '662302',
    //     name: 'Data Network',
    //     credit: 3
    //   },
    //   {
    //     id: '662303',
    //     name: 'Data Communication',
    //     credit: 1
    //   }
    // ]
    if (!this.localStorage.relations) {
      this.localStorage.relations = []
    }

    // this.localStorage.relations = [
    //   {
    //     techer: 1, subject: '662301'
    //   },
    //   {
    //     techer: 1, subject: '662302'
    //   },
    //   {
    //     techer: 2, subject: '662302'
    //   },
    //   {
    //     techer: 3, subject: '662303'
    //   }
    // ]
  },
  components: {
    Subject, Techer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
h3 a {
  cursor: pointer;
  color: #F00;
}
h3 a:hover {
  color: #B00;
}
.box {
  border: 1px solid #ccc;
  margin: 20px;
  padding: 20px;
}
</style>
