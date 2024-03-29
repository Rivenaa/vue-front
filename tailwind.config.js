module.exports = {
  // 手动切换暗黑模式 通过class类名的形式
  darkMode: 'class',
  // tailwind 应用
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    minWidth: {
      '1/3': '33%',
      '1/4': '25%'
    },
    minHeight: {
      '1/2': '50%'
    },
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
        'l-zinc': '-10px 0 10px #18181b',
        'l-black': '0 0.9rem 1.7rem black'
      },
      height: {
        header: '72px',
        main: 'calc(100vh - 72px)'
      },
      colors: {
        main: '#f44c58',
        'hover-main': '#f32836',
        'success-100': '#F2F9EC',
        'success-200': '#E4F2DB',
        'success-300': '#7EC050',
        'warn-100': '#FCF6ED',
        'warn-200': '#F8ECDA',
        'warn-300': '#DCA550',
        'error-100': '#ED7456',
        'error-200': '#f3471c',
        'error-300': '#ffffff'
      },
      backdropBlur: { '4xl': '240px' },
      variants: {
        scrollbar: ['dark']
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
}
