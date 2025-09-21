import { useState } from 'react';
import { Exercise3Display } from './Exercise3Display';
import { Exercise3Form } from './Exercise3Form';
import type { Post } from './Post';
import type { User } from './User';

export function Exercise3() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <section aria-labelledby="exercise-3">
      <h2 id="exercise-3">Exercise 3</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'calc(25vw - 3rem) calc(75vw - 3rem)',
          gap: '3rem',
        }}
      >
        <Exercise3Form
          selectUser={setSelectedUser}
          selectPost={setSelectedPost}
        />

        <Exercise3Display
          selectedPost={selectedPost}
          selectedUser={selectedUser}
        />
      </div>
    </section>
  );
}
