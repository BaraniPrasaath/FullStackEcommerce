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

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

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

        <input
          name="email"
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="input-group mb-3">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="form-control"
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

        <div className="input-group mb-4">
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












// import React, { useState } from "react";
// import { postJSON } from "../api";
// import { useNavigate } from "react-router-dom";

// export default function SignUp() {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const { ok, status, data } = await postJSON("/api/register/", form);
//     setLoading(false);

//     if (ok) {
//       // success — optionally show message then redirect to sign-in
//       navigate("/signin");
//     } else {
//       // show server errors (could be validation errors)
//       if (typeof data === "object") setError(JSON.stringify(data));
//       else setError(data || `Error ${status}`);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: 500 }}>
//       <h3 className="mb-4">Sign Up</h3>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <input name="username" className="form-control mb-2" placeholder="Username" value={form.username} onChange={handleChange} required />
//         <input name="email" type="email" className="form-control mb-2" placeholder="Email" value={form.email} onChange={handleChange} required />
//         <input name="password" type="password" className="form-control mb-3" placeholder="Password" value={form.password} onChange={handleChange} required />
//         <button className="btn btn-primary w-100" type="submit" disabled={loading}>
//           {loading ? "Creating..." : "Create Account"}
//         </button>
//       </form>
//     </div>
//   );
// }






















// import React, { useState } from "react";

// function SignUp() {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", form);
//     // Later: send to Django backend via API
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "400px" }}>
//       <h3 className="text-center mb-4">Sign Up</h3>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="firstName"
//           placeholder="First Name"
//           className="form-control mb-2"
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="lastName"
//           placeholder="Last Name"
//           className="form-control mb-2"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="form-control mb-2"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="form-control mb-2"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           className="form-control mb-3"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" className="btn btn-primary w-100">
//           Create Account
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignUp;
