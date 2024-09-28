import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import UserAuthForm from "./userAuthForm"

export default function SignInCard() {
  return (
    <Card className="relative text-center w-1/2 mx-auto"> {/* Adjust the card width and center it */}
      <CardHeader className="relative">
        {/* Cross button at the top right */}
        

        <CardTitle>Sign in</CardTitle>
        <CardDescription>Sign in with Google.</CardDescription>
      </CardHeader>
      <CardContent>
        <UserAuthForm />
      </CardContent>
    </Card>
  )
}
