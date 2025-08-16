export default function formatNumber(number: number) {
    const formatter = new Intl.NumberFormat('en', {
        notation: 'compact',
        compactDisplay: 'short'
    });

    return formatter.format(number);
}