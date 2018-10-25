import './Nav.less'
import Icon from 'antd/lib/icon'

export default ({ current = 0, modules = [], onSelect = () => {}, onUp = () => {}, onDown = () => {} }) => (
  <div className="ae-nav">
    <h3>模块导航</h3>
    <ul>
      {modules.map((item, index) => {
        return (
          <li
            key={`${item['name']}_${index}}`}
            className={current === index ? 'ae-nav--active' : ''}
            onClick={onSelect.bind(this, index)}
          >
            <span>{item['name']}</span>
            <div>
              {index === 0 ? '' : <Icon type="arrow-up" theme="outlined" onClick={onUp.bind(this, index)} />}
              {modules.length - 1 === index ? (
                ''
              ) : (
                <Icon type="arrow-down" theme="outlined" onClick={onDown.bind(this, index)} />
              )}
            </div>
          </li>
        )
      })}
    </ul>
  </div>
)
