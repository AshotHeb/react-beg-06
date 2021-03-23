import { memo } from 'react';

const A = (props) => {
    console.log('A Render' ,props);
    return (
        <div>
            A Component
        </div>
    );
};

export default memo(A);