﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageSystemProps } from '../../Props/MessageSystemProps';
import { UbbContainer } from '../UbbContainer'
declare let moment: any;

export class MessageSystembox extends React.Component<MessageSystemProps> {

    render() {
        let content;
        if (this.props.topicId) {
            let host = window.location.host;
            if (this.props.floor) {
                let a: any = (this.props.floor / 10) + 1;
                let b = parseInt(a);
                let c = this.props.floor + 10 - b * 10;
                if (this.props.isRead) {
                    content = `[url=http://${host}/topic/${this.props.topicId}/${b}#${c}][color=gray]${this.props.content}[/color][/url]`;
                }
                else {
                    content = `[url=http://${host}/topic/${this.props.topicId}/${b}#${c}][b][color=black]${this.props.content}[/color][/b][/url]`;
                }
            }
            else {
                if (this.props.isRead) {
                    content = `[url=http://${host}/topic/${this.props.topicId}][color=gray]${this.props.content}[/color][/url]`;
                }
                else {
                    content = `[url=http://${host}/topic/${this.props.topicId}][b][color=black]${this.props.content}[/color][/b][/url]`;
                }
            }
        }
        else {
            if (this.props.isRead) {
                content = `[color=gray]${this.props.content}[/color]`;
            }
            else {
                content = `[color=black][b]${this.props.content}[/b][/color]`;
            }
        }
        return (<div className="message-system-box">
                    <div className="message-system-box-bar">
                            <div className="message-system-box-title">
                                {this.props.title}
                            </div>
                            <div className="message-system-box-date" >
                                {moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    </div>
                    <div className="message-system-box-content">
                        <UbbContainer code={content} />
                    </div>
                </div>);
    }
}