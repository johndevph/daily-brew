// Daily Brew Coffee Shop JavaScript

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const loadingScreen = document.getElementById('loading-screen');

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menu Tabs Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const menuGrids = document.querySelectorAll('.menu-grid');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and grids
        tabButtons.forEach(btn => btn.classList.remove('active'));
        menuGrids.forEach(grid => grid.classList.remove('active'));
        
        // Add active class to clicked button and corresponding grid
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Order Form Functionality
const orderForm = document.getElementById('orderForm');
const totalPriceElement = document.getElementById('totalPrice');

// Calculate total price
function calculateTotal() {
    let total = 0;
    const selects = document.querySelectorAll('#orderForm select');
    
    selects.forEach(select => {
        const quantity = parseInt(select.value);
        const price = parseInt(select.getAttribute('data-price'));
        total += quantity * price;
    });
    
    totalPriceElement.textContent = total.toLocaleString();
}

// Add event listeners to all select elements in order form
document.querySelectorAll('#orderForm select').forEach(select => {
    select.addEventListener('change', calculateTotal);
});

// Order form submission
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const total = totalPriceElement.textContent;
    
    if (total === '0') {
        alert('Please select at least one item to order.');
        return;
    }
    
    // Create order summary
    let orderSummary = `Order Summary for ${customerName}:\n\n`;
    const selects = document.querySelectorAll('#orderForm select');
    
    selects.forEach(select => {
        const quantity = parseInt(select.value);
        if (quantity > 0) {
            const itemName = select.id.charAt(0).toUpperCase() + select.id.slice(1);
            const price = parseInt(select.getAttribute('data-price'));
            orderSummary += `${itemName}: ${quantity} x ₱${price} = ₱${quantity * price}\n`;
        }
    });
    
    orderSummary += `\nTotal: ₱${total}\n\n`;
    orderSummary += `Customer: ${customerName}\n`;
    orderSummary += `Phone: ${customerPhone}\n\n`;
    orderSummary += 'Thank you for your order! We will contact you shortly to confirm.';
    
    alert(orderSummary);
    
    // Reset form
    orderForm.reset();
    calculateTotal();
});

// Reservation Form Functionality
const reservationForm = document.getElementById('reservationForm');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('resDate').setAttribute('min', today);

reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('resName').value;
    const phone = document.getElementById('resPhone').value;
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const people = document.getElementById('resPeople').value;
    const notes = document.getElementById('resNotes').value;
    
    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Format time
    const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    let confirmationMessage = `Reservation Confirmed!\n\n`;
    confirmationMessage += `Name: ${name}\n`;
    confirmationMessage += `Phone: ${phone}\n`;
    confirmationMessage += `Date: ${formattedDate}\n`;
    confirmationMessage += `Time: ${formattedTime}\n`;
    confirmationMessage += `Number of People: ${people}\n`;
    if (notes) {
        confirmationMessage += `Special Requests: ${notes}\n`;
    }
    confirmationMessage += `\nWe look forward to seeing you!`;
    
    alert(confirmationMessage);
    
    // Reset form
    reservationForm.reset();
});

// Contact Form Functionality
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    let confirmationMessage = `Thank you for contacting us, ${name}!\n\n`;
    confirmationMessage += `We have received your message and will get back to you at ${email} within 24 hours.\n\n`;
    confirmationMessage += `Your message: "${message}"\n\n`;
    confirmationMessage += `Best regards,\nThe Daily Brew Team`;
    
    alert(confirmationMessage);
    
    // Reset form
    contactForm.reset();
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.menu-item, .info-card, .contact-item, .order-form, .reservation-form').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Image hover zoom effect
document.querySelectorAll('.menu-item-img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Form Validation Functions
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add validation to phone inputs
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (!validatePhone(this.value)) {
            this.style.borderColor = '#dc3545';
            this.setCustomValidity('Please enter a valid phone number');
        } else {
            this.style.borderColor = '#28a745';
            this.setCustomValidity('');
        }
    });
});

// Add validation to email input
const emailInput = document.getElementById('contactEmail');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
            this.style.borderColor = '#dc3545';
            this.setCustomValidity('Please enter a valid email address');
        } else {
            this.style.borderColor = '#28a745';
            this.setCustomValidity('');
        }
    });
}

