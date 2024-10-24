import styles from './CommentComponent.module.css';

function CommentComponent({ content, createdAt, user }) {
    return (
        <div className={styles.comment}>
            <div className={styles.header}>
                <img src={user.pictureURL} alt={`${user.username}'s avatar`} className={styles.avatar} />

                <div className={styles.userInfo}>
                    <h4>{user.username}</h4>
                    
                    <p>{new Date(createdAt).toLocaleString()}</p>
                </div>
            </div>

            <p className={styles.content}>{content}</p>
        </div>
    );
}

export default CommentComponent;
