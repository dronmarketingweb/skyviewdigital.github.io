# 📚 Kompleksowa Instrukcja Zarządzania SkyView Digital

## 📋 Spis Treści
1. [Szybki Start](#szybki-start)
2. [Wymiana Mediów](#wymiana-mediów)
3. [Firebase Integration](#firebase-integration)
4. [Konfiguracja EmailJS](#konfiguracja-emailjs)
5. [Konfiguracja Telegram Bot](#konfiguracja-telegram-bot)
6. [Zarządzanie Social Media](#zarządzanie-social-media)
7. [System Bookingów](#system-bookingów)
8. [Dodawanie Nowych Funkcjonalności](#dodawanie-nowych-funkcjonalności)
9. [Google Analytics i Tracking](#google-analytics-i-tracking)
10. [Modyfikacje Stylów](#modyfikacje-stylów)
11. [Struktura Projektu](#struktura-projektu)
12. [Scenariusze Rozwiązywania Problemów](#scenariusze-rozwiązywania-problemów)
13. [Potencjalne Rozszerzenia](#potencjalne-rozszerzenia)

---

## 🚀 Szybki Start

### Podstawowe informacje
- **Strona główna**: `index.html`
- **Style**: `css/style.css`
- **Logika**: `js/main.js`, `js/booking-system.js`, `js/firebase-config.js`
- **Obrazy**: folder `images/`
- **Dokumentacja**: folder `docs/`

### Jak edytować stronę
1. Otwórz plik `index.html` w edytorze kodu
2. Wprowadź zmiany
3. Zapisz plik
4. Odśwież przeglądarkę (lub Ctrl+F5 aby wyczyścić cache)

---

## 🎨 Wymiana Mediów

### 1. Logo
**Lokalizacja**: Obecnie używa favikonów
- **Nawigacja**: `favicon-32x32.png`
- **Stopka**: `apple-touch-icon.png`

**Aby zmienić logo:**
```html
<!-- W index.html linia ~99 -->
<img src="images/TWOJE-LOGO.png" alt="SkyView Digital Logo" class="mr-3 h-10 w-auto logo-main">

<!-- W stopce linia ~1067 -->
<img src="images/TWOJE-LOGO.png" alt="SkyView Digital Logo" class="mr-3 h-8 w-auto logo-footer">
```

**Wymagania logo:**
- Format: PNG z przezroczystym tłem
- Rozmiar: 500x200px lub proporcjonalny
- Styl: minimalistyczny, dopasowany do marki

### 2. Wideo Hero Section (tło strony)
**Lokalizacja w kodzie**: `index.html` linia ~88-91

```html
<video class="w-full h-full object-cover" autoplay muted loop playsinline webkit-playsinline>
    <source src="TWÓJ_URL_VIDEO" type="video/mp4">
    <div class="w-full h-full bg-gradient-to-br from-primary to-blue-800"></div>
</video>
```

**Wymagania video:**
- Format: MP4 z kodekiem H.264
- Rozdzielczość: 1920x1080 lub 4K
- Długość: 10-30 sekund (loop)
- Rozmiar: max 50MB (preferowane <20MB)
- Bez dźwięku lub z dźwiękiem (będzie wyciszony)

### 3. Video Portfolio (sekcja "Efekt WOW")
**Lokalizacja**: `index.html` linia ~168-170

```html
<video id="pierwsza-historia-video" class="w-full h-0 object-cover transition-all duration-700" controls playsinline webkit-playsinline>
    <source src="TWÓJ_FILM_PORTFOLIO" type="video/mp4">
</video>
```

**Wymagania:**
- Format: MP4, WebM jako backup
- Rozdzielczość: 1080p lub 4K
- Długość: 60-120 sekund
- Rozmiar: max 100MB
- Z dźwiękiem (użytkownik kontroluje odtwarzanie)

### 4. Obrazy Philosophy Section
**Lokalizacja**: `images/iceberg-philosophy.jpg`

**Aby zmienić:**
```html
<!-- Linia ~280 -->
<img src="images/TWÓJ-OBRAZ-FILOZOFII.jpg" alt="Opis obrazu" class="w-full h-auto rounded-2xl shadow-2xl">
```

**Wymagania:**
- Format: JPG/PNG
- Rozmiar: 1200x800px minimum
- Jakość: wysoka, profesjonalne zdjęcie
- Tematyka: pasująca do filozofii firmy

---

## 🔥 Firebase Integration

### Struktura Firebase Realtime Database

```
skyview-booking/
├── bookedSlots/
│   ├── "Sat_Oct_25_2025-15_00": true
│   └── "Mon_Nov_01_2025-18_00": true
└── bookings/
    └── [auto_generated_id]/
        ├── id: "auto_generated_id"
        ├── name: "Jan Kowalski"
        ├── email: "jan@firma.pl"
        ├── company: "Firma ABC"
        ├── date: "2025-10-25T00:00:00.000Z"
        ├── time: "15:00"
        ├── timeKey: "Sat Oct 25 2025-15:00"
        ├── createdAt: "2025-09-28T..."
        └── cancelled: false
```

### Co robić gdy Firebase przestanie działać?

#### Problem 1: Błędy połączenia Firebase
**Symptomy:** Konsola pokazuje błędy Firebase, calendar nie synchronizuje

**Rozwiązanie:**
1. **Sprawdź konfigurację** w `js/firebase-config.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyD4rgeGO5BkVDRvtBrGNI0njgkB8yuI37k",
     authDomain: "skyview-booking.firebaseapp.com",
     databaseURL: "https://skyview-booking-default-rtdb.europe-west1.firebasedatabase.app",
     // ...
   };
   ```

2. **Sprawdź Firebase Console:**
   - Wejdź na [console.firebase.google.com](https://console.firebase.google.com)
   - Projekty → skyview-booking → Realtime Database
   - Sprawdź czy database jest aktywny

3. **Sprawdź reguły bezpieczeństwa:**
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```

#### Problem 2: Firebase quota exceeded
**Symptomy:** Błędy związane z limitem operacji

**Rozwiązanie:**
1. **Sprawdź usage** w Firebase Console → Usage
2. **Optymalizuj listeners** - zmniejsz częstotliwość aktualizacji
3. **Upgrade plan** jeśli potrzebny

#### Problem 3: Fallback do localStorage
System automatycznie przełączy się na localStorage gdy Firebase nie działa. **Nie wymaga interwencji**.

### Backup i Restore danych Firebase

**Export danych:**
```javascript
// W konsoli przeglądarki
const backupData = await window.firebaseBookingManager.getAllBookings();
console.log('Backup data:', JSON.stringify(backupData, null, 2));
// Skopiuj i zapisz do pliku
```

**Import danych:**
```javascript
// Po naprawie Firebase
const backupData = [/* wklej dane */];
for (const booking of backupData) {
  await window.firebaseBookingManager.saveBooking(booking);
}
```

---

## 📧 Konfiguracja EmailJS

### Krok 1: Utwórz konto
1. Wejdź na [emailjs.com](https://www.emailjs.com)
2. Zarejestruj się (darmowy plan = 200 emaili/miesiąc)

### Krok 2: Konfiguracja usługi email
1. Dashboard → Email Services → Add New Service
2. Wybierz Gmail/Outlook
3. Połącz swoje konto email
4. Zapisz **Service ID**

### Krok 3: Stwórz szablony

#### Szablon dla administratora (template_mcc1e8k)
**Subject:** `🔔 Nowa rezerwacja: {{from_name}} - {{day_of_week}}, {{date}} o {{time}}`

**Treść:**
```html
<h2>🔔 Nowa rezerwacja spotkania!</h2>

<h3>👤 DANE KLIENTA:</h3>
<ul>
  <li><strong>Imię i nazwisko:</strong> {{from_name}}</li>
  <li><strong>Email:</strong> {{from_email}}</li>
  <li><strong>Telefon:</strong> {{phone}}</li>
  <li><strong>Firma:</strong> {{company}}</li>
  <li><strong>Branża:</strong> {{industry}}</li>
</ul>

<h3>📅 TERMIN SPOTKANIA:</h3>
<ul>
  <li><strong>Data:</strong> {{day_of_week}}, {{date}}</li>
  <li><strong>Godzina:</strong> {{time}}</li>
</ul>

<h3>💼 SZCZEGÓŁY PROJEKTU:</h3>
<ul>
  <li><strong>Opis projektu:</strong> {{description}}</li>
  <li><strong>Budżet:</strong> {{budget}}</li>
</ul>

<hr>
<p><em>Wiadomość wysłana automatycznie ze strony SkyView Digital</em></p>
```

#### Szablon dla klienta (template_tf7482v)
**Subject:** `✅ Potwierdzenie rezerwacji - {{day_of_week}}, {{date}} o {{time}}`

**Treść:**
```html
<h2>✅ Dziękujemy za rezerwację!</h2>

<p>Witaj {{to_name}},</p>

<p>Potwierdzamy rezerwację spotkania:</p>

<h3>📅 Szczegóły spotkania:</h3>
<ul>
  <li><strong>Data:</strong> {{day_of_week}}, {{date}}</li>
  <li><strong>Godzina:</strong> {{time}}</li>
</ul>

<h3>📞 Kontakt w razie pytań:</h3>
<ul>
  <li><strong>Telefon:</strong> +48 667 849 367</li>
  <li><strong>Email:</strong> dron.marketingweb@gmail.com</li>
</ul>

<p>Do zobaczenia na spotkaniu!</p>

<hr>
<p><em>SkyView Digital - Twoja firma z lotu ptaka</em></p>
```

### Krok 4: Aktualizacja kluczy w kodzie
**Obecna konfiguracja** w `js/booking-system.js` (linie ~591-592):
```javascript
emailjs.init('V3ydLx9GdC2_OudCa');
```

**Szablony** (linie ~274, ~290):
```javascript
// Template dla admina
await emailjs.send('service_deau84a', 'template_mcc1e8k', adminData);

// Template dla klienta  
await emailjs.send('service_deau84a', 'template_tf7482v', clientData);
```

---

## 🤖 Konfiguracja Telegram Bot

### Status: ✅ Skonfigurowany i działający

**Obecna konfiguracja** w `js/booking-system.js` (linie ~322-323):
```javascript
const TELEGRAM_BOT_TOKEN = '8386380132:AAGM8WwW9-YB4u1_2BmMZNF__kGzVyubLSM';
const TELEGRAM_CHAT_ID = '5902050669'; // Karol Grankers
```

### Aby zmienić na własny bot:

#### Krok 1: Stwórz nowy bot
1. Otwórz Telegram
2. Znajdź @BotFather
3. Wyślij `/newbot`
4. Podaj nazwę (np. "SkyView Notifications")
5. Podaj username (np. @skyview_notify_bot)
6. Otrzymasz **Bot Token**

#### Krok 2: Uzyskaj Chat ID
1. Rozpocznij czat z botem
2. Wyślij dowolną wiadomość
3. Otwórz: `https://api.telegram.org/botTWÓJ_TOKEN/getUpdates`
4. Znajdź `"chat":{"id":XXXXXXXXX}` - to Twój **Chat ID**

#### Krok 3: Aktualizacja w kodzie
```javascript
// W js/booking-system.js linie ~322-323
const TELEGRAM_BOT_TOKEN = 'TWÓJ_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'TWÓJ_CHAT_ID';
```

---

## 📱 Zarządzanie Social Media

### Aktywacja ukrytych platform

#### TikTok - aktywacja
W `index.html` linia ~1122-1126 **odkomentuj**:
```html
<a href="TWÓJ_LINK_TIKTOK" target="_blank" class="flex items-center text-gray-300 hover:text-white transition">
    <i class="fab fa-tiktok mr-2"></i>
    <span>Krótkie prezentacje</span>
</a>
```

#### YouTube - aktywacja  
W `index.html` linia ~1113-1117 **odkomentuj**:
```html
<a href="TWÓJ_LINK_YOUTUBE" target="_blank" class="flex items-center text-gray-300 hover:text-white transition">
    <i class="fab fa-youtube mr-2"></i>
    <span>Zobacz nasze filmy</span>
</a>
```

#### Instagram - zmiana linku
W `index.html` linia ~1118-1121:
```html
<a href="https://www.instagram.com/TWOJA_NAZWA" target="_blank" class="flex items-center text-gray-300 hover:text-white transition">
    <i class="fab fa-instagram mr-2"></i>
    <span>Behind the scenes</span>
</a>
```

---

## 📅 System Bookingów

### Logika działania
1. **Kalendarz** - generowany dynamicznie w JavaScript
2. **Firebase sync** - real-time synchronizacja między urządzeniami  
3. **Walidacja** - sprawdzanie dostępności przed zapisem
4. **Notifications** - EmailJS + Telegram po potwierdzeniu

### Godziny pracy (można zmieniać)
**Lokalizacja**: `js/booking-system.js` linia ~14-34

```javascript
getAvailableHoursForDate(date) {
    const dayOfWeek = date.getDay();
    
    // Niedziela (0) - wyłączona
    if (dayOfWeek === 0) {
        return [];
    }
    // Sobota (6) - specjalne godziny  
    else if (dayOfWeek === 6) {
        const hours = [];
        for (let hour = 8; hour <= 20; hour++) {
            hours.push(`${hour}:00`);
        }
        return hours;
    }
    // Poniedziałek-Piątek
    else {
        return ['4:00', '5:00', '18:00', '19:00', '20:00', '21:00'];
    }
}
```

### Dodawanie nowych godzin pracy
```javascript
// Dla dni roboczych dodaj nowe godziny:
return ['4:00', '5:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

// Dla soboty zmień zakres:
for (let hour = 6; hour <= 22; hour++) { // 6:00-22:00
    hours.push(`${hour}:00`);
}
```

### Limity i zabezpieczenia
**Email limit** (linia ~485-492):
```javascript
// Sprawdzenie limitu 2 rezerwacje na email
const emailBookingCount = await window.getEmailBookingCount(bookingData.email);
if (emailBookingCount >= 2) {
    // Zmień limit tutaj (zamiast 2)
    alert('Osiągnięto limit rezerwacji...');
}
```

**Zakres dat** (linia ~65-66):
```javascript
const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 2); // Zmień na +3, +4 etc.
```

---

## 🆕 Dodawanie Nowych Funkcjonalności

### Jak dodać nową sekcję do strony

#### 1. Dodaj HTML sekcji
**Lokalizacja**: `index.html` przed stopką (linia ~1060)

```html
<!-- Nowa Sekcja -->
<section id="nowa-sekcja" class="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-20" data-aos="fade-up">
            <h2 class="font-serif text-5xl md:text-6xl mb-8 text-gray-900">
                Tytuł <span class="text-primary italic">Nowej Sekcji</span>
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto font-space leading-relaxed">
                Opis sekcji...
            </p>
        </div>
        
        <!-- Treść -->
        <div class="max-w-6xl mx-auto">
            <!-- Twoja treść tutaj -->
        </div>
    </div>
</section>
```

#### 2. Dodaj do nawigacji
**Lokalizacja**: `index.html` linia ~102-107

```html
<div class="hidden md:flex space-x-8 text-white">
    <a href="#demo" class="hover:text-accent transition">Portfolio</a>
    <a href="#process" class="hover:text-accent transition">Proces</a>
    <a href="#values" class="hover:text-accent transition">Nasza Filozofia</a>
    <a href="#nowa-sekcja" class="hover:text-accent transition">Nowa Sekcja</a>
    <a href="#booking" class="hover:text-accent transition">Kontakt</a>
</div>
```

#### 3. Dodaj do mobile menu
**Lokalizacja**: `index.html` linia ~1139-1143

```html
<div class="flex flex-col items-center justify-center h-full space-y-8 text-white text-2xl">
    <a href="#demo" class="hover:text-accent transition">Portfolio</a>
    <a href="#process" class="hover:text-accent transition">Proces</a>
    <a href="#philosophy" class="hover:text-accent transition">Nasza Filozofia</a>
    <a href="#nowa-sekcja" class="hover:text-accent transition">Nowa Sekcja</a>
    <a href="#booking" class="hover:text-accent transition">Kontakt</a>
</div>
```

### Jak dodać formularz kontaktowy

#### 1. HTML formularza
```html
<form id="kontakt-form" class="space-y-6">
    <div class="grid md:grid-cols-2 gap-6">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Imię <span class="text-red-500">*</span></label>
            <input type="text" name="name" required class="w-full p-4 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email <span class="text-red-500">*</span></label>
            <input type="email" name="email" required class="w-full p-4 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
        </div>
    </div>
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Wiadomość <span class="text-red-500">*</span></label>
        <textarea name="message" rows="5" required class="w-full p-4 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"></textarea>
    </div>
    <button type="submit" class="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition">
        Wyślij wiadomość
    </button>
</form>
```

#### 2. JavaScript obsługi
**Dodaj do** `js/main.js`:

```javascript
// Obsługa formularza kontaktowego
document.getElementById('kontakt-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wysyłanie...';
    
    try {
        // Wyślij przez EmailJS
        await emailjs.send('service_deau84a', 'TEMPLATE_ID_KONTAKT', {
            name: formData.get('name'),
            email: formData.get('email'), 
            message: formData.get('message'),
            to_email: 'dron.marketingweb@gmail.com'
        });
        
        alert('✅ Wiadomość wysłana pomyślnie!');
        this.reset();
        
    } catch (error) {
        console.error('Błąd wysyłania:', error);
        alert('❌ Wystąpił błąd. Spróbuj ponownie.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Wyślij wiadomość';
    }
});
```

### Jak dodać gallery/portfolio

#### 1. HTML gallery
```html
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="group cursor-pointer" data-gallery="item1">
        <div class="relative overflow-hidden rounded-2xl">
            <img src="images/portfolio1.jpg" alt="Projekt 1" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-4 left-4 text-white">
                    <h3 class="font-bold text-lg">Projekt 1</h3>
                    <p class="text-sm">Opis projektu...</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Więcej elementów... -->
</div>

<!-- Modal do powiększania -->
<div id="gallery-modal" class="fixed inset-0 bg-black bg-opacity-90 z-50 hidden flex items-center justify-center" onclick="closeModal()">
    <div class="relative max-w-4xl max-h-4xl">
        <img id="modal-image" src="" alt="" class="max-w-full max-h-full">
        <button onclick="closeModal()" class="absolute top-4 right-4 text-white text-3xl">&times;</button>
    </div>
</div>
```

#### 2. JavaScript gallery
**Dodaj do** `js/main.js`:

```javascript
// Gallery modal
function openModal(imageSrc, imageAlt) {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Event listeners dla gallery
document.querySelectorAll('[data-gallery]').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        openModal(img.src, img.alt);
    });
});

// Zamknij modal klawiszem ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
```

---

## 📊 Google Analytics i Tracking

### Dodawanie Google Analytics 4

#### 1. Uzyskaj Measurement ID
1. Wejdź na [analytics.google.com](https://analytics.google.com)
2. Utwórz nową właściwość 
3. Skopiuj **Measurement ID** (format: G-XXXXXXXXXX)

#### 2. Dodaj do head strony
**Lokalizacja**: `index.html` po `<title>` (linia ~6)

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### 3. Dodaj custom events
**Dodaj do** `js/main.js`:

```javascript
// Custom events tracking
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Track video play
document.getElementById('play-historia-btn')?.addEventListener('click', function() {
    trackEvent('video_play', {
        video_title: 'Pierwsza Historia',
        video_location: 'hero_section'
    });
});

// Track form submissions
document.getElementById('bookingForm')?.addEventListener('submit', function() {
    trackEvent('form_submit', {
        form_type: 'booking',
        form_location: 'booking_section'
    });
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestones
        if ([25, 50, 75, 100].includes(scrollPercent)) {
            trackEvent('scroll_depth', {
                percent: scrollPercent
            });
        }
    }
});
```

### Facebook Pixel

#### 1. Uzyskaj Pixel ID
1. Wejdź do Facebook Ads Manager
2. Przejdź do Events Manager
3. Skopiuj **Pixel ID**

#### 2. Dodaj kod do head
```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'TWÓJ_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=TWÓJ_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
```

#### 3. Custom events Facebook
```javascript
// Track booking completion
function trackBookingComplete(bookingData) {
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Booking Consultation',
            value: 0, // lub szacowana wartość
            currency: 'PLN'
        });
    }
}
```

---

## 🎨 Modyfikacje Stylów

### Kolory główne
**Lokalizacja**: `index.html` sekcja Tailwind config (linia ~64-80)

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#2563eb',    // Główny niebieski
                accent: '#f59e0b',     // Akcent pomarańczowy  
                background: '#f8fafc', // Tło jasne
                text: '#1e293b'        // Tekst ciemny
            }
        }
    }
}
```

### Dodawanie nowych kolorów
```javascript
colors: {
    primary: '#2563eb',
    accent: '#f59e0b', 
    background: '#f8fafc',
    text: '#1e293b',
    // Nowe kolory
    success: '#10b981',    // Zielony sukces
    warning: '#f59e0b',    // Żółty warning  
    danger: '#ef4444',     // Czerwony błąd
    info: '#3b82f6'        // Niebieski info
}
```

### Czcionki
**Obecne czcionki** (linia ~45-46):
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

**Dodanie nowej czcionki:**
1. **Dodaj link** do `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

2. **Zaktualizuj config**:
```javascript
fontFamily: {
    'space': ['Space Grotesk', 'sans-serif'],
    'mono': ['JetBrains Mono', 'monospace'],
    'serif': ['Playfair Display', 'serif'],
    'poppins': ['Poppins', 'sans-serif'] // Nowa czcionka
}
```

3. **Użyj w CSS**:
```html
<h1 class="font-poppins">Tytuł z Poppins</h1>
```

### Responsywność - breakpointy
```javascript
// Dodaj custom breakpointy
screens: {
    'xs': '475px',     // Extra small
    'sm': '640px',     // Small  
    'md': '768px',     // Medium
    'lg': '1024px',    // Large
    'xl': '1280px',    // Extra large
    '2xl': '1536px',   // 2X large
    '3xl': '1920px'    // Custom 3X large
}
```

### Custom CSS w style.css
**Lokalizacja**: `css/style.css`

**Przykład dodania nowych stylów:**
```css
/* Custom hover effects */
.hover-lift {
    transition: transform 0.3s ease;
}
.hover-lift:hover {
    transform: translateY(-5px);
}

/* Custom gradients */
.gradient-blue {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-orange {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* Custom animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}
```

---

## 📂 Struktura Projektu

```
skyview-digital/
├── index.html                    # Główna strona - punkt wejścia
├── sw.js                        # Service Worker - offline support  
├── README.md                    # Dokumentacja użytkownika
├── favicon.ico                  # Podstawowa ikona strony
├── favicon-16x16.png           # Ikona 16px
├── favicon-32x32.png           # Ikona 32px (używana w nav)
├── apple-touch-icon.png        # Ikona Apple 180px (używana w footer)
├── css/
│   └── style.css               # Dodatkowe style CSS
├── js/
│   ├── main.js                 # Główna logika strony + admin funkcje
│   ├── booking-system.js       # System rezerwacji z Firebase
│   └── firebase-config.js      # Konfiguracja Firebase Database
├── images/
│   ├── skyview-logo.png        # Logo firmy (backup)
│   └── iceberg-philosophy.jpg  # Obraz w sekcji filozofii
└── docs/                       # Dokumentacja techniczna
    ├── INSTRUKCJA-KOMPLEKSOWA.md     # Ten plik
    └── INSTRUKCJA-ADMIN-KONSOLA.md   # Komendy administratora
```

### Zależności zewnętrzne (CDN)
- **Tailwind CSS** - `https://cdn.tailwindcss.com`
- **Font Awesome** - `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css`
- **Google Fonts** - Space Grotesk, JetBrains Mono, Playfair Display
- **AOS Animation** - `https://unpkg.com/aos@2.3.1/dist/aos.css`
- **EmailJS** - `https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js`
- **Firebase** - `https://www.gstatic.com/firebasejs/12.3.0/`

---

## 🔧 Scenariusze Rozwiązywania Problemów

### Problem: Kalendarz nie ładuje się

#### Symptomy:
- Pusta sekcja kalendarza
- Błąd w konsoli JavaScript
- Brak reakcji na kliknięcia dat

#### Rozwiązania:
1. **Sprawdź konsole** (F12) - szukaj błędów JavaScript
2. **Sprawdź Firebase** - czy działa połączenie:
   ```javascript
   console.log(window.firebaseBookingManager);
   ```
3. **Wyczyść cache** - Ctrl+Shift+R lub Ctrl+F5
4. **Sprawdź localStorage** - może być zapełniony:
   ```javascript
   localStorage.clear();
   location.reload();
   ```

### Problem: EmailJS nie wysyła wiadomości

#### Symptomy:
- Formularz się wysyła ale emaile nie dochodzą
- Błąd "EmailJS error" w konsoli
- Timeout errors

#### Rozwiązania:
1. **Sprawdź konfigurację** w EmailJS dashboard:
   - Service ID poprawny
   - Template ID istnieje
   - Public Key aktualny

2. **Sprawdź limity** - EmailJS free tier = 200 emaili/miesiąc

3. **Sprawdź spam** - emaile mogą trafiać do spamu

4. **Test connection**:
   ```javascript
   // W konsoli przeglądarki
   emailjs.send('service_deau84a', 'template_mcc1e8k', {
       from_name: 'Test',
       from_email: 'test@test.pl'
   }).then(result => console.log(result))
     .catch(error => console.error(error));
   ```

### Problem: Firebase synchronizacja nie działa

#### Symptomy:
- Rezerwacje nie są widoczne na innych urządzeniach
- Błędy Firebase w konsoli
- Status "Tryb lokalny" zamiast "Synchronizacja aktywna"

#### Rozwiązania:
1. **Sprawdź konfigurację Firebase**:
   ```javascript
   console.log(window.firebaseBookingManager);
   ```

2. **Sprawdź Firebase Console** - czy projekt aktywny

3. **Sprawdź network** - czy są blokowane połączenia Firebase

4. **Manual sync test**:
   ```javascript
   await window.firebaseBookingManager.getBookedSlots();
   ```

### Problem: Wideo nie odtwarza się

#### Symptomy:
- Czarny ekran zamiast video
- Błąd loading video
- Video nie zaczyna się automatycznie

#### Rozwiązania:
1. **Sprawdź format** - musi być MP4 z H.264
2. **Sprawdź rozmiar** - max ~50MB dla hero video  
3. **Sprawdź kodek**:
   ```bash
   # Komenda ffmpeg do konwersji
   ffmpeg -i input.mov -vcodec libx264 -acodec aac output.mp4
   ```
4. **Sprawdź atrybuty** - `playsinline webkit-playsinline` dla iOS

### Problem: Strona ładuje się wolno

#### Symptomy:
- Długi czas ładowania (>5 sekund)
- Wolne przewijanie
- Opóźnienia w animacjach

#### Rozwiązania:
1. **Optymalizuj obrazy**:
   - Kompresja JPG/PNG
   - Format WebP dla nowoczesnych przeglądarek
   - Lazy loading już zaimplementowane

2. **Sprawdź video**:
   - Zmniejsz rozdzielczość do 1080p
   - Kompresja video (H.264, CRF 23)

3. **Sprawdź CDN**:
   - Tailwind, FontAwesome, Firebase - wszystkie z CDN
   - Sprawdź network tab (F12)

### Problem: Mobile experience

#### Symptomy:
- Źle wyświetla się na telefonie
- Elementy za małe/duże
- Scroll problems

#### Rozwiązania:
1. **Sprawdź viewport meta tag** (już jest w `<head>`):
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **Test responsive** - użyj dev tools (F12) → device toolbar

3. **Sprawdź touch targets** - przyciski min 44px wysokość

4. **iOS video fix** - sprawdź `playsinline` attribute

---

## 🚀 Potencjalne Rozszerzenia

### 1. Blog/Aktualności System

#### Struktura danych:
```javascript
// Firebase struktura dla blog posts
{
  "blog": {
    "post-id-1": {
      "title": "Tytuł posta",
      "slug": "tytul-posta", 
      "content": "Treść w markdown...",
      "excerpt": "Krótki opis...",
      "author": "Karol Grankers",
      "date": "2025-01-15",
      "tags": ["drony", "fotografia"],
      "featured_image": "url_to_image",
      "published": true
    }
  }
}
```

#### HTML template:
```html
<!-- Blog Section -->
<section id="blog" class="py-32 bg-white">
    <div class="container mx-auto px-4">
        <div class="text-center mb-20">
            <h2 class="font-serif text-5xl mb-8">Behind the Scenes</h2>
            <p class="text-xl text-gray-600">Prawdziwe historie z planu</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="blog-posts">
            <!-- Posts loaded via JavaScript -->
        </div>
    </div>
</section>
```

### 2. Customer Reviews/Testimonials

#### Firebase struktura:
```javascript
{
  "reviews": {
    "review-id-1": {
      "name": "Jan Kowalski",
      "company": "Restauracja ABC", 
      "rating": 5,
      "text": "Rewelacyjne filmy...",
      "date": "2024-12-01",
      "approved": true,
      "featured": true
    }
  }
}
```

#### Formularz dodawania opinii:
```html
<form id="review-form">
    <input type="text" name="name" placeholder="Imię i nazwisko" required>
    <input type="text" name="company" placeholder="Firma (opcjonalne)">
    <div class="rating-stars">
        <span data-rating="1">⭐</span>
        <span data-rating="2">⭐</span>
        <span data-rating="3">⭐</span>
        <span data-rating="4">⭐</span>
        <span data-rating="5">⭐</span>
    </div>
    <textarea name="review" placeholder="Opinia o współpracy..." required></textarea>
    <button type="submit">Dodaj opinię</button>
</form>
```

### 3. Portfolio Gallery z Filtrami

#### Kategorie:
- Restauracje
- Hotele
- Budownictwo  
- Nieruchomości
- Wydarzenia

#### JavaScript filtering:
```javascript
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
```

### 4. Live Chat Integration

#### Tawk.to integration:
```html
<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/YOUR_TAWK_ID/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
```

### 5. Price Calculator

#### Interaktywny kalkulator cen:
```html
<div id="price-calculator">
    <h3>Kalkulator wyceny</h3>
    
    <div class="calculator-options">
        <label>
            <input type="checkbox" data-price="500"> Ujęcia dronem (500 zł)
        </label>
        <label>
            <input type="checkbox" data-price="1200"> Strona internetowa (1200 zł)  
        </label>
        <label>
            <input type="checkbox" data-price="300"> Montaż video (300 zł)
        </label>
    </div>
    
    <div class="price-total">
        Szacowana cena: <span id="total-price">0 zł</span>
    </div>
</div>
```

```javascript
function calculatePrice() {
    const checkboxes = document.querySelectorAll('#price-calculator input[type="checkbox"]');
    let total = 0;
    
    checkboxes.forEach(cb => {
        if (cb.checked) {
            total += parseInt(cb.dataset.price);
        }
    });
    
    document.getElementById('total-price').textContent = total + ' zł';
}

// Event listeners
document.querySelectorAll('#price-calculator input[type="checkbox"]')
    .forEach(cb => cb.addEventListener('change', calculatePrice));
```

### 6. Multi-language Support

#### Struktura tłumaczeń:
```javascript
const translations = {
    pl: {
        hero_title: "Tworzymy Historie, które latają",
        hero_subtitle: "Twoja firma z lotu ptaka",
        booking_title: "Umówmy się na godzinę"
    },
    en: {
        hero_title: "We Create Stories that Fly", 
        hero_subtitle: "Your business from bird's eye view",
        booking_title: "Let's schedule an hour"
    }
};

function translate(key, lang = 'pl') {
    return translations[lang][key] || key;
}
```

### 7. Advanced Analytics Dashboard

#### Dla właściciela - statystyki:
- Ilość rezerwacji dziennie/tygodniowo
- Najpopularniejsze godziny  
- Konwersja z wizyt na rezerwacje
- Heatmapa scrollowania strony
- A/B testing różnych wersji

#### Firebase struktura:
```javascript
{
  "analytics": {
    "2025-01-15": {
      "visits": 145,
      "bookings": 8,
      "conversion_rate": 5.5,
      "popular_hours": ["18:00", "19:00"],
      "bounce_rate": 35
    }
  }
}
```

---

*Ostatnia aktualizacja: Wrzesień 2025*  
*Wersja: 4.0 (Firebase Integration)*