// src/calendars/calendar.ts
import { GranularityData } from "../granularity/granularityData";
import { Utils } from "../utils";
import { WeekStandard } from "./weekStandard";
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);

interface IDateDictionary {
    [year: number]: Date;
}

export interface IPeriodDates {
    startDate: Date;
    endDate: Date;
}

export interface CalendarFormat {
    month: number;
    day: number;
}

export interface WeekdayFormat {
    daySelection: boolean;
    day: number;
}

export class Calendar {
    private static persianMonthNames: string[] = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

    protected firstDayOfWeek: number;
    protected firstMonthOfYear: number;
    protected firstDayOfYear: number;
    protected dateOfFirstWeek: IDateDictionary;
    protected dateOfFirstFullWeek: IDateDictionary;
    protected quarterFirstMonths: number[];
    protected isDaySelection: boolean;
    protected EmptyYearOffset: number = 0;
    protected YearOffset: number = 1;

    constructor(calendarFormat: CalendarFormat, weekDaySettings: WeekdayFormat) {
        this.isDaySelection = weekDaySettings.daySelection;
        this.firstDayOfWeek = weekDaySettings.day;
        this.firstMonthOfYear = calendarFormat.month;
        this.firstDayOfYear = calendarFormat.day;

        this.dateOfFirstWeek = {};
        this.dateOfFirstFullWeek = {};

        const quarterFirstMonths = [0, 3, 6, 9];
        this.quarterFirstMonths = quarterFirstMonths.map((monthIndex: number) => {
            return monthIndex + this.firstMonthOfYear;
        });
    }

    // تبدیل تاریخ میلادی به سال شمسی
    public getJalaliYear(date: Date): number {
        return dayjs(date).calendar('jalali').year();
    }

    public getMonthName(monthIndex: number): string {
        return Calendar.persianMonthNames[monthIndex] || "";
    }

    public getFiscalYearAdjustment(): number {
        const firstMonthOfYear = this.getFirstMonthOfYear();
        const firstDayOfYear = this.getFirstDayOfYear();
        return ((firstMonthOfYear === 0 && firstDayOfYear === 1) ? 0 : 1);
    }

    public determineYear(date: Date): number {
        return this.getJalaliYear(date) + this.getFiscalYearAdjustment();
    }

    public determineWeek(date: Date): number[] {
        const year: number = this.determineYear(date);
        const fiscalYearAdjustment = this.getFiscalYearAdjustment();
        const dateOfFirstWeek: Date = this.getDateOfFirstWeek(year - fiscalYearAdjustment);
        const dateOfFirstFullWeek: Date = this.getDateOfFirstFullWeek(year - fiscalYearAdjustment);
        const weeks: number = Utils.GET_NUMBER_OF_WEEKS_BETWEEN_DATES(dateOfFirstFullWeek, date);
        if (date >= dateOfFirstFullWeek && dateOfFirstWeek < dateOfFirstFullWeek) {
            return [weeks + 1, year];
        }
        return [weeks, year];
    }

    public getFirstDayOfWeek(): number { return this.firstDayOfWeek; }
    public getFirstMonthOfYear(): number { return this.firstMonthOfYear; }
    public getFirstDayOfYear(): number { return this.firstDayOfYear; }
    public getNextDate(date: Date): Date { return GranularityData.NEXT_DAY(date); }

    // --- اصلاح مرزهای هفته بر اساس تقویم شمسی ---
    public getWeekPeriod(date: Date): IPeriodDates {
        const d = dayjs(date).calendar('jalali');
        const dayOfWeek = d.day(); // 0 (Sunday) to 6 (Saturday)
        // در تقویم شمسی، هفته معمولا از شنبه (6 در dayjs) شروع می‌شود
        // اما برای سازگاری با تنظیمات کاربر، از firstDayOfWeek استفاده می‌کنیم
        let diffToStart = 0;
        const saturdayIndex = 6; 
        
        if (this.firstDayOfWeek === 6) { // شنبه
            diffToStart = (dayOfWeek - saturdayIndex + 7) % 7;
        } else {
            diffToStart = (dayOfWeek - this.firstDayOfWeek + 7) % 7;
        }

        const startDate = d.subtract(diffToStart, 'day').startOf('day');
        const endDate = startDate.add(7, 'day').startOf('day');

        return { startDate: startDate.toDate(), endDate: endDate.toDate() };
    }

