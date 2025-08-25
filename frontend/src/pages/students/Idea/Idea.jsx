
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ViewIdea from "./ViewIdea";
// import RichTextEditor from "@/components/RichTextEditor";

// const Idea = () => {
//   const [ideas, setIdeas] = useState([]);
//   const [formVisible, setFormVisible] = useState(false); // popup toggle
//   const [editMode, setEditMode] = useState(false);
//   const [ideaData, setIdeaData] = useState({ title: "", description: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [viewIdeaOpen, setViewIdeaOpen] = useState(false);
//   const [selectedIdea, setSelectedIdea] = useState(null);

//   const fetchIdeas = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/v1/idea/all", {
//         withCredentials: true,
//       });
//       setIdeas(res.data.ideas);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchIdeas();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editMode) {
//         await axios.put(
//           `http://localhost:8000/api/v1/idea/update/${editingId}`,
//           ideaData,
//           { withCredentials: true }
//         );
//       } else {
//         await axios.post("http://localhost:8000/api/v1/idea/add", ideaData, {
//           withCredentials: true,
//         });
//       }
//       setIdeaData({ title: "", description: "" });
//       setEditMode(false);
//       setFormVisible(false); // close after submit
//       fetchIdeas();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (idea, e) => {
//     e.stopPropagation();
//     setEditMode(true);
//     setEditingId(idea._id);
//     setIdeaData({ title: idea.title, description: idea.description });
//     setFormVisible(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(
//         `http://localhost:8000/api/v1/idea/delete/${editingId}`,
//         { withCredentials: true }
//       );
//       setIdeaData({ title: "", description: "" });
//       setEditMode(false);
//       setFormVisible(false);
//       fetchIdeas();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleView = (idea) => {
//     setSelectedIdea(idea);
//     setViewIdeaOpen(true);
//   };

//   const handleCloseView = () => {
//     setViewIdeaOpen(false);
//     setSelectedIdea(null);
//   };

//   return (
//     <div className=" bg-black text-white p-10 relative  px-36">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">All Ideas</h2>
//         <button
//           onClick={() => {
//             setFormVisible(true);
//             setEditMode(false);
//             setIdeaData({ title: "", description: "" });
//           }}
//           className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full"
//         >
//           Share Your Idea
//         </button>
//       </div>

//       {/* ---- List of Ideas ---- */}
//       <div className="space-y-4 ">
//         {ideas.map((idea) => (
//           <div
//             key={idea._id}
//             onClick={() => handleView(idea)}
//             className="bg-gray-800 p-4 rounded shadow-md flex justify-between items-start cursor-pointer"
//           >
//             <div>
//               <h3 className="text-lg font-bold">{idea.title}</h3>
//               <div
//                 className="line-clamp-2 text-gray-300"
//                 dangerouslySetInnerHTML={{ __html: idea.description }}
//               />
//             </div>
//             <button
//               onClick={(e) => handleEdit(idea, e)}
//               className="mt-2 text-sm text-white bg-zinc-900 border border-gray-300 rounded-2xl px-3 py-1"
//             >
//               Edit
//             </button>
//           </div>
//         ))}

//         {viewIdeaOpen && selectedIdea && (
//           <ViewIdea idea={selectedIdea} onClose={handleCloseView} />
//         )}
//       </div>

//       {/* ---- Popup Modal ---- */}
//       {formVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-gray-900 p-6 rounded-2xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[60%] max-h-[90vh] overflow-y-auto relative">
//             <button
//               onClick={() => setFormVisible(false)}
//               className="absolute top-3 right-3 text-gray-400 hover:text-white"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-bold mb-4">
//               {editMode ? "Edit Your Idea" : "Share a New Idea"}
//             </h2>

//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 placeholder="Project Title"
//                 value={ideaData.title}
//                 onChange={(e) =>
//                   setIdeaData({ ...ideaData, title: e.target.value })
//                 }
//                 className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
//                 required
//               />

//               <RichTextEditor input={ideaData} setInput={setIdeaData} />

