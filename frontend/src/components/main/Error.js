import React from 'react';
import '../../css/Error.css';

class Error extends React.Component {
    render() {
        return (
            <div className="errorContainer mt-4">
                <div className="alert alert-danger" role="alert">
                    You do not have permissions to access this page!
                </div>
            </div>
        );
    }
}
export default Error;
