import {FC} from 'react';
import {IGroup} from "../../interfaces";
import {DateFormat} from "../DateFormat/DateFormat";

interface IProps {
    group: IGroup;
}

const Group: FC<IProps> = ({group}) => {
    const {id, name} = group;

    return (
        <div>
            <ul>
                <li>id: {id}</li>
                <li>name: {name}</li>
            </ul>
            <hr/>
        </div>
    );
};

export {
    Group
};
