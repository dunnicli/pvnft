import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default Home;

function Home() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    dob: Yup.string()
      .required("Date of Birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    return false;
  }

  return (
    <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
      <div className="sm:w-1/2 md:1/2 w-full flex-shrink flex-grow-0 p-10">
        <h1>Hook Form Validation Example</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label>Title</label>&nbsp;
              <select
                name="title"
                {...register("title")}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
              >
                <option value=""></option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
              </select>
              <div className="invalid-feedback">{errors.title?.message}</div>
            </div>
            <p>&nbsp;</p>
            <div>
              <label>First Name</label>
              <br />
              <input
                name="firstName"
                type="text"
                {...register("firstName")}
                className={`form-control 
                shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.firstName ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">
                {errors.firstName?.message}
              </div>
            </div>
            <p>&nbsp;</p>
            <div>
              <label>Last Name</label>
              <br />
              <input
                name="lastName"
                type="text"
                {...register("lastName")}
                className={`form-control 
                shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.lastName ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>
          </div>
          <div>
            <div>
              <p>&nbsp;</p>
              <label>Date of Birth</label>
              <br />
              <input
                name="dob"
                type="date"
                {...register("dob")}
                className={`form-control 
                shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.dob ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.dob?.message}</div>
            </div>
            <div>
              <p>&nbsp;</p>
              <label>Email</label>
              <br />
              <input
                name="email"
                type="text"
                {...register("email")}
                className={`form-control 
                shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.email ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
          </div>
          <div>
            <p>&nbsp;</p>
            <div>
              <label>Password</label>
              <br />
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control 
                shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.password ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <p>&nbsp;</p>
            <div>
              <label>Confirm Password</label>
              <br />
              <input
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={`form-control 
                shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.confirmPassword ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            </div>
          </div>
          <p>&nbsp;</p>
          <div>
            <input
              name="acceptTerms"
              type="checkbox"
              {...register("acceptTerms")}
              id="acceptTerms"
              className={`form-check-input ${
                errors.acceptTerms ? "is-invalid" : ""
              }`}
            />
            &nbsp;
            <label htmlFor="acceptTerms">Accept Terms & Conditions</label>
            <div className="invalid-feedback">
              {errors.acceptTerms?.message}
            </div>
          </div>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <div>
            <button type="submit">Register</button> &nbsp; &nbsp;
            <button type="button" onClick={() => reset()}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
