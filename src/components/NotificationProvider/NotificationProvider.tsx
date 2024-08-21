import { Toaster } from "react-hot-toast";

import NotificationProviderProps from "./NotificationProvider.interface.ts";

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  return (
    <>
      {children} <Toaster position="top-center" />
    </>
  );
};

export default NotificationProvider;
