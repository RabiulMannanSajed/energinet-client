import React, { useState } from "react";
import useCourses from "../../../../hooks/useCourses";
import axios from "axios";
import { toast } from "react-toastify";

const Courses = () => {
  const [courses, refetch] = useCourses();
  const [loading, setLoading] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState(null);

  const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  // ✅ Soft Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_URL}/courses/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();

      if (result.success) {
        toast.success("✅ Course deleted successfully");
        refetch();
      } else {
        toast.error("❌ Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Server error while deleting course");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Open Edit Modal
  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      coursesImage: course.coursesImage,
      coursesTitle: course.coursesTitle,
      coursePrice: course.coursePrice,
      courseDetail: course.courseDetail,
      chapters: course.chapters || [],
    });
  };

  // ✅ Update Form Fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Chapter Change
  const handleChapterChange = (index, field, value) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[index][field] = value;
    setFormData((prev) => ({ ...prev, chapters: updatedChapters }));
  };

  // ✅ Add New Chapter
  const addChapter = () => {
    setFormData((prev) => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        {
          courseChapterName: "",
          courseChapter: "",
          courseDetails: "",
          courseLink: "",
        },
      ],
    }));
  };

  // ✅ Remove Chapter
  const removeChapter = (index) => {
    const updatedChapters = formData.chapters.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, chapters: updatedChapters }));
  };

  // ✅ Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgForm = new FormData();
    imgForm.append("image", file);

    try {
      setLoading(true);
      const imgRes = await fetch(img_hosting_url, {
        method: "POST",
        body: imgForm,
      });

      const imgData = await imgRes.json();
      if (imgData.success) {
        const imgUrl = imgData.data.display_url;
        setFormData((prev) => ({ ...prev, coursesImage: imgUrl }));
        toast.success("✅ Image uploaded successfully!");
      } else {
        toast.error("❌ Image upload failed");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save Updated Course
  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `${import.meta.env.VITE_URL}/courses/${editingCourse._id}`,
        formData
      );

      if (res.data.success) {
        toast.success("✅ Course updated successfully!");
        setEditingCourse(null);
        refetch();
      } else {
        toast.error("❌ Failed to update course");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while updating course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-[#f9fafb] to-[#eef6f3] rounded-xl shadow-sm">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        📚 Manage Courses
      </h1>

      {/* Table */}
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
                  className="border-b bg-white text-black hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <td className="px-6 py-3">
                    <img
                      src={course.coursesImage}
                      alt={course.coursesTitle}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium">
                    {course.coursesTitle}
                  </td>
                  <td className="px-6 py-3 max-w-xs truncate text-sm">
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
                <td colSpan="4" className="text-center text-gray-500 py-5">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Edit Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-700 w-[90%] md:w-[700px] rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto border border-gray-600">
            <h2 className="text-2xl font-semibold text-white mb-5 flex items-center gap-2">
              ✏️ Edit Course
            </h2>

            <div className="space-y-4">
              {/* ✅ Image Upload */}
              <div>
                <label className="block text-gray-200 font-medium mb-1">
                  Course Image
                </label>
                {formData.coursesImage && (
                  <img
                    src={formData.coursesImage}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-500 mb-2"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-gray-800 border border-gray-600 text-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* ✅ Title */}
              <div>
                <label className="block text-gray-200 font-medium mb-1">
                  Course Title
                </label>
                <input
                  name="coursesTitle"
                  value={formData.coursesTitle}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 text-gray-100 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* ✅ Price */}
              <div>
                <label className="block text-gray-200 font-medium mb-1">
                  Course Price
                </label>
                <input
                  name="coursePrice"
                  type="number"
                  value={formData.coursePrice}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 text-gray-100 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* ✅ Detail */}
              <div>
                <label className="block text-gray-200 font-medium mb-1">
                  Course Detail
                </label>
                <textarea
                  name="courseDetail"
                  value={formData.courseDetail}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 text-gray-100 rounded-lg p-2.5 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* ✅ Chapters */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-200 font-medium">
                    Course Chapters
                  </label>
                  <button
                    type="button"
                    onClick={addChapter}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-lg text-sm transition"
                  >
                    + Add Chapter
                  </button>
                </div>

                {formData.chapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="border border-gray-600 p-3 rounded-lg mb-3 bg-gray-800 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeChapter(index)}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-500"
                    >
                      ✕
                    </button>

                    <input
                      placeholder="Chapter Name"
                      value={chapter.courseChapterName}
                      onChange={(e) =>
                        handleChapterChange(
                          index,
                          "courseChapterName",
                          e.target.value
                        )
                      }
                      className="w-full mb-2 bg-gray-900 border border-gray-600 text-gray-100 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                    <input
                      placeholder="Chapter"
                      value={chapter.courseChapter}
                      onChange={(e) =>
                        handleChapterChange(
                          index,
                          "courseChapter",
                          e.target.value
                        )
                      }
                      className="w-full mb-2 bg-gray-900 border border-gray-600 text-gray-100 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                    <input
                      placeholder="Chapter Details"
                      value={chapter.courseDetails}
                      onChange={(e) =>
                        handleChapterChange(
                          index,
                          "courseDetails",
                          e.target.value
                        )
                      }
                      className="w-full mb-2 bg-gray-900 border border-gray-600 text-gray-100 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                    <input
                      placeholder="Chapter Link"
                      value={chapter.courseLink}
                      onChange={(e) =>
                        handleChapterChange(index, "courseLink", e.target.value)
                      }
                      className="w-full bg-gray-900 border border-gray-600 text-gray-100 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Modal Actions */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setEditingCourse(null)}
                className="px-5 py-2 rounded-lg border border-gray-400 text-gray-200 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-70"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
