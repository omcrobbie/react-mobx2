import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export class LoaderComponent extends React.Component<{predicate: any}> {
    render() {
        const { children, predicate } = this.props;
        if (predicate) {
            return (
                <div>
                    {children}
                </div>
            )
        }
        return (
            <div>
                LOADING...
            </div>
        )
    }
}
