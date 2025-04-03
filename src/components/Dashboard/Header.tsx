import { History, Settings, Share, Zap } from 'lucide-react'
import React from 'react'
import { Badge } from '../ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { UserMenu } from '../custom/user-menu'

const Header = ({setIsShareOpen}) => {
  return (
    <header className="bg-[#191919] text-white p-3 flex justify-between items-center shadow-md">
    <h1 className="text-2xl font-bold flex items-center">
      <Zap className="mr-2 h-5 w-5 text-yellow-300" />
      <span className="text-purple-300">Circuit</span>
      <span className="text-white">Builder</span>
      <span className="text-purple-300">AI</span>
    </h1>
    <div className="flex items-center space-x-2">
      <h2 className="text-xl font-medium">Ten LED Circuit</h2>
      <Badge
        variant="outline"
        className="ml-2 bg-purple-800/50 text-purple-100 border-purple-700"
      >
        Draft
      </Badge>
    </div>

    <div className="flex items-center gap-3">
      <Button
        variant="secondary"
        className="bg-white text-purple-900 hover:bg-purple-100"
        onClick={() => setIsShareOpen(true)}
      >
        <Share className="mr-2 h-4 w-4" />
        Share
      </Button>

      <UserMenu />
    </div>
  </header>
  )
}

export default Header