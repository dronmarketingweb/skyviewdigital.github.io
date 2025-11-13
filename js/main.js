// SkyView Digital - Enhanced Main JavaScript File

// Lazy Loading dla obrazów - ładowanie z wyprzedzeniem
function setupLazyLoading() {
    // Znajdź wszystkie obrazy do lazy loadingu
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Załaduj prawdziwy obraz
                    img.src = img.dataset.src;
                    // Usuń klasę lazy
                    img.classList.remove('lazy');
                    // Usuń data-src po załadowaniu
                    img.removeAttribute('data-src');
                    // Przestań obserwować
                    observer.unobserve(img);
                }
            });
        }, {
            // Ładuj obrazy 300px przed pojawieniem się w viewport
            rootMargin: '300px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback dla starszych przeglądarek
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Preload ważnych obrazów
function preloadImportantImages() {
    // Preload hero i pierwszych widocznych obrazów
    const importantImages = [
        'images/skyview-logo.png',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop'
    ];
    
    importantImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preload ważnych obrazów
    preloadImportantImages();
    
    // Setup lazy loading
    setupLazyLoading();
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50
    });

    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initPortfolioModal();
    initInteractiveTimeline();
    initEnhancedFAQ();
    // initCalendarWidget(); // Disabled - using new booking-system.js instead
    // initFormHandling(); // Disabled - using new booking-system.js instead
    initScrollEffects();
    initHeroAnimations();
    initContactPopup();
    initCTAButtons();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    closeMobileMenu.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Close menu when clicking on links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Portfolio Video Inline Player
function initPortfolioModal() {
    const playButton = document.getElementById('play-historia-btn');
    const container = document.getElementById('pierwsza-historia-container');
    const img = document.getElementById('pierwsza-historia-img');
    const video = document.getElementById('pierwsza-historia-video');
    const videoContainer = document.getElementById('video-container');
    const overlay = document.getElementById('pierwsza-historia-overlay');
    const closeVideoBtn = document.getElementById('close-video-btn');

    if (!playButton || !container || !img || !video || !videoContainer || !overlay) return;

    let isVideoPlaying = false;

    playButton.addEventListener('click', function() {
        if (!isVideoPlaying) {
            // Start playing video
            isVideoPlaying = true;
            
            // Dodaj klasę video-active do kontenera
            container.classList.add('video-active');
            
            // NAPRAWIONE - ukryj obraz i overlay, pokaż video
            img.style.display = 'none';
            img.style.opacity = '0';
            img.style.visibility = 'hidden';
            img.style.height = '0';
            img.classList.add('hidden');
            
            overlay.style.display = 'none';
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            overlay.style.pointerEvents = 'none';
            overlay.classList.add('hidden');
            
            // Show video container - WIDOCZNE
            videoContainer.classList.remove('hidden');
            videoContainer.style.display = 'block';
            videoContainer.style.position = 'relative';
            videoContainer.style.visibility = 'visible';
            videoContainer.style.opacity = '1';
            videoContainer.style.zIndex = '20';
            videoContainer.style.minHeight = '200px';
            
            // Video element - WIDOCZNY - USUŃ KLASĘ h-0
            video.classList.remove('h-0');
            video.style.display = 'block';
            video.style.height = 'auto';
            video.style.minHeight = '200px';
            video.style.maxHeight = 'none';
            video.style.width = '100%';
            video.style.opacity = '1';
            video.style.visibility = 'visible';
            video.style.aspectRatio = '16/9';
            video.style.background = '#000';
            
            // Add controls back when playing
            video.setAttribute('controls', 'controls');
            
            // Play the video
            video.play();
            
            // Listen for video end to reset
            video.addEventListener('ended', resetToImage);
            
        }
    });

    // Close video button functionality
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', function() {
            resetToImage();
        });
    }

    function resetToImage() {
        isVideoPlaying = false;
        
        // Usuń klasę video-active z kontenera
        container.classList.remove('video-active');
        
        // Pause and reset video
        video.pause();
        video.currentTime = 0;
        
        // Force remove controls to prevent them from showing
        video.removeAttribute('controls');
        
        // Hide video container completely - PRZYWRÓĆ h-0
        videoContainer.classList.add('hidden');
        videoContainer.style.display = 'none';
        videoContainer.style.opacity = '0';
        videoContainer.style.visibility = 'hidden';
        videoContainer.style.minHeight = '0';
        video.classList.add('h-0');
        video.style.height = '0';
        video.style.minHeight = '0';
        video.style.maxHeight = '0';
        video.style.opacity = '0';
        video.style.display = 'block';
        
        // Show image and overlay again - PRZYWRÓĆ DOKŁADNIE JAK BYŁO
        // Resetuj style obrazu
        img.style.removeProperty('display');
        img.style.removeProperty('opacity');
        img.style.removeProperty('visibility');
        img.style.removeProperty('position');
        img.style.removeProperty('z-index');
        img.style.removeProperty('height');
        img.style.removeProperty('width');
        img.classList.remove('hidden');
        
        // Resetuj style overlay - całkowity reset
        overlay.style.removeProperty('display');
        overlay.style.removeProperty('opacity');
        overlay.style.removeProperty('visibility');
        overlay.style.removeProperty('position');
        overlay.style.removeProperty('z-index');
        overlay.style.removeProperty('pointer-events');
        overlay.classList.remove('hidden');
        
        // Upewnij się, że overlay jest widoczny
        overlay.style.pointerEvents = 'auto';
        
        // Remove the ended event listener
        video.removeEventListener('ended', resetToImage);
        
        // Force a reflow to ensure everything updates
        void videoContainer.offsetHeight;
        void img.offsetHeight;
    }

    // ESC key to close video
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isVideoPlaying) {
            resetToImage();
        }
    });
}

