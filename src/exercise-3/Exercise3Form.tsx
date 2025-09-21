import { useEffect, useState } from 'react';
import { AutoFilterDropdown } from './autofilter-dropdown/AutoFilterDropdown';
import { AutoFilterDropdownInput } from './autofilter-dropdown/AutoFilterDropdownInput';
import { AutoFilterDropdownOption } from './autofilter-dropdown/AutoFilterDropdownOption';
import { AutoFilterDropdownOptionList } from './autofilter-dropdown/AutoFilterDropdownOptionList';
import { AutoFilterDropdownOptionText } from './autofilter-dropdown/AutoFilterDropdownOptionText';
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

  return (
    <form>
      <div className="form-field">
        <label htmlFor="user">User</label>
        <AutoFilterDropdown
          filterProperty="name"
          id="user"
          valueChange={onUserChange}
        >
          <AutoFilterDropdownInput />
          <AutoFilterDropdownOptionList>
            {(users ?? []).map((user) => (
              <AutoFilterDropdownOption
                key={user.id}
                option={user}
                title={user.name}
              >
                <AutoFilterDropdownOptionText text={user.name} />
              </AutoFilterDropdownOption>
            ))}
          </AutoFilterDropdownOptionList>
        </AutoFilterDropdown>
      </div>

      <div className="form-field">
        <label htmlFor="post">Post</label>
        <AutoFilterDropdown
          filterProperty="title"
          id="post"
          valueChange={onPostChange}
        >
          <AutoFilterDropdownInput />
          <AutoFilterDropdownOptionList>
            {(posts ?? []).map((post) => (
              <AutoFilterDropdownOption
                key={post.id}
                option={post}
                title={post.title}
              >
                <AutoFilterDropdownOptionText text={post.title} />
              </AutoFilterDropdownOption>
            ))}
          </AutoFilterDropdownOptionList>
        </AutoFilterDropdown>
      </div>
    </form>
  );
}
