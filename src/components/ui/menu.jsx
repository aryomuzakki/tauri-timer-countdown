import { createContext, use } from "react"

import { IconBulletFill, IconCheck, IconChevronLgRight } from "justd-icons"








import {
  Button,
  Collection,
  Header,
  MenuItem as MenuItemPrimitive,
  Menu as MenuPrimitive,
  MenuSection as MenuSectionPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
  composeRenderProps,
} from "react-aria-components"

import { tv } from "tailwind-variants"

import { cn } from "@/utils/classes"
import {
  DropdownItemDetails,
  DropdownKeyboard,
  DropdownLabel,
  DropdownSeparator,
  dropdownItemStyles,
  dropdownSectionStyles,
} from "./dropdown"
import { Popover } from "./popover"





const MenuContext = createContext({ respectScreen: true })





const Menu = ({ respectScreen = true, ...props }) => {
  return (
    <MenuContext value={{ respectScreen }}>
      <MenuTriggerPrimitive {...props}>{props.children}</MenuTriggerPrimitive>
    </MenuContext>
  )
}

const MenuSubMenu = ({ delay = 0, ...props }) => (
  <SubmenuTriggerPrimitive {...props} delay={delay}>
    {props.children}
  </SubmenuTriggerPrimitive>
)

const menuStyles = tv({
  slots: {
    menu: "grid max-h-[calc(var(--visual-viewport-height)-10rem)] grid-cols-[auto_1fr] overflow-auto rounded-xl p-1 outline-hidden [clip-path:inset(0_0_0_0_round_calc(var(--radius-lg)-2px))] sm:max-h-[inherit] *:[[role='group']+[role=group]]:mt-4 *:[[role='group']+[role=separator]]:mt-1",
    popover: "z-50 p-0 shadow-xs outline-hidden sm:min-w-40",
    trigger: [
      "relative inline text-left outline-hidden data-focus-visible:ring-1 data-focus-visible:ring-primary",
    ],
  },
})

const { menu, popover, trigger } = menuStyles()






const MenuTrigger = ({ className, ref, ...props }) => (
  <Button ref={ref} data-slot="menu-trigger" className={trigger({ className })} {...props}>
    {(values) => (
      <>{typeof props.children === "function" ? props.children(values) : props.children}</>
    )}
  </Button>
)










const MenuContent = ({
  className,
  showArrow = false,
  popoverClassName,
  ...props
}) => {
  const { respectScreen } = use(MenuContext)
  return (
    <Popover.Content
      respectScreen={respectScreen}
      showArrow={showArrow}
      className={popover({
        className: popoverClassName,
      })}
      {...props}
    >
      <MenuPrimitive className={menu({ className })} {...props} />
    </Popover.Content>
  )
}





const MenuItem = ({ className, isDanger = false, children, ...props }) => {
  const textValue = props.textValue || (typeof children === "string" ? children : undefined)
  return (
    <MenuItemPrimitive
      className={composeRenderProps(className, (className, renderProps) =>
        dropdownItemStyles({
          ...renderProps,
          className: renderProps.hasSubmenu
            ? cn([
                "data-open:data-danger:bg-danger/10 data-open:data-danger:text-danger",
                "data-open:bg-accent data-open:text-accent-fg data-open:*:data-[slot=icon]:text-accent-fg data-open:*:[.text-muted-fg]:text-accent-fg",
                className,
              ])
            : className,
        }),
      )}
      textValue={textValue}
      data-danger={isDanger ? "true" : undefined}
      {...props}
    >
      {(values) => (
        <>
          {values.isSelected && (
            <>
              {values.selectionMode === "single" && (
                <span
                  data-slot="bullet-icon"
                  className="-mx-0.5 mr-2 flex size-4 shrink-0 items-center justify-center **:data-[slot=indicator]:size-2.5 **:data-[slot=indicator]:shrink-0"
                >
                  <IconBulletFill data-slot="indicator" />
                </span>
              )}
              {values.selectionMode === "multiple" && (
                <IconCheck className="-mx-0.5 mr-2 size-4" data-slot="checked-icon" />
              )}
            </>
          )}

          {typeof children === "function" ? children(values) : children}

          {values.hasSubmenu && (
            <IconChevronLgRight data-slot="chevron" className="absolute right-2 size-3.5" />
          )}
        </>
      )}
    </MenuItemPrimitive>
  )
}





const MenuHeader = ({ className, separator = false, ...props }) => (
  <Header
    className={cn(
      "col-span-full px-2.5 py-2 font-semibold text-base sm:text-sm",
      separator && "-mx-1 mb-1 border-b sm:px-3 sm:pb-[0.625rem]",
      className,
    )}
    {...props}
  />
)

const { section, header } = dropdownSectionStyles()






const MenuSection = ({ className, ref, ...props }) => {
  return (
    <MenuSectionPrimitive ref={ref} className={section({ className })} {...props}>
      {"title" in props && <Header className={header()}>{props.title}</Header>}
      <Collection items={props.items}>{props.children}</Collection>
    </MenuSectionPrimitive>
  )
}

const MenuSeparator = DropdownSeparator
const MenuItemDetails = DropdownItemDetails
const MenuKeyboard = DropdownKeyboard
const MenuLabel = DropdownLabel

Menu.Keyboard = MenuKeyboard
Menu.Content = MenuContent
Menu.Header = MenuHeader
Menu.Item = MenuItem
Menu.Section = MenuSection
Menu.Separator = MenuSeparator
Menu.ItemDetails = MenuItemDetails
Menu.Label = MenuLabel
Menu.Trigger = MenuTrigger
Menu.Submenu = MenuSubMenu


export { Menu }
