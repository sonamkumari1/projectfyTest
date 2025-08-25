
import { useGetProjectDetailWithStatusQuery } from "@/redux/features/api/purchaseApi";
import { useParams, Navigate } from "react-router-dom";

const PurchaseProjectProtectedRoute = ({ children }) => {
  const { projectId } = useParams();
  const { data, isLoading } = useGetProjectDetailWithStatusQuery(projectId);

  if (isLoading) return <p>Loading...</p>;

  return data?.purchased ? (
    children
  ) : (
    <Navigate to={`/project-detail/${projectId}`} />
  );
};
export default PurchaseProjectProtectedRoute;
