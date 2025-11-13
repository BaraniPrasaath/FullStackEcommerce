import React, { useState } from "react";
import { postJSON } from "../api";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  // ✅ New state for inline validation errors
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation for email and password
    if (name === "email") validateEmail(value);
    if (name === "password") validatePassword(value);
  };

  // ✅ Email validation logic
  const validateEmail = (value) => {
    let msg = "";
    if (/[A-Z]/.test(value)) msg = "Email should be in lowercase.";
    else if (!value.includes("@")) msg = "Email must contain '@' symbol.";
    else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value))
      msg = "Enter a valid email (e.g., user@gmail.com).";

    setValidationErrors((prev) => ({ ...prev, email: msg }));
    return msg === "";
  };

  // ✅ Password validation logic
  const validatePassword = (value) => {
    let msg = "";
    if (value.length < 8 || value.length > 15)
      msg = "Password must be 8–15 characters.";
    else if (!/[A-Z]/.test(value))
      msg = "Must include at least one uppercase letter.";
    else if (!/[a-z]/.test(value))
      msg = "Must include at least one lowercase letter.";
    else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value))
      msg = "Must include at least one special character.";
    else if (!/[0-9]/.test(value)) msg = "Must include at least one digit.";

    setValidationErrors((prev) => ({ ...prev, password: msg }));
    return msg === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Run validations before sending data
    const isEmailValid = validateEmail(form.email);
    const isPasswordValid = validatePassword(form.password);

    if (!isEmailValid || !isPasswordValid) {
      setError("Please correct the highlighted errors before submitting.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    const { ok, status, data } = await postJSON("/api/register/", form);
    setLoading(false);

    if (ok) {
      navigate("/signin");
    } else {
      const message =
        typeof data === "object"
          ? Object.values(data).flat().join(" ")
          : data || `Error ${status}`;
      setError(message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h3 className="mb-4 text-center">Create Account</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input
              name="first_name"
              className="form-control mb-3"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              name="last_name"
              className="form-control mb-3"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ✅ Email Field with validation */}
        <input
          name="email"
          type="email"
          className={`form-control mb-1 ${
            validationErrors.email ? "is-invalid" : form.email ? "is-valid" : ""
          }`}
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        {validationErrors.email && (
          <div className="invalid-feedback">{validationErrors.email}</div>
        )}

        {/* ✅ Password Field with validation */}
        <div className="input-group mb-1">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className={`form-control ${
              validationErrors.password
                ? "is-invalid"
                : form.password
                ? "is-valid"
                : ""
            }`}
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>
        {validationErrors.password && (
          <div className="invalid-feedback d-block">
            {validationErrors.password}
          </div>
        )}

        {/* Confirm password */}
        <div className="input-group mb-4 mt-2">
          <input
            name="confirm_password"
            type={showConfirm ? "text" : "password"}
            className="form-control"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>

        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}



