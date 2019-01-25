const thunk = ({getState, dispatch}) => next => action => {
    // 如果是函数  就执行一下
    if(typeof action === 'function') {
        return action(dispatch, getState)
    }
    return next(action)
}
export default thunk