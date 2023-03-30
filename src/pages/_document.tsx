import { Head, Html, Main, NextScript } from 'next/document'
import { DEFAULT_THEME } from '@utils/default'

export default function Document() {
  return (
    <Html lang="en" data-theme={DEFAULT_THEME}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
