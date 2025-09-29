# 🎛️ Instrukcja Administratora - Konsola Przeglądarki

## 📖 Wprowadzenie do Konsoli

### Jak otworzyć konsolę?

#### Windows/Linux:
- **Chrome/Edge/Firefox**: `F12` lub `Ctrl + Shift + I`
- **Alternatywnie**: Prawy klik → "Zbadaj" → zakładka "Console"

#### Mac:
- **Safari**: Najpierw włącz menu deweloperskie (Preferencje → Zaawansowane → "Pokaż menu Develop")
- **Chrome/Firefox**: `Cmd + Option + I`
- **Alternatywnie**: Prawy klik → "Zbadaj element" → zakładka "Console"

### Co to jest konsola?
Konsola to narzędzie deweloperskie, które pozwala:
- Wykonywać kod JavaScript na żywo
- Sprawdzać błędy na stronie
- Zarządzać danymi aplikacji (Firebase + localStorage)
- Debugować problemy
- Monitorować synchronizację real-time

---

## 🔥 Nowe Funkcje Firebase (v4.0)

### 1. Zarządzanie Danymi Firebase

#### Sprawdź status Firebase
```javascript
console.log('Firebase Manager:', window.firebaseBookingManager);
console.log('Firebase ready:', window.bookingSystem.isFirebaseReady);
```
**Co robi**: Sprawdza czy Firebase jest połączone i gotowe do działania

#### Pobierz dane z Firebase
```javascript
// Wszystkie rezerwacje z Firebase
await getAllBookings()

// Zajęte terminy z Firebase  
await window.firebaseBookingManager.getBookedSlots()

// Konkretne rezerwacje na datę
await getBookingsForDate('2025-01-15')
```

#### Sprawdź dostępność terminu
```javascript
// Sprawdź czy termin jest wolny w Firebase
const isAvailable = await window.firebaseBookingManager.isTimeSlotAvailable('Sat Oct 25 2025-15:00');
console.log('Termin dostępny:', isAvailable);
```

### 2. Migracja Danych

#### Migruj localStorage do Firebase
```javascript
await migrateToFirebase()
```
**Co robi**: Przenosi wszystkie dane z localStorage do Firebase
**Uwaga**: Wykonuje się automatycznie przy pierwszym wczytaniu strony

#### Ręczny backup Firebase do localStorage
```javascript
// Export z Firebase do localStorage (backup)
const firebaseBookings = await window.firebaseBookingManager.getAllBookings();
localStorage.setItem('firebase_backup', JSON.stringify(firebaseBookings));
console.log('Backup Firebase zapisany do localStorage');
```

### 3. Zarządzanie Rezerwacjami w Firebase

#### Anuluj rezerwację w Firebase
```javascript
// Znajdź ID rezerwacji
const bookings = await getAllBookings();
console.table(bookings);

// Anuluj używając Firebase ID
await cancelBooking('firebase_generated_id_here')
```

#### Dodaj rezerwację bezpośrednio do Firebase
```javascript
const bookingData = {
    name: 'Test User',
    email: 'test@firebase.com',
    company: 'Test Company',
    date: new Date('2025-01-15').toISOString(),
    time: '18:00',
    timeKey: 'Mon Jan 15 2025-18:00',
    industry: 'restauracja',
    description: 'Test booking',
    budget: '2-3k'
};

const booking = await window.firebaseBookingManager.saveBooking(bookingData);
console.log('Rezerwacja dodana:', booking);
```

---

## 🔐 Funkcje Administracyjne (Zaktualizowane)

### 1. Zarządzanie Rezerwacjami (Firebase + localStorage)

#### Wyświetl wszystkie rezerwacje
```javascript
await getAllBookings()
```
**Co robi**: Pokazuje listę wszystkich rezerwacji z Firebase (lub localStorage jako fallback)
**Wynik**: Tablica obiektów z danymi klientów

#### Sprawdź liczbę rezerwacji dla emaila
```javascript
await getEmailBookingCount('email@example.com')
```
**Co robi**: Zwraca liczbę aktywnych rezerwacji dla danego emaila
**Przykład**: `await getEmailBookingCount('jan.kowalski@gmail.com')`
**Wynik**: Liczba (np. 2)

