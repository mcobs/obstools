/// <reference types="vite/client" />

// 声明全局 Buffer 类型
interface Window {
  Buffer: typeof import('buffer').Buffer
}

// 声明 CSS 模块类型
declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { [key: string]: string }
  export default classes
}

