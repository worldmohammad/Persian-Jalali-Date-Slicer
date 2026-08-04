// src/calendars/jalaliEngine.ts
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);

export class JalaliEngine {
    public static convertToJalaliLabel(originalText: string): string {
        if (!originalText) return originalText;

        // 1. تبدیل نام ماه‌های میلادی به شمسی
        const gregorianMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
        
        let resultText = originalText;
        gregorianMonths.forEach((enMonth, index) => {
            const regex = new RegExp(enMonth, "gi");
            resultText = resultText.replace(regex, persianMonths[index]);
        });

        // 2. تبدیل سال‌های میلادی 4 رقمی به شمسی (مثلا 2023 به 1402)
        const currentYear = new Date().getFullYear();
        for (let year = 1990; year <= currentYear + 10; year++) {
            const jalaliYear = dayjs(`${year}-01-01`).calendar('jalali').year();
            const regex = new RegExp(`\\b${year}\\b`, "g");
            resultText = resultText.replace(regex, jalaliYear.toString());
        }

        return resultText;
    }
}