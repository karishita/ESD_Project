import type { Department } from "../model/Department";
import type { Course } from "../model/Course";
import type { Faculty } from "../model/Faculty";

const BASE_URL = "http://localhost:8080";

// ---------------------- HELPERS ----------------------
function buildHeaders(token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// ---------------------- API CALLS ----------------------
export async function fetchDepartments(token?: string): Promise<Department[]> {
  const res = await fetch(`${BASE_URL}/departments`, {
    headers: buildHeaders(token),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch departments");
  }

  return res.json();
}

export async function fetchCourses(token?: string): Promise<Course[]> {
  const res = await fetch(`${BASE_URL}/courses`, {
    headers: buildHeaders(token),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}

export async function registerFaculty(payload: Faculty, token?: string,photo?: File) {

  const formData = new FormData();
  formData.append("data", new Blob([JSON.stringify(payload)], { type: "application/json" }));
  if (photo) {
    formData.append("photo", photo);
  }
  const res = await fetch(`${BASE_URL}/faculty/register`, {
    method: "POST",
     headers: token
      ? { Authorization: `Bearer ${token}` } // ✔ ONLY auth header
      : undefined,
    body: formData,
  });
if (res.status === 403) {
    // backend says NOT_AUTHORIZED
   // window.location.href = "/unauthorized";

    return {unauthorized: true};
  }
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Registration failed");
  }

  return data;
}
