import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import CategoryItem from './CategoryItem'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ post, showSummary }) => {
  const showPreview =
    siteConfig('MEDIUM_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  const { locale } = useGlobal()
  return (
    <div
      key={post.id}
      data-aos='fade-up'
      data-aos-duration='300'
      data-aos-once='false'
      data-aos-anchor-placement='top-bottom'
      className='mb-4 max-w-7xl border-b dark:border-gray-800 '>
      <header className='lg:py-8 py-4 flex flex-col w-full'>
        <SmartLink
          href={post?.href}
          passHref
          className={
            'cursor-pointer font-bold  hover:underline text-3xl leading-tight text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400'
          }>
          <h2>
            {siteConfig('MEDIUM_POST_LIST_COVER', null, CONFIG) && (
              <div className='w-full max-h-96 object-cover overflow-hidden mb-2'>
                <LazyImage
                  src={post.pageCoverThumbnail}
                  style={post.pageCoverThumbnail ? {} : { height: '0px' }}
                  className='w-full max-h-96 object-cover hover:scale-125 duration-150'
                />
              </div>
            )}
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post.pageIcon} />
            )}
            {post.title}
          </h2>
        </SmartLink>

        <div
          className={
            'flex mt-2 items-center justify-start flex-wrap space-x-3 text-gray-400'
          }>
          <div className='text-sm py-1'>{post.date?.start_date}</div>
          {siteConfig('MEDIUM_POST_LIST_CATEGORY', null, CONFIG) && (
            <CategoryItem category={post.category} />
          )}
          {siteConfig('MEDIUM_POST_LIST_TAG', null, CONFIG) &&
            post?.tagItems?.map(tag => (
              <TagItemMini key={tag.name} tag={tag} />
            ))}
          <TwikooCommentCount post={post} className='hover:underline' />
        </div>

        <div className='flex'></div>

        {(!showPreview || showSummary) && (
          <main className='my-4 text-gray-700 dark:text-gray-300 text-sm font-light leading-7'>
            {post.summary}
          </main>
        )}

        {showPreview && (
          <div className='overflow-ellipsis truncate'>
            <NotionPage post={post} />
            <div className='pointer-events-none border-t pt-6 border-dashed' />
            <div className='block'>
              <SmartLink
                href={post.href}
                className='inline-block rounded-sm text-blue-600 dark:text-blue-300  text-xs dark:border-gray-800 border hover:text-red-400 transition-all duration-200 hover:border-red-300 h-9 leading-8 px-5'>
                Continue Reading{' '}
                <i className='fa-solid fa-angle-right align-middle'></i>
              </SmartLink>
            </div>
        )}
      </header>
    </div>
  )
}

export default BlogPostCard
