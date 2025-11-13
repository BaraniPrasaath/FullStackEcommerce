import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn({ onAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({ email: "" }); // ✅ added
  const navigate = useNavigate();

  // ✅ Email validation logic (same as SignUp)
  const validateEmail = (value) => {
    let msg = "";
    if (/[A-Z]/.test(value)) msg = "Email should be in lowercase.";
    else if (!value.includes("@")) msg = "Email must contain '@' symbol.";
    else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value))
      msg = "Enter a valid email (e.g., user@gmail.com).";

    setValidationErrors({ email: msg });
    return msg === "";
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") validateEmail(value);
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isEmailValid = validateEmail(form.email);
    if (!isEmailValid) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      // ✅ Save tokens & user info
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authUser", JSON.stringify(data.user));

      onAuth(data.user);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h3 className="mb-4 text-center">Sign In</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* ✅ Email input with validation */}
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

        {/* Password input with eye icon */}
        <div className="input-group mb-3 mt-2">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
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

        {/* Submit button */}
        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

















// import React, { useState } from "react";
// import { postJSON } from "../api";
// import { useNavigate } from "react-router-dom";

// export default function SignIn({ onAuth }) {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState(""); // ✅ email validation message
//   const navigate = useNavigate();

//   // ✅ Email validation logic
//   const validateEmail = (value) => {
//     let msg = "";
//     if (/[A-Z]/.test(value)) msg = "Email should be in lowercase.";
//     else if (!value.includes("@")) msg = "Email must contain '@' symbol.";
//     else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value))
//       msg = "Enter a valid email (e.g., user@gmail.com).";
//     setEmailError(msg);
//     return msg === "";
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//     if (name === "email") validateEmail(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     // ✅ Validate email before submit
//     const isEmailValid = validateEmail(form.email);
//     if (!isEmailValid) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     setLoading(true);
//     const { ok, status, data } = await postJSON("/api/login/", form);
//     setLoading(false);

//     if (ok) {
//       const userData = {
//         email: data?.email || form.email,
//         first_name: data?.first_name || "",
//         last_name: data?.last_name || "",
//       };

//       if (data.access_token)
//         localStorage.setItem("access_token", data.access_token);
//       if (data.refresh_token)
//         localStorage.setItem("refresh_token", data.refresh_token);

//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("authUser", JSON.stringify(userData));

//       if (onAuth) onAuth(userData);
//       navigate("/");
//     } else {
//       setError(data?.error || `Login failed (${status})`);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: 420 }}>
//       <h3 className="mb-4 text-center">Sign In</h3>

//       {error && <div className="alert alert-danger">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         {/* ✅ Email field with validation */}
//         <input
//           name="email"
//           type="email"
//           className={`form-control mb-1 ${
//             emailError ? "is-invalid" : form.email ? "is-valid" : ""
//           }`}
//           placeholder="Email Address"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         {emailError && <div className="invalid-feedback">{emailError}</div>}

//         <div className="input-group mb-4 mt-2">
//           <input
//             name="password"
//             type={showPassword ? "text" : "password"}
//             className="form-control"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="button"
//             className="btn btn-outline-secondary"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
//           </button>
//         </div>

//         <button
//           className="btn btn-success w-100"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? "Signing in..." : "Sign In"}
//         </button>
//       </form>
//     </div>
//   );
// }




