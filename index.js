const express = require('express');
const app = express();

app.use(express.json());

let posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'Content 1',
    comments: []
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'Content 2',
    comments: []
  }
];


app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', (req, res) => {
  const { id, title, content } = req.body;
  const newPost = {
    id,
    title,
    content,
    comments: []
  };
  posts.push(newPost);
  res.json(newPost);
});

app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
  } else {
    res.json(post);
  }
});

app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex === -1) {
    res.status(404).json({ error: 'Post not found' });
  } else {
    posts.splice(postIndex, 1);
    res.json({ message: 'Post deleted' });
  }
});


app.post('/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id);
  const { content } = req.body;
  const post = posts.find(post => post.id === postId);
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
  } else {
    const newComment = {
      id: Math.floor(Math.random()*10),
      content
    };
    post.comments.push(newComment);
    res.json(newComment);
  }
});

app.get('/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
  } else {
    res.json(post.comments);
  }
});

app.get('/posts/:postId/comments/:commentId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);
  const post = posts.find(post => post.id === postId);
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
  } else {
    const comment = post.comments.find(comment => comment.id === commentId);
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
    } else {
      res.json(comment);
    }
  }
});


app.delete('/posts/:postId/comments/:commentId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);
  const post = posts.find(post => post.id === postId);
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
  } else {
    const commentIndex = post.comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) {
      res.status(404).json({ error: 'Comment not found' });
    } else {
      post.comments.splice(commentIndex, 1);
      res.json({ message: 'Comment deleted' });
    }
  }
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