// Interactive Timeline for Process Section
function initInteractiveTimeline() {
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const stepContents = document.querySelectorAll('.step-content');
    const progressBar = document.getElementById('progress-bar');
    const nextBtn = document.getElementById('next-step');
    const prevBtn = document.getElementById('prev-step');
    
    let currentStep = 1;
    const totalSteps = 5;

    function updateStep(step) {
        // Update indicators
        stepIndicators.forEach((indicator, index) => {
            const stepNum = index + 1;
            if (stepNum <= step) {
                indicator.classList.add('active');
                indicator.classList.remove('bg-gray-300');
                indicator.classList.add('bg-primary');
            } else {
                indicator.classList.remove('active');
                indicator.classList.add('bg-gray-300');
                indicator.classList.remove('bg-primary');
            }
        });

        // Update content
        stepContents.forEach(content => {
            content.classList.remove('active');
            if (parseInt(content.dataset.step) === step) {
                content.classList.add('active');
            }
        });

        // Update progress bar
        const progressPercent = ((step - 1) / (totalSteps - 1)) * 100;
        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
        }

        // Update buttons
        if (prevBtn) {
            prevBtn.disabled = step === 1;
        }
        if (nextBtn) {
            if (step === totalSteps) {
                nextBtn.innerHTML = '<span class="font-space">Gotowe!</span><i class="fas fa-check ml-2"></i>';
                nextBtn.onclick = () => {
                    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
                };
            } else {
                nextBtn.innerHTML = '<span class="font-space">Następny</span><i class="fas fa-arrow-right ml-2"></i>';
                nextBtn.onclick = () => {
                    if (currentStep < totalSteps) {
                        currentStep++;
                        updateStep(currentStep);
                    }
                };
            }
        }

        currentStep = step;
    }

    // Initialize
    updateStep(1);

    // Step indicator click handlers
    stepIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateStep(index + 1);
        });
    });

    // Navigation button handlers are handled in updateStep function

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateStep(currentStep);
            }
        });
    }
}

