import { Url } from "../Url.tsx";

export const createComplain = async (complainForm: any, token: string) => {
  console.log(complainForm);
  const res = await fetch(`${Url}/api/complain`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(complainForm),
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
};
export const adminReply = async (
  reply: string | null,
  token: string | null,
  id: string | null,
) => {
  const res = await fetch(`${Url}/api/admin/reply`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reply, id }),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
};
export const adminComplains = async (token: string | null) => {
  const res = await fetch(`${Url}/api/admin/complain`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
};

export const getComplains = async (token: string) => {
  const res = await fetch(`${Url}/api/complain/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
};
export const complainDelete = async (id: string, token: string) => {
  const response = await fetch(`${Url}/api/complain/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });
  return response.json();
};

export const accessComapanyList = async (token: string) => {
  const response = await fetch(`${Url}/api/company/access`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
