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

exports.firstSearch = async function (url) {
  try {
    const body = await getBody(url)
    const $ = cheerio.load(body)
    let datas = {}
    $('body #content li').each((i, el) => {
      const go = cheerio.load($(el).html())
      let txt = go('a').text()
      let ur = go('a').attr('href')
      datas[i] = {
        text: txt.replace('\n  \n', ''),
        url: String(ur).replace('/watch?v=', '')
      }
      datas[i].time = datas[i].text.substring(0, 4)
      datas[i].text = datas[i].text.substring(4, datas[i].text.length).trim()
    })
    let tmp = []
    for (var j in datas) {
      if (datas[j].text === '' || datas[j].url === undefined || datas[j].text.length > 50 || j <= 28) {
        delete datas[j]
      } else {
        tmp.push(datas[j])
      }
    }
    datas = tmp
    return datas
  } catch (e) {
    console.log(e)
  }
}
