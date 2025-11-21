import React, { useState, useEffect } from 'react'
import { XCircle, Home, Clock, RefreshCw, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

const Error = () => {
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

  const handleRetryPayment = () => {
    navigate('/pricing')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4" style={{paddingTop: '8rem'}}>
      <div className="w-full max-w-md">
        <Card className="text-center border-border shadow-lg">
          <CardHeader className="pb-6">
            <div className="mx-auto mb-4">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Payment Failed
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              We couldn't process your subscription payment
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
                onClick={handleRetryPayment}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Payment Again
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleGoHome}
                className="w-full border-border hover:bg-muted"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Button>
            </div>

            <div className="text-xs text-muted-foreground pt-4 border-t border-border">
              <p className="mb-2">Need help? Contact our support team:</p>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-3 w-3" />
                <span>support@a3techworld.com</span>
              </div>
              <p className="mt-1">Reference ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Error
