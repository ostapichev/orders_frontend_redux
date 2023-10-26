import {FC} from 'react';


const ActivateForm: FC = () => {

    return (
        <div>
            <form>
                <input type="text" placeholder={'password'}/>
                <input type="text" placeholder={'confirm password'}/>
                <button>Activate</button>
            </form>
        </div>
    );
};

export {
    ActivateForm
};
