import { GetStaticProps } from 'next'
import Header from '../../components/header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import Footer from '../../components/footer'
import Link from 'next/link'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: Post
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }

  function format(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Header />

      {/* Navigation Breadcrumb */}
      <div className="max-w-4xl mx-auto px-5 pt-8">
        <Link href="/">
          <span className="inline-flex items-center space-x-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer transition-colors duration-200 group">
            <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
            <span>Back to articles</span>
          </span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-5 py-6 font-serif">
        {/* Header Metadata */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-sans font-light leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <img
              className="h-12 w-12 rounded-full object-cover border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              src={urlFor(post.author.image).url()!}
              alt={post.author.name}
            />
            <div className="text-sm font-sans">
              <p className="font-bold text-slate-800 dark:text-slate-200">{post.author.name}</p>
              <p className="text-slate-400 dark:text-slate-500">
                Published on {format(post._createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="mt-8 md:mt-12 rounded-3xl overflow-hidden shadow-md border border-slate-100/50 dark:border-slate-800/50">
            <img
              className="w-full h-[350px] md:h-[500px] object-cover"
              src={urlFor(post.mainImage).url()!}
              alt={post.title}
            />
          </div>
        )}

        {/* Article Body Content */}
        <div className="mt-12 max-w-3xl mx-auto font-sans text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed space-y-6">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-10 mb-4 tracking-tight" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4 tracking-tight" {...props} />
              ),
              normal: (props: any) => (
                <p className="my-5 text-slate-655 dark:text-slate-300 leading-relaxed" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-6 list-disc text-slate-600 dark:text-slate-400 my-2 leading-relaxed">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 font-semibold underline decoration-indigo-300 dark:decoration-indigo-800 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>

      <hr className="max-w-2xl mx-auto my-12 border-slate-200 dark:border-slate-850" />

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-5 mb-16 font-sans">
        {submitted ? (
          <div className="flex flex-col p-8 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 text-indigo-900 dark:text-indigo-300 rounded-2xl shadow-sm text-center">
            <h3 className="text-xl font-bold">
              Thank you for submitting your comment!
            </h3>
            <p className="text-sm mt-2 text-indigo-700 dark:text-indigo-400">
              Once it has been approved by the author, it will appear below.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-8 md:p-10 bg-white dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/80 rounded-3xl shadow-lg space-y-6"
          >
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400">Enjoyed this article?</span>
              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">Leave a comment below</h4>
            </div>

            <input {...register('_id')} type="hidden" name="_id" value={post._id} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</span>
                <input
                  {...register('name', { required: true })}
                  className="mt-2 block w-full rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 outline-none hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 transition-all text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  type="text"
                  placeholder="Your Name"
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</span>
                <input
                  {...register('email', { required: true })}
                  className="mt-2 block w-full rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 outline-none hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 transition-all text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  type="email"
                  placeholder="Your Email"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Comment</span>
              <textarea
                {...register('comment', { required: true })}
                className="mt-2 block w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-3 outline-none hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 transition-all text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                rows={6}
                placeholder="Enter your thoughts here..."
              />
            </label>

            <div className="flex flex-col text-xs font-semibold text-red-500 space-y-1">
              {errors.name && <span>- The Name field is required</span>}
              {errors.email && <span>- The Email field is required</span>}
              {errors.comment && <span>- The Comment field is required</span>}
            </div>

            <button
              type="submit"
              className="cursor-pointer rounded-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold py-3 px-6 shadow-md hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20 hover:shadow-lg active:scale-98 transition-all duration-300 w-full"
            >
              Submit Comment
            </button>
          </form>
        )}
      </div>

      {/* Comments List Section */}
      <div className="max-w-2xl mx-auto px-5 mb-16 font-sans">
        <div className="flex items-center space-x-2 mb-6">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Comments</h3>
          <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2.5 py-1 rounded-full font-bold">
            {post.comments?.length || 0}
          </span>
        </div>

        {post.comments && post.comments.length > 0 ? (
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div
                key={comment._id}
                className="p-5 bg-white dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-2 relative"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {comment.name}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    • {format(comment._createdAt)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {comment.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500 italic text-center py-6">
            No comments yet. Be the first to leave a comment!
          </p>
        )}
      </div>

      <Footer />
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true
    ] | order(_createdAt desc),
    description,
    mainImage,
    slug,
    body
  }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
