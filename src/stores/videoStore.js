import { makeAutoObservable, runInAction } from 'mobx';
import CryptoJS from 'crypto-js';

class VideoStore {
    videos = [];
    currentVideoIndex = 0;
    loading = false;
    following = new Set(); // Set of author names user follows

    constructor() {
        makeAutoObservable(this);
    }

    async fetchVideos() {
        if (this.videos.length > 0) return; // Don't fetch if already have videos
        this.loading = true;
        try {
            await this.loadMoreVideos();
        } catch (error) {
            console.error('Failed to fetch videos', error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    async loadMoreVideos() {
        // Simulating loading a new "page" of videos
        const newBatch = [
            {
                id: `v${Date.now()}-1`,
                url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-1282-large.mp4',
                author: 'cyberpunk_queen',
                description: 'More neon vibes! #future',
                likes: Math.floor(Math.random() * 5000),
                isLiked: false,
                comments: [],
                shares: 100,
                music: 'Cyber Synth v2'
            },
            {
                id: `v${Date.now()}-2`,
                url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-low-angle-shot-1579-large.mp4',
                author: 'nature_vibe',
                description: 'Seasonal changes. 🍃',
                likes: Math.floor(Math.random() * 2000),
                isLiked: false,
                comments: [],
                shares: 50,
                music: 'Calm Piano'
            }
        ];

        runInAction(() => {
            this.videos = [...this.videos, ...newBatch];
        });
    }

    uploadVideo(videoFile, description) {
        const newVideo = {
            id: `user-${Date.now()}`,
            url: URL.createObjectURL(videoFile),
            author: 'Daniel77755522',
            description: description,
            likes: 0,
            isLiked: false,
            comments: [],
            shares: 0,
            music: 'Original Sound - Daniel77755522'
        };
        runInAction(() => {
            this.videos = [newVideo, ...this.videos];
        });
    }

    toggleLike(videoId) {
        const video = this.videos.find(v => v.id === videoId);
        if (video) {
            video.isLiked = !video.isLiked;
            video.likes += video.isLiked ? 1 : -1;
        }
    }

    toggleFollow(author) {
        if (this.following.has(author)) {
            this.following.delete(author);
        } else {
            this.following.add(author);
        }
    }

    nextVideo() {
        if (this.currentVideoIndex < this.videos.length - 1) {
            this.currentVideoIndex++;
        }
    }

    prevVideo() {
        if (this.currentVideoIndex > 0) {
            this.currentVideoIndex--;
        }
    }
}

export const videoStore = new VideoStore();
