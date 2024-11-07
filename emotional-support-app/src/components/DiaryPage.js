import React, { useState } from 'react';

function DiaryPage() {
    const [diaryEntries, setDiaryEntries] = useState([
        { id: 1, category: '恋情不顺利', text: '最近和伴侣有些矛盾，感觉很迷茫。', timestamp: '2024-11-07' },
        { id: 2, category: '学业压力很大', text: '课程压力真的很大，尤其是期末考。', timestamp: '2024-11-06' },
    ]);

    const [newEntry, setNewEntry] = useState({ category: '', text: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEntry({ ...newEntry, [name]: value });
    };

    const addEntry = () => {
        if (newEntry.category && newEntry.text) {
            setDiaryEntries([
                ...diaryEntries,
                {
                    id: diaryEntries.length + 1,
                    category: newEntry.category,
                    text: newEntry.text,
                    timestamp: new Date().toISOString().split('T')[0]
                }
            ]);
            setNewEntry({ category: '', text: '' });
        }
    };

    return (
        <div className="app-container" style={{ backgroundColor: '#321450', color: '#FFF', height: '100vh', padding: '20px' }}>
            <h1>我的心事日记</h1>
            <p>记录你的每一天，反思过去，展望未来</p>

            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newEntry.category}
                    onChange={handleInputChange}
                    style={{ marginRight: '5px' }}
                />
                <input
                    type="text"
                    name="text"
                    placeholder="Entry text"
                    value={newEntry.text}
                    onChange={handleInputChange}
                    style={{ marginRight: '5px' }}
                />
                <button onClick={addEntry}>Add Entry</button>
            </div>

            <div className="diary-entries" style={{ marginTop: '20px' }}>
                {diaryEntries.map((entry) => (
                    <div key={entry.id} className="diary-entry" style={{ border: '1px solid #FFF', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                        <h3>{entry.category}</h3>
                        <p>{entry.text}</p>
                        <p style={{ fontSize: '0.8em', color: '#BBB' }}>{entry.timestamp}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiaryPage;