const { PerformanceObserver, performance } = require('perf_hooks');

export const measure = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        const start = performance.now();
        const result = await originalMethod.apply(this, args);
        const finish = performance.now();
        console.log(`${propertyKey} Execution time: ${(finish - start) / 1000} seconds`);
        return result;
    };

    return descriptor;
};
