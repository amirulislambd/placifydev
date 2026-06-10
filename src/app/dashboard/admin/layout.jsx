import { RequireRole } from '@/lib/core/session';

const AdminDashboardLayout =async ({children}) => {
    await RequireRole("admin");
    return children
};

export default AdminDashboardLayout;