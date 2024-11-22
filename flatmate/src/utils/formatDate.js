export function formatDate(createdAt) {
    const now = new Date();
    const postDate = new Date(createdAt);
    
    // Check if the post was uploaded today
    if (now.toDateString() === postDate.toDateString()) {
      // Post was uploaded today, show 'Today' with time
      return `Today, ${postDate.toLocaleTimeString()}`;
    }
  
    // Check if the post was uploaded yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (yesterday.toDateString() === postDate.toDateString()) {
      // Post was uploaded yesterday, show 'Yesterday'
      return 'Yesterday';
    }
  
    // If post is from earlier, show the full date
    return postDate.toDateString();
  }