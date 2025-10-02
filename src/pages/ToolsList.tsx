import { Link } from 'react-router-dom'
import { Map, Calculator, Compass, Settings, MessageSquare, ExternalLink } from 'lucide-react'

interface Tool {
  title: string
  description: string
  icon: any
  path: string
  color: string
  status: 'available' | 'coming-soon'
  isExternal?: boolean
}

interface ToolCategory {
  name: string
  description: string
  tools: Tool[]
}

export default function ToolsList() {
  const categories: ToolCategory[] = [
    {
      name: '生存实用',
      description: '帮助玩家在游戏中更好地探索和生存',
      tools: [
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
          description: '主世界与下界坐标互相转换',
          icon: Calculator,
          path: '/coordinate-calculator',
          color: 'bg-blue-500',
          status: 'available'
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
    },
    {
      name: '服务器实用',
      description: '为服务器管理员提供的专业工具',
      tools: [
        {
          title: 'MOTD生成器',
          description: '用于服务器MOTD生成以及AMOTD插件联动',
          icon: MessageSquare,
          path: 'https://motd.mcobs.cn/',
          color: 'bg-indigo-500',
          status: 'available',
          isExternal: true
        }
      ]
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

      {/* 分类工具 */}
      <div className="space-y-12">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
            {/* 分类标题 */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>

            {/* 工具网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.tools.map((tool, toolIndex) => {
                const IconComponent = tool.icon
                const isAvailable = tool.status === 'available'
                const isExternal = tool.isExternal
                
                const CardContent = (
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 ${tool.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg relative`}>
                      <IconComponent className="w-8 h-8 text-white" />
                      {!isAvailable && (
                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
                          即将推出
                        </span>
                      )}
                      {isExternal && isAvailable && (
                        <ExternalLink className="absolute -top-1 -right-1 w-4 h-4 text-gray-700 bg-white rounded-full p-0.5" />
                      )}
                    </div>
                    <h3 className={`text-lg font-semibold text-gray-900 mb-2 transition-colors duration-200 ${isAvailable && 'group-hover:text-minecraft-green'}`}>
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {tool.description}
                    </p>
                  </div>
                )

                if (isExternal && isAvailable) {
                  return (
                    <a
                      key={toolIndex}
                      href={tool.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in"
                      style={{ animationDelay: `${(categoryIndex * 0.1) + (toolIndex * 0.05)}s` }}
                    >
                      {CardContent}
                    </a>
                  )
                }
                
                return (
                  <Link
                    key={toolIndex}
                    to={isAvailable ? tool.path : '#'}
                    className={`
                      group card hover:shadow-xl transition-all duration-300 animate-fade-in
                      ${isAvailable ? 'hover:-translate-y-1 cursor-pointer' : 'opacity-60 cursor-not-allowed'}
                    `}
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (toolIndex * 0.05)}s` }}
                    onClick={(e) => !isAvailable && e.preventDefault()}
                  >
                    {CardContent}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 底部提示 */}
      <div className="mt-12 text-center text-gray-500 text-sm animate-fade-in">
        <p>更多工具正在开发中，敬请期待...</p>
      </div>
    </div>
  )
}