#### Anuluj konkretną rezerwację
```javascript
await cancelBooking('firebase_id_or_timestamp')
```
**Co robi**: Anuluje rezerwację w Firebase i zwalnia termin
**Przykład**: `await cancelBooking('-O1234567890abcdef')`
**Uwaga**: ID znajdziesz używając `await getAllBookings()`

#### Resetuj WSZYSTKIE rezerwacje (ostrożnie!)
```javascript
// ⚠️ NIEBEZPIECZNE - usuwa wszystko z Firebase!
const bookings = await getAllBookings();
for (const booking of bookings) {
    await cancelBooking(booking.id);
}
console.log('Wszystkie rezerwacje anulowane');
```

---

## 📊 Sprawdzanie Stanu Systemu (Zaktualizowane)

### Firebase Status Check
```javascript
// Sprawdź połączenie Firebase
console.log('🔥 Firebase Status:');
console.log('Manager available:', !!window.firebaseBookingManager);
console.log('Booking system ready:', window.bookingSystem?.isFirebaseReady);
console.log('Real-time listeners:', window.firebaseBookingManager?.listeners.size);
```

### Porównaj dane Firebase vs localStorage
```javascript
// Sprawdź różnice między Firebase a localStorage
const firebaseSlots = await window.firebaseBookingManager.getBookedSlots();
const localSlots = JSON.parse(localStorage.getItem('bookedSlots') || '[]');

console.log('🔥 Firebase slots:', firebaseSlots.length);
console.log('💾 Local slots:', localSlots.length);
console.log('🔄 Sync needed:', firebaseSlots.length !== localSlots.length);

// Pokaż różnice
const firebaseSet = new Set(firebaseSlots);
const localSet = new Set(localSlots);
const onlyFirebase = firebaseSlots.filter(slot => !localSet.has(slot));
const onlyLocal = localSlots.filter(slot => !firebaseSet.has(slot));

console.log('Only in Firebase:', onlyFirebase);
console.log('Only in localStorage:', onlyLocal);
```

### Monitor Real-time Updates
```javascript
// Włącz monitoring zmian Firebase
let updateCount = 0;
const listenerId = window.firebaseBookingManager.onBookedSlotsChange((slots) => {
    updateCount++;
    console.log(`🔄 Update #${updateCount}:`, slots.length, 'slots');
});

// Wyłącz monitoring po 30 sekundach
setTimeout(() => {
    window.firebaseBookingManager.stopListening(listenerId);
    console.log('🔇 Monitoring stopped');
}, 30000);
```

---

## 🧪 Funkcje Testowe (Zaktualizowane)

### Test Firebase Connection
```javascript
// Test podstawowego połączenia Firebase
async function testFirebaseConnection() {
    try {
        console.log('🧪 Testing Firebase connection...');
        
        // Test 1: Sprawdź manager
        if (!window.firebaseBookingManager) {
            throw new Error('Firebase manager not available');
        }
        
        // Test 2: Pobierz dane
        const slots = await window.firebaseBookingManager.getBookedSlots();
        console.log('✅ Firebase read test passed:', slots.length, 'slots');
        
        // Test 3: Zapisz test data
        const testKey = `test_${Date.now()}`;
        await window.firebaseBookingManager.bookTimeSlot(testKey);
        console.log('✅ Firebase write test passed');
        
        // Test 4: Usuń test data
        await window.firebaseBookingManager.cancelTimeSlot(testKey);
        console.log('✅ Firebase delete test passed');
        
        console.log('🎉 All Firebase tests passed!');
        
    } catch (error) {
        console.error('❌ Firebase test failed:', error);
    }
}

// Uruchom test
testFirebaseConnection();
```

### Dodaj testową rezerwację do Firebase
```javascript
async function addTestBooking() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    try {
        const booking = await window.bookingSystem.bookTimeSlot(tomorrow, '18:00', {
            name: 'Test Firebase User',
            email: 'firebase.test@example.com',
            phone: '123456789',
            company: 'Firebase Test Company',
            industry: 'usługi',
            description: 'Testowa rezerwacja Firebase',
            budget: '2-3k',
            privacy: true
        });
        
        console.log('✅ Test booking added to Firebase:', booking);
        return booking;
        
    } catch (error) {
        console.error('❌ Failed to add test booking:', error);
    }
}

