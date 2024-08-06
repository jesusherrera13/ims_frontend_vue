import { defineStore } from 'pinia';
// project imports
import axiosClient from '@/axios';
import type { Reply } from '@/types/apps/PostType';

export const usePostsStore = defineStore({
    id: 'post',
    state: () => ({
        posts: []
    }),
    getters: {},
    actions: {
        // Fetch Posts from action
        async fetchPosts() {
            /* try {
                const response = await axiosClient.get('/api/posts/list');
                this.posts = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            } */
        },
        // like post
        async likePost(postId: string) {
            /* try {
                const response = await axiosClient.post('/api/posts/list/like', { postId });
                this.posts = response.data.posts;
            } catch (error) {
                alert(error);
                console.log(error);
            } */
        },
        // add Comment
        async addComment(postId: string, comment: Reply) {
            /* try {
                const response = await axiosClient.post('/api/comments/add', { postId, comment });
                this.posts = response.data.posts;
            } catch (error) {
                alert(error);
                console.log(error);
            } */
        },
        // add Comment
        async addReply(postId: string, commentId: string, reply: Reply) {
            /* try {
                const response = await axiosClient.post('/api/replies/add', { postId, commentId, reply });
                this.posts = response.data.posts;
            } catch (error) {
                alert(error);
                console.log(error);
            } */
        }
    }
});
