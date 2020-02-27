const toTitleCase = (text) =>
    text.split(' ')
        .map((word) => {
            const firstLetter = word.substring(0, 1).toUpperCase();
            const rest = word.substring(1).toLowerCase();
            return `${firstLetter}${rest}`;
        })
        .join(' ');

module.exports = toTitleCase;
