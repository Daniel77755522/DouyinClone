import { makeAutoObservable, runInAction } from 'mobx';
import CryptoJS from 'crypto-js';

class VideoStore {
    videos = [];
    currentVideoIndex = 0;
    loading = false;

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
                        likes: '1.2M',
                        comments: '12K',
                        shares: '45K'
                    },
                    {
                        id: 'v2',
                        url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-low-angle-shot-1579-large.mp4',
                        author: 'nature_vibe',
                        description: 'Peaceful morning in the woods. 🍂 #autumn #chill',
                        likes: '890K',
                        comments: '5K',
                        shares: '12K'
                    },
                    {
                        id: 'v3',
                        url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-blue-hair-dancing-42289-large.mp4',
                        author: 'blue_dancer',
                        description: 'New moves! Who wants a tutorial? 💃 #dance #trending',
                        likes: '2.5M',
                        comments: '40K',
                        shares: '150K'
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
