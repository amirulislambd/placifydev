
import DashboardStats from '@/components/dashboard/DashboardStats';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';


const RecruiterPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-lg md:text-2xl font-bold text-white">
        Welcome, {user?.name} 👋
      </h1>

      <DashboardStats role="recruiter" />
    </div>
  );
};

export default RecruiterPage;