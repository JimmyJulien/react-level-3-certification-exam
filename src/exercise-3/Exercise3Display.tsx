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
    <>
      <div>
        <p style={{ marginTop: 0, fontWeight: 500 }}>User : </p>
        <pre style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {JSON.stringify(selectedUser, null, 2)}
        </pre>
      </div>

      <div>
        <p style={{ marginTop: 0, fontWeight: 500 }}>Post : </p>
        <pre style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {JSON.stringify(selectedPost, null, 2)}
        </pre>
      </div>
    </>
  );
}
