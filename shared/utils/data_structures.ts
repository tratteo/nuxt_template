export function listGenerate<T>(length: number, generator: (i: number) => T): T[] {
    const list: T[] = [];
    for (let i = 0; i < length; i++) {
        list.push(generator(i));
    }
    return list;
}

export function count<T>(arr: T[], iteratee: (el: T) => boolean): number {
    return arr.filter(iteratee).length;
}

export function swap<T>(coll: T[], a: number, b: number) {
    const tmp = coll[a];
    coll[a] = coll[b]!;
    coll[b] = tmp!;
}

export function pickRandom<T>(collection: T[] | null | undefined, amount: number): T[] {
    if (collection === null || collection === undefined) return [];
    if (collection.length <= amount) return collection;
    var res: T[] = [];
    var indexes = listGenerate(amount, (i) => i);
    do {
        const index = indexes.at(Math.floor(Math.random() * indexes.length));
        const el = collection.at(index!);
        res.push(el!);
        indexes = indexes.filter((i) => i !== index);
    } while (res.length < amount && indexes.length > 0);
    return res;
}

export function flattenDeep<T>(items: T[], iteratee: (arg: T) => T[] | undefined) {
    const flatten: T[] = [];
    for (const e of items) {
        const childrens = [e];
        while (childrens.length > 0) {
            const current = childrens.shift();
            if (!current) continue;
            flatten.push(current);
            childrens.push(...(iteratee(current) ?? []));
        }
    }
    return flatten;
}
