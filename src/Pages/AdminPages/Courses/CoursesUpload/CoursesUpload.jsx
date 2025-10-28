// import React, { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";

// const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

// const CoursesUpload = () => {
//   const [preview, setPreview] = useState(null); // for image preview

//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       coursesImage: "",
//       coursesTitle: "",
//       coursePrice: "",
//       courseDetail: "",
//       coursesID: "",
//       chapters: [
//         {
//           courseChapterName: "",
//           courseChapter: "",
//           courseDetails: "",
//           courseLink: "",
//         },
//       ],
//     },
//   });

//   const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "chapters",
//   });

//   const onSubmit = async (data) => {
//     try {
//       // Handle image upload to imgbb
//       const formData = new FormData();
//       formData.append("image", data.coursesImage[0]);

//       const imgRes = await fetch(img_hosting_url, {
//         method: "POST",
//         body: formData,
//       });

//       const imgData = await imgRes.json();
//       const imgUrl = imgData.success ? imgData.data.display_url : null;

//       // Build final payload
//       const payload = {
//         coursesImage: imgUrl,
//         coursesTitle: data.coursesTitle,
//         coursePrice: data.coursePrice,
//         courseDetail: data.courseDetail,
//         chapters: data.chapters,
//       };

//       console.log(payload);
//       // Send course data to backend
//       const response = await fetch(
//         "http://localhost:5000/api/v1/energinet/courses/create-courses",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await response.json();
//       console.log("Backend response:", result);

//       if (result.success) {
//         alert("Course uploaded successfully!");

//         reset(); //this is use to clean the input values
//         setPreview(null); //this is use to clean the image input values
//       } else {
//         alert("Failed to upload course.");
//       }
//     } catch (error) {
//       console.error("Error uploading course:", error);
//     }
//   };

//   // Handle image preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div
//       className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/30
//         rounded-2xl shadow-lg p-8 text-white space-y-6 z-10"
//     >
//       <h1 className="text-2xl font-bold mb-4">Upload Course</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Main Course Info */}
//         <div className="flex flex-col gap-5">
//           <div className="flex">
//             {" "}
//             <input
//               type="file"
//               {...register("coursesImage", { required: true })}
//               onChange={handleImageChange}
//               className="text-white"
//             />
//             {errors.coursesImage && (
//               <p className="text-red-500 text-sm">Course image is required</p>
//             )}
//             {/* Show preview */}
//             {preview && (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="w-40 h-40 object-cover rounded-lg "
//               />
//             )}
//           </div>

//           <input
//             placeholder="Course Title"
//             {...register("coursesTitle", { required: true })}
//             className="w-full p-2 border rounded text-white"
//           />
//         </div>

//         <div className="flex gap-5">
//           <input
//             type="number"
//             placeholder="Course Price"
//             {...register("coursePrice", { required: true })}
//             className="w-full p-2 border rounded text-white"
//           />

//           <textarea
//             placeholder="Course Detail"
//             {...register("courseDetail", { required: true })}
//             className="w-full p-2 border rounded text-white"
//           />
//         </div>

//         {/* Dynamic Chapters */}
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold">Course Chapters</h2>
//           {fields.map((field, index) => (
//             <div key={field.id} className="border p-4 rounded mt-2 relative">
//               <button
//                 type="button"
//                 onClick={() => remove(index)}
//                 className="right-2 text-red-500 mb-5"
//               >
//                 ❌ Remove
//               </button>
//               <div className="flex gap-8">
//                 <input
//                   placeholder="Chapter Name"
//                   {...register(`chapters.${index}.courseChapterName`, {
//                     required: true,
//                   })}
//                   className="w-full p-2 border rounded mb-2 text-white"
//                 />
//                 <input
//                   placeholder="Chapter Number"
//                   {...register(`chapters.${index}.courseChapter`, {
//                     required: true,
//                   })}
//                   className="w-full p-2 border rounded mb-2 text-white"
//                 />
//               </div>
//               <textarea
//                 placeholder="Chapter Details"
//                 {...register(`chapters.${index}.courseDetails`, {
//                   required: true,
//                 })}
//                 className="w-full p-2 border rounded mb-2 text-white"
//               />
//               <input
//                 placeholder="Chapter Link"
//                 {...register(`chapters.${index}.courseLink`, {
//                   required: true,
//                 })}
//                 className="w-full p-2 border rounded mb-2 text-white"
//               />
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={() =>
//               append({
//                 courseChapterName: "",
//                 courseChapter: "",
//                 courseDetails: "",
//                 courseLink: "",
//                 isFinish: false,
//               })
//             }
//             className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-2 mt-3 text-white flex justify-between items-center"
//           >
//             ➕ Add Chapter
//           </button>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-white/5 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-2 text-white"
//         >
//           Upload Course
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CoursesUpload;

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";

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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.coursesImage[0]);

      const imgRes = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });
      const imgData = await imgRes.json();
      const imgUrl = imgData.success ? imgData.data.display_url : null;

      const payload = {
        coursesImage: imgUrl,
        coursesTitle: data.coursesTitle,
        coursePrice: data.coursePrice,
        courseDetail: data.courseDetail,
        chapters: data.chapters,
      };

      const response = await fetch(
        "http://localhost:5000/api/v1/energinet/courses/create-courses",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("✅ Course uploaded successfully!");
        reset();
        setPreview(null);
      } else {
        alert("❌ Failed to upload course.");
      }
    } catch (error) {
      console.error("Error uploading course:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
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
              {...register("coursesImage", { required: true })}
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
          {errors.coursesImage && (
            <p className="text-red-500 text-sm">Course image is required</p>
          )}
        </div>

        {/* Course Title */}
        <div>
          <label className="text-gray-700 font-medium">Course Title</label>
          <input
            placeholder="Enter course title"
            {...register("coursesTitle", { required: true })}
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
              {...register("coursePrice", { required: true })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Course Detail</label>
            <textarea
              placeholder="Write course details..."
              {...register("courseDetail", { required: true })}
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
                  {...register(`chapters.${index}.courseChapterName`, {
                    required: true,
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                />
                <input
                  placeholder="Chapter Number"
                  {...register(`chapters.${index}.courseChapter`, {
                    required: true,
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <textarea
                placeholder="Chapter Details"
                {...register(`chapters.${index}.courseDetails`, {
                  required: true,
                })}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 outline-none mb-4"
              />
              <input
                placeholder="Chapter Link"
                {...register(`chapters.${index}.courseLink`, {
                  required: true,
                })}
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
