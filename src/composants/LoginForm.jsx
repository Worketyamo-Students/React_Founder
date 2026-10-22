import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router"
import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { ClipLoader } from "react-spinners"
import { toast } from "@/components/ui/toast"
import { GoogleLogin } from "@react-oauth/google"



export function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]= useState('')

  
  
  const handleEmail = (e)=>{
    setEmail(e.target.value)
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }
  const dataPost = {email, password}




  

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', dataPost)
      console.log(res.data)
      const roleUser = res.data.user.role
      localStorage.setItem('Token', res.data.token)
      localStorage.setItem('Refresh', res.data.refreshToken)

      toast.add({
        type: 'success',
        title: 'Connexion reussie',
        description: "Vous allez etre redirige vers la page d'acceuil"
      })
      setTimeout(()=>{
        roleUser === 'ADMIN' ? navigate('/dashboard') : navigate('/home')
      }, 2000)
      
    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data.message)

      toast.add({
        type: 'error',
        title: "Erreur lors de la connexion",
        description: error.response.data.message
      })
        
    }
  }

  const handleGoogleLogin = async(credentialResponse)=>{
    try {
      const idToken = credentialResponse.credential
      const res = await axios.post('http://localhost:5000/api/auth/google-login', {idToken})
      console.log(res);

      const roleUser = res.data.user.role
      localStorage.setItem('Token', res.data.token)
      localStorage.setItem('Refresh', res.data.refreshToken)

      toast.add({
        type: 'success',
        title: 'Connexion reussie',
        description: "Vous allez etre redirige vers la page d'acceuil"
      })
      setTimeout(()=>{
        roleUser === 'ADMIN' ? navigate('/dashboard') : navigate('/home')
      }, 2000)
      
      

    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data.message)

      toast.add({
        type: 'error',
        title: "Erreur de connexio google",
        description: error.response.data.message || 'Impossible de valider votre compte google'
      })
    }
  }

 


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link to={'/signup'}><Button variant="link">Sign Up</Button></Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={handleEmail}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input 
              value={password}
              onChange={handlePassword}
              id="password" 
              type="password" required />
            </div>
          </div>
           <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
             login
            </Button>
            <GoogleLogin onSuccess={handleGoogleLogin} onError={()=>{
              toast.add({type: 'error', title: 'Erreur google', description: 'Connexion google a echoue'})
            }} useOneTap></GoogleLogin>
           
            
          </CardFooter>
        </form>
      </CardContent>
     
    </Card>
  )
}
