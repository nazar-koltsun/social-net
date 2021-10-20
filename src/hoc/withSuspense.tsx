import React, { Suspense } from 'react';
import Loader from '../components/common/Loader/Loader';

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<Loader />} >
            <WrappedComponent {...props} />
        </Suspense>
    };
} 

export default withSuspense;
