import {FC} from 'react';
import {Link} from "react-router-dom";

import {IOrder} from "../../interfaces/order.interface";


interface IProps {
    order: IOrder;
}
const Order: FC<IProps> = ({order}) => {
    const {id, name, surname, phone, age, course} = order
    return (
        <div>
            <Link to={'' +order.id.toString()}>
                <ul>
                    <li>id: {id}</li>
                    <li>name: {name}</li>
                    <li>surname: {surname}</li>
                    <li>age: {age}</li>
                    <li>phone: {phone}</li>
                    <li>course: {course}</li>
                </ul>
            </Link>
        </div>
    );
};

export {
    Order
};