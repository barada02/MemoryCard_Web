# Memory Card - Capture Your Precious Moments

A beautiful, interactive web application that allows users to create and save their precious memories in the form of animated cards. Each memory card can include a title, date, description, and an image, creating a digital scrapbook of your special moments.

## Features

### 1. Memory Card Creation
- Create personalized memory cards with:
  - Title
  - Date
  - Description
  - Custom image upload
- Cards are automatically saved to browser's local storage
- Beautiful flip animation on hover
- Modern and responsive design

### 2. Example Cards
The application comes with pre-loaded example cards:
- Birthday Celebration (featuring CatWithSari.webp)
- Happy Diwali (featuring CatWearing_Kurta.png)
- Mountain Adventure (with scenic view)

### 3. User Interface
- Clean and intuitive design
- Responsive layout that works on all devices
- Smooth animations and transitions
- Modal form for creating new cards
- Success notifications for user actions

### 4. Card Management
- Add new cards that appear at the top of the list
- Delete unwanted cards
- Permanent storage using browser's localStorage
- Example cards remain until explicitly deleted

## Technical Details

### File Structure
```
MemoryCard/
├── index.html      # Main HTML file
├── style.css       # Styling and animations
├── script.js       # JavaScript functionality
├── README.md       # Project documentation
└── images/         # Image assets
    ├── CatWithSari.webp
    └── CatWearing_Kurta.png
```

### Technologies Used
- HTML5
- CSS3 (with modern features like Grid and Flexbox)
- Vanilla JavaScript
- Local Storage API
- Font Awesome Icons
- Google Fonts (Poppins)

## Setup Instructions

1. Clone or download the repository
2. Ensure all files are in the same directory
3. Open `index.html` in a modern web browser
4. Start creating your memories!

## Features in Detail

### Card Creation
- Click "Create New Memory" button
- Fill in the required information:
  - Title of your memory
  - Date it occurred
  - Description of the memory
  - Optional image upload
- Click "Save Memory" to create the card

### Card Interaction
- Hover over cards to see the flip animation
- Front of card shows:
  - Image
  - Title
  - Date
- Back of card shows:
  - Full description
  - Delete option

### Storage
- All user-created cards are automatically saved
- Cards persist between browser sessions
- Example cards reset on page refresh

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Other modern browsers

## Contributing
Feel free to fork this project and add your own features. Some ideas for improvement:
- Add card editing functionality
- Implement categories/tags for cards
- Add search and filter options
- Enable card sharing
- Add more animation options

## Credits
- Font Awesome for icons
- Google Fonts for typography
- Unsplash for example images
- Custom cat images for example cards

## License
This project is open source and available under the MIT License.
