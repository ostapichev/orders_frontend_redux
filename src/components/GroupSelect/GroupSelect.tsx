import {FC} from 'react';
import {IGroup} from "../../interfaces";

interface IProps {
    group: IGroup;
}

const GroupSelect: FC<IProps> = ({group}) => {
    const {id, name} = group;

    return (
        <option value={name}>{name}</option>
    );
};

export {
    GroupSelect
};