import { Layout } from '@/components/custom/layout'
import { Tabs, TabsContent  } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Blogs } from './components/blogs'


export default function Dashboard() {

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
          <h1 className='text-2xl font-bold tracking-tight'>All Blogs</h1>
        </div>
        <Tabs orientation='vertical' defaultValue='overview'className='space-y-4'>
          <TabsContent value='overview' className='space-y-4'>
            <div className=''>
              <Blogs />
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
