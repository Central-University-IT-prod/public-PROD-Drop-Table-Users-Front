import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useViewportSize } from "@mantine/hooks";

import { NotificationProvider } from "@/components";
import { AppShell } from "@mantine/core";

import Routes from "./Routes.tsx";

import { AtomMain } from "@/storage";

function App() {
  const { width } = useViewportSize();
  const [, setState] = useRecoilState(AtomMain);

  useEffect(() => {
    setState((prev) => ({ ...prev, isDesktop: width > 768 }));
  }, [width, setState]);

  return (
    <NotificationProvider>
      <AppShell padding={"md"} header={{ height: 60 }}>
        <Routes />
      </AppShell>
    </NotificationProvider>
  );
}

export default App;
