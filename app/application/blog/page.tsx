// app/(public)/blogs/page.tsx
'use client';

import React from 'react';
import { 
  Card, 
  CardBody,
  Image,
  Button,
  Input,
  Chip
} from "@nextui-org/react";
import { Clock, Search, User } from 'lucide-react';
import { useStore, type Blog } from '@/states/blog';

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => (
  <Card className="w-full">
    <CardBody>
      {blog.imageUrl && (
        <div className="relative w-full h-48 mb-4">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            classNames={{
              wrapper: "w-full h-full",
              img: "object-cover"
            }}
          />
        </div>
      )}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Chip color="primary" variant="flat">{blog.tags?.[0] || 'General'}</Chip>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock size={16} />
            <span>{blog.readTime} min read</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <p className="text-gray-600">{blog.summary}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">{blog.author}</span>
            <span className="text-sm text-gray-400">
              {new Date(blog.publishedDate).toLocaleDateString()}
            </span>
          </div>
          <Button
            color="primary"
            variant="light"
            size="sm"
            href={`/blogs/${blog.id}`}
            as="a"
          >
            Read More
          </Button>
        </div>
      </div>
    </CardBody>
  </Card>
);

export default function BlogsPage() {
  const { blogs, searchTerm, setSearchTerm } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-bold">Our Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our latest thoughts, ideas, and insights about technology,
          development, and innovation.
        </p>
        <div className="max-w-xl mx-auto">
          <Input
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startContent={<Search size={16} />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}