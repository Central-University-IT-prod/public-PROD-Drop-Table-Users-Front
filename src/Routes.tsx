import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "@mantine/core";

import { ModalProvider, Header } from "@/components";
import { PageHome, PageAdminDocs, PageAdminUsers } from "@/pages";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <ModalProvider>
        <AppShell.Main>
          <Header />

          <Routes>
            <Route path={"/"} element={<PageHome />} />
            <Route path={"/admin/docs"} element={<PageAdminDocs />} />
            <Route path={"/admin/users"} element={<PageAdminUsers />} />
          </Routes>
        </AppShell.Main>
      </ModalProvider>
    </BrowserRouter>
  );
};

export default RoutesComponent;
