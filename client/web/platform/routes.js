import Loadable from './Loadable'

// const Home = Loadable({
//   loader: () => import(/* webpackChunkName: "./client/web/platform/pages/Home" */ './pages/Home')
// })

const ActivityEditor = Loadable({
  loader: () => import(/* webpackChunkName: "./client/web/platform/pages/ActivityEditor" */ './pages/ActivityEditor')
})

const PageTemplate = Loadable({
  loader: () => import(/* webpackChunkName: "./client/web/platform/pages/PageTemplate" */ './pages/PageTemplate')
})

const ActivityList = Loadable({
  loader: () => import(/* webpackChunkName: "./client/web/platform/pages/ActivityList" */ './pages/ActivityList')
})

const routes = [
  {
    component: ActivityList,
    path: '/',
    exact: true
  },
  {
    component: ActivityList,
    path: '/list'
  },
  {
    component: ActivityEditor,
    path: '/editor'
  },
  {
    component: PageTemplate,
    path: '/template'
  }
]

export default routes
