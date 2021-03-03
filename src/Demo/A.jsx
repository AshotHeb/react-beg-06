import { memo } from 'react';

const A = (props) => {
    console.log('A Render');
    return (
        <div>
            A Component
        </div>
    );
};

export default memo(A);