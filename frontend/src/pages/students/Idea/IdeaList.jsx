import React from "react";

const IdeaList = ({ ideas, onEdit }) => {
  return (
    <div className="grid gap-4">
      {ideas.map((idea) => (
        <div key={idea._id} className="bg-gray-700 text-white p-4 rounded">
          <h3 className="text-lg font-semibold">{idea.title}</h3>

          {/* Render rich text with formatting */}
          <div
            className="line-clamp-2 text-gray-300"
            dangerouslySetInnerHTML={{ __html: idea.description }}
          />

          <button
            onClick={() => onEdit(idea)}
            className="mt-2 text-sm text-blue-400 hover:underline bg-zinc-900 border border-gray-300 rounded px-3 py-1"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default IdeaList;
