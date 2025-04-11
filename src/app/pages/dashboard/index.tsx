import { Layout } from '@/components/custom/layout'
import { Tabs, TabsContent  } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Blogs } from './components/blogs'
import { Button } from '@/components/custom/button'
import { BlogForm } from './components/blogs-form'
import { useState } from 'react'

export default function Dashboard() {

  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false)

  const handleBlogFormOpen = () => {
    setIsBlogFormOpen(true)
  }

  const handleBlogFormClose = (hasChanges?: boolean) => {
    if (hasChanges) {
      // Optionally refetch blog list here
    }
    setIsBlogFormOpen(false)
  }
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        {/* <TopNav links={topNav} /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>My Blogs</h1>
          <Button  onClick={() => handleBlogFormOpen()}>Create New Blog</Button>
        </div>
        <Tabs orientation='vertical' defaultValue='overview'className='space-y-4'>
          <TabsContent value='overview' className='space-y-4'>
            <div className=''>
              <Blogs />
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>

      <BlogForm isOpen={isBlogFormOpen} onClose={handleBlogFormClose} />
    </Layout>
  )
}
