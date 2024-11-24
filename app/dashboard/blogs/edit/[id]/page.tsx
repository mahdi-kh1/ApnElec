'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button, Card, CardBody, Input, Spinner, Textarea } from "@nextui-org/react"
import { toast } from 'sonner'

interface BlogParams {
  id: string
}

interface BlogData {
  title: string
  content: string
  author: string
  publishedDate: string
}

const EditBlogPage = ({ params }: { params: BlogParams }) => {
  const router = useRouter()
  const { id } = params
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [blog, setBlog] = useState<BlogData>({
    title: '',
    content: '',
    author: '',
    publishedDate: ''
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`)
        setBlog(response.data)
        setError(null)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to fetch blog')
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBlog(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await axios.put(`/api/blogs/${id}`, blog)
      toast.success('Blog updated successfully')
      router.push('/dashboard/blogs')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Failed to update blog')
      } else {
        toast.error('An unexpected error occurred')
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="max-w-4xl mx-auto mt-6">
        <CardBody className="text-red-600 bg-red-50">
          <p>{error}</p>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Title"
              name="title"
              value={blog.title}
              onChange={handleChange}
              isRequired
            />
            
            <Textarea
              label="Content"
              name="content"
              value={blog.content}
              onChange={handleChange}
              minRows={5}
              isRequired
            />
            
            <Input
              label="Author"
              name="author"
              value={blog.author}
              onChange={handleChange}
              isRequired
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
                isLoading={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default EditBlogPage