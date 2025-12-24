# 🥗 FitMetric

**FitMetric** is a professional-grade, open-source nutrition dashboard designed to provide high-precision health metrics. It leverages advanced mathematical models to help users calculate their caloric needs and macronutrient distribution for fitness goals like bulking, maintaining, or cutting.

---

## 🚀 Key Features

- **Precision Calculations**: Implements the **Mifflin-St Jeor** equation for high-accuracy BMR (Basal Metabolic Rate).
- **TDEE Analysis**: Dynamic calculation of Total Daily Energy Expenditure based on activity levels.
- **Macro Distribution**: Automatic breakdown of Protein, Carbohydrates, and Fats based on scientific ratios.
- **Persistent State**: User data is saved locally, ensuring progress isn't lost on refresh.

## 🛠️ Technologies Used

- **React 19** & **Vite**: Modern frontend tooling for high-speed development.
- **TypeScript**: Strict typing for mathematical integrity and predictable state.
- **Zustand**: Lightweight state management with persistence middleware.
- **Tailwind CSS**: Utility-first styling for a clean, responsive UI.
- **Lucide React**: High-quality SVG icons for better UX.

## 🏗️ Technical Architecture

This project follows professional software engineering patterns:
- **Atomic State Updates**: All caloric and nutritional parameters are calculated in a single batch within the store to prevent UI flickering and "stale state" bugs.
- **Context-Aware Logic**: Calculation helpers are decoupled from the store's `get()` method to ensure data integrity during rapid updates.
- **Strict Type Validation**: Utilizes TypeScript's `Partial` and `Pick` utility types to protect derived data from accidental overrides.

## 🧮 Mathematical Model

The core logic is based on the following linear regression models:
- **BMR (Male)**: `(10 * weight) + (6.25 * height) - (5 * age) + 5`
- **BMR (Female)**: `(10 * weight) + (6.25 * height) - (5 * age) - 161`

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-user/fitmetric.git](https://github.com/your-user/fitmetric.git)