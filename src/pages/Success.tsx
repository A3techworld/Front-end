import React, { useState, useEffect } from 'react'
import { CheckCircle, Home, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(20) // 20 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          navigate('/')
          return 0
        }
        return prevTime - 1
      })

      return () => clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  const formatTime = (seconds: number) => {
    return `${seconds}s`
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4" style={{paddingTop: '8rem'}}>
      <div className="w-full max-w-md">
        <Card className="text-center border-border shadow-lg">
          <CardHeader className="pb-6">
            <div className="mx-auto mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Your subscription has been activated successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Clock className="h-4 w-4" />
                <span className="text-lg font-semibold">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleGoHome}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="w-full border-border hover:bg-muted"
              >
                Go to Dashboard
              </Button>
            </div>

            <div className="text-xs text-muted-foreground pt-4 border-t border-border">
              <p>Transaction ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p className="mt-1">Email confirmation sent to your registered address</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Success
