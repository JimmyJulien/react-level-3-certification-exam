import type { Post } from './Post';
import type { User } from './User';

interface Exercise3DisplayProps {
  selectedUser: User | null;
  selectedPost: Post | null;
}

export function Exercise3Display({
  selectedUser,
  selectedPost,
}: Exercise3DisplayProps) {
  return (
    <div>
      <div>
        <label htmlFor="user-value">User : </label>
        <pre
          id="user-value"
          style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {JSON.stringify(selectedUser, null, 2)}
        </pre>
      </div>

      <div>
        <label htmlFor="post-value">Post : </label>
        <pre
          id="post-value"
          style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {JSON.stringify(selectedPost, null, 2)}
        </pre>
      </div>
    </div>
  );
}
