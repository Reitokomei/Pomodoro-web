# Pomodoro Timer Web Application

A simple, clean, and effective Pomodoro timer web application to help you manage your time and boost productivity.

## Features

- 🍅 **25-minute Pomodoro work sessions**
- ☕ **5-minute short breaks**
- 🌴 **15-minute long breaks** (after every 4 Pomodoros)
- ⏯️ **Start, Pause, and Reset controls**
- 📊 **Track completed Pomodoros**
- 🔔 **Browser notifications** when sessions complete
- 📱 **Responsive design** - works on desktop and mobile
- 🎨 **Beautiful gradient UI**

## What is the Pomodoro Technique?

The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a Pomodoro.

## How to Use

1. **Open the application**: Simply open `index.html` in your web browser
2. **Select a session type**: 
   - Work (25 min) - for focused work
   - Short Break (5 min) - for quick breaks
   - Long Break (15 min) - for extended breaks
3. **Start the timer**: Click the "Start" button
4. **Pause if needed**: Click "Pause" to pause the timer
5. **Reset**: Click "Reset" to reset the current session
6. **Complete sessions**: When a session ends, you'll get a notification

## Usage Instructions

### Running Locally

No build process or dependencies required! Simply:

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. Allow browser notifications for the best experience

### Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

### Tips

- Enable browser notifications for alerts when sessions complete
- The timer automatically switches between work and break sessions
- After 4 completed Pomodoros, a long break is suggested
- You can manually switch between session types at any time

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and responsive design
- `script.js` - Timer logic and functionality

## Customization

You can easily customize the timer durations by editing the `sessions` object in `script.js`:

```javascript
const sessions = {
    work: { duration: 25, label: 'Work Session' },
    shortBreak: { duration: 5, label: 'Short Break' },
    longBreak: { duration: 15, label: 'Long Break' }
};
```

## License

This project is open source and available for anyone to use.

