export interface Comment {
    id: string;
    postId: string;
    post?: Post;
    author: string;
    content: string;
    createdAt: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    tags: string[];
    published: boolean;
    createdAt: string;
    updatedAt: string;
    comments: Comment[];
}

export interface Image {
    id: string;
    url: string;
    createdAt: string;
}
