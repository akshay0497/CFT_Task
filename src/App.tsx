import { useEffect, useState } from 'react';
import { Button, Container, Grid } from '@mui/material';
import { LayoutGrid, List } from 'lucide-react';
import { PostCard } from './components/PostCard';
import { Pagination } from './components/Pagination';
import { FeedbackForm } from './components/FeedbackForm';
import { useStore } from './store/useStore';
import { HOST_URL } from './config/url';
import axios from 'axios';

function App() {
  const { posts, loading, viewMode, setPosts, setLoading, toggleViewMode, removePost } = useStore();
  const [page, setPage] = useState(1);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(HOST_URL);
        const data = response?.data
        setTimeout(() => {
          setPosts(data);
          setLoading(false);
        }, 5000);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [setPosts, setLoading]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const getCurrentPosts = () => {
    const startIndex = (page - 1) * postsPerPage;
    return posts.slice(startIndex, startIndex + postsPerPage);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <div className="flex justify-between mb-6">
        <Button
          variant="contained"
          onClick={toggleViewMode}
          startIcon={viewMode === 'grid' ? <List /> : <LayoutGrid />}
        >
          {viewMode === 'grid' ? 'List View' : 'Grid View'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setFeedbackOpen(true)}
        >
          Feedback
        </Button>
      </div>

      <Grid container spacing={3}>
        {getCurrentPosts().map((post: any) => (
          <Grid
            item
            key={post.id}
            xs={12}
            md={viewMode === 'grid' ? 4 : 12}
          >
            <PostCard
              title={post.title}
              body={post.body}
              onRemove={() => removePost(post.id)}
              viewMode={viewMode}
            />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(posts.length / postsPerPage)}
        page={page}
        onChange={handlePageChange}
      />

      <FeedbackForm
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
    </Container>
  );
}

export default App;