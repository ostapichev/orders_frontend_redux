import {FC, useState} from 'react';

import {Comment} from "../Comment/Comment";
import {DateFormat} from "../DateFormat/DateFormat";
import {IOrder} from "../../interfaces";


interface IProps {
    order: IOrder;
}

const Order: FC<IProps> = ({order}) => {
    const [show, setShow] = useState(false);
    const {
        id,
        name,
        surname,
        email,
        phone,
        age,
        course,
        course_format,
        course_type,
        status,
        sum,
        already_paid,
        group,
        created_at,
        manager,
        utm,
        msg,
        comments,
    } = order;
    return (
        <div>
            <button onClick={() => setShow(prev => !prev)}>
                <ul>
                    <li>id: {id}</li>
                    <li>name: {name}</li>
                    <li>surname: {surname}</li>
                    <li>email: {email}</li>
                    <li>phone: {phone}</li>
                    <li>age: {age}</li>
                    <li>course: {course}</li>
                    <li>course format: {course_format}</li>
                    <li>course type: {course_type}</li>
                    <li>status: {status}</li>
                    <li>course: {course}</li>
                    <li>sum: {sum}</li>
                    <li>already paid: {already_paid}</li>
                    <li>group: {group.name}</li>
                    <li>created: {<DateFormat created_at={created_at}/>}</li>
                    <li>manager: {manager !== null ? manager.name : 'null'}</li>
                </ul>
            </button>
            {
                show &&
                <div>
                    <div>utm: {utm !== null ? utm : 'null'}</div>
                    <div>msg: {msg !== null ? msg : 'null'}</div>
                    <hr/>
                    <div>comments: {
                        comments.map(commentBody => <Comment key={commentBody.id} commentBody={commentBody}/>)
                    }
                    </div>
                    <button>Edit order</button>
                </div>
            }
        </div>
    );
};

export {
    Order
};
