export const parseApiData = (payload, fallback = null) => {
    const value =
        payload &&
        typeof payload === "object" &&
        Object.prototype.hasOwnProperty.call(payload, "data")
            ? payload.data
            : payload;

    if (value === undefined || value === null || value === "") {
        return fallback;
    }

    if (typeof value !== "string") {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch (error) {
        console.warn("Could not parse API payload:", error);
        return fallback;
    }
};

export const parseApiNumber = (payload, fallback = 0) => {
    const value = parseApiData(payload, fallback);

    if (value === undefined || value === null || value === "") {
        return fallback;
    }

    const number = typeof value === "number" ? value : Number(value);

    return Number.isFinite(number) ? number : fallback;
};
