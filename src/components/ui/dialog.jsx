import { useEffect, useRef } from "react"

import { IconX } from "justd-icons"

import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  Heading,
  Text,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { useMediaQuery } from "@/utils/use-media-query"
import { Button, } from "./button"

const dialogStyles = tv({
  slots: {
    root: [
      "peer/dialog group/dialog relative flex max-h-[inherit] flex-col overflow-hidden outline-hidden [scrollbar-width:thin] [&::-webkit-scrollbar]:size-0.5",
    ],
    header:
      "relative flex flex-col gap-0.5 p-4 sm:gap-1 sm:p-6 [&[data-slot=dialog-header]:has(+[data-slot=dialog-footer])]:pb-0",
    description: "text-muted-fg text-sm",
    body: [
      "isolate flex flex-1 flex-col overflow-auto px-4 py-1 sm:px-6",
      "max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))]",
    ],
    footer:
      "isolate mt-auto flex flex-col-reverse justify-between gap-3 p-4 pt-3 sm:flex-row sm:p-6 sm:pt-5",
    closeIndicator:
      "close absolute top-1 right-1 z-50 grid size-8 place-content-center rounded-xl data-focused:bg-secondary data-hovered:bg-secondary data-focused:outline-hidden data-focus-visible:ring-1 data-focus-visible:ring-primary sm:top-2 sm:right-2 sm:size-7 sm:rounded-md",
  },
})

const { root, header, description, body, footer, closeIndicator } = dialogStyles()

const Dialog = ({
  role = "dialog",
  className,
  ...props
}) => {
  return <DialogPrimitive role={role} className={root({ className })} {...props} />
}

const Trigger = (props) => (
  <ButtonPrimitive {...props} />
)






const Header = ({ className, ...props }) => {
  const headerRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        header.parentElement?.style.setProperty(
          "--dialog-header-height",
          `${entry.target.clientHeight}px`,
        )
      }
    })

    observer.observe(header)
    return () => observer.unobserve(header)
  }, [])

  return (
    <div data-slot="dialog-header" ref={headerRef} className={header({ className })}>
      {props.title && <Title>{props.title}</Title>}
      {props.description && <Description>{props.description}</Description>}
      {!props.title && typeof props.children === "string" ? <Title {...props} /> : props.children}
    </div>
  )
}

const titleStyles = tv({
  base: "flex flex-1 items-center text-fg",
  variants: {
    level: {
      1: "font-semibold text-lg sm:text-xl",
      2: "font-semibold text-lg sm:text-xl",
      3: "font-semibold text-base sm:text-lg",
      4: "font-semibold text-base",
    },
  },
})





const Title = ({ level = 2, className, ref, ...props }) => (
  <Heading
    slot="title"
    level={level}
    ref={ref}
    className={titleStyles({ level, className })}
    {...props}
  />
)


const Description = ({ className, ref, ...props }) => (
  <Text slot="description" className={description({ className })} ref={ref} {...props} />
)


const Body = ({ className, ref, ...props }) => (
  <div data-slot="dialog-body" ref={ref} className={body({ className })} {...props} />
)


const Footer = ({ className, ...props }) => {
  const footerRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current

    if (!footer) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        footer.parentElement?.style.setProperty(
          "--dialog-footer-height",
          `${entry.target.clientHeight}px`,
        )
      }
    })

    observer.observe(footer)
    return () => {
      observer.unobserve(footer)
    }
  }, [])
  return (
    <div ref={footerRef} data-slot="dialog-footer" className={footer({ className })} {...props} />
  )
}

const Close = ({ className, appearance = "outline", ref, ...props }) => {
  return <Button slot="close" className={className} ref={ref} appearance={appearance} {...props} />
}






const CloseIndicator = ({ className, ...props }) => {
  const isMobile = useMediaQuery("(max-width: 600px)")
  const buttonRef = useRef(null)

  useEffect(() => {
    if (isMobile && buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [isMobile])
  return props.isDismissable ? (
    <ButtonPrimitive
      ref={buttonRef}
      {...(isMobile ? { autoFocus: true } : {})}
      aria-label="Close"
      slot="close"
      className={closeIndicator({ className })}
    >
      <IconX className="size-4" />
    </ButtonPrimitive>
  ) : null
}

Dialog.Trigger = Trigger
Dialog.Header = Header
Dialog.Title = Title
Dialog.Description = Description
Dialog.Body = Body
Dialog.Footer = Footer
Dialog.Close = Close
Dialog.CloseIndicator = CloseIndicator









export { Dialog }
