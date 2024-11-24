// components/BlogModal.tsx
import React, { useCallback } from 'react';
import { 
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Textarea,
  Image
} from "@nextui-org/react";
import { Upload } from 'lucide-react';
import { useStore } from '@/states/blog';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
}

export const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, mode }) => {
  const { currentBlog, isSubmitting, createBlog, updateBlog, setCurrentBlog, uploadImage } = useStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentBlog({ ...currentBlog, [e.target.name]: e.target.value });
  };

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      setCurrentBlog({ ...currentBlog, imageUrl });
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  }, [currentBlog, setCurrentBlog, uploadImage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'create') {
        await createBlog(currentBlog);
      } else {
        await updateBlog(currentBlog);
      }
      onClose();
    } catch (err) {
      // Error handling is done in the store
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>{mode === 'create' ? 'Create New Blog' : 'Edit Blog'}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              {currentBlog.imageUrl ? (
                <div className="relative w-full h-48">
                  <Image
                    src={currentBlog.imageUrl}
                    alt="Blog cover"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    size="sm"
                    color="danger"
                    className="absolute top-2 right-2"
                    onClick={() => setCurrentBlog({ ...currentBlog, imageUrl: '' })}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Upload size={20} />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Cover Image
                </Button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <Input
              label="Title"
              name="title"
              value={currentBlog.title}
              onChange={handleChange}
              isRequired
              placeholder="Enter blog title"
            />
            
            <Textarea
              label="Content"
              name="content"
              value={currentBlog.content}
              onChange={handleChange}
              minRows={5}
              isRequired
              placeholder="Write your blog content here..."
            />
            
            <Input
              label="Author"
              name="author"
              value={currentBlog.author}
              onChange={handleChange}
              isRequired
              placeholder="Enter author name"
            />
            
            <Input
              label="Published Date"
              name="publishedDate"
              type="date"
              value={currentBlog.publishedDate}
              onChange={handleChange}
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