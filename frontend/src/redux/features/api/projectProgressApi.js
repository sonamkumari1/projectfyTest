import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PROJECT_PROGRESS_API = "https://projectfytest.onrender.com/api/v1/progress";

export const projectProgressApi = createApi({
  reducerPath: "projectProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PROJECT_PROGRESS_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProjectProgress: builder.query({
      query: (projectId) => ({
        url: `/${projectId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ projectId, lectureId }) => ({
        url: `/${projectId}/lecture/${lectureId}/view`,
        method:"POST"
      }),
    }),

    completeProject: builder.mutation({
        query:(projectId) => ({
            url:`/${projectId}/complete`,
            method:"POST"
        })
    }),
    inCompleteProject: builder.mutation({
        query:(projectId) => ({
            url:`/${projectId}/incomplete`,
            method:"POST"
        })
    }),
    
  }),
});
export const {
useGetProjectProgressQuery,
useUpdateLectureProgressMutation,
useCompleteProjectMutation,
useInCompleteProjectMutation
} = projectProgressApi;