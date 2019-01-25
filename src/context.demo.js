import React from 'react';
import PropTypes from 'prop-types';

class Slidebar extends React.Component{
    render() {
        return (
            <div>
                <div>侧边栏</div>
                <Navbar></Navbar>
            </div>
        )
    }
}

class Navbar extends React.Component{
    static contextTypes ={
        user: PropTypes.string 
    }
    render() {
        console.log(this.context)
        return (
            <div>{this.context.user}的导航栏</div>
        )
    }
}
class Page extends React.Component{
    static childContextTypes = {
        user: PropTypes.string
    }
    constructor(props){
        super(props);
        this.state={
            user: '蜗牛'
        }
    }
    getChildContext() {
        return this.state;
    }
    render() {
        return (
            <div>
                <div>我是{this.state.user}</div>
                <Slidebar></Slidebar>
            </div>
        )
    }
}
export default Page;