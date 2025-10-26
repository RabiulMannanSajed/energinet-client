import React, { useState } from "react";
import useCourses from "../../../../hooks/useCourses";
import { getEmbedUrl } from "../../../../../utils/getEmbedUrl";

const LearnCourses = () => {
  const [courses, refetch, isPending] = useCourses();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isPending) return <p className="text-gray-400">Loading...</p>;

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
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses?.data.map((course) => (
        <div
          key={course._id}
          className="
              bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900
              border border-emerald-800/20
              text-white rounded-2xl shadow-2xl
              w-full max-w-3xl p-8 relative
              transition-all duration-300
            "
        >
          {/* Course Image */}
          <img
            src={course.coursesImage}
            alt={course.coursesTitle}
            className="w-full h-48 object-cover rounded-xl border border-emerald-700/20"
          />

          {/* Course Info */}
          <h2 className="text-xl font-semibold text-emerald-300 mt-3">
            {course.coursesTitle}
          </h2>
          <p className="text-sm text-gray-300 mt-1 line-clamp-3">
            {course.courseDetail}
          </p>

          {/* View Chapters Button */}
          <button
            onClick={() => openModal(course)}
            className="
              mt-4 w-full
              bg-emerald-600 hover:bg-emerald-500
              text-white font-medium py-2 rounded-lg
              transition-all duration-200
              shadow-md hover:shadow-emerald-500/30
            "
          >
            View Chapters
          </button>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div
            className="
              bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900
              border border-emerald-800/20
              text-white rounded-2xl shadow-2xl
              w-full max-w-3xl p-8 relative
              transition-all duration-300
            "
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
            >
              ✕
            </button>

            {/* Course Info */}
            <h2 className="text-2xl font-bold mb-3 text-emerald-300">
              {selectedCourse.coursesTitle}
            </h2>
            <p className="font-medium text-emerald-200">
              {selectedCourse.chapters[currentChapterIndex].courseChapterName}
            </p>
            <p className="text-gray-300 mb-4">
              {selectedCourse.chapters[currentChapterIndex].courseDetails}
            </p>

            {/* Video Embed */}
            <div className="aspect-video rounded-lg overflow-hidden mb-4 border border-emerald-700/30 shadow-md">
              <iframe
                className="w-full h-full"
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
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={currentChapterIndex === 0}
                className={`px-5 py-2 rounded-lg font-medium ${
                  currentChapterIndex === 0
                    ? "bg-gray-600/30 text-gray-400 cursor-not-allowed"
                    : "bg-emerald-700 hover:bg-emerald-600 text-white shadow-md"
                }`}
              >
                ◀ Previous
              </button>
              <button
                onClick={handleNext}
                disabled={
                  currentChapterIndex === selectedCourse.chapters.length - 1
                }
                className={`px-5 py-2 rounded-lg font-medium ${
                  currentChapterIndex === selectedCourse.chapters.length - 1
                    ? "bg-gray-600/30 text-gray-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
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
