"use client";

import { ButtonHTMLAttributes, useState } from "react";
import { Spinner } from "./Spinner";

type PrimaryButtonSize = "large" | "medium";
type InteractionState = "default" | "hover" | "pressed" | "focus" | "loading";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: PrimaryButtonSize;
  enableHover?: boolean;
};

const stateClasses: Record<Exclude<InteractionState, "loading">, string> = {
  default:
    "border-[#003a5d] bg-[#003a5d] shadow-[0px_2px_6px_rgba(0,0,0,0.1)]",
  hover: "border-[#004a76] bg-[#004a76] shadow-[0px_2px_6px_rgba(0,0,0,0.1)]",
  pressed:
    "border-[#002e4a] bg-[#002e4a] shadow-[inset_0px_2px_6px_rgba(0,0,0,0.1)]",
  focus:
    "border-[#003a5d] bg-[#003a5d] shadow-[0px_0px_0px_2px_white,0px_0px_0px_4px_#002e4a,0px_2px_6px_rgba(0,0,0,0.1)]",
};

export function PrimaryButton({
  size = "large",
  enableHover = true,
  className = "",
  children,
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
}: PrimaryButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activating, setActivating] = useState(false);
  const isLarge = size === "large";
  const isDisabled = Boolean(disabled || loading || activating);

  const interactionState: InteractionState = loading
    ? "loading"
    : pressed
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
      aria-busy={loading}
      data-state={interactionState}
      className={[
        "relative flex w-full items-center justify-center overflow-hidden rounded-[6px] border font-medium text-white outline-none transition-[background-color,border-color,box-shadow] duration-150",
        loading
          ? "cursor-wait border-[#003a5d] bg-[rgba(0,58,93,0.85)] shadow-[0px_2px_6px_rgba(0,0,0,0.1)]"
          : disabled
            ? "cursor-not-allowed border-[#d9e1e7] bg-[#c6d1d9] text-white/80 shadow-[0px_2px_6px_rgba(0,0,0,0.1)]"
            : stateClasses[interactionState === "loading" ? "default" : interactionState],
        isLarge ? "h-12 px-5 text-base" : "h-11 px-5 text-sm",
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
        setPressed(false);
        onMouseLeave?.(event);
      }}
      onMouseDown={(event) => {
        if (!isDisabled) setPressed(true);
        onMouseDown?.(event);
      }}
      onMouseUp={(event) => {
        // Keep pressed through click so the pressed → loading sequence is visible
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
        if (!loading) setPressed(false);
        onBlur?.(event);
      }}
      onKeyDown={(event) => {
        if ((event.key === " " || event.key === "Enter") && !isDisabled) {
          setPressed(true);
        }
        onKeyDown?.(event);
      }}
      onKeyUp={(event) => {
        // Keep pressed through click / activation
        onKeyUp?.(event);
      }}
      onClick={async (event) => {
        if (isDisabled) return;
        onClick?.(event);
        if (event.defaultPrevented) {
          setPressed(false);
          return;
        }
        setActivating(true);
        setPressed(true);
        setHovered(false);
        // Hold pressed so it reads before loading
        await new Promise((resolve) => setTimeout(resolve, 180));
        setPressed(false);
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
        setActivating(false);
      }}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
