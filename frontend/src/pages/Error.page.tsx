import React from 'react';
import { useRouteError } from 'react-router-dom';

export const Error = () => {
    const error = useRouteError();
    console.error(error);

    return <div>Error </div>;
};
