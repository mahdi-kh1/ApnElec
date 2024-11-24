'use client'
import React, { useEffect } from 'react';
import { 
  Card, 
  CardBody, 
  Button, 
  Spinner, 
  Input, 
  Select, 
  SelectItem,
  useDisclosure
} from "@nextui-org/react";
import { PlusIcon, Search, SortAsc, SortDesc, Edit2, Trash } from 'lucide-react';
import { useStore, type Blog, type SortableFields } from '@/states/blog';
import { BlogModal } from '@/modals/BlogModal';
import { DeleteModal } from '@/modals/deleteBlog';

const BlogListPage = () => {
  const { 
    blogs,
    filteredBlogs,
    isLoading,
    error,
    searchTerm,
    selectedAuthor,
    sortConfig,
    fetchBlogs,
    setSearchTerm,
    setSelectedAuthor,
    setSortConfig,
    setCurrentBlog,
    getBlog,
    deleteBlog
  } = useStore();

  const { 
    isOpen: isCreateOpen, 
    onOpen: onCreateOpen, 
    onClose: onCreateClose 
  } = useDisclosure();

  const { 
    isOpen: isEditOpen, 
    onOpen: onEditOpen, 
    onClose: onEditClose 
  } = useDisclosure();

  const { 
    isOpen: isDeleteOpen, 
    onOpen: onDeleteOpen, 
    onClose: onDeleteClose 
  } = useDisclosure();

  const [blogToDelete, setBlogToDelete] = React.useState<Blog | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const uniqueAuthors = React.useMemo(() => {
    const authors = new Set(blogs.map(blog => blog.author));
    return ['all', ...Array.from(authors)];
  }, [blogs]);

  const handleSort = (key: SortableFields) => {
    const newDirection = 
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction: newDirection });
  };

  const handleCreateClick = () => {
    setCurrentBlog({
      id: '',
      title: '',
      content: '',
      author: '',
      publishedDate: new Date().toISOString().split('T')[0]
    });
    onCreateOpen();
  };

  const handleEditClick = async (blog: Blog) => {
    try {
      await getBlog(blog.id);
      onEditOpen();
    } catch {
      // Error is handled in the store
    }
  };

  const handleDeleteClick = (blog: Blog) => {
    setBlogToDelete(blog);
    onDeleteOpen();
  };

  const handleConfirmDelete = async () => {
    if (blogToDelete) {
      await deleteBlog(blogToDelete.id);
      onDeleteClose();
      setBlogToDelete(null);
    }
  };

  const SortButton = ({ column }: { column: SortableFields }) => (
    <Button
      size="sm"
      variant="light"
      onClick={() => handleSort(column)}
      startContent={sortConfig.key === column ? 
        (sortConfig.direction === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />) : 
        null}
    >
      {column.charAt(0).toUpperCase() + column.slice(1)}
    </Button>
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Create and manage your blog posts
          </p>
        </div>
        <Button
          color="primary"
          onClick={handleCreateClick}
          endContent={<PlusIcon className="h-4 w-4" />}
        >
          New Blog
        </Button>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <Card className="mt-6">
          <CardBody className="text-red-600 bg-red-50">
            <p>{error}</p>
            <Button
              color="primary"
              variant="flat"
              size="sm"
              className="mt-2"
              onClick={() => fetchBlogs()}
            >
              Try Again
            </Button>
          </CardBody>
        </Card>
      ) : (
        <>
          {/* Filters and Search */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startContent={<Search size={16} />}
                className="w-full md:max-w-xs"
              />
              <Select
                placeholder="Filter by author"
                selectedKeys={[selectedAuthor]}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full md:max-w-xs"
              >
                {uniqueAuthors.map((author) => (
                  <SelectItem key={author} value={author}>
                    {author === 'all' ? 'All Authors' : author}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="flex gap-2">
              <span className="text-sm text-gray-500 my-auto">Sort by:</span>
              <SortButton column="publishedDate" />
              <SortButton column="title" />
              <SortButton column="author" />
            </div>
          </div>

          {/* Blog List */}
          {filteredBlogs.length === 0 ? (
            <Card>
              <CardBody>
                <p className="text-gray-500 text-center">
                  {searchTerm || selectedAuthor !== 'all' 
                    ? 'No blogs found matching your filters.'
                    : 'No blogs found. Click "New Blog" to create your first blog post.'}
                </p>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody>
                <ul className="divide-y divide-gray-200">
                  {filteredBlogs.map((blog) => (
                    <li key={blog.id} className="py-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{blog.title}</h3>
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>By {blog.author}</span>
                            <span>
                              {new Date(blog.publishedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            color="primary"
                            variant="flat"
                            onClick={() => handleEditClick(blog)}
                            startContent={<Edit2 size={16} />}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            onClick={() => handleDeleteClick(blog)}
                            startContent={<Trash size={16} />}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
        </>
      )}

      {/* Modals */}
      <BlogModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        mode="create"
      />
      
      <BlogModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        mode="edit"
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={handleConfirmDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
      />
    </div>
  );
};

export default BlogListPage;