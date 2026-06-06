import React from 'react';

const JobDetailsPage = async({ params}) => {
    const id = await params
    console.log(id)
    return (
        <div>
            <h1>Job Details</h1>
        </div>
    );
};

export default JobDetailsPage;