import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useDescope } from "@descope/react-sdk";
import { DescopeUser } from "@/types";

const OAuthCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const descope = useDescope();
  const hasExchanged = useRef(false);

  const onSuccess = (user: DescopeUser) => {
    navigate(user.customAttributes.v2Registered ? "/" : "/register");
  };

  const onFailure = (error: any) => {
    console.error("Error during OAuth code exchange", error);
    navigate("/login");
  };

  const handleOAuthRedirect = useCallback(async () => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code && !hasExchanged.current) {
      hasExchanged.current = true;

      try {
        const response = await descope.oauth.exchange(code);

        if (!response.ok) {
          onFailure(response.error);
          return;
        }

        if (!response.data || !response.data.user) {
          onFailure("No data or user in response");
          return;
        }

        onSuccess(response.data.user as DescopeUser);
      } catch (error) {
        onFailure(error);
      }
    } else if (!code) {
      navigate("/login");
    }
  }, [location.search, descope, navigate]);

  useEffect(() => {
    handleOAuthRedirect();
  }, [handleOAuthRedirect]);

  return <div>Redirecting...</div>;
};

export default OAuthCallback;
