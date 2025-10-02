import { Link } from 'react-router-dom'
import { Map, Calculator, Compass, Settings } from 'lucide-react'

export default function ToolsList() {
  const tools = [
    {
      title: '史莱姆区块查找器',
      description: '查找世界中的史莱姆区块，支持Java版和基岩版',
      icon: Map,
      path: '/slime-finder',
      color: 'bg-green-500',
      status: 'available'
    },
    {
      title: '坐标计算器',
      description: '计算两点之间的距离和角度',
      icon: Calculator,
      path: '/coordinate-calculator',
      color: 'bg-blue-500',
      status: 'coming-soon'
    },
    {
      title: '生物群系查找器',
      description: '查找特定生物群系的位置',
      icon: Compass,
      path: '/biome-finder',
      color: 'bg-yellow-500',
      status: 'coming-soon'
    },
    {
      title: '更多工具',
      description: '更多实用工具即将推出',
      icon: Settings,
      path: '/more-tools',
      color: 'bg-purple-500',
      status: 'coming-soon'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 标题 */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-shadow">
          工具列表
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          选择您需要的工具开始使用
        </p>
      </div>

      {/* 工具网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon
          const isAvailable = tool.status === 'available'
          
          return (
            <Link
              key={index}
              to={isAvailable ? tool.path : '#'}
              className={`
                group card hover:shadow-xl transition-all duration-300 animate-fade-in
                ${isAvailable ? 'hover:-translate-y-1 cursor-pointer' : 'opacity-60 cursor-not-allowed'}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={(e) => !isAvailable && e.preventDefault()}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${tool.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg relative`}>
                  <IconComponent className="w-8 h-8 text-white" />
                  {!isAvailable && (
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
                      即将推出
                    </span>
                  )}
                </div>
                <h3 className={`text-lg font-semibold text-gray-900 mb-2 transition-colors duration-200 ${isAvailable && 'group-hover:text-minecraft-green'}`}>
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

      {/* 底部提示 */}
      <div className="mt-12 text-center text-gray-500 text-sm animate-fade-in">
        <p>更多工具正在开发中，敬请期待...</p>
      </div>
    </div>
  )
}

