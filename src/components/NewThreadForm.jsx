import { useState } from 'react';

export default function NewThreadForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        content: ''
    });
    const [error, setError] = useState(null);

    // Predefined categories
    const categories = [
        'Gym Facilities',
        'Nutrition',
        'Workout Plans',
        'Membership',
        'General'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Validate form data
            if (!formData.title.trim() || !formData.content.trim()) {
                throw new Error('Title and content are required');
            }

            // Call the parent component's onSubmit function
            await onSubmit(formData);
            
            // Reset form
            setFormData({
                title: '',
                author: '',
                category: '',
                content: ''
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="new-thread-form">
            <h3>Ask a New Question</h3>
            {error && <div className="error-message">{error}</div>}
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