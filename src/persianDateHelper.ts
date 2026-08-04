// src/persianDateHelper.ts
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);

/**
 * تبدیل شیء Date میلادی به رشته متنی شمسی
 */
export function formatToJalali(date: Date, format: string = 'jYYYY/jMM/jDD'): string {
    if (!date) return "";
    return dayjs(date).calendar('jalali').format(format);
}

/**
 * گرفتن نام ماه شمسی بر اساس شماره ماه (0 تا 11)
 */
export function getJalaliMonthName(monthNumber: number): string {
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    return months[monthNumber] || '';
}

/**
 * تبدیل سال میلادی به شمسی (تقریبی برای نمایش روی محور)
 */
export function gregorianYearToJalali(year: number): number {
    return year - 621;
}