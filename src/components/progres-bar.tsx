import * as React from 'react';
import { observer } from 'mobx-react';

export const ProgressbarComponent = observer((props) => {
    return (
        <div style={{background: '#EDEDED'}}>
            <div
                style={{
                    width: props.progress + '%',
                    height: '5px',
                    background: '#1B93EE'
                }}>
            </div>
        </div>
    )
});