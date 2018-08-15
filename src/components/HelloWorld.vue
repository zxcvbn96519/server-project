<template>
  <div class="col-12">
    <div class="rol">
      <p></p>
    </div>
    <div class="col-12">
      <input class="form-control" type="text" placeh  older="Default input" @keyup.enter="getMovie" v-model="name">
    </div>
    <div class="rol">
      <p></p>
    </div>
    <div class="accordion" id="accordione">
      <div class="card" v-for="(val, index) in datas" :key="index" v-if="val != null">
        <div class="card-header" :id="index">
          <h5 class="mb-0">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" :data-target="'#demo' + index" aria-expanded="false"
              :aria-controls="index">
              {{val.name}}
              <font-awesome-icon v-if="val.searchable == true" icon="spinner" spin/>
              <font-awesome-icon style="green" v-if="val.searchable == false" icon="check" />
            </button>
          </h5>
        </div>
        <div :id="'demo'+index" class="collapse" :aria-labelledby="index" data-parent="#accordione">
          <div class="card-body">
            <div v-if="val.searchable == false">
              <p>&lt;table&gt;
                <br />&lt;tbody&gt;
                <br />&lt;tr&gt;
                <br />&lt;td style="height: 234px; width: 270.8px;" rowspan="5"&gt;{{val.info.src}}&lt;/td&gt;
                <br />&lt;td&gt;
                <br />&lt;h4&gt;{{val.info.title}}&lt;/h4&gt;
                <br />&lt;/td&gt;
                <br />&lt;/tr&gt;
                <br />&lt;tr&gt;
                <br />&lt;td&gt;片 長： {{val.info.info_1}}&lt;/td&gt;
                <br />&lt;/tr&gt;
                <br />&lt;tr&gt;
                <br />&lt;td&gt;導 演： {{val.info.info_3}}&lt;/td&gt;
                <br />&lt;/tr&gt;
                <br />&lt;tr&gt;
                <br />&lt;td&gt;演 員： {{val.info.info_4}}&lt;/td&gt;
                <br />&lt;/tr&gt;
                <br />&lt;tr&gt;
                <br />&lt;td colspan="2"&gt;&lt;!--影片放這--&gt;這裡放影片&lt;!--到這--&gt;&lt;/td&gt;
                <br />&lt;/tr&gt;
                <br />&lt;tr&gt;
                <br />&lt;td colspan="2"&gt;
                <br />&lt;h4&gt;&nbsp;&lt;strong&gt;影片介紹&lt;/strong&gt;&lt;/h4&gt;
                <br />&lt;/td&gt;
                <br />&lt;/tr&gt;
                <br />&lt;tr&gt;
                <br />&lt;td colspan="2"&gt;&nbsp; {{val.info.content}}&lt;/td&gt;
                <br />&lt;/tr&gt;
                <br />&lt;/tbody&gt;
                <br />&lt;/table&gt;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        name: '',
        select: '',
        datas: []
      }
    },
    methods: {
      async getMovie() {
        let url = '/movie?name=' + this.name
        let self = this
        await this.$http
          .get(url)
          .then(function (response) {
            // handle success
            self.datas = response.data
            console.log(response.data)
            self.datas.forEach((val, i) => {
              if (val != null) {
                self.getMovieInfo(val)
              }
            })
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      },
      async getMovieInfo(val) {
        let url = '/movieInfo?url=' + val.url
        await this.$http
          .get(url)
          .then(function (response) {
            // handle success
            val.info = response.data
            val.searchable = false
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      },
      copyText() {
        var copyText = document.getElementById("myInput");
      }
    }
  }

</script>
