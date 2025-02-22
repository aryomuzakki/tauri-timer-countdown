import { useEffect, useState } from "react"
import { Button, Menu } from "./ui"
import { IconPin } from "justd-icons";
import { getCurrentWindow } from "@tauri-apps/api/window";

const AppMenu = () => {
  const [toggleOpts, setToggleOpts] = useState(new Set(["pin"]));

  const appWindow = getCurrentWindow();

  useEffect(() => {
    appWindow.setAlwaysOnTop(toggleOpts.has("pin"))
  }, [toggleOpts])



  return (
    <Menu>
      <Button
        size="extra-small"
        appearance="plain"
        className="opacity-50 hover:opacity-100 rounded-none font-light"
        id="context-menu-btn"
      >
        Menu
      </Button>
      <Menu.Content className="sm:min-w-52">
        <Menu.Section
          selectionMode="multiple"
          selectedKeys={toggleOpts}
          onSelectionChange={setToggleOpts}
        >
          <Menu.Item id="pin" textValue="Pin App to Top">
            <IconPin />
            <Menu.Label>Pin App to Top</Menu.Label>
          </Menu.Item>
        </Menu.Section>
      </Menu.Content>
    </Menu>
  )
}

export default AppMenu