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

export function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmail = (e)=>{
    setEmail(e.target.value)
    
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }

  const dataPost = {email, password}

  const handleSubmit = async(e)=>{
      e.preventDefault()
      setLoading(true)
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', dataPost)
        console.log(res)
        const accessToken = res.data.token
        if (accessToken) {
          localStorage.setItem('Token', accessToken)
        }

        setTimeout(()=>{
          navigate('/home')
        }, 2000)
        
      } catch (error) {
        console.error(error.response)
        setError(error.response.data.message)
      }finally{
        setLoading(false)
        setEmail('')
        setPassword('')
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
              {
                loading ? (
                  <>
                          <ClipLoader size={15} color="white"/>
                            Connexion en cours...
                  </>
                ):('Login')
              }
            </Button>
            <Button variant="outline" className="w-full">
                Login with Google
            </Button>
            {
              <p className="text-red-500">{error}</p>
            }
          </CardFooter>
        </form>
      </CardContent>
     
    </Card>
  )
}
