export default function ThreadCard({ thread, onClick }) {
    return (
        <div className="thread-card" onClick={onClick}>
            <div className="thread-header">
                <h3>{thread.title}</h3>
                <span className="category-tag">{thread.category}</span>
            </div>
            <div className="user-info">
                {thread.author} - Asked in {thread.category} • {thread.time}
            </div>
            <div className="thread-content">
                {thread.content}
            </div>
        </div>
    );
}