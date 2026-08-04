// src/jalaliCalendar.ts
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);

export class JalaliCalendar {
    private static gregorianMonths: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    private static persianMonths: string[] = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

    /**
     * تبدیل هر متن تاریخی میلادی به معادل شمسی آن
     */
    public static convertLabel(originalText: string): string {
        if (!originalText) return originalText;
        let resultText = originalText;

        // تبدیل نام ماه‌ها
        this.gregorianMonths.forEach((enMonth, index) => {
            const regex = new RegExp(enMonth, "gi");
            resultText = resultText.replace(regex, this.persianMonths[index]);
        });

        // تبدیل سال‌های 4 رقمی میلادی به شمسی
        const currentYear = new Date().getFullYear();
        for (let year = 1990; year <= currentYear + 10; year++) {
            const jalaliYear = dayjs(`${year}-01-01`).calendar('jalali').year();
            const regex = new RegExp(`\\b${year}\\b`, "g");
            resultText = resultText.replace(regex, jalaliYear.toString());
        }

        return resultText;
    }

    /**
     * تبدیل شیء تاریخ میلادی به رشته متنی شمسی برای هدر
     */
    public static formatDateRange(startDate: Date, endDate: Date): string {
        if (!startDate || !endDate) return "";
        const start = dayjs(startDate).calendar('jalali').format('jYYYY/jMM/jDD');
        const end = dayjs(endDate).calendar('jalali').format('jYYYY/jMM/jDD');
        return `${start} تا ${end}`;
    }
}