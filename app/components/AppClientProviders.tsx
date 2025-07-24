"use client";
import FCMInitializer from "./FCMInitializer";
import GlobalUnreadBadge from "./GlobalUnreadBadge";

const AppClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <FCMInitializer />
      <GlobalUnreadBadge />
      {children}
    </>
  );
};

export default AppClientProviders;
