import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  duration?: number
  onClose: () => void
}

export default function Toast({ message, type, duration = 5000, onClose }: ToastProps) {
  const [progress, setProgress] = useState(100)
  const [isClosing, setIsClosing] = useState(false)
  const [isEntering, setIsEntering] = useState(true)

  // 弹出动画
  useEffect(() => {
    // 小延迟后触发进入动画
    const enterTimer = setTimeout(() => {
      setIsEntering(false)
    }, 50)

    return () => clearTimeout(enterTimer)
  }, [])

  // 倒计时
  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
      setProgress(remaining)

      if (remaining <= 0) {
        clearInterval(interval)
        handleClose()
      }
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [duration])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300) // 等待动画完成
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
    }
  }

  const getProgressColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'info':
        return 'bg-blue-500'
    }
  }

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 
        min-w-[320px] max-w-md
        transform transition-all
        ${
          isEntering 
            ? 'translate-x-[400px] scale-75 opacity-0' 
            : isClosing 
              ? 'translate-x-[400px] scale-90 opacity-0 duration-300 ease-in' 
              : 'translate-x-0 scale-100 opacity-100 duration-700'
        }
      `}
      style={{
        transitionTimingFunction: isEntering 
          ? 'ease-out' 
          : isClosing 
            ? 'ease-in'
            : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <div className={`
        ${getColorClasses()}
        border rounded-lg shadow-lg
        p-4 pr-12
        backdrop-blur-sm
        relative overflow-hidden
      `}>
        {/* 图标和消息 */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          <div className="flex-1 text-sm text-gray-800 whitespace-pre-line leading-relaxed">
            {message}
          </div>
        </div>

        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="关闭"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 进度条 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className={`h-full transition-all duration-75 ease-linear ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

