"use client";

import { AnchorHTMLAttributes, useState } from "react";

type TextLinkTone = "navy" | "footer" | "muted";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tone?: TextLinkTone;
  enableHover?: boolean;
};

const toneClasses: Record<
  TextLinkTone,
  { base: string; hover: string; pressed: string }
> = {
  navy: {
    base: "text-roam-navy",
    hover: "text-[#002e4a]",
    pressed: "text-[#002e4a]",
  },
  footer: {
    base: "text-roam-muted",
    hover: "text-[#3f4b57]",
    pressed: "text-[#2f3943]",
  },
  muted: {
    base: "text-roam-muted",
    hover: "text-[#3f3f46]",
    pressed: "text-[#3f3f46]",
  },
};

export function TextLink({
  tone = "navy",
  enableHover = true,
  className = "",
  children,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onBlur,
  onClick,
  ...props
}: TextLinkProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const tones = toneClasses[tone];
  const showStroke = pressed || (enableHover && hovered);

  return (
    <a
      {...props}
      data-state={pressed ? "pressed" : hovered ? "hover" : "default"}
      className={[
        "inline-flex items-center transition-colors duration-150",
        tones.base,
        pressed ? tones.pressed : enableHover && hovered ? tones.hover : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={(event) => {
        if (enableHover) setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        setPressed(false);
        onMouseLeave?.(event);
      }}
      onMouseDown={(event) => {
        setPressed(true);
        onMouseDown?.(event);
      }}
      onMouseUp={(event) => {
        setPressed(false);
        onMouseUp?.(event);
      }}
      onBlur={(event) => {
        setPressed(false);
        setHovered(false);
        onBlur?.(event);
      }}
      onClick={async (event) => {
        setPressed(true);
        onClick?.(event);
        await new Promise((resolve) => setTimeout(resolve, 120));
        setPressed(false);
      }}
    >
      <span
        className={[
          "leading-normal decoration-solid decoration-[10%] [text-underline-position:from-font]",
          showStroke ? "underline" : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </span>
    </a>
  );
}
