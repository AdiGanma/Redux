import { Button, Card, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
import useCreateUser from "../hooks/api/useCreateUser";
import useGetUserByEmail from "../hooks/api/useGetUserByEmail";
YupPassword(Yup);

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(6),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .required("Password is require")
    .min(6)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
});

const RegisterCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { getUserByEmail } = useGetUserByEmail();
  const { creatUser } = useCreateUser();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const user = await getUserByEmail(values.email);

      if (user.length) return alert("email already exist");

      await creatUser(values);

      alert("create user success");
      navigate("/");
    },
  });

  return (
    <Card className="max-w-sm mx-auto mt-20">
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="name"
            name="name"
            placeholder="Your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            color={formik.touched.name && formik.errors.name ? "failure" : null}
            helperText={
              <>
                {formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : null}
              </>
            }
            required
          />
        </div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          name="email"
          placeholder="youremail@flowbite.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color={formik.touched.email && formik.errors.email ? "failure" : null}
          helperText={
            <>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </>
          }
          required
        />
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <div className="relative">
            <TextInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              color={
                formik.touched.password && formik.errors.password
                  ? "failure"
                  : null
              }
              helperText={
                <>
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null}
                </>
              }
              required
            />
            <Button
              size="xs"
              className="absolute right-0 top-1.5"
              color=""
              onClick={() => setShowPassword(!showPassword)}
            >
              Show password
            </Button>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default RegisterCard;
