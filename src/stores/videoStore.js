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
        this.loading = true;
        try {
            // Simulated data from Tanx DAM / API
            const mockData = {
                items: [
                    {
                        id: 'v1',
                        url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-1282-large.mp4',
                        author: 'cyberpunk_queen',
                        description: 'Dancing in the neon lights #cyberpunk #future',
                        likes: 1200,
                        isLiked: false,
                        comments: [
                            { id: 1, user: 'techo_fan', text: 'This looks amazing!' },
                            { id: 2, user: 'neon_rider', text: 'Love the aesthetic.' }
                        ],
                        shares: 450,
                        music: 'Cyber Synth - Original Audio'
                    },
                    {
                        id: 'v2',
                        url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-low-angle-shot-1579-large.mp4',
                        author: 'nature_vibe',
                        description: 'Peaceful morning in the woods. 🍂 #autumn #chill',
                        likes: 890,
                        isLiked: false,
                        comments: [
                            { id: 3, user: 'leaf_lover', text: 'So relaxing.' }
                        ],
                        shares: 120,
                        music: 'Nature Sounds - Relaxing Mix'
                    },
                    {
                        id: 'v3',
                        url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-blue-hair-dancing-42289-large.mp4',
                        author: 'blue_dancer',
                        description: 'New moves! Who wants a tutorial? 💃 #dance #trending',
                        likes: 2500,
                        isLiked: true,
                        comments: [],
                        shares: 1540,
                        music: 'Top Hits 2024 - Dance Remix'
                    }
                ]
            };

            runInAction(() => {
                this.videos = mockData.items.map(item => ({
                    ...item,
                    secureId: CryptoJS.AES.encrypt(item.id, 'secret-key-123').toString()
                }));
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            });
            console.error('Failed to fetch videos', error);
        }
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