// Auto-hide mobile menu when scrolling
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Reset navbar transform when hamburger is active
hamburger.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        navbar.style.transform = 'translateY(0)';
    }
});

// Initialize total calculation on page load
document.addEventListener('DOMContentLoaded', function() {
    calculateTotal();
    
    // Add stagger animation to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.cta-button, .submit-button, .tab-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Social media icon hover effects
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for mobile menu
hamburger.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        navMenu.querySelector('.nav-link').focus();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll functions
const debouncedScroll = debounce(function() {
    // Scroll animations
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('visible');
        }
    });
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Char AI Chatbot Logic
class CharAI {
    constructor() {
        this.chatbotToggle = document.getElementById('chatbotToggle');
        this.chatbotWindow = document.getElementById('chatbotWindow');
        this.chatbotClose = document.getElementById('chatbotClose');
        this.chatbotMessages = document.getElementById('chatbotMessages');
        this.chatbotForm = document.getElementById('chatbotForm');
        this.chatbotInput = document.getElementById('chatbotInput');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.reservationData = {
            name: null,
            date: null,
            time: null,
            people: null,
            isCollecting: false
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showWelcomeMessage();
    }
    
    bindEvents() {
        this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
        this.chatbotClose.addEventListener('click', () => this.closeChatbot());
        this.chatbotForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSubmit(e);
            }
        });
    }
    
    toggleChatbot() {
        const isActive = this.chatbotWindow.classList.contains('active');
        if (isActive) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }
    
    openChatbot() {
        this.chatbotWindow.classList.add('active');
        this.chatbotInput.focus();
    }
    
    closeChatbot() {
        this.chatbotWindow.classList.remove('active');
    }
    
    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage("Hi! I'm Char AI ☕ How can I help you today?", 'ai');
        }, 2000);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const message = this.chatbotInput.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.chatbotInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate AI thinking time
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processMessage(message);
        }, 1000 + Math.random() * 1000);
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.textContent = text;
        
        messageDiv.appendChild(bubbleDiv);
        this.chatbotMessages.appendChild(messageDiv);
        
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        this.typingIndicator.classList.add('active');
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.typingIndicator.classList.remove('active');
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        }, 100);
    }
    
    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for reservation intent first
        if (this.detectReservationIntent(lowerMessage)) {
            this.handleReservation(message);
            return;
        }
        
        // Handle other inquiries
        let response = this.generateResponse(lowerMessage);
        this.addMessage(response, 'ai');
    }
    
    detectReservationIntent(message) {
        const reservationKeywords = ['reserve', 'reservation', 'book', 'booking', 'table'];
        return reservationKeywords.some(keyword => message.includes(keyword));
    }
    
    handleReservation(message) {
        if (!this.reservationData.isCollecting) {
            this.reservationData.isCollecting = true;
            this.addMessage("I'd be happy to help you make a reservation! Let me gather some details:", 'ai');
            setTimeout(() => {
                this.askForMissingReservationInfo();
            }, 1500);
            return;
        }
        
        // Extract information from the message
        this.extractReservationInfo(message);
        
        if (this.isReservationComplete()) {
            this.confirmReservation();
        } else {
            this.askForMissingReservationInfo();
        }
    }
    
    extractReservationInfo(message) {
        // Extract name (simple assumption: capitalized word)
        const nameMatch = message.match(/\b[A-Z][a-z]+\b/);
        if (nameMatch && !this.reservationData.name) {
            this.reservationData.name = nameMatch[0];
        }
        
        // Extract number of people
        const peopleMatch = message.match(/(\d+)\s*(?:people|person|pax|guests?)/i);
        if (peopleMatch) {
            this.reservationData.people = parseInt(peopleMatch[1]);
        }
        
        // Extract time (am/pm)
        const timeMatch = message.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)/i);
        if (timeMatch) {
            let hour = parseInt(timeMatch[1]);
            const minute = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
            const period = timeMatch[3].toLowerCase();
            
            if (period === 'pm' && hour !== 12) hour += 12;
            if (period === 'am' && hour === 12) hour = 0;
            
            this.reservationData.time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        }
        
        // Extract date (simple patterns)
        const datePatterns = [
            /tomorrow/i,
            /today/i,
            /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
            /(\w+)\s+(\d{1,2})(?:st|nd|rd|th)?/i
        ];
        
        for (const pattern of datePatterns) {
            const match = message.match(pattern);
            if (match) {
                if (match[0].toLowerCase() === 'tomorrow') {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    this.reservationData.date = tomorrow.toISOString().split('T')[0];
                } else if (match[0].toLowerCase() === 'today') {
                    this.reservationData.date = new Date().toISOString().split('T')[0];
                } else if (match.length === 4) {
                    // MM/DD/YYYY format
                    this.reservationData.date = `${match[3]}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
                }
                break;
            }
        }
    }
    
    askForMissingReservationInfo() {
        const missing = [];
        
        if (!this.reservationData.name) missing.push('name');
        if (!this.reservationData.date) missing.push('date');
        if (!this.reservationData.time) missing.push('time');
        if (!this.reservationData.people) missing.push('number of people');
        
        if (missing.length === 0) return;
        
        const missingText = missing.join(', ').replace(/, ([^,]*)$/, ' and $1');
        this.addMessage(`Could you please provide your ${missingText}?`, 'ai');
    }
    
    isReservationComplete() {
        return this.reservationData.name && 
               this.reservationData.date && 
               this.reservationData.time && 
               this.reservationData.people;
    }
    
    confirmReservation() {
        const formattedDate = new Date(this.reservationData.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const formattedTime = new Date(`2000-01-01T${this.reservationData.time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        const confirmation = `Your reservation is confirmed for ${this.reservationData.name}, ${this.reservationData.people} ${this.reservationData.people === 1 ? 'person' : 'people'}, ${formattedTime} on ${formattedDate}. See you at Daily Brew ☕`;
        
        this.addMessage(confirmation, 'ai');
        
        // Reset reservation data
        this.reservationData = {
            name: null,
            date: null,
            time: null,
            people: null,
            isCollecting: false
        };
    }
    
    generateResponse(message) {
        // Menu inquiries
        if (message.includes('menu') || message.includes('drink') || message.includes('food')) {
            return "You can view our full menu in the Menu section! We have 10 delicious drinks including Espresso, Latte, Cappuccino, and more. Plus 20 tasty snacks like Croissants, Muffins, and Sandwiches. What would you like to try? ☕";
        }
        
        // Price inquiries
        if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
            return "Our drinks range from ₱120-180, with Espresso at ₱120 and specialty drinks like Caramel Macchiato at ₱170. Snacks range from ₱65-180. Check our Menu section for complete pricing! 💰";
        }
        
        // Location inquiries
        if (message.includes('where') || message.includes('location') || message.includes('address')) {
            return "We're located at Purok 6, Sucat, Muntinlupa City. We have free WiFi and parking available in front! 📍";
        }
        
        // Contact inquiries
        if (message.includes('contact') || message.includes('phone') || message.includes('number')) {
            return "You can reach us at 09572583745 or email dailybrew@gmail.com. We're here to help! 📞";
        }
        
        // WiFi inquiries
        if (message.includes('wifi') || message.includes('internet')) {
            return "Yes! We offer free WiFi for all our customers. Perfect for working or studying while enjoying your coffee! 📶";
        }
        
        // Parking inquiries
        if (message.includes('parking')) {
            return "Yes, we have parking available in front of our shop for your convenience! 🚗";
        }
        
        // Operating hours
        if (message.includes('hour') || message.includes('open') || message.includes('close')) {
            return "We're open Monday to Sunday, 7:00 AM to 10:00 PM. Come visit us anytime! ⏰";
        }
        
        // Order inquiries
        if (message.includes('order') || message.includes('buy')) {
            return "You can place orders through our Order section! Select your items, quantities, and we'll calculate the total for you. Easy and convenient! 🛒";
        }
        
        // Greeting
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! Welcome to Daily Brew! I'm Char AI, your virtual assistant. How can I help you today? ☕";
        }
        
        // Thanks
        if (message.includes('thank') || message.includes('thanks')) {
            return "You're very welcome! Enjoy your coffee and have a wonderful day! ☕✨";
        }
        
        // Default response
        return "Sorry, I can only help with Daily Brew inquiries like menu, prices, location, reservations, and shop features. What would you like to know about our coffee shop? ☕";
    }
}

// Initialize Char AI when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new CharAI();
});