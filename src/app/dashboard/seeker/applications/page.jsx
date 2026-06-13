import { getApplicationsByaApplicant } from '@/lib/api/application';
import { getSessionUser } from '@/lib/core/session';
import React from 'react';
import ApplicationsTable from './ApplicationsTable';

const ApplicationsPage = async() => {
  const user = await getSessionUser();
  const applications = await getApplicationsByaApplicant(user?.id);
  // console.log(applications[6].companyLogo);
  return (
    <div>
      <h1>Applications</h1>
      <ApplicationsTable applications={applications} />
    </div>
  );
};

export default ApplicationsPage;