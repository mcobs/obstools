/**
 * NBT 文件解析工具
 * 用于解析 Minecraft 的 level.dat 文件并提取种子信息
 */

import * as nbt from 'prismarine-nbt'
import * as pako from 'pako'
import { Buffer } from 'buffer'

export interface LevelData {
  seed: string
  version?: string
  levelName?: string
  gameType?: number
  difficulty?: number
  spawnX?: number
  spawnY?: number
  spawnZ?: number
}

/**
 * 解析 level.dat 文件
 * @param file - level.dat 文件
 * @returns 解析后的关卡数据
 */
export async function parseLevelDat(file: File): Promise<LevelData> {
  try {
    // 读取文件为 ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    
    // 使用 pako 解压 gzip 数据（浏览器兼容）
    const decompressed = pako.ungzip(buffer)
    
    // 将 Uint8Array 转换为 Buffer（prismarine-nbt 需要 Buffer）
    const bufferData = Buffer.from(decompressed)
    
    // 解析 NBT 数据
    const { parsed } = await nbt.parse(bufferData)
    
    // 提取数据
    const data = parsed.value as any
    
    // 打印调试信息
    console.log('NBT 解析结果:', data)
    
    if (!data.Data) {
      throw new Error('无效的 level.dat 文件：缺少 Data 标签')
    }
    
    const levelData = data.Data.value
    console.log('Level Data:', levelData)
    console.log('WorldGenSettings:', levelData.WorldGenSettings)
    console.log('RandomSeed:', levelData.RandomSeed)
    
    // 提取种子（可能是 long 类型的 bigint 数组）
    let seed: string
    
    // 尝试多种方式提取种子
    if (levelData.WorldGenSettings?.value?.seed) {
      // 1.16+ 版本
      console.log('使用 WorldGenSettings.seed')
      const seedValue = levelData.WorldGenSettings.value.seed.value
      seed = extractSeedValue(seedValue)
    } else if (levelData.RandomSeed) {
      // 1.15 及以下版本
      console.log('使用 RandomSeed')
      const seedValue = levelData.RandomSeed.value
      seed = extractSeedValue(seedValue)
    } else if (levelData.generatorOptions) {
      // 某些自定义世界可能在这里
      console.log('使用 generatorOptions')
      const seedValue = levelData.generatorOptions.value
      seed = extractSeedValue(seedValue)
    } else {
      // 打印所有可用的键来帮助调试
      console.error('可用的 levelData 键:', Object.keys(levelData))
      throw new Error('无法在 level.dat 中找到种子信息。请确保上传的是有效的 level.dat 文件。')
    }
    
    // 提取其他信息
    const result: LevelData = {
      seed: seed,
      levelName: levelData.LevelName?.value || '未知',
      gameType: levelData.GameType?.value,
      difficulty: levelData.Difficulty?.value,
      spawnX: levelData.SpawnX?.value,
      spawnY: levelData.SpawnY?.value,
      spawnZ: levelData.SpawnZ?.value,
    }
    
    // 尝试获取版本信息
    if (levelData.Version?.value?.Name) {
      result.version = levelData.Version.value.Name.value
    } else if (levelData.Version?.value?.name) {
      result.version = levelData.Version.value.name.value
    }
    
    return result
  } catch (error) {
    console.error('解析 level.dat 失败:', error)
    
    // 提供更详细的错误信息
    if (error instanceof Error) {
      if (error.message.includes('incorrect header check')) {
        throw new Error('文件格式错误：该文件不是有效的 level.dat 文件（可能未压缩或损坏）')
      } else if (error.message.includes('Data 标签')) {
        throw new Error('文件结构错误：该文件缺少必要的数据结构')
      } else {
        throw new Error(`解析失败: ${error.message}`)
      }
    }
    
    throw new Error('解析失败: 未知错误，请确保上传的是正确的 level.dat 文件')
  }
}

/**
 * 从各种格式中提取种子值
 */
function extractSeedValue(seedValue: any): string {
  if (seedValue === null || seedValue === undefined) {
    throw new Error('种子值为空')
  }
  
  // 如果是数组（long 类型）
  if (Array.isArray(seedValue)) {
    return longArrayToString(seedValue)
  }
  
  // 如果是 bigint
  if (typeof seedValue === 'bigint') {
    return seedValue.toString()
  }
  
  // 如果是数字或字符串
  if (typeof seedValue === 'number' || typeof seedValue === 'string') {
    return seedValue.toString()
  }
  
  // 尝试直接转换
  return String(seedValue)
}

/**
 * 将 NBT 的 long 数组转换为字符串
 * Minecraft 使用 long 类型存储种子（64位整数）
 */
function longArrayToString(longArray: number[]): string {
  if (longArray.length === 2) {
    // long 类型由两个 32 位整数组成
    const high = BigInt(longArray[0])
    const low = BigInt(longArray[1]) & 0xFFFFFFFFn
    const value = (high << 32n) | low
    return value.toString()
  }
  return longArray[0]?.toString() || '0'
}

/**
 * 验证文件是否为有效的 level.dat 文件
 */
export function validateLevelDatFile(file: File): boolean {
  // 检查文件名
  if (!file.name.toLowerCase().includes('level.dat')) {
    return false
  }
  
  // 检查文件大小（level.dat 通常在几KB到几十KB之间）
  if (file.size < 100 || file.size > 1024 * 1024) {
    return false
  }
  
  return true
}