//               <div className="flex justify-center gap-4 mt-4 flex-wrap">
//                 <button
//                   type="submit"
//                   className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full"
//                 >
//                   {editMode ? "Update Idea" : "Submit Idea"}
//                 </button>

//                 {editMode && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={handleDelete}
//                       className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setEditMode(false);
//                         setIdeaData({ title: "", description: "" });
//                         setFormVisible(false);
//                       }}
//                       className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Idea;
import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewIdea from "./ViewIdea";
import RichTextEditor from "@/components/RichTextEditor";

const Idea = () => {
  const [ideas, setIdeas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [ideaData, setIdeaData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [viewIdeaOpen, setViewIdeaOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const fetchIdeas = async () => {
    try {
      const res = await axios.get("https://projectfytest.onrender.com/api/v1/idea/all", {
        withCredentials: true,
      });
      setIdeas(res.data.ideas);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `https://projectfytest.onrender.com/api/v1/idea/update/${editingId}`,
          ideaData,
          { withCredentials: true }
        );
      } else {
        await axios.post("https://projectfytest.onrender.com/api/v1/idea/add", ideaData, {
          withCredentials: true,
        });
      }
      setIdeaData({ title: "", description: "" });
      setEditMode(false);
      setFormVisible(false);
      fetchIdeas();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (idea, e) => {
    e.stopPropagation();
    setEditMode(true);
    setEditingId(idea._id);
    setIdeaData({ title: idea.title, description: idea.description });
    setFormVisible(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://projectfytest.onrender.com/api/v1/idea/delete/${editingId}`,
        { withCredentials: true }
      );
      setIdeaData({ title: "", description: "" });
      setEditMode(false);
      setFormVisible(false);
      fetchIdeas();
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = (idea) => {
    setSelectedIdea(idea);
    setViewIdeaOpen(true);
  };

  const handleCloseView = () => {
    setViewIdeaOpen(false);
    setSelectedIdea(null);
  };

  return (
    <div className="bg-black text-white px-4 sm:px-8 md:px-20 lg:px-36 py-10 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">All Ideas</h2>
        <button
          onClick={() => {
            setFormVisible(true);
            setEditMode(false);
            setIdeaData({ title: "", description: "" });
          }}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-sm sm:text-base"
        >
          Share Your Idea
        </button>
      </div>

      {/* ---- List of Ideas ---- */}
      <div className="space-y-4">
        {ideas.map((idea) => (
          <div
            key={idea._id}
            onClick={() => handleView(idea)}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-start cursor-pointer flex-col sm:flex-row gap-3"
          >
            <div className="flex-1">
              <h3 className="text-lg font-bold">{idea.title}</h3>
              <div
                className="line-clamp-2 text-gray-300 mt-1"
                dangerouslySetInnerHTML={{ __html: idea.description }}
              />
            </div>
            <button
              onClick={(e) => handleEdit(idea, e)}
              className="text-sm text-white bg-zinc-900 border border-gray-300 rounded-2xl px-3 py-1 self-start"
            >
              Edit
            </button>
          </div>
        ))}

        {/* ViewIdea Modal */}
        {viewIdeaOpen && selectedIdea && (
          <ViewIdea idea={selectedIdea} onClose={handleCloseView} />
        )}
      </div>

      {/* ---- Popup Modal ---- */}
      {formVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-2">
          <div className="bg-gray-900 p-6 rounded-2xl w-[95%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setFormVisible(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {editMode ? "Edit Your Idea" : "Share a New Idea"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={ideaData.title}
                onChange={(e) =>
                  setIdeaData({ ...ideaData, title: e.target.value })
                }
                className="w-full p-2 bg-gray-700 rounded text-white"
                required
              />

              {/* Rich Text Editor */}
              <RichTextEditor input={ideaData} setInput={setIdeaData} />

              <div className="flex flex-wrap justify-center sm:justify-end gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full"
                >
                  {editMode ? "Update Idea" : "Submit Idea"}
                </button>

                {editMode && (
                  <>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setIdeaData({ title: "", description: "" });
                        setFormVisible(false);
                      }}
                      className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Idea;
