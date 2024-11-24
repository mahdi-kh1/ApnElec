import { create } from "zustand";
import { blogService } from "@/services";
import { toast } from "sonner";

export interface Blog {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  content?: string;
  imageUrl?: string;
  summary?: string;
  readTime?: number;
  tags?: string[];
}

type SortDirection = "asc" | "desc";

export type SortableFields = "publishedDate" | "title" | "author" | "id" | "imageUrl" | "readTime" | "summary";

interface SortConfig {
  key: SortableFields;
  direction: SortDirection;
}

interface BlogState {
  blogs: Blog[];
  filteredBlogs: Blog[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedAuthor: string;
  sortConfig: SortConfig;
  currentBlog: Blog;
  isSubmitting: boolean;

  // Actions
  fetchBlogs: () => Promise<void>;
  createBlog: (blog: Blog) => Promise<void>;
  updateBlog: (blog: Blog) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  getBlog: (id: string) => Promise<void>;
  setCurrentBlog: (blog: Blog) => void;
  setSearchTerm: (term: string) => void;
  setSelectedAuthor: (author: string) => void;
  setSortConfig: (config: SortConfig) => void;
  filterAndSortBlogs: (search: string, author: string, sort: SortConfig) => void;
  uploadImage: (file: File) => Promise<string>;
}

const compareValues = (
  a: string | number | undefined,
  b: string | number | undefined,
  direction: SortDirection
): number => {
  if (a === undefined || b === undefined) return 0;

  const modifier = direction === "asc" ? 1 : -1;
  if (typeof a === "number" && typeof b === "number") {
    return (a - b) * modifier;
  }

  const aStr = String(a).toLowerCase();
  const bStr = String(b).toLowerCase();
  return aStr < bStr ? -1 * modifier : aStr > bStr ? 1 * modifier : 0;
};

const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const generateSummary = (content: string): string => {
  const sentences = content.split(/[.!?]+/).filter(Boolean);
  const summary = sentences.slice(0, 2).join(". ").trim();
  return summary.length < content.length ? `${summary}...` : summary;
};

export const useStore = create<BlogState>((set, get) => ({
  blogs: [],
  filteredBlogs: [],
  isLoading: true,
  error: null,
  searchTerm: "",
  selectedAuthor: "all",
  sortConfig: {
    key: "publishedDate",
    direction: "desc",
  },
  currentBlog: {
    id: "",
    title: "",
    content: "",
    author: "",
    publishedDate: new Date().toISOString().split("T")[0],
    imageUrl: "",
    summary: "",
    readTime: 0,
    tags: [],
  },
  isSubmitting: false,

  fetchBlogs: async () => {
    try {
      set({ isLoading: true, error: null });
      const result = await blogService.fetchBlogsAsync();

      if (result.success) {
        set({
          blogs: result.data,
          filteredBlogs: result.data,
          isLoading: false,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      set({ error: "Failed to fetch blogs", isLoading: false });
      toast.error("Failed to fetch blogs");
    }
  },

  createBlog: async (blog: Blog) => {
    set({ isSubmitting: true });
    try {
      const enrichedBlog = {
        ...blog,
        readTime: calculateReadTime(blog.content || ""),
        summary: generateSummary(blog.content || ""),
        tags: blog.tags || ["General"],
      };

      const result = await blogService.createBlogAsync(enrichedBlog);

      if (result.success) {
        set((state) => ({
          blogs: [...state.blogs, result.data],
          filteredBlogs: [...state.filteredBlogs, result.data],
        }));
        toast.success("Blog created successfully");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      toast.error("Failed to create blog");
    } finally {
      set({ isSubmitting: false });
    }
  },

  updateBlog: async (blog: Blog) => {
    set({ isSubmitting: true });
    try {
      const enrichedBlog = {
        ...blog,
        readTime: calculateReadTime(blog.content || ""),
        summary: generateSummary(blog.content || ""),
      };

      const result = await blogService.updateBlogAsync(blog.id, enrichedBlog);

      if (result.success) {
        set((state) => ({
          blogs: state.blogs.map((b) => (b.id === blog.id ? result.data : b)),
          filteredBlogs: state.filteredBlogs.map((b) => (b.id === blog.id ? result.data : b)),
        }));
        toast.success("Blog updated successfully");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      toast.error("Failed to update blog");
    } finally {
      set({ isSubmitting: false });
    }
  },

  deleteBlog: async (id: string) => {
    set({ isSubmitting: true });
    try {
      const result = await blogService.deleteBlogAsync(id);

      if (result.success) {
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog.id !== id),
          filteredBlogs: state.filteredBlogs.filter((blog) => blog.id !== id),
        }));
        toast.success("Blog deleted successfully");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      toast.error("Failed to delete blog");
    } finally {
      set({ isSubmitting: false });
    }
  },

  getBlog: async (id: string) => {
    try {
      const result = await blogService.fetchBlogByIdAsync(id);

      if (result.success) {
        set({ currentBlog: result.data });
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      toast.error("Failed to fetch blog details");
    }
  },

  uploadImage: async (file: File) => {
    try {
      const result = await blogService.uploadImageAsync(file);

      if (result.success) {
        return result.data.imageUrl;
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      toast.error("Failed to upload image");
      throw err;
    }
  },

  setCurrentBlog: (blog: Blog) => {
    set({ currentBlog: blog });
  },

  setSearchTerm: (term: string) => {
    const state = get();
    set({ searchTerm: term });
    state.filterAndSortBlogs(term, state.selectedAuthor, state.sortConfig);
  },

  setSelectedAuthor: (author: string) => {
    const state = get();
    set({ selectedAuthor: author });
    state.filterAndSortBlogs(state.searchTerm, author, state.sortConfig);
  },

  setSortConfig: (config: SortConfig) => {
    const state = get();
    set({ sortConfig: config });
    state.filterAndSortBlogs(state.searchTerm, state.selectedAuthor, config);
  },

  filterAndSortBlogs: (search: string, author: string, sort: SortConfig) => {
    const state = get();
    let filtered = [...state.blogs];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(searchLower) ||
        blog.content?.toLowerCase().includes(searchLower) ||
        blog.author.toLowerCase().includes(searchLower) ||
        blog.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (author !== "all") {
      filtered = filtered.filter((blog) => blog.author === author);
    }

    filtered.sort((a, b) => {
      const aValue = a[sort.key];
      const bValue = b[sort.key];
      return compareValues(aValue, bValue, sort.direction);
    });

    set({ filteredBlogs: filtered });
  },
}));
