// /src/utils/formatDate.js
export function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString(); // 或依據你的需求做其他格式化
}
