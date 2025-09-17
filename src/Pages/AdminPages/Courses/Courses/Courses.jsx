import React, { useState } from "react";
import useCourses from "../../../../hooks/useCourses";

const Courses = () => {
  const [courses, refetch] = useCourses(); // assuming useCourses returns [data, refetch]
  const [loading, setLoading] = useState(false);
  console.log("courses", courses);
  // ✅ Soft Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/v1/energinet/courses/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Course deleted successfully (soft delete).");
        refetch(); // reload updated list
      } else {
        alert("Failed to delete course.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit
  const handleEdit = (course) => {
    // for now just log; you can open modal or navigate to edit page
    console.log("Editing course:", course);
    alert(`Edit Course: ${course.coursesTitle}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Detail</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses?.data?.map((course) => (
              <tr key={course._id} className="border-t ">
                <td className="px-4 py-2 border">
                  <img
                    src={course.coursesImage}
                    alt={course.coursesTitle}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border">{course.coursesTitle}</td>
                <td className="px-4 py-2 border">{course.courseDetail}</td>
                <td className="px-4 py-2  flex gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
            {courses?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
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
