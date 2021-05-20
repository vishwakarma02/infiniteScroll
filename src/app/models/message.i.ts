export interface Message {
    author: {
        name: string;
        photoUrl: string;
    };
    content: string;
    id: number;
    updated: string;
}