import { useState } from 'react';

export default function NewThreadForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '', // Default category
        content: ''
    });

    // Predefined categories
    const categories = [
        'Gym Facilities',
        'Nutrition',
        'Workout Plans',
        'Membership',
        'General'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ title: '', author: '', category: '', content: '' });
    };

    return (
        <div className="new-thread-form">
            <h3>Ask a New Question</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <input
                    type="text"
                    className="form-input"
                    placeholder="Your Name"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                />
                <select
                    className="form-input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                >
                    <option value="" disabled>Select a Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <textarea
                    className="form-input"
                    placeholder="Your Question"
                    rows="4"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                />
                <button type="submit" className="submit-btn">Post Question</button>
            </form>
        </div>
    );
}