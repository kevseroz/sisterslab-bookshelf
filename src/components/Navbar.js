import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useEffect ,useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null)
  
  useEffect(()=>{
    const userStorege =  localStorage.getItem("user")
    setUser(JSON.parse(userStorege))
   },[])
   const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="success"  position="static">
        <Toolbar>
       
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => router.push("/add-book")}
              variant="text"
              sx={{
                color: "white",
              }}
            >
              Add Book
            </Button>
            
          </Typography>
    {
      user ? (
        <Button color="inherit" onClick={handleLogout}> Log out</Button>
      ): (      
        <Button 
        onClick={() => router.push("/login")}
         color="inherit">
        Login</Button> 
      )
    }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

