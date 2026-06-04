import Sidebar from '@/components/dashboard/Sidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
      <div className="flex min-h-screen container mx-auto ">
        <Sidebar className="flex-1" />
        <div className="flex-1 w-full">{children}</div>
      </div>
    );
};

export default DashboardLayout;