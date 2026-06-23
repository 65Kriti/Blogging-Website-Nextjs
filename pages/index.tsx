import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/footer'
import Header from '../components/header'
import Hero from '../components/hero'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: Post[]
}

export default function Home({ posts }: Props) {
  console.log(posts)
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Head>
        <title>My Blog | Premium Creative Space</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Hero />

      <main className="max-w-6xl mx-auto px-5 md:px-0 py-10">
        <div className="flex flex-col space-y-2 mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Latest Stories
          </h2>
          <div className="h-1 w-12 bg-indigo-600 dark:bg-indigo-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="group cursor-pointer bg-white dark:bg-slate-900/40 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-indigo-100/50 dark:hover:border-indigo-900/50 transition-all duration-300 flex flex-col h-full">
                {/* Image Section */}
                <div className="h-56 w-full overflow-hidden relative">
                  <img
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    src={urlFor(post.mainImage).url()!}
                    alt={post.title}
                  />
                  {/* Subtle category or decoration badge */}
                  <span className="absolute top-4 left-4 bg-indigo-600/90 dark:bg-indigo-500/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Article
                  </span>
                </div>

                {/* Text Content Section */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  {/* Author Row */}
                  <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-slate-50 dark:border-slate-800/60">
                    <img
                      className="h-9 w-9 rounded-full object-cover border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                      src={urlFor(post.author.image).url()!}
                      alt={post.author.name}
                    />
                    <div className="flex flex-col">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {post.author.name}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        Author
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author-> {
      name,
      image,
    },
    description,
    mainImage,
    slug
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
