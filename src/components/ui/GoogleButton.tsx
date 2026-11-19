"use client";

import { ButtonHTMLAttributes, useState } from "react";

type GoogleButtonSize = "large" | "medium";
type InteractionState = "default" | "hover" | "pressed" | "focus";

type GoogleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: GoogleButtonSize;
  enableHover?: boolean;
};

const stateClasses: Record<InteractionState, string> = {
  default: "border-[#d0d5dd] bg-[#f9fafb] text-[#666666]",
  hover: "border-[#004a76] bg-[#eef4f8] text-[#4f4f4f]",
  pressed:
    "border-[#b8c0c9] bg-[#edeff2] text-[#3f3f46] shadow-[inset_0px_4px_15px_rgba(0,58,93,0.1)]",
  focus:
    "border-[#b8c0c9] bg-[#edeff2] text-[#3f3f46] shadow-[0px_0px_0px_2px_white,0px_0px_0px_4px_#002e4a]",
};

/** Native CSS hover so desktop hover still reads when pointer events are flaky */
const cssHoverClasses =
  "[@media(hover:hover)_and_(pointer:fine)]:hover:enabled:border-[#004a76] [@media(hover:hover)_and_(pointer:fine)]:hover:enabled:bg-[#eef4f8] [@media(hover:hover)_and_(pointer:fine)]:hover:enabled:text-[#4f4f4f]";

export function GoogleButton({
  size = "large",
  enableHover = true,
  className = "",
  disabled,
  type = "button",
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onClick,
  ...props
}: GoogleButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [busy, setBusy] = useState(false);
  const isLarge = size === "large";
  const isDisabled = Boolean(disabled || busy);

  const interactionState: InteractionState = pressed
    ? "pressed"
    : keyboardFocus
      ? "focus"
      : enableHover && hovered
        ? "hover"
        : "default";

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      data-state={interactionState}
      className={[
        "relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border font-medium outline-none transition-[background-color,border-color,color,box-shadow] duration-150",
        disabled
          ? "cursor-not-allowed border-[#e5e7eb] bg-[#fbfcfd] text-[#b0b7c3]"
          : stateClasses[interactionState],
        !disabled && enableHover && !pressed && !keyboardFocus ? cssHoverClasses : "",
        isLarge ? "h-12 text-sm" : "h-11 text-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={(event) => {
        if (!isDisabled && enableHover) setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        if (!busy) setPressed(false);
        onMouseLeave?.(event);
      }}
      onMouseDown={(event) => {
        if (!isDisabled) setPressed(true);
        onMouseDown?.(event);
      }}
      onMouseUp={(event) => {
        // Keep pressed through click so pressed reads before the delay
        onMouseUp?.(event);
      }}
      onFocus={(event) => {
        if (!isDisabled && event.currentTarget.matches(":focus-visible")) {
          setKeyboardFocus(true);
        }
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setKeyboardFocus(false);
        if (!busy) setPressed(false);
        onBlur?.(event);
      }}
      onKeyDown={(event) => {
        if ((event.key === " " || event.key === "Enter") && !isDisabled) {
          setPressed(true);
        }
        onKeyDown?.(event);
      }}
      onKeyUp={(event) => {
        // Keep pressed through activation
        onKeyUp?.(event);
      }}
      onClick={async (event) => {
        if (isDisabled) return;
        onClick?.(event);
        if (event.defaultPrevented) {
          setPressed(false);
          return;
        }
        setBusy(true);
        setPressed(true);
        setHovered(false);
        // Brief pressed flash, then return to default
        await new Promise((resolve) => setTimeout(resolve, 100));
        setPressed(false);
        setBusy(false);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/icon-google.svg"
        alt=""
        width={20}
        height={20}
        className={`shrink-0 ${disabled ? "opacity-40" : ""}`}
      />
      Continue with Google
    </button>
  );
}
