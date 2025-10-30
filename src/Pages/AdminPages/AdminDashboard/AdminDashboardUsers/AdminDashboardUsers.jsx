import useUsers from "../../../../hooks/useUsers";
import { useUser } from "../../../../CustomProviders/useContext";
import { IoPeople } from "react-icons/io5";

const AdminDashboardUsers = () => {
  const [users] = useUsers();
  const { userEmail } = useUser();

  const normalUsers = users?.filter((user) => user.role !== "admin") || [];
  const totalUsers = normalUsers.length;

  return (
    <div
      className="
        bg-white
        border border-gray-200
        rounded-2xl
        shadow-sm
        p-6
        hover:shadow-md
        transition-all
        duration-200
        flex
        flex-col
        justify-between
      "
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Active Users</h2>

      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 text-sky-600">
          <IoPeople size={26} />
        </div>
        <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Showing total registered users (excluding admins)
      </p>
    </div>
  );
};

export default AdminDashboardUsers;
