import * as React from 'react';
import { observer } from 'mobx-react';
import './loading.css';

@observer
export class LoaderComponent extends React.Component<any> {
    render() {
        const { children, predicate, networkError } = this.props;
        if (networkError) {
            return (
                <div>
                    {'NETWORK ERROR: ' + networkError}
                </div>
            )
        }
        if (!predicate) {
            return (
                <div>
                    {children}
                </div>
            )
        }
        return (
            <div className="ring-container">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}
