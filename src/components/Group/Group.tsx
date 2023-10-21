import {FC} from 'react';
import {IGroup} from "../../interfaces";

interface IProps {
    group: IGroup;
}

const Group: FC<IProps> = ({group}) => {
    const {name} = group;

    return (
        <option value={name}>{name}</option>
    );
};

export {
    Group
};