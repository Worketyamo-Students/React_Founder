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
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router"
import {ClipLoader} from 'react-spinners'
import { useNavigate } from "react-router"



export function SignupForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleName = (e)=>{
    setName(e.target.value)
    console.log(e.target.value)
  }
  const handleEmail = (e)=>{
    setEmail(e.target.value)
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }

  const dataPost = {
    name, email, password
  }
  const handleSubmit = async(e)=>{
      e.preventDefault()
      setLoading(true)
      try {
        const res = await axios.post('http://localhost:5000/api/auth/signup', dataPost)
        console.log(res.data)

        setTimeout(()=>{
          navigate('/login')
        }, 2000)
        
      } catch (error) {
        console.error(error.response.data)
        setError(error.response.data.message)
      }finally{
        setLoading(false)
        setName('')
        setEmail('')
        setPassword('')
      }
  }


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Signup to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link to={'/login'}><Button variant="link">Login</Button></Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={handleName}
                type="text"
                placeholder="enter your name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={handleEmail}
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input 
              id="password" 
              value={password}
              onChange={handlePassword}
              type="password" 
              required />
            </div>
          </div>

          <CardFooter className="flex-col gap-2">
                  <Button type="submit" className="w-full hover:cursor-pointer">
                      {
                        loading ? (
                          <>
                            <ClipLoader size={15} color="white"/>
                            Chargement...
                          </>
                        ):('Signup')
                      }
                  </Button>
                  <p className="text-red-500">{error}</p>
                      {/* <Button variant="outline" className="w-full">
                      Login with Google
                      </Button> */}
        </CardFooter>
       
                        


        </form>

        
      </CardContent>
      
       
     
    </Card>
  )
}
