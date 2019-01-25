



import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from './woniu-redux';
// 负责链接组件 给到redux里的数据
// 接受一个组件 吧state里的数据放进去返回一个组件
// export function connect(mapStateToProps, mapDispatchToProps) {
//     return function(WrapComponent){
//         return class ConnectComponent extends React.Component{

//         }
//     }
// }
export const connect = (mapStateToProps=state=>state, mapDispatchToProps={}) =>(WrapComponent) => {
    return class ConnectComponent extends React.Component{
        static contextTypes = {
            store: PropTypes.object
        }
        constructor(props, context) {
            super(props, context);
            this.state = {
                props: {}
            }
        }
        componentDidMount() {
            const {store} = this.context;
            store.subscribe(() => this.update());
            this.update();
        }
        update() {
            // 获取mapStateToProps和mapDispatchToProps 放入this.props
            const {store} = this.context;
            const stateProps = mapStateToProps(store.getState())
            // 方法不能直接给  因为需要dispatch
            /* 
                每一个dispatch 长这样：
                function addGUn(data) {return {type: ADD_GUN, payload: data}}

                直接执行addGun 没有任何意义    需要store.dispatch(addGun(***)) 才有意义
                所以需要 addGun = () => store.dispatch(addGun()) 这样才有意义
                其实就是用disptch吧actionCreators包了一层
                这样在组件中执行某个dispatch (比如：addGun) 相当于执行的是dispatch(addGun)

            */
            const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
            console.log(stateProps);
            this.setState({
                props: {
                    ...this.state.props,
                    ...stateProps,
                    ...dispatchProps,
                }
            })
        }
        render() {
            return <WrapComponent {...this.state.props}></WrapComponent>
        }
    }
}

// provider 是一个组件 吧store放到context里
export class Provider extends React.Component{
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext() {
        return {
            store: this.store
        }
    }
    constructor(props, context) {
        super(props, context)
        this.store = props.store;
    }
    render() {
        return this.props.children
    }
}