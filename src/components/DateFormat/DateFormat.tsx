import {FC} from 'react';
import {format} from 'date-fns';


interface IProps {
    originalDate: string;
}

const DateFormat: FC<IProps> = ({originalDate}) => {
    const formatData = format(
        new Date(originalDate),
        'MMMM dd, yyyy  HH:mm:ss'
    );

    return (
        <div>
            {formatData}
        </div>
    );
};

export {
    DateFormat
};
