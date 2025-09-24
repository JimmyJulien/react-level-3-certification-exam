import { useEffect, useState } from 'react';
import { AutoFilterDropdownV1 } from './auto-filter-dropdown/v1/AutoFilterDropdownV1';
import { AutoFilterDropdownV2 } from './auto-filter-dropdown/v2/AutoFilterDropdownV2';
import { AutoFilterDropdownV2Input } from './auto-filter-dropdown/v2/AutoFilterDropdownV2Input';
import { AutoFilterDropdownV2Option } from './auto-filter-dropdown/v2/AutoFilterDropdownV2Option';
import { AutoFilterDropdownV2OptionList } from './auto-filter-dropdown/v2/AutoFilterDropdownV2OptionList';
import { AutoFilterDropdownV2OptionText } from './auto-filter-dropdown/v2/AutoFilterDropdownV2OptionText';
import type { ApiPost, Post } from './Post';
import type { ApiUser, User } from './User';

interface Exercise3FormProps {
  selectUser: (user: User | null) => void;
  selectPost: (post: Post | null) => void;
}

export function Exercise3Form({ selectUser, selectPost }: Exercise3FormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function defineUsers() {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );

      if (!response.ok) {
        console.error(`Error fetching users`);
        setUsers([]);
        return;
      }

      const apiUsers: ApiUser[] = await response.json();

      const users: User[] = apiUsers.map((apiUser) => ({
        email: apiUser.email,
        id: String(apiUser.id),
        name: apiUser.name,
        username: apiUser.username,
      }));

      setUsers(users);
    }

    defineUsers();
  }, []);

  async function onUserChange(user: User | null) {
    selectUser(user);

    if (!user) {
      setPosts([]);
      return;
    }

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`,
    );

    if (!response.ok) {
      console.error(`Error fetching posts`);
      setPosts([]);
      return;
    }

    const apiPosts: ApiPost[] = await response.json();

    const posts: Post[] = apiPosts.map((apiPost) => ({
      body: apiPost.body,
      id: String(apiPost.id),
      title: apiPost.title,
    }));

    setPosts(posts);
  }

  async function onPostChange(post: Post | null) {
    selectPost(post);
  }

  // Exercise 3 - spec 7
  return (
    <form>
      {users.length > 0 && (
        <div className="form-field">
          <label htmlFor="user">User</label>
          <AutoFilterDropdownV1
            filterProperty="name"
            id="user"
            options={users}
            valueChange={onUserChange}
          />
        </div>
      )}

      {posts.length > 0 && (
        <div className="form-field">
          <label htmlFor="post">Post</label>
          <AutoFilterDropdownV2
            filterProperty="title"
            id="post"
            valueChange={onPostChange}
          >
            <AutoFilterDropdownV2Input />
            <AutoFilterDropdownV2OptionList>
              {(posts ?? []).map((post) => (
                <AutoFilterDropdownV2Option
                  key={post.id}
                  option={post}
                  title={post.title}
                >
                  <AutoFilterDropdownV2OptionText text={post.title} />
                </AutoFilterDropdownV2Option>
              ))}
            </AutoFilterDropdownV2OptionList>
          </AutoFilterDropdownV2>
        </div>
      )}
    </form>
  );
}
