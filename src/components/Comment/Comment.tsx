import React, {FC} from 'react';

import {DateFormat} from "../DateFormat/DateFormat";
import {IComment} from "../../interfaces";

import css from './Comment.module.css';


interface IProps {
    commentBody: IComment;
    className: string;
}

const Comment: FC<IProps> = ({commentBody, className}) => {
    const {comment, created_at, profile} = commentBody;

    return (
        <div className={className === 'comment_body' ? css.comment_body : css.comment_modal}>
            <div>{comment}</div>
            <div>
                {profile.name} {profile.surname}&#44; {<DateFormat originalDate={created_at}/>}
            </div>
        </div>
    );
};

export {
    Comment
};
