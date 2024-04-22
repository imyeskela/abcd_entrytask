import { encoded, translations } from "./data.js";

const decoding = (encoded, translations) => {
    const decodedList = [];

    const decodeField = (field) => {
        return translations[field] ? translations[field] : field;
    };
    encoded.forEach((element) => {
        const decodeElement = {};
        Object.keys(element).forEach((key) => {
            if (
                key.endsWith("Id") &&
                !["groupId", "service", "formatSize", "ca"].includes(key)
            ) {
                decodeElement[key] = decodeField(element[key]);
            } else {
                decodeElement[key] = element[key];
            }
        });
        decodedList.push(decodeElement);
    });
    return decodedList;
};

const uniqueIds = (encoded) => {
    const valueCounts = {};
    encoded.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
            if (key.endsWith("Id"))
                valueCounts[obj[key]] = (valueCounts[obj[key]] || 0) + 1;
        });
    });
    const uniqueValues = Object.entries(valueCounts)
        .filter(([value, count]) => count === 1)
        .map(([value]) => value);
    return uniqueValues;
};

const decodedData = decoding(encoded, translations);
const uniqueValues = uniqueIds(encoded);

console.log("Let's rock");

console.log(decodedData);
console.log(uniqueValues);