// Enhanced FAQ Functionality
function initEnhancedFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i.fa-plus');
            const isActive = answer.classList.contains('max-h-96');

            // Close all other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherFaqItem = otherQuestion.parentElement;
                    const otherAnswer = otherFaqItem.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('i.fa-plus');
                    
                    otherAnswer.classList.remove('max-h-96');
                    otherAnswer.classList.add('max-h-0');
                    if (otherIcon) {
                        otherIcon.classList.remove('rotate-45');
                    }
                }
            });

            // Toggle current FAQ
            if (isActive) {
                answer.classList.remove('max-h-96');
                answer.classList.add('max-h-0');
                if (icon) {
                    icon.classList.remove('rotate-45');
                }
            } else {
                answer.classList.remove('max-h-0');
                answer.classList.add('max-h-96');
                if (icon) {
                    icon.classList.add('rotate-45');
                }
            }
        });
    });
}

// Calendar Widget Functionality - DISABLED (replaced by booking-system.js)
/*
function initCalendarWidget() {
    const timeSlots = document.querySelectorAll('.time-slot');
    let selectedDate = null;
    let selectedTime = null;
    let currentCalendarMonth = new Date().getMonth();
    let currentCalendarYear = new Date().getFullYear();
    
    // Load booked slots from localStorage
    const bookedSlots = new Set(JSON.parse(localStorage.getItem('bookedSlots') || '[]'));

    // Generate calendar days
    function generateCalendar(month = currentCalendarMonth, year = currentCalendarYear) {
        const calendarGrid = document.querySelector('.calendar-widget .grid-cols-7:last-child');
        if (!calendarGrid) return;
        
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 2); // Max 2 months ahead
        
        // Update current calendar date
        currentCalendarMonth = month;
        currentCalendarYear = year;
        
        // Update month header
        updateCalendarHeader(month, year);
        
        // Clear existing days
        calendarGrid.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'p-2';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('button');
            dayElement.className = 'calendar-day p-2 text-center hover:bg-primary hover:text-white rounded transition font-space';
            dayElement.textContent = day;
            
            // Disable past dates, Sundays only (Saturday is now available), and dates beyond max range
            const dayDate = new Date(year, month, day);
            const dayOfWeek = dayDate.getDay();
            const isToday = dayDate.toDateString() === today.toDateString();
            
            if (dayDate < today || dayOfWeek === 0 || dayDate > maxDate) {
                dayElement.disabled = true;
                dayElement.className += ' text-gray-400 cursor-not-allowed opacity-50';
            } else if (isToday) {
                dayElement.className += ' ring-2 ring-accent ring-opacity-50';
            }
            
            dayElement.addEventListener('click', function() {
                if (this.disabled) return;
                
                // Remove selected class from other days
                document.querySelectorAll('.calendar-day').forEach(d => {
                    d.classList.remove('bg-primary', 'text-white');
                });
                
                // Add selected class to clicked day
                this.classList.add('bg-primary', 'text-white');
                selectedDate = new Date(year, month, day);
                
                // Reset time slot availability for new date
                updateTimeSlotAvailability();
            });
            
            calendarGrid.appendChild(dayElement);
        }
    }

    // Update time slot availability based on selected date
    function updateTimeSlotAvailability() {
        if (!selectedDate) {
            // If no date selected, show all slots as available
            timeSlots.forEach(slot => {
                slot.classList.remove('opacity-50', 'cursor-not-allowed', 'selected', 'bg-primary', 'text-white');
                slot.disabled = false;
                slot.innerHTML = slot.textContent.trim();
            });
            return;
        }

        timeSlots.forEach(slot => {
            const slotTime = slot.textContent.trim();
            const timeKey = `${selectedDate.toDateString()}-${slotTime}`;
            
            // Remove previous states
            slot.classList.remove('opacity-50', 'cursor-not-allowed', 'selected');
            slot.disabled = false;
            
            // Check if this specific date-time combination is booked
            const currentBookedSlots = new Set(JSON.parse(localStorage.getItem('bookedSlots') || '[]'));
            
            if (currentBookedSlots.has(timeKey)) {
                slot.classList.add('opacity-50', 'cursor-not-allowed');
                slot.disabled = true;
                slot.innerHTML = `${slotTime} <small class="block text-xs text-red-500">(Zajęte)</small>`;
            } else {
                slot.classList.remove('bg-red-100');
                slot.innerHTML = slotTime;
            }
        });
    }

    // Time slot selection
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function(e) {
            // Prevent clicking if disabled or no date selected
            if (this.disabled || !selectedDate) {
                e.preventDefault();
                if (!selectedDate) {
                    alert('⚠️ Proszę najpierw wybrać datę w kalendarzu');
                }
                return;
            }
            
            // Double check if slot is still available (real-time check)
            const slotTime = this.textContent.trim().split(' ')[0]; // Remove "(Zajęte)" text if present
            const timeKey = `${selectedDate.toDateString()}-${slotTime}`;
            const currentBookedSlots = new Set(JSON.parse(localStorage.getItem('bookedSlots') || '[]'));
            
            if (currentBookedSlots.has(timeKey)) {
                alert('⚠️ Ten termin został już zarezerwowany. Proszę wybrać inny.');
                updateTimeSlotAvailability(); // Refresh display
                return;
            }
            
            // Remove selected class from other slots
            timeSlots.forEach(s => s.classList.remove('selected', 'bg-primary', 'text-white'));
            
            // Add selected class to clicked slot
            this.classList.add('selected', 'bg-primary', 'text-white');
            selectedTime = slotTime;
        });
    });

    // Calendar header update function
    function updateCalendarHeader(month, year) {
        const monthNames = [
            'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
            'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
        ];
        
        let calendarHeader = document.querySelector('.calendar-header');
        if (!calendarHeader) {
            // Create header if doesn't exist
            const calendarWidget = document.querySelector('.calendar-widget');
            calendarHeader = document.createElement('div');
            calendarHeader.className = 'calendar-header flex items-center justify-between mb-4';
            calendarHeader.innerHTML = `
                <button id="prevMonth" class="p-2 rounded-lg transition" style="background: #1a2838;" title="Poprzedni miesiąc">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <h4 class="font-semibold text-lg" id="monthYear"></h4>
                <button id="nextMonth" class="p-2 rounded-lg transition" style="background: #1a2838;" title="Następny miesiąc">
                    <i class="fas fa-chevron-right"></i>
                </button>
            `;
            calendarWidget.insertBefore(calendarHeader, calendarWidget.firstChild);
        }
        
        document.getElementById('monthYear').textContent = `${monthNames[month]} ${year}`;
        
        // Update navigation buttons state
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 2);
        
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');
        
        // Disable prev if current month or earlier
        const isCurrentMonth = (year === today.getFullYear() && month === today.getMonth());
        prevBtn.disabled = isCurrentMonth;
        prevBtn.style.opacity = isCurrentMonth ? '0.3' : '1';
        
        // Disable next if 2 months ahead
        const currentDate = new Date(year, month);
        const maxAllowedDate = new Date(today.getFullYear(), today.getMonth() + 2);
        nextBtn.disabled = currentDate >= maxAllowedDate;
        nextBtn.style.opacity = currentDate >= maxAllowedDate ? '0.3' : '1';
    }
    
    // Navigation event listeners
    function setupCalendarNavigation() {
        document.addEventListener('click', function(e) {
            if (e.target.id === 'prevMonth' || e.target.closest('#prevMonth')) {
                const today = new Date();
                if (currentCalendarYear > today.getFullYear() || 
                    (currentCalendarYear === today.getFullYear() && currentCalendarMonth > today.getMonth())) {
                    currentCalendarMonth--;
                    if (currentCalendarMonth < 0) {
                        currentCalendarMonth = 11;
                        currentCalendarYear--;
                    }
                    generateCalendar(currentCalendarMonth, currentCalendarYear);
                }
            }
            
            if (e.target.id === 'nextMonth' || e.target.closest('#nextMonth')) {
                const today = new Date();
                const maxDate = new Date();
                maxDate.setMonth(maxDate.getMonth() + 2);
                
                const nextMonth = new Date(currentCalendarYear, currentCalendarMonth + 1);
                if (nextMonth <= maxDate) {
                    currentCalendarMonth++;
                    if (currentCalendarMonth > 11) {
                        currentCalendarMonth = 0;
                        currentCalendarYear++;
                    }
                    generateCalendar(currentCalendarMonth, currentCalendarYear);
                }
            }
        });
    }

    // Initialize calendar and navigation
    setupCalendarNavigation();
    generateCalendar();

    // Store selected date and time for form submission
    window.getSelectedDateTime = function() {
        return {
            date: selectedDate,
            time: selectedTime
        };
    };
    
    // Global function to reset calendar selection
    window.resetCalendarSelection = function() {
        selectedDate = null;
        selectedTime = null;
        updateTimeSlotAvailability();
    };

    // Function to book a time slot and save to localStorage
    window.bookTimeSlot = function(date, time, bookingData) {
        const timeKey = `${date.toDateString()}-${time}`;
        bookedSlots.add(timeKey);
        
        // Save booked slots to localStorage
        localStorage.setItem('bookedSlots', JSON.stringify([...bookedSlots]));
        
        // Save booking details
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const booking = {
            id: Date.now(),
            date: date.toISOString(),
            time: time,
            timeKey: timeKey,
            ...bookingData,
            createdAt: new Date().toISOString()
        };
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        updateTimeSlotAvailability();
        return booking;
    };
}
*/

