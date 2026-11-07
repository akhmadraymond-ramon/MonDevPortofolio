import { useState, useEffect } from 'react';

function TypingText() {
    const words = [
        'Front-End Developer',
        'Back-End Developer',
        'Fullstack Developer'
    ];

    const [index, setIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[index];

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && text === currentWord) {
            delay = 1500;
        }

        if (isDeleting && text === '') {
            delay = 300;
        }

        const timer = setTimeout(() => {
            if (!isDeleting && text === currentWord) {
                setIsDeleting(true);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setIndex((index + 1) % words.length);
            } else if (isDeleting) {
                setText(currentWord.substring(0, text.length - 1));
            } else {
                setText(currentWord.substring(0, text.length + 1));
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [text, isDeleting, index]);

    return (
        <div className="typing-text">
            <span>{text}</span>
            <span className="cursor">|</span>
        </div>
    );
}

export default TypingText;