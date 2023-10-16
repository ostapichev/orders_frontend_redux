import {FC} from 'react';

import {DateFormat} from "../DateFormat/DateFormat";
import {IComment} from "../../interfaces";


interface IProps {
    commentBody: IComment;
}

const Comment: FC<IProps> = ({commentBody}) => {
    const {comment, created_at, profile} = commentBody;

    return (
        <div>
            <div>comment: {comment}</div>
            <div>created at: {<DateFormat originalDate={created_at}/>}</div>
            <div>profile: {profile.surname}</div>
        </div>
    );
};

export {
    Comment
};
