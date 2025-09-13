export function cast<T>(arg: any): T {
    return arg as T;
}

export function shortUid(seed: any, length: number = 6): string {
    // Convert input to string if it's not already
    const inputStr = typeof seed === "object" ? JSON.stringify(seed) : String(seed);

    // Create a hash from the input string
    let hash = 0;
    for (let i = 0; i < inputStr.length; i++) {
        const char = inputStr.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    hash = Math.abs(hash);
    const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let shortId = "";

    // Generate 6 characters (adjust length as needed between 5-8)
    const idLength = length;
    for (let i = 0; i < idLength; i++) {
        shortId += charset[hash % charset.length];
        hash = Math.floor(hash / charset.length);
    }

    return shortId.toLocaleLowerCase();
}
