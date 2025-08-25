import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/redux/features/api/purchaseApi";
import { Loader2 } from "lucide-react";

function BuyPurchasedButton({projectId}) {
 const [createCheckoutSession, {data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseProjectHandler = async () => {
    await createCheckoutSession(projectId);
  };

  useEffect(()=>{
    if(isSuccess){
       if(data?.url){
        window.location.href = data.url; // Redirect to stripe checkout url
       }else{
        toast.error("Invalid response from server.")
       }
    } 
    if(isError){
      toast.error(error?.data?.message || "Failed to create checkout session")
    }
  },[data, isSuccess, isError, error])

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseProjectHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Project"
      )}
    </Button>
  );
};

export default BuyPurchasedButton;
