export const generateWeeks = (notes, year, month) => {
    let currentDate = new Date(year, month, 1);
    let weekday = currentDate.getDay() - 1;
    if (weekday < 0)
        weekday = 6;

    let weeks = [];
    let currentWeekNumber = 1;

    let days = [];
    for (let i = 0; i < weekday; i++) {
        days.push({
            id: `prevMonth${i}`,
            notes: [],
        })
    }

    while (currentDate.getMonth() === month) {
        let month2 = (month+1).toString().padStart(2,"0");
        let day2 = currentDate.getDate().toString().padStart(2,"0");
        let filterDate = `${year}${month2}${day2}`;
        days.push({
            id: currentDate.toISOString(),
            day: `${currentDate.getDate()}`,
            date: `${year}-${month2}-${day2}`,
            notes: notes.filter((note) => note.date === filterDate).sort(
                (a,b)=> (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0)
            ),
        });
        currentDate.setDate(currentDate.getDate() + 1);
        weekday++;
        if (weekday === 7) {
            weekday = 0;
            weeks.push({
                id: `-${year}-${month}-${currentWeekNumber}`,
                days: days,
            });
            currentWeekNumber++;
            days = [];
        }
    }
    if (days.length > 0) {
        const nextMonthDays = 7 - days.length;
        for (let i = 0; i < nextMonthDays; i++) {
            days.push({
                id: `nextMonth${i}`,
                notes: [],
            })
        }
        weeks.push({
                id: `-${year}-${month}-${currentWeekNumber}`,
                days: days,
            });
    }

    return weeks;
};