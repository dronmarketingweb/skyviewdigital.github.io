# 🔥 Instrukcje naprawy Firebase Database

## Problem
Firebase Realtime Database wyświetla błędy:
```
❌ Error: Permission denied
❌ Error: permission_denied at /bookedSlots: Client doesn't have permission to access the desired data.
```

## Rozwiązanie - Konfiguracja reguł Firebase Database

### Krok 1: Otwórz konsolę Firebase
1. Przejdź do: https://console.firebase.google.com/
2. Wybierz projekt: **skyview-booking**

### Krok 2: Przejdź do Realtime Database
1. W menu po lewej stronie kliknij **"Realtime Database"**
2. Jeśli baza nie jest utworzona, kliknij **"Create Database"**
   - Wybierz lokalizację: **europe-west1** (lub inną, ale zgodną z databaseURL w konfiguracji)
   - Wybierz tryb: **test mode** (dla rozwoju) lub **locked mode** (później zmienimy reguły)

### Krok 3: Skonfiguruj reguły bezpieczeństwa
1. Kliknij zakładkę **"Rules"** (Reguły)
2. Zastąp obecne reguły następującym kodem:

#### Opcja A: Reguły deweloperskie (dla testów - NIEBEZPIECZNE w produkcji!)
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

⚠️ **UWAGA**: Te reguły pozwalają każdemu na odczyt i zapis! Używaj TYLKO do testów!

#### Opcja B: Reguły produkcyjne (ZALECANE)
```json
{
  "rules": {
    "bookedSlots": {
      ".read": true,
      ".write": true
    },
    "bookings": {
      ".read": true,
      "$bookingId": {
        ".write": true,
        ".validate": "newData.hasChildren(['name', 'email', 'company', 'timeKey', 'createdAt'])"
      }
    }
  }
}
```

#### Opcja C: Reguły z uwierzytelnianiem (NAJBEZPIECZNIEJSZE - wymaga Auth)
```json
{
  "rules": {
    "bookedSlots": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "bookings": {
      ".read": "auth != null",
      "$bookingId": {
        ".write": "auth != null",
        ".validate": "newData.hasChildren(['name', 'email', 'company', 'timeKey', 'createdAt'])"
      }
    }
  }
}
```

### Krok 4: Zapisz reguły
1. Kliknij przycisk **"Publish"** (Opublikuj)
2. Poczekaj na potwierdzenie

### Krok 5: Zweryfikuj działanie
1. Odśwież stronę: https://3000-ibl67mxh3ento5wvhg1cw-de59bda9.sandbox.novita.ai
2. Otwórz konsolę przeglądarki (F12)
3. Sprawdź czy błędy Firebase zniknęły
4. Powinieneś zobaczyć:
   ```
   ✅ Firebase integration ready
   🔥 Firebase Status: Synchronizacja aktywna
   ```

## Dodatkowe sprawdzenia

### Sprawdź URL bazy danych
W pliku `js/firebase-config.js` (linia 12):
```javascript
databaseURL: "https://skyview-booking-default-rtdb.europe-west1.firebasedatabase.app"
```

URL powinien pasować do URL w konsoli Firebase:
1. W Realtime Database sprawdź górny pasek
2. Powinien być identyczny z URL w konfiguracji

### Sprawdź Region
Jeśli baza jest w innym regionie niż `europe-west1`, zmień URL na właściwy:
- US Central: `https://skyview-booking-default-rtdb.firebaseio.com`
- Europe West: `https://skyview-booking-default-rtdb.europe-west1.firebasedatabase.app`
- Asia Southeast: `https://skyview-booking-default-rtdb.asia-southeast1.firebasedatabase.app`

## Testowanie po naprawie

### Test 1: Odczyt danych
Otwórz konsolę przeglądarki i wpisz:
```javascript
window.firebaseBookingManager.getBookedSlots()
  .then(slots => console.log('✅ Slots:', slots))
  .catch(err => console.error('❌ Error:', err))
```

### Test 2: Zapis danych
```javascript
window.firebaseBookingManager.bookTimeSlot('test_2024-01-01_10:00')
  .then(() => console.log('✅ Booking successful'))
  .catch(err => console.error('❌ Error:', err))
```

### Test 3: Real-time updates
1. Otwórz stronę w dwóch oknach przeglądarki
2. Zarezerwuj slot w jednym oknie
3. Sprawdź czy drugi okno automatycznie się zaktualizowało

## Troubleshooting

### Problem: "Database not found"
**Rozwiązanie**: 
1. Utwórz bazę danych w konsoli Firebase
2. Sprawdź czy region w URL się zgadza

### Problem: "Invalid API key"
**Rozwiązanie**: 
1. Sprawdź `apiKey` w `firebase-config.js`
2. Zweryfikuj klucz w Firebase Console → Project Settings

### Problem: Nadal "Permission denied"
**Rozwiązanie**: 
1. Sprawdź czy reguły zostały zapisane (przycisk "Publish")
2. Odśwież stronę z wyczyszczoną pamięcią cache (Ctrl+Shift+R)
3. Sprawdź w zakładce "Data" czy struktura `bookedSlots` i `bookings` istnieje

## Struktura danych w Firebase

Po poprawnej konfiguracji, dane powinny wyglądać tak:

```
skyview-booking-default-rtdb
├── bookedSlots
│   ├── Mon_Jan_15_2024_10_00: true
│   ├── Mon_Jan_15_2024_11_00: true
│   └── Tue_Jan_16_2024_14_00: true
└── bookings
    ├── -NxAbCdEfGhIjKlMn
    │   ├── id: "-NxAbCdEfGhIjKlMn"
    │   ├── name: "Jan Kowalski"
    │   ├── email: "jan@example.com"
    │   ├── company: "Example Corp"
    │   ├── timeKey: "Mon_Jan_15_2024_10_00"
    │   ├── createdAt: "2024-01-15T10:00:00.000Z"
    │   └── cancelled: false
    └── ...
```

## Kontakt i wsparcie

Jeśli nadal masz problemy:
1. Sprawdź logi w konsoli Firebase (zakładka "Usage")
2. Sprawdź szczegółowe błędy w konsoli przeglądarki
3. Zweryfikuj czy projekt Firebase jest aktywny (nie ma limitów)

---

**Ostatnia aktualizacja**: 2024
**Wersja Firebase SDK**: 12.3.0
**Project ID**: skyview-booking
