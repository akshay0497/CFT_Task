import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { X } from 'lucide-react';

export const PostCard = ({ title, body, onRemove, viewMode } : any) => {
  return (
    <Card className={`relative hover:shadow-lg transition-shadow ${viewMode === 'grid' ? 'h-64' : 'h-auto'}`}>
      <IconButton
        onClick={onRemove}
        className="absolute top-2 right-2 z-10"
        sx={{
          backgroundColor: 'rgb(239 68 68)',
          '&:hover': {
            backgroundColor: 'rgb(220 38 38)',
          },
          width: '24px',
          height: '24px',
          padding: '4px',
          minWidth: '24px',
          position: 'absolute',
          right: '8px',
          top: '8px'
        }}
        size="small"
      >
        <X className="text-white" size={16} />
      </IconButton>
      <CardContent>
        <Typography variant="h6" className="mb-2 line-clamp-2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="line-clamp-4">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};