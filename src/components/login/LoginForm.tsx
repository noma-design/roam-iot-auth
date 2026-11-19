"use client";

import { FormEvent, useState } from "react";
import { LockIcon, UserIcon } from "@/components/ui/FieldIcons";
import { GoogleButton } from "@/components/ui/GoogleButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import { TextLink } from "@/components/ui/TextLink";

type LoginFormProps = {
  variant: "desktop" | "tablet" | "mobile";
};

export function LoginForm({ variant }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const isCompact = variant !== "desktop";
  const controlSize = isCompact ? "medium" : "large";
  const iconSize = isCompact ? 20 : 24;
  const enableHover = variant === "desktop";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isCompact
          ? "flex w-full flex-col items-center"
          : "flex w-full max-w-[408px] flex-col items-center"
      }
    >
      <div
        className={`flex w-full flex-col ${
          variant === "desktop" ? "gap-6" : "gap-4"
        }`}
      >
        <TextField
          label="Username"
          name="username"
          size={controlSize}
          value={username}
          onChange={(value) => {
            setUsername(value);
            if (usernameError) setUsernameError("");
          }}
          placeholder="KHW@DELPHI_RO"
          autoComplete="username"
          leadingIcon={<UserIcon size={iconSize} />}
          error={usernameError}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          size={controlSize}
          value={password}
          onChange={setPassword}
          onFocus={() => {
            if (!username.trim()) {
              setUsernameError("Username is required");
            }
          }}
          placeholder={
            isCompact ? "Enter your password" : "Enter a password"
          }
          autoComplete="current-password"
          leadingIcon={<LockIcon size={iconSize} />}
        />
      </div>

      {/* Password → remember me: compact 8px, desktop 16px */}
      <div
        className={`flex w-full items-center justify-between ${
          isCompact ? "mt-2" : "mt-4"
        }`}
      >
        <label className="flex cursor-pointer items-center gap-1 px-1">
          <span className="relative flex size-4 shrink-0 items-center justify-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
              aria-label="Remember me"
            />
            {rememberMe ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/assets/icon-checkmark.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#002e4a]"
              />
            ) : (
              <span className="size-4 rounded border border-roam-border bg-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#002e4a]" />
            )}
          </span>
          <span className="pl-1 text-[14px] leading-normal text-[#5f6b76]">
            Remember me
          </span>
        </label>

        <TextLink
          href="#forgot-password"
          tone="navy"
          enableHover={enableHover}
          className={`text-sm leading-normal ${
            isCompact ? "p-2" : "px-2 py-1"
          }`}
        >
          Forgot Password
        </TextLink>
      </div>

      <PrimaryButton
        type="submit"
        size={controlSize}
        enableHover={enableHover}
        className={`w-full ${isCompact ? "mt-4" : "mt-6"}`}
        onClick={(event) => {
          if (!username.trim()) {
            event.preventDefault();
            setUsernameError("Username is required");
          }
        }}
      >
        Log in
      </PrimaryButton>

      <div
        className={`flex w-full items-center gap-4 ${isCompact ? "mt-4" : "mt-6"}`}
      >
        <div className="h-px flex-1 bg-roam-border" />
        <span className="text-sm font-medium text-roam-ink">or</span>
        <div className="h-px flex-1 bg-roam-border" />
      </div>

      <GoogleButton
        size={controlSize}
        enableHover={enableHover}
        className={`w-full ${isCompact ? "mt-4" : "mt-6"}`}
      />
    </form>
  );
}
