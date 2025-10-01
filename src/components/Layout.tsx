import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Map } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 导航栏 */}
      <nav className="bg-white shadow-lg animate-slide-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
                <div className="w-8 h-8 bg-minecraft-green rounded minecraft-texture"></div>
                <span className="text-xl font-bold text-gray-900 text-shadow">黑曜石工具箱</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/' 
                    ? 'bg-minecraft-green text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-minecraft-green'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>首页</span>
              </Link>
              <Link
                to="/slime-finder"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/slime-finder' 
                    ? 'bg-minecraft-green text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-minecraft-green'
                }`}
              >
                <Map className="w-4 h-4" />
                <span>史莱姆区块查找器</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="flex-1 animate-fade-in">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="bg-white shadow-lg mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © 2025 黑曜石工具箱 - 为我的世界玩家服务
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://mcobs.cn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-minecraft-green hover:text-green-600 text-sm font-medium hover:underline transition-colors duration-200"
              >
                访问黑曜石论坛
              </a>
              <span className="text-gray-400">|</span>
              <a 
                href="https://github.com/mcobs/obstools" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-minecraft-green text-sm hover:underline transition-colors duration-200"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
