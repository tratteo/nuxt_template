import l from "lodash";

export function stdv(elems: number[]): number {
    var avg = l.mean(elems);
    return Math.sqrt(l.mean(l.map(elems, (e) => Math.pow(e - avg, 2))));
}
export function remap(v: number, domain: [number, number], newDomain: [number, number]): number {
    return newDomain[0] + (v - domain[0]) * ((newDomain[1] - newDomain[0]) / (domain[1] - domain[0]));
}
export function lerp(value: number, target: number, t: number) {
    t = l.clamp(t, 0, 1);
    return value + (target - value) * t;
}
export function linspace(start: number, stop: number, points: number, endpoint: boolean = true) {
    const div = endpoint ? points - 1 : points;
    const step = (stop - start) / div;
    return Array.from({ length: points }, (_, i) => start + step * i);
}

export function percentDiff(a: number, b: number) {
    return (Math.abs(a - b) / ((a + b) / 2)) * 100;
}

export function intervalRatio(value: number, domain: [number, number]): number {
    value = l.clamp(value, domain[0], domain[1]);
    return (value - domain[0]) / (domain[1] - domain[0]);
}
export function averageTrend(elems: number[]): number[] {
    let sum: number = 0;
    let avg: number = 0;
    let trend: number[] = [];
    let notNan: number = 0;
    for (let i = 0; i < elems.length; i++) {
        const element = elems[i];
        if (element !== undefined && isNaN(element)) {
            trend.push(avg);
            continue;
        }
        notNan++;
        sum += element!;
        avg = sum / notNan;
        trend.push(avg);
    }
    return trend;
}
