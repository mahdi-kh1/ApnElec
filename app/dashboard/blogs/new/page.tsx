'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button, Card, CardBody, Input, Textarea } from "@nextui-org/react"
import { toast } from 'sonner'

interface BlogData {
  title: string
  content: string
  author: string
  publishedDate: string
}

const NewBlogPage = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [blog, setBlog] = useState<BlogData>({
    title: '',
    content: '',
    author: '',
    publishedDate: new Date().toISOString().split('T')[0]
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBlog(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await axios.post('/api/blogs', blog)
      toast.success('Blog created successfully')
      router.push('/dashboard/blogs')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Failed to create blog')
      } else {
        toast.error('An unexpected error occurred')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Title"
              name="title"
              value={blog.title}
              onChange={handleChange}
              isRequired
              placeholder="Enter blog title"
            />
            
            <Textarea
              label="Content"
              name="content"
              value={blog.content}
              onChange={handleChange}
              minRows={5}
              isRequired
              placeholder="Write your blog content here..."
            />
            
            <Input
              label="Author"
              name="author"
              value={blog.author}
              onChange={handleChange}
              isRequired
              placeholder="Enter author name"
            />
            
            <Input
              label="Published Date"
              name="publishedDate"
              type="date"
              value={blog.publishedDate}
              onChange={handleChange}
              isRequired
            />

            <div className="flex justify-end gap-2">
              <Button
                color="danger"
                variant="flat"
                onPress={() => router.push('/dashboard/blogs')}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isSubmitting}
              >
                Create Blog
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default NewBlogPage