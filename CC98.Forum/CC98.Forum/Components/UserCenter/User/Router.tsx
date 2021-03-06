﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    Route,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { UserInfo } from '../../../States/AppState';
import UserManage from './Manage';
import Profile from './Profile';
import Activities from './Activities';
import Avatar from '../ExactAvatar';
import * as Actions from '../../../Actions/UserCenter';
import * as Utility from '../../../Utility';
import DocumentTitle from '../../DocumentTitle';

/**
 * 用户详情页用的Route
 */
export default class extends React.Component {
    render() {
        return (<div className="user-center-router">
            <Route path="/user/:method/:id?" exact component={UserExactWithRouter} />
            <Route path="/user/:method/:id/manage" component={UserManage} />
        </div>);
    }
}


interface States {
    /**
    * 用户信息
    */
    userInfo: UserInfo;
    /**
    * 用户头像链接地址
    */
    userAvatarImgURL: string;
}

/**
 * 用户详情主页
 */
class UserExact extends React.Component<{ match, history, changePage, notFoundUser}, States> {
    //组件加载时获取当前访问的用户信息
    async componentDidMount() {
        this.getInfo(this.props);
    }

    componentWillReceiveProps(nextProps){
        //如果url变过则重新获取用户信息
        if(this.props.match.params.id !== nextProps.match.params.id){
            this.getInfo(nextProps);
        }
    }

    async getInfo(props){
        try {
            let url: string,
                { id, method } = props.match.params,
                myHeaders = new Headers();
            //判断是通过name还是id来到用户详情页
            //不同的方法对应不同url
            if (!id) {
                throw new Error();
            } else if (method === 'name') {
                url = `/User/Name/${encodeURIComponent(id)}`;
            }
            else if (method === 'id') {
                url = `/User/${id}`;
            }
            myHeaders.append('Authorization', await Utility.getToken());
            let response = await Utility.cc98Fetch(url ,{
                headers: myHeaders
            });
            const data = await response.json();
            //默认导航到以id表示的用户详情页
            this.props.history.replace(`/user/id/${data.id}`);
            //改变store中当前访问位置与当前访问用户id
            this.props.changePage('exact', data.id);
            this.setState({
                userInfo: data,
                userAvatarImgURL: data.portraitUrl
            });
        } catch (e) {
            //未找到用户的处理
            this.props.notFoundUser();
        }
    }

    render() {
        return this.state ? 
        <div className="user-center-exact">
            <DocumentTitle title={`${this.state.userInfo.name} - 用户详情 - CC98论坛`} />
            <Avatar userAvatarImgURL={this.state.userAvatarImgURL} />
            <Profile userInfo={this.state.userInfo} />
            <Activities id={this.state.userInfo.id} />
        </div> : 
        <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>
        ;
    }
}

function mapDispatch(dispatch) {
    return {
        changePage: (page, id) => {
            dispatch(Actions.changeCurrentVisitingUserPage(page, id));
        },
        notFoundUser: () => {
            dispatch(Actions.userNotFound());
        }
    };
}

const UserExactWithRouter = withRouter(connect(null, mapDispatch)(UserExact));