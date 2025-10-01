import { useRef, useEffect, useState } from 'react'
import { SlimeChunkData } from '../hooks/useSlimeChunks'
import styles from './SlimeMap.module.css'

interface SlimeMapProps {
  slimeChunks: SlimeChunkData[]
  centerX: number
  centerZ: number
  onCenterChange: (x: number, z: number) => void
  zoom: number
  onZoomChange: (zoom: number) => void
}

export default function SlimeMap({ 
  slimeChunks, 
  centerX, 
  centerZ, 
  onCenterChange, 
  zoom, 
  onZoomChange 
}: SlimeMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 })

  // 处理滚轮缩放（使用原生事件监听器以支持 passive: false）
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      // 向上滚轮（deltaY < 0）缩小，向下滚轮（deltaY > 0）放大
      const delta = e.deltaY > 0 ? 1.1 : 0.9
      const newZoom = Math.max(0.1, Math.min(15.0, zoom * delta))
      onZoomChange(newZoom)
    }

    // 添加事件监听器，passive: false 允许 preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [zoom, onZoomChange])

  // 绘制地图
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布大小
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 计算可见区域
    const blockSize = Math.max(1, Math.floor(16 / zoom))
    const centerBlockX = centerX + mapOffset.x
    const centerBlockZ = centerZ + mapOffset.y

    // 绘制网格
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    ctx.beginPath()
    
    const startX = Math.floor((centerBlockX - canvas.width / 2 / blockSize) / 16) * 16
    const endX = Math.ceil((centerBlockX + canvas.width / 2 / blockSize) / 16) * 16
    const startZ = Math.floor((centerBlockZ - canvas.height / 2 / blockSize) / 16) * 16
    const endZ = Math.ceil((centerBlockZ + canvas.height / 2 / blockSize) / 16) * 16

    for (let x = startX; x <= endX; x += 16) {
      const screenX = (x - centerBlockX) * blockSize + canvas.width / 2
      ctx.moveTo(screenX, 0)
      ctx.lineTo(screenX, canvas.height)
    }

    for (let z = startZ; z <= endZ; z += 16) {
      const screenZ = (z - centerBlockZ) * blockSize + canvas.height / 2
      ctx.moveTo(0, screenZ)
      ctx.lineTo(canvas.width, screenZ)
    }
    ctx.stroke()

    // 绘制史莱姆区块
    slimeChunks.forEach(chunk => {
      if (chunk.isSlimeChunk) {
        const chunkWorldX = chunk.chunkX * 16
        const chunkWorldZ = chunk.chunkZ * 16
        
        const screenX = (chunkWorldX - centerBlockX) * blockSize + canvas.width / 2
        const screenZ = (chunkWorldZ - centerBlockZ) * blockSize + canvas.height / 2
        
        if (screenX >= -16 && screenX <= canvas.width + 16 && 
            screenZ >= -16 && screenZ <= canvas.height + 16) {
          ctx.fillStyle = 'rgba(76, 175, 80, 0.3)'
          ctx.fillRect(screenX, screenZ, 16 * blockSize, 16 * blockSize)
          
          ctx.strokeStyle = '#4CAF50'
          ctx.lineWidth = 2
          ctx.strokeRect(screenX, screenZ, 16 * blockSize, 16 * blockSize)
        }
      }
    })

    // 绘制中心点
    ctx.fillStyle = '#f44336'
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 4, 0, 2 * Math.PI)
    ctx.fill()

  }, [slimeChunks, centerX, centerZ, mapOffset, zoom])

  // 处理鼠标事件
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y
    
    setMapOffset(prev => ({
      x: prev.x - deltaX / Math.max(1, Math.floor(16 / zoom)),
      y: prev.y - deltaY / Math.max(1, Math.floor(16 / zoom))
    }))
    
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      onCenterChange(centerX + mapOffset.x, centerZ + mapOffset.y)
      setMapOffset({ x: 0, y: 0 })
    }
  }

  return (
    <div ref={containerRef} className={styles.mapContainer}>
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-all duration-200 ${styles.mapCanvas}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {/* 坐标显示 */}
      <div className={styles.coordinates}>
        <div className="text-sm text-gray-700 font-medium">
          <div>X: {Math.floor(centerX + mapOffset.x)}</div>
          <div>Z: {Math.floor(centerZ + mapOffset.y)}</div>
          <div>缩放: {zoom.toFixed(1)}x</div>
        </div>
      </div>
      
      {/* 图例 */}
      <div className={styles.legend}>
        <div className="text-sm text-gray-700 font-medium">
          <div className="flex items-center space-x-2 mb-1">
            <div className={styles.slimeChunkIndicator}></div>
            <span>史莱姆区块</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={styles.currentPositionIndicator}></div>
            <span>当前位置</span>
          </div>
        </div>
      </div>
    </div>
  )
}
