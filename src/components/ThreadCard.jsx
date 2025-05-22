import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function ThreadCard({ thread, onClick, onEdit, isEditing, onCancelEdit }) {
    const [editedContent, setEditedContent] = useState(thread.content);
    const [editedTitle, setEditedTitle] = useState(thread.title);
    const [editedCategory, setEditedCategory] = useState(thread.category);

    const formatTime = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit(thread._id, {
            title: editedTitle,
            content: editedContent,
            category: editedCategory
        });
    };

    const handleCancel = (e) => {
        e.stopPropagation();
        setEditedContent(thread.content);
        setEditedTitle(thread.title);
        setEditedCategory(thread.category);
        onCancelEdit();
    };

    if (isEditing) {
        return (
            <div className="thread-card editing" onClick={(e) => e.stopPropagation()}>
                <div className="edit-form">
                    <input
                        type="text"
                        className="form-input"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <select
                        className="form-input"
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                    >
                        <option value="Gym Facilities">Gym Facilities</option>
                        <option value="Nutrition">Nutrition</option>
                        <option value="Workout Plans">Workout Plans</option>
                        <option value="Membership">Membership</option>
                        <option value="General">General</option>
                    </select>
                    <textarea
                        className="form-input"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        placeholder="Content"
                        rows="4"
                    />
                    <div className="edit-actions">
                        <button className="save-btn" onClick={handleEdit}>Save</button>
                        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="thread-card" onClick={onClick}>
            <div className="thread-header">
                <h3>{thread.title}</h3>
                <span className="category-tag">{thread.category}</span>
            </div>
            <div className="user-info">
                {thread.author} • {formatTime(thread.createdAt)}
                {thread.likes > 0 && <span className="likes"> • {thread.likes} likes</span>}
            </div>
            <div className="thread-content">
                {thread.content}
            </div>
            {thread.comments && thread.comments.length > 0 && (
                <div className="comments-preview">
                    {thread.comments.length} {thread.comments.length === 1 ? 'comment' : 'comments'}
                </div>
            )}
        </div>
    );
}