import L from 'react-loadable'
import { Loading } from './components'

const Loadable = opts =>
  L({
    loading: () => <Loading />,
    delay: 1000000,
    ...opts
  })

export default Loadable