// Form Handling with Enhanced Validation - DISABLED (replaced by booking-system.js)
/*
function initFormHandling() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const selectedDateTime = window.getSelectedDateTime();
            
            // Get form values
            const name = formData.get('name') ? formData.get('name').trim() : this.querySelector('input[type="text"]').value.trim();
            const email = formData.get('email') ? formData.get('email').trim() : this.querySelector('input[type="email"]').value.trim();
            const phone = formData.get('phone') ? formData.get('phone').trim() : this.querySelector('input[type="tel"]').value.trim();
            const company = formData.get('company') ? formData.get('company').trim() : this.querySelectorAll('input[type="text"]')[1].value.trim();
            const industry = this.querySelector('select').value;
            const description = this.querySelector('textarea').value.trim();
            const budget = this.querySelectorAll('select')[1].value;
            const privacy = this.querySelector('input[type="checkbox"]').checked;
            
            // Enhanced validation
            const errors = [];
            
            if (!name || name.length < 2) {
                errors.push('Proszę podać poprawne imię i nazwisko (min. 2 znaki)');
            }
            
            if (!email || !isValidEmail(email)) {
                errors.push('Proszę podać poprawny adres email z symbolem @');
            }
            
            if (!company || company.length < 2) {
                errors.push('Proszę podać nazwę firmy (min. 2 znaki)');
            }
            
            if (!selectedDateTime.date || !selectedDateTime.time) {
                errors.push('Proszę wybrać datę i godzinę spotkania w kalendarzu');
            }
            
            if (!privacy) {
                errors.push('Proszę zaakceptować zgodę na przetwarzanie danych osobowych');
            }
            
            // Check if selected time slot is still available
            if (selectedDateTime.date && selectedDateTime.time) {
                const timeKey = `${selectedDateTime.date.toDateString()}-${selectedDateTime.time}`;
                const bookedSlots = new Set(JSON.parse(localStorage.getItem('bookedSlots') || '[]'));
                if (bookedSlots.has(timeKey)) {
                    errors.push('Wybrany termin został już zarezerwowany. Proszę wybrać inny termin.');
                }
            }
            
            if (errors.length > 0) {
                alert('Błędy w formularzu:\n' + errors.join('\n'));
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wysyłanie...';
            submitButton.disabled = true;
            
            // Process booking
            setTimeout(() => {
                try {
                    // Book the selected time slot with all data
                    const bookingData = {
                        name: name,
                        email: email,
                        phone: phone,
                        company: company,
                        industry: industry,
                        description: description,
                        budget: budget
                    };
                    
                    const booking = window.bookTimeSlot(selectedDateTime.date, selectedDateTime.time, bookingData);
                    
                    // Show success message
                    const dayName = selectedDateTime.date.toLocaleDateString('pl-PL', { weekday: 'long' });
                    const formattedDate = selectedDateTime.date.toLocaleDateString('pl-PL');
                    
                    alert(`✅ Gratulacje ${name}!\n\nTwoja konsultacja została zarezerwowana:\n📅 ${dayName}, ${formattedDate}\n🕐 Godzina: ${selectedDateTime.time}\n\n📧 Email potwierdzający zostanie wysłany na: ${email}\n\nNr rezerwacji: #${booking.id}`);
                    
                    // Send notification email (if EmailJS is configured)
                    if (window.emailjs) {
                        sendBookingNotification(booking);
                        sendBookingConfirmation(booking);
                    }
                    
                    // Reset form
                    this.reset();
                    
                    // Reset visual selections
                    document.querySelectorAll('.calendar-day').forEach(d => {
                        d.classList.remove('bg-primary', 'text-white');
                    });
                    document.querySelectorAll('.time-slot').forEach(s => {
                        s.classList.remove('selected', 'bg-primary', 'text-white');
                    });
                    
                    // Reset selected date and time through global function
                    if (window.resetCalendarSelection) {
                        window.resetCalendarSelection();
                    }
                    
                    // Show booking summary
                    showBookingSummary(booking);
                    
                } catch (error) {
                    console.error('Błąd podczas zapisywania rezerwacji:', error);
                    alert('Wystąpił błąd podczas zapisywania rezerwacji. Spróbuj ponownie.');
                }
                
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // CTA buttons functionality
    const ctaButtons = document.querySelectorAll('button');
    ctaButtons.forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.includes('konsultację') || buttonText.includes('kawę') || buttonText.includes('umów')) {
            button.addEventListener('click', function(e) {
                if (this.type !== 'submit') {
                    e.preventDefault();
                    document.getElementById('booking').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
}
*/

