import { Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import { signShema } from "@/helpers/validation";
import { useRouter } from "next/router";
import axios from "axios";
export default function SignUp() {
  const router = useRouter() 
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
      email: "",
    },
    validationSchema: signShema  ,
    onSubmit: async (values) => {
      try {
        await  axios.post("http://localhost:3001/users",{
         "username": values.username,
         "email": values.email,
         "password": values.password
        })
        alert('User Add');
        router.push('/login');
      } catch (error) {
        alert('Failed user');
        console.error('An error occurred:', error);
      }
  
    },
  });

  return (
    <Container
      sx={{
        width: "600px",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          margin="normal"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          onBlur={formik.handleBlur}
        />
        <TextField
          fullWidth
          id="username"
          name="username"
          label="User Name"
          value={formik.values.username}
          onChange={formik.handleChange}
          margin="normal"
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          onBlur={formik.handleBlur}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          margin="normal"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.title}
          onBlur={formik.handleBlur}
          type="password"
        />
        <TextField
          fullWidth
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Password Confirm"
          value={formik.values.passwordConfirmation}
          type="password"
          onChange={formik.handleChange}
          margin="normal"
          error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
          helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          onBlur={formik.handleBlur}
        />
        <Button color="primary" variant="contained" fullWidth type="submit"> Sign Up </Button>

      </form>
    </Container>
  );
}