import { RequireRole } from '@/lib/core/session';

const SeekerLayout = async({children}) => {
    await RequireRole("seeker");
    return children
};

export default SeekerLayout;