// Helper function for email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Scroll Effects
function initScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrollY = window.pageYOffset;
        const nav = document.querySelector('nav');
        
        // Navigation background on scroll
        if (scrollY > 100) {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            nav.style.backdropFilter = 'blur(10px)';
        }
        
        // Parallax effect for hero video
        const heroVideo = document.querySelector('#hero video');
        if (heroVideo && scrollY < window.innerHeight) {
            heroVideo.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Hero Animations
function initHeroAnimations() {
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('#hero .animate-fade-in-up');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
        }, index * 200);
    });

    // Enhanced CTA button animations
    const ctaButton = document.querySelector('#hero button');
    if (ctaButton) {
        // Subtle pulse effect
        setInterval(() => {
            ctaButton.style.transform = 'scale(1.02)';
            setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
            }, 200);
        }, 4000);
        
        // Hover effects
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0)';
        });
    }
}

// Performance Optimization
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('loading');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preconnect to external domains
    const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdn.jsdelivr.net'
    ];

    preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could implement error reporting here
});

// Initialize performance optimizations
initPerformanceOptimizations();

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator && !window.location.hostname.includes('genspark') && !window.location.hostname.includes('localhost')) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registered');
            })
            .catch(function(registrationError) {
                console.log('ServiceWorker registration failed:', registrationError);
            });
    });
}

