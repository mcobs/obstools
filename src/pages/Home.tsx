import { Link } from 'react-router-dom'
import { Grid3x3, ExternalLink, Map, Settings, Compass } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 主要内容区域 */}
        <div className="text-center animate-fade-in">
          {/* Logo */}
          <img 
            src="/logo.svg" 
            alt="黑曜石工具箱" 
            className="w-48 h-48 mx-auto mb-8 hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
          />
          
          {/* 标题 */}
          <h1 className="text-6xl font-bold text-gray-900 mb-6 text-shadow">
            黑曜石工具箱
          </h1>
          
          {/* 副标题 */}
          <p className="text-2xl text-gray-600 mb-4 font-medium">
            为我的世界玩家打造的专业工具集
          </p>
          
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            提供史莱姆区块查找、坐标计算、生物群系定位等实用功能<br/>
            精确算法 · 多版本支持 · 完全免费
          </p>
          
          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/tools"
              className="group flex items-center space-x-2 px-8 py-4 bg-minecraft-green text-white rounded-lg text-lg font-semibold hover:bg-minecraft-dark-green transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Grid3x3 className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>查看工具</span>
            </Link>
            
            <a
              href="https://mcobs.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-8 py-4 bg-white text-minecraft-green border-2 border-minecraft-green rounded-lg text-lg font-semibold hover:bg-minecraft-green hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>访问黑曜石论坛</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
          
          {/* 特色标签 */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Map className="w-5 h-5 text-minecraft-green" />
              <span>精确算法</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Settings className="w-5 h-5 text-minecraft-green" />
              <span>多版本支持</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Compass className="w-5 h-5 text-minecraft-green" />
              <span>交互式地图</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
