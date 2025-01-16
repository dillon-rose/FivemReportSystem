import { Time } from "@common/types";

const oneDay = 1000 * 60 * 60 * 24;
const oneWeek = oneDay * 7;

/**
 * looks through the given array and adds up the times in to time slots.
 * If the given time is Months then this function will return a length 4
 * array with a count of each time that fit into the last month. This is
 * to be used with the line charts.
*/
export function sortArrayToTimeSlots (dateArray: number[], time: Time) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentDayOfWeek = currentDate.getDay();
    let timeSlotArray;

    if (time === Time.MONTH) {
        timeSlotArray = [0, 0, 0, 0];
        
        const fourWeeksAgo = new Date(currentDate);
        fourWeeksAgo.setHours(0, 0, 0, 0);
        fourWeeksAgo.setDate(currentDate.getDate() - currentDayOfWeek - 21);

        for (let i = 0; i < dateArray.length; i++) {
            const date = new Date(dateArray[i]);
            date.setHours(0, 0, 0, 0);
            const dayOfWeek = date.getDay();
            const startOfWeekDate = new Date(date);
            startOfWeekDate.setDate(date.getDate() - dayOfWeek);
            startOfWeekDate.setHours(0, 0, 0, 0)
            const normilizedDate = startOfWeekDate.getTime() - fourWeeksAgo.getTime();

            if (normilizedDate < 0) {
                continue;
            }

            const timeArrayIndex = Math.floor(normilizedDate / oneWeek)
            timeSlotArray[timeArrayIndex]++;
        }
    }
    else {
        timeSlotArray = [0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 0; i < dateArray.length; i++) {
            const date = new Date(dateArray[i]);
            date.setHours(0, 0, 0, 0);
            const oneWeekAgo = new Date(currentDate);
            oneWeekAgo.setDate(currentDate.getDate() - 6);
            const normilizedDate = date.getTime() - oneWeekAgo.getTime();

            if (normilizedDate < 0) {
                continue;
            }

            const timeArrayIndex = Math.floor(normilizedDate / oneDay)
            timeSlotArray[timeArrayIndex]++;
        } 
    }

    return timeSlotArray;
}