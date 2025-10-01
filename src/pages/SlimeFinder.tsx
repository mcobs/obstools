import { useState, useRef, useEffect } from 'react'
import { useSlimeChunks } from '../hooks/useSlimeChunks'
import { type MinecraftVersion } from '../utils/slimeChunk'
import SlimeMap from '../components/SlimeMap'
import { Share2, RotateCcw, Upload } from 'lucide-react'
import { parseLevelDat, validateLevelDatFile } from '../utils/nbtParser'
import { toast } from '../components/ToastContainer'

export default function SlimeFinder() {
  const [seed, setSeed] = useState('3334823393436897159')
  const [version, setVersion] = useState<MinecraftVersion>('java')
  const [centerX, setCenterX] = useState(0)
  const [centerZ, setCenterZ] = useState(0)
  const [radius, setRadius] = useState(25)
  const [zoom, setZoom] = useState(3.0)
  const [isLoadingFile, setIsLoadingFile] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 从 URL 参数加载初始值
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    
    const urlSeed = params.get('seed')
    if (urlSeed) {
      setSeed(urlSeed)
    }
    
    const urlVersion = params.get('version')
    if (urlVersion === 'java' || urlVersion === 'bedrock') {
      setVersion(urlVersion)
    }
    
    const urlX = params.get('x')
    if (urlX) {
      const x = parseInt(urlX)
      if (!isNaN(x)) {
        setCenterX(x)
      }
    }
    
    const urlZ = params.get('z')
    if (urlZ) {
      const z = parseInt(urlZ)
      if (!isNaN(z)) {
        setCenterZ(z)
      }
    }
  }, [])

  const { slimeChunks, isLoading } = useSlimeChunks({
    seed,
    version,
    centerX,
    centerZ,
    radius
  })

  const handleCenterChange = (x: number, z: number) => {
    setCenterX(x)
    setCenterZ(z)
  }

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom)
  }

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000000000000000000).toString()
    setSeed(randomSeed)
  }

  const handleLoadFromSave = () => {
    // 触发文件选择
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 验证文件
    if (!validateLevelDatFile(file)) {
      toast.error('请选择有效的 level.dat 文件！')
      return
    }

    setIsLoadingFile(true)

    try {
      // 解析 level.dat 文件
      const levelData = await parseLevelDat(file)
      
      // 设置种子
      setSeed(levelData.seed)
      
      // 如果有出生点坐标，设置中心点
      if (levelData.spawnX !== undefined && levelData.spawnZ !== undefined) {
        setCenterX(levelData.spawnX)
        setCenterZ(levelData.spawnZ)
      }
      
      // 显示成功消息
      let message = `成功加载存档！\n种子: ${levelData.seed}`
      if (levelData.levelName) {
        message += `\n存档名称: ${levelData.levelName}`
      }
      if (levelData.version) {
        message += `\n版本: ${levelData.version}`
      }
      if (levelData.spawnX !== undefined) {
        message += `\n出生点: X=${levelData.spawnX}, Y=${levelData.spawnY}, Z=${levelData.spawnZ}`
      }
      
      toast.success(message, 7000)
    } catch (error) {
      console.error('加载存档失败:', error)
      toast.error(`加载失败: ${error instanceof Error ? error.message : '未知错误'}`)
    } finally {
      setIsLoadingFile(false)
      // 清空文件选择，允许重复选择同一文件
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const slimeChunkCount = slimeChunks.filter(chunk => chunk.isSlimeChunk).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-shadow">史莱姆区块查找器</h1>
        <p className="text-gray-600">
          输入世界种子，查找史莱姆区块的位置。史莱姆区块是史莱姆自然生成的特殊区块。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 控制面板 */}
        <div className="lg:col-span-1">
          <div className="card space-y-6 animate-slide-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                世界种子
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  className="flex-1 input-field"
                  placeholder="输入种子..."
                />
                <button
                  onClick={handleRandomSeed}
                  className="btn-secondary"
                  title="随机生成种子"
                  aria-label="随机生成种子"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                游戏版本
              </label>
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value as MinecraftVersion)}
                className="w-full input-field"
                aria-label="选择游戏版本"
              >
                <option value="java">Java版</option>
                <option value="bedrock">基岩版</option>
              </select>
              {version === 'bedrock' && (
                <p className="mt-2 text-sm text-blue-600 font-medium">
                  ℹ️ 基岩版史莱姆区块位置固定，不随种子变化
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                搜索半径 (区块)
              </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full"
                  aria-label="搜索半径"
                />
              <div className="text-sm text-gray-500 mt-1">{radius} 区块</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  X坐标
                </label>
                <input
                  type="number"
                  value={centerX}
                  onChange={(e) => setCenterX(parseInt(e.target.value) || 0)}
                  className="w-full input-field"
                  aria-label="X坐标"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Z坐标
                </label>
                <input
                  type="number"
                  value={centerZ}
                  onChange={(e) => setCenterZ(parseInt(e.target.value) || 0)}
                  className="w-full input-field"
                  aria-label="Z坐标"
                />
              </div>
            </div>

            <div className="space-y-2">
              {version === 'java' && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".dat"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="选择 level.dat 文件"
                  />
                  <button
                    onClick={handleLoadFromSave}
                    disabled={isLoadingFile}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingFile ? (
                      <>
                        <div className="loading-spinner h-4 w-4"></div>
                        <span>加载中...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>从存档加载</span>
                      </>
                    )}
                  </button>
                </>
              )}
              
              <button
                onClick={() => {
                  const url = `${window.location.origin}/slime-finder?seed=${seed}&version=${version}&x=${centerX}&z=${centerZ}`
                  navigator.clipboard.writeText(url)
                  toast.success('链接已复制到剪贴板！')
                }}
                className="w-full btn-outline flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>分享链接</span>
              </button>
            </div>

            {/* 统计信息 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">统计信息</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>搜索区块: {(radius * 2 + 1) ** 2}</div>
                <div>史莱姆区块: {slimeChunkCount}</div>
                <div>生成概率: {((slimeChunkCount / ((radius * 2 + 1) ** 2)) * 100).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 地图区域 */}
        <div className="lg:col-span-3">
          <div className="card animate-fade-in">
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="loading-spinner h-12 w-12"></div>
              </div>
            ) : (
              <SlimeMap
                slimeChunks={slimeChunks}
                centerX={centerX}
                centerZ={centerZ}
                onCenterChange={handleCenterChange}
                zoom={zoom}
                onZoomChange={handleZoomChange}
              />
            )}
          </div>

          {/* 使用说明 */}
          <div className="mt-6 bg-blue-50 rounded-lg p-6 animate-fade-in">
            <h3 className="font-medium text-blue-900 mb-3">使用说明</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• 绿色区域表示史莱姆区块，史莱姆会在这里自然生成</li>
              <li>• 史莱姆只在Y=39以下的史莱姆区块中生成</li>
              <li>• 史莱姆不会在和平模式下生成</li>
              <li>• 史莱姆不会在蘑菇岛生物群系中生成</li>
              <li>• 使用鼠标拖拽移动地图，滚轮缩放</li>
              <li>• 红色圆点表示当前位置</li>
              <li>• 点击"从存档加载"可以直接上传 level.dat 文件自动获取种子和出生点</li>
              <li>• level.dat 文件位置：存档文件夹/.minecraft/saves/[世界名称]/level.dat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
