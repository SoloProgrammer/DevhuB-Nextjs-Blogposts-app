import React, { Suspense } from 'react'
import styles from './homepage.module.css'
import Featured from '@/components/Featured/Featured'
import CategoryList from '@/components/CategoryList/CategoryList'
import BlogList from '@/components/BlogList/BlogList'
import Menu from '@/components/Menu/Menu'
import HomePageLoading from './loading'

const Home = ({ searchParams }) => {
  let page = searchParams.page || 1
  return (
    <Suspense fallback={<HomePageLoading />}>
      <div className={styles.container}>
        <Featured />
        <CategoryList />
        <div className={styles.content}>
          <BlogList page={page} key={'allblogsList'} />
          <Menu />
        </div>
      </div>
    </Suspense>
  )
}

export default Home
