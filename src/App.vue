<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <div class="over-flow-scroll">
            <div v-if="localStorage.subjects.length <= 0"class="">
              <h2>รายชื่อวิชา</h2>
              <input type="file" v-on:change="onChangeSubjects">
              <br>
              * ไฟล์ตัวอย่าง <a href="/static/subject.csv">Download</a>
            </div>
            <div v-if="localStorage.subjects.length > 0" v-for="subject in localStorage.subjects">
              <subject
                :subject="subject"
                :techers="localStorage.techers"
                :relations="localStorage.relations"
                @addRelation="addRelation"
                @removeRelation="removeRelation"></subject>
            </div>
          </div>
        </div>

        <div class="col-sm-5">
          <div class="over-flow-scroll">
            <div v-if="localStorage.techers.length <= 0" class="">
              <h2>รายชื่ออาจารย์ผู้สอน</h2>
              <input type="file" v-on:change="onChangeTeacher">
              <br>
              * ไฟล์ตัวอย่าง <a href="/static/teacher.csv">Download</a>
            </div>
            <div v-if="localStorage.techers.length > 0" v-for="techer in localStorage.techers">
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
    <div class="dropdown">
      <i class="fa fa-cogs" aria-hidden="true"></i>
      <div class="dropdown-content">
        <button @click="clearAll()" class="btn btn-danger">Clear</button>
      </div>
    </div>
  </div>
</template>

<script>
import Subject from './components/Subject'
import Techer from './components/Techer'
/* global FileReader, btoa, atob, confirm */
export default {
  name: 'app',
  data () {
    return {
      strr: '1'
    }
  },
  methods: {
    clearAll () {
      var c = confirm('ต้องการ Clear ค่าทั้งหมดจริงๆใช้ไหม')
      if (c) {
        this.localStorage.subjects = []
        this.localStorage.techers = []
        this.localStorage.relations = []
      }
    },
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
      // console.log(file)
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
    genId (index) {
      return index + '.' + Date.now() + Math.random()
    },
    convertToJsonTeacher (str) {
      var vm = this
      var teacher = []
      var items = str.split('\n')
      items = items.slice(1, items.length)
      var i = 1
      items.forEach(item => {
        var colums = item.split(',')
        if (colums[0] !== '') {
          var data = {
            id: vm.genId(i++),
            name: colums[0]
          }
          teacher.push(data)
          // console.log(data)
        }
      })
      this.localStorage.techers = teacher
    },
    onChangeSubjects (e) {
      var vm = this
      var files = e.target.files
      var file = files[0]
      var base64 = ''
      // console.log(file)
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
      var vm = this
      var subject = []
      var items = str.split('\n')
      items = items.slice(1, items.length)
      var i = 1
      items.forEach(item => {
        var colums = item.split(',')
        if (colums[0] !== '') {
          var data = {
            id: vm.genId(i++),
            code: colums[0],
            name: colums[1],
            credit: parseInt(colums[2])
          }
          subject.push(data)
          // console.log(data)
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
.over-flow-scroll {
  overflow-y: scroll;
  min-height: 100vh;
  height: 100vh;
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

.dropdown {
  position: fixed;;
  display: inline-block;
  text-align: right;
  float: right;
  width: 100px;
  top: 20px;
  right: 20px;
  font-size: 26px;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
