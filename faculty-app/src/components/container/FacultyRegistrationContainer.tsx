import React, { useState, useEffect } from "react";
import { InputField } from "../presentation/InputField";
import { SelectField } from "../presentation/SelectField";
import { PrimaryButton } from "../presentation/PrimaryButton";
import { MultiSelectDropdown } from "../presentation/MultiSelectDropdown";
import type { Department } from "../../model/Department";
import type { Course } from "../../model/Course";
import { fetchDepartments, fetchCourses, registerFaculty } from "../../utils/api";

export default function FacultyRegistrationContainer() {
  const token = localStorage.getItem("accessToken");

  // --- form values ---
  const [fullName, setFullName] = useState("");
  //const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [courseIds, setCourseIds] = useState<number[]>([]);

  // photo
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // --- dynamic dropdown data ---
  const [departments, setDepartments] = useState<Department[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // --- UI state ---
  const [loading, setLoading] = useState(false); // for submit
  const [message, setMessage] = useState<string | null>(null);
  // Auto-hide message after 3 seconds
useEffect(() => {
  if (!message) return;

  const timer = setTimeout(() => {
    setMessage(null);
  }, 3000); // 3 seconds

  return () => clearTimeout(timer);
}, [message]);



  // --- validation errors (field-level) ---
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    photo?: string;
    departmentId?: string;
    courseIds?: string;
  }>({});

  // ---------- load departments & courses ----------
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [d, c] = await Promise.all([
  fetchDepartments(token!),
  fetchCourses(token!)
]);

        if (!mounted) return;
        setDepartments(d);
        setCourses(c);
      } catch (err) {
        setMessage("Failed to load dropdowns");
      } finally {
        setLoadingData(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // ---------- preview for selected image ----------
  useEffect(() => {
    if (!selectedPhoto) {
      setPhotoPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(selectedPhoto);
  }, [selectedPhoto]);

  // ---------- simple validators ----------
  // const validateEmail = (v: string) => {
  //   // simple email regex (ok for UI validation)
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  // };

  const validatePhone = (v: string) => {
    // allow empty OR 10 digits (adjust to your format)
    return v === "" || /^\d{10}$/.test(v);
  };

  // validate single field (used on blur or submit)
  const validateAll = () => {
    const e: typeof errors = {};

    if (!fullName.trim()) e.fullName = "Full name is required.";
   // if (!email.trim()) e.email = "Email is required.";
    //else if (!validateEmail(email.trim())) e.email = "Enter a valid email.";
    if (!validatePhone(phone.trim())) e.phone = "Phone must be 10 digits or left empty.";

    if (!selectedPhoto) e.photo = "Please upload a photo.";
    if (!departmentId) e.departmentId = "Select a department.";
    if (!courseIds || courseIds.length === 0) e.courseIds = "Select at least one course.";

    setErrors(e);
    // return true if no errors
    return Object.keys(e).length === 0;
  };

  // ---------- submit handler ----------
  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setMessage(null);

    if (!validateAll()) {
      setMessage("Please fix the errors and try again.");
      return;
    }

    // prepare payload (photo filename for now)
    const payload = {
      fullName: fullName.trim(),
     // email: email.trim(),
      phone: phone.trim() || undefined,
      photoPath: selectedPhoto?.name || "",
      departmentId: Number(departmentId),
      courseIds,
    };

    setLoading(true);
    try {
      const res = await registerFaculty(payload,token!);
      if (res?.unauthorized) {
  window.location.href = "/unauthorized";
  return;
}
      setMessage(`Registered successfully — ${res.employeeId}`);
      // reset form after success
     
      resetForm();
    } catch (err: any) {
      setMessage(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------- reset form ----------
  const resetForm = () => {
    setFullName("");
    //setEmail("");
    setPhone("");
    setDepartmentId(null);
    setCourseIds([]);
    setSelectedPhoto(null);
    setPhotoPreview(null);
    setErrors({});
    //setMessage(null);
  };

  // ---------- UI guard while loading dropdowns ----------
  if (loadingData) {
    return <div className="card">Loading data...</div>;
  }

  // ---------- helper: prepare options ----------
  const deptOptions = departments.map((d) => ({ id: d.id, name: d.name }));
  const courseOptions = courses.map((c) => ({ id: c.id, name: c.courseName }));

  return (
    <div className="card" role="region" aria-label="Faculty registration form">
      <form onSubmit={handleSubmit} noValidate>
        <InputField label="Full Name" value={fullName} onChange={setFullName} />
        {errors.fullName && <div style={{ color: "crimson", marginTop: -12 }}>{errors.fullName}</div>}

        {/* <InputField label="Email" value={email} onChange={setEmail} type="email" />
        {errors.email && <div style={{ color: "crimson", marginTop: -12 }}>{errors.email}</div>} */}

        <InputField label="Phone" value={phone} onChange={setPhone} />
        {errors.phone && <div style={{ color: "crimson", marginTop: -12 }}>{errors.phone}</div>}

        {/* Photo upload */}
        <div className="input-field">
          <label>Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setSelectedPhoto(f);
            }}
          />
          {errors.photo && <div style={{ color: "crimson", marginTop: 6 }}>{errors.photo}</div>}
        </div>
        {photoPreview && <img src={photoPreview} alt="preview" style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />}

        {/* Department */}
        <SelectField label="Department" options={deptOptions} value={departmentId ?? 0} onChange={(v) => setDepartmentId(Number(v))} />
        {errors.departmentId && <div style={{ color: "crimson", marginTop: -12 }}>{errors.departmentId}</div>}

        {/* Courses (custom multi-select) */}
        <MultiSelectDropdown label="Courses" options={courseOptions} selected={courseIds} onChange={setCourseIds} />
        {errors.courseIds && <div style={{ color: "crimson", marginTop: -12 }}>{errors.courseIds}</div>}

        {/* Buttons */}
        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
          <PrimaryButton type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</PrimaryButton>
          <button type="button" onClick={resetForm} style={{ padding: "10px 14px", borderRadius: 6, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>Reset</button>
        </div>

        {message && <div className="message" style={{ marginTop: 12 }}>{message}</div>}
      </form>
    </div>
  );
}
