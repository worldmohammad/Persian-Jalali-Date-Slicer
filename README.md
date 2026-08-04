# persian-jalali-date-slicer

[![build status](https://github.com/mohammad-alipour/persian-jalali-date-slicer/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/mohammad-alipour/persian-jalali-date-slicer/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Graphical date range selector for Power BI — **forked from Microsoft's Timeline Slicer** and now enriched with full **Persian (Jalali/Shamsi) calendar** and a native **Farsi user interface**.
>
> توسعه‌دهنده: محمد علیپور  
> ایمیل: worldmohammad@gmail.com

![Timeline Slicer screenshot](./assets/screenshot.png)

## Overview

**persian-jalali-date-slicer** is a graphical date range selector for Power BI, originally based on the [Microsoft Timeline Slicer](https://github.com/microsoft/powerbi-visuals-timeline). This fork adds complete support for the **Persian solar Hijri calendar (Jalali/Shamsi)** and a fully translated **Persian (Farsi) user interface**, making it the ideal date filtering tool for Farsi-speaking analysts and Iranian/Afghan datasets.

Filtering by date ranges or changing granularity (day/month/quarter/year) no longer requires endless clicks. With this simple slider control you just click and drag to select the range you want. You can switch between **year**, **quarter**, **month**, and **day** views to select ranges at any level.  
*SHIFT + click* also works for selecting a range.

## ✨ Persian Calendar & Farsi UI – What's new?

This fork introduces native support for the **Jalali calendar**:

- **Shamsi date display** – all labels and date values (days, months, quarters, years) are shown according to the Jalali calendar.
- **Persian month names** – Farvardin, Ordibehesht, Khordad, Tir, Mordad, Shahrivar, Mehr, Aban, Azar, Dey, Bahman, Esfand.
- **Persian seasons** – Spring (بهار), Summer (تابستان), Autumn (پاییز), Winter (زمستان).
- **Shamsi years** – e.g., ۱۴۰۲, ۱۴۰۳, etc.
- **Automatic detection** – the visual automatically switches to Shamsi calendar based on your data column’s locale or your Power BI file’s regional settings.
- **Fully translated interface** – all tooltips, buttons, and labels are now available in **Persian**, providing a seamless native experience for Farsi-speaking users.

Now you can filter and analyze datasets based on the official Iranian calendar exactly as you see it in your daily life.

## Features

- **Graphical date range selector** – click and drag to select single values or date intervals.
- **Flexible granularity** – switch on the fly between Year, Quarter, Month, and Day views.
- **Persian calendar support** – full Shamsi date representation and season grouping.
- **Persian (Farsi) UI** – all interface texts translated for a native experience.
- **Customizable appearance** – change background color, selection color, font size, and many other formatting options.
- **Keyboard shortcut** – use `SHIFT + click` to extend or create a range selection.
- Based on the original Microsoft Timeline Slicer, enhanced and maintained by **Mohammad Alipour** (worldmohammad@gmail.com).

## Installation

### From Microsoft AppSource (original visual)
The base visual is available at:
[![AppSource](https://img.shields.io/badge/AppSource-Timeline%20Slicer-blue)](https://appsource.microsoft.com/en-us/product/power-bi-visuals/WA104380786)

### Forked version (with Persian calendar)
You can download the latest `.pbiviz` file from this repository’s [Releases](https://github.com/mohammad-alipour/persian-jalali-date-slicer/releases) page and import it directly into your Power BI reports.

## Usage

1. Import the visual into your Power BI report.
2. Add a **Date** field (or a numeric year/month column) to the **Timeline** field well.
3. Use the slider to select a date range, or click on a specific period.
4. Change the granularity using the buttons on the visual (e.g., switch to **Month** view to select by Persian months like **Farvardin**).
5. Customize colors and text size in the **Format** pane.

### Persian Calendar Tips

- If your date column is of type **Date** or **DateTime** and your Power BI locale is set to **Persian (Iran)** or **Persian (Afghanistan)**, the visual will automatically display Shamsi dates.
- For year/month columns (e.g., `ShamsiYear` = 1402, `ShamsiMonth` = 1), you can use them directly – the visual will map them to Persian month names.
- The season view groups months into the standard Persian seasons.

## Formatting Options

- **Background** – customize the background color and transparency.
- **Selection color** – set the color of the selected range.
- **Labels** – adjust font family, size, and color for period labels.
- **Granularity buttons** – style the buttons for Year, Quarter, Month, and Day.

## Contributing

Contributions are welcome! If you'd like to improve Persian calendar support or add new features, please fork this repository and submit a pull request. You can also open an issue to discuss ideas.

## Credits & License

- Original visual: [Microsoft Power BI Timeline Slicer](https://github.com/microsoft/powerbi-visuals-timeline) (MIT License)
- Persian calendar logic inspired by the `jalaali-js` library.
- Fork developed and maintained by **Mohammad Alipour**  
  Email: worldmohammad@gmail.com

This project is licensed under the MIT License – see [LICENSE](./LICENSE) for details.