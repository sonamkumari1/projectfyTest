import React from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./components/Home/ThemeProvider";
import Profile from "./pages/students/Profile";
import Dashboard from "./pages/admin/Dashboard";
import Sidebar from "./pages/admin/Sidebar";
import AddProject from "./pages/admin/projects/AddProject";
import ProjectTable from "./pages/admin/projects/ProjectTable";
import EditProject from "./pages/admin/projects/EditProject";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import Projects from "./pages/students/Projects";
import ProjectCategoryPage from "./pages/students/ProjectCategoryPage";
import ProjectLevelPage from "./pages/students/ProjectLevelPage";
import ProjectDetail from "./pages/students/ProjectDetail";
import ProjectProgress from "./pages/students/projectProgress";
import MyLearning from "./pages/students/MyLearning";
import ProjectinDashboard from "./pages/students/ProjectinDashboard";
import Idea from "./pages/students/Idea/Idea";
import { AuthenticatedUser, ProtectedRoute } from "./components/ProtectedRoutes";
import PurchaseProjectProtectedRoute from "./components/PurchaseProjectProtectedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Home />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />,
          </AuthenticatedUser>
        ),
      },
      {
        path: "register",
        element: (
          <AuthenticatedUser>
            <Register />
          </AuthenticatedUser>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        ),
      },
      {
        path: "project/category/:category",
        element: (
          <ProtectedRoute>
            <ProjectCategoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "project/projectLevel/:projectLevel",
        element: (
          <ProtectedRoute>
            <ProjectLevelPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "project-detail/:projectId",
        element: (
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "project-progress/:projectId",
        element: (
          <ProtectedRoute>
            <PurchaseProjectProtectedRoute>
              <ProjectProgress />
            </PurchaseProjectProtectedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "my-learning",

        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "projectDashboard",
        element: (
          <ProtectedRoute>
            <ProjectinDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "idea",
        element: <Idea />,
      },

      //istructor part
      {
        path: "instructor",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "addProject",
            element: <AddProject />,
          },

          {
            path: "project",
            element: <ProjectTable />,
          },
          {
            path: "project/:projectId",
            element: <EditProject />,
          },
          {
            path: "project/:projectId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "project/:projectId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
