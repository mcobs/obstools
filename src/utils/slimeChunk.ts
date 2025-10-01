/**
 * 史莱姆区块算法实现
 * 基于 Minecraft 的伪随机数生成器
 */

export type MinecraftVersion = 'java' | 'bedrock'

/**
 * Java版史莱姆区块算法
 * 基于Minecraft官方源码的正确实现
 * 
 * 算法来源：Minecraft Java Edition
 * worldSeed + (chunkX * chunkX) * 0x4C1906 + chunkX * 0x5AC0DB + 
 * (chunkZ * chunkZ) * 0x4307A7 + chunkZ * 0x5F24F ^ 0x3AD8025F
 */
export function isSlimeChunkJava(seed: bigint, chunkX: number, chunkZ: number): boolean {
  const x = BigInt(chunkX)
  const z = BigInt(chunkZ)
  
  // 计算区块的随机数种子（按照Java版官方算法）
  let chunkSeed = seed +
    (x * x) * 0x4C1906n +
    x * 0x5AC0DBn +
    (z * z) * 0x4307A7n +
    z * 0x5F24Fn ^ 0x3AD8025Fn
  
  // 使用Java的Random类初始化
  const random = new JavaRandom(chunkSeed)
  
  // 生成随机数并检查是否为史莱姆区块 (10%概率)
  return random.nextInt(10) === 0
}

/**
 * 基岩版史莱姆区块算法
 * 基岩版不依赖世界种子，所有世界的史莱姆区块位置固定
 * 
 * 算法基于社区反向工程：
 * 1. 使用区块坐标计算种子：(chunkX * 0x1f1f1f1f) ^ chunkZ
 * 2. 使用 MT19937 (Mersenne Twister) 随机数生成器
 * 3. 判断生成的随机数是否能被10整除
 * 
 * 参考：https://github.com/bWFuanVzYWth/SlimeChunkFinder
 * 
 * @param _seed - 世界种子（基岩版不使用此参数，仅为保持接口一致）
 * @param chunkX - 区块 X 坐标
 * @param chunkZ - 区块 Z 坐标
 */
export function isSlimeChunkBedrock(_seed: bigint, chunkX: number, chunkZ: number): boolean {
  // 基岩版使用区块坐标的哈希，不依赖世界种子
  // 这是基岩版的特性：所有世界的史莱姆区块位置都相同
  
  // 计算基岩版区块种子：(chunkX * 0x1f1f1f1f) ^ chunkZ
  const seed = getBedrockChunkSeed(chunkX, chunkZ)
  
  // 使用 MT19937 生成器
  const random = new MT19937(seed)
  
  // 生成一个随机数并判断是否能被10整除
  const value = random.next()
  return value % 10 === 0
}

/**
 * 计算基岩版区块的种子值
 * 算法来源：https://github.com/bWFuanVzYWth/SlimeChunkFinder/blob/master/src/chunk.rs
 */
function getBedrockChunkSeed(chunkX: number, chunkZ: number): number {
  // 转换为32位有符号整数
  const x = chunkX | 0
  const z = chunkZ | 0
  
  // 基岩版的种子计算公式：(x * 0x1f1f1f1f) ^ z
  // 使用无符号32位运算
  const seed = ((x * 0x1f1f1f1f) ^ z) >>> 0
  
  return seed
}

/**
 * 检查区块是否为史莱姆区块
 */
export function isSlimeChunk(
  seed: bigint, 
  chunkX: number, 
  chunkZ: number, 
  version: MinecraftVersion
): boolean {
  if (version === 'java') {
    return isSlimeChunkJava(seed, chunkX, chunkZ)
  } else {
    return isSlimeChunkBedrock(seed, chunkX, chunkZ)
  }
}

/**
 * Java版随机数生成器
 * 完全按照 java.util.Random 的实现
 */
class JavaRandom {
  private seed: bigint

  constructor(seed: bigint) {
    // Java Random 构造函数会调用 setSeed
    this.seed = (seed ^ 0x5DEECE66Dn) & ((1n << 48n) - 1n)
  }

