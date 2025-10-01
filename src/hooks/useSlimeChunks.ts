import { useState, useMemo } from 'react'
import { isSlimeChunk, parseSeed, type MinecraftVersion } from '../utils/slimeChunk'

export interface SlimeChunkData {
  chunkX: number
  chunkZ: number
  isSlimeChunk: boolean
}

export interface UseSlimeChunksOptions {
  seed: string
  version: MinecraftVersion
  centerX: number
  centerZ: number
  radius: number
}

export function useSlimeChunks(options: UseSlimeChunksOptions) {
  const [isLoading, setIsLoading] = useState(false)
  
  const slimeChunks = useMemo(() => {
    if (!options.seed.trim()) return []
    
    setIsLoading(true)
    
    try {
      const parsedSeed = parseSeed(options.seed)
      const chunks: SlimeChunkData[] = []
      
      // 计算要检查的区块范围
      const startX = Math.floor(options.centerX / 16) - options.radius
      const endX = Math.floor(options.centerX / 16) + options.radius
      const startZ = Math.floor(options.centerZ / 16) - options.radius
      const endZ = Math.floor(options.centerZ / 16) + options.radius
      
      for (let chunkX = startX; chunkX <= endX; chunkX++) {
        for (let chunkZ = startZ; chunkZ <= endZ; chunkZ++) {
          const isSlime = isSlimeChunk(parsedSeed, chunkX, chunkZ, options.version)
          chunks.push({
            chunkX,
            chunkZ,
            isSlimeChunk: isSlime
          })
        }
      }
      
      setIsLoading(false)
      return chunks
    } catch (error) {
      console.error('Error calculating slime chunks:', error)
      setIsLoading(false)
      return []
    }
  }, [options.seed, options.version, options.centerX, options.centerZ, options.radius])
  
  return {
    slimeChunks,
    isLoading
  }
}
