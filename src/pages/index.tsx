import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { HomeContent } from '@components/home/home-content'
import { Header } from '@components/layout/header'
import { MainLayout } from '@components/layout/main-layout'
import { PageContainer } from '@components/layout/page-container'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Solana dApp</title>
        <meta name="description" content="sSolana dApp" />
      </Head>
      <MainLayout>
        <PageContainer>
          <Header />
          <HomeContent />
        </PageContainer>
      </MainLayout>
    </>
  )
}

export default Home