  setSeed(seed: bigint): void {
    this.seed = (seed ^ 0x5DEECE66Dn) & ((1n << 48n) - 1n)
  }

  nextInt(bound: number): number {
    if (bound <= 0) {
      throw new Error('Bound must be positive')
    }

    // 如果 bound 是 2 的幂，使用优化算法
    if ((bound & (bound - 1)) === 0) {
      const bits = this.next(31)
      return Number((BigInt(bound) * bits) >> 31n)
    }

    // 标准的 nextInt 实现
    let bits: bigint
    let val: bigint
    do {
      bits = this.next(31)
      val = bits % BigInt(bound)
    } while (bits - val + BigInt(bound - 1) < 0n)

    return Number(val)
  }

  private next(bits: number): bigint {
    // Java 的线性同余生成器 (LCG) 算法
    this.seed = (this.seed * 0x5DEECE66Dn + 0xBn) & ((1n << 48n) - 1n)
    return this.seed >> BigInt(48 - bits)
  }
}

/**
 * MT19937 (Mersenne Twister) 随机数生成器
 * 基岩版史莱姆区块使用此算法
 * 参考：https://github.com/bWFuanVzYWth/SlimeChunkFinder/blob/master/src/slime_chunk.rs
 */
class MT19937 {
  private static readonly N = 624
  private static readonly M = 397
  private static readonly MATRIX_A = 0x9908b0df
  private static readonly UPPER_MASK = 0x80000000
  private static readonly LOWER_MASK = 0x7fffffff
  
  private mt: number[] = new Array(MT19937.N)
  private mti: number = MT19937.N + 1

  constructor(seed: number) {
    this.init(seed >>> 0) // 确保是无符号32位整数
  }

  /**
   * 初始化 MT19937 状态
   */
  private init(seed: number): void {
    this.mt[0] = seed >>> 0
    for (this.mti = 1; this.mti < MT19937.N; this.mti++) {
      const s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)
      this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + 
                          (s & 0x0000ffff) * 1812433253 + this.mti) >>> 0
    }
  }

  /**
   * 生成下一个随机数
   */
  next(): number {
    let y: number
    const mag01 = [0, MT19937.MATRIX_A]

    if (this.mti >= MT19937.N) {
      let kk: number

      for (kk = 0; kk < MT19937.N - MT19937.M; kk++) {
        y = (this.mt[kk] & MT19937.UPPER_MASK) | (this.mt[kk + 1] & MT19937.LOWER_MASK)
        this.mt[kk] = this.mt[kk + MT19937.M] ^ (y >>> 1) ^ mag01[y & 0x1]
      }
      
      for (; kk < MT19937.N - 1; kk++) {
        y = (this.mt[kk] & MT19937.UPPER_MASK) | (this.mt[kk + 1] & MT19937.LOWER_MASK)
        this.mt[kk] = this.mt[kk + (MT19937.M - MT19937.N)] ^ (y >>> 1) ^ mag01[y & 0x1]
      }
      
      y = (this.mt[MT19937.N - 1] & MT19937.UPPER_MASK) | (this.mt[0] & MT19937.LOWER_MASK)
      this.mt[MT19937.N - 1] = this.mt[MT19937.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1]

      this.mti = 0
    }

    y = this.mt[this.mti++]

    // Tempering
    y ^= (y >>> 11)
    y ^= (y << 7) & 0x9d2c5680
    y ^= (y << 15) & 0xefc60000
    y ^= (y >>> 18)

    return y >>> 0
  }
}

/**
 * 将字符串种子转换为BigInt
 */
export function parseSeed(seedInput: string): bigint {
  // 如果是纯数字，直接转换
  if (/^\d+$/.test(seedInput)) {
    return BigInt(seedInput)
  }
  
  // 如果是字符串，使用Java的hashCode算法
  let hash = 0n
  for (let i = 0; i < seedInput.length; i++) {
    const char = BigInt(seedInput.charCodeAt(i))
    hash = ((hash << 5n) - hash + char) & ((1n << 32n) - 1n)
  }
  
  return hash
}
