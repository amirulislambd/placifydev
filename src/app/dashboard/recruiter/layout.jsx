import { RequireRole } from '@/lib/core/session';
import React from 'react';

const recruiterLayout = async ({children}) => {
    await RequireRole("recruiter");
    return children
};

export default recruiterLayout;