    public getQuarterIndex(date: Date): number { 
        return Math.floor(dayjs(date).calendar('jalali').month() / 3); 
    }
    
    // --- اصلاح مرزهای فصل بر اساس تقویم شمسی ---
    public getQuarterStartDate(year: number, quarterIndex: number): Date { 
        const startMonth = quarterIndex * 3 + 1; // 1, 4, 7, 10
        return dayjs(`${year}-${startMonth}-01`).calendar('jalali').toDate(); 
    }
    
    public getQuarterEndDate(date: Date): Date { 
        const d = dayjs(date).calendar('jalali');
        const startMonth = Math.floor(d.month() / 3) * 3 + 1;
        const startOfQuarter = dayjs(`${d.year()}-${startMonth}-01`).calendar('jalali');
        return startOfQuarter.add(3, 'month').toDate();
    }

    public getQuarterPeriod(date: Date): IPeriodDates {
        const quarterIndex = this.getQuarterIndex(date);
        const startDate: Date = this.getQuarterStartDate(this.determineYear(date), quarterIndex);
        const endDate: Date = this.getQuarterEndDate(date);
        return { startDate, endDate };
    }

    // --- اصلاح مرزهای ماه بر اساس تقویم شمسی ---
    public getMonthPeriod(date: Date): IPeriodDates {
        const d = dayjs(date).calendar('jalali');
        const startDate = dayjs(`${d.year()}-${d.month()+1}-01`).calendar('jalali').toDate();
        const endDate = dayjs(`${d.year()}-${d.month()+1}-01`).calendar('jalali').add(1, 'month').toDate();
        return { startDate, endDate };
    }

    // --- اصلاح مرزهای سال بر اساس تقویم شمسی ---
    public getYearPeriod(date: Date): IPeriodDates {
        const jYear = this.getJalaliYear(date);
        const startDate = dayjs(`${jYear}-01-01`).calendar('jalali').toDate();
        const endDate = dayjs(`${jYear}-01-01`).calendar('jalali').add(1, 'year').toDate();
        return { startDate, endDate };
    }

    public isChanged(calendarSettings: CalendarFormat, weekDaySettings: WeekdayFormat, weekStandard: WeekStandard): boolean {
        return this.firstMonthOfYear !== calendarSettings.month || this.firstDayOfYear !== calendarSettings.day || this.firstDayOfWeek !== weekDaySettings.day || weekStandard !== WeekStandard.NotSet;
    }

    public getDateOfFirstWeek(year: number): Date {
        if (!this.dateOfFirstWeek[year]) { 
            this.dateOfFirstWeek[year] = dayjs(`${year}-01-01`).calendar('jalali').toDate(); 
        }
        return this.dateOfFirstWeek[year];
    }

    public getDateOfFirstFullWeek(year: number): Date {
        if (!this.dateOfFirstFullWeek[year]) { 
            this.dateOfFirstFullWeek[year] = this.calculateDateOfFirstFullWeek(year); 
        }
        return this.dateOfFirstFullWeek[year];
    }

    private calculateDateOfFirstFullWeek(year: number): Date {
        let date: Date = dayjs(`${year}-01-01`).calendar('jalali').toDate();
        const weekDay = this.isDaySelection ? this.firstDayOfWeek : dayjs(`${year}-01-01`).calendar('jalali').day();
        while (dayjs(date).calendar('jalali').day() !== weekDay) { 
            date = GranularityData.NEXT_DAY(date); 
        }
        return date;
    }
}