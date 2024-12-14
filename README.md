# Chronos: Modern React Calendar

Named after the Greek god of time, Chronos, it serves as your personal timekeeper in the digital age.
A feature-rich calendar application built with React, TypeScript, and Tailwind CSS. This calendar offers an interactive and visually appealing way to manage events with real-time weather data and holiday information. 

## Features

### Core Calendar Functionality
- 📅 Interactive monthly calendar view
- ✨ Modern floating animation effects for calendar cells
- 🎯 Event management (create, edit, delete)
- 🎨 Custom event colors with color picker
- ⌚ Support for all-day events

### Weather Integration
- 🌤️ Real-time weather data using VisualCrossing API
- 🌡️ Temperature display for each day
- 🌈 Weather condition icons
- 📍 Location-based weather forecasts

### Holiday Information
- 🎉 Public holiday integration
- 🏷️ Holiday indicators on calendar days
- 🌍 Support for multiple regions/countries

### Advanced Features
- 📱 Drag and drop event rescheduling
- 💾 Local storage persistence
- 📤 Export capabilities (JSON/CSV)
- 🎯 Weekend highlighting
- 📍 Today indicator
- 🔄 Month navigation

### UI/UX Features
- 🌓 Modern, clean interface using shadcn/ui components
- 💫 Smooth animations and transitions
- 📱 Responsive design
- 🎨 Visual feedback for interactions

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Gauresh25/Chronos
cd Chronos
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
VITE_VISUALCROSSING_API_KEY=your_api_key_here
```
Note: in case weather api is not present application uses random data for demonstration purposes

4. Start the development server:
```bash
npm run dev
```

## API Integration

### Weather Data
This project uses the VisualCrossing Weather API to fetch weather data. To set up:

1. Sign up at [VisualCrossing](https://www.visualcrossing.com/)
2. Get your API key
3. Add it to your environment variables

## Project Structure
```
src/
├── components/              
│   ├── cal.tsx        
│   ├── EventForm.tsx       
│   └── ...
├── hooks/                  # Custom React hooks   
│   ├── useWeather.ts      # Weather integration
│   └── ...
├── types/                  # TypeScript definitions
└── utils/                  # Helper functions
```

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Visual Crossing Weather API

## Best Practices

- TypeScript for type safety
- React hooks for state management
- Local storage for data persistence
- Modular component architecture
- Responsive design principles
- Accessibility considerations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.