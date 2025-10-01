import { create } from 'zustand'
import Toast, { ToastType } from './Toast'

interface ToastItem {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastStore {
  toasts: ToastItem[]
  addToast: (message: string, type: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type, duration) => {
    const id = Date.now().toString() + Math.random().toString(36)
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }]
    }))
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
  }
}))

// 导出便捷函数
export const toast = {
  success: (message: string, duration?: number) => {
    useToastStore.getState().addToast(message, 'success', duration)
  },
  error: (message: string, duration?: number) => {
    useToastStore.getState().addToast(message, 'error', duration)
  },
  info: (message: string, duration?: number) => {
    useToastStore.getState().addToast(message, 'info', duration)
  }
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none">
      <div className="flex flex-col p-4 pointer-events-auto space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="transform transition-all duration-300 ease-out"
          >
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

