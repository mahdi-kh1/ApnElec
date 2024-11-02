import React from 'react';
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";

export default function BlogPage() {
  const posts = [
    {
      title: "The Future of Web Development",
      date: "March 15, 2024",
      excerpt: "Exploring the latest trends in web development and what's coming next..."
    },
    {
      title: "Mastering React Hooks",
      date: "March 10, 2024",
      excerpt: "A comprehensive guide to using React Hooks effectively in your projects..."
    },
    {
      title: "UI Design Principles",
      date: "March 5, 2024",
      excerpt: "Essential principles every designer should know for creating beautiful interfaces..."
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {posts.map((post, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-start">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p className="text-gray-500">{post.date}</p>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Button color="primary" variant="flat">
                Read More
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
