import { AxiosInstance } from "axios";
import { Failed, Result, Succeeded, ValidationFailed } from "./results";
import { Blog } from "./types/blog";

export class BlogService {
  constructor(private api: AxiosInstance) {}

  async fetchBlogsAsync() {
    return await Result.handle<Failed | Succeeded<Blog[]>>(this.api.get("/blogs"));
  }

  async fetchBlogByIdAsync(id: string) {
    return await Result.handle<Failed | Succeeded<Blog>>(this.api.get(`/blogs/${id}`));
  }

  async createBlogAsync<Form extends Blog>(form: Form) {
    return await Result.handle<Failed | ValidationFailed<Form> | Succeeded<Blog>>(
      this.api.post("/blogs", form)
    );
  }

  async updateBlogAsync<Form extends Partial<Blog>>(id: string, form: Form) {
    return await Result.handle<Failed | ValidationFailed<Form> | Succeeded<Blog>>(
      this.api.put(`/blogs/${id}`, form)
    );
  }

  async deleteBlogAsync(id: string) {
    return await Result.handle<Failed | Succeeded>(this.api.delete(`/blogs/${id}`));
  }

  async uploadImageAsync(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    return await Result.handle<Failed | Succeeded<{ imageUrl: string }>>(
      this.api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  }
}
