import './index.less'

export default ({ className, list = '' }) => {
  list = list.split('\n')
  return (
    <ul className={`lcgc-rule-list ${className || ''}`}>
      {list.map((item, index) => {
        return <li key={index}>{item}</li>
      })}
    </ul>
  )
}
