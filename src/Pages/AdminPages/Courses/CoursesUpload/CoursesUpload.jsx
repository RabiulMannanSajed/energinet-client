import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const CoursesUpload = () => {
  const [preview, setPreview] = useState(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      coursesImage: "",
      coursesTitle: "",
      coursePrice: "",
      courseDetail: "",
      coursesID: "",
      chapters: [
        {
          courseChapterName: "",
          courseChapter: "",
          courseDetails: "",
          courseLink: "",
        },
      ],
    },
  });

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "chapters",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      // ✅ Check if all fields are empty
      const isEmpty =
        !data.coursesTitle &&
        !data.coursePrice &&
        !data.courseDetail &&
        (!data.coursesImage || data.coursesImage.length === 0) &&
        data.chapters.every(
          (ch) =>
            !ch.courseChapterName &&
            !ch.courseChapter &&
            !ch.courseDetails &&
            !ch.courseLink
        );

      if (isEmpty) {
        Swal.fire({
          icon: "warning",
          title: "Empty Course",
          text: "Please fill at least one field before submitting!",
          confirmButtonColor: "#2563EB",
          background: "#1E293B",
          color: "#E2E8F0",
        });
        return;
      }

      // ✅ Upload image if exists
      let imgUrl = null;
      if (data.coursesImage?.[0]) {
        const formData = new FormData();
        formData.append("image", data.coursesImage[0]);

        const imgRes = await fetch(img_hosting_url, {
          method: "POST",
          body: formData,
        });
        const imgData = await imgRes.json();
        imgUrl = imgData.success ? imgData.data.display_url : null;
      }

      const payload = {
        coursesImage: imgUrl,
        coursesTitle: data.coursesTitle || "",
        coursePrice: data.coursePrice || "",
        courseDetail: data.courseDetail || "",
        chapters: data.chapters.map((ch) => ({
          courseChapterName: ch.courseChapterName || "",
          courseChapter: ch.courseChapter || "",
          courseDetails: ch.courseDetails || "",
          courseLink: ch.courseLink || "",
        })),
      };

      // ✅ Send POST request to backend
      const response = await fetch(
        `${import.meta.env.VITE_URL}/courses/create-courses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Course Uploaded!",
          text: "Your course has been uploaded successfully.",
          confirmButtonColor: "#16A34A",
          background: "#1E293B",
          color: "#E2E8F0",
        });
        reset();
        setPreview(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: result.message || "Failed to upload course.",
          confirmButtonColor: "#EF4444",
          background: "#1E293B",
          color: "#E2E8F0",
        });
      }
    } catch (error) {
      console.error("Error uploading course:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while uploading the course.",
        confirmButtonColor: "#EF4444",
        background: "#1E293B",
        color: "#E2E8F0",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#f7fafc] to-[#e9f6f1] rounded-2xl shadow-lg p-10 border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 border-b pb-3">
        📘 Upload New Course
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Course Image Upload */}
        <div className="flex flex-col gap-3">
          <label className="text-gray-700 font-medium">Course Image</label>
          <div className="flex items-center gap-5">
            <input
              type="file"
              {...register("coursesImage")}
              onChange={handleImageChange}
              className="text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 cursor-pointer"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-lg border border-gray-200"
              />
            )}
          </div>
        </div>

        {/* Course Title */}
        <div>
          <label className="text-gray-700 font-medium">Course Title</label>
          <input
            placeholder="Enter course title"
            {...register("coursesTitle")}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        {/* Price & Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-gray-700 font-medium">Course Price</label>
            <input
              type="number"
              placeholder="Enter price"
              {...register("coursePrice")}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Course Detail</label>
            <textarea
              placeholder="Write course details..."
              {...register("courseDetail")}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
        </div>

        {/* Chapters */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📖 Course Chapters
          </h2>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4 relative"
            >
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-semibold"
              >
                ✖
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                <input
                  placeholder="Chapter Name"
                  {...register(`chapters.${index}.courseChapterName`)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                />
                <input
                  placeholder="Chapter Number"
                  {...register(`chapters.${index}.courseChapter`)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <textarea
                placeholder="Chapter Details"
                {...register(`chapters.${index}.courseDetails`)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 outline-none mb-4"
              />
              <input
                placeholder="Chapter Link"
                {...register(`chapters.${index}.courseLink`)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                courseChapterName: "",
                courseChapter: "",
                courseDetails: "",
                courseLink: "",
              })
            }
            className="flex items-center gap-2 text-green-700 bg-green-100 hover:bg-green-200 px-4 py-2 rounded-lg font-medium transition"
          >
            <FaPlusCircle /> Add Chapter
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          Upload Course
        </button>
      </form>
    </div>
  );
};

export default CoursesUpload;
