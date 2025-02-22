import { IconChevronDown, IconChevronUp, IconMinus, IconPlus } from "justd-icons"
import {
  Button,

  NumberField as NumberFieldPrimitive,


} from "react-aria-components"
import { tv } from "tailwind-variants"

import { useMediaQuery } from "@/utils/use-media-query"
import { Description, FieldError, FieldGroup, Input, Label } from "@/components/ui/field"
import { composeTailwindRenderProps } from "@/components/ui/primitive"
import { isTauriDesktop } from "@/utils/isTauri"

const fieldBorderStyles = tv({
  base: "group-data-focused:border-primary/70 forced-colors:border-[Highlight]",
  variants: {
    isInvalid: {
      true: "group-data-focused:border-danger/70 forced-colors:border-[Mark]",
    },
    isDisabled: {
      true: "group-data-focused:border-input/70",
    },
  },
})

const numberFieldStyles = tv({
  slots: {
    base: "group flex flex-col gap-y-1.5",
    stepperButton:
      "h-10 cursor-default px-3 text-muted-fg data-pressed:bg-primary data-pressed:text-primary-fg group-data-disabled:bg-secondary/70 forced-colors:group-data-disabled:text-[GrayText]",
  },
})

const { base, stepperButton } = numberFieldStyles()








const TimeNumberField = ({
  label,
  placeholder,
  description,
  className,
  errorMessage,
  ...props
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)") && !isTauriDesktop;
  return (
    <NumberFieldPrimitive {...props} className={composeTailwindRenderProps(className, base())}>
      {label && <Label>{label}</Label>}
      <FieldGroup className={`overflow-hidden ${isMobile ? "w-32" : "w-16"}`}>
        {(renderProps) => (
          <>
            {isMobile ? <StepperButton slot="decrement" className="border-r ml-0! h-10!" /> : null}
            <Input className={`tabular-nums ${isMobile ? "pl-13 pr-3.5! text-center" : "pr-0! px-2.5 text-left"}  `} placeholder={placeholder} min="0" />
            <div
              className={fieldBorderStyles({
                ...renderProps,
                className: "grid h-10 place-content-center border-s",
              })}
            >
              {isMobile ? (
                <StepperButton slot="increment" />
              ) : (
                <div className="flex h-full flex-col">
                  <StepperButton slot="increment" emblemType="chevron" className="h-5 px-1" />
                  <div
                    className={fieldBorderStyles({
                      ...renderProps,
                      className: "border-input border-b",
                    })}
                  />
                  <StepperButton slot="decrement" emblemType="chevron" className="h-5 px-1" />
                </div>
              )}
            </div>
          </>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </NumberFieldPrimitive>
  )
}







const StepperButton = ({
  slot,
  className,
  emblemType = "default",
  ...props
}) => {
  const icon =
    emblemType === "chevron" ? (
      slot === "increment" ? (
        <IconChevronUp className="size-5" />
      ) : (
        <IconChevronDown className="size-5" />
      )
    ) : slot === "increment" ? (
      <IconPlus />
    ) : (
      <IconMinus />
    )
  return (
    <Button className={stepperButton({ className })} slot={slot} {...props}>
      {icon}
    </Button>
  )
}


export { TimeNumberField }
