import { Url } from "../Url";

export const signupUser = async (formData: any) => {
  const res = await fetch(`${Url}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
};

export const loginUser = async (formData: any) => {
  const res = await fetch(`${Url}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
};
