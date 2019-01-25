import React from 'react';
import { connect } from './woniu-react-redux';
import { addGun, removeGun, addGunAsync, addTwice} from './index.redux';
import {createSelector} from 'reselect';

const numSelector = createSelector(
    state => state,
    // 第二个参数， 是第一个的返回值
    state => ({num: state*2})
)
// 装饰器模式
@connect(
  state=>numSelector(state),
  {addGun, removeGun, addGunAsync, addTwice}
)
class App extends React.Component{
  render(){
    // num addGun，removeGun，addGunAsync都是connect给的，不需要手动dispatch
    return (
      <div>
        <h2>现在有机枪{this.props.num}把</h2>
        <button onClick={this.props.addGun}>申请武器</button>
        <button onClick={this.props.removeGun}>上交武器</button>
        <button onClick={this.props.addGunAsync}>拖两天再给</button>
        <button onClick={this.props.addTwice}>盛情两把</button>
      </div>
    ) 
  }
}
export default App;
