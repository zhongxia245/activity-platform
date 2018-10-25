import '../../common/utils/fastclick'

// requestAnimationFrame 兼容低版本浏览器
import 'raf/polyfill'
// Promise 兼容低版本浏览器
import promise from 'es6-promise'

promise.polyfill()