// Analytics Integration (Google Analytics 4)
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}

// Track important interactions
function trackEvent(eventName, parameters) {
    if (window.gtag) {
        gtag('event', eventName, parameters);
    }
}

// Track CTA clicks
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
        trackEvent('cta_click', {
            button_text: button.textContent.trim(),
            section: button.closest('section')?.id || 'unknown'
        });
    }
});

// Track form submissions
document.addEventListener('submit', function(e) {
    trackEvent('form_submit', {
        form_id: e.target.id || 'unknown'
    });
});

// Track video plays
document.addEventListener('play', function(e) {
    if (e.target.tagName === 'VIDEO') {
        trackEvent('video_play', {
            video_src: e.target.currentSrc || 'unknown'
        });
    }
}, true);

// Accessibility Improvements
function initAccessibilityFeatures() {
    // Focus management for modals
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Apply focus trap to modals
    const modals = document.querySelectorAll('#videoModal, #mobileMenu');
    modals.forEach(modal => trapFocus(modal));

    // Add keyboard navigation for timeline
    const stepIndicators = document.querySelectorAll('.step-indicator');
    stepIndicators.forEach((indicator, index) => {
        indicator.setAttribute('tabindex', '0');
        indicator.setAttribute('role', 'button');
        indicator.setAttribute('aria-label', `Przejdź do kroku ${index + 1}`);
        
        indicator.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize accessibility features
initAccessibilityFeatures();

// Contact Popup Functionality
function initContactPopup() {
    const contactPopupBtn = document.getElementById('contact-popup-btn');
    const contactModal = document.getElementById('contactModal');
    const closeContactModal = document.getElementById('closeContactModal');
    const backToBooking = document.getElementById('back-to-booking');

    if (!contactPopupBtn || !contactModal) return;

    // Open popup
    contactPopupBtn.addEventListener('click', function() {
        contactModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    // Close popup
    if (closeContactModal) {
        closeContactModal.addEventListener('click', function() {
            contactModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    // Back to booking button
    if (backToBooking) {
        backToBooking.addEventListener('click', function() {
            contactModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            document.getElementById('booking').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Close popup when clicking outside
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            contactModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Close popup with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !contactModal.classList.contains('hidden')) {
            contactModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize contact popup
initContactPopup();

// CTA Buttons Scroll to Booking
function initCTAButtons() {
    // Hero CTA button
    const heroCTA = document.getElementById('hero-cta-btn');
    if (heroCTA) {
        heroCTA.addEventListener('click', function() {
            document.getElementById('booking').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Coffee CTA button (Umówmy się na kawę)
    const coffeeCTA = document.getElementById('coffee-cta-btn');
    if (coffeeCTA) {
        coffeeCTA.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('booking').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Fallback: Any button containing "kawę" text
    const coffeeButtons = document.querySelectorAll('button');
    coffeeButtons.forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        if ((buttonText.includes('umówmy się na kawę') || buttonText.includes('kawę')) && !button.id) {
            button.addEventListener('click', function(e) {
                if (this.type !== 'submit') {
                    e.preventDefault();
                    document.getElementById('booking').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
}

// Initialize CTA buttons
initCTAButtons();

// ======================================
// ENHANCED BOOKING SYSTEM FUNCTIONS
// ======================================

// Function to show booking summary
function showBookingSummary(booking) {
    const summaryHtml = `
        <div id="bookingSummary" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <div class="text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="font-serif text-2xl text-gray-900 mb-4">Rezerwacja Potwierdzona!</h3>
                    <div class="text-left space-y-3 mb-6">
                        <div class="flex justify-between">
                            <span class="font-medium">Nr rezerwacji:</span>
                            <span class="text-primary font-mono">#${booking.id}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Klient:</span>
                            <span>${booking.name}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Email:</span>
                            <span class="text-blue-600">${booking.email}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Data:</span>
                            <span>${new Date(booking.date).toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Godzina:</span>
                            <span class="font-bold text-accent">${booking.time}</span>
                        </div>
                    </div>
                    <button onclick="closeBookingSummary()" class="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition">
                        Zamknij
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', summaryHtml);
}

// Function to close booking summary
window.closeBookingSummary = function() {
    const summary = document.getElementById('bookingSummary');
    if (summary) {
        summary.remove();
    }
};

// EmailJS Integration Functions
function sendBookingNotification(booking) {
    if (!window.emailjs) return;
    
    const templateParams = {
        to_name: 'SkyView Digital Team',
        to_email: 'dron.marketingweb@gmail.com', // Twój email
        from_name: booking.name,
        from_email: booking.email,
        company: booking.company,
        phone: booking.phone || 'Nie podano',
        industry: booking.industry || 'Nie podano',
        description: booking.description || 'Nie podano',
        budget: booking.budget || 'Nie podano',
        booking_date: new Date(booking.date).toLocaleDateString('pl-PL', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }),
        booking_time: booking.time,
        booking_id: booking.id,
        created_at: new Date(booking.createdAt).toLocaleString('pl-PL')
    };
    
    // Wyślij powiadomienie do Ciebie
    emailjs.send('YOUR_SERVICE_ID', 'booking_notification', templateParams)
        .then(function(response) {
            console.log('Powiadomienie wysłane:', response);
        }, function(error) {
            console.log('Błąd wysyłania powiadomienia:', error);
        });
}

function sendBookingConfirmation(booking) {
    if (!window.emailjs) return;
    
    const templateParams = {
        to_name: booking.name,
        to_email: booking.email,
        company: booking.company,
        booking_date: new Date(booking.date).toLocaleDateString('pl-PL', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }),
        booking_time: booking.time,
        booking_id: booking.id
    };
    
    // Wyślij potwierdzenie do klienta
    emailjs.send('YOUR_SERVICE_ID', 'booking_confirmation', templateParams)
        .then(function(response) {
            console.log('Potwierdzenie wysłane:', response);
        }, function(error) {
            console.log('Błąd wysyłania potwierdzenia:', error);
        });
}

// Function to get all bookings (for admin purposes)
window.getAllBookings = function() {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
};

// Function to get bookings for a specific date
window.getBookingsForDate = function(date) {
    const bookings = window.getAllBookings();
    const targetDate = new Date(date).toDateString();
    return bookings.filter(booking => new Date(booking.date).toDateString() === targetDate);
};

// Function to cancel booking (for admin purposes)
window.cancelBooking = function(bookingId) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookedSlots = new Set(JSON.parse(localStorage.getItem('bookedSlots') || '[]'));
    
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        const booking = bookings[bookingIndex];
        
        // Remove from booked slots
        bookedSlots.delete(booking.timeKey);
        
        // Mark as cancelled instead of removing
        booking.cancelled = true;
        booking.cancelledAt = new Date().toISOString();
        
        // Save updated data
        localStorage.setItem('bookings', JSON.stringify(bookings));
        localStorage.setItem('bookedSlots', JSON.stringify([...bookedSlots]));
        
        // Refresh calendar if exists
        if (window.generateCalendar) {
            window.generateCalendar();
        }
        
        return true;
    }
    return false;
};

// Admin console commands
console.log(`
🎯 SYSTEM BOOKINGÓW - KOMENDY ADMINISTRATORA:
═══════════════════════════════════════════════

📋 getAllBookings() - wyświetl wszystkie rezerwacje
📅 getBookingsForDate('2024-01-15') - rezerwacje na datę
❌ cancelBooking(123456) - anuluj rezerwację
🔄 localStorage.clear() - wyczyść wszystkie dane

Przykład użycia:
> getAllBookings()
> cancelBooking(1234567890123)
`);

// Function to reset all test bookings
window.resetAllBookings = function() {
    if (confirm('Czy na pewno chcesz usunąć wszystkie rezerwacje testowe?')) {
        localStorage.removeItem('bookings');
        localStorage.removeItem('bookedSlots');
        console.log('✅ Wszystkie rezerwacje zostały zresetowane');
        location.reload();
    }
};

// Function to check email booking limit
window.checkEmailBookingLimit = function(email) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const emailBookings = bookings.filter(b => b.email.toLowerCase() === email.toLowerCase());
    return emailBookings.length < 2; // Max 2 bookings per email
};

// Function to get booking count by email
window.getEmailBookingCount = function(email) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings.filter(b => b.email.toLowerCase() === email.toLowerCase()).length;
};

// Auto-refresh calendar every minute to check for new bookings
setInterval(() => {
    if (document.querySelector('.calendar-widget') && window.updateTimeSlotAvailability) {
        window.updateTimeSlotAvailability();
    }
}, 60000);

// Add console helper message for admin
console.log(`
🔧 Funkcje administracyjne:
- resetAllBookings() - resetuje wszystkie rezerwacje testowe
- getEmailBookingCount('email@example.com') - sprawdź liczbę rezerwacji dla emaila
`);