import {FC} from 'react';
import {format} from 'date-fns';

interface IProps {
    created_at: string
}

const DateFormat: FC<IProps> = ({created_at}) => {
    const formatData = format(new Date(created_at), 'MMMM dd, yyyy  HH:mm:ss');
    return (
        <div>
            {formatData}
        </div>
    );
};

export {
    DateFormat
};
