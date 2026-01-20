import { makeAutoObservable, runInAction } from 'mobx';
import CryptoJS from 'crypto-js';

class VideoStore {
    videos = [];
    currentVideoIndex = 0;
    loading = false;
    following = new Set();
    feedType = 'forYou';

    constructor() {
        makeAutoObservable(this);
    }

    setFeedType(type) {
        this.feedType = type;
    }

    get filteredVideos() {
        if (this.feedType === 'following') {
            return this.videos.filter(v => this.following.has(v.author));
        }
        return this.videos;
    }

    async fetchVideos() {
        if (this.videos.length > 0) return;
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
        const newBatch = [
            {
                id: `v${Date.now()}-1`,
                url: 'https://res.cloudinary.com/dpgu9i9id/video/upload/v1705663674/samples/sea-turtle.mp4',
                author: 'nature_vibe',
                description: 'Beautiful sea turtle! 🐢 #nature',
                likes: 12500,
                isLiked: false,
                isSaved: false,
                comments: [
                    { id: 1, user: 'diver_pro', text: 'Amazing clarity!' }
                ],
                shares: 450,
                music: 'Salty Air - Nature'
            },
            {
                id: `v${Date.now()}-2`,
                url: 'https://res.cloudinary.com/dpgu9i9id/video/upload/v1705663674/samples/elephants.mp4',
                author: 'safari_explorer',
                description: 'Incredible giants. 🐘',
                likes: 8900,
                isLiked: false,
                isSaved: false,
                comments: [],
                shares: 120,
                music: 'African Sunset'
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
            isSaved: false,
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

    toggleSaved(videoId) {
        const video = this.videos.find(v => v.id === videoId);
        if (video) {
            video.isSaved = !video.isSaved;
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
