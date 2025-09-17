import React, { useState } from "react";
import useCourses from "../../../../hooks/useCourses";
import { getEmbedUrl } from "../../../../../utils/getEmbedUrl";

const LearnCourses = () => {
  const [courses, refetch, isPending] = useCourses();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isPending) return <p>Loading...</p>;

  const openModal = (course) => {
    setSelectedCourse(course);
    setCurrentChapterIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };

  const handleNext = () => {
    if (
      selectedCourse &&
      currentChapterIndex < selectedCourse.chapters.length - 1
    ) {
      setCurrentChapterIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (selectedCourse && currentChapterIndex > 0) {
      setCurrentChapterIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses?.data.map((course) => (
        <div
          key={course._id}
          className=" bg-white/5
                backdrop-blur-md
                border
                border-white/20
                rounded-2xl
                shadow-lg
                p-8
                text-white
                space-y-6
                z-10 hover:shadow-lg transition"
        >
          {/* Course Image */}
          <img
            src={course.coursesImage}
            alt={course.coursesTitle}
            className="w-full h-48 object-cover rounded-lg"
          />

          {/* Course Info */}
          <h2 className="text-lg font-bold mt-2">{course.coursesTitle}</h2>
          <p className="text-gray-600">Price: ${course.coursePrice}</p>
          <p className="text-sm text-gray-700 mt-1 line-clamp-3">
            {course.courseDetail}
          </p>

          {/* View Chapters Button */}
          <button
            onClick={() => openModal(course)}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Chapters
          </button>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-70 flex items-center justify-center z-50">
          <div
            className=" bg-white/5
                backdrop-blur-md
                border
                border-white/20
                text-white
                space-y-6
                z-10 w-full max-w-3xl rounded-xl shadow-lg p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
            >
              ✕
            </button>

            {/* Course + Chapter Info */}
            <h2 className="text-xl font-bold mb-4">
              {selectedCourse.coursesTitle}
            </h2>
            <p className="mb-2 font-medium">
              {selectedCourse.chapters[currentChapterIndex].courseChapterName}
            </p>
            <p className="text-white mb-4">
              {selectedCourse.chapters[currentChapterIndex].courseDetails}
            </p>

            {/* Video Embed */}
            <div className="aspect-video mb-4">
              <iframe
                className="w-full h-full rounded-lg"
                src={getEmbedUrl(
                  selectedCourse.chapters[currentChapterIndex].courseLink
                )}
                title="Course Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentChapterIndex === 0}
                className={`px-4 py-2 rounded-lg ${
                  currentChapterIndex === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                ◀ Previous
              </button>
              <button
                onClick={handleNext}
                disabled={
                  currentChapterIndex === selectedCourse.chapters.length - 1
                }
                className={`px-4 py-2 rounded-lg ${
                  currentChapterIndex === selectedCourse.chapters.length - 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnCourses;
