import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectLevelFilter() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-screen-xl mx-auto px-4 sm:px-4  -mt-12 sm:-mt-10 md:-mt-10
                    bg-white text-black dark:bg-black dark:text-white"
    >
      <h1 className="text-3xl sm:text-5xl md:text-5xl font-extrabold mb-6 text-center leading-tight">
        Choose Projects by Skill Level
      </h1>
      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto text-center leading-relaxed">
        Whether you’re just starting out, sharpening your skills, or tackling
        complex real-world challenges — we’ve got the right projects for you.
        Explore <span className="text-green-600 font-semibold">Beginner</span>,
        <span className="text-yellow-500 font-semibold">Medium</span>, and
        <span className="text-red-500 font-semibold">Advanced</span> level
        projects tailored to your journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        {/* Beginner */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-lg px-4 py-2 flex flex-col items-center text-center transition hover:shadow-2xl hover:-translate-y-1 dark:bg-white/5 dark:border-gray-900">
          <img
            src="https://m.media-amazon.com/images/S/pv-target-images/b8a356f8325aa0d7b4d6b8bd7678f52702b1e00d8fb450ca161e3f97167e01ef._SX1080_FMjpg_.jpg"
            alt="Beginner"
            className="h-40 w-full object-cover rounded-lg mt-3 mb-3"
          />
          <h2 className="text-xl font-semibold mb-3 text-black dark:text-white">
            Beginner Level Projects
          </h2>
          <p className="text-gray-700 dark:text-gray-400 mb-6">
            Explore Beginner Level Projects
          </p>
          <button
            onClick={() => navigate("/project/projectLevel/Beginner")}
            className="text-white rounded-full px-5 py-1.5 mb-4 bg-gray-900 font-medium text-lg flex items-center transition border border-gray-700 dark:bg-zinc-900"
          >
            Explore....
          </button>
        </div>

        {/* Medium */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-lg px-4 py-2 flex flex-col items-center text-center transition hover:shadow-2xl hover:-translate-y-1 dark:bg-white/5 dark:border-gray-900">
          <img
            src="https://webixytech.com/admin_panel/assets/project_images/1625120256What_is_an_IT_company.jpg"
            alt="Medium"
            className="h-40 w-full object-cover rounded-lg mt-3 mb-3"
          />
          <h2 className="text-xl font-semibold mb-3 text-black dark:text-white">
            Medium Level Projects
          </h2>
          <p className="text-gray-700 dark:text-gray-400 mb-6">
            Explore Medium Level Projects
          </p>
          <button
            onClick={() => navigate("/project/projectLevel/Medium")}
            className="text-white rounded-full px-5 py-1.5 mb-4 bg-gray-900 font-medium text-lg flex items-center transition border border-gray-700 dark:bg-zinc-900"
          >
            Explore....
          </button>
        </div>

        {/* Advanced */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-lg px-4 py-2 flex flex-col items-center text-center transition hover:shadow-2xl hover:-translate-y-1 dark:bg-white/5 dark:border-gray-900">
          <img
            src="https://imageio.forbes.com/specials-images/imageserve/62ea057f9f71bb80937b70bb/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds"
            alt="Advanced"
            className="h-40 w-full object-cover rounded-lg mt-3 mb-3"
          />
          <h2 className="text-xl font-semibold mb-3 text-black dark:text-white">
            Advanced Level Projects
          </h2>
          <p className="text-gray-700 dark:text-gray-400 mb-6">
            Explore Advanced Level Projects
          </p>
          <button
            onClick={() => navigate("/project/projectLevel/Advance")}
            className="text-white rounded-full px-5 py-1.5 mb-4 bg-gray-900 font-medium text-lg flex items-center transition border border-gray-700 dark:bg-zinc-900"
          >
            Explore....
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectLevelFilter;
