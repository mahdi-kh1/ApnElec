import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

interface Blog {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  content?: string;
}

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  blog: Blog;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
  mode: 'create' | 'edit';
}

export const BlogFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  blog,
  onChange,
  isSubmitting,
  mode
}: BlogFormModalProps) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader>{mode === 'create' ? 'Create New Blog' : 'Edit Blog'}</ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmit} className="space-y-6">
            <Input
              label="Title"
              name="title"
              value={blog.title}
              onChange={onChange}
              isRequired
              placeholder="Enter blog title"
            />
            
            <Textarea
              label="Content"
              name="content"
              value={blog.content}
              onChange={onChange}
              minRows={5}
              isRequired
              placeholder="Write your blog content here..."
            />
            
            <Input
              label="Author"
              name="author"
              value={blog.author}
              onChange={onChange}
              isRequired
              placeholder="Enter author name"
            />
            
            <Input
              label="Published Date"
              name="publishedDate"
              type="date"
              value={blog.publishedDate}
              onChange={onChange}
              isRequired
            />

            <div className="flex justify-end gap-2">
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isSubmitting}
              >
                {mode === 'create' ? 'Create Blog' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};