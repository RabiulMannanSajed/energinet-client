import { useState } from "react";
import axios from "axios";
import useDeletedCourses from "../../../../hooks/useDeletedCourses";

const DeletedCourses = () => {
  const [deletedCourses, refetch] = useDeletedCourses();
  const [loading, setLoading] = useState(false);

  const deletedCoursesFind = deletedCourses?.data
    ? deletedCourses.data.filter((course) => course.isDeleted)
    : [];

  console.log("Deleted courses:", deletedCoursesFind);

  const handleRestore = async (id) => {
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:5000/api/v1/energinet/courses/${id}/restore`
      );
      alert("Course restored successfully!");
      refetch(); // refresh data after restore
    } catch (error) {
      console.error("Restore failed:", error);
      alert("Failed to restore course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-xl font-bold mb-4">Deleted Courses</h1>

      {deletedCoursesFind?.length === 0 ? (
        <p className="text-gray-500">No deleted courses found.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg shadow ">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {deletedCoursesFind.map((course) => (
              <tr key={course._id} className="text-center text-white">
                <td className="p-2 border">
                  <img
                    src={course.coursesImage}
                    alt={course.coursesTitle}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 border">{course.coursesTitle}</td>
                <td className="p-2 border">${course.coursePrice}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleRestore(course._id)}
                    disabled={loading}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                  >
                    {loading ? "Restoring..." : "Restore"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeletedCourses;
