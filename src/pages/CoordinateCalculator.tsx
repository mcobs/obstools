import { useState } from 'react'
import { ArrowRight, ArrowLeft, Globe, Flame } from 'lucide-react'

interface Coordinates {
  x: string
  y: string
  z: string
}

export default function CoordinateCalculator() {
  const [overworldCoords, setOverworldCoords] = useState<Coordinates>({ x: '', y: '', z: '' })
  const [netherCoords, setNetherCoords] = useState<Coordinates>({ x: '', y: '', z: '' })

  // 主世界 → 下界
  const calculateToNether = () => {
    const x = parseFloat(overworldCoords.x) || 0
    const y = parseFloat(overworldCoords.y) || 0
    const z = parseFloat(overworldCoords.z) || 0

    setNetherCoords({
      x: (x / 8).toFixed(1),
      y: y.toFixed(1),
      z: (z / 8).toFixed(1)
    })
  }

  // 下界 → 主世界
  const calculateToOverworld = () => {
    const x = parseFloat(netherCoords.x) || 0
    const y = parseFloat(netherCoords.y) || 0
    const z = parseFloat(netherCoords.z) || 0

    setOverworldCoords({
      x: (x * 8).toFixed(1),
      y: y.toFixed(1),
      z: (z * 8).toFixed(1)
    })
  }

  // 清空所有输入
  const clearAll = () => {
    setOverworldCoords({ x: '', y: '', z: '' })
    setNetherCoords({ x: '', y: '', z: '' })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 标题 */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-shadow">
          坐标计算器
        </h1>
        <p className="text-xl text-gray-600">
          主世界与下界坐标转换（1:8 比例）
        </p>
      </div>

      {/* 主要内容 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 主世界坐标 */}
        <div className="card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">主世界</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                X 坐标
              </label>
              <input
                type="number"
                value={overworldCoords.x}
                onChange={(e) => setOverworldCoords({ ...overworldCoords, x: e.target.value })}
                className="input-field"
                placeholder="输入 X 坐标..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Y 坐标（高度）<span className="text-gray-400 font-normal ml-1">- 可选</span>
              </label>
              <input
                type="number"
                value={overworldCoords.y}
                onChange={(e) => setOverworldCoords({ ...overworldCoords, y: e.target.value })}
                className="input-field"
                placeholder="输入 Y 坐标（可选）..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Z 坐标
              </label>
              <input
                type="number"
                value={overworldCoords.z}
                onChange={(e) => setOverworldCoords({ ...overworldCoords, z: e.target.value })}
                className="input-field"
                placeholder="输入 Z 坐标..."
              />
            </div>

            <button
              onClick={calculateToNether}
              className="w-full btn-primary flex items-center justify-center space-x-2 group"
            >
              <span>转换到下界</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* 下界坐标 */}
        <div className="card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">下界</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                X 坐标
              </label>
              <input
                type="number"
                value={netherCoords.x}
                onChange={(e) => setNetherCoords({ ...netherCoords, x: e.target.value })}
                className="input-field"
                placeholder="输入 X 坐标..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Y 坐标（高度）<span className="text-gray-400 font-normal ml-1">- 可选</span>
              </label>
              <input
                type="number"
                value={netherCoords.y}
                onChange={(e) => setNetherCoords({ ...netherCoords, y: e.target.value })}
                className="input-field"
                placeholder="输入 Y 坐标（可选）..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Z 坐标
              </label>
              <input
                type="number"
                value={netherCoords.z}
                onChange={(e) => setNetherCoords({ ...netherCoords, z: e.target.value })}
                className="input-field"
                placeholder="输入 Z 坐标..."
              />
            </div>

            <button
              onClick={calculateToOverworld}
              className="w-full btn-primary flex items-center justify-center space-x-2 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>转换到主世界</span>
            </button>
          </div>
        </div>
      </div>

      {/* 清空按钮 */}
      <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={clearAll}
          className="btn-outline"
        >
          清空所有坐标
        </button>
      </div>

      {/* 说明信息 */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h3 className="font-medium text-blue-900 mb-3 flex items-center space-x-2">
          <span>📖</span>
          <span>使用说明</span>
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 主世界与下界的坐标比例为 <strong>8:1</strong></li>
          <li>• 在主世界移动 8 格 = 在下界移动 1 格</li>
          <li>• Y 坐标（高度）在转换时保持不变</li>
          <li>• 支持小数坐标，结果保留 1 位小数</li>
          <li>• 输入一侧的坐标，点击转换按钮即可计算另一侧的对应坐标</li>
        </ul>
      </div>
    </div>
  )
}

