import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { SearchFunds } from "./pages";

export const App = () => {
  return (
    <MantineProvider withNormalizeCSS>
      <NotificationsProvider>
        <SearchFunds />
      </NotificationsProvider>
    </MantineProvider>
  );
};
