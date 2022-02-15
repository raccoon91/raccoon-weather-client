import { useState } from "react";
import type { ChangeEvent, ChangeEventHandler } from "react";

const defaultTextRegex = /^(?=.*[A-Za-z])[A-Za-z\d]{4,16}$/;
const defaultPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

export const useInput: (
  defaultValue: string,
  options?: { type: string; regex?: string; errorMessage?: string }
) => [string, (e: ChangeEvent<HTMLInputElement>) => void, boolean, string] = (defaultValue, options) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [isValid, setIsValid] = useState(false);
  let regex: RegExp | null = null;
  let message = options?.errorMessage || "유효한 입력 값이 아닙니다.";

  if (options) {
    if (options.regex) {
      regex = new RegExp(options.regex);
    } else if (options.type === "userId") {
      regex = new RegExp(defaultTextRegex);
      message = "4글자 이상 16글자 이하 문자를 포함";
    } else if (options.type === "password") {
      regex = new RegExp(defaultPasswordRegex);
      message = "8글자 이상 16글자 이하 문자,숫자를 포함";
    }
  }

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;

    setValue(value);

    if (regex && !regex.test(value)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return [value, handleChangeValue, isValid, !isValid ? message : ""];
};
