import type { Post, Comment, Image } from "../types/Models";

const API_BASE_URL: string = "http://localhost:3000/api/client";

// 取得所有文章
export async function getPublishedPosts(): Promise<Post[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/blogs`);
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.status}`);
        }
        return (await response.json()) as Post[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in getPublishedPosts:", error.message);
        } else {
            console.error("Unknown error in getPublishedPosts");
        }
        return [];
    }
}

// 取得單篇文章
export async function getPostById(postId: string): Promise<Post | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/blogs/${postId}`);
        if (!response.ok) {
            throw new Error(
                `Error fetching post ${postId}: ${response.status}`
            );
        }
        return (await response.json()) as Post;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(
                `Error in getPublishedPostById (${postId}):`,
                error.message
            );
        } else {
            console.error(`Unknown error in getPublishedPostById (${postId})`);
        }
        return null;
    }
}

// 取得文章留言
export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/blogs/${postId}/comments`
        );
        if (!response.ok) {
            throw new Error(
                `Error fetching comments for post ${postId}: ${response.status}`
            );
        }
        return (await response.json()) as Comment[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(
                `Error in getCommentsByPostId (${postId}):`,
                error.message
            );
        } else {
            console.error(`Unknown error in getCommentsByPostId (${postId})`);
        }
        return [];
    }
}

// 使用標籤搜尋文章
export async function getPublishedPostsByTag(tag: string): Promise<Post[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/tags/${tag}`);
        if (!response.ok) {
            throw new Error(
                `Error fetching posts with tag ${tag}: ${response.status}`
            );
        }
        return (await response.json()) as Post[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(
                `Error in getPublishedPostsByTag (${tag}):`,
                error.message
            );
        } else {
            console.error(`Unknown error in getPublishedPostsByTag (${tag})`);
        }
        return [];
    }
}

// 取得所有標籤
export async function getAllPublishedTags(): Promise<string[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/tags`);
        if (!response.ok) {
            throw new Error(`Error fetching tags: ${response.status}`);
        }
        return (await response.json()) as string[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in getAllPublishedTags:", error.message);
        } else {
            console.error("Unknown error in getAllPublishedTags");
        }
        return [];
    }
}

// 新增留言
export async function addComment(
    postId: string,
    author: string,
    content: string
): Promise<void> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/blogs/${postId}/comments`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author, content }),
            }
        );
        if (!response.ok) {
            throw new Error(
                `Error adding comment for post ${postId}: ${response.status}`
            );
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in addComment (${postId}):`, error.message);
        } else {
            console.error(`Unknown error in addComment (${postId})`);
        }
    }
}

// 獲取圖片
export async function fetchImages(): Promise<Image[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/images`);
        if (!response.ok) {
            throw new Error(`Error fetching images: ${response.status}`);
        }
        return (await response.json()) as Image[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in fetchImages:", error.message);
        } else {
            console.error("Unknown error in fetchImages");
        }
        throw new Error("Failed to fetch images");
    }
}
