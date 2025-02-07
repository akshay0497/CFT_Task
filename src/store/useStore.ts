import { create } from 'zustand';

export const useStore = create<any>((set:any) => ({
  posts: [],
  loading: true,
  viewMode: 'list',
  setPosts: (posts :any) => set({ posts }),
  setLoading: (loading :any) => set({ loading }),
  toggleViewMode: () => set((state : any) => ({ viewMode: state.viewMode === 'grid' ? 'list' : 'grid' })),
  removePost: (id :any) => set((state :any) => ({
    posts: state.posts.filter((post :any) => post.id !== id)
  })),
}));