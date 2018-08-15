<template>
  <div class="col-12">
    <div class="rol">
      <p></p>
    </div>
    <div class="col-12">
      <input class="form-control" type="text" placeholder="Default input" @keyup.enter="getMovie" v-text="select">
    </div>
    <div class="col-12">
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <p>&lt;table&gt;
            <br />&lt;tbody&gt;
            <br />&lt;tr&gt;
            <br />&lt;td style="height: 234px; width: 270.8px;" rowspan="5"&gt;圖片&lt;/td&gt;
            <br />&lt;td&gt;
            <br />&lt;h4&gt;電影名稱(英文)&lt;/h4&gt;
            <br />&lt;/td&gt;
            <br />&lt;/tr&gt;
            <br />&lt;tr&gt;
            <br />&lt;td&gt;片 長：&lt;/td&gt;
            <br />&lt;/tr&gt;
            <br />&lt;tr&gt;
            <br />&lt;td&gt;導 演：&lt;/td&gt;
            <br />&lt;/tr&gt;
            <br />&lt;tr&gt;
            <br />&lt;td&gt;演 員：&lt;/td&gt;
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
            <br />&lt;td colspan="2"&gt;&nbsp;影片介紹文字&lt;/td&gt;
            <br />&lt;/tr&gt;
            <br />&lt;/tbody&gt;
            <br />&lt;/table&gt;</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      name: '',
      select: '14274'
    }
  },
  methods: {
    getMovie () {
      axios
        .post('/movie', this.select)
        .then(function (response) {
          // handle success
          console.log(response)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .then(function () {
          // always executed
        })
    }
  }
}
</script>
