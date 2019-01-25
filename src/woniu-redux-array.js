const arrayThunk = ({getState, dispatch}) => next => action => {
    // 如果符合要求 需要重新dispatch 调用dispatch即可
    if(Array.isArray(action)) {
        console.log(action)
        return action.forEach(v => dispatch(v))
    }
    // 如果不符合要求  直接调用下一个中间件 使用next
    return next(action)
}
export default arrayThunk