// Uruchom test
addTestBooking();
```

### Stress Test Firebase
```javascript
// Test wielu operacji jednocześnie
async function stressTestFirebase() {
    console.log('🔥 Starting Firebase stress test...');
    
    const promises = [];
    for (let i = 0; i < 10; i++) {
        const testKey = `stress_test_${Date.now()}_${i}`;
        promises.push(
            window.firebaseBookingManager.bookTimeSlot(testKey)
                .then(() => window.firebaseBookingManager.cancelTimeSlot(testKey))
        );
    }
    
    try {
        await Promise.all(promises);
        console.log('✅ Stress test passed - 10 operations completed');
    } catch (error) {
        console.error('❌ Stress test failed:', error);
    }
}
```

---

## 🛠️ Debugowanie Firebase

### Sprawdź Firebase Console Logs
```javascript
// Włącz szczegółowe logowanie Firebase
window.firebaseBookingManager.database.app.options.debug = true;

// Monitor wszystkich operacji Firebase
const originalRef = window.firebaseBookingManager.database.ref;
window.firebaseBookingManager.database.ref = function(...args) {
    console.log('🔥 Firebase operation:', args);
    return originalRef.apply(this, args);
};
```

### Diagnoza problemów Firebase
```javascript
async function diagnoseFirebase() {
    console.log('🔍 Diagnosing Firebase issues...');
    
    try {
        // Test 1: Manager exists
        console.log('1. Manager exists:', !!window.firebaseBookingManager);
        
        // Test 2: Database connection
        const testRef = window.firebaseBookingManager.database.ref('.info/connected');
        testRef.on('value', (snapshot) => {
            console.log('2. Database connected:', snapshot.val());
        });
        
        // Test 3: Read permissions
        try {
            await window.firebaseBookingManager.getBookedSlots();
            console.log('3. Read permissions: ✅ OK');
        } catch (e) {
            console.log('3. Read permissions: ❌ FAILED', e.message);
        }
        
        // Test 4: Write permissions
        try {
            const testKey = `permission_test_${Date.now()}`;
            await window.firebaseBookingManager.bookTimeSlot(testKey);
            await window.firebaseBookingManager.cancelTimeSlot(testKey);
            console.log('4. Write permissions: ✅ OK');
        } catch (e) {
            console.log('4. Write permissions: ❌ FAILED', e.message);
        }
        
    } catch (error) {
        console.error('❌ Diagnosis failed:', error);
    }
}

