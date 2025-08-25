import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PROJECT_PURCHASE_API = "http://localhost:8000/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PROJECT_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (projectId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { projectId },
      }),
    }),
    getProjectDetailWithStatus: builder.query({
      query: (projectId) => ({
        url: `/project/${projectId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedProjects: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetProjectDetailWithStatusQuery,
  useGetPurchasedProjectsQuery,
} = purchaseApi;