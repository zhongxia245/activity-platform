import 'antd/dist/antd.css'
import '../common/less/index.less'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import configureStore from './platform/redux/configureStore'
import routes from './platform/routes'
import Layout from './platform/layouts'

import LocalProvider from 'antd/lib/locale-provider'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

const store = configureStore()

const App = (
  <Provider store={store}>
    <Router basename="/">
      <LocalProvider locale={zh_CN}>
        <Layout>{renderRoutes(routes)}</Layout>
      </LocalProvider>
    </Router>
  </Provider>
)

ReactDOM.render(App, document.querySelector('#app'))
