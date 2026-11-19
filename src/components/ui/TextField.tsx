"use client";

import { ReactNode, useId, useState } from "react";
import { ClearIcon, EyeIcon, EyeOffIcon } from "@/components/ui/FieldIcons";

type TextFieldSize = "large" | "medium";

type TextFieldProps = {
  label: string;
  name: string;
  type?: "text" | "password";
  size?: TextFieldSize;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  autoComplete?: string;
  leadingIcon: ReactNode;
  error?: string;
  disabled?: boolean;
};

export function TextField({
  label,
  name,
  type = "text",
  size = "large",
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  autoComplete,
  leadingIcon,
  error,
  disabled = false,
}: TextFieldProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const hasValue = value.length > 0;
  const showErrorContent = Boolean(error) && !focused;
  const showClear =
    !isPassword && !disabled && hasValue && focused && !showErrorContent;
  const showEye = isPassword && !disabled && !showErrorContent;
  const isLarge = size === "large";
  const iconSize = isLarge ? 24 : 20;

  const borderClass = disabled
    ? "border-[#e5e7eb] bg-[#e5e7eb]"
    : error
      ? "border-[#dc2626] bg-white"
      : focused
        ? "border-roam-navy bg-white"
        : hasValue
          ? "border-[#ccc] bg-white"
          : "border-roam-border bg-white";

  const textClass = disabled
    ? "text-[#b0b7c3]"
    : showErrorContent
      ? "text-[#dc2626]"
      : hasValue
        ? "text-[#101828]"
        : "text-roam-placeholder";

  const iconClass = disabled
    ? "text-[#b0b7c3]"
    : error
      ? "text-[#dc2626]"
      : "text-[#6b758b]";

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={id}
        className="text-base font-medium leading-5 text-roam-navy"
      >
        {label}
      </label>

      <div
        className={`flex items-center gap-2 rounded border px-4 transition-colors ${borderClass} ${
          isLarge ? "h-[52px]" : "h-11"
        }`}
      >
        <span className={`flex shrink-0 items-center ${iconClass}`}>
          {leadingIcon}
        </span>

        <input
          id={id}
          name={name}
          type={isPassword && !passwordVisible ? "password" : "text"}
          autoComplete={autoComplete}
          disabled={disabled}
          value={showErrorContent ? error : value}
          placeholder={placeholder}
          readOnly={showErrorContent}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          className={`w-full min-w-0 flex-1 border-0 bg-transparent text-base outline-none placeholder:text-roam-placeholder disabled:cursor-not-allowed ${textClass}`}
          aria-invalid={Boolean(error)}
        />

        {showEye ? (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setPasswordVisible((current) => !current)}
            className="shrink-0 text-[#6b758b] transition-opacity hover:opacity-80"
            aria-label={passwordVisible ? "Hide password" : "Show password"}
          >
            {passwordVisible ? (
              <EyeOffIcon size={iconSize} />
            ) : (
              <EyeIcon size={iconSize} />
            )}
          </button>
        ) : null}

        {showClear ? (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onChange("")}
            className="shrink-0 text-[#6b758b] transition-opacity hover:opacity-80"
            aria-label={`Clear ${label}`}
          >
            <ClearIcon size={iconSize} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
