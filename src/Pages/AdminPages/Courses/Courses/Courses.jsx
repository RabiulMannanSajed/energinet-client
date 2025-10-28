import React, { useState } from "react";
import useCourses from "../../../../hooks/useCourses";

const Courses = () => {
  const [courses, refetch] = useCourses();
  const [loading, setLoading] = useState(false);

  // ✅ Soft Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_URL}/courses/${id}`,
        { method: "DELETE" }
      );
      const result = await response.json();

      if (result.success) {
        alert("✅ Course deleted successfully (soft delete).");
        refetch();
      } else {
        alert("❌ Failed to delete course.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit
  const handleEdit = (course) => {
    alert(`Edit Course: ${course.coursesTitle}`);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-[#f9fafb] to-[#eef6f3] rounded-xl shadow-sm">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        📚 Manage Courses
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-200 bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#f3f7f5] text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 border-b">Image</th>
              <th className="px-6 py-3 border-b">Title</th>
              <th className="px-6 py-3 border-b">Detail</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses?.data?.length > 0 ? (
              courses.data.map((course) => (
                <tr
                  key={course._id}
                  className="border-b hover:bg-[#f8fcfa] transition-colors"
                >
                  <td className="px-6 py-3">
                    <img
                      src={course.coursesImage}
                      alt={course.coursesTitle}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {course.coursesTitle}
                  </td>
                  <td className="px-6 py-3 text-gray-600 max-w-xs truncate">
                    {course.courseDetail}
                  </td>
                  <td className="px-6 py-3 flex gap-3 justify-center">
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => handleDelete(course._id)}
                      className={`${
                        loading
                          ? "bg-red-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm transition`}
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 text-base">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
