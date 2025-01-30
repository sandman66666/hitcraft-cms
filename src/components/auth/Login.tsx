import { Descope, useDescope } from "@descope/react-sdk";
import type { JWTResponse } from "@descope/core-js-sdk";
import { useState } from "react";
import { userApi } from "@/api";

const Login = () => {
  const [isDescopeReady, setIsDescopeReady] = useState(false);
  const { refresh } = useDescope();

  const handleSuccess = async (response: CustomEvent<JWTResponse>) => {
    const { user } = response.detail;
    if (!user?.userId) {
      throw new Error("User ID is required");
    }

    const {
      data: { registered },
    } = await userApi.isRegistered(user.userId);

    if (!registered) {
      // User authenticated but not registered
      await userApi.create(user.userId, user.loginIds);

      // Refresh Descope to get updated v2 user id
      await refresh();
    }

    // Redirect to home
    window.location.href = import.meta.env.VITE_APP_URL;
  };

  return (
    <div className="flex items-center justify-center bg-[#f1f1f3]">
      <div className="w-full max-w-md">
        {/* Login form container */}
        <div
          className={`w-full bg-white rounded-[42px] shadow-lg p-8 transition-opacity duration-300 ${
            isDescopeReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center">
            <h2 className="text-4xl font-light mb-2">
              Let's <strong className="font-bold">Login</strong>
            </h2>
            <p className="text-sm text-gray-600">Choose your login method</p>
          </div>

          <Descope
            flowId={"sign-in-v2"}
            onReady={() => setIsDescopeReady(true)}
            onSuccess={handleSuccess}
            client={{
              projectId: import.meta.env.VITE_DESCOPE_PROJECT_ID,
              persistTokens: true,
              autoRefresh: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
