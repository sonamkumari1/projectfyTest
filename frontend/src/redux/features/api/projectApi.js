import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PROJECT_API = "http://localhost:8000/api/v1/project";

export const projectApi = createApi({
  reducerPath: "projectApi",
  tagTypes: ["Refetch_Creator_Project"],
  baseQuery: fetchBaseQuery({
    baseUrl: PROJECT_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Project"],
    }),

    getSearchProjects: builder.query({
      query: ({ searchQuery = "", categories = [], sortByPrice = "" }) => {
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;

        // append categories
        if (categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }

        // append sort
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        };
      },
    }),

    getCreatorProject: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Project"],
    }),

    editProject: builder.mutation({
      query: ({ formData, projectId }) => ({
        url: `/${projectId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Project"],
    }),
    getProjectById: builder.query({
      query: (projectId) => ({
        url: `/${projectId}`,
        method: "GET",
      }),
    }),

    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Creator_Project"],
    }),

    createLecture: builder.mutation({
      query: ({ lectureTitle, projectId }) => ({
        url: `/${projectId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getProjectLecture: builder.query({
      query: (projectId) => ({
        url: `/${projectId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),
    editLecture: builder.mutation({
      query: ({
        lectureTitle,
        videoInfo,
        isPreviewFree,
        projectId,
        lectureId,
      }) => ({
        url: `/${projectId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
    getPublishedProject: builder.query({
      query: () => ({
        url: "/published-project",
        method: "GET",
      }),
    }),
    publishProject: builder.mutation({
      query: ({ projectId, query }) => ({
        url: `/${projectId}?publish=${query}`,
        method: "PATCH",
      }),
    }),
    getProjectsByCategory: builder.query({
      query: (category) => ({
        url: `/category/${encodeURIComponent(category)}`,
        method: "GET",
      }),
    }),
    getProjectsByLevel: builder.query({
      query: (projectLevel) => ({
        url: `/projectLevel/${encodeURIComponent(projectLevel)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetSearchProjectsQuery,
  useGetCreatorProjectQuery,
  useGetProjectByIdQuery,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useCreateLectureMutation,
  useRemoveLectureMutation,
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useGetProjectLectureQuery,
  useGetPublishedProjectQuery,
  usePublishProjectMutation,
  useGetProjectsByCategoryQuery,
  useGetProjectsByLevelQuery,
} = projectApi;
