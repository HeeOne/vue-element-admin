import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { remoteLangKey } from '@/lang/index'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  // paramsSerializer: function(params) {
  //   console.log(qs.parse(qs.stringify(params, { allowDots: true, arrayFormat: 'indices' })))
  //   return qs.parse(qs.stringify(params, { allowDots: true, arrayFormat: 'indices' }))
  // },
  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [function(data, headers) {
    // Do whatever you want to transform the data
    const arrayFormat = headers.arrayFormat || 'indices'
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=utf-8') {
      // post请求参数处理
      return qs.stringify(data, { allowDots: true, arrayFormat: arrayFormat })
    }
    return data
  }]
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['language'] = remoteLangKey()
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    const token = getToken()
    config.headers['token'] = token
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    const res = error.data
    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    if (res.code === 401 || res.code === 402 || res.code === 403) {
      // to re-login
      MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  }
)

export default service
