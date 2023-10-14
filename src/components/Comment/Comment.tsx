import {FC} from 'react';
import {IComment} from "../../interfaces/comment.interface";
import {DateFormat} from "../DateFormat/DateFormat";

interface IProps {
    commentBody: IComment;
}

const Comment: FC<IProps> = ({commentBody}) => {
    const {comment, created_at, profile} = commentBody;
    return (
        <div>
            <div>comment: {comment}</div>
            <div>created at: {<DateFormat created_at={created_at}/>}</div>
            <div>profile: {profile.surname}</div>
        </div>
    );
};

export {
    Comment
};
