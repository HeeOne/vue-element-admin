const user = require('./user')
const role = require('./role')
const article = require('./article')
const search = require('./remote-search')

const Mock = require('mockjs')

const mocks = [
  ...user,
  ...role,
  ...article,
  ...search
]

function mockRequestData(data) {
  const url = data.url
  let tagert = null
  for (const tag of mocks) {
    if (tag.url === url) {
      tagert = tag
      break
    }
  }
  if (data.method === 'post') {
    data.body = data.data
  }
  return new Promise((resolve, reject) => {
    if (tagert) {
      resolve(Mock.mock(tagert.response(data)))
    } else {
      reject()
    }
  })
}

module.exports = {
  mockRequestData
}
