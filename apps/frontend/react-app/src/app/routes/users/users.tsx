import styles from './users.module.css';

/* eslint-disable-next-line */
export interface UsersProps {}

export function Users(props: UsersProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Users!</h1>
    </div>
  );
}

export default Users;
