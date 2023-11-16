import { Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { loginShema } from "@/helpers/validation";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter() 
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: loginShema,
    onSubmit: async (values) => {
       const response = await  axios.get(`http://localhost:3001/users?username=${values.username}&password=${values.password}&email=${values.email}`)
      if(response.status === 200){
        alert("succcsssssesss")
        localStorage.setItem("user",JSON.stringify(values))
      }

      router.push("/")
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
          helperText={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
          type="password"
        />
     
        <Button color="primary" variant="contained" fullWidth type="submit"> Login </Button>
        <Link href={"/sign-up"}> Hala üye olmadın mı   </Link>
      </form>
    </Container>
  );
}
