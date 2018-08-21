<template>
  <div class="col-12">
    <div class="rol">
      <p></p>
    </div>
    <div class="col-12">
      <input class="form-control" type="text" placeh older="輸入電影名稱(Enter送出)" @keyup.enter="getMovie" v-model="name">
    </div>
    <div class="rol">
      <p></p>
    </div>
    <div class="accordion" id="accordione">
      <div class="card" v-for="(val, index) in datas" :key="index" v-if="val != null">
        <div class="card-header" :id="index">
          <h5 class="mb-0">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" :data-target="'#demo' + index" aria-expanded="false" :aria-controls="index">
              {{val.name}}
              <font-awesome-icon v-if="val.searchable == true" icon="spinner" spin/>
              <font-awesome-icon style="color:green" v-if="val.searchable == false" icon="check" />
            </button>
            <clipboard :beCopyData="selected(val)"></clipboard>
            <div class="btn-group dropleft float-right" v-if="val.info != null">
              <button type="button" class="btn btn-sm btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Youtube
              </button>
              <div class="dropdown-menu">
                <div v-for="(v, i) in val.info.youtube" :key="i">
                  <button class="dropdown-item" data-toggle="modal" data-target="#exampleModalCenter" @click="selectvideo(val,v.url)">
                    {{v.text}}
                  </button>
                </div>
              </div>
            </div>
          </h5>

        </div>
        <div :id="'demo'+index" class="collapse" :aria-labelledby="index" data-parent="#accordione">
          <div class="card-body">
            <div v-if="val.searchable == false" v-text="val.txt">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="col-12">
              <iframe width="560" height="315" :src="'https://www.youtube.com/embed/'+videoId" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              <a class="btn btn-outline-info" :href="'https://www.youtube.com/watch?v='+videoId" role="button">去Youtube看</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from './ToolComponents/Clipboard.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      name: '',
      select: '',
      datas: [],
      videoId: ''
    }
  },
  components: {
    Clipboard
  },
  methods: {
    async getMovie () {
      let url
      if (this.name.length > 50) {
        this.datas = {
          a: {
            url: this.name
          }
        }
        this.getMovieInfo(this.datas.a)
        return
      } else {
        url = '/movie?name=' + this.name
      }
      let self = this
      await this.$http
        .get(url)
        .then(function (response) {
          // handle success
          self.datas = response.data
          if (response.data.length === 0) {
            this.$toasted.show('沒有資料', {
              theme: 'outline',
              position: 'top-center',
              duration: 2500
            })
          }
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
    async getMovieInfo (val) {
      let url = '/movieInfo?url=' + val.url
      await this.$http
        .get(url)
        .then(function (response) {
          val.info = response.data
          this.setText(val)
          val.name = val.info.title_zh
          if (this.name.length > 50) {
            this.name = ''
          }
          val.searchable = false
        })
        .catch(function (error) {
          this.$toasted.show('沒有資料', {
            theme: 'outline',
            position: 'top-center',
            duration: 2500
          })
          console.log(error)
        })
    },
    setText (val) {
      val.txt = `
        <table>
        <tbody>
        <tr>
        <td style="height: 234px; width: 270.8px;" rowspan="4"><img src="` + val.info.src + `" /></td>
        <td>
        <h4>` + val.info.title_zh + ' ' + val.info.title_en + `</h4>
        </td>
        </tr>
        <tr>
        <td>片   長：` + val.info.info_1 + `</td>
        </tr>
        <tr>
        <td>導   演：` + val.info.info_3 + `</td>
        </tr>
        <tr>
        <td>演   員：` + val.info.info_4 + `</td>
        </tr>
        <tr>
        <td style="text-align: center;" colspan="2"><!--影片放這--><iframe width="560" height="315" src="https://www.youtube.com/embed/` + this.videoId + `" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><!--到這--></td>
        </tr>
        <tr>
        <td colspan="2">
        <h4><strong>影片介紹</strong></h4>
        </td>
        </tr>
        <tr>
        <td colspan="2">` + val.info.content + `</td>
        </tr>
        </tbody>
        </table>`
    },
    selectvideo (val, url) {
      this.videoId = url
      this.setText(val)
    },
    selected (val) {
      if (val.info !== undefined) this.setText(val)
      return val.txt
    }
  }
}

</script>
