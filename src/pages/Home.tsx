import { Link } from 'react-router-dom'
import { Map, Calculator, Compass, Settings } from 'lucide-react'

export default function Home() {
  const tools = [
    {
      title: '史莱姆区块查找器',
      description: '查找世界中的史莱姆区块，支持Java版和基岩版',
      icon: Map,
      path: '/slime-finder',
      color: 'bg-green-500'
    },
    {
      title: '坐标计算器',
      description: '计算两点之间的距离和角度',
      icon: Calculator,
      path: '/coordinate-calculator',
      color: 'bg-blue-500'
    },
    {
      title: '生物群系查找器',
      description: '查找特定生物群系的位置',
      icon: Compass,
      path: '/biome-finder',
      color: 'bg-yellow-500'
    },
    {
      title: '更多工具',
      description: '更多实用工具即将推出',
      icon: Settings,
      path: '/more-tools',
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 欢迎区域 */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-shadow">
          黑曜石工具箱
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          为我的世界玩家提供各种实用工具，包括史莱姆区块查找、坐标计算、生物群系查找等功能
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <span>由</span>
          <a 
            href="https://mcobs.cn" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-minecraft-green hover:text-green-600 font-semibold hover:underline transition-colors duration-200"
          >
            黑曜石论坛
          </a>
          <span>提供支持</span>
        </div>
      </div>

      {/* 工具网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon
          return (
            <Link
              key={index}
              to={tool.path}
              className="group card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${tool.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-minecraft-green transition-colors duration-200">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {tool.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* 特色功能 */}
      <div className="mt-16 card animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center text-shadow">
          特色功能
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-12 h-12 bg-minecraft-green rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Map className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-minecraft-green transition-colors duration-200">精确算法</h3>
            <p className="text-gray-600">使用与游戏相同的算法，确保结果的准确性</p>
          </div>
          <div className="text-center group">
            <div className="w-12 h-12 bg-minecraft-green rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-minecraft-green transition-colors duration-200">多版本支持</h3>
            <p className="text-gray-600">支持Java版和基岩版的不同算法</p>
          </div>
          <div className="text-center group">
            <div className="w-12 h-12 bg-minecraft-green rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-minecraft-green transition-colors duration-200">交互式地图</h3>
            <p className="text-gray-600">直观的地图界面，支持拖拽和缩放</p>
          </div>
        </div>
      </div>
    </div>
  )
}
