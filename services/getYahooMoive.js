const request = require('request')
const cheerio = require('cheerio')
const readline = require('readline')

async function getBody (url) {
  const options = {
    url: url,
    method: 'GET'
  }
  return new Promise((resolve, reject) => {
    request.get(options, (err, res, body) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}

exports.question = async function (q) {
  return new Promise(resolve => {
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question(q + ' : ', content => {
      console.log('You input : ' + content)
      resolve(content)
      rl.close()
    })
  })
}

exports.firstSearch = async function (query) {
  try {
    const url = encodeURI('https://movies.yahoo.com.tw/moviesearch_result.html?keyword=' + query)
    const body = await getBody(url)
    const $ = cheerio.load(body)
    let datas = []
    $('.searchpage ul li').each((i, el) => {
      const go = cheerio.load($(el).html())
      let tmp = go('.release_movie_name')
        .text()
        .split('\n')
      if (tmp[1] !== undefined) {
        i++
        let key = tmp[1].trim()
        let value = go('.release_movie_name a').attr('href')
        datas[i] = {
          name: key,
          url: value,
          searchable: true
        }
        console.log(i + ' : ' + key)
      }
    })
    return datas
  } catch (e) {
    console.log(e)
  }
}

exports.secondSearch = async function (query) {
  try {
    const url = encodeURI(query)
    const body = await getBody(url)
    const $ = cheerio.load(body)
    let datas = {}
    datas['src'] = $(
      '#maincontainer #content_l .movie_intro_info .movie_intro_info_l .movie_intro_foto img'
    ).attr('src')
    $('#maincontainer #content_l .movie_intro_info .movie_intro_info_r').each(
      (i, el) => {
        const go = cheerio.load($(el).html())
        datas['title_zh'] = go('h1').text()
        datas['title_en'] = go('h3').text()
        go('span').each((i, el) => [
          (datas['info_' + i] = $(el)
            .text()
            .split('：')[1])
        ])
        go('.movie_intro_list').each((i, el) => {
          datas['info_' + (i + 3)] = $(el)
            .text()
            .split('\n')
          let tmp = ''
          datas['info_' + (i + 3)].forEach(element => {
            if (element.trim() !== '' && element.trim() !== '、') {
              tmp += element.trim() + ', '
            }
          })
          datas['info_' + (i + 3)] = tmp.substring(0, tmp.length - 2).replace(/"\\"/g, '')
        })
      }
    )
    datas['content'] = $('#maincontainer #content_l .l_box .gray_infobox_inner').text().trim().replace('\n          \n          詳全文', '').replace(/\n/g, '<br>')
    datas['content'] !== '' ? console.log('Fetch ok') : console.log('Fetch fail')
    return datas
  } catch (e) {
    console.log(e)
  }
}