diagnoseFirebase();
```

---

## 🔄 Zarządzanie Danymi (Firebase Era)

### Kompleksowy Backup (Firebase + localStorage)
```javascript
async function createCompleteBackup() {
    console.log('💾 Creating complete backup...');
    
    try {
        const backup = {
            timestamp: new Date().toISOString(),
            firebase: {
                bookings: await window.firebaseBookingManager.getAllBookings(),
                bookedSlots: await window.firebaseBookingManager.getBookedSlots()
            },
            localStorage: {
                bookings: localStorage.getItem('bookings'),
                bookedSlots: localStorage.getItem('bookedSlots'),
                migration: localStorage.getItem('firebase_migration_completed')
            },
            system: {
                userAgent: navigator.userAgent,
                url: window.location.href,
                firebaseReady: window.bookingSystem?.isFirebaseReady
            }
        };
        
        // Save to file
        const blob = new Blob([JSON.stringify(backup, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `skyview-backup-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        
        console.log('✅ Complete backup created and downloaded');
        return backup;
        
    } catch (error) {
        console.error('❌ Backup failed:', error);
    }
}

createCompleteBackup();
```

### Przywracanie z Backup
```javascript
async function restoreFromBackup(backupData) {
    console.log('🔄 Restoring from backup...');
    
    try {
        // Validate backup
        if (!backupData || !backupData.firebase) {
            throw new Error('Invalid backup data');
        }
        
        // Restore Firebase bookings
        for (const booking of backupData.firebase.bookings) {
            await window.firebaseBookingManager.saveBooking(booking);
        }
        
        // Restore localStorage (if needed)
        if (backupData.localStorage.bookings) {
            localStorage.setItem('bookings', backupData.localStorage.bookings);
        }
        if (backupData.localStorage.bookedSlots) {
            localStorage.setItem('bookedSlots', backupData.localStorage.bookedSlots);
        }
        
        console.log('✅ Backup restored successfully');
        location.reload();
        
    } catch (error) {
        console.error('❌ Restore failed:', error);
    }
}

// Usage: First load backup file, then:
// restoreFromBackup(yourBackupObject);
```

### Sync Firebase ↔ localStorage
```javascript
async function syncData() {
    console.log('🔄 Syncing Firebase ↔ localStorage...');
    
    try {
        // Get Firebase data
        const firebaseBookings = await window.firebaseBookingManager.getAllBookings();
        const firebaseSlots = await window.firebaseBookingManager.getBookedSlots();
        
        // Update localStorage
        localStorage.setItem('bookings', JSON.stringify(firebaseBookings));
        localStorage.setItem('bookedSlots', JSON.stringify(firebaseSlots));
        
        console.log('✅ Sync completed:');
        console.log('  Bookings synced:', firebaseBookings.length);
        console.log('  Slots synced:', firebaseSlots.length);
        
        // Refresh calendar display
        if (window.bookingSystem) {
            window.bookingSystem.updateTimeSlotDisplay();
        }
        
    } catch (error) {
        console.error('❌ Sync failed:', error);
    }
}
```

---

## 📈 Statystyki (Firebase + Analytics)

### Zaawansowane Statystyki Rezerwacji
```javascript
async function showAdvancedStats() {
    const bookings = await getAllBookings();
    
    console.log('📊 === ZAAWANSOWANE STATYSTYKI ===');
    console.log('Źródło danych:', window.bookingSystem?.isFirebaseReady ? 'Firebase' : 'localStorage');
    console.log('');
    
    // Podstawowe liczby
    console.log('📈 PODSTAWOWE LICZBY:');
    console.log('  Łączna liczba rezerwacji:', bookings.length);
    console.log('  Unikalne emaile:', new Set(bookings.map(b => b.email)).size);
    console.log('  Aktywne rezerwacje:', bookings.filter(b => !b.cancelled).length);
    console.log('');
    
    // Analiza czasowa
    console.log('⏰ ANALIZA CZASOWA:');
    const timeStats = {};
    bookings.forEach(b => {
        timeStats[b.time] = (timeStats[b.time] || 0) + 1;
    });
    console.table(timeStats);
    console.log('');
    
    // Analiza branż
    console.log('🏢 ANALIZA BRANŻ:');
    const industryStats = {};
    bookings.forEach(b => {
        industryStats[b.industry] = (industryStats[b.industry] || 0) + 1;
    });
    console.table(industryStats);
    console.log('');
    
    // Trend miesięczny
    console.log('📅 TREND MIESIĘCZNY:');
    const monthlyStats = {};
    bookings.forEach(b => {
        const month = new Date(b.date).toISOString().slice(0, 7); // YYYY-MM
        monthlyStats[month] = (monthlyStats[month] || 0) + 1;
    });
    console.table(monthlyStats);
    console.log('');
    
    // Konwersja budżetowa
    console.log('💰 ANALIZA BUDŻETÓW:');
    const budgetStats = {};
    bookings.forEach(b => {
        budgetStats[b.budget] = (budgetStats[b.budget] || 0) + 1;
    });
    console.table(budgetStats);
}

showAdvancedStats();
```

### Real-time Monitoring Dashboard
```javascript
function startRealtimeMonitoring() {
    console.log('📡 Starting real-time monitoring dashboard...');
    
    let stats = {
        totalUpdates: 0,
        lastUpdate: null,
        slotsHistory: []
    };
    
    const listenerId = window.firebaseBookingManager.onBookedSlotsChange((slots) => {
        stats.totalUpdates++;
        stats.lastUpdate = new Date().toISOString();
        stats.slotsHistory.push({
            timestamp: new Date().toISOString(),
            count: slots.length,
            slots: [...slots]
        });
        
        // Keep only last 10 updates
        if (stats.slotsHistory.length > 10) {
            stats.slotsHistory.shift();
        }
        
        console.clear();
        console.log('📡 === REAL-TIME MONITORING DASHBOARD ===');
        console.log('🕐 Last update:', new Date(stats.lastUpdate).toLocaleTimeString());
        console.log('🔢 Total updates:', stats.totalUpdates);
        console.log('📊 Current slots:', slots.length);
        console.log('📈 History (last 10):');
        console.table(stats.slotsHistory.map(h => ({
            Time: new Date(h.timestamp).toLocaleTimeString(),
            Count: h.count
        })));
        
        if (stats.totalUpdates === 1) {
            console.log('');
            console.log('💡 Dashboard is now monitoring Firebase changes in real-time');
            console.log('   Try booking from another device to see updates!');
            console.log('   Use stopRealtimeMonitoring() to stop');
        }
    });
    
    // Global stop function
    window.stopRealtimeMonitoring = () => {
        window.firebaseBookingManager.stopListening(listenerId);
        console.log('🛑 Real-time monitoring stopped');
    };
    
    return listenerId;
}

// Start monitoring
startRealtimeMonitoring();
```

---

## 🎯 Szybkie Komendy (Kopiuj-Wklej) - Zaktualizowane

```javascript
// === FIREBASE ERA - NAJCZĘŚCIEJ UŻYWANE ===

// 1. Status systemu
console.log('🔥 Firebase ready:', window.bookingSystem?.isFirebaseReady);
console.log('📊 Manager:', !!window.firebaseBookingManager);

// 2. Zobacz wszystkie rezerwacje (Firebase + localStorage fallback)
await getAllBookings()

// 3. Sprawdź Firebase connection
await window.firebaseBookingManager.getBookedSlots()

// 4. Migruj dane do Firebase (jeśli potrzebne)
await migrateToFirebase()

// 5. Resetuj testowe dane (UWAGA: Firebase!)
const bookings = await getAllBookings();
for (const booking of bookings.filter(b => b.email.includes('test'))) {
    await cancelBooking(booking.id);
}

// 6. Sprawdź email limit
await getEmailBookingCount('email@example.com')

// 7. Kompleksowy backup
createCompleteBackup()

// 8. Sync Firebase ↔ localStorage
syncData()

// 9. Start real-time monitoring
startRealtimeMonitoring()

// 10. Test Firebase connection
testFirebaseConnection()
```

---

## ⚠️ Ostrzeżenia (Zaktualizowane)

1. **FIREBASE CHANGES ARE PERMANENT** - operacje Firebase wpływają na wszystkich użytkowników!
2. **Uważaj na `cancelBooking()`** - anuluje rezerwacje globalnie w Firebase
3. **Rób backupy** przed większymi zmianami: `createCompleteBackup()`
4. **Testuj najpierw** na środowisku dev/test
5. **Real-time monitoring** może generować dużo logów - używaj `stopRealtimeMonitoring()`
6. **Firebase quota** - uważaj na przekroczenie limitów (sprawdzaj Firebase Console)

---

## 🆘 Pomoc Firebase

### Konsola pokazuje błędy Firebase?
1. Sprawdź Firebase Console: [console.firebase.google.com](https://console.firebase.google.com)
2. Uruchom: `diagnoseFirebase()` 
3. Sprawdź network tab (F12) - czy są blokowane połączenia

### Firebase nie synchronizuje?
1. Test connection: `testFirebaseConnection()`
2. Check real-time: `startRealtimeMonitoring()`
3. Manual sync: `syncData()`

### Dane Firebase vs localStorage różnią się?
1. Sprawdź różnice: patrz sekcja "Porównaj dane Firebase vs localStorage"
2. Wymuś sync: `syncData()`
3. Backup przed naprawą: `createCompleteBackup()`

### Potrzebujesz więcej pomocy?
- Firebase Console → Usage & Billing (sprawdź limity)
- Firebase Console → Realtime Database → Rules (sprawdź uprawnienia)
- Network tab w dev tools (sprawdź połączenia)
- `diagnoseFirebase()` - kompleksowa diagnoza

---

*Wersja: 4.0 (Firebase Integration)*  
*Ostatnia aktualizacja: Wrzesień 2025*