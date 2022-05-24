module.exports = {
  // 手动切换暗黑模式 通过class类名的形式
  darkMode: 'class',
  // tailwind 应用
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.42rem'],
        base: ['0.42rem', '0.52rem'],
        lg: ['0.52rem', '0.62rem'],
        xl: ['0.62rem', '0.72rem']
      },
      boxShadow: {
        'l-white': '-10px 0 10px white',
        'l-zinc': '-10px 0 10px #18181b'
      },
      height: {
        header: '72px',
        main: 'calc(100vh - 72px)'
      },
      colors: {
        main: '#f44c58',
        'hover-main': '#f32836'
      }
    }
  },
  plugins: []
}
